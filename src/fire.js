import firebase from "firebase/compat/app";
import "firebase/compat/app";
import "firebase/compat/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2xQqwxjwYr7i7Y_n1NW0Xa1xkG9A-DEU",
  authDomain: "glovo-ff8e6.firebaseapp.com",
  projectId: "glovo-ff8e6",
  storageBucket: "glovo-ff8e6.appspot.com",
  messagingSenderId: "753894154261",
  appId: "1:753894154261:web:3634a4a198a81585e1ae1c"
  
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);
export default fire;