// import the necessary packages to allow navigation in React-Native
import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import LottieView from 'lottie-react-native'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Import access to the database
import firebase from './database/firebaseDB'

// import the screens to navigate and Stack navigator
import Home from './components/Home'
import Chat from './components/Chat'

// import assets
import SVGBackground from './components/backgrounds/SVGbackground'

const Stack = createStackNavigator()

const WassupApp = () => {
  const [uid, setUid] = useState('') // set uid as the state to determine loading vis
  useEffect(() => {
    // authorise our use on initial visit
    const authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      try {
        if (!user) {
          await firebase.auth().signInAnonymously()
        }
        setUid(user.uid)
      } catch (err) {
        console.log(err)
      }
    })
    return () => {
      authUnsubscribe()
    }
  }, [])

  return !uid ? (
    // If we are waiting to be authourised >> show the loader
    <View style={styles.container}>
      <SVGBackground style={styles.bgimage} />
      <LottieView source={require('./assets/json/loading.json')} autoPlay loop />
      <Text style={styles.loadingText}>...loading the Wassup!?!</Text>
    </View>
  ) : (
    // layout our pages and define the first age to be seen
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

// Stylesheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgimage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 306,
    height: 165,
  },
  loadingText: {
    color: '#0082af',
    marginTop: 220,
    fontWeight: '600',
    // fontFamily: 'Poppins_400Regular',
  },
})
