import AsyncStorage from '@react-native-async-storage/async-storage'

// Functions for storing, getting and deleting local variables based on function parameters
const storageSet = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (error) {
    console.log(error)
  }
}

const storageGet = async key => {
  try {
    const result = await AsyncStorage.getItem(key)
    return result
  } catch (error) {
    console.log(error)
  }
}

const storageDelete = async key => {
  try {
    await AsyncStorage.removeItem(key)
  } catch (error) {
    console.log(error)
  }
}

export { storageSet, storageGet, storageDelete }
