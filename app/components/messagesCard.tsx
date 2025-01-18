import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";


const screenWidth = Dimensions.get("window").width;


const data = [
    [
      { title: "Message Students", icon: require("../../assets/images/images/boys.png"),linking:'./Message/messageStudent' },
      { title: "Message Staff", icon: require("../../assets/images/images/staff.png"), linking:'./Message/messageStaff' },
      { title: "Message Guardian", icon: require("../../assets/images/images/guardian.png"), linking:'./Message/messageGuardian' },
      { title: "Bulk Message", icon: require("../../assets/images/images/bulk.png"), linking:'./Message/messageBulk' },
      { title: "Bill Reminder", icon: require("../../assets/images/images/bill.png"), linking:'./smsReminder' },
      
    ],
 
];

const MessageCard = () => {
    const router = useRouter()

   
    const handlePress = (link) => {
      router.navigate(link)
    }
  
    const renderItem = ({ item,index }) => (
      <TouchableOpacity style={[index >= 3 ? styles.card1 : styles.card]} onPress={() => {handlePress(item.linking)}}>
        <View style={{width:'80%', height:'85%'}}>

        <Image source={item.icon} style={[index === 1 ? styles.icon1 : styles.icon]} />
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
    top:30,
    

    },
    slide: {
      width: screenWidth,
    },
    card: {
      width: screenWidth / 4.1,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:110
    },
    card1: {
      width: screenWidth / 3.3,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:110,
      position:'relative',
      left:35    
    },
    icon: {
      width: 55,
      height: 60,
      marginTop: -8,
      alignSelf:'center'
    },
    icon1: {
      width: 63,
      height: 63,
      marginTop: -8,
      alignSelf:'center'
    },
    text: {
      textAlign: "center",
      fontSize: 12,
      color: "#333",
      fontWeight:'500',
      marginVertical:-10
    },
    
  });
  

export default MessageCard;
