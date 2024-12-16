import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const FinancialStatistics = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Financial Statistics</Text>
          <Text style={styles.date}>20 Dec 2024</Text>
        </View>

        {/* Income Section */}
        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Income</Text>
            <View style={styles.valueRow}>
              <Image
                source={require("../../assets/images/images/up.png")} // Replace with the correct path to your image
                style={styles.arrowIcon}
              />
              <Text style={styles.amount}>
                ₹ 4,000 <Text style={styles.percentage}>(10%)</Text>
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionSubtitle}>Monthly</Text>
            <Text style={styles.amount2}>₹ 40,000</Text>
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Expenditure Section */}
        <View style={styles.row}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Expenditure</Text>
            <View style={styles.valueRow}>
              <Image
                source={require("../../assets/images/images/down.png")} // Replace with the correct path to your image
                style={styles.arrowIcon}
              />
              <Text style={styles.amount}>
                ₹ 2,700 <Text style={styles.percentage}>(10%)</Text>
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionSubtitle}>Monthly</Text>
            <Text style={styles.amount2}>₹ 27,000</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#E9F4FF",
    zIndex:4758695,
  },
  card: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    // backgroundColor: "red",
    borderRadius: 20,
    padding: 16,
    elevation: 3, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height:200,
    paddingVertical:8
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 7,
    marginTop:7
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 5
  },
  date: {
    fontSize: 12,
    // color: "#555",
    marginRight: 15,
    fontWeight: 500,

  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 5,
    padding: 13,
    backgroundColor: "#EEF7FF",
    borderRadius: 10,
    height:60,
    paddingBottom:20

  },
  section: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 3,
    marginLeft: 8
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: 400,
    marginLeft: 50,
    marginTop: 3
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
    marginBottom:5,
    paddingBottom:5
  },
  arrowIcon: {
    width: 20, // Match size to the Ionicons arrow
    height: 20,
    resizeMode: "contain",
    marginRight: 5,
    marginTop: 3
  },
  amount: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 5,
    marginTop: 3
  },
    amount2: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 50,
    marginTop: 5
  },
  percentage: {
    fontSize: 12,
     fontWeight: 600,
    // color: "#888",
  },
  divider: {
    height: 0,
    backgroundColor: "#FFFFFF",
    marginVertical: 0,
  },
});

export default FinancialStatistics;
