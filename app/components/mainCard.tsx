import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity,ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";


const screenWidth = Dimensions.get("window").width;


const data = [
    [
      { title: "Students", icon: require("../../assets/images/images/kid.png"),linking:'./home/students' },
      { title: "Teachers", icon: require("../../assets/images/images/women.png"), linking:'./home/Teachers' },
      { title: "Classes", icon: require("../../assets/images/images/classdesk.png"), linking:'./home/allClasses' },
      { title: "Finance", icon: require("../../assets/images/images/finan.png"),linking:'/home/Finance' },
      { title: "Academics", icon: require("../../assets/images/images/acad.png"), linking:'/home/Academics' },
      { title: "Payrow", icon: require("../../assets/images/images/invest.png"), linking:'/home' },
      { title: "Attendance", icon: require("../../assets/images/images/atten.png"), linking:'./home/Attendance' },
      { title: "Inventory", icon: require("../../assets/images/images/box1.png"),linking:'/home/Inventory' },
      
      { title: "Messages", icon: require("../../assets/images/images/cours.png") , linking:'./home/Message' },
      
    ],
    [
      { title: "Reports", icon: require("../../assets/images/images/rpo.png"),linking:'./home/Reports' },
      { title: "Courses", icon: require("../../assets/images/images/coursess.png"), linking:'./home/allCourses' },
      { title: "SMS", icon: require("../../assets/images/images/jj.png"), linking:'/home/smsReminder' },
      { title: "Liberary", icon: require("../../assets/images/images/libe.png") , linking:'/home' },
      { title: "Time Table", icon: require("../../assets/images/images/calendar.png"), linking:'/home' },
      { title: "Certificates", icon: require("../../assets/images/images/guarantee.png") , linking:'/home' },
      { title: "Notices", icon: require("../../assets/images/images/sent.png") , linking:'./home/Notices' },
      { title: "Buses", icon: require("../../assets/images/images/vanes.png"),linking:'./home/students/Transport' },
    { title: "Settings", icon: require("../../assets/images/images/setting.png") , linking:'./home' },
  ],
];

const Slider = () => {
    const [currentPage, setCurrentPage] = useState(0);
    const router = useRouter()

    const handleScroll = (event) => {
      const page = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
      setCurrentPage(page);
    };

    const handlePress = (link) => {
      router.navigate(link)
    }
  
    const renderItem = ({ item,index }) => (
      <TouchableOpacity style={styles.card} onPress={() => {handlePress(item.linking)}}>
        <View style={{width:'80%', height:'85%'}}>

        <Image source={item.icon} style={[index === 1 ? styles.icon1 : styles.icon,index === 2 ? styles.icon3 : styles.icon , index === 3 ? styles.icon4 : styles.icon]} />
        </View>

        <View style={{width:'110%', }}>

        <Text style={styles.text}>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  
    return (
        <>
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
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
        </ScrollView>
        <View style={styles.pagination}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentPage === index && styles.activeDot,
              ]}
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
      left:30
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
      height:105
    },
    icon: {
      width:48 ,
      height: 58,
      marginBottom: 8,
      alignSelf:'center'

    },
    icon1: {
      width:65 ,
      height: 58,
      marginBottom: 8,
      alignSelf:'center'
    },
    icon3: {
      width: 70,
      height: 60,
      marginBottom: 8,
      alignSelf:'center'
    },
    icon4: {
      width: 63,
      height: 53,
      marginBottom: 8,
      alignSelf:'center'
    },
    
    text: {
      textAlign: "center",
      fontSize: 13,
      color: "#333",
      fontWeight:'500',
      marginBottom:10
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
      position:'absolute',
      left:"42%",
      top:"105%"
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: "#ccc",
      marginHorizontal: 4,
    },
    activeDot: {
      backgroundColor: "grey",
    },
  });
  

export default Slider;
