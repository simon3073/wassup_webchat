// database/firebaseDb.js
import firebase from 'firebase/compat/app'
import auth from 'firebase/compat/auth'
import firestore from 'firebase/compat/firestore'

import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId, measurementId } from '@env'

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
  measurementId: measurementId,
}

firebase.initializeApp(firebaseConfig)
firebase.firestore()
export default firebase
