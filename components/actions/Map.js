import * as Location from 'expo-location'

// ask permission and then retrieve and return user location
const getLocation = async () => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync()
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied')
      return
    }

    let location = await Location.getCurrentPositionAsync({})
    return location
  } catch (error) {
    // console.error(error)
    alert('Sorry we cannot send your location right now. Please try again later')
  }
}

export { getLocation }
