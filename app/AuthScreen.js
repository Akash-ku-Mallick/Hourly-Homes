import React, { useState} from 'react';
import {View, TouchableOpacity, TextInput, Text, ToastAndroid, Alert} from 'react-native';
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseApp } from '../config/Firebase';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styles from '../Style';
import { Checkbox } from 'react-native-ui-lib';
import { getFirestore, collection, addDoc, setDoc } from "firebase/firestore";
import { Ionicons } from "@expo/vector-icons";

const AuthScreen = () => {
    const [isLoginOrSignup, setIsLoginOrSignup] = useState(1);
    const [user, setUser] = useState(null);
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [secureTextEntry1, setsecureTextEntry1] = useState(true);
    const[secureTextEntry2, setsecureTextEntry2] = useState(true);

    const [buttonClickable, setButtonClickable] = useState(false);

    const navigation = useNavigation();
    const router = useRouter();
    const params = useLocalSearchParams();

    const firebaseAuth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);


    const SetDefaults = () => { 
      setEmail(''); 
      setPassword(''); 
      setConfirmPassword(''); 
      router.replace('/AuthScreen');
    }



    const OnSignUP =  () => {
      if (email == '' || password == '' || confirmPassword == '')
      {
        ToastAndroid.show('Please fill all the fields', ToastAndroid.SHORT);
      }
      else if (password != confirmPassword)
      {
        ToastAndroid.show('Password and Confirm Password do not match', ToastAndroid.SHORT);
      }
      else {
      try {
        createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            if(userCredential){
              console.log(userCredential);
              router.replace({pathname: '/userform', params: {uid: userCredential.user.uid}});

            }
          }).catch((error) => { ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT);
                            console.log(error); });
                          }
                           catch (error) {
                            ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT);
    }
  }
  }

    const OnLogin =  () => {
      if (email == '' || password == '') 
      {
        ToastAndroid.show('Please fill Email and Password', ToastAndroid.SHORT);
      }
      else
      {
        console.log(email, password);
        try {
          signInWithEmailAndPassword(firebaseAuth, email, password).then((usercred) => {
          if(usercred) {
            console.log(usercred);
            router.push('/home/collections');
          }
        }).catch((error) => { ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT); console.log(error); });
        }
      catch (error) {
        if (error.code == 'auth/user-not-found') {
          Alert.alert('User Not Found ', 'Please check your Email and Password', [
            {text: 'OK', onPress: () => {SetDefaults();}},
          ]);
      }
      else if (error.code == 'auth/wrong-password') {
        Alert.alert('Wrong Password ', 'Please check your Password', [
          {text: 'OK', onPress: () => {SetDefaults();}},
        ]);
      }
      else {
        ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT);
      }
    }
  }
}




    const OnClickGoogleHandler = async () => {
        console.log("Google Sign In");
    }

    return (
      <SafeAreaView style={[styles.Container, { gap: 10 }]}>
        

        {isLoginOrSignup == 1 ? (
          <>
            <Text style={[styles.Text, { marginVertical: 10 }]}>Login</Text>
            <View style={styles.fieldContainer}>
            <TextInput
              style={styles.BorderlessField}
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />
            </View>
            <View style={styles.fieldContainer}>
            <TextInput
              style={styles.BorderlessField}
              placeholder="Password"
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry={secureTextEntry1}
            />
            {secureTextEntry1?
            <Ionicons name='eye-off-outline' size={24} color='black'  style={styles.authIcon} onPress={()=>{setsecureTextEntry1(!secureTextEntry1);}}/>
            :<Ionicons name='eye-outline' size={24} color='black'  style={styles.authIcon} onPress={()=>{setsecureTextEntry1(!secureTextEntry1);}}/>}
            </View>
          </>
        ) : (
          <>
            <Text style={[styles.Text, { marginVertical: 10 }]}>Sign Up</Text>
            <View style={styles.fieldContainer}>
            <TextInput
              style={styles.BorderlessField}
              placeholder="Email"
              onChangeText={(text) => {
                setEmail(text);
              }}
            />

            </View>
            <View style={styles.fieldContainer}>
            <TextInput
              style={styles.BorderlessField}
              placeholder="Password"
              onChangeText={(text) => {
                setPassword(text);
              }}
              secureTextEntry={secureTextEntry1}
              value={password}
            />
            {secureTextEntry1?<Ionicons name='eye-off-outline' size={24} color='black' onPress={() => { setsecureTextEntry1(!secureTextEntry1); }} style={styles.authIcon}/>
            :<Ionicons name='eye-outline' size={24} color='black' onPress={() => { setsecureTextEntry1(!secureTextEntry1); }} style={styles.authIcon}/>}
            </View>
            <View style={styles.fieldContainer}>
            <TextInput
              style={styles.BorderlessField}
              placeholder="Conferm Password"
              onChangeText={(text) => {
                setConfirmPassword(text);
              }}
              secureTextEntry={secureTextEntry2}
              value={confirmPassword}
            />
            {secureTextEntry2?
            <Ionicons name='eye-off-outline' size={24} color='black'  style={styles.authIcon} onPress={()=>{setsecureTextEntry2(!secureTextEntry2);}}/>
            :<Ionicons name='eye-outline' size={24} color='black'  style={styles.authIcon} onPress={()=>{setsecureTextEntry2(!secureTextEntry2);}}/>}
            </View>
          </>
        )}

        <Checkbox
          value={buttonClickable}
          onValueChange={(value) => setButtonClickable(value)}
          label="Accept our Privacy policy"
          color="#000000"
        />

        {isLoginOrSignup == 1 ? (
          <>
            <TouchableOpacity
              style={[
                styles.button,
                buttonClickable ? styles.bgcolGreen : styles.bgcolGray,
              ]}
              onPress={() => {
                OnLogin();
              }}
              disabled={!buttonClickable}
            >
              <Text style={styles.Text}>Login</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[
                styles.button,
                buttonClickable ? styles.bgcolGreen : styles.bgcolGray,
              ]}
              onPress={() => {
                OnSignUP();
              }}
              disabled={!buttonClickable}
            >
              <Text style={styles.Text}>Sign Up</Text>
            </TouchableOpacity>
          </>
        )}

        <Text style={styles.Text}>OR</Text>

        <TouchableOpacity
          onPress={() => {
            setIsLoginOrSignup(isLoginOrSignup == 1 ? 2 : 1);
          }}
        >
          <Text style={[styles.HeaderH1, styles.colBlue]}>
            {" "} {isLoginOrSignup == 1 ? "If you do not have a account Sign Up" : "If you already have a account Login"} {" "}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            OnClickGoogleHandler();
          }}
          disabled={true}
        >
          <Text style={styles.Text}>Google</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
}


export default AuthScreen;
