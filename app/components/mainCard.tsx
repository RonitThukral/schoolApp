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
      { title: "Payrow", icon: require("../../assets/images/images/invest.png"), linking:'./home/Finance/setPayrow' },
      { title: "Time Table", icon: require("../../assets/images/images/calendar.png"), linking:'./home/Timetable' },    
      { title: "SMS", icon: require("../../assets/images/images/jj.png"), linking:'/home/smsReminder' },
      { title: "Reports", icon: require("../../assets/images/images/dashboards.png"),linking:'./home/Reports' },
      
    ],
    [
      { title: "Messages", icon: require("../../assets/images/images/cours.png") , linking:'./home/Message' },
      { title: "Inventory", icon: require("../../assets/images/images/invo.png"),linking:'/home/Inventory' },
      { title: "Liberary", icon: require("../../assets/images/images/libe.png") , linking:'./home/Liberary' },
      { title: "Attendance", icon: require("../../assets/images/images/atten.png"), linking:'./home/Attendance' },
      { title: "Notices", icon: require("../../assets/images/images/sent.png") , linking:'./home/Notices' },
      { title: "Courses", icon: require("../../assets/images/images/coursess.png"), linking:'./home/allCourses' },
      { title: "Certificates", icon: require("../../assets/images/images/guarantee.png") , linking:'./home/Certificates' },
      { title: "Buses", icon: require("../../assets/images/images/vanes.png"),linking:'./home/students/Transport' },
    { title: "Settings", icon: require("../../assets/images/images/setting.png") , linking:'./home/Settings' },
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

        <Image
  source={item.icon}
  style={[
    styles.icon,
    item.title === 'Teachers' && styles.icon1 ,
    item.title === 'Classes' && styles.icon3 ,
    item.title === 'Finance' && styles.icon4,
    item.title === 'SMS' && styles.icon7 ,
    item.title === 'Time Table' && styles.icon6 ,
    item.title === 'Liberary' && styles.icon11 ,
    item.title === 'Buses' && styles.icon16 ,
    item.title === 'Settings' && styles.icon17, 
    item.title === 'Messages' && styles.icon9 ,
    item.title === 'Notices' && styles.icon13 ,
    item.title === 'Courses' && styles.icon14,
    
    // styles.icon,
  ]}
/>

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
      alignSelf:'center',
      position:'relative',
      left:'6%'
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
    icon7: {
      width:50 ,
      height: 60,
      marginBottom: 15,
      alignSelf:'center',
      marginRight:10
    },
    icon6: {
      width:55 ,
      height: 55,
      marginTop: 5,
      alignSelf:'center',
      // marginRight:10
    },
    icon9: {
      width:40 ,
      height: 55,
      marginTop: 5,
      alignSelf:'center',
      // marginRight:10
    },
    icon13: {
      width:60 ,
      height: 60,
      marginTop: 5,
      alignSelf:'center',
      marginRight:15
    },
    icon16: {
      width:55 ,
      height: 55,
      marginTop: 5,
      alignSelf:'center',
      // marginRight:10
    },
    icon17: {
      width:55 ,
      height: 55,
      marginTop: 5,
      alignSelf:'center',
      // marginRight:10
    },
    icon14: {
      width:65 ,
      height: 60,
      marginTop: 5,
      alignSelf:'center',
      // marginRight:10
    },
    icon11: {
      width:50 ,
      height: 50,
      marginTop: 5,
      alignSelf:'center',
      // marginRight:10
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
      fontSize: 12,
      color: "#333",
      fontWeight:'500',
      marginBottom:10
    },
    pagination: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position:'relative',
      right:"5%",
      top:"6%"
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
