import { View, Text, ImageBackground, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList, TextInput,ActivityIndicator } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const API_BASE_URL = "https://dreamscloudtechbackend.onrender.com/api";

const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [city, setCity] = useState('');
  const [name, setName] = useState('');
  const [campuses, setCampuses] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/campuses`);
        setCampuses(response.data);
      } catch (error) {
        console.error("Error fetching campuses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCampuses();
  }, []);

  const handleAdd = async () => {
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/campuses/create`, { name, location: city });
      setCampuses([response.data.doc, ...campuses]);
      setIsOpen(false);
      setCity('');
      setName('');
    } catch (error) {
      console.error("Error adding campus:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/campuses/delete/${id}`);
      setCampuses(campuses.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting campus:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    const campusToEdit = campuses.find((item) => item._id === id);
    setCity(campusToEdit?.location);
    setName(campusToEdit?.name);
    setCurrentId(id);
    setEdit(true);
  };

  const saveEdit = async () => {
    try {
      setLoading(true);
      const response = await axios.put(`${API_BASE_URL}/campuses/update/${currentId}`, { name, location: city });
      setCampuses(campuses.map((item) => (item._id === currentId ? response.data.doc : item)));
      setEdit(false);
      setName('');
      setCity('');
      setCurrentId(null);
    } catch (error) {
      console.error("Error editing campus:", error);
    } finally {
      setLoading(false);
    }
  };
  const renderCampuses = useCallback( ({ item }) => {
    return (
      <View style={styles.list} key={item._id}>
        <View style={styles.listContent}>
          <Text style={{ color: "#58A8F9", fontSize: 20 }}>{item.name}</Text>
          <Text style={{ color: "grey", fontSize: 15 }}>{item.location}</Text>
          <Text style={{ color: "grey", fontSize: 13 }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
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
    );
  },[campuses]
)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../../assets/images/images/union.png')}
        style={styles.background}
        imageStyle={{ resizeMode: 'cover', position: 'absolute', bottom: 580 }}
      >
                

        { loading && campuses.length === 0 ? (
          <View style={{ position: "relative",top:'45%'}}>
          <ActivityIndicator size="large" color="#58A8F9" />
          </View>

        ) :
        <FlatList
          data={campuses}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderCampuses}
          contentContainerStyle={styles.lists}
        />}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsOpen(true)}
        >
          <Entypo name="plus" size={40} color="white" />
        </TouchableOpacity>

        {(isOpen || edit) && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>{edit ? 'Edit Campus' : 'Add Campus'}</Text>

            <TextInput
              style={styles.input}
              placeholder={edit ? "Edit Name" : "Add Name"}
              onChangeText={(text) => setName(text)}
              value={name}
            />

            <TextInput
              style={styles.input}
              placeholder={edit ? "Edit City" : "Add City"}
              onChangeText={(text) => setCity(text)}
              value={city}
            />

            <View style={styles.inputButtonsContainer}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => { setIsOpen(false); setEdit(false); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={edit ? saveEdit : handleAdd}>
                <Text style={styles.addText}>{edit ? 'Save' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
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
    height: 250,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    top: '30%',
    flexDirection: 'column',
  },
  inputHeader: {
    fontSize: 24,
    position: 'relative',
    alignSelf: 'flex-start',
    paddingHorizontal: 25,
    paddingVertical: 15,
  },
  inputButtonsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  buttons: {
    width: 100,
    height: 38,
    backgroundColor: '#58A8F9',
    position: 'absolute',
    right: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeBtn: {
    width: 100,
    height: 38,
    backgroundColor: '#DAEDFF',
    position: 'absolute',
    left: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: '#58A8F9',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  cancelText: {
    color: '#58A8F9',
    fontWeight: '600',
  },
  addText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default index;
