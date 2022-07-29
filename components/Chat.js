import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
  // retrieve the username passed to this page and display in the title bar
  componentDidMount() {
    const { username } = this.props.route.params;
    this.props.navigation.setOptions({ title: username });
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: this.props.route.params.appcolor, // set the background colour to that selected on the home screen
        }}>
        <Text
          style={{
            // set the main text color to white if the appcolor selected is dark
            color:
              this.props.route.params.appcolor === '#090C08' || this.props.route.params.appcolor === '#474056'
                ? '#FFF'
                : '#000',
            fontSize: '20px',
            fontFamily: 'Poppins-Regular',
          }}>
          Hey {this.props.route.params.username} ...Welcome to Wassup!
        </Text>
      </View>
    );
  }
}
