import React from 'react'
import 'react-native-get-random-values'
import { v4 as uuidv4 } from 'uuid'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ActionSheetIOS, View, Text, StyleSheet } from 'react-native'

// import custom JS for selecting images and locations
import { pickImage, takePhoto } from './actions/Image'
import { getLocation } from './actions/Map'

const CustomActions = props => {
  const { wrapperStyle, iconTextStyle, onSend, user } = props

  // construct message or the DB with an image value
  const sendImage = imageURL => {
    onSend([
      {
        _id: uuidv4(), // use a randomly generated id
        createdAt: new Date(),
        user: {
          _id: user._id,
          name: user.name,
        },
        image: imageURL,
      },
    ])
  }

  // construct message or the DB with location values
  const sendLocation = ({ coords }) => {
    onSend([
      {
        _id: uuidv4(), // use a randomly generated id
        createdAt: new Date(),
        user: {
          _id: user._id,
          name: user.name,
        },
        location: {
          latitude: coords.latitude,
          longitude: coords.longitude,
        },
      },
    ])
  }

  // on selecting the + icon in the input bar...
  // load the ActionSheet, populate and listen for clicks
  const onActionPress = () => {
    const options = ['Choose Image from Library', 'Take a Picture', 'Send Location', 'Cancel']
    const cancelButtonIndex = options.length - 1
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async buttonIndex => {
        switch (buttonIndex) {
          case 0:
            const imageResult = await pickImage() // call function to select image from library
            sendImage(imageResult) // construct message for GiftedChat
            return
          case 1:
            const photoResult = await takePhoto() // call function to take photo
            sendImage(photoResult) // construct message for GiftedChat
            return
          case 2:
            const mapResult = await getLocation() // call function to retrieve current location
            sendLocation(mapResult) // construct message for GiftedChat
            return
          default:
        }
      },
    )
  }
  return (
    <TouchableOpacity
      accessible={true}
      accessibilityLabel='More options'
      accessibilityHint='Choose to send an image or your geolocation.'
      style={[styles.container]}
      onPress={onActionPress}
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#777',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#777',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
})

export default CustomActions
