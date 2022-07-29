// import the screens to navigate
import Home from './components/Home';
import Chat from './components/Chat';

// import the necessary packages to allow navigation in React-Native
import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default class HelloWorld extends Component {
  constructor(props) {
    super(props);
  }

  // layout our pages and define the first age to be seen
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
