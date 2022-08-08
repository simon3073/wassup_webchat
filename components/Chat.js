import React, { useLayoutEffect, useState, useCallback } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { GiftedChat, Day, InputToolbar } from 'react-native-gifted-chat'
import { storageGet, storageSet, storageDelete } from './Storage'

// import firebase access
import firebase from './../database/firebaseDB'
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
const db = getFirestore(Chat)

// import assets
import SVGChat1 from './backgrounds/SVGChat1'
import SVGChat2 from './backgrounds/SVGChat2'
import SVGChat3 from './backgrounds/SVGChat3'
import SVGChat4 from './backgrounds/SVGChat4'

const Chat = props => {
  // set variables for users name and their app bg choice
  const { username, appBG, userid, online } = props.route.params
  const [messages, setMessages] = useState([])

  // on load set the title bar and change message state for the system and app initial messages
  useLayoutEffect(() => {
    // save the username and background for future visits
    storageSet('username', username || '')
    storageSet('appBG', appBG)
    props.navigation.setOptions({ title: username }) // set title to username

    if (online) {
      // if we are online, set up db snapshot listener
      const queryMessages = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
      const unsubscribe = onSnapshot(queryMessages, snapshot => {
        msgCollectionUpdate(snapshot.docs)
      })
      return () => {
        unsubscribe()
      }
    } else {
      // if we are offline, retrieve messages data from local storage and display
      const getOfflineMessages = async () => {
        try {
          const localMessages = await storageGet('messages')
          setMessages(JSON.parse(localMessages))
        } catch (error) {
          console.log(error)
        }
      }
      getOfflineMessages()
    }
  }, [])

  // return component to display based on user background selection
  const getChatBackground = () => {
    switch (appBG) {
      case 'SVGChat1':
        return <SVGChat1 style={styles.bgimage1} />
      case 'SVGChat2':
        return <SVGChat2 style={styles.bgimage2} />
      case 'SVGChat3':
        return <SVGChat3 style={styles.bgimage3_4} />
      case 'SVGChat4':
        return <SVGChat4 style={styles.bgimage3_4} />
      default:
        break
    }
  }

  // display all the message from the firestore db snapshot
  const msgCollectionUpdate = useCallback(querySnapshot => {
    const dbMessages = []
    // go through each document
    querySnapshot.forEach(doc => {
      var data = doc.data()
      dbMessages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      })
    })
    setMessages(previousMessages => GiftedChat.append(previousMessages.message, dbMessages))
    storageSet('messages', JSON.stringify(dbMessages))
  }, [])

  // add new message to the firestore db - eliciting a snapshot and state change
  const onSend = useCallback((message = []) => {
    if (message.length) {
      addDoc(collection(db, 'messages'), message[0])
    }
  }, [])

  // Custom styling for Chat elements
  const renderDay = props => {
    return <Day {...props} textStyle={{ color: '#000' }} />
  }

  const customSystemMessage = props => {
    const { currentMessage } = props
    return (
      <View styles={{ flex: 1 }}>
        <Text style={{ color: '#000', fontWeight: '400', alignSelf: 'center', paddingBottom: 15 }}>
          {currentMessage.text}
        </Text>
      </View>
    )
  }

  // Only show input toolbar is online
  const renderInputToolbar = props => {
    return online && <InputToolbar {...props} containerStyle={styles.input} />
  }

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      {getChatBackground()}
      <GiftedChat
        renderSystemMessage={customSystemMessage}
        renderDay={renderDay}
        renderUsernameOnMessage={true}
        renderInputToolbar={renderInputToolbar}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: userid, name: username }}
        alwaysShowSend
        inverted
      />
    </View>
  )
}

export default Chat

// Stylesheets
const styles = StyleSheet.create({
  bgimage1: {
    position: 'absolute',
    width: '170%',
    height: '170%',
  },
  bgimage2: {
    position: 'absolute',
    width: '250%',
    height: '250%',
  },
  bgimage3_4: {
    position: 'absolute',
    width: '145%',
    height: '145%',
  },
  input: {
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    marginLeft: 15,
    marginRight: 15,
  },
})
