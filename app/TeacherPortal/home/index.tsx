import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform } from 'react-native'
import 'react-native-reanimated';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Foundation from '@expo/vector-icons/Foundation';
import Fontisto from '@expo/vector-icons/Fontisto';
import Feather from '@expo/vector-icons/Feather';
import MainCard from '../components/maincard';
import Dashboard from '../components/calender';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { parse } from '@babel/core';
import HeaderLarge from '@/app/components/Header';



export default function Home(): any {
  const { teacher } = useLocalSearchParams()

  const parsedTeacher = teacher ? JSON.parse(teacher) : null;
  // console.log(parsedTeacher)
  // console.log(teacher)


  // console.log(parsedStudent, " studejntfddl")
  const date = new Date().toISOString().slice(0, 10)
  const Item = [

    {
      name: "Students",
      icon: <Image source={require('../../../assets/images/images/cap.png')} />,
      content: 364
    },
    {
      name: "Teachers",
      icon: <Image source={require('../../../assets/images/images/teachersss.png')} />,
      content: 70
    },
    {
      name: "Messages",
      icon: <Image source={require('../../../assets/images/images/message.png')} />,
      content: 50
    },
    {
      name: "Classes",
      icon: <Image source={require('../../../assets/images/images/classes.png')} />,
      content: 36
    },
    {
      name: "Courses",
      icon: <Image source={require('../../../assets/images/images/courses.png')} />,
      content: 27
    },
    {
      name: "Buses",
      icon: <Image source={require('../../../assets/images/images/bus.png')} />,
      content: 20
    }
  ]

  const router = useRouter()


  const handlePress = () => {
    router.push({
      pathname: '../home/Chat',
      params: { name: parsedTeacher.name, role: parsedTeacher.role }
    })
  }

  const handlePressNotification = () => {
    router.push("./home/notice");
  }


  return (
    <>

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={styles.container1}>
          {/* Header Section */}
          <HeaderLarge handlePressChat={handlePress} handlePressNotification={handlePressNotification} />

          <View style={styles.bgimg}>
            <Image source={require('../../../assets/images/images/Vector.png')} />
          </View>

          {/* Statistics section */}
          <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
              <Text style={styles.heading}>Statistics</Text>
              <Text style={{ fontSize: 13, position: 'relative', width: 'auto', marginTop: 25 }}>{`${date}`}</Text>
            </View>
            <View style={styles.innercontainer}>
              {Item.map((item, index): any => {
                return (
                  <TouchableOpacity style={styles.Card} key={index}>

                    <Text style={styles.cardHeading}>{item.name}</Text>
                    <View style={styles.cardContent}>
                      {item.icon}
                      <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>{item.content}</Text>
                    </View>

                  </TouchableOpacity>
                )
              })}

            </View>
          </View>

          {/* notice section */}
          <View style={styles.noticesSection}>
            <Text style={styles.noticeText}>These are the notices that are added by admin {`${'>'}`}</Text>
          </View>

          {/* main card grid section */}
          <View style={{ position: 'relative', top: '5%' }}>

            <MainCard teacher={parsedTeacher} />

          </View>

          <View style={styles.dashboardSection}>
            <Dashboard />
          </View>
        </ScrollView>

      </SafeAreaView>
    </>

  );
}

export const styles = StyleSheet.create({
  container: {
    zIndex: 300,
    maxWidth: responsiveWidth(85),
    maxHeight: 220,
    //  boxShadow: '20px',
    //  shadowColor: 'black',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    //  backgroundColor: 'red',
    position: 'relative',
    top: '3%',
    alignSelf: 'center',
    borderRadius: '10%',
    borderColor: 'black',
    elevation: 1.5,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
      },

    }),

    //  shadowOpacity: 10,

  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: '5%',
    paddingTop: '2%',
    marginTop: '5%',
  },
  innercontainer: {
    maxWidth: '90%',
    maxHeight: '90%',
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
    marginBottom: '5%',
    top: 12,
    //  backgroundColor: 'red',
    marginLeft: 25,
    marginRight: 18,
    zIndex: 3000

  },

  Card: {
    width: '30%',
    height: '40%',
    position: 'relative',
    borderRadius: '10%',
    backgroundColor: '#EEF7FF',
    flexDirection: 'column',
    //  aspectRatio: 1

  },
  cardHeading: {
    fontSize: 13,
    padding: 5,

  },
  cardContent: {
    flex: 2,
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
    paddingBottom: 24
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 300,
    position: 'relative',
    top: 25


  },
  userInfo: {
    alignItems: 'center',
    opacity: 1,
    zIndex: 500,
    marginRight: 10,
    position: 'relative',
    bottom: 1

  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 1,
    zIndex: 500
  },
  userRole: {
    fontSize: 12,
    color: '#7e7e7e',
    lineHeight: 11,
    opacity: 1,
    zIndex: 500

  },
  headerIcons: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    opacity: 1,
    zIndex: 500,
    top: 0
    //   backgroundColor:'red'
  },
  headerIconSpacing: {
    marginLeft: 10,
    opacity: 1,
    zIndex: 500,

  },
  noticesSection: {
    position: 'relative',
    padding: 15,
    backgroundColor: '#ffffff',
    //backgroundColor: 'green',
    elevation: 5,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    top: '4%',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },

    }),
  },
  noticeText: {
    fontSize: 12,
    color: '#7e7e7e',

    ...Platform.select({
      ios: {
        fontSize: 12
      },

    }),
  },
  dashboardSection: {
    marginTop: '30%',
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
    zIndex: 10,
    width: 'auto',
    height: 'auto',
    position: 'absolute',

    ...Platform.select({
      ios: {
        width: responsiveWidth(10),
        // left:5,
        transform: [{ scale: 1.02 }],
      },

    }),
  },
  avatar:
  {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: 'lightgreen',
    position: 'relative',
    bottom: 2
  }
}
)


