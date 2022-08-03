// import the screens to navigate
import Home from './components/Home'
import Chat from './components/Chat'

// import the necessary packages to allow navigation in React-Native
import React, { Component, useEffect, useState } from 'react'
import { Text } from 'react-native'

import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import firebase from './database/firebaseDB'

const WassupApp = () => {
  const [uid, setUid] = useState('')
  const [loggedInText, setLoggedInText] = useState('')

  useEffect(() => {
    const authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      try {
        if (!user) {
          await firebase.auth().signInAnonymously()
        }
        setUid(user.uid)
        setLoggedInText('Hello There')
      } catch (err) {
        console.log(err)
      }
    })
    return () => {
      authUnsubscribe()
    }
  }, [])

  // layout our pages and define the first age to be seen
  return !uid ? (
    <Text>{loggedInText}</Text>
  ) : (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' options={{ headerShown: false }}>
          {props => <Home {...props} uid={uid} />}
        </Stack.Screen>
        <Stack.Screen name='Chat' component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default WassupApp
