import React from 'react';
import { View, Text,ScrollView,StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import TeacherCard from '../../components/teacherCard';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { FontAwesome5 } from '@expo/vector-icons';


export default function Home(): any {

const router = useRouter();

const formattedDate = new Date().toISOString().slice(0, 10)

const date = formattedDate.split('-').reverse().join('-');

  const Item = [
    
    {
      name: "Total",
      icon: <FontAwesome5 name="user-friends" size={22} color="#8EC7FF" />,
      content: 364
    },
    {
      name: "Male",
      icon: <FontAwesome name="male" size={24} color="#8EC7FF" />,
      content: 70
    },
    {
      name: "Female",
      icon: <FontAwesome name="female" size={24} color="#8EC7FF" />,
      content: 50
    },
    {
      name: "Yesterday",
      icon: <Ionicons name="return-up-back-outline" size={24} color="#8EC7FF" />,
      content: 36
    },
    {
      name: "Today",
      icon: <Feather name="calendar" size={24} color="#8EC7FF" />,
      content: 27
    },
    {
      name: "Tomorrow",
      icon: <Ionicons name="return-up-forward" size={24} color="#8EC7FF" />,
      content: 20
    }
  ]
  
  

 

  return (
    
    <ScrollView style={styles.container1}>

      <View style ={styles.bgimg}>
        <Image style={{height:responsiveWidth(60)}} source={require('../../../assets/images/images/Vector.png')}/>
      </View>

      {/* Statistics section */}
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
          <Text style={styles.heading}>Teachers Statistics</Text>
          <Text style={{ fontSize: 13, position: 'relative', width: 'auto', marginTop: 25 }}>{`${date}`}</Text>
        </View>
        <View style={styles.innercontainer}>
          {Item.map((item, index) : any=> {
            return(
              <React.Fragment key={index}>
              {index === 3 && ( <Text style={styles.birthdays}> Birthdays </Text>)}
            <TouchableOpacity style = {[styles.Card]} >
            
            <Text style={styles.cardHeading}>{item.name}</Text>
            <View style={styles.cardContent}>
              {item.icon}
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 5 }}>{item.content}</Text>
            </View>
          
          </TouchableOpacity>
          </React.Fragment>
            )
          })}
        
        </View>
      </View>



          {/* main card grid section */}
<View style= {{position: 'relative', top:responsiveHeight(12)}}>

      <TeacherCard /> 

</View>
      
      </ScrollView>
    
    

  );
}

export const styles = StyleSheet.create({
  container : {
    zIndex: 300,
     maxWidth : responsiveWidth(92),
     maxHeight : 220,
     flex: 1,
     flexDirection: 'column',
     backgroundColor: 'white',
    //  backgroundColor: 'red',
     position: 'relative',
     top: responsiveHeight(14),
     alignSelf: 'center' ,
     borderRadius: '10%',
     borderColor: 'black',
     elevation: 1.5,
   
     ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
      },
      
    }),
     
  },
  heading:{
     fontSize: 15,
     fontWeight: 'bold',
     textAlign: 'left',
     paddingLeft: '5%',
     paddingTop: '2%',
     marginTop: '5%' ,
  },
  innercontainer: {
     maxWidth: '90%',
     maxHeight : '90%',
     flex: 3,
     flexDirection: 'row',
     flexWrap: 'wrap',
     gap: 12,
     justifyContent: 'flex-start',
     marginBottom: '8%',
     top:12,
    //  backgroundColor: 'red',
     marginLeft: 10,
    //  marginBottom: 5,
    // paddingVertical:10,
     zIndex:3000,
     paddingHorizontal:15
  },
 
  Card: {
     width: '30%',
     height: '40%',
     position: 'relative',
     borderRadius: '10%',
     backgroundColor: '#EEF7FF',
     flexDirection: 'column',
     marginBottom:15
    //  aspectRatio: 1
     
  },
  cardHeading: {
     fontSize: 13,
     padding: 5,
     
  },
  cardContent: {
     flex:2,
     flexDirection: 'row',
     alignItems: 'center',
     fontSize: 6,
     justifyContent: 'center',
     gap: 10,
     bottom: 5
    },
    container1: {
      flex: 1,
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: 'rgba(255, 255, 255, 0)',
      zIndex: 300,

    },
    userInfo: {
        alignItems: 'center',
        opacity: 1,
        zIndex:500,
        marginRight: 10

    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
        opacity: 1,
        zIndex:500
    },
    userRole: {
      fontSize: 12,
      color: '#7e7e7e',
      lineHeight:14,
      opacity: 1,
      zIndex:500

    },
    headerIcons: {
      width:100,
      flexDirection: 'row',
      justifyContent:'space-evenly',
      opacity: 1,
      zIndex:500,
      top:8
    //   backgroundColor:'red'
    },
    headerIconSpacing: {
      marginLeft: 15,
      opacity: 1,
      zIndex:500,
      

    },
    noticesSection: {
      position: 'relative',
      padding: 15,
      backgroundColor: '#ffffff',
    //   backgroundColor: 'green',
      elevation: 5,
      borderRadius: 10,
      width: '90%',
      alignSelf: 'center',
      top: '5%'
    },
    noticeText: {
      color: '#7e7e7e',
    },
    dashboardSection: {
      marginTop: 180,
      marginBottom: 20,
      backgroundColor: '#ffffff',
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
    },
    bgimg: {
        zIndex:10,
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        
        ...Platform.select({
          ios: {
            width:responsiveWidth(10),
            transform: [{ scale: 1.02 }],
          },
          
        }),
        

    },
    avatar: 
    {
     width:35,
     height: 35, 
     borderRadius: 100, 
     backgroundColor: 'lightgreen'
    },
    birthdays:{
      position:'absolute',
      top:60,
      marginVertical:0
    },
    
 }
)