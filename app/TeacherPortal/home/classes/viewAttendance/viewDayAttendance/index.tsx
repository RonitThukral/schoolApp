import { Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import AttendanceDayReportTable from '@/app/components/AttendanceDayStudentReportTable';

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api";

const AttendanceDayView = () => {
  const { attendanceId, className } = useLocalSearchParams();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Single Day {className} Attendance Report</Text>
      <AttendanceDayReportTable headerHeight={230} attendanceId={attendanceId as string}
        mode="Student" />
    </SafeAreaView>
  )
}

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
  }
})

export default AttendanceDayView;