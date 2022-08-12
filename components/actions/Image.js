import * as ImagePicker from 'expo-image-picker'
import { uploadImageToStorage } from './ImageStorage'
import PropTypes from 'prop-types'

// ask permission to access photo library and then retrieve and return an users image
const pickImage = async () => {
  let result
  try {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status === 'granted') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
      })
    }
    if (result.cancelled === false) {
      // upload image to firebase and get its stored uri
      return await uploadImageToStorage(result.uri)
    }
  } catch (error) {
    // console.error(error)
    alert('Sorry we cannot share an image right now. Please try again later')
  }
}

// ask permission to access camera and then retrieve and return a photo
const takePhoto = async () => {
  let result
  try {
    const { status } = await ImagePicker.requestCameraPermissionsAsync()
    if (status === 'granted') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: 'Images',
      })
    }
    if (result.cancelled === false) {
      // upload image to firebase and get its stored uri
      return await uploadImageToStorage(result.uri)
    }
  } catch (error) {
    // console.error(error)
    alert('Sorry we cannot share an image right now. Please try again later')
  }
}

pickImage.propTypes = {
  onSend: PropTypes.func.isRequired,
}

export { pickImage, takePhoto }
