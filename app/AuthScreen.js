import React, { useState} from 'react';
import {View, TouchableOpacity, TextInput, Text, ToastAndroid, Alert} from 'react-native';
import { useRouter } from "expo-router";
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

    const router = useRouter();

    const firebaseAuth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);


    const SetDefaults = () => { 
      setEmail(''); 
      setPassword(''); 
      setConfirmPassword(''); 
      router.replace('/AuthScreen');
    }



    const OnSignUP = () => {
      try {
        createUserWithEmailAndPassword(firebaseAuth, email, password).then((userCredential) => {
            setUser(userCredential.user);
            
            router.push('/userForm');
          });
    } catch (error) {
        ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT);
    }
    }

    const OnLogin = async () => {
      if (email == '' || password == '') 
      {
        ToastAndroid.show('Please fill Email and Password', ToastAndroid.SHORT);
      }
      else
      {
        console.log(email, password);
        try {
          let usercred = await signInWithEmailAndPassword(firebaseAuth, email, password);
          async.if(usercred.user, () => {
            setUser(usercred.user);
            router.push('/home/collections');
          }
          );
        }
      catch (error) {
        async.if(usercred.user, () => {
          setUser(usercred.user);
          router.push('/home/collections');
        }
        );
        if (error.code == 'auth/user-not-found') {
          Alert.alert('User Not Found ', 'Please check your Email and Password', [
            {text: 'OK', onPress: () => {SetDefaults();}},
          ]);
      }
      }
    }
  }


    const createProfile = async (response) => {
      // try {
      //   const docRef = await addDoc(collection(db, "users"), {
      //     email: response.user.email,
      //     name: {
      //       first: '',
      //       middle: '',
      //       last: '',
      //     },
      //     phone: '',
      //     adhar: '',
      //     avatar: '',
      //     }          
      //   );
      //   console.log("Document written with ID: ", docRef.id);
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }
      try {
        const docRef = await setDoc(doc(db, "users", response.user.uid), {
          email: response.user.email,
          name: {
            first: '',
            middle: '',
            last: '',
          },
          phone: '',
          adhar: '',
          avatar: '',
          }          
        );
        console.log("Document written with ID: ", docRef.id);
        
      } catch (error) {
        ToastAndroid.show('Some Error occoured', ToastAndroid.SHORT);
      }
      };

    const findProfile = async (response) => {
        // const snapshot = await db().ref(`/users/${response.user.uid}`).once("value");
        // const exists = snapshot.val() !== null;
        // if (!exists) {
        //   await createProfile(response);
        // }
        console.log(response.user.uid);
      };


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
