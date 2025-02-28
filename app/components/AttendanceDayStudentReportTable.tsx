import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useLocalSearchParams } from 'expo-router';
import { AttendanceRecordType, AttendanceUserRecordType } from '@/app/components/AttendanceReportTable';
import { getStudentInfo } from '../utils/storage';
import { StudentInfoType } from '../utils/app.types';

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api";

const AttendanceDayReportTable = ({ headerHeight, attendanceId, edit, mode }: {
  headerHeight: number,
  attendanceId: string,
  edit?: boolean | undefined,
  mode: "Student" | "Staff"
}) => {

  // const { attendanceId } = useLocalSearchParams();
  const [attendanceview, setattendanceview] = useState<AttendanceRecordType | null>(null);
  const maxHeight = responsiveHeight(100) - headerHeight - 55;  // 
  const [computedHeight, setComputedHeight] = useState(100);
  const [submitenabled, enableSubmit] = useState<boolean>(false);

  const fetchInfo = () => {
    axios.get(`${baseUrl}/attendance/attendance/${attendanceId}`)
      .then((response) => {
        setattendanceview(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    enableSubmit(false);
  };

  const updateAttendanceFetch = async (attendanceview: AttendanceRecordType) => {
    if (attendanceview) {
      const response = await axios.put(`${baseUrl}/attendance/update/${attendanceId}`, {
        users: attendanceview.users,
      });

      if (response.data.error) {
        Alert.alert('Error', response.data.error);
      } else {
        Alert.alert('Success', 'Attendance updated successfully.');
      }
      enableSubmit(false);
    }
    // https://dreamscloudtechbackend.onrender.com/api/attendance/update/67b0796821fa04004e048974
  };

  useEffect(() => {
    if (attendanceId !== undefined)
      fetchInfo();
  }, [attendanceId]);


  const getdatereprasation = (datestr: string | undefined) => {
    if (datestr === undefined) return "";

    const date = new Date(datestr);
    const [dateNum, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
    return `${dateNum}-${month + 1}-${year}`;
  }

  const handleSelectChange = (id: string, status: boolean) => {
    enableSubmit(true);
    setattendanceview((prev) => {
      if (prev) {
        const users = prev.users.map((user_atd: AttendanceUserRecordType) => {
          if (user_atd._id === id) {
            return {
              ...user_atd,
              status,
            }
          }
          else {
            return user_atd;
          }
        });
        return {
          ...prev,
          users,
        }
      }
      return null;
    })
  }

  return (


    <>

      <View style={styles.headerRow}>
        <Text style={styles.classText}>Class: {attendanceview?.classID.toUpperCase()} </Text>
        <Text style={styles.dateText}>Date: {getdatereprasation(attendanceview?.createdAt)} </Text>
      </View>


      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>{mode} ID</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}> Full Name</Text>
        <View style={styles.verticalLine} />
        {mode === "Student" && <Text style={styles.headerCell}>Guardian Name</Text>}
        {mode === "Student" && <View style={styles.verticalLine} />}
        {mode === "Student" && <View style={styles.verticalLine} />}
        <Text style={[styles.headerCell, styles.headerCellSmall]}>P/A</Text>
      </View>

      <View>
        <FlatList
          style={{
            height: computedHeight,
            borderWidth: 1,
            borderColor: "#00000035",
          }}
          onContentSizeChange={(contentWidth, contentHeight) => {
            // Adjust height of FlatList based on content height
            setComputedHeight(Math.min(contentHeight, maxHeight));
          }}
          data={attendanceview?.users}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const presence_icon = item.status
              ? <Image source={require('../../assets/images/images/check.png')} resizeMode='cover' style={{ height: 20, width: 30 }} />
              : <Image source={require('../../assets/images/images/box.png')} style={{ height: 20, width: 20 }} />;
            const presence_status = edit ? <TouchableOpacity onPress={() => { handleSelectChange(item._id, !item.status) }}>{presence_icon}</TouchableOpacity> : presence_icon;
            const student_info: StudentInfoType | null = mode === "Student" ? getStudentInfo(item.userID) : null;
            return (
              <View style={styles.tableRow}>
                <Text style={styles.cell}>{item.userID}</Text>
                <View style={styles.verticalLine} />
                <Text style={styles.cell}>{item.name} {item.surname}</Text>
                <View style={styles.verticalLine} />
                {mode === "Student" && <Text style={styles.cell}>{student_info?.guadian[0]?.name}</Text>}
                {mode === "Student" && <View style={styles.verticalLine} />}
                {mode === "Student" && <View style={styles.verticalLine} />}
                <Text style={[styles.cell, styles.cellSmall]}>{presence_status}</Text>
                <View style={styles.verticalLine} />
              </View>
            )
          }}
        />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footertext}>Total Present: {(attendanceview?.users?.filter((s) => s.status === true) ?? []).length}</Text>
        <Text style={styles.footertext}>Total Absent: {(attendanceview?.users?.filter((s) => s.status === false) ?? []).length}</Text>
      </View>
      {edit && attendanceview &&
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            onPress={() => updateAttendanceFetch(attendanceview)}
            style={
              submitenabled ? [styles.actionbuttons, styles.submitbutton]
                : [styles.actionbuttons, styles.submitbuttondisabled]
            }
            disabled={!submitenabled}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => fetchInfo()} style={[styles.actionbuttons, styles.cancelbutton]}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      }
    </>
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
  },
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 8,
  },
  headerCellSmall: {
    flex: 0,
    width: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#58a8f9",
    borderRadius: 5,
  },

  verticalLine: {
    width: 1,
    backgroundColor: "#ccc", // Line color
    height: "100%",
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // paddingVertical: 6,
    height: 30,
  },
  cell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 6,
  },
  cellSmall: {
    flex: 0,
    width: 30,
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

  footer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footertext: {
    fontWeight: "bold",
    color: "red",
  },
  buttoncontainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 15,
    gap: 10,
  },
  actionbuttons: {
    height: 35,
    borderRadius: 15,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  submitbutton: {
    backgroundColor: '#58A8F9',
  },
  submitbuttondisabled: {
    backgroundColor: '#58A8F9ad',
  },
  cancelbutton: {
    backgroundColor: '#a5a5a5',
  }
})

export default AttendanceDayReportTable;