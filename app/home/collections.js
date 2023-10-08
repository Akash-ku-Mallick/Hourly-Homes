import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import {
    View, ScrollView,
    GestureResponderEvent,
    TouchableOpacity as RNTouchableOpacity,
    TouchableOpacityProps as RNTouchableOpacityProps,
    BackHandler, Alert, ImageBackground, Modal, TextInput
  } from 'react-native';
  import { Text, Carousel, Image, Colors} from 'react-native-ui-lib';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import styles from '../../Style';

import * as Location from 'expo-location';
import axios from 'axios';

import { properties } from '../../config/mocData';
import { useRouter } from 'expo-router';



const collections = () => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [text, setText] = useState("Waiting..");
  const [guestCount, setGuestCount] = useState(1);
  const [modal, setModal] = useState(false);
  const [currentId, setCurrentId] = useState(1);
  const [SearchLocation, setSearchLocation] = useState("Select your next destination");

  const [AvailabilityModalvisible, setAvailabilityModal] = useState(false);

  const router = useRouter();


  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //       return;
  //     }

  //     let loc = await Location.getCurrentPositionAsync({});

  //     setLocation(loc);
  //   })();
  // }, []);


  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (location) {
    axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${location.coords.latitude}+${location.coords.longitude}&key=ffbfa5c3303a45d9a894fb827e8affe2`)
    .then((response) => {
        setText(response.data.results[0].components.state_district);
      })
      .catch((error) => {
        console.error(error);
        setText("Waiting..");
      });
    }
    
    }, [location]);

  return (
    <SafeAreaView>
      <View style={styles.Header}>
        <Text style={styles.HeaderH1}>HourlyHomes</Text>
        <View style={{ flexDirection: "row", gap: 10 }}>
          <Ionicons name="navigate" size={24} color="red" />
          <Text style={styles.HeaderH2}>{text}</Text>
        </View>
        <RNTouchableOpacity 
        style={[styles.posTopRight, {height: 40, width: 40, margin: 4, alignItems: 'center'}]} 
        onPress={()=>{router.push({ pathname: '/settings'})}}>
          <Ionicons name="settings-outline" size={32} color="rgba(0, 140, 10, 1)" />
        </RNTouchableOpacity>
      </View>
        <View style={{alignItems: 'center', margin: 5}}>
        
            <RNTouchableOpacity onPress={()=>{console.log('activated');}} activeOpacity={0.9} style={styles.searchHome}>
              <Ionicons name="search" size={26} color="rgba( 10, 10, 210, 1)" />
            </RNTouchableOpacity>

        </View>
      <View>
      <Text style={styles.HeaderH1}>Top places for you</Text>
      <Carousel
        containerStyle={{height: 320}}
        pageControlPosition={'under'}
        pageControlProps={{
          size: 10,
          color: 'grey',
          inactiveColor: Colors.dark60,
        }}
        pageControlStyle={{marginBottom: 10, justifyContent: 'center'}}
        loop
        autoplay
        autoplayInterval={5000}
        itemSpacings={10}
      >
        {properties.map((property) => {
        return(<VerticalCard key={property.id} imageURL={property.imageURL} id={property.id} name={property.name} address={property.address} rating={property.rating} mrp={property.mrp} price={property.price} discount={property.discount} setModal={setModal} setCurrentId={setCurrentId} />)
        } )}
        </Carousel>
      </View>
      <ModalView modalVisibility={modal} id={currentId} setModal={setModal} guestCount={guestCount}  setGuestNum={setGuestCount} setAvailabilityModal={setAvailabilityModal}/>
      {/* <AvailabilityModal visibility={AvailabilityModalvisible} setVisibility={setAvailabilityModal} guest={guestCount} id={currentId} /> */}
    </SafeAreaView>
  );
};




const ModalView = ({modalVisibility, id, setModal, guestCount, setGuestNum, setAvailabilityModal}) => {
  const [mainImage, setMainImage] = useState(null);
  const [imageURL1, setImageUrl1] = useState(null);
  const [imageURL2, setImageUrl2] = useState(null);
  const [imageURL3, setImageUrl3] = useState(null);

  const [name, setName] = useState('name');
  const [Address, setAddress] = useState('address');
  const [Mrp, setMrp] = useState('address');
  const [price, setPrice] = useState('price');
  const [Discount, setDiscount] = useState('discount');
  const [rating, setRating] = useState('rating');
  const [description, setDescription] = useState('description');

  const [loading, setLoading] = useState(true);



  useEffect(() => {
    if (id) {
      let x = properties.find((property) => property.id === id);
      if(x){
        try {
          setName(x.name);
        setAddress(x.address);
        setMrp(x.mrp);
        setPrice(x.price);
        setDiscount(x.discount);
        setRating(x.rating);
        setDescription(x.description);
        setMainImage(x.imageURL);
        setImageUrl1(x.imageURL1);
        setImageUrl2(x.imageURL2);
        setImageUrl3(x.imageURL3);
        setLoading(false);
        } catch (error) {
          console.log(error);
          setModal(false);
        }
      }
      }
    else{
      setLoading(true);
      setModal(false);
    }
  }, [id]);

  const swapImage = (imageURL) =>
  {
    if (imageURL === imageURL1) {
      setImageUrl1(mainImage);
      setMainImage(imageURL);
    }
    else if (imageURL === imageURL2) {
      setImageUrl2(mainImage);
      setMainImage(imageURL);
    }
    else if (imageURL === imageURL3) {
      setImageUrl3(mainImage);
      setMainImage(imageURL);
    }
    else {
      setMainImage(imageURL);
    }
  }


  return (
    <Modal
    visible={modalVisibility}
    animationType='slide'
    transparent={true}>
      <View style={styles.modal}>
        <RNTouchableOpacity onPress={()=> {setModal(false)}} style={{flexDirection: 'row', justifyContent: 'center',
      marginBottom: 5}}>
          <Ionicons name="close" size={24} color="black" />
          <Text>Close</Text>
        </RNTouchableOpacity>
        <View >

          {loading?<View style={{width: '100%', height: 300, backgroundColor: 'gray'}}/>:<ImageBackground source={{uri: mainImage}} style={{width: '100%', height: 300}} />}

          <View style={{flexDirection: 'column', justifyContent: 'space-evenly', position: 'absolute', right: 0, bottom: 0, gap: 5,
        marginRight: 5}}>
            {(imageURL1!==null)?<RNTouchableOpacity style={{padding: 5, margin: 5, backgroundColor: 'white', height:70, width: 70}} onPress={()=> {swapImage(imageURL1)}}>
              <ImageBackground source={{uri: imageURL1}} style={{width: 60, height: 60}} />
            </RNTouchableOpacity>:null}
            {(imageURL2!==null)?<RNTouchableOpacity style={{padding: 5, margin: 5, backgroundColor: 'white', height:70, width: 70}} onPress={()=> {swapImage(imageURL2)}}>
              <ImageBackground source={{uri: imageURL2}} style={{width: 60, height: 60}} />
            </RNTouchableOpacity>:null}
            {(imageURL3!==null)?<RNTouchableOpacity style={{padding: 5, margin: 5, backgroundColor: 'white', height:70, width: 70}} onPress={()=> {swapImage(imageURL3)}}>
              <ImageBackground source={{uri: imageURL3}} style={{width: 60, height: 60}} />
            </RNTouchableOpacity>:null}
          </View>
        </View>
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center'}}>
          <View>
          <Text style={styles.introText}>{name}</Text>
          <Text>{Address }</Text>
          <View style={{flexDirection: 'row', gap: 5, alignItems: 'baseline'}}>
          <Text style={styles.mrp}>{Mrp}</Text><Text style={[styles.price, styles.colBlack]}>{price}</Text><Text>Rs/Hr</Text><Text>{Discount} %OFF</Text>
          </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 5, alignContent: 'baseline', margin: 5}}>
          <Text style={styles.HeaderH2}>Ratings</Text>
          { Reviews(rating)}
          </View>
          </View>
        </View>
        <View>
          <Text>{description}</Text>
        </View>
        <View style={{position: 'absolute', bottom: 0, width: '100%', height: 80, borderColor: 'gray', borderTopWidth: 0.5, borderCurve: 5}}>
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', width: 160 ,gap: 8, backgroundColor: 'rgba(200, 200, 200, 0.2)', margin: 5, padding: 5, borderRadius: 5, marginLeft: 10}}>
        <Text style={[styles.HeaderH1, styles.colBlue]}>{guestCount}</Text>
        <Text style={[styles.HeaderH1, styles.colBlack]}>Guests</Text>
        
        <View style={{flexDirection: 'column', alignItems: 'center', gap: 2}}>
        <RNTouchableOpacity style={[styles.SqBtn, {backgroundColor: 'rgba(255, 255, 255, 0.8)', borderColor: 'gray', borderWidth: 0.4}]} onPress={()=>{if(guestCount<8)setGuestNum(guestCount+1)}} activeOpacity={0.4}>
          <Ionicons name="add-outline" size={24} color="black" />
        </RNTouchableOpacity>
        <RNTouchableOpacity style={[styles.SqBtn, {backgroundColor: 'rgba(255, 255, 255, 0.7)', borderColor: 'gray', borderWidth: 0.4}]} onPress={()=>{if(guestCount>1){setGuestNum(guestCount-1)}}} activeOpacity={0.4}>
          <Ionicons name="remove-outline" size={24} color="black" />
        </RNTouchableOpacity>
        </View>
        </View>
        <RNTouchableOpacity style={[styles.button, styles.posBottomRight, {backgroundColor: 'rgba(40, 170, 30, 1)'}]}
        onPress={()=> {setAvailabilityModal(true)}}>
          <Text style={[styles.introText, styles.colWhite]}>Book</Text>
        </RNTouchableOpacity>
        </View>
      </View>
      
    </Modal>
  )
}





// const AvailabilityModal = ({visibility, setVisibility, id, guest}) => {
//   const [selectedIds, selectedIdsSet] = useState([]);
  

//   const Cell = ({id, isAvailable}) => {
//     const [isSelected, setSelected] = useState(false);
//     const [time, setTime] = useState('00:00');

//     const OnClick = () => {
//       if(!isSelected && isAvailable) {console.log(id);}
//     }

//   useEffect(() => {
//     if (id==1){
//       setTime('09:00 am');
//     }
//     else if (id==2){
//       setTime('10:00 am');
//     }
//     else if (id==3){
//       setTime('11:00 am');
//     }
//     else if (id==4){
//       setTime('12:00 pm');
//     }
//     else if (id==5){
//       setTime('01:00 pm');
//     }
//     else if (id==6){
//       setTime('02:00 pm');
//     }
//     else if (id==7){
//       setTime('03:00 pm');
//     }
//     else if (id==8){
//       setTime('04:00 pm');
//     }
//     else if (id==9){
//       setTime('05:00 pm');
//     }
//     else if (id==10){
//       setTime('06:00 pm');
//     }
//   }, [])

//     return (
//       <RNTouchableOpacity style={styles.cell} onPress={()=>{setSelected(!isSelected); OnClick();}}>
//       <View style={{ height: '50%', width: '50%', backgroundColor: isAvailable? isSelected ? 'rgba(0, 100, 0, 0.4)' : 'rgba(200, 200, 200, 0.4)' : 'rgba(100, 0, 0, 0.4)', borderRadius: 10, borderWidth: 0.5, borderColor: 'gray'}}>
//       </View>
//       <Text style={{fontSize: 10, alignSelf: 'baseline'}}>{time}</Text>
//       </RNTouchableOpacity>
//     )
//   }


//   return (
//     <Modal style={{ flex: 1, zIndex: 4, justifyContent: 'center', alignContent: 'flex-end'}} transparent={true} animationType='slide' visible={visibility}>
//       <View style={{flexDirection: 'column',width: '80%', height: '40%', backgroundColor: 'white', borderRadius: 10, borderWidth: 1, borderColor: 'gray', position: 'absolute', alignSelf: 'center', bottom: 0, marginBottom: 400, elevation: 10, padding: 10, alignContent: 'center'}}>
//         <RNTouchableOpacity onPress={()=>{setVisibility(false)}} style={[{flexDirection: 'row', justifyContent: 'center',  marginBottom: 5}]}>
//           <Ionicons name="close" size={24} color="black" />
//           <Text>Close</Text>
//         </RNTouchableOpacity>
//         <View style={styles.Header}>
//           <Text style={styles.HeaderH1}>Availability</Text>
//         </View>
//         <Text>Guests : {guest}</Text>
//           <RNTouchableOpacity onPress={()=>{console.log('calander')}} style={styles.button}>
//             <Text style={[styles.introText, styles.colWhite]}>Date</Text>
//           </RNTouchableOpacity>
        
//     <View style={styles.grid}>
//       {/* Row 1 */}
//       <View style={styles.row}>
//         <Cell id={1} isAvailable={true}/>
//         <Cell id={2} isAvailable={true}/>
//         <Cell id={3} isAvailable={false}/>
//         <Cell id={4} isAvailable={true}/>
//         <Cell id={5} isAvailable={true}/>
//       </View>
//       {/* Row 2 */}
//       <View style={styles.row}>
//         <Cell id={6} isAvailable={true}/>
//         <Cell id={7} isAvailable={false}/>
//         <Cell id={8} isAvailable={true}/>
//         <Cell id={9} isAvailable={true}/>
//         <Cell id={10} isAvailable={true}/>
//       </View>
//     </View>
//         <View style={{flexDirection: 'row', justifyContent: 'space-evenly', width: '100%', height: '100%'}}>
          
//         </View>
//       </View>
//     </Modal>
//   )
// }

const VerticalCard = ({imageURL , id, name, address, rating, mrp, price, discount, setModal, setCurrentId}) => {
  
  return (
    <View style={{width: '95%', height: 300, backgroundColor: 'gray', margin: 10}}>
      <RNTouchableOpacity onPress={()=>{setCurrentId(id); setModal(true);}}>
      <ImageBackground  source={{uri: imageURL}} style={{height: 270, width:'100%', resizeMode: 'cover', justifyContent: 'flex-end', paddingLeft: 5}} resizeMode="cover" >
        <Text style={[styles.HeaderH1, styles.colWhite]}>{name}</Text>
        <Text style={[styles.HeaderH1, styles.colWhite]}>{address}</Text>
        <View style={{flexDirection: 'row', gap: 3, alignItems: 'baseline'}}>
        <Text style={[styles.mrp]}>{mrp}</Text><Text style={[styles.price, styles.colWhite]} >{price}</Text><Text style={[styles.colWhite]} >Rs/Hr</Text><Text style={[styles.colWhite]} >{discount} %off</Text>
        </View>
        <View style={{ flexDirection: 'row', gap: 5, alignItems: 'center'}}>
          {Reviews(rating)}
        </View>
      </ImageBackground>
      </RNTouchableOpacity>
    </View>
  )
}

const Reviews = (rating) => {
  if(rating === 0){
    return (<Text>No Reviews</Text>)
  }
  else if (rating === 1) {
    return (<View style={{flexDirection: 'row', gap: 2.5}}>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
    </View>)
  }
  else if (rating === 2) {
    return (<View style={{flexDirection: 'row', gap: 5}}>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      </View>)
  }
  else if (rating === 3) {
    return (<View style={{flexDirection: 'row', gap: 5}}>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      </View>)
  }
  else if (rating === 4) {
    return (<View style={{flexDirection: 'row', gap: 5}}>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star-outline' size={24} color='rgba(250, 200, 10, 1)'/>
      </View>)
  }
  else if (rating === 5) {
    return (<View style={{flexDirection: 'row', gap: 5}}>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      <Ionicons name='star' size={24} color='rgba(250, 200, 10, 1)'/>
      </View>)
  }
}


export default collections;
