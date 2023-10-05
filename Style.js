import React from 'react';
import { StyleSheet} from 'react-native';


const styles = StyleSheet.create({
    Container: {
        backgroundColor: 'white',
        alignContent: 'flex-start',
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#fff',
        width: '100%',
    },
    Text: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
    },
    modal: {
        backgroundColor: 'white',
        marginTop: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        elevation: 10,
        borderColor: 'gray',
        borderTopWidth: 1,
        borderLeftWidth: 1,
        borderRightWidth: 2,
        flex: 1,
        paddingTop: 15,
    },
    floatingButton: {
        backgroundColor: '#fff',
        width: 60,
        height: 60,
        borderRadius: 10,
        position: 'absolute',
        bottom: 10,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
        borderColor: 'gray',
        borderBottomWidth: 1,
        borderLeftWidth: 0.3,
        borderRightWidth: 1,
        borderTopWidth: 0.3,
    },
    TextField: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        width: '90%',
    },
    button: {
        backgroundColor: 'rgba(128, 117, 235, 0.8)',
        padding: 5,
        borderRadius: 5,
        height: 50,
        width: 180,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    Header: {
        backgroundColor: 'white',
        height: 70,
        width: '100%',
        flexDirection: 'column',
        padding: 10,
        elevation: 0,
        borderBottomWidth: 0,
        borderBottomColor: 'gray',
    },
    HeaderH1: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    HeaderH2: {
        fontSize: 13,
        fontWeight: 'normal',
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        opacity: 0.7,
    },
    IntroBtn: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        borderWidth: 0.2,
        borderColor: 'gray',
        padding: 5,
        borderRadius: 5,
        height: 50,
        width: 160,
        alignItems: 'center',
        marginTop: 20,
        elevation: 10,
    },

    posTopLeft: {
        position: 'absolute',
        top: 0,
        left: 0,
        marginLeft: 10,
        marginTop: 10,
    },
    posTopRight: {
        position: 'absolute',
        top: 0,
        right: 0,
        marginRight: 10,
        marginTop: 10,
    },
    posBottomLeft: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        marginBottom: 10,
        marginLeft: 10,
    },
    posBottomRight: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        marginBottom: 10,
        marginRight: 10,
    },
    posTopCenter: {
        position: 'absolute',
        top: 0,
        alignSelf: 'center',
        marginTop: 5,
    },
    posRight: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        marginRight: 10,
    },
    introText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    colWhite: {
        color: 'rgba(255, 255, 255, 1)',
    },
    colBlack: {
        color: 'rgba(0, 0, 0, 1)',
    },
    colRed: {
        color: 'rgba(255, 0, 0, 1)',
    },
    colBlue: {
        color: 'rgba(0, 0, 255, 1)',
    },
    bgcolWhite: {
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    bgcolBlack: {
        backgroundColor: 'rgba(0, 0, 0, 1)',
    },
    bgcolRed: {
        backgroundColor: 'rgba(255, 0, 0, 1)',
    },
    bgcolBlue: {
        backgroundColor: 'rgba(0, 0, 255, 1)',
    },
    bgcolGray: {
        backgroundColor: 'rgba(160, 160, 160, 0.6)',
    },
    bgcolGreen: {
        backgroundColor: '#5dbea3',
    },
    hidden: {
        display: 'none',
    },
    visible: {
        display: 'flex',
    },
    mrp: {
        textDecorationLine: 'line-through',
        textDecorationColor: 'red', 
        color: 'rgba(255,0,0,0.5)',
        fontSize: 15,
        fontWeight: 'bold',
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    SqBtn: {
        padding: 1,
        borderRadius: 5,
        height: 30,
        width: 30,
        alignItems: 'center',
    },
    grid: {
        flex: 1,
        flexDirection: 'column', // Rows are stacked vertically
        justifyContent: 'space-between', // Centered vertically
        gap: 80,
        marginVertical: 20,
      },
      row: {
        flex: 0.5,
        flexDirection: 'row',
        gap: 5, 
        justifyContent: 'space-evenly',
      },
      cell: {
        justifyContent: 'center', // Center content vertically
        alignItems: 'center', // Center content horizontally
        height: 70, // Adjust the cell height as needed
        width: 70,
        borderRadius: 10,
      },
      screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        backgroundColor: 'lightblue',
      },
      BorderlessField: {
        borderWidth: 0,
        borderColor: 'transparent',
        padding: 10,
        width: '80%',
    },
    fieldContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        margin: 5,
        flexDirection: 'row',
        alignContent: 'center',
        width: '90%',
        justifyContent: 'space-between',
        alignItems: 'center',

    },
    authIcon: {
        borderLeftColor: 'gray',
        borderLeftWidth: 1,
        height: '120%',
        padding: 10,
        alignSelf: 'center',
    },
    }
)

export default styles;
