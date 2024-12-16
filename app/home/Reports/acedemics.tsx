import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';//@ts-ignore
import { PieChart } from "react-native-svg-charts";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Academics() {
  const dataStudents = [
    {
      key: 1,
      value: 10,
      svg: { fill: "#4A90E2" }, // Male (Blue)
    },
    {
      key: 2,
      value: 5,
      svg: { fill: "#F5A623" }, // Female (Orange)
    },
  ];
  const dataStaff = [
    {
      key: 1,
      value: 20,
      svg: { fill: "#4A90E2" }, // Male (Blue)
    },
    {
      key: 2,
      value: 12,
      svg: { fill: "#F5A623" }, // Female (Orange)
    },
  ];

  const totalStaff = dataStaff.reduce((sum, item) => sum + item.value, 0);
  const totalStudents = dataStudents.reduce((sum, item) => sum + item.value, 0);


  return (
    <ScrollView style={styles.container1}>
      
<View style={styles.list}> 
  <Text style={styles.text}>Divisions</Text>
  <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
</View>
<View style={styles.ruler}></View>
    
<View style={styles.list}> 
  <Text style={styles.text}>Classes</Text>
  <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
</View>
<View style={styles.ruler}></View>
    
<View style={styles.list}> 
  <Text style={styles.text}>Courses</Text>
  <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
</View>
<View style={styles.ruler}></View>
    
<View style={styles.list}> 
  <Text style={styles.text}>Class Terminal Report</Text>
  <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
</View>
<View style={styles.ruler}></View>
    
<View style={styles.list}> 
  <Text style={styles.text}>Admission Report</Text>
  <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
</View>
<View style={styles.ruler}></View>
    
<View style={styles.list}> 
  <Text style={styles.text}>Enrollment Statistics</Text>
  <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
</View>
<View style={styles.ruler}></View>
    
<View style={styles.list}> 
  <Text style={styles.text}>Academic Transcripts</Text>
  <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
</View>
<View style={styles.ruler}></View>
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
    
  }, 
  list: {
    width:'80%',
    flex:1, 
    flexDirection:'row',
    justifyContent:'space-between',
    position:'relative',
    left:40
  },
  icon:{
    position:'relative',
    right:10,
    top:10
  },
  text:{
    fontSize:20,
    color:'#58a8f9',
    width:'86%'
  },
  ruler:{
    width:'85%', 
    borderBottomWidth:0.5, 
    borderBottomColor: 'grey', 
    height:1,
    marginVertical:10 ,
    alignSelf:'center'
  }
});







