import { Text, View, TouchableOpacity, Alert} from 'react-native'
import React, { useEffect, useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../Style'
import { getAuth, deleteUser } from "firebase/auth";
import { firebaseApp } from '../config/Firebase';


const settings = () => {
    const [btnVisible, setBtnVisibility] = useState(false);
    const [user, setUser] = useState(true);
    const auth = getAuth(firebaseApp);




    useEffect(() => {
        auth.currentUser ? setUser(auth.currentUser) : setUser(null);
        if(user) {
            setBtnVisibility(true);
        }
        else {
            setBtnVisibility(false);
        }
    }, []);


    const DeleteAccount = () => {
        const deletePermanent = async () => {
            try {
                await deleteUser(user);
                Alert.alert('Account Deleted', 'Your account has been deleted permanently');
            } catch (error) {
                console.log(error);
            }
        };
        Alert.alert('Delete Account from here', 'Are you sure', [
            {
              text: 'No',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'Yes', onPress: () => {deletePermanent()}},
          ]);
    }
  return (
    <SafeAreaView style={styles.Container}>
        <View style={{alignContent: 'center', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
            <TouchableOpacity onPress={()=> {DeleteAccount()}} style={{display: btnVisible? 'flex': 'none'}}>
                <Text style={[styles.Text, styles.colBlue]}>Delete Account</Text>
            </TouchableOpacity>
        </View>

    </SafeAreaView>
  )
}

export default settings
