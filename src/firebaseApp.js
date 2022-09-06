import firebase from 'firebase/app'
import 'firebase/firebase-firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB7aFuJWlcTiY4JV6YCHVzglfD3b93KM8k",
  authDomain: "reactfinalproject-e8c21.firebaseapp.com",
  projectId: "reactfinalproject-e8c21",
  storageBucket: "reactfinalproject-e8c21.appspot.com",
  messagingSenderId: "257541903489",
  appId: "1:257541903489:web:bb250cfb46e69b941a2980"
};



firebase.initializeApp(firebaseConfig)

export default firebase;