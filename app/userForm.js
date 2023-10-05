import React, { useState, useEffect, useRef} from 'react';
import {View, TouchableOpacity, TextInput, Text, ToastAndroid, Alert} from 'react-native';
import { useRouter } from "expo-router";
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebaseApp } from '../config/Firebase';
import styles from '../Style';
import { Checkbox } from 'react-native-ui-lib';
import PhoneInput from "react-native-phone-number-input";
import { setDoc, collection, doc, getFirestore } from 'firebase/firestore';

const userForm = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formatedValue, setFormatedValue] = useState('');
    const phoneInput = useRef(null);
    const [firstName, setFirstName] = useState('');
    const [middleName, setMiddleName] = useState('');
    const [lastName, setLastName] = useState('');
    const router = useRouter();

    const db = getFirestore(firebaseApp);


    const [user, setUser] = useState(null);

    useEffect(() => {
        setUser(firebaseApp.auth().currentUser);
        console.log(user);
    }, []);

    const PhoneNumVerifying = () => {



        if(phoneNumber.length==10) {
            return true;
        }
        else {
            return false;
        }
    }

    async function SaveDate (date) {

        try {
            await setDoc(doc(collection(db, 'users'), user.uid), date);
            router.push('/home/collections');
        } catch (error) {
            console.log(error);
        }

    }
    
    function OnSubmit() {
        if(firstName=='' || lastName=='' || phoneNumber=='') {
            Alert.alert('Please fill all the fields');
        }
        else if(PhoneNumVerifying) {


            const data = {
                name: { 
                    first: firstName,
                    middle: middleName,
                    last: lastName,
                },
                phoneNumber: formatedValue,
            }

            SaveDate(data);

            }
            else {
                Alert.alert('Please enter a valid phone number');
            }
        }

  return (
    <SafeAreaView style={styles.Container}>

        <View style={styles.form}>
            <Text style={[styles.HeaderH1, styles.colBlue]}>Complete Your Account</Text>
            <View>
            <TextInput style={styles.Input}
            placeholder="First Name" 
            placeholderTextColor="#000" 
            value={firstName}
            onChangeText={(text)=>{setFirstName(text)}}/>
            <TextInput style={styles.Input} 
            placeholder="Middle Name" 
            placeholderTextColor="#000" 
            value={middleName}
            onChangeText={(text)=>{setMiddleName(text)}}/>
            <TextInput style={styles.Input} 
            placeholder="Last Name"
            placeholderTextColor="#000" 
            value={lastName}
            onChangeText={(text)=>{setLastName(text)}}/>
            </View>
            <TextInput style={styles.Input} placeholder="Phone Number" placeholderTextColor="#000" />
            <PhoneInput
                ref={phoneInput}
                defaultValue={phoneNumber}
                defaultCode="IN"
                layout="first"
                onChangeText={(text) => {
                    setPhoneNumber(text);
                }}
                onChangeFormattedText={(text) => {
                    setFormatedValue(text);
                }}
                withDarkTheme
                withShadow
                containerStyle={{borderRadius: 10, backgroundColor: 'rgba(230, 225, 230, 0.9)', marginVertical: 5}}
                textContainerStyle={{backgroundColor: 'transparent'}}
                textInputStyle={{color: '#000', fontSize: 16}}
                codeTextStyle={{color: '#000', fontSize: 16}}
                placeholder="Enter Your Phone Number"
                placeholderTextColor="#000"
                />
            <Checkbox label="I agree to the Terms and Conditions" color="#000" value={true} />
            <TouchableOpacity style={styles.Btn} onPress={()=>{OnSubmit()}}>
                <Text style={[styles.Text, styles.colWhite]}>Save Changes</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default userForm
