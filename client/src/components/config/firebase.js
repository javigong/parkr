import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Constants from 'expo-constants';

// firebase config
const firebaseConfig = {
    apiKey: Constants.manifest.extra.apiKey,
    authDomain: Constants.manifest.extra.authDomain,
    projectId: Constants.manifest.extra.projectId,
    storageBucket: Constants.manifest.extra.storageBucket,
    messagingSenderId: Constants.manifest.extra.messagingSenderId,
    appId: Constants.manifest.extra.appId,
    databaseURL: Constants.manifest.extra.databaseURL
};

// initialize firebase
initializeApp(firebaseConfig);
// get user auth
export const auth = getAuth();
// get google auth provider
export const provider = new GoogleAuthProvider;
// access firestore database
export const database = getFirestore();