import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView, SafeAreaView, Platform, TextInput} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import axios from 'axios';
import { parse } from '@babel/core';
import Attendance from '@/app/home/Reports/attendance';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



  // interface Values {
  //   [key: string]: string | null;
  // }

  const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'


  const DropdownComponent = () => {
   
    
   
    const [filteredNotes, setFilteredNotes] = useState([]);

    // const router = useRouter()
   
const {classs, course} = useLocalSearchParams();


    useEffect(() => {
      const fetchAllData = async () => {
        try {
        
        
    
          // Fetch classes after campuses and teachers are populated
          const res = await axios.get(`${baseUrl}/notes/course/${course}`);
          const notes = res.data.docs
        //   console.log(notes,'tgijnjksfnsdkgn')

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
    


    



    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
       
 <Text style={{fontSize:24,textAlign:'center'}}>Student Notes For {course.charAt(0).toUpperCase() + course.slice(1)}</Text>
          
      </View>

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
          <Text style={{fontSize:12,color:'black'}}>{note.date}</Text>
          
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
      paddingTop:80,
      
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

          }
    
    

  });