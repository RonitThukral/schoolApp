import { Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import AttendanceDayStaffReportTable from '@/app/components/AttendanceDayStaffReportTable';

const EditAttandanceView = () => {
  const { attendanceId, className, edit: editParam } = useLocalSearchParams();
  const edit = editParam === 'true';

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Edit {(className as string).toUpperCase()} Attendance Report</Text>
      <AttendanceDayStaffReportTable headerHeight={230}
        attendanceId={attendanceId as string} edit={edit}
        mode="Staff" />
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

export default EditAttandanceView;