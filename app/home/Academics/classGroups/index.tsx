import { View, Text, ImageBackground, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList, TextInput,ActivityIndicator, Modal, Alert } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; 
import Constants from 'expo-constants';

 // Import axios
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { BlurView } from 'expo-blur';

const baseUrl = Constants.expoConfig.extra.API_URL; // Replace with your actual API URL

const index = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [classGroups, setClassGroups] = useState([])
  const [classGroup, setClassGroup] = useState('')
  const [loading, setLoading] = useState(true)

  // Fetch year groups when the component loads
  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/fees`)  // API call to get all year groups
      .then(response => {
        setClassGroups(response.data);
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)

        console.log("Error fetching year groups:", error);
      });
  }, []);

  const handleAdd = () => {
    if (!classGroup) return; // Prevent empty names
    setLoading(true)

    axios.post(`${baseUrl}/fees/create`, { name: classGroup })  // API call to create a new year group
      .then(response => {
        setClassGroups([response.data.docs, ...classGroups]);
        setIsOpen(false);
        setClassGroup('');
        setLoading(false)

      })
      .catch(error => {
        setLoading(false)

        console.log("Error adding year group:", error);
      });
  }



const handleDelete = (id) => {
  Alert.alert(
    "Confirm Deletion",
    "Are you sure you want to delete this item?",
    [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        onPress: () => {
          axios.delete(`${baseUrl}/fees/delete/${id}`)
            .then(response => {
              setClassGroups(classGroups.filter(item => item._id !== id));
            })
            .catch(error => {
              console.log("Error deleting year group:", error);
            });
        },
        style: "destructive"
      }
    ]
  );
};



  const renderClassGroups = useCallback(({ item}) => {
    return (
      <View style={styles.list} key={item.id}>
        <View style={styles.listContent}>
          <Text style={{ color: "#58A8F9", fontSize: 20 }}>{item.name.toUpperCase()}</Text>
          <Text style={{ color: "grey", fontSize: 13}}>{item.createdAt}</Text>
        </View>
        <View style={styles.listBtns}>
        
          <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={() => { handleDelete(item._id) }}>
            <Image source={require('../../../../assets/images/images/delete.png')} />
          </TouchableOpacity>
          
        </View>
      </View>
    );
  },[classGroups]
)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../../../../assets/images/images/union.png')} style={styles.background} imageStyle={{ resizeMode: 'cover', position: 'absolute', bottom: 580 }}>
        {loading && classGroups.length === 0 ? (
            <View style={{ position: "relative", marginTop: 65 }}>
            <ActivityIndicator size="large" color="#58A8F9" />
            </View>
        ) : (
        <FlatList
          data={classGroups}
          keyExtractor={(item) => (item._id || item.id).toString()}
          renderItem={renderClassGroups}
          contentContainerStyle={styles.lists}
        />
        )
    }
       {!isOpen && <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: '#58A8F9', zIndex: 90000, position: 'absolute', borderRadius: 100, bottom: 100, justifyContent: 'center', alignSelf: 'flex-end', right: 40, alignItems: 'center' }} onPress={() => setIsOpen(true)}>
          <Entypo name="plus" size={40} color="white" />
        </TouchableOpacity>}


 <Modal
        animationType="slide"
        transparent={true}
        visible={(isOpen || edit)}
        onRequestClose={() => setIsOpen(false)}
        >
        
        <BlurView intensity={50} tint="dark" style={styles.modalOverlay}>
        



        {isOpen && (
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 24, position: 'relative', alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 15 }}>
              {'Add Class Group'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={"Add Class Group"}
              onChangeText={setClassGroup}
              value={classGroup}
            />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 10 }}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => { setIsOpen(false); setEdit(false); }}>
                <Text style={{ color: '#58A8F9', fontSize: 20 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={handleAdd}>
                <Text style={{ color: 'white', fontSize: 20, textAlign: 'center' }}>{'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}


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
    height: 80,
    borderColor: "grey",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between", 
    flexDirection: "row", 
    alignItems: "center", 
    alignSelf: "center", 
    marginTop: 15, 
    flex: 1, 
    elevation: 4
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
    paddingBottom: 70 
  },
  input: { 
    width: '80%', 
    height: 50, 
    backgroundColor: '#DAEDFF', 
    marginBottom: 15, 
    borderRadius: 10, 
    alignSelf: 'center', 
    paddingHorizontal: 25 
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
