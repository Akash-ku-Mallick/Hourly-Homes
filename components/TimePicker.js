import React, { useEffect, useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';

const TimePicker = ({data, modalVisible, setModalVisible}) => {
    const [selectedBlocks, setSelectedBlocks] = useState(Array(10).fill(3));
    const [yourChoice, setYourChoice] = useState([]); 

    useEffect(() => {
        Refresh();
    }, []);

    const Refresh = () => {
        for (let i = 0; i < 10; i++) {
            selectedBlocks[i] = data[i].data;
        }
    }

    const OnClickRefresh = () => {
        setYourChoice([]);
        Refresh();
    }

    

    const toggleBlockSelection = (index) => {
        console.log(yourChoice);
        if (yourChoice.length == 0 && selectedBlocks[index] > 0) {
            setYourChoice([index]);
            const newSelectedBlocks = [...selectedBlocks];
            newSelectedBlocks[index] = 2;
            setSelectedBlocks(newSelectedBlocks);
            console.log("position started", yourChoice);
        }
        
        else if (yourChoice.length > 0 && selectedBlocks[index] > 0 ) {
            if(((yourChoice[0])-1)==index){
                const newChoice = [index].concat([...yourChoice]);
                console.log("newChoice", newChoice);
                setYourChoice(newChoice);
                const newSelectedBlocks = [...selectedBlocks];
                newSelectedBlocks[index] = 2;
                setSelectedBlocks(newSelectedBlocks);
                console.log("position beforehead", yourChoice);
            }
            else if(((yourChoice[yourChoice.length-1])+1)==index) {
                  
                  const newChoice = [...yourChoice, index];
                  console.log("newChoice2", newChoice);
                  setYourChoice(newChoice);
                  const newSelectedBlocks = [...selectedBlocks];
                  newSelectedBlocks[index] = 2;
                  setSelectedBlocks(newSelectedBlocks);
                  console.log("position afterwards", yourChoice);
            }
            
            else {
                if (selectedBlocks[index] == 2 && (yourChoice[0] == index || yourChoice[yourChoice.length-1] == index)) {

                  const newChoice = [...yourChoice].filter((item) => item !== index);;
                  console.log("newChoice2", newChoice);
                  setYourChoice(newChoice);
                  const newSelectedBlocks = [...selectedBlocks];
                  newSelectedBlocks[index] = 3;
                  setSelectedBlocks(newSelectedBlocks);
                  console.log("position afterwards", yourChoice);
                }
                else{
                Alert.alert(
                    "Invalid",
                    "Please select adjacent blocks",
                    [
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ],
                    { cancelable: false }
                  );
                }
            }
        }
        else if (selectedBlocks[index] == 0) {
            console.log("booked");
        }
    };

    const renderBlock = (index) => {
        return (
            <TouchableOpacity
                key={index}
                style={[styles.block, selectedBlocks[index]==2 && styles.selectedBlock, selectedBlocks[index]==0 && styles.bookedBlock, selectedBlocks[index]==3 && styles.nonSelectedBlock]}
                onPress={() => toggleBlockSelection(index)}
            />
        );
    };

    const renderBlocks = () => {
        const blocks = [];
        for (let i = 0; i < 10; i++) {
            blocks.push(renderBlock(i));
        }
        return blocks;
    };

    return (
        <>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text>Show Modal</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modal}>
                    <View style={styles.blocksContainer}>{renderBlocks()}</View>
                    <TouchableOpacity onPress={() => OnClickRefresh()}>
                        <Text>Refresh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text>Close Modal</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        height: '60%',
        width: '80%',
        alignSelf: 'center',
    },
    blocksContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '80%',
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    block: {
        width: '10%',
        height: '10%',
        borderWidth: 1,
        borderColor: 'black',
        margin: '5%',
    },
    selectedBlock: {
        backgroundColor: 'green',
    },
    bookedBlock: {
        backgroundColor: 'red',
    },
    nonSelectedBlock: {
        backgroundColor: 'white',
    },

});

export default TimePicker;
