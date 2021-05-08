import firebase from 'firebase/app';
import 'firebase/auth';

// Web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCD45PTnf_N2AuSSSn-uD6bHxhhP0RoCrk",
    authDomain: "softuniproject-412dd.firebaseapp.com",
    databaseURL: "https://softuniproject-412dd.firebaseio.com",
    projectId: "softuniproject-412dd",
    storageBucket: "softuniproject-412dd.appspot.com",
    messagingSenderId: "1019658575338",
    appId: "1:1019658575338:web:c621de020caa073db32693"
};

if(!firebase.apps.length){
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}

export default firebase;
