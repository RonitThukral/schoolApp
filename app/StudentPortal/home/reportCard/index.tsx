import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, SafeAreaView,Image, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const term = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
];

const DropdownComponent = () => {
    const {student} = useLocalSearchParams();

    const parsedStudent = student ? JSON.parse(student) : null;

  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [students, setStudents] = useState([]);

  const [classes, setClasses] = useState([]);
  const [years, setYears] = useState([]);

  const router = useRouter();

  // Fetch Initial Data (Classes & Years)
  const fetchInitialData = async () => {
    try {
      const classesResponse = await axios.get(`${baseUrl}/classes`);
      setClasses(classesResponse.data.map((cls) => ({ label: cls.name, value: cls.classCode })));

      const yearResponse = await axios.get(`${baseUrl}/yeargroup`);
      setYears(yearResponse.data.map((y) => ({ label: y.year, value: y.year })));
    } catch (err) {
      console.error('Error fetching initial data:', err);
    }
  };

  // Fetch Students Based on Filters
  const fetchStudents = async () => {
    try {
      if (!selectedClass) {
        console.warn('Please select a class to fetch students.');
        return;
      }

      const cst = await axios.get(`${baseUrl}/students/class/${selectedClass}`);
      const classStudents = cst?.data?.users || [];

      const formattedData = classStudents.map((student) => ({
        userID: student?.userID || 'N/A',
        name: `${student?.name} ${student?.surname}`,
      }));

      setStudents(formattedData);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  // Fetch initial data on load
  useEffect(() => {
    fetchInitialData();
  }, []);

  // Search Button Logic
  const handleSearch = () => {
    if (!selectedYear || !selectedTerm) {
      console.warn('Please select Class, Year, and Term before searching.');
      return;
    }
    handlePress()
    fetchStudents();
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedTerm(null);
    setSelectedYear(null);
    setSelectedClass(null);
    setStudents([]);  // Reset students on reset
  };

  const handleFocus = (id: string) => {
    setIsFocus(id);
  };

  const handleBlur = () => {
    setIsFocus(null);
  };

  const handlePress = () => {
    router.push({
      pathname: './reportCard/report',
      params: { 
        studentId: parsedStudent.userID,
        term: selectedTerm,
        year: selectedYear,
        selectedClass: parsedStudent.classID
       },  // Use 'params' here instead of 'query'
    });
  };
    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
       
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={years}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Acedemic Year'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedYear}
          onChange={(item) => setSelectedYear(item.value)}
       
        />


      
      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={term}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Term'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('route')}
          onBlur={handleBlur}
          onChange={() => {
            setIsFocus(null);
          }}
          value={selectedTerm}
          onChange={(item) => setSelectedTerm(item.value)}
       
        />

          <View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} onPress={handleSearch}>
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>
          </View>
          
      </View>


<SafeAreaView style={{backgroundColor:'white',flex:1}} >

<ScrollView style={{backgroundColor:'white',  marginBottom:10}} contentContainerStyle={{paddingBottom:40}}>
{/* {students.map((student, index) => {
  return (
    <TouchableOpacity style={styles.list} key={index} >
        <Image source={require('../../../../../assets/images/images/boy.png')} style={styles.setImg}/>
        <View style={styles.listContent}>
            <Text style={{fontSize:20,color:'#58A8F9',width:'130%'}}>{student.name}</Text>
            <Text style={{fontSize:13, color:'grey'}}>{student.userID}</Text>
        </View>

       
        <TouchableOpacity>
        <Image source={require('../../../../../assets/images/images/eye.png')} style={styles.eyeImg}/>        
        </TouchableOpacity>
    </TouchableOpacity>
  )
})} */}
</ScrollView>
</SafeAreaView>

      </SafeAreaView>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      paddingVertical:60
    },
    dropdown: {
      height: 50,
      width:"90%",
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor:'#daedff',
      marginBottom: 15,
      alignSelf: 'center'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'transparent',
      left: 45,
      top: 5,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 15,
      color: 'grey',
      paddingHorizontal: 15
    },
    selectedTextStyle: {
      fontSize: 16,
      paddingHorizontal: 15

    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    
    footer :{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      position:'relative',
      top:15
    },
    search: {
      position:'relative',
      right:18,
      width: 100,
      height:35,
      borderRadius:15,
      backgroundColor: '#58A8F9',
      justifyContent: 'center',
    },
    reset: {
      backgroundColor:'transparent',
      width: 70,
      height: 35,
      justifyContent:'center',
      marginRight: 15
    },
    list:{
      width: "85%",
      height: 80,
      borderColor: 'grey',
      borderRadius: 10,
    //   backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      marginBottom: 0,
      marginTop: 20,
      resizeMode:'cover',
      elevation:3,

      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.20,
          shadowRadius: 3.84,
        },
        
      }),

    },
    setImg:{
        marginHorizontal:20,
        width:42,
        height:42
    },
    eyeImg:{
        width:30,
        height:30,
position:'relative',
right:40
    },
    listContent:{
      width:'30%',
      flexDirection:'column',
      position: 'relative',
      right:60,
      justifyContent:'flex-start'
    },
    
    

  });