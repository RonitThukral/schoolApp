import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";


const screenWidth = Dimensions.get("window").width;


const data = [
    [
      { title: "Set Fees", icon: require("../../assets/images/images/feeesss.png"),linking:'./Finance/setFees' },
      { title: "Set Payrow", icon: require("../../assets/images/images/calendars.png"), linking:'./Finance/setPayrow' },
      { title: "Student Fees", icon: require("../../assets/images/images/charge.png"), linking:'./Finance/studentFees' },
      { title: "Fee Payment", icon: require("../../assets/images/images/transaction-history1.png"), linking:'./Finance/feePayment' },
      { title: "Record Fee Payment", icon: require("../../assets/images/images/data-processing.png"), linking:'./Finance/recordFeePayment' },
      { title: "Bill Reminder", icon: require("../../assets/images/images/time.png"), linking:'./smsReminder' },
      { title: "Transactions", icon: require("../../assets/images/images/transaction-history.png"),linking:'./Finance/Transactions' },
      { title: "Banking", icon: require("../../assets/images/images/banking-system.png"),linking:'./Finance/Banking' },
    ],
 
];

const FinanceCard = () => {
    const router = useRouter()

   
    const handlePress = (link) => {
      router.navigate(link)
    }
  
    const renderItem = ({ item,index }) => (
      <TouchableOpacity style={[index <= 5 ? styles.card : styles.card1]} onPress={() => {handlePress(item.linking)}}>
        <View style={{width:'80%', height:'85%'}}>

        <Image source={item.icon} style={[index === 1 ? styles.icon1 : styles.icon , index === 0 ? styles.icon2:styles.icon]} />
        </View>

        <View style={{width:'120%', }}>

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
    backgroundColor:'white',
    height:500
    },
    slide: {
      width: screenWidth,
    },
    card: {
      width: screenWidth / 4.2,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:100
    },
    card1: {
      width: screenWidth / 4.2,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:100,
      position:'relative',
      left:'15%',
      top:5
    },
    
    icon: {
      width: 53,
      height: 53,
      marginTop: -8,
      alignSelf:'center'

    },
    icon1: {
      width: 45,
      height: 45,
      marginTop: 0,
      alignSelf:'center'

    },
    icon2: {
      width: 55,
      height: 55,
      marginTop: -5,
      alignSelf:'center'

    },
    text: {
      textAlign: "center",
      fontSize: 11,
      color: "#333",
      fontWeight:'500',
      marginTop:-5
    },
    
  });
  

export default FinanceCard;
