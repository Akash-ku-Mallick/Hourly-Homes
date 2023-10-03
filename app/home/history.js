import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, FlatList, ScrollView, Dimensions} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from '../../Style';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../../config/Firebase';


const screens = [
    { id: '1', title: 'UpcomingBookingSceen'},
    { id: '2', title: 'PastBookingsSceen'}
  ];

const Page = () => {

    const [authState, setAuthState] = useState(true);

    onAuthStateChanged(firebaseAuth, (user) => {
        if(user) {
            setAuthState(true);
        }
        else {
            setAuthState(false);
        }
    });

    return (
        <SafeAreaView>
            {authState ? <AuthScreen /> : <NonAuthScreen />}
        </SafeAreaView>
    );
}

const NonAuthScreen = () => {
  const router = useRouter();
    return (
        <View style={[styles.Container, {alignItems: 'center', justifyContent: 'center'}]}>
            <View style={{height: '35%', width: '70%', alignSelf: 'center', alignContent: 'center', alignItems: 'center', justifyContent: 'space-evenly', backgroundColor: 'rgba(230, 225, 230, 0.9)', borderRadius: 15, padding: 5, borderColor: 'gray', borderWidth: 1}}>
                <Text style={styles.HeaderH1}>You have no Bookings yet!</Text>
                <Text style={styles.HeaderH1}>Please Login to view your Bookings</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{router.push('/AuthScreen')}}>
                    <Text style={[styles.Text, styles.colWhite]}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const AuthScreen = () => {

    const [selectedScreen, setSelectedScreen] = useState(2);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        setHeight(Dimensions.get('window').height);
        setWidth(Dimensions.get('window').width);
    }, []);


    return (
      <View
        style={
          {height: height, width: width, backgroundColor: 'white'}
        }
      >
        <View
          style={[
            styles.Header,
            {
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignContent: "center",
              borderBottomColor: "gray",
              borderBottomWidth: 1,
              height: height/15,
            },
          ]}
        >
          <TouchableOpacity
            style={{
              width: "50%",
              borderRightWidth: 1,
              borderRightColor: "gray",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setSelectedScreen(1);
            }}
          >
            <Text style={[styles.HeaderH1]}>Upcoming Bookings</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "50%",
              padding: 10,
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              setSelectedScreen(2);
            }}
          >
            <Text style={[styles.HeaderH1]}>Past Bookings</Text>
          </TouchableOpacity>
          </View>
          <View style={{height: height/15*13, backgroundColor: 'white', width: width}}>
            
              {selectedScreen == 1 ? <UpcomingBookings />:<PastBookingsSceen />}

          </View>
      </View>
    );
}
const bookingn = [
  {id: 1, title: 'booking 1', status: 'success'},
  {id: 2, title: 'booking 2', status: 'cancled'},
  {id: 3, title: 'booking 3', status: 'cancled'},
  {id: 4, title: 'booking 4', status: 'success'},
  {id: 5, title: 'booking 5', status: 'cancled'},
  {id: 6, title: 'booking 6', status: 'cancled'},
  {id: 7, title: 'booking 7', status: 'cancled'},
  {id: 8, title: 'booking 8', status: 'success'},
  {id: 9, title: 'booking 9', status: 'cancled'}, 
  {id: 10, title: 'booking 10', status: 'cancled'},
  {id: 11, title: 'booking 11', status: 'success'},
  {id: 12, title: 'booking 12', status: 'cancled'},
  {id: 13, title: 'booking 13', status: 'success'},
  {id: 14, title: 'booking 14', status: 'cancled'},
  {id: 15, title: 'booking 15', status: 'success'},
  {id: 16, title: 'booking 16', status: 'cancled'},
  {id: 17, title: 'booking 17', status: 'success'},
  {id: 18, title: 'booking 18', status: 'success'},
  {id: 19, title: 'booking 19', status: 'success'},
  {id: 20, title: 'booking 20', status: 'cancled'},
  {id: 21, title: 'booking 21', status: 'success'},
  {id: 22, title: 'booking 22', status: 'success'},
]

const UpcomingBookings = () => {
  
  return (
    <View style={{height: '100%', width: '100%', backgroundColor: 'pink'}}>
      <FlatList
        data={bookingn}
        renderItem={({item}) => (
          <View style={{height: 100, width: '100%', backgroundColor: 'rgba(170, 100, 160, 1)', borderBottomColor: 'white', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 1}}>
            <Text style={styles.HeaderH1}>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
}

const PastBookingsSceen = () => {
  return (
    <View style={{height: '100%', width: '100%', backgroundColor: 'white'}}>
      <FlatList
        data={bookingn}
        renderItem={({item}) => (
          <TouchableOpacity style={{height: 100, width: '100%', backgroundColor: 'rgba(100, 120, 160, 1)', borderBottomColor: 'white', borderBottomWidth: 1, justifyContent: 'center', alignItems: 'center', marginBottom: 1}}
          onPress={()=>{console.log(item.id);}}>
            <Text style={styles.HeaderH1}>{item.title}</Text>
          </TouchableOpacity>
        )} 
      />
    </View>
  );
}



export default Page;