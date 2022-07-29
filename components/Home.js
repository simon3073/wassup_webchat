import React from 'react';
import { StyleSheet, View, Text, ImageBackground, Pressable } from 'react-native';
import * as Font from 'expo-font';
import { TextInput } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      fontsLoaded: false,
      appColor: '#090C08',
    };
  }

  async loadFonts() {
    await Font.loadAsync({
      'Poppins-Black': require('./../assets/fonts/Poppins-Black.ttf'),
      'Poppins-Regular': require('./../assets/fonts/Poppins-Regular.ttf'),
    });
    this.setState({ fontsLoaded: true });
  }

  isStateColor = (color) => {
    return this.state.appColor === color ? styles.selected : '';
  };

  componentDidMount() {
    this.loadFonts();
  }

  // Welcome text and Text Input to prompt user to enter a name and go to the chat
  render() {
    const app_bg = require('./../assets/Background Image.png');
    const user_icon = require('./../assets/icon.svg');

    return (
      <View style={styles.container}>
        <ImageBackground source={app_bg} style={styles.image}>
          <View style={styles.app_header_section}>
            <Text style={styles.header_text}>Wassup!?!</Text>
          </View>

          <View style={styles.call_to_action}>
            <TextInput
              style={styles.textInput}
              left={<TextInput.Icon name="account-outline" style={styles.icon} size={35} color={'#75708280'} />}
              onChangeText={(username) => this.setState({ username })}
              value={this.state.username}
              placeholder="Your Name"
              placeholderTextColor={'#75708280'}
            />
            <View>
              <Text style={styles.regular_text}>Choose Background Colour:</Text>
              <View style={styles.colorEl}>
                <TouchableOpacity
                  onPress={() => this.setState({ appColor: '#090C08' })}
                  style={[styles.colour_option_shape_cover, this.state.appColor === '#090C08' ? styles.selected : '']}>
                  <View style={[styles.colour_option_shape, styles.colour_options1]}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ appColor: '#474056' })}
                  style={[styles.colour_option_shape_cover, this.state.appColor === '#474056' ? styles.selected : '']}>
                  <View style={[styles.colour_option_shape, styles.colour_options2]}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ appColor: '#8A95A5' })}
                  style={[styles.colour_option_shape_cover, this.state.appColor === '#8A95A5' ? styles.selected : '']}>
                  <View style={[styles.colour_option_shape, styles.colour_options3]}></View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => this.setState({ appColor: '#B9C6AE' })}
                  style={[styles.colour_option_shape_cover, this.state.appColor === '#B9C6AE' ? styles.selected : '']}>
                  <View style={[styles.colour_option_shape, styles.colour_options4]}></View>
                </TouchableOpacity>
              </View>
            </View>

            <Pressable
              style={styles.start_button}
              onPress={() =>
                this.props.navigation.navigate('Chat', { username: this.state.username, appcolor: this.state.appColor })
              }>
              <Text style={styles.start_button_text}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

// Stylesheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },

  header_text: {
    fontSize: 32,
    fontWeight: '6000',
    color: '#fff',
    fontFamily: 'Poppins-Black',
  },
  regular_text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#757083',
    fontFamily: 'Poppins-Regular',
  },

  app_header_section: {
    flex: 0.56,
    justifyContent: 'top',
    top: 100,
    alignItems: 'center',
  },

  call_to_action: {
    flex: 0.44,
    width: '88%',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    padding: '6%',
    alignItems: 'left',
    borderRadius: 5,
    margin: '6%',
  },

  textInput: {
    height: 55,
    width: '100%',
    borderColor: '#777082',
    backgroundColor: '#fff',
    fontSize: '16px',
    fontWeight: 300,
    color: '#757083',
    borderWidth: 1,
    fontFamily: 'Poppins-Regular',
    padding: '10px',
    paddingLeft: '20px',
  },
  icon: {
    marginLeft: '20px',
    marginTop: '25px',
  },

  colorEl: {
    flexDirection: 'row',
  },

  colour_option_shape_cover: {
    height: '50px',
    width: '50px',
    borderRadius: '50%',
    marginTop: '5px',
    marginRight: '5px',
    borderColor: '#777082',
    padding: '5px',
  },

  selected: {
    borderWidth: '2px',
    padding: '3px',
  },

  colour_option_shape: {
    height: '40px',
    width: '40px',
    borderRadius: '50%',
  },
  colour_options1: {
    backgroundColor: '#090C08',
  },
  colour_options2: {
    backgroundColor: '#474056',
  },
  colour_options3: {
    backgroundColor: '#8A95A5',
  },
  colour_options4: {
    backgroundColor: '#B9C6AE',
  },

  start_button: {
    width: '100%',
    height: 55,
    backgroundColor: '#757083',
    alignItems: 'center',
    justifyContent: 'center',
  },
  start_button_text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
