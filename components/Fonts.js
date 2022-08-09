import * as Font from 'expo-font'
import { useEffect } from 'react'

export default function LoadFont() {
  const loadFont = async () => {
    await Font.loadAsync({
      // Load a font `Montserrat` from a static resource
      Poppins: require('./../assets/fonts/Poppins-Medium.ttf'),

      // Any string can be used as the fontFamily name. Here we use an object to provide more control
      Poppins: {
        uri: require('./../assets/fonts/Poppins-Medium.ttf'),
        display: Font.FontDisplay.FALLBACK,
      },
    })
  }

  useEffect(() => {
    loadFont()
  }, [])
}
