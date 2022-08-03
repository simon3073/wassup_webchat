import React, { useLayoutEffect, useState, useCallback } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { GiftedChat, Bubble, Day } from 'react-native-gifted-chat'

import firebase from './../database/firebaseDB'
import { getFirestore, collection, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
const db = getFirestore(Chat)

const Chat = props => {
  // set variables for users name and their app colour choice
  const { username, appcolor, userid } = props.route.params
  const [messages, setMessages] = useState([])

  // on load set the title bar and change message state for the system and app initial messages
  useLayoutEffect(() => {
    props.navigation.setOptions({ title: username })
    if (messages.length === 0) {
      setMessages([
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any',
          },
        },
        {
          _id: 2,
          text: `${username} has entered the chat`,
          createdAt: new Date(),
          system: true,
        },
      ])
    }

    const queryMessages = query(collection(db, 'messages'), orderBy('createdAt', 'desc'))
    const unsubscribe = onSnapshot(queryMessages, snapshot => {
      msgCollectionUpdate(snapshot.docs)
    })
    return () => {
      unsubscribe()
    }
  }, [])

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
  }, [])

  // add new message to the firestore db - eliciting a snapshot and state change
  const onSend = useCallback((message = []) => {
    if (message.length) addDoc(collection(db, 'messages'), message[0])
  }, [])

  // functions to display custom messages and style bubbles
  const renderBubble = props => {
    return <Bubble {...props} wrapperStyle={{ right: { backgroundColor: appcolor[2] } }} />
  }

  const renderDay = props => {
    return <Day {...props} textStyle={{ color: appcolor[1] }} />
  }

  const customSystemMessage = props => {
    const { currentMessage } = props
    return (
      <View styles={{ flex: 1 }}>
        <Text style={{ color: appcolor[1], fontWeight: '400', alignSelf: 'center', paddingBottom: 15 }}>
          {currentMessage.text}
        </Text>
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: appcolor[0], // set the background colour to that selected on the home screen
      }}
    >
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior='height' /> : null}
      <GiftedChat
        renderBubble={renderBubble}
        renderSystemMessage={customSystemMessage}
        renderDay={renderDay}
        renderUsernameOnMessage={true}
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: userid, name: username }}
      />
    </View>
  )
}

export default Chat
