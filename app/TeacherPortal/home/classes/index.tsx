import React, { useEffect, useLayoutEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView, SafeAreaView, Platform} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';


  // interface Values {
  //   [key: string]: string | null;
  // }

  const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'


  const DropdownComponent = () => {

    const {teacher} = useLocalSearchParams()
    const parsedTeacher = teacher ? JSON.parse(teacher) : null;

    // console.log(parsedTeacher, 'wdahje')

    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedID, setSelectedID] = useState(null);
    const [selectedCampuses, setSelectedCampuses] = useState(null)
    const [selectedClassTeacher, setSelectedClassTeacher] = useState(null);
    const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
    const [classes , setClasses] = useState([])
    const [filteredClasses, setFilteredClasses] = useState([]);
const [campuses, setCampuses] = useState([])
const [teachers, setTeachers] = useState([])
   
const router = useRouter()



    useEffect(() => {
      const fetchAllData = async () => {
        try {
        //   // Fetch campuses and teachers in parallel
        //   const [campusResponse, teacherResponse] = await Promise.all([
        //     axios.get(`${baseUrl}/campuses`),
        //     axios.get(`${baseUrl}/teachers`)
        //   ]);
    
        //   // Set campuses data
        //   setCampuses(campusResponse.data);
    
        //   // Set teachers data
        //   const formattedTeachers = teacherResponse.data.map((teacher) => ({
        //     id: teacher._id,
        //     userID: teacher.userID || 'N/A',
        //     designation: teacher.role || 'N/A',
        //     name: `${teacher.name} ${teacher.surname}`
        //   }));
        //   setTeachers(formattedTeachers);
    
          // Fetch classes after campuses and teachers are populated
          const classesResponse = await axios.get(`${baseUrl}/classes/teacher/${parsedTeacher.userID}`);

          const formattedClasses = classesResponse.data.docs.map((cls) => {
            
    
            return {
              name: cls.name,
              academic: cls.academic || 'N/A',
              classCode: cls.classCode
            };
          });
    
          setClasses(formattedClasses);
          setFilteredClasses(formattedClasses);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchAllData();
    }, []);
    


   // Search Button Logic
  const handleSearch = () => {
    const filtered = classes.filter((data) => {
      return (
        (!selectedID || data.classCode === selectedID) &&
        (!selectedCampuses || data.campus === selectedCampuses) &&
        (!selectedClassTeacher || data.teacher === selectedClassTeacher)
      );
    });
    setFilteredClasses(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedID(null);
    setSelectedCampuses(null);
    setSelectedClassTeacher(null);
    setFilteredClasses(classes);
  };

   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    const handlePress = (id) => {
        router.push({
            pathname: './classes/students',
            params: { classId: id },  // Use 'params' here instead of 'query'
          });
    }

    

    const toggleSection = (id: string) => {
        setExpandedSectionId((prev) => (prev === id ? null : id));
      };



      const InfoRow = ({ label, value ,isMultiLine = false}:any) => (
        <View style={styles.infoRow}>
          <Text style={styles.label}>{label}</Text>
          <View style={{width:'70%', left:10, top:0}}>
    
          <Text style={[isMultiLine ? styles.multiLine : styles.value]}>{value}</Text>
          </View>
        </View>
      );
    
      const Section = ({ id,title,subTitle, children }:any):any => {
        //   const isExpanded = expandedSectionId === id
        return(
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => {handlePress(id)}}
            activeOpacity={0.5}
          >
            <View style={{flex:1, flexDirection:'column'}}>

            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={{color:'grey',position:'relative',left:15}}>{subTitle}</Text>
            </View>
            
            <AntDesign name="right" size={24} color="#58A8F9" />
          </TouchableOpacity>
          {/* {isExpanded && (
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.sectionContent}>
              {children}
            </View>
            <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../../../assets/images/images/edit.png')}/>

                </TouchableOpacity>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../../../assets/images/images/delete.png')}/>

                </TouchableOpacity>
            </View>

            </View>
          )} */}
        </View>
      )};
   

    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        
      {/* <Image source={require('../../../../assets/images/images/union.png')}/> */}
      
          
      </View>

{/* <View style={{height:1,width:'100%', borderBottomWidth:0.5,borderColor:'grey'}}></View> */}

{/* List of students section */}
<ScrollView style={{marginTop: 0, marginBottom: 0, backgroundColor:'#daedff'}} contentContainerStyle={{paddingBottom:40}}>

{filteredClasses.map((data, index) => {
  return (
    <Section
    key={index}
    id={data.classCode}
          title={data.name}
          subTitle= {data.academic}
          
        >
         
          
        </Section>
  )
})}
</ScrollView>


      </SafeAreaView>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#daedff',
      padding: 16,
      paddingVertical:70,
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
      }
    

  });