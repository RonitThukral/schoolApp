// import React from "react";
// import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity,ScrollView } from "react-native";
// import { useState } from "react";
// import { useRouter } from "expo-router";


// const screenWidth = Dimensions.get("window").width;


// const data = [
//     // [
//       { title: "Classes", icon: require("../../assets/images/images/virtual-class.png"),linking:'./allClasses' },
//       { title: "Courses", icon: require("../../assets/images/images/online-course.png"), linking:'./allCourses' },
//       { title: "Class Groups", icon: require("../../assets/images/images/class-group.png"), linking:'./Academics/classGroups' },
//       { title: "Year Groups", icon: require("../../assets/images/images/target.png"), linking:'./Academics/yearGroups' },
//       { title: "Divisions", icon: require("../../assets/images/images/hierarchical.png"), linking:'./Academics/Divisions' },
//       { title: "Calender", icon: require("../../assets/images/images/calender.png"), linking:'./Academics/Calender' },
//       { title: "Make Report", icon: require("../../assets/images/images/make-report.png"),linking:'./Academics/makeReport' },
//       { title: "Report Card", icon: require("../../assets/images/images/report-card.png"),linking:'./Academics/progressReport' },
//       { title: "Combined Report", icon: require("../../assets/images/images/combined.png"), linking:'./Academics/combinedReport' },
//     // ],
  
// ];

// const AcademicsCard = () => {
//     // const [currentPage, setCurrentPage] = useState(0);
//     const router = useRouter()


//     const handlePress = (link) => {
//       router.navigate(link)
//     }
  
//     const renderItem = ({ item,index }) => (

//       <TouchableOpacity style={styles.card} onPress={() => {handlePress(item.linking)}} accessible >
//         <View style={{width:'80%', height:'85%'}}>

//         <Image source={item.icon} style={[index === 0 ? styles.icon1 : styles.icon&& index === 4 ? styles.icon2 : styles.icon && index===3 ? styles.icon3 : styles.icon && index===8 ? styles.icon4 : styles.icon]} />
//         </View>

//         <View style={{width:'115%', }}>

//         <Text style={[index === 8 ? styles.text1 : styles.text]}>{item.title}</Text>
//         </View>
//       </TouchableOpacity>
//     );
  
//     return (
//         <>
//       <View style={styles.container}>
//         <View>
//             <FlatList
//               data={data}
//               renderItem={renderItem}
//               keyExtractor={(item, idx) => idx.toString()}
//               numColumns={3}
//               style={styles.slide}
//             />
         
//         </View>
        
//       </View>

//       </>
//     );
//   };
  
//   const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: "center",
//       justifyContent: "center",
//     //   alignSelf:'center'
//     position:'relative',
//     left:0,
//     // backgroundColor:'white'
//     backgroundColor:'red'
//     },
//     slide: {
//       width: '100%',
//     },
//     card: {
//       width: screenWidth / 4.1,
//       alignItems: "center",
//       padding: 16,
//       // backgroundColor: "#F2F9FF",
//       backgroundColor: "yellow",
//       borderRadius: 20,
//       margin: 8,
//       height:100,
//       // zIndex:9999999

//     },
//     icon: {
//       width: 60,
//       height: 60,
//       marginBottom: 10,
//       marginTop:-10,
//       alignSelf:'center',
//       // zIndex:0
     
//     },
//     icon1: {
//       width: 50,
//       height: 50,
//       marginBottom: 10,
//       marginTop:-3,
//       alignSelf:'center',
//       // zIndex:0

//     },
//     icon2: {
//       width: 53,
//       height: 53,
//       marginBottom: 10,
//       marginTop:-5,
//       alignSelf:'center',
//       // zIndex:0

//     },
//     icon3: {
//       width: 70,
//       height: 70,
//       marginBottom: 10,
//       marginTop:-13,
//       alignSelf:'center',
//       // zIndex:0

//     },
//     icon4: {
//       width: 53,
//       height: 53,
//       marginBottom: 10,
//       marginTop:-5,
//       alignSelf:'center',
//       // zIndex:0

//     },
//     text: {
//       textAlign: "center",
//       fontSize: 11,
//       color: "#333",
//       fontWeight:'500',
//       marginTop:-2,
//       // zIndex:0

//     },
//     text1: {
//       textAlign: "center",
//       fontSize: 11,
//       color: "#333",
//       fontWeight:'500',
//       marginTop:-8,
//       // zIndex:0

//     },
   
    
    
//   });
  

// export default AcademicsCard;



import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity,Button, Platform } from "react-native";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const data = [
  [
    { title: "Classes", icon: require("../../assets/images/images/virtual-class.png"), linking: './allClasses' },
    { title: "Courses", icon: require("../../assets/images/images/online-course.png"), linking: './allCourses' },
    { title: "Class Groups", icon: require("../../assets/images/images/class-group.png"), linking: './Academics/classGroups' },
    { title: "Year Groups", icon: require("../../assets/images/images/target.png"), linking: './Academics/yearGroups' },
    { title: "Divisions", icon: require("../../assets/images/images/hierarchical.png"), linking: './Academics/Divisions' },
    { title: "Calender", icon: require("../../assets/images/images/calender.png"), linking: './Academics/Calender' },
    { title: "Make Report", icon: require("../../assets/images/images/make-report.png"), linking: './Academics/makeReport' },
    { title: "Report Card", icon: require("../../assets/images/images/report-card.png"), linking: './Academics/progressReport' },
    { title: "Combined Report", icon: require("../../assets/images/images/combined.png"), linking: './Academics/combinedReport' },
  ],
];

const AcademicsCard = () => {
  const router = useRouter();

  const handlePress = (link) => {
    router.navigate(link);
  };

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[styles.card, { borderWidth: 0,  }]}
      onPress={() => handlePress(item.linking)}
      activeOpacity={0.8} // Adjust touch feedback
      // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}

    >
      <View style={{ width: '80%', height: '85%' }} pointerEvents="none">
        <Image
          source={item.icon}
          style={[
            index === 0
              ? styles.icon1
              : index === 4
              ? styles.icon2
              : index === 3
              ? styles.icon3
              : index === 8
              ? styles.icon4
              : styles.icon,
          ]}
        />
      </View>
      <View style={{ width: '115%' }}>
        <Text style={[index === 8 ? styles.text1 : styles.text]}>{item.title}</Text>
      
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data[0]}
        renderItem={renderItem}
        keyExtractor={(item, idx) => idx.toString()}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    zIndex:0,

    ...Platform.select({
      ios:{
        height: 1000

      }
    })
  },
  flatListContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: screenWidth / 4.1,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#eef7ff",
    borderRadius: 20,
    margin: 8,
    height: 100,
    zIndex: 999999, // Add explicit zIndex

  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    marginTop: -10,
    alignSelf: "center",
  },
  icon1: {
    width: 50,
    height: 50,
    marginBottom: 10,
    marginTop: -3,
    alignSelf: "center",
  },
  icon2: {
    width: 53,
    height: 53,
    marginBottom: 10,
    marginTop: -5,
    alignSelf: "center",
  },
  icon3: {
    width: 70,
    height: 70,
    marginBottom: 10,
    marginTop: -13,
    alignSelf: "center",
  },
  icon4: {
    width: 53,
    height: 53,
    marginBottom: 10,
    marginTop: -5,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 11,
    color: "#333",
    fontWeight: "500",
    marginTop: -2,
  },
  text1: {
    textAlign: "center",
    fontSize: 11,
    color: "#333",
    fontWeight: "500",
    marginTop: -8,
  },
});

export default AcademicsCard;
