import { getStorage, ref, getDownloadURL, uploadBytes } from 'firebase/storage'

// convert an image to a blob format, then upload to firebase storage.
// return its new stored uri for display
const uploadImageToStorage = async uri => {
  const img = await fetch(uri)
  const imgBlob = await img.blob()

  const imageNameBefore = uri.split('/')
  const imageName = imageNameBefore[imageNameBefore.length - 1]

  const storage = getStorage()

  const storageRef = ref(storage, `images/${imageName}`)

  return uploadBytes(storageRef, imgBlob).then(async snapshot => {
    imgBlob.close()
    return getDownloadURL(snapshot.ref).then(url => {
      return url
    })
  })
}

export { uploadImageToStorage }
