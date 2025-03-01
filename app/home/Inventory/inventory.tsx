import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Platform, Modal, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Constants from 'expo-constants';

// Import axios for API calls
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BlurView } from 'expo-blur';


// API URL

const baseUrl = Constants.expoConfig.extra.API_URL;
// console.log(API_URL);
const Inventory = () => {
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [units, setUnits] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [allItems, setAllItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editID, setEditID] = useState(null);
  const [edit, setEdit] = useState(false);

  // Fetch data from the API when the component mounts


  const fetchItems = async () => {
    try {

      const response = await axios.get(`${baseUrl}/store/items`)
      setAllItems(response.data);
      setFilteredItems(response.data);

    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchItems()
  }, [name,units,price,quantity,description]);

  const handlePlus = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setEdit(false);
    setName('');
    setPrice('');
    setDescription('');
    setQuantity('');
  };

  const handleName = (text) => setName(text);
  const handleDescription = (text) => setDescription(text);
  const handleUnits = (text) => setUnits(text);
  const handlePrice = (text) => setPrice(text);
  const handleQuantity = (text) => setQuantity(text);

  const handleAdd = async () => {
    const newItem = {
      name,
      unit: units,
      price,
      quantity,
      description,
    };

    setLoading(true);
    try{

    const response = await axios.post(`${baseUrl}/store/items/create`, newItem)
        setLoading(false);
        fetchItems()
        const updatedItems = [...allItems, response.data];
        setAllItems(updatedItems);
        setFilteredItems(updatedItems);
        setName('');
        setPrice('');
        setDescription('');
        setQuantity('');
        setIsOpen(false);
      }
      catch(err){
        console.error(err);
        // setLoading(false);
      };
  };

  const handleEdit = (id) => {
    
    const item = allItems.find(e => e._id === id);
    if (item) {
      setName(item.name || '');
      setUnits(item.unit || '');
      setQuantity(item.quantity?.toString() || '');
      setDescription(item.description || '');
      setPrice(item.price?.toString() || '');
      setEditID(id);
      setEdit(true);
      setIsOpen(true);  // Open modal with populated data
    } else {
      console.error(`Item with id ${id} not found`);
      Alert.alert("Error", "Item not found");
    }
  };

  // Full edit update
  const onEdit = async () => {
    if (!editID) {
      Alert.alert("Error", "No item selected for editing");
      return;
    }

    const updatedItem = {
      name,
      unit: units,
      quantity,
      price,
      description,
    };

    setLoading(true);
    try {
      
      const response = await axios.put(`${baseUrl}/store/items/update/${editID}`, updatedItem);
      const editedItem = response.data;
      
      // Immediately update the state with the edited item
      const updatedAllItems = allItems.map(item => 
        item._id === editID ? { ...item, ...editedItem } : item
      );
      
      setAllItems(updatedAllItems);
      setFilteredItems(updatedAllItems);
      
      // Reset form and close modal
      handleClose();
      setLoading(false);
    } catch (err) {
      console.error('Error updating item:', err);
      setLoading(false);
      Alert.alert("Error", "Failed to update item. Please try again.");
    }
  };

  // Handle inventory update (Quantity Update) – not used in modal now
  // const handleChangeInventory = () => {
  //   setLoading(true);
  //   axios.put(`${apiUrl}/update/inventory/${editID}`, { quantity })
  //     .then(res => {
  //       setLoading(false);
  //       setName('');
  //       setQuantity('');
  //       setEdit(false);

  //       let newData = allItems.map(item => (item._id === editID ? { ...res.data } : item));
  //       setAllItems(newData);
  //       setFilteredItems(newData);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };

  // Handle Delete

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
          axios.delete(`${baseUrl}/store/items/delete/${id}`)
            .then(res => {
              if (res.data.error) {
                return Alert.alert("Error", res.data.error);
              }
              setAllItems(allItems.filter(i => i._id !== id));
              setFilteredItems(filteredItems.filter(i => i._id !== id));
            })
            .catch(err => console.error('Delete failed:', err));
        },
        style: "destructive"
      }
    ]
  );
};



  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        {filteredItems.map((data, index) => (
          <View style={styles.list} key={index}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 5, marginHorizontal: 19 }}>
              <Text style={{ fontSize: 20, color: '#58a8f9' }}>{data.name}</Text>
              <View style={{ flexDirection: 'row', paddingTop: 5 }}>
                <TouchableOpacity onPress={() => handleEdit(data._id)}>
                  <Image style={{ marginRight: 25 }} source={require('../../../assets/images/images/edit.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(data._id)}>
                  <Image source={require('../../../assets/images/images/delete.png')} />
                </TouchableOpacity>
              </View>
            </View>
            <Text style={{ width: '90%', fontSize: 11, marginLeft: 22, color: 'grey', fontWeight: '500' }}>{data.description}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5, marginHorizontal: 23 }}>
              <Text style={{ fontSize: 13 }}>Price: {data.price}</Text>
              <Text style={{ fontSize: 13 }}>Quantity: {data.quantity}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity
        style={{
          width: 80,
          height: 80,
          backgroundColor: '#58A8F9',
          zIndex: 90000,
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
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isOpen || edit}
        onRequestClose={handleClose}  // Changed here to reset state properly
      >
        <BlurView intensity={50} tint="dark" style={styles.modalOverlay}>
          {(isOpen || edit) && (
            <View style={styles.inputContainer}>
              <Text style={{ fontSize: 24, position: 'absolute', alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 5, top: 15 }}>
                {edit ? 'Edit Item' : 'Add Item'}
              </Text>
              <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={edit ? "Edit Name" : "Name"} onChangeText={handleName} value={name} />
              <TextInput style={styles.inputDesc} placeholderTextColor={'grey'} placeholder={edit ? "Edit Description" : "Add Description"} multiline textAlignVertical='top' onChangeText={handleDescription} value={description} />
              <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={edit ? "Edit Units (e.g kg)" : "Units (e.g kg)"} onChangeText={handleUnits} value={units} keyboardType='numeric'/>
              <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={edit ? "Edit Price" : "Price"} onChangeText={handlePrice} value={price} keyboardType='numeric' />
              <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={edit ? "Edit Quantity" : "Quantity"} onChangeText={handleQuantity} value={quantity} keyboardType='numeric' />

              <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                <Text style={{ color: '#58A8F9', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons}>
                <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}
                  onPress={edit ? onEdit : handleAdd}>
                  {edit ? 'save' : 'Add'}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </BlurView>
      </Modal>
    </>
  );
};




const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  list: {
    width: '85%',
    maxHeight: 140,
    height: 'auto',
    borderRadius: 10,
    elevation: 4,
    alignSelf: 'center',
    backgroundColor: 'white',
    marginVertical: 10,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        // borderWidth:0.5,
        // borderColor:'grey',


      },

    }),

  },
  input: {
    width: '80%',
    height: 45,
    backgroundColor: '#DAEDFF',
    // backgroundColor: 'red',
    // marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 25,
    marginVertical: 3
  },
  inputDesc: {
    width: '80%',
    height: 100,
    backgroundColor: '#DAEDFF',
    // backgroundColor: 'red',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  inputContainer: {
    position: 'absolute',
    width: '85%',
    height: 450,
    backgroundColor: 'white',
    // backgroundColor:'red',
    borderRadius: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    flexDirection: 'column',
    top: responsiveHeight(13),
    zIndex: 900000,
    elevation: 8,

  },
  buttons: {
    width: 80,
    height: 30,
    backgroundColor: '#58A8F9',
    position: 'absolute',
    bottom: 13,
    right: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  closeBtn: {
    position: 'absolute',
    bottom: 15,
    right: responsiveWidth(35),
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // This sets the dim background overlay
    justifyContent: "center",
    alignItems: "center",
  },

})





export default Inventory