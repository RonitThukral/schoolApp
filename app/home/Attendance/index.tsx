import React from 'react';
import { View,ScrollView,StyleSheet, Image } from 'react-native'
import 'react-native-reanimated';
import { useRouter } from 'expo-router';
import AttendanceCard from '../../components/attendanceCard';
import AttendanceStats from '../../components/attendanceStats';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



export default function index(): any {

const router = useRouter();

  const date = new Date().toISOString().slice(0, 10)
 
  
  

 

  return (
    <>
    <ScrollView style={styles.container1}>

      <View style ={styles.bgimg}>
        <Image style={{height:responsiveWidth(60)}} source={require('../../../assets/images/images/Vector.png')}/>
      </View>

      {/* Financial Statistics section */}
<View style={{position:'relative', top:responsiveHeight(15)}}>

     <AttendanceStats />
</View>



          {/* main card grid section */}
<View style= {{position: 'relative', top: responsiveHeight(14)}}>

      <AttendanceCard /> 

</View>
      
      </ScrollView>
    
    </>

  );
}

export const styles = StyleSheet.create({
  container : {
    zIndex: 300,
     maxWidth : 350,
     maxHeight : 220,
     boxShadow: '20px',
     shadowColor: 'black',
     flex: 1,
     flexDirection: 'column',
     backgroundColor: 'white',
    //  backgroundColor: 'red',
     position: 'relative',
     top: '15%',
     alignSelf: 'center' ,
     borderRadius: '10%',
     borderColor: 'black',
     elevation: 1.5,
     shadowOffset: {
       width: 1,
       height: 1
     },
     shadowOpacity: 10,
     
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
     zIndex:3000
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
        // backgroundColor:'#daedff'
        
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