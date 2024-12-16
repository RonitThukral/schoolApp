import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default function Staff() {
  
  const dataStaff = [
    {
      name: "Male",
      population: 20,
      color: "#4A90E2",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    },
    {
      name: "Female",
      population: 12,
      color: "#F5A623",
      legendFontColor: "#7F7F7F",
      legendFontSize: 15
    }
  ];

  const totalStaff = dataStaff.reduce((sum, item) => sum + item.population, 0);



  return (
    <ScrollView style={styles.container1}>


      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.title}>Total Staff</Text>
          <View style={styles.chartContainer}>
          <PieChart
              data={dataStaff}
              width={110}
              height={110}
              chartConfig={{
                color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
              }}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="0"
              center={[30, -10]}
              hasLegend={false}
              
            />
            <View style={styles.centerText}>
              <Text style={styles.totalText}>{totalStaff}</Text>
            </View>
          </View>
          <View style={styles.legend}>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: "#4A90E2" }]} />
              <Text style={styles.legendText}>Male:        </Text>
              {dataStaff.map((item, index) => {
                if (index === 0) {
                  return <Text style={styles.legendValue} key={index}>{item.population}</Text>
                } else {
                  return null
                }
              })}
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendColor, { backgroundColor: "#F5A623" }]} />
              <Text style={styles.legendText}>Female:    </Text>
              {dataStaff.map((item, index) => {
                if (index === 1) {
                  return <Text style={styles.legendValue} key={index}>{item.population}</Text>
                } else {
                  return null
                }
              })}

            </View>
          </View>
        </View>
      </View>



      {/* Metrics Section */}
      <View style={styles.metricsSection}>
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Divisions</Text>
            <View style={styles.metricsContent}>

              <Ionicons name="school" size={24} color="#3b82f6" />
              <Text style={styles.metricNumber}>364</Text>
            </View>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Departments</Text>
            <View style={styles.metricsContent}>

              <Ionicons name="school" size={24} color="#3b82f6" />
              <Text style={styles.metricNumber}>364</Text>
            </View>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Sections</Text>
            <View style={styles.metricsContent}>

              <Ionicons name="school" size={24} color="#3b82f6" />
              <Text style={styles.metricNumber}>364</Text>
            </View>
          </View>
        </View>
        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Courses</Text>
            <View style={styles.metricsContent}>

              <Ionicons name="school" size={24} color="#3b82f6" />
              <Text style={styles.metricNumber}>364</Text>
            </View>
          </View>
          <View style={styles.metricBox}>
            <Text style={styles.metricLabel}>Classes</Text>
            <View style={styles.metricsContent}>

              <Ionicons name="school" size={24} color="#3b82f6" />
              <Text style={styles.metricNumber}>364</Text>
            </View>
          </View>
          <View style={styles.metricBox}>

            <Text style={styles.metricLabel}>Prefects</Text>

            <View style={styles.metricsContent}>

              <Ionicons name="school" size={24} color="#3b82f6" />
              <Text style={styles.metricNumber}>364</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "white",
    // padding: 20,
    
  },
  bgImg:{
    backgroundColor:'#daedff',
    height:250
  },
 
  schoolInfo: {
    alignItems: "center",
    marginBottom: 20,
    position:'absolute',
    top:'40%',
    alignSelf:'center'
  },
  schoolName: {
    textAlign:'center',
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
  },
  schoolSub: {
    fontSize: 12,
    color: "#6b7280",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    position:'relative',
    top:'88%'
  },
  tab: {
    fontSize: 16,
    fontWeight: "600",
    color: "#9ca3af",
  },
  activeTab: {
    color: "#3b82f6",
    borderBottomWidth: 2,
    borderBottomColor: "#58a8f9",
    paddingBottom: 5,
  },


  metricsSection: {
    marginTop: 20,
    width:'85%',
    alignSelf:'center'
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  metricBox: {
    backgroundColor: "#daedff",
    borderRadius: 8,
    padding: 5,
    alignItems: "center",
    width: width * 0.25,
    boxShadow: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    height: 70,
    flexDirection: 'column'
  },
  metricsContent:{ 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 5 
  },
  metricNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3b82f6",
    marginHorizontal: 10
  },
  metricLabel: {
    fontSize: 14,
    color: "black",
    width: '100%',
    textAlign: 'center',
    fontWeight: '400'

  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginVertical: 10,
    marginTop:10
  },
  card: {
    width: '85%',
    height: 150,
    padding: 20,
    borderWidth: 0.5,
    borderColor: "#4A90E2",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 35,
    textAlign: "center",
    marginTop:-10
  },
  chartContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    top: 40,
    left: 25,
    // backgroundColor:'red',
  },
  centerText: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'white',
    width:70,
    height:70,
    borderRadius:100,
    bottom:30,
    left:22
  },
  totalText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  legend: {
    flexDirection: "column",
    alignItems: "flex-start",
    position: 'absolute',
    top: 60,
    right: 50
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  legendColor: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  legendText: {
    fontSize: 15,
    marginRight: 5,
  },
  legendValue: {
    fontSize: 15,
    fontWeight: "bold",
  },
});







