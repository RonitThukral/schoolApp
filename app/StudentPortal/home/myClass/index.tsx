import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView, SafeAreaView, Platform} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import axios from 'axios';
import { parse } from '@babel/core';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



  // interface Values {
  //   [key: string]: string | null;
  // }

  const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'


  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedID, setSelectedID] = useState(null);
    
    const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
    const [classes , setClasses] = useState([])
    const [classStudents , setClassStudents] = useState([])
    const [filteredClassStudents, setFilteredClassStudents] = useState([]);

   
const {student} = useLocalSearchParams();

const parsedStudent = student ? JSON.parse(student) : null;


// console.log(parsedStudent, 'daidhs')


    useEffect(() => {
      const fetchAllData = async () => {
        try {
        
        
    
          // Fetch classes after campuses and teachers are populated
          const res = await axios.get(`${baseUrl}/students/class/${parsedStudent.classID}`);
          const students = res.data.users
          // console.log(students,'tgijnjksfnsdkgn')

          setClassStudents(students)
          setFilteredClassStudents(students)
    
    
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchAllData();
    }, []);
    


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
          const isExpanded = expandedSectionId === id
        return(
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => {toggleSection(id)}}
            activeOpacity={0.7}
          >
            <Image height={responsiveHeight(5)} width={responsiveWidth(5)} source={require('../../../../assets/images/images/boy.png')}/>

            <View style={{flex:1, flexDirection:'column'}}>

            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={{color:'grey',position:'relative',left:15}}>{subTitle}</Text>
            </View>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#58A8F9"
            />
          </TouchableOpacity>
          {isExpanded && (
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.sectionContent}>
              {children}
            </View>
         

            </View>
          )}
        </View>
      )};
   

    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classStudents.map((cls) => ({label: `${cls.name.toUpperCase()} ${cls.surname.toUpperCase()}`, value: cls.userID}))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Name'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedID}
          onChange={(item) => setSelectedID(item.value)}
       
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

<View style={{height:1,width:'100%', borderBottomWidth:0.5,borderColor:'grey'}}></View>

{/* List of students section */}
<ScrollView style={{marginTop: 0, marginBottom: 0, backgroundColor:'#FFFFFF'}} contentContainerStyle={{paddingBottom:40}}>

{filteredClassStudents.map((data, index) => {
  return (
    <Section
    key={index}
    id={data.id}
          title={`${data.name} ${data.surname}` }
          subTitle= {data.userID}
          
        >
          <InfoRow label="Class" value={data.classID} />
          <InfoRow label="Bus Route" value={data.dormitoryID || 'N/A'} />
          <InfoRow label="Gender" value={data.gender} />
       
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
      backgroundColor: 'white',
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