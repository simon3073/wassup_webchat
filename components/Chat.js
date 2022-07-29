import React from 'react';
import { View, Text } from 'react-native';

export default class Chat extends React.Component {
  // retrieve the username passed to this page and display in the title bar
  componentDidMount() {
    const { username, appcolor } = this.props.route.params;
    this.props.navigation.setOptions({ title: username }); // Title bar
  }
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: this.props.route.params.appcolor,
        }}>
        <Text
          style={{
            color:
              this.props.route.params.appcolor === '#090C08' || this.props.route.params.appcolor === '#474056'
                ? '#FFF'
                : '#000',
          }}>
          Hey {this.props.route.params.username}... Welcome to Wassup!
        </Text>
      </View>
    );
  }
}
