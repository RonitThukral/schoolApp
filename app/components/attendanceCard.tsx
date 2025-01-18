import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";


const screenWidth = Dimensions.get("window").width;


const data = [
    [
      { title: "Record Students", icon: require("../../assets/images/images/graduate.png"), linking:'./Attendance/recordStudents' },
      { title: "Record Staff", icon: require("../../assets/images/images/team.png"), linking:'./Attendance/recordStaff' },
      { title: "Student History", icon: require("../../assets/images/images/historyStu.png"),linking:'./Attendance/studentHistory' },
      { title: "Staff History", icon: require("../../assets/images/images/education.png"), linking:'./Attendance/staffHistory' },
      
    ],
 
];

const AttendanceCard = () => {
    const router = useRouter()

   
    const handlePress = (link) => {
      router.navigate(link)
    }
  
    const renderItem = ({ item }) => (
      <TouchableOpacity style={styles.card} onPress={() => {handlePress(item.linking)}}>
        <View style={{width:'80%', height:'85%'}}>

        <Image source={item.icon} style={styles.icon} />
        </View>

        <View style={{width:'110%', }}>

        <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  
    return (
        <>
      <View style={styles.container}>
        <View>
          {data.map((group, index) => (
            <FlatList
              key={index}
              data={group}
              renderItem={renderItem}
              keyExtractor={(item, idx) => idx.toString()}
              numColumns={2}
              // style={styles.slide}
            />
          ))}
        </View>
       
      </View>

      </>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    //   alignSelf:'center'
    position:'relative',
    left:2,
    top:30,
    backgroundColor:'white',
    ...Platform.select({
      ios: {
       height:1000
      },
      
    }),
    },
    slide: {
      width: screenWidth,
    },
    card: {
      width: screenWidth / 3,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:110
    },
    icon: {
      width: 55,
      height: 60,
      marginTop: -8,
      alignSelf:'center'
    },
    text: {
      textAlign: "center",
      fontSize: 12,
      color: "#333",
      fontWeight:'500',
      marginVertical:-5
    },
    
  });
  

export default AttendanceCard;
