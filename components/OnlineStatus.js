import NetInfo from '@react-native-community/netinfo'

const OnlineStatus = async () => {
  // function to return online status
  try {
    return await NetInfo.fetch().then(connection => {
      return false
      //connection.isConnected
    })
  } catch (error) {
    console.error(error)
  }
}

export default OnlineStatus
