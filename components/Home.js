import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, Pressable } from 'react-native'
import { TextInput } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { storageGet } from './Storage'
import LoadFont from './Fonts'
import OnlineStatus from './OnlineStatus'

// load our assets
const wassup_logo = require('./../assets/images/wassup_logo.png')
import SVGBackground from './backgrounds/SVGbackground'

const Home = props => {
  const { uid } = props
  const [username, setUsername] = useState('')
  const [isConnected, setIsConnected] = useState('')
  const [appBG, setAppBG] = useState('') // << set up our initial BG state value
  LoadFont()

  const getOnlineStatus = async () => {
    try {
      let getStatus = await OnlineStatus()
      setIsConnected(getStatus)
    } catch (error) {
      console.log(error)
    }
  }
  // retrieve user data from local storage
  const fetchUserData = async () => {
    let usernameStored = await storageGet('username')
    setUsername(usernameStored)
    let appBGStored = await storageGet('appBG')
    setAppBG(appBGStored === '' ? 'SVGChat1' : appBGStored)
  }

  useEffect(() => {
    fetchUserData()
    getOnlineStatus()
  }, [])

  // function to check if bg is currently set -- for display purposes of BG selector
  const isSetBG = bg => (appBG === bg ? styles.selected : '')

  return (
    <View style={styles.container}>
      <SVGBackground style={styles.bgimage} />
      <View style={styles.app_header_section}>
        <Image source={wassup_logo} style={styles.logo} />
      </View>

      <View style={styles.call_to_action}>
        {/* Welcome text and Text Input to prompt user to enter a name and go to the chat */}
        <View style={{ width: '100%' }}>
          <Text style={styles.regular_text}>Type in your chat name</Text>
          <TextInput
            style={styles.textInput}
            left={<TextInput.Icon name='account-outline' style={styles.icon} size={35} color={'#75708280'} />}
            onChangeText={username => setUsername(username)}
            value={username}
            placeholder='Your Name'
            placeholderTextColor={'#75708280'}
          />

          {/* Ask user to select the chat background */}
          <View style={styles.userInput}>
            <Text style={styles.regular_text}>Choose your background style</Text>
            <View style={styles.backgroundEl}>
              <TouchableOpacity
                onPress={() => setAppBG('SVGChat1')}
                style={[styles.colour_option_shape_cover, isSetBG('SVGChat1')]}
              >
                <Image source={require('./../assets/images/SVGChat1.png')} style={styles.colour_option_shape} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAppBG('SVGChat2')}
                style={[styles.colour_option_shape_cover, isSetBG('SVGChat2')]}
              >
                <Image source={require('./../assets/images/SVGChat2.png')} style={styles.colour_option_shape} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAppBG('SVGChat3')}
                style={[styles.colour_option_shape_cover, isSetBG('SVGChat3')]}
              >
                <Image source={require('./../assets/images/SVGChat3.png')} style={styles.colour_option_shape} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAppBG('SVGChat4')}
                style={[styles.colour_option_shape_cover, isSetBG('SVGChat4')]}
              >
                <Image source={require('./../assets/images/SVGChat4.png')} style={styles.colour_option_shape} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Offline notification */}
        {!isConnected && (
          <View style={{ alignItems: 'center', width: '100%' }}>
            <Text style={{ color: 'darkred', fontWeight: 'bold', fontSize: 18, fontStyle: 'italic' }}>
              You are currently offline
            </Text>
          </View>
        )}

        {/* Send user to the chat page and pass username, userid, background style and online status */}
        <Pressable
          style={styles.start_button}
          onPress={() =>
            props.navigation.navigate('Chat', {
              username: username,
              appBG: appBG,
              userid: uid,
            })
          }
        >
          {/* Customise button text for offline message */}
          <Text style={styles.start_button_text}>{isConnected ? 'START CHATTING' : 'Get Chat History'}</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Home

// Stylesheets
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgimage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 306,
    height: 165,
    marginTop: 100,
  },

  regular_text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },

  app_header_section: {
    flex: 0.6,
    justifyContent: 'top',
    top: 100,
    alignItems: 'center',
  },

  call_to_action: {
    flex: 0.6,
    width: '100%',
    justifyContent: 'space-between',
    padding: '8%',
    alignItems: 'left',
    borderRadius: 35,
  },

  userInput: {
    width: '100%',
    marginTop: 30,
  },

  textInput: {
    marginTop: 15,
    height: 40,
    width: '100%',
    borderColor: '#777082',
    backgroundColor: '#fff',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderWidth: 1,
    padding: 10,
    fontFamily: 'Poppins',
  },
  icon: {
    marginLeft: 20,
    marginTop: 25,
  },

  backgroundEl: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 5,
  },

  colour_option_shape_cover: {
    height: 70,
    width: 70,
    borderRadius: '10%',
    marginTop: 5,
    marginRight: 5,
    borderColor: '#777082',
    padding: 5,
  },

  selected: {
    backgroundColor: '#0082af',
    padding: 5,
  },

  colour_option_shape: {
    height: 60,
    width: 60,
    borderRadius: 10,
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
    backgroundColor: '#0082af',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  start_button_text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'Poppins',
  },
})
