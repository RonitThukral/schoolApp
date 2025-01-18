import { View, Text, ImageBackground, TouchableOpacity, Image, SafeAreaView, StyleSheet, FlatList, TextInput,ActivityIndicator } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';  // Import axios
import { Dropdown } from "react-native-element-dropdown";
import { responsiveWidth } from 'react-native-responsive-dimensions';

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api"; // Replace with your actual API URL

const index = () => {
  const [isFocus, setIsFocus] = useState(false);

  const [isOpen, setIsOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const [yearGroups, setYearGroups] = useState([])
  const [yearGroup, setYearGroup] = useState('')
  const [loading, setLoading] = useState(true)
  const [year, setYear] = useState(null)

  const currentYear = new Date().getFullYear();

// Generate an array of years for the next 10 years
const years = Array.from({ length: 10 }, (_, i) => ({ 
  label: `${currentYear + i}`, 
  value: currentYear + i 
}));

  // Fetch year groups when the component loads
  useEffect(() => {
    setLoading(true)
    axios.get(`${baseUrl}/yeargroup`)  // API call to get all year groups
      .then(response => {
        setYearGroups(response.data);
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)

        console.log("Error fetching year groups:", error);
      });
  }, []);

  const handleAdd = () => {
    if (!yearGroup) return; // Prevent empty names
    setLoading(true)

    axios.post(`${baseUrl}/yeargroup/create`, { name: yearGroup,year })  // API call to create a new year group
      .then(response => {
        setYearGroups([response?.data?.doc, ...yearGroups]);
        setIsOpen(false);
        setYearGroup('');
        setLoading(false)

      })
      .catch(error => {
        setLoading(false)

        console.log("Error adding year group:", error);
      });
  }

  const handleDelete = (id) => {
    axios.delete(`${baseUrl}/yeargroup/delete/${id}`)  // API call to delete a year group
      .then(response => {
        setYearGroups(yearGroups.filter(item => item._id !== id));
      })
      .catch(error => {
        console.log("Error deleting year group:", error);
      });
  }


    // Focus Handlers
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);


  const renderYearGroups = useCallback(({ item }) => {
    const formattedDate = new Date(item.createdAt).toLocaleDateString('en-GB');
    return (
      <View style={styles.list} key={item.id}>
        <View style={styles.listContent}>
          <Text style={{ color: "#58A8F9", fontSize: 20 }}>{item.name}</Text>
          <Text style={{ color: "grey", fontSize: 13, paddingHorizontal: 5 }}>{item.year}</Text>
          <Text style={{ color: "grey", fontSize: 13, paddingHorizontal: 5 }}>{formattedDate}</Text>
          
        </View>
        <View style={styles.listBtns}>
        
          <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} onPress={() => { handleDelete(item._id) }}>
            <Image source={require('../../../../assets/images/images/delete.png')} />
          </TouchableOpacity>
          
        </View>
      </View>
    );
  },[yearGroups]
)

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground source={require('../../../../assets/images/images/union.png')} style={styles.background} imageStyle={{ resizeMode: 'cover', position: 'absolute', bottom: 580 }}>
        {loading && yearGroups.length === 0 ? (
            <View style={{ position: "relative", marginTop: 65 }}>
            <ActivityIndicator size="large" color="#58A8F9" />
            </View>
        ) : (
        <FlatList
          data={yearGroups}
          keyExtractor={(item) => (item._id || item.id).toString()}
          renderItem={renderYearGroups}
          contentContainerStyle={styles.lists}
        />
        )
    }
        <TouchableOpacity style={{ width: 80, height: 80, backgroundColor: '#58A8F9', zIndex: 90000, position: 'absolute', borderRadius: 100, bottom: 100, justifyContent: 'center', alignSelf: 'flex-end', right: 40, alignItems: 'center' }} onPress={() => setIsOpen(true)}>
          <Entypo name="plus" size={40} color="white" />
        </TouchableOpacity>

        {(isOpen || edit) && (
          <View style={styles.inputContainer}>
            <Text style={{ fontSize: 24, position: 'relative', alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 15 }}>
              {edit ? 'Edit Year Group' : 'Add Year Group'}
            </Text>
            <TextInput
              style={styles.input}
              placeholder={edit ? "Edit Year Group" : "Add Year Group"}
              onChangeText={setYearGroup}
              value={yearGroup}
            />


<Dropdown
        style={[styles.inputDropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={years} // Use classOptions for the dropdown data
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Select Year"}
        searchPlaceholder="Search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={year}
        onChange={(item) => {
          setYear(item.value)
          // console.log(item.value)
          // handleStudents(item.value)
        }} // Set selectedClass
      />

            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginBottom: 10 }}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => { setIsOpen(false); setEdit(false); }}>
                <Text style={{ color: '#58A8F9', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={edit ? saveEdit : handleAdd}>
                <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>{edit ? 'Save' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  inputDropdown: {
    height: 45,
    width: "80%",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#daedff",
    marginVertical: 5,
    alignSelf: "center",
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
   dropdown: {
    height: 50,
    width: "90%",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: "#daedff",
    marginBottom: 15,
    alignSelf: "center",
  },
  
  placeholderStyle: {
    fontSize: 15,
    color: "grey",
    paddingHorizontal: 15,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal: 15,
  
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default index;
