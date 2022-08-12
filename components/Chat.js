import React, { useLayoutEffect, useState, useCallback } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { GiftedChat, Day, InputToolbar } from 'react-native-gifted-chat'

// storage functions
import { storageGet, storageSet } from './hooks/Storage'

// imports for adding images and locations
import MapView from 'react-native-maps'
import OnlineStatus from './hooks/OnlineStatus'
import CustomActions from './CustomActions'

// import firebase access
import firebase from './../database/firebaseDB'
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
const db = getFirestore(Chat)

// import SVG Background assets
import SVGChat1 from './backgrounds/SVGChat1'
import SVGChat2 from './backgrounds/SVGChat2'
import SVGChat3 from './backgrounds/SVGChat3'
import SVGChat4 from './backgrounds/SVGChat4'

const Chat = props => {
  // set variables for users name and their app bg choice
  const { username, appBG, userid } = props.route.params

  // set isConnected as the state so as to decide whether to...
  // authorise user and to pass to the other screens
  const [isConnected, setIsConnected] = useState('')
  const [messages, setMessages] = useState([])

  // check internet connection and set state accordingly
  const getOnlineStatus = async () => {
    try {
      let getStatus = await OnlineStatus()
      setIsConnected(getStatus)
    } catch (error) {
      // console.log(error)
      alert('You appear to not have internet coverage, but you still have access to your chat history')
    }
  }

  // on load set the title bar and change message state for the system and app initial messages
  useLayoutEffect(() => {
    // save the username and background for future visits
    storageSet('username', username || '')
    storageSet('appBG', appBG)
    props.navigation.setOptions({ title: username }) // set title to username

    getOnlineStatus()
    if (isConnected) {
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
          //console.log(error)
          alert('Sorry we cannot retrieve your messages. Please try again later')
        }
      }
      getOfflineMessages()
    }
  }, [isConnected])

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
        image: data.image ? data.image : null,
        location: data.location ? data.location : null,
      })
    })
    // update state and save to local storage
    setMessages(previousMessages => GiftedChat.append(previousMessages.message, dbMessages))
    storageSet('messages', JSON.stringify(dbMessages))
  }, [])

  // add new message to the firestore db - eliciting a snapshot and state change
  const onSend = useCallback((message = []) => {
    addDoc(collection(db, 'messages'), message[0])
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

  const renderCustomActions = props => {
    return <CustomActions {...props} onSend={onSend} />
  }

  // Only show input toolbar when online
  const renderInputToolbar = props => {
    return isConnected && <InputToolbar {...props} containerStyle={styles.input} />
  }

  // render the view for a chat message with location values
  const renderCustomView = props => {
    const { currentMessage } = props
    if (currentMessage.location) {
      return (
        <MapView
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
        />
      )
    }
    return null
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
        renderActions={renderCustomActions}
        renderInputToolbar={renderInputToolbar}
        renderCustomView={renderCustomView}
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
