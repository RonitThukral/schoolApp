import React from 'react';
import { View, Text,ScrollView,StyleSheet, TouchableOpacity, Image, Platform } from 'react-native'
import 'react-native-reanimated';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import AcademicsCard from '../../components/academicsCard';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';



export default function Home(): any {

const router = useRouter();

const formattedDate = new Date().toISOString().slice(0, 10)

  const date = formattedDate.split('-').reverse().join('-');

  const Item = [
    
    {
      name: "Yesterday",
      icon: <Ionicons name="return-up-back-outline" size={24} color="#8EC7FF" />,
      content: 364
    },
    {
      name: "Today",
      icon: <Feather name="calendar" size={24} color="#8EC7FF" />,
      content: 70
    },
    {
      name: "Scholarships",
      icon: <Image source={require('../../../assets/images/images/cap.png')}/>,
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
    <>
    <ScrollView style={styles.container1}>

      <View style ={styles.bgimg}>
        <Image style={{height:responsiveWidth(60)}} source={require('../../../assets/images/images/Vector.png')}/>
      </View>

      {/* Statistics section */}
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
          <Text style={styles.heading}>Academics Statistics</Text>
          <Text style={{ fontSize: 13, position: 'relative', width: 'auto', marginTop: 18 }}>{`${date}`}</Text>
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
<View style= {{position: 'relative', top: responsiveHeight(17),}} pointerEvents="box-none">

      <AcademicsCard /> 

</View>
      
      </ScrollView>
    
    </>

  );
}

export const styles = StyleSheet.create({
  container : {
    zIndex: 300,
     maxWidth : responsiveWidth(90),
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
     
     paddingHorizontal:10,

     ...Platform.select({
      ios: {
        top:responsiveHeight(15),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
      },
      
    }),
    
     
  },
  heading:{
     fontSize: 16,
     fontWeight: '500',
     textAlign: 'left',
     paddingLeft: '5%',
     paddingTop: '5%',
  },
  innercontainer: {
     maxWidth: '90%',
     maxHeight : '90%',
     flex: 3,
     flexDirection: 'row',
     flexWrap: 'wrap',
     gap: 12,
     justifyContent: 'flex-start',
     marginBottom: '5.5%',
     top:4,
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
     borderRadius: 10,
     backgroundColor: '#EEF7FF',
     flexDirection: 'column',
     marginBottom:15
    //  aspectRatio: 1
     
  },
  cardHeading: {
     fontSize: 12,
     padding: 5,
     
  },
  cardContent: {
     flex:2,
     flexDirection: 'row',
     alignItems: 'center',
     fontSize:6,
     justifyContent: 'center',
     gap: 10,
     bottom: 5
    },
    container1: {
      flex: 1,
      backgroundColor: 'white',
      height:responsiveWidth(10)
    },
   
    bgimg: {
        zIndex:10,
        width: 'auto',
        height: 'auto',
        position: 'absolute',
        // backgroundColor:'#daedff'

        ...Platform.select({
          ios: {
            width:responsiveWidth(10),
            transform: [{ scale: 1.02 }],
          },
          
        }),

    },

    birthdays:{
      position:'absolute',
      top:60,
      marginVertical:0,
      fontWeight:'400'
    },
    
 }
)