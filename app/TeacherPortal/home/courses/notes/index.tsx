import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView, SafeAreaView, Platform, TextInput, Modal} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import axios from 'axios';
import { parse } from '@babel/core';
import Attendance from '@/app/home/Reports/attendance';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BlurView } from 'expo-blur';


  const studentData =[
    
      {
        "id": "1",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "2",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "3",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "4",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "5",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "6",
        name: "Jane Smith",
        "class": "9B"
      },
      {
        "id": "7",
        name: "Michael Brown",
        "class": "11C"
      },
      {
        "id": "8",
        name: "Emily Davis",
        "class": "10A"
      },
      {
        "id": "8",
        name: "Daniel Johnson",
        "class": "8A"
      },
      {
        "id": "9",
        name: "Sophia Wilson",
        "class": "12B"
      },
      {
        "id": "10",
        name: "Matthew Miller",
        "class": "9C"
      },
      {
        "id": "11",
        name: "Olivia Martin",
        "class": "11A"
      },
      {
        "id": "12",
        name: "James Taylor",
        "class": "8B"
      },
      {
        "id": "13",
        name: "Charlotte Anderson",
        "class": "10C"
      }
  ]

  const listData = [
    {
        id: "73739739753",
      name: "Roses N Lilies",
      title:'Pre-Nursery',
      classTeacher: "Daksh Singh",
      group: "nur",
      division: "Group 4",
      prefect: "Richa Sharma",
      sbaStaff: "N/A"
    },
    {
        id: "7373973975",
      name: "Roses N Lilies",
      title:'Nursery',
      classTeacher: "Daksh Singh",
      group: "nur",
      division: "Group 4",
      prefect: "Richa Sharma",
      sbaStaff: "N/A"
    },
    
      {
        id: "737397397",
        name: "Roses N Lilies",
        title:'L.K.G',
        classTeacher: "Anita Kumar",
        group: "LKG A",
        division: "Group 1",
        prefect: "Ajay Mehta",
        sbaStaff: "N/A"
      },
      {
        id: "7373939753",
        name: "Roses N Lilies",
        title:'L.K.G',
        classTeacher: "Anita Kumar",
        group: "LKG B",
        division: "Group 2",
        prefect: "Sita Rao",
        sbaStaff: "N/A"
      },
    {
        id: "7379739753",
      name: "Roses N Lilies",
      title:'U.K.G',
      classTeacher: "Ravi Patel",
      group: "UKG A",
      division: "Group 1",
      prefect: "Vikram Singh",
      sbaStaff: "N/A"
    },
    {
        id: "7339739753",
      name: "Roses N Lilies",
      title:'U.K.G',
      classTeacher: "Priya Singh",
      group: "1A",
      division: "Group 1",
      prefect: "Neha Desai",
      sbaStaff: "N/A"
    },
     {
        id: "7739739753",
      name: "Roses N Lilies",
      title:'Pre-Nursery',
      classTeacher: "Mohit Sharma",
      group: "2A",
      division: "Group 2",
      prefect: "Karan Gupta",
      sbaStaff: "N/A"
    
  }]


//   const data = [
//     { label: 'Item 1', value: '1' },
//     { label: 'Item 2', value: '2' },
//     { label: 'Item 3', value: '3' },
//     { label: 'Item 4', value: '4' },
//     { label: 'Item 5', value: '5' },
//     { label: 'Item 6', value: '6' },
//     { label: 'Item 7', value: '7' },
//     { label: 'Item 8', value: '8' },
//   ];

  // interface Values {
  //   [key: string]: string | null;
  // }

  const baseUrl = 'https://api.dreameducation.org.in/api'


  const DropdownComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    
   
    const [filteredNotes, setFilteredNotes] = useState([]);

    const router = useRouter()
   
const {classs, course} = useLocalSearchParams();

// const parsedStudent = student ? JSON.parse(student) : null;


// console.log(classId, 'daidhs')


    useEffect(() => {
      const fetchAllData = async () => {
        try {
        
        
    
          // Fetch classes after campuses and teachers are populated
          const res = await axios.get(`${baseUrl}/notes/course/${course}`);
          const notes = res.data.docs
          // console.log(notes,'tgijnjksfnsdkgn')

          const formattedData = notes.map((n) => ({
            notes: n.notes || 'N/A',
            date: n.date || 'N/A',
            topic: n.topic || 'N/A'
          }))
          
          setFilteredNotes(formattedData)
        
    
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchAllData();
    }, []);
    

 

    const handleMakereport = () => {
        router.push({
            pathname: './makeReport',
            params: { classId: classs, course: course },  // Use 'params' here instead of 'query'
          });
    }
    const handleViewReport = () => {
        router.push({
            pathname: './viewReport',
            params: { classId: classs, course: course },  // Use 'params' here instead of 'query'
          });
    }
    const handleNote = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false)
    }

    



    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
       
 
          
<View style={{flexDirection:'row', justifyContent:'flex-end',paddingTop:70,paddingBottom:30}}>
<TouchableOpacity style={styles.note} onPress={handleNote}>
    <Text style={{color:'white',alignSelf:'center',textAlignVertical:'center',textAlign:'center',fontSize:14,paddingVertical:10}}>Add Note</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.attendance} onPress={handleMakereport}>
    <Text style={{color:'white',alignSelf:'center',textAlignVertical:'center',textAlign:'center',fontSize:14,paddingVertical:10}}>Make Report</Text>
</TouchableOpacity>
<TouchableOpacity style={styles.view} onPress={handleViewReport}>
    <Text style={{color:'white',alignSelf:'center',textAlignVertical:'center',textAlign:'center',fontSize:14,paddingVertical:10 , paddingHorizontal:1}}>View Report</Text>
</TouchableOpacity>

</View>


          
      </View>

 <Modal
        animationType="slide"
        transparent={true}
        visible={(isOpen || edit)}
        onRequestClose={() => setIsOpen(false)}
        >
        
        <BlurView intensity={50} tint="dark" style={styles.modalOverlay}>
        



      {(isOpen) && <View style={styles.inputContainer}>
        <Text style={{fontSize:20,position:'relative',alignSelf:'flex-start',paddingHorizontal:25,paddingVertical:15}}>{'Add Notice'}</Text>

    <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={"Add Name"} />

    <TextInput style={styles.inputDesc} placeholderTextColor={'grey'} placeholder={"Add Description"} multiline = {true} textAlignVertical='top' />
  


    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:10}}>

    <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
    <Text style={{color:'#58A8F9',fontSize:16}}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttons} >
    <Text style={{color:'white',fontSize:16, textAlign:'center'}} 
   
    >{'Add'}</Text>
    </TouchableOpacity>
    </View>
    </View>}

    </BlurView>

    </Modal>

<View style={{height:1,width:'100%', borderBottomWidth:0.5,borderColor:'grey'}}></View>

{/* List of students section */}
<ScrollView style={{ marginTop: 0, marginBottom: 0, backgroundColor: '#daedff' }} contentContainerStyle={{ paddingBottom: 40 }}>
{filteredNotes?.map((note, index) => {
  return (
    <View style={styles.list} key={index} >
      <Text style={{position:'relative', fontSize:18, left:30, color:'#58A8F9',marginTop:10,top:'25%'}}>{note.topic}</Text>
      <View style={{flex:1, flexDirection:'row'}}>

      <View style={styles.listContent}>
        <View style={{width:'80%'}}>

          <Text style={{fontSize:13,color:'grey'}}>
            {note.notes}
          </Text>
        </View>
          <Text style={{fontSize:13,color:'grey'}}>{note.date}</Text>
          
      </View>
      <View style={styles.listBtns}>
                
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../../../../assets/images/images/delete.png')}/>

                </TouchableOpacity>
            </View>
      </View>

    </View>

    
  )
})}
    {filteredNotes.length === 0 && <Text style={{ textAlign: 'center', color: 'grey', marginTop: 20 }}>
      No Notes found.
    </Text>}
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
        width: "80%",
        height: 'auto',
        borderColor: 'grey',
        borderRadius: 10,
        // backgroundColor : 'red',
        backgroundColor : '#FFFFFF',
        justifyContent: 'space-between',
        flexDirection:'column',
      //   alignItems:'center',
        alignSelf:'center',
        marginTop: 20,
        elevation:5,
      //   borderWidth: 0.5
      },
     
      listContent:{
        flexDirection:'column',
        position: 'relative',
        left:100,
        bottom:20,
      //   marginTop:,
  
      },
      listBtns:{
        position:'absolute',
        right:responsiveWidth(3),
        bottom:25
      },
    stImg:{
      width:60,
      height:60,
      position:'absolute',
      left: 40,
      backgroundColor:'white',
      borderRadius:100
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
        width:responsiveWidth(25),
        backgroundColor:'red',
        height:responsiveHeight(5),
        borderRadius: 10,
        marginHorizontal:10
      },
      note :{
        width:responsiveWidth(25),
        backgroundColor:'#58a8f9',
        height:responsiveHeight(5),
        borderRadius: 10,
        marginHorizontal:10
      },
      view:{
        width:responsiveWidth(28),
        backgroundColor:'green',
        height:responsiveHeight(5),
        borderRadius: 10,
        marginHorizontal:15
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
      },
      inputDesc:{
        width: '80%',
        height: 100,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 10,
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
      },
      inputContainer:{
        position:'absolute',
        width:'85%',
        height:290,
        backgroundColor:'white',
        // backgroundColor:'red',
        borderRadius:10,
        justifyContent:'center',
        alignSelf:'center',
        top:'30%',
        flexDirection:'column',
        zIndex:900000,
// marginVertical:15
elevation:5
      },
      buttons:{
        width:80,
        height:30,
        backgroundColor: '#58A8F9',
        position:'relative',
        bottom:13,
        right:35,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
          },
    
        closeBtn:{
        position:'relative',
        bottom:15,
        right:responsiveWidth(15),
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',

          },

          modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)", // This sets the dim background overlay
            justifyContent: "center",
            alignItems: "center",
          },

            
    

  });