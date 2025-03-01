
import { MaterialCommunityIcons, Octicons } from "@expo/vector-icons";
import axios from "axios";
import { RelativePathString, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, FlatList, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Text } from "react-native-paper";
import { responsiveHeight } from "react-native-responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";

import Constants from 'expo-constants';


  const baseUrl = Constants.expoConfig.extra.API_URL;


const monthentries = [{ label: "Clear", value: null },
...[...Array(12).keys()].map(i => ({ label: (i + 1).toString(), value: i + 1 }))];

export type AttendanceUserRecordType = {
  _id: string,
  userID: string,
  name: string,
  surname: string,
  status: boolean,
}
export type AttendanceRecordType = {
  _id: string,
  classID: string,
  users: AttendanceUserRecordType[],
  createdAt: string,
  month?: number,
  year?: number,
  role?: string,
}

const AttendanceReportTable = ({ headerheight, classFilterPreSelected, viewRoutePath, edit, mode }: {
  headerheight: number,
  classFilterPreSelected: string | null,
  viewRoutePath: RelativePathString,
  edit?: boolean | undefined,
  mode: "Students" | "Staff",
}) => {

  // const flatlistheight = dummyData.attendance.length * 30;
  const maxHeight = responsiveHeight(100) - headerheight - 75;
  // const computedHeight = Math.min(flatlistheight, maxHeight);
  const [computedHeight, setComputedHeight] = useState(100);

  const [userdata, setuserdata] = useState<AttendanceRecordType[]>([]);
  const [classes, setClasses] = useState<{ label: string, value: string | null }[]>([]);
  const [filterClass, setFIlterClass] = useState<string | null>(classFilterPreSelected);
  const [filterMonth, setFilterMonth] = useState<number | null>(null)
  const [filterYear, setFilterYear] = useState<number | null>(null);
  const [yearentries, setYearEntries] = useState<{ label: string, value: number | null }[]>([]);

  const fetchInfo = async () => {
    try {
      const getRecords = async () => {
        if (mode === "Students") {
          return await Promise.all([
            axios.get(`${baseUrl}/attendance/students`),
            axios.get(`${baseUrl}/classes`),
          ]);
        }
        else {
          return [await axios.get(`${baseUrl}/attendance/staff`), {
            data: ["staff"]
          }]
        }
      };

      const [students, classes] = await getRecords();

      const attendanceRecords = students.data.map((r: {
        createdAt: string,
      }) => {
        const d = new Date(r.createdAt)
        const [month, year] = [d.getMonth() + 1, d.getFullYear()];
        return { ...r, month, year }
      });
      setuserdata(attendanceRecords);
      const classesmap = classes.data.reverse().map((c: {
        name: string,
        classCode: string,
      }) => ({ label: c.name, value: c.classCode }));
      setClasses([{ label: "Clear", value: null }, ...classesmap]);

      const years = Array.from(new Set<number>(attendanceRecords.map(({ year }: { year: number }) =>
        year
      ))).sort().map((y: number) => {
        return {
          label: y.toString(),
          value: y,
        }
      }).reverse();
      setYearEntries([{ label: "Clear", value: null }, ...years]);
    }
    catch (error: any) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const router = useRouter()

  const handlePress = (attendanceId: string, className: string, edit: boolean | undefined) => {
    router.navigate({
      pathname: viewRoutePath,
      params: {
        attendanceId, className,
        edit: edit?.toString() ?? "",
      },
    });
  }


  const getdatereprasation = (datestr: string) => {
    const date = new Date(datestr);
    const [dateNum, month, year] = [date.getDate(), date.getMonth(), date.getFullYear()];
    return `${dateNum}-${month + 1}-${year}`;
  }

  // console.log(flatlistheight, maxHeight, computedHeight);
  return (
    <View>
      <View style={styles.filtercontainer}>
        {!classFilterPreSelected && <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          value={filterClass}
          onChange={(item) => setFIlterClass(item.value)}
        />}

        <Dropdown
          style={styles.dropdownsmall}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={yearentries}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'YYYY'}
          value={filterYear}
          onChange={(item) => setFilterYear(item.value)}
        />

        <Dropdown
          style={styles.dropdownsmall}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={monthentries}
          search={false}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'MM'}
          value={filterMonth}
          onChange={(item) => setFilterMonth(item.value)}
        />
      </View>

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={styles.headerCell}>Date</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}>Class</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}>Total {mode}</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}>Absent {mode}</Text>
        <View style={styles.verticalLine} />
        <Text style={styles.headerCell}>Action</Text>
      </View>

      {/* Table Rows */}
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
          data={userdata
            .filter(item => filterClass ? item.classID === filterClass : true)
            .filter(item => filterYear ? item.year === filterYear : true)
            .filter(item => filterMonth ? item.month === filterMonth : true)
            .reverse()
          }
          keyExtractor={(item) => item._id}
          renderItem={({ item, index }) => (
            <View style={[styles.tableRow,
            index % 2 === 0 ? styles.evenTableRow : styles.oddTableRow
            ]}>
              <Text style={styles.cell}>{getdatereprasation(item.createdAt)}</Text>
              <View style={styles.verticalLine} />
              <Text style={styles.cell}>{item.classID.toUpperCase()}</Text>
              <View style={styles.verticalLine} />
              <Text style={styles.cell}>{item.users.length}</Text>
              <View style={styles.verticalLine} />
              <Text style={styles.cell}>{item.users.filter((s) => s.status === false).length}</Text>
              <View style={styles.verticalLine} />
              <TouchableOpacity onPress={() => handlePress(item._id, item.classID, edit)} style={[styles.cell, styles.icon]}>
                <MaterialCommunityIcons name={edit ? "pencil" : "eye"} size={18} color="#58a8f9" />
              </TouchableOpacity>
            </View>

          )}
        />
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
  dropdown: {
    height: 50,
    flex: 2,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#daedff',
    marginBottom: 15,
  },
  dropdownsmall: {
    height: 50,
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 5,
    backgroundColor: '#daedff',
    marginBottom: 15,
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
  headerCell: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#58a8f9",
    // paddingVertical: 8,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  tableRow: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    // paddingVertical: 6,
    height: 30,
  },
  oddTableRow: {
    backgroundColor: "#edf5fd68",
  },
  evenTableRow: {
  },
  cell: {
    flex: 1,
    fontSize: 13,
    textAlign: "center",
    paddingVertical: 6,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
  },
  verticalLine: {
    width: 1,
    backgroundColor: "#ccc", // Line color
    height: "100%",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
    paddingHorizontal: 10
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal: 10
  },
  filtercontainer: {
    flexDirection: "row",
    gap: 10,
  },
});

export default AttendanceReportTable;