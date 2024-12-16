import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";


const screenWidth = Dimensions.get("window").width;


const data = [
    [
      { title: "All Staff", icon: require("../../assets/images/images/staffs.png"),linking:'./Teachers/allStaff' },
      { title: "Add Staff", icon: require("../../assets/images/images/upgrade.png"), linking:'/home' },
      { title: "Deductions", icon: require("../../assets/images/images/deduction1.png"), linking:'/home' },
      { title: "Payment", icon: require("../../assets/images/images/pay.png"), linking:'/home' },
      { title: "Payroll", icon: require("../../assets/images/images/payrol.png"), linking:'/home' },
      
    ],
 
];

const TeacherCard = () => {
    const router = useRouter()

   
    const handlePress = (link) => {
      router.navigate(link)
    }
  
    const renderItem = ({ item , index}) => (
      <TouchableOpacity style={[index >= 3 ? styles.card1 : styles.card]} onPress={() => {handlePress(item.linking)}}>
        <View style={{width:'80%', height:'85%'}}>

        <Image source={item.icon} style={[index === 0 ? styles.icon1 : styles.icon && index === 2 ? styles.icon2 : styles.icon && index === 4 ? styles.icon3 : styles.icon]} />
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
              numColumns={3}
              style={styles.slide}
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
    left:30,
    top:30
    },
    slide: {
      width: screenWidth,
    },
    card: {
      width: screenWidth / 4.15,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:100
    },
    card1: {
      width: screenWidth / 4.15,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:100,
      position:'relative',
      left:50
    },
    icon: {
      width: 55,
      height: 55,
      marginTop: -8,
      alignSelf:'center'
    },
    icon1: {
      width: 50,
      height: 50,
      marginTop: -5,
      alignSelf:'center'
    },
    icon2: {
      width: 55,
      height: 55,
      marginTop: -2,
      alignSelf:'center'
    },
    icon3: {
      width: 52,
      height: 55,
      marginTop: -2,
      alignSelf:'center'
    },
    text: {
      textAlign: "center",
      fontSize: 12,
      color: "#333",
      fontWeight:'500',
      marginTop:-5
    },
    
  });
  

export default TeacherCard;
