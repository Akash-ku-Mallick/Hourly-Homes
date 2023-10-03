import 'expo-router/entry';
import 'react-native-gesture-handler';
import { Text, Button, TouchableOpacity, Pressable, ImageBackground, View } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect } from 'react';
import styles from '../Style'
import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from 'expo-status-bar';
import { firebaseAuth } from '../config/Firebase';
import { onAuthStateChanged } from 'firebase/auth';


export default function Page () {

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((user) => {
      if(user) {
        console.log(user);
      }
      else {
        console.log('no user');
      }
    }
    );
  }, []);

  const router = useRouter();

  setTimeout(() => {
    setVisible(true);
  }, 10000);



  return (
    <SafeAreaView>
      <View style={[styles.Container, {backgroundColor: 'black'}]}>
        <ImageBackground source={require('../assets/hotel1.jpg')} style={styles.backgroundImage}>
        <Text style={[styles.introText, styles.colWhite]}>Welcome to Hourly Homes</Text>
        <Text style={[styles.HeaderH2, styles.colWhite]}>The best place to find your home away from home</Text>

      <Link href="/home/collections" asChild style={styles.posTopRight}>
        
        <TouchableOpacity style={styles.IntroBtn}>
        <View style={visible? styles.visible: styles.hidden}>
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.introText, styles.colWhite]}>Skip</Text>
          <Ionicons name='chevron-forward-outline' size={46} color='white'/>
          </View> 
          </View>
        </TouchableOpacity>
        
      </Link>
      <Link href="/AuthScreen" asChild >
      <TouchableOpacity style={styles.IntroBtn} >
          <Text style={[styles.introText, styles.colWhite]}>Login</Text>
        </TouchableOpacity>
      </Link>
      </ImageBackground>
      </View>
      <StatusBar translucent/>
    </SafeAreaView>
  );
}



