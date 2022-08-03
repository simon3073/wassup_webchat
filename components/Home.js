import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ImageBackground, Pressable } from 'react-native'
import * as Font from 'expo-font'
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'

// Set up the colours for the app to choose from (helps readability)
// Background Colour, System Message Colour, App Message Colour, User Message Colour
const appColours = {
  colour1: ['#090C08', '#d2d2d2', '#0092ff'],
  colour2: ['#474056', '#d2d2d2', '#0092ff'],
  colour3: ['#8A95A5', '#000', '#00FF'],
  colour4: ['#B9C6AE', '#000', '#00FF'],
}
const app_bg = require('./../assets/bg.png')

const Home = props => {
  const { uid } = props
  const [username, setUsername] = useState('')
  const [fontsLoaded, setFontsLoaded] = useState(false)
  const [appColour, setAppColour] = useState(appColours['colour1'])

  // load Poppins from the assets/fonts folder
  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Black': require('./../assets/fonts/Poppins-Black.ttf'),
      'Poppins-Regular': require('./../assets/fonts/Poppins-Regular.ttf'),
    })
    setFontsLoaded(true)
  }

  useEffect(() => {
    loadFonts()
  }, [])

  // function to check if colour is currently set -- for display purposes
  const isSetColour = colour => (appColour[0] === colour[0] ? styles.selected : '')

  return (
    <View style={styles.container}>
      <ImageBackground source={app_bg} style={styles.image}>
        <View style={styles.app_header_section}>
          <Text style={styles.header_text}>Wassup!?!</Text>
        </View>

        <View style={styles.call_to_action}>
          {/* Welcome text and Text Input to prompt user to enter a name and go to the chat */}
          <TextInput
            style={styles.textInput}
            left={<TextInput.Icon name='account-outline' style={styles.icon} size={35} color={'#75708280'} />}
            onChangeText={username => setUsername(username)}
            value={username}
            placeholder='Your Name'
            placeholderTextColor={'#75708280'}
          />
          {/* Ask user to select the theme colour */}
          <View>
            <Text style={styles.regular_text}>Choose Background Colour:</Text>
            <View style={styles.colorEl}>
              <TouchableOpacity
                onPress={() => setAppColour(appColours['colour1'])}
                style={[styles.colour_option_shape_cover, isSetColour(appColours['colour1'])]}
              >
                <View style={[styles.colour_option_shape, styles.colour_options1]}></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAppColour(appColours['colour2'])}
                style={[styles.colour_option_shape_cover, isSetColour(appColours['colour2'])]}
              >
                <View style={[styles.colour_option_shape, styles.colour_options2]}></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAppColour(appColours['colour3'])}
                style={[styles.colour_option_shape_cover, isSetColour(appColours['colour3'])]}
              >
                <View style={[styles.colour_option_shape, styles.colour_options3]}></View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAppColour(appColours['colour4'])}
                style={[styles.colour_option_shape_cover, isSetColour(appColours['colour4'])]}
              >
                <View style={[styles.colour_option_shape, styles.colour_options4]}></View>
              </TouchableOpacity>
            </View>
          </View>
          {/* Send user to the chat page */}
          <Pressable
            style={styles.start_button}
            onPress={() =>
              props.navigation.navigate('Chat', {
                username: username,
                appcolor: appColour,
                userid: uid,
              })
            }
          >
            <Text style={styles.start_button_text}>Start Chatting</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </View>
  )
}

export default Home

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
    fontWeight: '600',
    color: '#fff',
    // fontFamily: 'Poppins-Black',
  },
  regular_text: {
    fontSize: 16,
    fontWeight: '400',
    color: '#757083',
    // fontFamily: 'Poppins-Regular',
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
    height: 40,
    width: '100%',
    borderColor: '#777082',
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderWidth: 1,
    // fontFamily: 'Poppins-Regular',
    padding: 10,
    paddingLeft: 20,
  },
  icon: {
    marginLeft: 20,
    marginTop: 25,
  },

  colorEl: {
    flexDirection: 'row',
  },

  colour_option_shape_cover: {
    height: 50,
    width: 50,
    borderRadius: '50%',
    marginTop: 5,
    marginRight: 5,
    borderColor: '#777082',
    padding: 5,
  },

  selected: {
    borderWidth: 2,
    padding: 3,
  },

  colour_option_shape: {
    height: 40,
    width: 40,
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
})
