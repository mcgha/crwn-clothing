import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// npm i firebase

const config = {
    apiKey: "AIzaSyCU5AiM7-CIhUFoBGSujN159DdgjsLfqvc",
    authDomain: "crwn-db-e0227.firebaseapp.com",
    projectId: "crwn-db-e0227",
    storageBucket: "crwn-db-e0227.appspot.com",
    messagingSenderId: "948004830583",
    appId: "1:948004830583:web:5b791b5dfc9c2b7e42f572",
    measurementId: "G-ZNRS7LF6V0"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

