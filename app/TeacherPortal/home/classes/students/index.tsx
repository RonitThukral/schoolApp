import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView, SafeAreaView, Platform} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import axios from 'axios';
import { parse } from '@babel/core';
import Attendance from '@/app/home/Reports/attendance';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


  const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'


  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedID, setSelectedID] = useState(null);
    
    const [classes , setClasses] = useState([])
    const [classStudents , setClassStudents] = useState([])
    const [filteredClassStudents, setFilteredClassStudents] = useState([]);
    const [busRoutes, setBusRoutes] = useState({});
    const [expandedSections, setExpandedSections] = useState({}); // Store expanded states as an object
    
    const router = useRouter()
    
    const {classId} = useLocalSearchParams();

// const parsedStudent = student ? JSON.parse(student) : null;


// console.log(classId, 'daidhs')


    useEffect(() => {
      const fetchAllData = async () => {
        try {
          
          
          
          // Fetch classes after campuses and teachers are populated
          const res = await axios.get(`${baseUrl}/students/class/${classId}`);
          const students = res.data.users
          
          setClassStudents(students)
          setFilteredClassStudents(students)
          
          
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchAllData();
    }, []);
    
    const fetchBus = async (id) => {
      if (!id) return 'N/A';
      if (busRoutes[id]) return busRoutes[id]; // Return cached data
      
      try {
        const res = await axios.get(`${baseUrl}/dormitories/${id}`);
        const busName = res.data.docs.name;
        
        setBusRoutes((prev) => ({ ...prev, [id]: busName })); // Cache result
        return busName;
      } catch (error) {
        console.error('Error fetching bus route:', error);
        return 'N/A';
      }
    };
    
    
    
    useEffect(() => {
      filteredClassStudents.forEach((student) => {
        if (student.dormitoryID && !busRoutes[student.dormitoryID]) {
          fetchBus(student.dormitoryID);
        }
      });
    }, [filteredClassStudents]);
    
    
    // Search Button Logic
    const handleSearch = () => {
    const filtered = classStudents.filter((data) => {
      return (
        (!selectedID || data.userID === selectedID)
        
      );
    });
    setFilteredClassStudents(filtered);
  };
  
  // Reset Button Logic
  const handleReset = () => {
    setSelectedID(null);
    
    setFilteredClassStudents(classStudents);
  };
  
  
  
  const handleFocus = (id:string) => {
    setIsFocus(id)
  }
  
  const handleBlur = () => {
    setIsFocus(null)
  }
  
  const handleAttendance = () => {
    router.push({
      pathname: './markAttendance',
      params: { classId: classId },  // Use 'params' here instead of 'query'
    });
  }
  const handleViewAttendance = () => {
    router.push({
      pathname: './viewAttendance',
      params: { classId: classId },  // Use 'params' here instead of 'query'
          });
    }
    
    
    
    
    const InfoRow = ({ label, value ,isMultiLine = false}:any) => (
      <View style={styles.infoRow}>
          <Text style={styles.label}>{label}</Text>
          <View style={{width:'70%', left:10, top:0}}>
    
          <Text style={[isMultiLine ? styles.multiLine : styles.value]}>{value}</Text>
          </View>
        </View>
      );
      

const toggleSection = (id) => {
  setExpandedSections((prevId) => (prevId === id ? null : id));
};

const Section = ({ id, title, subTitle, children }) => {
  const isExpanded = expandedSections === id; // Only one section expands at a time

  return (
    <View style={styles.section}>
      <TouchableOpacity 
        style={styles.sectionHeader} 
        onPress={() => toggleSection(id)}
        activeOpacity={0.7}
      >
        <Image height={responsiveHeight(5)} width={responsiveWidth(5)} source={require('../../../../../assets/images/images/boy.png')}/>
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={{ color: 'grey', position: 'relative', left: 15 }}>{subTitle}</Text>
        </View>
        <AntDesign name={isExpanded ? "up" : "down"} size={24} color="#58A8F9" />
      </TouchableOpacity>

      {isExpanded && (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.sectionContent}>
            {children}
          </View>
        </View>
      )}
    </View>
  );
};


    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
       
 
          
<View style={{flexDirection:'row', justifyContent:'flex-end',paddingTop:70,paddingBottom:30}}>
<TouchableOpacity style={styles.attendance} onPress={handleAttendance}>
    <Text style={{color:'white',alignSelf:'center',textAlignVertical:'center',textAlign:'center',fontSize:17,paddingVertical:6}}>Mark Attendance</Text>
</TouchableOpacity>

<TouchableOpacity style={styles.view} onPress={handleViewAttendance}>
    <Text style={{color:'white',alignSelf:'center',textAlignVertical:'center',textAlign:'center',fontSize:17,paddingVertical:6}}>View Attendance</Text>
</TouchableOpacity>

</View>


          
      </View>

<View style={{height:1,width:'100%', borderBottomWidth:0.5,borderColor:'black',position:'absolute',top:responsiveHeight(19)}}></View>

{/* List of students section */}
<ScrollView style={{ marginTop: 0, marginBottom: 0, backgroundColor: '#daedff' }} contentContainerStyle={{ paddingBottom: 40 }}>
  {filteredClassStudents?.length > 0 ? (
    filteredClassStudents.map((data, index) => (
      <Section
        key={index}
        id={data._id}  
        title={`${data.name} ${data.surname || ''}`.trim()}
        subTitle={data.userID || 'N/A'}
      >
        <InfoRow label="Class" value={data.classID || 'N/A'} />
        <InfoRow label="Bus Route" value={busRoutes[data.dormitoryID] || 'N/A'} />
        <InfoRow label="Gender" value={data.gender || 'N/A'} />
      </Section>
    ))
  ) : (
    <Text style={{ textAlign: 'center', color: 'grey', marginTop: 20 }}>
      No students found.
    </Text>
  )}
</ScrollView>



      </SafeAreaView>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#daedff',
      padding: 16,
    //   paddingVertical:50,
      marginTop:0,
      
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
   
    placeholderStyle: {
      fontSize: 15,
      color: 'grey',
      paddingHorizontal: 15
    },
    selectedTextStyle: {
      fontSize: 16,
      paddingHorizontal:15
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
      // paddingTop:15
      position:'relative',
      top:10
      
    },
    search: {
      position:'relative',
      right:18,
      width: 130,
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
      marginTop: 20,
      
    },
    listBtns:{
        position:'absolute',
        right:30
    },
    stImg:{
      width:60,
      height:60,
      position:'absolute',
      left: 40,
      backgroundColor:'white',
      borderRadius:100
    },
    listContent:{
      flexDirection:'column',
      position: 'relative',
      left:130
    },
    section: {

        width:"80%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        //  backgroundColor: 'red',
         marginHorizontal: 16,
        marginTop: 10,
         borderRadius: 8,
         overflow: 'hidden',
         elevation: 3, // Adds shadow for Android
        //  shadowColor: '#000', // Adds shadow for iOS
        //  shadowOffset: { width: 0, height: 1 },
        //  shadowOpacity: 0.1,
        //  shadowRadius: 3,

         ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height:1 },
            shadowOpacity: 1,
            shadowRadius: 6,
            borderWidth:0.5,
            borderColor:'grey'
          },
          
        }),
      },
      sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        // backgroundColor: '#F8F8F8',
        backgroundColor: 'transparent',

        

      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        color:'#58A8F9',
        position:'relative',
        left:13
      },
      sectionContent: {
        padding: 16,
        width:"100%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        // backgroundColor: 'red',
        marginHorizontal: 16,
        paddingTop: 0 ,
        borderRadius: 10,
        overflow: 'hidden',
        // flexDirection:'row'
        
        // elevation: 4, // Adds shadow for Android
        // shadowColor: '#000', // Adds shadow for iOS
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
        
      },
      
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
      },
      label: {
        fontWeight:'600',
        color: '#666',
        fontSize: 12,
      },
      value: {
        color:'grey',
        fontSize: 12,
        // fontWeight:'400'
        position:'relative',
        left:20
      },
      multiLine : {
        flexWrap:'wrap',
        // width:'70%',
        // marginTop:10,
        fontSize:12,
        color:'grey'
      },
      attendance :{
        width:responsiveWidth(40),
        backgroundColor:'red',
        height:responsiveHeight(5),
        borderRadius: 10,
        marginHorizontal:15
      },
      view:{
        width:responsiveWidth(40),
        backgroundColor:'green',
        height:responsiveHeight(5),
        borderRadius: 10,
        marginHorizontal:15
      }
    

  });