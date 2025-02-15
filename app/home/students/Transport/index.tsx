import { View, Text, ImageBackground, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList, TextInput, ActivityIndicator, Modal } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';  // Make sure Axios is installed
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BlurView } from 'expo-blur';

const API_BASE_URL = "https://dreamscloudtechbackend.onrender.com/api"; // Base API URL

const index = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [transports, setTransports] = useState([]);
    const [transport, setTransport] = useState('');
    const [currentId, setCurrentId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch data from API on component mount
    useEffect(() => {
        setLoading(true)
        axios.get(`${API_BASE_URL}/dormitories`)  // Replace with your actual API endpoint
            .then(response => {
                setTransports(response.data);
                setLoading(false)
            })
            .catch(error => {
                setLoading(false)

                console.error("Error fetching data: ", error);
            });
    }, [transports]);

    const handleAdd = () => {
        setLoading(true)

        axios.post(`${API_BASE_URL}/dormitories/create`, { name: transport })  // API call to create transport
            .then(response => {
                // console.log(response.data);  // Log the response for debugging
                setTransports([response.data, ...transports]);
                setIsOpen(false);
                setTransport('');
                setLoading(false)

            })
            .catch(error => {
                setLoading(false)

                console.error("Error adding transport: ", error);
            });
    }

    const handlePlus = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
        setEdit(false);
    }

    const handleChange = (text) => {
        setTransport(text);
    }

    const handleDelete = (id) => {

        axios.delete(`${API_BASE_URL}/dormitories/delete/${id}`)  // API call to delete transport
            .then(response => {
                setTransports(transports.filter(item => item._id !== id));

            })
            .catch(error => {

                console.error("Error deleting transport: ", error);
            });
    }

    const handleEdit = (id) => {
        const updatedTransport = transports.find((item) => item._id === id); // Match _id instead of id
        setTransport(updatedTransport?.name);
        setCurrentId(id);
        setEdit(true);
    }

    const saveEdit = () => {
        setLoading(true)

        axios.put(`${API_BASE_URL}/dormitories/update/${currentId}`, { name: transport })  // API call to update transport
            .then(response => {
                // console.log(response.data);  // Log the response for debugging
                setTransports(transports.map(item =>
                    item._id === currentId ? { ...item, name: transport } : item
                ));
                setEdit(false);
                setTransport('');
                setCurrentId(null);
                setLoading(false)

            })
            .catch(error => {
                setLoading(false)

                console.error("Error updating transport: ", error);
            });
    }

    const renderCampuses = useCallback(({ item }) => {
        return (
            <View style={styles.list} key={item._id}>
                <View style={styles.listContent}>
                    <Text style={{ color: "#58A8F9", fontSize: 20 }}>{item.name}</Text>
                    <Text style={{ color: "grey", fontSize: 12, fontWeight: "condensedBold" }}> {item._id}</Text>
                </View>
                <View style={styles.listBtns}>
                    <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={() => { handleEdit(item._id) }}>
                        <Image source={require('../../../../assets/images/images/edit.png')} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={() => { handleDelete(item._id) }}>
                        <Image source={require('../../../../assets/images/images/delete.png')} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }, [transports])

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground source={require('../../../../assets/images/images/union.png')} style={styles.background} imageStyle={{ resizeMode: 'cover', position: 'absolute', bottom: responsiveHeight(70) }}>
                {loading && transports.length === 0 ? (
                    <View style={{ position: "relative", marginTop: 65 }}>
                        <ActivityIndicator size="large" color="#58A8F9" />
                    </View>
                ) : (
                    <FlatList
                        data={Array.isArray(transports) ? transports : []} // Ensure transports is a valid array
                        keyExtractor={(item, index) => {
                            const key = item?._id || item?.id || index; // Fallback to index
                            return key.toString(); // Safely convert to string
                        }}
                        renderItem={renderCampuses}
                        contentContainerStyle={styles.lists}
                    />

                )
                }
                {!isOpen && <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: '#58A8F9', zIndex: 90000, position: 'absolute', borderRadius: 100, bottom: 100, justifyContent: 'center', alignSelf: 'flex-end', right: 43, alignItems: 'center' }} onPress={handlePlus}>
                    <Entypo name="plus" size={40} color="white" />
                </TouchableOpacity>}

                <Modal
                animationType="slide"
                transparent={true}
                visible={(isOpen || edit)}
                onRequestClose={() => setIsOpen(false)}
                >
                
                <BlurView intensity={50} tint="dark" style={styles.modalOverlay}>
                

                {(isOpen || edit) && <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 24, position: 'relative', alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 15 }}>{edit ? 'Edit Transport' : 'Add Transport'}</Text>
                    <TextInput style={styles.input} placeholder={edit ? "Edit Transport" : "Add Transport"} onChangeText={handleChange} value={transport} />

                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 10 }}>
                        <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                            <Text style={{ color: '#58A8F9', fontSize: 20 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttons} onPress={edit ? saveEdit : handleAdd}>
                            <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{edit ? 'Save' : 'Add'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>}


</BlurView>

</Modal>
                
                
            </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#daedff'
    },
    list: {
        width: "90%",
        height: 100,
        borderColor: "grey",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 15,
        flex: 1,
        elevation: 4,
    },
    listContent: {
        flexDirection: "column",
        position: "relative",
        paddingHorizontal: 25,
        justifyContent: 'flex-start'
    },
    listBtns: {
        position: 'absolute',
        flex: 1,
        flexDirection: 'row',
        right: 30,
        justifyContent: 'space-between'
    },
    lists: {
        position: 'relative',
        top: 60,
        paddingBottom: 70,
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: '#DAEDFF',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
    },
    inputContainer: {
        position: 'absolute',
        width: '80%',
        height: 180,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        top: '30%',
        flexDirection: 'column',
        elevation:5
    },
    buttons: { 
        width: 100, 
        height: 38, 
        backgroundColor: '#58A8F9', 
        position: 'relative', 
        right: 25,
        borderRadius: 20, 
        justifyContent: 'center', 
        alignSelf: 'flex-end' 
      },
      closeBtn: { 
        position: 'relative', 
        bottom: 5, 
        right: responsiveWidth(14), 
        borderRadius: 20, 
        justifyContent: 'center', 
        alignSelf: 'flex-end'
       },

         
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // This sets the dim background overlay
    justifyContent: "center",
    alignItems: "center",
  },

});

export default index;
