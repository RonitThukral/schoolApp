import AttendanceReportTable from '@/app/components/AttendanceReportTable';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api";

const StaffHistory = () => {

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Attendance Report</Text>
      <AttendanceReportTable headerheight={230}
        classFilterPreSelected={"staff"}
        viewRoutePath={'./staffHistory/edit'}
        edit={true}
        mode="Staff" />
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


export default StaffHistory;