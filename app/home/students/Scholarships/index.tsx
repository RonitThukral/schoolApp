import { View, Text, ImageBackground, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator, Modal } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { MaterialIcons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

const API_BASE_URL = "https://dreamscloudtechbackend.onrender.com/api";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [percentage, setPercentage] = useState('');
  const [name, setName] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [types, setTypes] = useState({
    tuition: false,
    facility: false,
    maintenance: false,
    examination: false,
    transportation: false,
  });

  useEffect(() => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/scholarships`)
      .then((res) => {
        setScholarships(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);
  

  const handleAdd = () => {
    if (!percentage || !name) return;
    const newScholarship = {
      name: name,
      percentage: parseInt(percentage),
      types,
    };
    setLoading(true);
    axios
      .post(`${API_BASE_URL}/scholarships/create`, newScholarship)
      .then((res) => {
        setScholarships([res.data.doc, ...scholarships]);
        setIsOpen(false);
        setPercentage('');
        setName('');
        setTypes({
          tuition: false,
          facility: false,
          maintenance: false,
          examination: false,
          transportation: false,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/scholarships/delete/${id}`)
      .then(() => {
        setScholarships(scholarships.filter((item) => item._id !== id));
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCheckboxChange = (key) => {
    setTypes((prevTypes) => ({
      ...prevTypes,
      [key]: !prevTypes[key],
    }));
  };

  const handleEdit = (id) => {
    const updatedScholarship = scholarships.find((item) => item._id === id);
    setPercentage(updatedScholarship.percentage);
    setName(updatedScholarship.name);
    setTypes(updatedScholarship.types || { // Ensure types is defined
      tuition: false,
      facility: false,
      maintenance: false,
      examination: false,
      transportation: false,
    });
    setCurrentId(id);
    setEdit(true);
    setIsOpen(true);
  };

  const saveEdit = () => {
    const updatedScholarship = {
      name: name,
      percentage: parseInt(percentage),
      types,
    };
    setLoading(true);
    axios
      .put(`${API_BASE_URL}/scholarships/update/${currentId}`, updatedScholarship)
      .then((res) => {
        setScholarships(
          scholarships.map((item) => (item._id === currentId ? res.data.doc : item))
        );
        setEdit(false);
        setPercentage('');
        setName('');
        setCurrentId(null);
        setIsOpen(false);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  const handlePlus = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEdit(false);
    setPercentage('');
        setName('');
        setCurrentId(null);
        setIsOpen(false);
        setLoading(false);
        setTypes({
          tuition: false,
          facility: false,
          maintenance: false,
          examination: false,
          transportation: false,
        });
  };

  const renderCampuses = useCallback(
    ({ item }) => (
      <View style={styles.list} key={item._id}>
        <View style={styles.listContent}>
          <Text style={{ color: "#58A8F9", fontSize: 20 }}>{item.name}</Text>
          <Text style={{ color: "grey", fontSize: 15 }}>Percentage: {item.percentage}</Text>
          <Text style={{ color: "grey", fontSize: 13 }}>{item.date}</Text>
        </View>
        <View style={styles.listBtns}>
          <TouchableOpacity
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => handleEdit(item._id)}
          >
            <Image source={require('../../../../assets/images/images/edit.png')} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => handleDelete(item._id)}
          >
            <Image source={require('../../../../assets/images/images/delete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [scholarships]
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80}
      >
        <ImageBackground
          source={require('../../../../assets/images/images/union.png')}
          style={styles.background}
          imageStyle={{ resizeMode: 'cover', position: 'absolute', bottom: 580 }}
        >
          <View style={{ position: "relative", flex:1,height:'90%',top:0}}>
          {loading && scholarships.length === 0 ? (
              <ActivityIndicator size="large" color="#58A8F9" />
          ) : (
            <FlatList
              data={scholarships}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderCampuses}
              contentContainerStyle={[styles.lists,{paddingTop:-60}]}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
            
          )}
          </View>


          {!(isOpen || edit) && <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              backgroundColor: '#58A8F9',
              zIndex: 100,
              position: 'absolute',
              borderRadius: 100,
              bottom: 100,
              justifyContent: 'center',
              alignSelf: 'flex-end',
              right: 40,
              alignItems: 'center',
            }}
            onPress={handlePlus}
          >

            <Entypo name="plus" size={40} color="white" />

          </TouchableOpacity>}



<Modal
animationType="slide"
transparent={true}
visible={(isOpen || edit)}
onRequestClose={() => setIsOpen(false)}
>

<BlurView intensity={50} tint="dark" style={styles.modalOverlay}>



          {(isOpen || edit) && (
            <View style={styles.inputContainer}>
              <Text
                style={{
                  fontSize: 24,
                  position: 'relative',
                  alignSelf: 'flex-start',
                  paddingHorizontal: 25,
                  paddingVertical: 15,
                }}
              >
                {edit ? 'Edit Scholarship' : 'Add Scholarship'}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                onChangeText={setName}
                value={name}
              />
              <TextInput
                style={styles.input}
                placeholder="Percentage"
                keyboardType="numeric"
                onChangeText={setPercentage}
                value={percentage}
              />

              <View style={{ paddingHorizontal: 25 }}>
                {Object.keys(types).map((key) => (
                  <TouchableOpacity
                    key={key}
                    onPress={() => handleCheckboxChange(key)}
                    style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5,position:'relative',left:15 }}
                  >
                    <View
                      style={{
                        width: 20,
                        height: 20,
                        borderWidth: 1,
                        borderColor: 'grey',
                        marginRight: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: types[key] ? '#58A8F9' : 'white',
                      }}
                    >
                      {types[key] && <MaterialIcons name="check" size={16} color="white" />}
                    </View>
                    <Text style={{ fontSize: 16 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginTop: 10,
                  paddingHorizontal: 25,
                }}
              >
                <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                  <Text style={{ color: '#58A8F9', fontSize: 16 }}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttons}
                  onPress={edit ? saveEdit : handleAdd}
                >
                  <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
                    {edit ? 'Save' : 'Add'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          </BlurView>

          </Modal>


        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#daedff',
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
    justifyContent: 'flex-start',
  },
  listBtns: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    right: 30,
    justifyContent: 'space-between',
    top: 40,
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
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    top: '21%',
    paddingVertical: 20,
    zIndex:8898,
    elevation:5
  },
  buttons: {
    width: 100,
    height: 38,
    backgroundColor: '#58A8F9',
    borderRadius: 20,
    justifyContent: 'center',
    marginLeft: 10,
  },
  closeBtn: {
    justifyContent: 'center',
  },

    
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // This sets the dim background overlay
    justifyContent: "center",
    alignItems: "center",
  },


});

export default index;
