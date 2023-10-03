import { initializeApp } from "firebase/app";
import { getAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage"


const firebaseConfig = {
  apiKey: "AIzaSyCeDXOVSrssDHYtVwU4Ib--ZcE1Jo0KBl8",
  authDomain: "hourlyhomes.firebaseapp.com",
  projectId: "hourlyhomes",
  storageBucket: "hourlyhomes.appspot.com",
  messagingSenderId: "700447556300",
  appId: "1:700447556300:web:e4d6619fbd0d3596d33869"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp, {
  persistence: getReactNativePersistence(AsyncStorage)
});

export { firebaseApp, firebaseAuth };