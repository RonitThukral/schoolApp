import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity,ScrollView, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";


const screenWidth = Dimensions.get("window").width;


const data = [
    [
      { title: "All Students", icon: require("../../assets/images/images/students.png"),linking:'./students/allStudents' },
      { title: "Add Student", icon: require("../../assets/images/images/student.png"), linking:'./students/addStudent/personalInfo' },
      { title: "Section", icon: require("../../assets/images/images/books.png"), linking:'./students/Sections' },
      { title: "Prefects", icon: require("../../assets/images/images/class.png"), linking:'./students/prefects' },
      { title: "Upgrading", icon: require("../../assets/images/images/product-development.png"), linking:'./students/studentPromotion' },
      { title: "Campuses", icon: require("../../assets/images/images/school.png"), linking:'./students/Campuses' },
      { title: "Transport", icon: require("../../assets/images/images/van.png"),linking:'./students/Transport' },
      { title: "Scholarships", icon: require("../../assets/images/images/scholarship.png"),linking:'./students/Scholarships' },
    ],
  
];

const StudentCard = () => {
    // const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter()

    // const handleScroll = (event) => {
    //   const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    //   setCurrentPage(page);
    // };

    const handlePress = (link) => {
      router.navigate(link)
    }
  
    const renderItem = ({ item,index }) => (
      <TouchableOpacity style={[index <= 5 ? styles.card : styles.card1]} onPress={() => {handlePress(item.linking)}}>
        <View style={{width:'80%', height:'85%'}}>

        <Image source={item.icon} style={styles.icon} />
        </View>

        <View style={{width:'115%', }}>

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
    left:'5%',
    // backgroundColor:'red',
    height:400,

    ...Platform.select({
      ios:{
height:1000
      }
    })
    },
    slide: {
      width: screenWidth,
    },
    card: {
      width: screenWidth / 3.9,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:100
    },
    card1: {
      width: screenWidth / 3.9,
      alignItems: "center",
      padding: 16,
      backgroundColor: "#F2F9FF",
      // backgroundColor: "blue",
      borderRadius: 20,
      margin: 8,
      height:100,
      position:'relative',
      left:'15%',
      top:5,
      zIndex:9999999
    },
    icon: {
      width: 52,
      height: 52,
      marginBottom: 10,
      marginTop:-5,
      alignSelf:'center'
    },
    text: {
      textAlign: "center",
      fontSize: 12,
      color: "#333",
      fontWeight:'500',
      // marginTop:0
    },
   
    
    
  });
  

export default StudentCard;
