import React, { useState,useEffect } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,ActivityIndicator,Button,Alert} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import Feather from '@expo/vector-icons/Feather';import { useRouter } from 'expo-router';
import axios from 'axios';
import * as Print from 'expo-print';
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';



  const baseUrl = 'https://api.dreameducation.org.in/api'

  const DropdownComponent = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedID, setSelectedID] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [allStudents, setAllStudents] = useState([])
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [classes, setClasses] = useState([]);
    const [busRoutes, setBusRoutes] = useState([]);
    // const [bus, setBus] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [studentNames, setStudentNames] useState([])
    
    const router = useRouter();



    const fetchStudents = async () => {
      setLoading(true)
      try {
        const response = await fetch(`${baseUrl}/students`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();

        // Transform data to match the design format if needed
        const formattedData = data.map(student => ({
          id: student._id,
          name: `${student.name} ${student.surname || ''}`.trim(),
          class: student.classID || 'N/A',
          busRoute : student.dormitoryID || 'N/A' ,
          userID : student.userID || 'N/A' ,
          gender: student.gender || 'N/A',
          guardian: student.guadian || 'N/A'
        }));

        setAllStudents(formattedData);
        setFilteredStudents(formattedData);
        setLoading(false)
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

    const fetchBusRoutes = async() => {
      try {
        const routes = await axios.get(`${baseUrl}/dormitories`)
        const formatedData = routes.data.map((buses) => ({
          // id: buses._id,
          label: buses.name,
          value: buses._id
        }))
        setBusRoutes(formatedData)
      } catch (error) {
        
      }
    }


    // const fetchBus = async () => {
    //   // if (!selectedStudent?.dormitoryID) return;  // Check that dormitoryID exists
    //   try {
    //     const response = await axios.get(`${baseUrl}/dormitories/${selectedRoute}`);
    //     setBus(response?.data?.doc?.name);
    //   } catch (error) {
    //     console.error("Error fetching BUS:", error);
    //   }
    // };


    useEffect(() => {
      fetchStudents();
      fetchClasses();
      fetchBusRoutes()
      // fetchBus()
    }, []);




   // Search Button Logic
  const handleSearch = () => {
    const filtered = allStudents.filter((student) => {
      const hasTransport = student.busRoute && student.busRoute !== 'N/A';
      const isTransportMatch = 
        selectedValue === '' || (selectedValue === 'Transport' ? hasTransport : !hasTransport);
  
      return (
        isTransportMatch &&
        (!selectedID || student.userID === selectedID) &&
        (!selectedName || student.name === selectedName) &&
        (!selectedClass || student.class === selectedClass)&&
        (!selectedRoute || student.busRoute === selectedRoute)
      );
    });
    setFilteredStudents(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedID(null);
    setSelectedName(null);
    setSelectedClass(null);
    setSelectedRoute(null);
    setSelectedValue(''); // Reset to default filter
    setFilteredStudents(allStudents); // Show all students
  };

    const handleRadioPress = (value:any) => {
      setSelectedValue(value);
    };

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

  
    
    const handleSelectStudent = (studentId) => {
      router.push(`/home/students/allStudents/studentDetails?studentId=${studentId}`);
      // console.log('Navigating to studentDetails with studentId:', studentId);
    };

    const generatePdfAndPrint = async () => {
      const studentRows = filteredStudents
        .map(student => {
          const busRouteName = busRoutes.find(route => route.value === student.busRoute)?.label || 'N/A';
    
          return `
            <tr>
              <td>${student.userID}</td>
              <td>${student.name}</td>
              <td>${student.guardian[0]?.name || ''}<br>${student.guardian[1]?.name || ''}</td>
              <td>${student.class}</td>
              <td>${student.gender}</td>
              <td>${busRouteName}</td>
            </tr>
          `;
        })
        .join('');
    
      const htmlContent = `
        <style>
          h1 { text-align: center; }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            border: 1px solid #ddd;
            text-align: center;
            padding: 8px;
          }
          th {
            background-color: #2094e6;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        </style>
        <h1>Student List</h1>
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Guardian</th>
              <th>Class</th>
              <th>Gender</th>
              <th>Bus Route</th>
            </tr>
          </thead>
          <tbody>
            ${studentRows}
          </tbody>
        </table>
      `;
    
      try {
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        await Print.printAsync({ uri });
        Alert.alert('PDF Generated', 'PDF is ready to print!');
      } catch (error) {
        console.error('Error generating PDF:', error);
        Alert.alert('Error', 'Failed to generate PDF');
      }
    };
    
    
   

    return (
        <>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={allStudents.map((student) => ({ label: student.userID, value: student.userID }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by ID'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedID}
          onChange={(item) => setSelectedID(item.value)}
       
        />
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={allStudents.map((student) => ({label: student.name, value: student.name}))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Name'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          value={selectedName}
          onChange={(item) => setSelectedName(item.value)}
       
        />
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
       
        />


        <View style={[selectedValue ==='Transport' ? styles.transportContainer: styles.withoutTransport]}>
        <View style={styles.radioContainer}>
          {['Transport', 'Without Transport'].map((role) => (
            <TouchableOpacity
              key={role}
              style={styles.radioButton}
              onPress={() => handleRadioPress(role)}
            >
              <View
                style={[
                  styles.radioCircle,
                ]}
              />
              <View style={[selectedValue === role ? styles.selectedRadioCircle:null]}></View>
              <Text style={styles.radioLabel}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        </View>
      
      
        { selectedValue === 'Transport' &&    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={busRoutes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Bus Route'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('route')}
          onBlur={handleBlur}
          value={selectedRoute}
          onChange={(item) => setSelectedRoute(item.value)}
          
       
        />}

          <View style ={styles.footer}>
          {/* PDF Button */}
          <TouchableOpacity style={[selectedValue === 'Transport' ? {  position: 'relative',left:'7%',width:'40%',top:responsiveHeight(1)} : {  position: 'relative',left:'5%',width:'40%',top:responsiveHeight(0.9)}]} onPress={generatePdfAndPrint}>
          <Text style={{color:'#58a8f9',fontSize:14}}>Generate Pdf</Text>
        </TouchableOpacity>
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} onPress={handleSearch}>
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>


          </View>

     

      </View>

      




{/* List of students section */}
<ScrollView style={{ marginTop: -15, marginBottom: 0, backgroundColor: 'white' ,borderTopWidth:0.5,borderColor:'grey'}} contentContainerStyle={{paddingBottom:30,}}>
  {loading && allStudents.length === 0 ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 200 }}>
      <ActivityIndicator size="large" color="#58A8F9" />
    </View>
  ) : (
    filteredStudents.map((student, index) => (
      <TouchableOpacity style={styles.list} key={index} onPress={() => handleSelectStudent(student.userID)}>
        <Image
          style={styles.stImg}
          source={require('../../../../assets/images/images/boy.png')}
        /> 
        <View style={styles.listContent}>
          <Text style={{ color: '#58A8F9', fontSize: 20, width: responsiveWidth(50) }}>{student.name}</Text>
          <Text style={{ color: 'grey', fontSize: 12, fontWeight: 'condensedBold' }}>
            {student.userID}
          </Text>
          <Text style={{ color: 'grey', fontSize: 12, fontWeight: 'condensedBold' }}>
            {student.class}
          </Text>
        </View>
        
        <Feather name="arrow-right" size={26} color="#58A8F9" style={{ position: 'relative', right: responsiveWidth(5) }} />
      </TouchableOpacity>
    ))
  )}
</ScrollView>



      </>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
    },
    dropdown: {
      height: 50,
      width:"90%",
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
      borderRadius: 10,
      paddingHorizontal: 8,
      backgroundColor:'#daedff',
      marginBottom: 10,
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
    radioContainer: {
      alignSelf: 'center',
      marginTop: 13,
      flexDirection: 'row',
      // justifyContent: 'space-between',

      width: responsiveWidth(70),
      // marginRight: 17
      position: 'relative',
      right:responsiveWidth(20),
      paddingLeft:responsiveWidth(8),
      // paddingRight:responsiveWidth(15)
      
    },
    radioButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft: 44
    },
    radioCircle: {
      width: 17,
      height: 17,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    selectedRadioCircle :{
      width:7,
      height:7,
      borderRadius: 10,
      backgroundColor: 'grey',
      position: 'absolute',
      left:5
    },
    radioCircleSelected: {
      backgroundColor: 'white',
    },
    radioLabel: {
      fontSize: 13,
      color: 'grey',
      fontWeight: 'condensedBold'
    },
    transportContainer :{
      width: "90%",
      height: "13%",
      position: 'relative',
      backgroundColor:'white',
      bottom: 10,
      borderWidth: 2,
      borderColor: '#EEF7FF',
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 5,
    },
    withoutTransport:{
      width: "90%",
      height: "15%",
      position: 'relative',
      backgroundColor:'white',
      bottom: 10,
      borderWidth: 2,
      borderColor: '#EEF7FF',
      borderRadius: 10,
      alignSelf: 'center',
      marginTop: 5,
    },
    footer :{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      // position:'relative',
      // top:responsiveHeight(1)
      
    },
    search: {
      position:'relative',
      right:18,
      width: responsiveWidth(30),
      height:responsiveHeight(4.5),
      borderRadius:15,
      backgroundColor: '#58A8F9',
      justifyContent: 'center',
    },
    reset: {
      backgroundColor:'transparent',
      width: responsiveWidth(18),
      height: 35,
      justifyContent:'center',
      marginRight: 15
    },
    list:{
      width: "90%",
      height: 100,
      borderColor: 'grey',
      borderRadius: 10,
      // backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      marginBottom: 0,
      marginTop: 10,
      elevation:4,
      borderWidth:0.3
    },
    stImg:{
      width:60,
      height:60,
      position:'absolute',
      left: responsiveWidth(8),
      backgroundColor:'white',
      borderRadius:100
    },
    listContent:{
      flexDirection:'column',
      position: 'relative',
      left:responsiveWidth(29)
    },
    

  });