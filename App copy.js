// import the screens to navigate
import Home from './components/Home'
import Chat from './components/Chat'

// import the necessary packages to allow navigation in React-Native
import React, { Component } from 'react'
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator()

import { FlatList, StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-paper'

import firebase from './database/firebaseDB'

export default class HelloWorld extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: null,
      loggedInText: 'Please wait. You are being authenticated',
      lists: [],
    }
  }

  componentDidMount = () => {
    this.authUnsubscribe = firebase.auth().onAuthStateChanged(async user => {
      if (!user) {
        await firebase.auth().signInAnonymously()
      }

      this.setState({
        uid: user.uid,
        loggedInText: 'Hello There',
      })
      this.referenceShoppinglistUser = firebase
        .firestore()
        .collection('shoppinglists')
        .where('uid', '==', this.state.uid)
      this.unsubscribeListUser = this.referenceShoppinglistUser.onSnapshot(this.onCollectionUpdate)
    })

    this.referenceShoppingLists = firebase.firestore().collection('shoppinglists')
  }

  componentWillUnmount = () => {
    this.unsubscribe
  }

  onCollectionUpdate = querySnapshot => {
    const lists = []
    // go through each document
    querySnapshot.forEach(doc => {
      var data = doc.data()
      lists.push({
        name: data.name,
        items: data.items.toString(),
      })
    })
    this.setState({
      lists,
    })
  }

  addList = () => {
    this.referenceShoppingLists.add({
      name: 'TestList',
      items: ['eggs', 'pasta', 'veg'],
      uid: this.state.uid,
    })
  }

  // layout our pages and define the first age to be seen
  render() {
    return (
      // <NavigationContainer>
      //   <Stack.Navigator initialRouteName='Home'>
      //     <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      //     <Stack.Screen name='Chat' component={Chat} />
      //   </Stack.Navigator>
      // </NavigationContainer>
      <View style={styles.container}>
        <Text>{this.state.loggedInText}</Text>
        <Text style={styles.text}>SHOPPING LIST</Text>
        <FlatList
          data={this.state.lists}
          renderItem={({ item }) => (
            <Text style={styles.item}>
              {item.name}: {item.items}
            </Text>
          )}
        />
        <Button onPress={this.addList}>ADD SOMETHING</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  },
})
