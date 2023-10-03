import React, { useState} from 'react';
import {View, TouchableOpacity, TextInput, Text, Button, ToastAndroid, Alert} from 'react-native';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseAuth } from '../config/Firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from '../Style';
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
// import db from "@react-native-firebase/database";
import { Checkbox } from 'react-native-ui-lib';

const AuthScreen = () => {
    const [isLoginOrSignup, setIsLoginOrSignup] = useState(1);
    const [user, setUser] = useState(null);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [buttonClickable, setButtonClickable] = useState(false);

    const router = useRouter();


    const OnSignUP = () => {
      try {
        createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            setUser(userCredential.user);
            createProfile(userCredential);
            
            router.push('/home/collections');
          });
    } catch (error) {
        ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT);
    }
    }

    const OnLogin = () => {
      try {
        signInWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            setUser(userCredential.user);
            findProfile(userCredential);
            
            router.push('/home/collections');
          });
    } catch (error) {
        ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT);
    }
    }


    const createProfile = async (response) => {
        // db().ref(`/users/${response.user.uid}`).set({ email });
        // db().ref(`/users/${response.user.uid}/leaderboard`).set({ totalSteps: 0 });
        console.log(response.user.uid);
      };

    const findProfile = async (response) => {
        // const snapshot = await db().ref(`/users/${response.user.uid}`).once("value");
        // const exists = snapshot.val() !== null;
        // if (!exists) {
        //   await createProfile(response);
        // }
        console.log(response.user.uid);
      };



    // const OnSignUP = async () => {
    //     if (confirmPassword != password) {
    //     try {
    //         const response = await auth().createUserWithEmailAndPassword(
    //           email,
    //           password
    //         );
    
    //         if (response.user) {
    //           await createProfile(response);
    //           router.push('/home/collections');
    //         }
    //       } catch (e) {
    //         Alert.alert("Oops", e.message);
    //       }
    //     }
    //     else {
    //         Alert.alert("Oops", "Password and Confirm Password are not same");
    //     }
    // }

    // const OnLogin = async () => {
    //       try {
    //         const response = await auth().signInWithEmailAndPassword(
    //           email,
    //           password
    //         );
    //         if (response.user) {
    //           await findProfile(response);
    //           router.push('/home/collections');
    //         }
    //       } catch (e) {
    //         Alert.alert("Oops", e.message);
    //         console.log(e);
    //       }
    //   };

    // const OnClickGoogleHandler = () => {
    //     const provider = new GoogleAuthProvider();
    //     signInWithPopup(firebaseAuth, provider).then((result) => {
    //         const credential = GoogleAuthProvider.credentialFromResult(result);
    //         const token = credential.accessToken;
    //         const user = result.user;
    //         ToastAndroid.show('Signup Successfuly !', ToastAndroid.SHORT);
    //         router.push('/home/collections');
    //       }).catch((error) => {
    //         const errorCode = error.code;
    //         const errorMessage = error.message;
    //         const email = error.email;
    //         const credential = GoogleAuthProvider.credentialFromError(error);
    //         ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT);
    //       });
    // }

    const OnClickGoogleHandler = async () => {
        console.log("Google Sign In");
    }

    return (
        <SafeAreaView style={[styles.Container, {gap: 10}]}>
            
            <TouchableOpacity onPress={()=>{setIsLoginOrSignup(isLoginOrSignup==1?2:1)}}>
              <Text style={[styles.HeaderH1, styles.colBlue]}>  If you want to {isLoginOrSignup==1?'Sign Up':'Login'} click here </Text>  
            </TouchableOpacity>
                
                {isLoginOrSignup==1 ? <><Text style={[styles.Text, {marginVertical: 10}]}>Login</Text>
                <TextInput style={styles.TextField} placeholder='Email' onChangeText={(text)=>{setEmail(text)}}/>
                <TextInput style={styles.TextField} placeholder='Password' onChangeText={(text)=>{setPassword(text)}} secureTextEntry={true}/>
                <TouchableOpacity style={[styles.button, buttonClickable ? styles.bgcolGreen : styles.bgcolGray]} onPress={()=>{OnLogin()}} disabled={!buttonClickable}>
                    <Text style={styles.Text}>Login</Text>
                </TouchableOpacity></>
                : <><Text style={[styles.Text, {marginVertical: 10}]}>Sign Up</Text>
                <TextInput style={styles.TextField} placeholder='Email' onChangeText={(text)=>{setEmail(text)}}/>
                <TextInput style={styles.TextField} placeholder='Password' onChangeText={(text)=>{setPassword(text)}} secureTextEntry={false}/>
                <TextInput style={styles.TextField} placeholder='Password' onChangeText={(text)=>{setPassword(text)}} secureTextEntry={false}/>
                <TouchableOpacity style={[styles.button, buttonClickable ? styles.bgcolGreen : styles.bgcolGray]} onPress={()=>{OnSignUP()}} disabled={!buttonClickable}>
                    <Text style={styles.Text}>Sign Up</Text>
                </TouchableOpacity></>}
                <Checkbox  value={buttonClickable} onValueChange={(value) => setButtonClickable(value)} label="Accept our Privacy policy" color="#000000" />
                <Text style={styles.Text}>OR</Text>
                
                <TouchableOpacity style={styles.button} onPress={()=>{OnClickGoogleHandler()}} disabled={true}>
                    <Text style={styles.Text}>Google</Text>
                </TouchableOpacity>

        </SafeAreaView>
    );
}


export default AuthScreen;
