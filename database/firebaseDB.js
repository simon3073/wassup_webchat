// database/firebaseDb.js
import firebase from 'firebase/compat/app'
import auth from 'firebase/compat/auth'
import firestore from 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyAhhT4upQifOVeqmcXtEsTCCBsHQ91TVVo',
  authDomain: 'wassup-web-chat.firebaseapp.com',
  projectId: 'wassup-web-chat',
  storageBucket: 'wassup-web-chat.appspot.com',
  messagingSenderId: '1006250612990',
  appId: '1:1006250612990:web:dd5a0c28e0bd457b26edaf',
  measurementId: 'G-895Z0VKQWV',
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()
export default firebase
