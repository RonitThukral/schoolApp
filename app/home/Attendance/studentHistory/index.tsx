import AttendanceReportTable from "@/app/components/AttendanceReportTable";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const StudentHistory = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Attendance Report</Text>
      <AttendanceReportTable headerheight={230} classFilterPreSelected={null} viewRoutePath={'./studentHistory/edit'} edit={true} />
    </SafeAreaView >
  )
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
});

export default StudentHistory