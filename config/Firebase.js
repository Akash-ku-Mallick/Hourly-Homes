import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';



const firebaseConfig = {
  apiKey: "AIzaSyCeDXOVSrssDHYtVwU4Ib--ZcE1Jo0KBl8",
  authDomain: "hourlyhomes.firebaseapp.com",
  projectId: "hourlyhomes",
  storageBucket: "hourlyhomes.appspot.com",
  messagingSenderId: "700447556300",
  appId: "1:700447556300:web:e4d6619fbd0d3596d33869"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});


export { firebaseApp };