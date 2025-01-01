import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, Alert,TextInput } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { setOptions } from "expo-splash-screen";

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api"; // Replace with your actual base URL

const classOptions = [
  { label: "Class 10A", value: "10A" },
  { label: "Class 10B", value: "10B" },
  { label: "Class 10C", value: "10C" },
];

const roles = [
  { "name": "Head Boy" },
  { "name": "Head Girl" },
  { "name": "Vice Head Boy" },
  { "name": "Vice Head Girl" },
  { "name": "Senior Prefect" },
  { "name": "Prefect" },
  { "name": "Other" }
];

const Index = () => {
  const [isFocus, setIsFocus] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [filteredPrefects, setFilteredPrefects] = useState([]);
  const [prefects, setPrefects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startYear, setStartYear] = useState(null);
  const [endYear, setEndYear] = useState(null);
  const [role, setRole] = useState(null);
  const [prefectName, setPrefectName] = useState("");
  const [currentId, setCurrentId] = useState(null); // To store the current prefect ID for editing
  const [classes, setClasses] = useState([]); // To store the current prefect ID for editing
  const [filteredStudents, setFilteredStudents] = useState([]); // To store the current prefect ID for editing
  const [selectedStudent, setSelectedStudent] = useState(null); // To store the current prefect ID for editing

  // Generate a list of years from the current year to 10 years ahead
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => ({ label: `${currentYear + i}`, value: currentYear + i }));

  // Filter the End Year options based on the selected Start Year
  const filteredEndYears = startYear
    ? years.filter((year) => year.value + 1 > parseInt(startYear))
    : years; // Default to all years if Start Year is not selected

  useEffect(() => {
    fetchPrefects();
    fetchClasses();
    fetchStudents();
  }, [selectedClass]);

  const fetchStudents = async () => {
    setLoading(true)
    try {
      if(selectedClass){
      const response = await fetch(`${baseUrl}/students/class/${selectedClass}`);
      if (!response.ok) {
        throw new Error('Failed to fetch students');
      }
      const data = await response.json();
// console.log(data)
      // Transform data to match the design format if needed
      const formattedData = data.users.map((student) => ({
        id: student._id,
        name: `${student.name} ${student.surname || ''}`.trim(),
        class: student.classID || 'N/A',
        userID : student.userID || 'N/A' 
      }));
      
      setFilteredStudents(formattedData);
      setLoading(false)
    }
    } catch (error) {
      console.error(error.message);
      setLoading(false)

    } 
  };

  

  const fetchClasses = async() => {

    try {
      const classes = await axios.get(`${baseUrl}/classes`)
//  console.log(classes, 'classed')
      const formatedData = classes.data.map((cls) => ({
        label: cls.name,
        value: cls.classCode,
      }))

      setClasses(formatedData)


    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }

  }


  const fetchPrefects = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${baseUrl}/prefects`);
      setPrefects(response.data);
      setFilteredPrefects(response.data);
    } catch (error) {
      console.error("Error fetching prefects:", error);
      Alert.alert("Error", "Failed to fetch prefects.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrefect = async () => {
    if (!prefectName || !role || !startYear || !endYear) return;
  
    const newPrefect = { name: prefectName, position: role, userID : selectedStudent , startYear,endYear };
  
    try {
      const response = await axios.post(`${baseUrl}/prefects/add`, newPrefect);
  
      // Log the response to inspect its structure
      // console.log(response.data);  // This will help understand the structure of the response
  
      // Check if the response contains the necessary data before accessing it
      if (response.data && response.data.doc) {
        setPrefects((prevPrefects) => [response.data.doc, ...prevPrefects]);
        setFilteredPrefects((prevPrefects) => [response.data.doc, ...prevPrefects]);
        Alert.alert("Success", "Prefect added successfully!");
        setPrefectName(""); // Clear the name input
        setRole(null);
        setStartYear(null);
        setEndYear(null);
        handleClose();
      } else {
        throw new Error("Invalid response structure");
      }
    } catch (error) {
      console.error("Error adding prefect:", error);
      Alert.alert("Error", "Failed to add prefect.");
    }
  };
  
  

 

  const handleEditPrefect = async () => {
    if (!prefectName || !role || !endYear || !selectedStudent) return;

    const updatedPrefect = { name: prefectName, position: role, endYear,userID: selectedStudent };

    try {
      const response = await axios.put(`${baseUrl}/prefects/update/${currentId}`, updatedPrefect);
      const updatedList = prefects.map((item) =>
        item._id === currentId ? { ...item, ...response.data } : item
      );
      setPrefects(updatedList);
      setFilteredPrefects(updatedList);
      Alert.alert("Success", "Prefect updated successfully!");
      setPrefectName(""); // Clear the name input
      setRole(null);
      setStartYear(null);
      setEndYear(null);
      handleClose();
    } catch (error) {
      console.error("Error updating prefect:", error);
      Alert.alert("Error", "Failed to update prefect.");
    }
  };

  const handleEdit = (prefect) => {
    if (prefect && prefect.name) {
      setEdit(true);
      setPrefectName(prefect.name);
      setRole(prefect.position);
      setStartYear(prefect.startYear);
      setEndYear(prefect.endYear);
      setCurrentId(prefect._id); // Store the prefect ID for updating
      setIsOpen(true);
    } else {
      console.error("Prefect data is undefined or incomplete");
    }
  };

  const handleDeletePrefect = async (id) => {
    try {
      await axios.delete(`${baseUrl}/prefects/delete/${id}`);
      const filteredList = prefects.filter((item) => item._id !== id);
      setPrefects(filteredList);
      setFilteredPrefects(filteredList);
      Alert.alert("Success", "Prefect deleted successfully!");
    } catch (error) {
      console.error("Error deleting prefect:", error);
      Alert.alert("Error", "Failed to delete prefect.");
    }
  };

  // Focus Handlers
  const handleFocus = () => setIsFocus(true);
  const handleBlur = () => setIsFocus(false);

  // Search Button Logic
  const handleSearch = () => {
    if (selectedClass) {
      const filtered = prefects.filter((prefect) => prefect.class === selectedClass);
      setFilteredPrefects(filtered);
    } else {
      setFilteredPrefects(prefects); // If no class is selected, show all prefects
    }
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedClass(null); // Reset dropdown
    setSelectedStudent(null); // Reset dropdown
    setFilteredPrefects(prefects); // Reset prefects list
  };

  const handlePlus = () => {
    setIsOpen(true);
  };

  
  

  const handleClose = () => {
    setEdit(false);
    setIsOpen(false);
    setStartYear(null);
    setEndYear(null);
    setRole(null);
    setPrefectName(""); // Clear name field on close
  };

  return (
    <SafeAreaView >
    <View style={[isOpen || edit ? styles.container1 : styles.container]}>
      <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={classes} // Use classOptions for the dropdown data
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Search by Class"}
        searchPlaceholder="Search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={selectedClass}
        onChange={(item) => {
          setSelectedClass(item.value)
          // console.log(item.value)
          // handleStudents(item.value)
        }} // Set selectedClass
      />

      {selectedClass && <Dropdown
        style={[styles.dropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={filteredStudents.map((student) => ({label: student.name, value: student.userID}))} // Use classOptions for the dropdown data
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Search by Students"}
        searchPlaceholder="Search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={selectedStudent}
        onChange={(item) => {
          setSelectedStudent(item.value)
        }} // Set selectedClass
      />}

      <View style={styles.footer}>
        <TouchableOpacity style={styles.reset} onPress={handleReset}>
          <Text style={{ color: "#58A8F9" }}>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.search} onPress={handleSearch}>
          <Text style={{ textAlign: "center", color: "white", fontSize: 15, paddingHorizontal: 10 }}>
            Search
          </Text>
        </TouchableOpacity>
      </View>
    </View>

    <ScrollView style={[isOpen || edit ? styles.scrollContainer1 : styles.scrollContainer]}>
      {filteredPrefects.map((prefect, index):any => (
        <View style={styles.list} key={index}>
          <Image style={styles.stImg} source={require("../../../../assets/images/images/avatar.png")} /> 
          <View style={styles.listContent}>
            <Text style={{ color: "#58A8F9", fontSize: 18 }}>{prefect.name}</Text>
            <Text style={{ color: "grey", fontSize: 13, fontWeight: "400" }}>{prefect.startYear}-{prefect.endYear}</Text>
            <Text style={{ color: "grey", fontSize: 12, fontWeight: "400" }}>{prefect.position}</Text>
          </View>
          <View style={styles.listBtns}>
              <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} onPress={() => {handleEdit(prefect)}}>
              <Image source={require('../../../../assets/images/images/edit.png')}/>

              </TouchableOpacity>
              <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} onPress={() => {handleDeletePrefect(prefect._id)}}>
              <Image source={require('../../../../assets/images/images/delete.png')}/>

              </TouchableOpacity>
          </View>
          
        </View>
      ))}
      </ScrollView>
    <TouchableOpacity style={{width:80, height:80, backgroundColor:'#58A8F9', zIndex:90000, position:'absolute', borderRadius:100, bottom:100, justifyContent:'center',alignSelf:'flex-end',right:40,alignItems:'center'}} onPress={handlePlus}>
    <Entypo name="plus" size={40} color="white" />
    </TouchableOpacity>

    {(isOpen || edit )&& <View style={styles.inputContainer}>
        <Text style={{fontSize:20,position:'relative',alignSelf:'flex-start',paddingHorizontal:25,paddingVertical:15}}>{edit ? 'Edit Prefect' : 'Add Prefect'}</Text>



        <TextInput 
  style={styles.input} 
  placeholder={"Add Name"} 
  value={prefectName} 
  onChangeText={(text) => setPrefectName(text)} // Update the prefectName state with the input text 
/>

    <Dropdown
        style={[styles.inputDropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={roles.map((role) => ({label: role.name, value: role.name}))} 
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Select Role"}
        searchPlaceholder="Search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={role}
        onChange={(item) => setRole(item.value)} // Set selectedClass
      />

{!edit && <Dropdown
        style={[styles.inputDropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={years} // Use classOptions for the dropdown data
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Select Start-Year"}
        searchPlaceholder="Search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={startYear}
        onChange={(item) => setStartYear(item.value)} // Set selectedClass
      />}


<Dropdown
        style={[styles.inputDropdown]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={filteredEndYears} // Use classOptions for the dropdown data
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={"Select End-Year"}
        searchPlaceholder="Search..."
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={endYear}
        onChange={(item) => setEndYear(item.value)} // Set selectedClass
      />




    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:10}}>

    <TouchableOpacity style={styles.closeBtn} onPress={handleClose}
    >
    <Text style={{color:'#58A8F9',fontSize:16}}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttons} onPress={edit ? handleEditPrefect : handleAddPrefect}>
    <Text style={{color:'white',fontSize:16, textAlign:'center'}} 
    >{edit ? 'Edit' : 'Add'}</Text>
    </TouchableOpacity>
    </View>
    </View>}

  </SafeAreaView>
);
};

const styles = StyleSheet.create({
container: {
  backgroundColor: "white",
  paddingVertical: 55,
  position: "relative",
  top: 50,
},
container1: {
  backgroundColor: "lightblue",
  paddingVertical: 55,
  position: "relative",
  top: 50,
  opacity:0.3
},
scrollContainer : {
  maxHeight:610 ,
  minHeight:610, 
  marginVertical:50,
  position:'relative',
  backgroundColor:'white' ,

},
scrollContainer1 : {
  maxHeight:610 ,
  minHeight:610, 
  marginVertical:50,
  position:'relative',
  backgroundColor:'lightblue',
  opacity:0.3
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
inputDropdown: {
  height: 45,
  width: "80%",
  borderRadius: 8,
  paddingHorizontal: 8,
  backgroundColor: "#daedff",
  marginVertical: 5,
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
footer: {
  flex: 1,
  flexDirection: "row",
  justifyContent: "flex-end",
  backgroundColor: "green",
  zIndex:200000

},
search: {
  position: "relative",
  right: 18,
  width: 120,
  height: 40,
  borderRadius: 15,
  backgroundColor: "#58A8F9",
  // backgroundColor: "red",
  justifyContent: "center",
},
reset: {
  // backgroundColor: "transparent",
  // backgroundColor: "red",
  width: 70,
  height: 35,
  justifyContent: "center",
  marginRight: 15,
},
list: {
  width: "90%",
  height: 85,
  borderColor: "grey",
  borderRadius: 10,
  backgroundColor: "#FFFFFF",
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  alignSelf: "center",
  marginBottom: 5,
  marginTop: 20,
  flex:1,
  elevation:4,
},
stImg: {
  width: 50,
  height: 50,
  position: "absolute",
  left: 40,
  backgroundColor: "white",
  borderRadius: 100,
},
listContent: {
  flexDirection: "column",
  position: "relative",
  left: 115,
},
listBtns:{
  position:'absolute',
  flex:1,
  flexDirection:'row',
  right:30,
  justifyContent:'space-between'
},

input: {
  width: '80%',
  height: 45,
  backgroundColor: '#DAEDFF',
  // backgroundColor: 'red',
  marginBottom: 3,
  borderRadius: 10,
  alignSelf: 'center',
  paddingHorizontal: 25,
  fontSize:15
},
// inputDesc:{
//   width: '80%',
//   height: 100,
//   backgroundColor: '#DAEDFF',
//   // backgroundColor: 'red',
//   marginBottom: 10,
//   marginTop: 10,
//   borderRadius: 10,
//   alignSelf: 'center',
//   paddingHorizontal: 25,
// },
inputContainer:{
  position:'absolute',
  width:'85%',
  height:350,
  backgroundColor:'white',
  // backgroundColor:'red',
  borderRadius:10,
  justifyContent:'center',
  alignSelf:'center',
  top:'30%',
  flexDirection:'column',
  zIndex:900000,
// marginVertical:15
},
buttons:{
  width:80,
  height:30,
  backgroundColor: '#58A8F9',
  position:'absolute',
  bottom:13,
  right:25,
  borderRadius:20,
  justifyContent:'center',
  alignSelf:'flex-end',
    },

  closeBtn:{
  position:'absolute',
  bottom:15,
  left:150,
  borderRadius:20,
  justifyContent:'center',
  alignSelf:'flex-end',
    }

});

export default Index;
