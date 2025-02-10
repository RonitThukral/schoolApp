import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { Text } from "react-native-paper";

const dummyData = {
  date: "07-Feb-2024",
  class: "LKG",
  attendance: [
    { id: 1, name: "Ashish FOE", fatherName: "F", mobile: "9981135986", status: "Present" },
    { id: 2, name: "Blooming", fatherName: "Sdfs", mobile: "", status: "Present" },
    { id: 3, name: "Dhumri", fatherName: "Sdfsd", mobile: "", status: "Present" },
    { id: 4, name: "Pushp raj", fatherName: "Dfsdf", mobile: "", status: "Present" },
    { id: 5, name: "Suditi", fatherName: "Fdsf", mobile: "", status: "Present" }
  ],
  summary: { totalPresent: 5, totalAbsent: 0 }
};

const AttendanceReport = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Single Day Class Wise Attendance Report</Text>

      <View style={styles.headerRow}>
        <Text style={styles.classText}>Class: {dummyData.class}</Text>
        <Text style={styles.dateText}>Date: {dummyData.date}</Text>
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>S.No</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}>Name</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}>Father Name</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}>Mobile</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}>Status</Text>
      </View>

      {/* Table Rows */}
      <FlatList
        data={dummyData.attendance}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <Text style={styles.cell}>{item.id}</Text>
            <View style={styles.verticalLine} />
            <Text style={[styles.cell, styles.nameCell]}>{item.name}</Text>
            <View style={styles.verticalLine} />
            <Text style={styles.cell}>{item.fatherName}</Text>
            <View style={styles.verticalLine} />
            <Text style={[styles.cell, styles.mobileCell]}>{item.mobile || "N/A"}</Text>
            <View style={styles.verticalLine} />
            <Text style={[styles.cell, styles.statusCell]}>{item.status}</Text>
          </View>
        )}
      />

      {/* Summary */}
      <View style={styles.summaryContainer}>
        <Text style={styles.presentText}>Total Present : {dummyData.summary.totalPresent}</Text>
        <Text style={styles.absentText}>Total Absent : {dummyData.summary.totalAbsent}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#fff",
    flex: 1,
  },
  title: {
    marginTop: 50,
    fontSize: 18,
    fontWeight: "bold",
    color: "#58a8f9",
    textAlign: "center",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  classText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#58a8f9",
    paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 6,
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: "center",
  },
  nameCell: {
    fontWeight: "bold",
  },
  mobileCell: {

  },
  statusCell: {

  },
  verticalLine: {
    width: 1,
    backgroundColor: "#ccc", // Line color
    height: '100%',
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 480, // Space at the bottom if placed below the table
  },


  presentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",

  },
  absentText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "red",

  },
});

export default AttendanceReport;