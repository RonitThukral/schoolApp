import { View, Text, ImageBackground, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // Assuming axios is installed


const API_BASE_URL = "https://api.dreameducation.org.in/api"; // Base API URL



const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [percentage, setPercentage] = useState('');
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true)
    // Fetch scholarships on component mount
    axios.get(`${API_BASE_URL}/scholarships`)
      .then((res) => {
        setScholarships(res.data); // Assuming response data contains the scholarship list
        setLoading(false)
      })
      .catch((err) => {
        console.error(err);
        setLoading(false)
        // errorAlert("Failed to load scholarships");
      });
  }, []);

  const handleAdd = () => {
    if (!percentage) return; // Prevent adding if no percentage is provided
    const newScholarship = {
      name: `${percentage} Percent Scholarship`,
      percentage: parseInt(percentage),
    };
setLoading(true)
    axios.post(`${API_BASE_URL}/scholarships/create`, newScholarship)
      .then((res) => {
        setScholarships([res.data.doc, ...scholarships]);
        setIsOpen(false);
        setPercentage('');
        setLoading(false)
        // successAlert("Scholarship added successfully");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false)

        // errorAlert("Failed to add scholarship");
      });
  };

  const handlePlus = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEdit(false);
  };

  const handleChange = (text) => {
    if (/^\d+$/.test(text)) {  // Allow only numeric input
      setPercentage(text);
    }
  };

  const handleDelete = (id) => {
    axios.delete(`${API_BASE_URL}/scholarships/delete/${id}`)
      .then(() => {
        setScholarships(scholarships.filter((item) => item._id !== id));
        // successAlert("Scholarship deleted successfully");
      })
      .catch((err) => {
        console.error(err);
        // errorAlert("Failed to delete scholarship");
      });
  };

  const handleEdit = (id) => {
    const updatedScholarship = scholarships?.find((item) => item.id === id);
    setPercentage(updatedScholarship?.percentage);
    setCurrentId(id);
    setEdit(true);
  };

  const saveEdit = () => {
    const updatedScholarship = {
      name: `${percentage} Percent Scholarship`,
      percentage: parseInt(percentage),
    };
    setLoading(true)


    axios.put(`${API_BASE_URL}/scholarships/update/${currentId}`, updatedScholarship)
      .then((res) => {
        setScholarships(scholarships.map((item) =>
          item._id === currentId ? res.data.doc : item
        ));
        setEdit(false);
        setPercentage('');
        setCurrentId(null);
        setLoading(false)

        // successAlert("Scholarship updated successfully");
      })
      .catch((err) => {
        console.error(err);
        setLoading(false)

        // errorAlert("Failed to update scholarship");
      });
  };

  const renderCampuses = useCallback(({ item }) => {
    // Ensure that item.id is a valid value
    const itemId = item.id ? item.id : item._id;  // Assuming MongoDB returns _id
    return (
      <View style={styles.list} key={itemId}>
        <View style={styles.listContent}>
          <Text style={{ color: "#58A8F9", fontSize: 20 }}>{item.name}</Text>
          <Text style={{ color: "grey", fontSize: 15, fontWeight: "condensedBold" }}>Percentage: {item.percentage}</Text>
          <Text style={{ color: "grey", fontSize: 13, fontWeight: "condensedBold" }}>{item.date}</Text>
        </View>
        <View style={styles.listBtns}>
          <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={() => { handleEdit(itemId) }}>
            <Image source={require('../../../../assets/images/images/edit.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={() => { handleDelete(itemId) }}>
            <Image source={require('../../../../assets/images/images/delete.png')} />
          </TouchableOpacity>
        </View>
      </View>
    )
  },[scholarships]
)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={80} // Adjust based on your UI
      >
        <ImageBackground source={require('../../../../assets/images/images/union.png')} style={styles.background} imageStyle={{ resizeMode: 'cover', position: 'absolute', bottom: 580 }}>
          {loading && scholarships.length === 0 ? (
        <View style={{ position: "relative", marginTop: 65 }}>
            <ActivityIndicator size="large" color="#58A8F9" />
            </View>
          ) : (
          <FlatList
            data={scholarships}
            keyExtractor={(item) => (item.id || item._id).toString()}
            renderItem={renderCampuses}
            contentContainerStyle={styles.lists}
          />
        )}

          <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: '#58A8F9', zIndex: 100, position: 'absolute', borderRadius: 100, bottom: 100, justifyContent: 'center', alignSelf: 'flex-end', right: 40, alignItems: 'center' }} onPress={handlePlus}>
            <Entypo name="plus" size={40} color="white" />
          </TouchableOpacity>

          {(isOpen || edit) && <View style={styles.inputContainer}>
            <Text style={{ fontSize: 24, position: 'relative', alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 15 }}>{edit ? 'Edit Percentage' : 'Add Scholarships'}</Text>
            <TextInput style={styles.input} placeholder={edit ? "Edit Percentage" : "Add Percentage"} onChangeText={handleChange} value={percentage} />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 10 }}>
              <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                <Text style={{ color: '#58A8F9', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={edit ? saveEdit : handleAdd}>
                <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{edit ? 'Save' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>}
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

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
    justifyContent: 'space-between',
    top:40
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
    flexDirection: 'column'
  },
  buttons: {
    width: 100,
    height: 38,
    backgroundColor: '#58A8F9',
    position: 'absolute',
    right: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  closeBtn: {
    position: 'absolute',
    bottom: 5,
    left: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  }
});

export default index;