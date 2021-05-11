import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyBym3NCrDVS5hK0WzQJjdZdapSoyu6OYzY",
    authDomain: "final-projek-78695.firebaseapp.com",
    projectId: "final-projek-78695",
    storageBucket: "final-projek-78695.appspot.com",
    messagingSenderId: "755878874042",
    appId: "1:755878874042:web:66af9b3b304545d475ab83"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;