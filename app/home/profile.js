import React, { useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, Modal, Button, TouchableOpacity, TextInput, Alert} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PhoneInput from "react-native-phone-number-input";
import { Ionicons } from "@expo/vector-icons";
import styles from '../../Style';
import { User, getAuth, signOut } from 'firebase/auth';
import { firebaseApp } from '../../config/Firebase';
import { useRouter } from 'expo-router';

const Page = () => {
    return(
        <Profile/>
    )
}

const Profile = () => {
    const [showAvatar, setShowAvatar] = useState(false);
    const [editNameEnable, setEditNameEnable] = useState(false);
    const [editNumEnable, setEditNumEnable] = useState(false);
    const [editEmailEnable, setEditEmailEnable] = useState(false);

    const [userExists, setuserExists] = useState(false);

    // User information

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formatedValue, setFormatedValue] = useState('');
    

    const phoneInput = useRef(null);

    const router = useRouter();

    const firebaseAuth = getAuth(firebaseApp);
    
    useEffect(() => {
        firebaseAuth.onAuthStateChanged((user) => {
            if(user) {
                setEmail(user.email);
                setuserExists(true);
            }
            else {
                console.log('no user');
                setuserExists(false);
                setEmail('');
                setName('');
                setPhoneNumber('');
            }
        });
    }, []);





    const OnChangeNumber = () => {
        if(editNumEnable) {
            setEditNumEnable(false);
            console.log(formatedValue);
            console.log(phoneNumber);
        }
        else{
            setEditNumEnable(true);
        }
    }

    const OnChangeEmail = () => {
        if(editEmailEnable) {
            setEditEmailEnable(false);
        }
        else{
            setEditEmailEnable(true);
        }
    }

    const OnChangeName = () => {
        if(editNameEnable) {
            setEditNameEnable(false);
        }
        else{
            setEditNameEnable(true);
        }
    }

    const OnSignOut = () => {
        handlePrompt();
    }

 
    const handlePrompt = async () => {
        const response = await showPrompt('Alert', 'Are you sure you want to sign out?');
        
        if (response !== null) {
          // User pressed OK
          console.log('User confirmed.');
            signOut(firebaseAuth).then(() => {
                // Sign-out successful.
                console.log('Sign-out successful.');
               
                router.push('/AuthScreen');
            }).catch((error) => {
                // An error happened.
                console.log(error);
            });
        } 
      };
      

    const showPrompt = (title, message) => {
        return new Promise((resolve) => {
          Alert.alert(
            title,
            message,
            [
              {
                text: 'No',
                style: 'cancel',
                onPress: () => resolve(null), // Resolve with null when canceled
              },
              {
                text: 'Yes',
                onPress: () => resolve(true), // Resolve with true when OK is pressed
                style: 'destructive',
              },
            ],
            { cancelable: false }
          );
        });
      };

    return (
        <>
        <SafeAreaView>
        <View style={styles.Container}>
        <Text style={[styles.Text, {marginTop: 10}]}>Profile</Text>
            <View style={{ width: '100%', height: '97%', alignContent: 'center', padding: 5, gap: 5}}>
                <View style={{alignItems: 'center'}}>
                    <Ionicons name="ios-person" size={96} color="black" />
                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                    <Text>Profile Picture</Text>
                    <TouchableOpacity onPress={()=> { setShowAvatar(!showAvatar)}} >
                        <Ionicons name="create-outline" size={24} color="black" />
                    </TouchableOpacity>
                    </View>
                </View>
                <View style={{height: 10}} />
                <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                    <Ionicons name="person" size={24} color="black" />
                    <Text>Full Name</Text>
                    </View>
                    <TextInput editable={editNameEnable} style={styles.TextField} name="fullName" value={name} onChangeText={text => setName(text)} />
                    <TouchableOpacity style={styles.SqBtn} onPress={()=> { OnChangeName()}} >
                        {editNameEnable ? <Ionicons name="checkmark-done-outline" size={24} color={"black"} /> 
                        : <Ionicons name="create" size={24} color={"black"} />}
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                    <Ionicons name="mail" size={24} color="black" />
                    <Text>Email</Text>
                    </View>
                    <TextInput editable={editEmailEnable} style={styles.TextField} name="email" value={email} onChangeText={text => setEmail(text)} />
                    <TouchableOpacity style={styles.SqBtn} onPress={()=> { OnChangeEmail()}} >
                        {editEmailEnable ? <Ionicons name="checkmark-done-outline" size={24} color={"black"} />
                        : <Ionicons name="create" size={24} color={"black"} />
                        }
                    </TouchableOpacity>
                </View>
                <View style={{alignItems: 'center'}}>
                    <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
                    <Ionicons name="call" size={24} color="black" />
                    <Text>Phone Number</Text>
                    </View>
                    <PhoneInput
                    ref={phoneInput}
                    value={phoneNumber}
                    defaultCode="IN"
                    layout="first"
                    onChangeText={(text) => {
                        setPhoneNumber(text);
                    }}
                    onChangeFormattedText={(text) => {
                        setFormatedValue(text);
                    }}
                    onChangeCountry={(text) => {
                        console.log(text);
                    }}
                    style={styles.TextField}
                    disableArrowIcon={true}
                    placeholder = 'Enter your phone number'
                    withDarkTheme = {false}
                    withShadow = {false}
                    autoFocus = {false}
                    disabled={!editNumEnable}
                     />
                    <TouchableOpacity style={styles.SqBtn} onPress={()=> { OnChangeNumber()}} >
                        {editNumEnable ? <Ionicons name="checkmark-done-outline" size={24} color={"black"} />
                        : <Ionicons name="create" size={24} color={"black"} />}
                    </TouchableOpacity>
                </View>
                <View style={{height: 10}} />
                <View style={{height: 2, width: '90%', backgroundColor: 'black', alignSelf: 'center'}}/>
                <View style={{height: 10}} />
                <Text style={{alignSelf: 'center'}}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </Text>
                {userExists ? <TouchableOpacity style={[styles.button, {flexDirection: 'row', justifyContent: 'space-evenly', alignSelf: 'center'}]} onPress={()=> {OnSignOut()}} >
                    <Ionicons name="log-out-outline" size={24} color="white" />
                    <Text style={styles.buttonText}>Sign Out</Text>
                </TouchableOpacity>
                : <>
                <Text style={[styles.Text, styles.colBlue, {alignSelf: 'center'}]}>You are not logged in</Text>
                <Text style={[styles.HeaderH2, styles.colBlue, {alignSelf: 'center'}]}>To set your account press on Login</Text>
                <TouchableOpacity style={[styles.button, {alignSelf: 'center'}]} onPress={()=> {router.push('/AuthScreen');}}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity></>}
            </View>
        </View>
        
        </SafeAreaView>
        <AvatarCatalog isShow={showAvatar} setIsShow={setShowAvatar}/>
        </>
    )
}

const AvatarCatalog = ({isShow, setIsShow}) => {
    return (
        <Modal 
        visible={isShow}
        animationType="slide"
        transparent={true}
        >
        <View style={styles.modal}>
            <TouchableOpacity onPress={()=> {setIsShow(!isShow)}}>
                <Ionicons name="close" size={24} color="black" />
                <Text>Close</Text>
            </TouchableOpacity>
            <Text>Avatars</Text>
        </View>
        </Modal>
    );
}



export default Page;
