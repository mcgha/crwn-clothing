import firebase from "firebase/app";
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
//userAuth is the object Firebase returns of the user info
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        // destructuring userAuth object
        const createAt = new Date();

        try {
            await userRef.set({
                displayName, 
                email, 
                createAt,
                ...additionalData
            })

        } catch(error) {
            console.log('error creating user', error.message)
        }
    }
    return userRef;
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
 }else {
    firebase.app(); // if already initialized, use that one
 }

// firebase.initializeApp(config);
//had to insert previous becase error

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

