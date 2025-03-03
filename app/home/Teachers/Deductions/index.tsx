import { View, Text, ImageBackground, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList, TextInput, ActivityIndicator, Alert, Modal } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect, useCallback } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import Constants from 'expo-constants';


  const baseUrl = Constants.expoConfig.extra.API_URL;


const index = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [amount, setAmount] = useState('');
  const [name, setName] = useState('');
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const [allStaff, setAllStaff] = useState([]);
  const [deductions, setDeductions] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editLoading, setEditLoading] = useState(false);
  const [editStaff, setEditStaff] = useState([]);

  // Function to show success alert
  const successAlert = (message) => {
    // You can use any alert library or custom implementation here
    alert(message);
  };

  // Function to show error alert
  const errorAlert = (message) => {
    alert(message);
  };

  useEffect(() => {
    // Fetch all deductions
    axios.get(`${baseUrl}/deductions`).then((res) => {
      setDeductions(
        res.data.map((e) => {
          return {
            ...e,
            number: e.staff?.length,
          };
        })
      );
      setLoading(false);
    }).catch(err => {
      console.error("Error fetching deductions:", err);
      setLoading(false);
      errorAlert("Failed to load deductions");
    });
    
    // Fetch all staff for dropdown
    axios.get(`${baseUrl}/teachers`).then((res) => {
      setAllStaff(res.data);
    }).catch(err => {
      console.error("Error fetching staff:", err);
    });
  }, []);

  const handleAdd = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/deductions/create`, {
        name,
        staff,
        amount,
      })
      .then(async (res) => {
        setLoading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("Successfully added");
        let newDoc = {
          ...res.data.doc,
          number: res.data.doc.staff?.length,
        };
        setDeductions([newDoc, ...deductions]);
        setName("");
        setAmount("");
        setStaff([]);
        setSelectedStaff([]);
        setIsOpen(false);
        
        
      })
      .catch(err => {
        setLoading(false);
        errorAlert("Failed to add deduction");
        console.error(err);
      });
  };
  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this deduction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setLoading(true);
            axios.delete(`${baseUrl}/deductions/delete/${id}`)
              .then((res) => {
                setDeductions(deductions.filter((e) => e?._id !== id));
                setLoading(false);
                successAlert("Deduction deleted successfully");
              })
              .catch((err) => {
                setLoading(false);
                errorAlert("Failed to delete deduction");
                console.error(err);
              });
          },
          style: "destructive",
        },
      ]
    );
  };
  const handleEdit = (id) => {
    let obj = deductions.find((e) => e._id === id);
    setName(obj?.name);
    setAmount(obj?.amount);
    setEditStaff(obj?.staff || []);
    setCurrentId(id);
    
    // Find and set the selected staff objects for display
    if (allStaff.length > 0 && obj?.staff) {
      const selectedStaffObjects = allStaff.filter(staffMember => 
        obj.staff.includes(staffMember.userID)
      );
      setSelectedStaff(selectedStaffObjects);
    }
    
    setEdit(true);
  };

  const saveEdit = () => {
    setEditLoading(true);
    axios
      .put(`${baseUrl}/deductions/update/${currentId}`, {
        name: name,
        staff: editStaff,
        amount: amount,
      })
      .then(async (res) => {
        setEditLoading(false);
        if (res.data.error) {
          return errorAlert(res.data.error);
        }
        successAlert("Successfully saved changes");
        let newDoc = {
          ...res.data.doc,
          number: res.data.doc.staff?.length,
        };
        setDeductions(deductions.map((doc) => (doc._id === currentId ? newDoc : doc)));
        setName("");
        setAmount("");
        setEditStaff([]);
        setSelectedStaff([]);
        setEdit(false);
        
        
      })
      .catch(err => {
        setEditLoading(false);
        errorAlert("Failed to update deduction");
        console.error(err);
      });
  };

  const handleSelectStaff = (item) => {
    // Add to the visual selected staff list
    if (!selectedStaff.some(staffMember => staffMember.userID === item.userID)) {
      setSelectedStaff([...selectedStaff, item]);
    }
    
    // Update the staff IDs array for API
    if (!staff.includes(item.userID)) {
      setStaff([...staff, item.userID]);
    }
    
    // If in edit mode, update editStaff array
    if (edit && !editStaff.includes(item.userID)) {
      setEditStaff([...editStaff, item.userID]);
    }
  };

  const removeStaff = (userID) => {
    // Remove from visual selected staff list
    setSelectedStaff(selectedStaff.filter(item => item.userID !== userID));
    
    // Remove from staff IDs array for API
    setStaff(staff.filter(id => id !== userID));
    
    // If in edit mode, update editStaff array
    if (edit) {
      setEditStaff(editStaff.filter(id => id !== userID));
    }
  };

  const handleSelectAll = () => {
    if (allStaff && allStaff.length > 0) {
      if (staff.length === allStaff.length) {
        // If all staff are already selected, deselect all
        setStaff([]);
        setSelectedStaff([]);
      } else {
        // Otherwise, select all staff
        const allStaffIds = allStaff.map(staffMember => staffMember.userID);
        setStaff(allStaffIds);
        setSelectedStaff(allStaff);
      }
    }
  };

  const handleSelectAllEdit = () => {
    if (allStaff && allStaff.length > 0) {
      if (editStaff.length === allStaff.length) {
        // If all staff are already selected, deselect all
        setEditStaff([]);
        setSelectedStaff([]);
      } else {
        // Otherwise, select all staff
        const allStaffIds = allStaff.map(staffMember => staffMember.userID);
        setEditStaff(allStaffIds);
        setSelectedStaff(allStaff);
      }
    }
  };

  const renderDeductions = useCallback(({ item }) => {
    return (
      <View style={styles.list} key={item._id}>
        <View style={styles.listContent}>
          <Text style={{ color: "#58A8F9", fontSize: 20 }}>{item.name}</Text>
          <Text style={{ color: "grey", fontSize: 15 }}>Amount: ₹{item.amount}</Text>
          <Text style={{ color: "grey", fontSize: 13 }}>Staff: {item.number || 0}</Text>
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
  }, [deductions]);

  // Format staff data for dropdown - only if allStaff exists and is an array
  const staffDropdownData = Array.isArray(allStaff) ? allStaff.map(staffMember => ({
    label: staffMember.name || staffMember.username || "Unknown Staff",
    value: staffMember.userID,
    userID: staffMember.userID
  })) : [];

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../../assets/images/images/union.png')}
        style={styles.background}
        imageStyle={{ resizeMode: 'cover', position: 'absolute', bottom: 580 }}
      >
        {loading && deductions.length === 0 ? (
          <View style={{ position: "relative", top: '45%' }}>
            <ActivityIndicator size="large" color="#58A8F9" />
          </View>
        ) : (
          <FlatList
            data={deductions}
            keyExtractor={(item) => item._id.toString()}
            renderItem={renderDeductions}
            contentContainerStyle={styles.lists}
          />
        )}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsOpen(true)}
        >
          <Entypo name="plus" size={40} color="white" />
        </TouchableOpacity>
<Modal
        animationType="slide"
        transparent={true}
        visible={(isOpen || edit)}
        onRequestClose={() => setIsOpen(false)}
        >
        {isOpen && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Add Deduction</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Enter Section Name"
                value={name}
                onChangeText={setName}
              />
              
              <TextInput
                style={styles.modalInput}
                placeholder="Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
              
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={staffDropdownData}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Staff"
                  onChange={handleSelectStaff}
                />
              </View>
              
              <TouchableOpacity 
                style={styles.selectAllButton}
                onPress={handleSelectAll}
              >
                <Text style={styles.selectAllText}>
                  {allStaff && staff.length === allStaff.length ? "Deselect All" : "Select All Staff"}
                </Text>
              </TouchableOpacity>
              
              {selectedStaff.length > 0 && (
                <View style={styles.selectedItemsContainer}>
                  {selectedStaff.map((item) => (
                    <View key={item.userID} style={styles.selectedItemTag}>
                      <Text style={styles.selectedItemText}>
                        {(item.name || item.label || "").split(' ')[0]}
                      </Text>
                      <TouchableOpacity onPress={() => removeStaff(item.userID)}>
                        <Text style={styles.removeIcon}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
              
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => {
                    setIsOpen(false);
                    setName('');
                    setAmount('');
                    setSelectedStaff([]);
                    setStaff([]);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.addButtonModal}
                  onPress={handleAdd}
                  disabled={loading}
                >
                  {loading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.addButtonText}>Add</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        
        </Modal>


<Modal
        animationType="slide"
        transparent={true}
        visible={(edit)}
        onRequestClose={() => setIsOpen(false)}
        >

        {edit && (
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Edit Deduction</Text>
              
              <TextInput
                style={styles.modalInput}
                placeholder="Edit Name"
                value={name}
                onChangeText={setName}
              />
              
              <TextInput
                style={styles.modalInput}
                placeholder="Edit Amount"
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
              />
              
              <View style={styles.dropdownContainer}>
                <Dropdown
                  style={styles.dropdown}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={staffDropdownData}
                  maxHeight={200}
                  labelField="label"
                  valueField="value"
                  placeholder="Select Staff"
                  onChange={handleSelectStaff}
                />
              </View>
              
              <TouchableOpacity 
                style={styles.selectAllButton}
                onPress={handleSelectAllEdit}
              >
                <Text style={styles.selectAllText}>
                  {allStaff && editStaff.length === allStaff.length ? "Deselect All" : "Select All Staff"}
                </Text>
              </TouchableOpacity>
              
              {selectedStaff.length > 0 && (
                <View style={styles.selectedItemsContainer}>
                  {selectedStaff.map((item) => (
                    <View key={item.userID || item.value} style={styles.selectedItemTag}>
                      <Text style={styles.selectedItemText}>
                        {(item.name || item.label || "").split(' ')[0]}
                      </Text>
                      <TouchableOpacity onPress={() => removeStaff(item.userID || item.value)}>
                        <Text style={styles.removeIcon}>×</Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
              
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity 
                  style={styles.cancelButton} 
                  onPress={() => {
                    setEdit(false);
                    setName('');
                    setAmount('');
                    setSelectedStaff([]);
                    setEditStaff([]);
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={styles.addButtonModal}
                  onPress={saveEdit}
                  disabled={editLoading}
                >
                  {editLoading ? (
                    <ActivityIndicator size="small" color="white" />
                  ) : (
                    <Text style={styles.addButtonText}>Save</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}

        </Modal>

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
    top: 45,
    justifyContent: 'space-between',
  },
  lists: {
    position: 'relative',
    top: 60,
    paddingBottom: 70,
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
  // Modal styles
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  modalInput: {
    height: 48,
    backgroundColor: '#DAEDFF',
    borderRadius: 5,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 14,
  },
  dropdownContainer: {
    marginBottom: 10,
  },
  dropdown: {
    height: 48,
    backgroundColor: '#DAEDFF',
    borderRadius: 5,
    paddingHorizontal: 15,
  },
  placeholderStyle: {
    fontSize: 14,
    color: 'gray',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  selectAllButton: {
    marginBottom: 10,
  },
  selectAllText: {
    color: '#58A8F9',
    fontSize: 14,
    fontWeight: '500',
  },
  selectedItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  selectedItemTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F4FF',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#58A8F9',
  },
  selectedItemText: {
    color: '#58A8F9',
    marginRight: 5,
    fontSize: 12,
  },
  removeIcon: {
    color: '#58A8F9',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  cancelButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  cancelButtonText: {
    color: '#58A8F9',
    fontSize: 14,
  },
  addButtonModal: {
    backgroundColor: '#58A8F9',
    paddingVertical: 8,
    paddingHorizontal: 30,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default index;