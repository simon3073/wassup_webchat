import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, Platform, KeyboardAvoidingView, StyleSheet } from 'react-native'
import { GiftedChat, Bubble, Day } from 'react-native-gifted-chat'

const Chat = props => {
  // set variables for users name and their app colour choice
  const { username, appcolor } = props.route.params
  const [messages, setMessages] = useState([])

  // on load set the title bar and change message state for the system and app initial messages
  useEffect(() => {
    props.navigation.setOptions({ title: username })
    setMessages([
      {
        _id: 1,
        text: `Hello ${username}`,
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
  }, [])

  // function to update the messages state and display in app
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
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
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{ _id: 1 }}
      />
    </View>
  )
}

export default Chat
