import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity,ScrollView } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";


const screenWidth = Dimensions.get("window").width;


const data = [
    [
      { title: "Students", icon: require("../../assets/images/images/student1.png"),linking:'./home/students' },
      { title: "Teachers", icon: require("../../assets/images/images/teacher1.png"), linking:'./home/Teachers' },
      { title: "Classes", icon: require("../../assets/images/images/class1.png"), linking:'./home/allClasses' },
      { title: "Attendance", icon: require("../../assets/images/images/attendance1.png"), linking:'./home/Attendance' },
      { title: "Academics", icon: require("../../assets/images/images/liberary.png"), linking:'/home/Academics' },
      { title: "Payrow", icon: require("../../assets/images/images/payrow1.png"), linking:'/home' },
      { title: "Inventory", icon: require("../../assets/images/images/inventory.png"),linking:'/home/Inventory' },
      { title: "Reports", icon: require("../../assets/images/images/report.png"),linking:'./home/Reports' },
      { title: "Time Table", icon: require("../../assets/images/images/timetable.png"), linking:'/home' },
    ],
  [
    { title: "Courses", icon: require("../../assets/images/images/coursess.png"), linking:'./home/allCourses' },
    { title: "SMS", icon: require("../../assets/images/images/sms.png"), linking:'/home/smsReminder' },
    { title: "Finance", icon: require("../../assets/images/images/finance.png"),linking:'/home/Finance' },
    { title: "Messages", icon: require("../../assets/images/images/messagess.png") , linking:'./home/Message' },
    { title: "Buses", icon: require("../../assets/images/images/busses.png"),linking:'/' },
    { title: "Certificates", icon: require("../../assets/images/images/certificate.png") , linking:'/home' },
    { title: "Notices", icon: require("../../assets/images/images/notices.png") , linking:'./home/Notices' },
    { title: "Liberary", icon: require("../../assets/images/images/lib.png") , linking:'/home' },
    { title: "Settings", icon: require("../../assets/images/images/settings.png") , linking:'./home' },
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
      height:110
    },
    icon: {
      width: 55,
      height: 60,
      marginBottom: 8,
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
