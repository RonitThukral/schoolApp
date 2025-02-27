import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert, SafeAreaView, StyleSheet, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useLocalSearchParams } from 'expo-router';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const StudentAttendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [markedDates, setMarkedDates] = useState({});
  const { student } = useLocalSearchParams();
  const parsedStudent = student ? JSON.parse(student) : null;
  const userID = parsedStudent?.userID; // Get the logged-in student's userID

  // Fetch Student Attendance Data
  const fetchStudentAttendance = async () => {
    try {
      const res = await axios.get(`${baseUrl}/attendance/user/${userID}`);
      const formattedData = res.data
        .map((entry) => ({
          id: entry._id,
          date: formatDate(entry.createdAt),
          student: entry.users.find((user) => user.userID === userID), // Find logged-in student
        }))
        .filter((entry) => entry.student); // Keep only records for the logged-in student

      setAttendanceData(formattedData);
      setFilteredAttendance(formattedData); // Show all records initially
    } catch (error) {
      console.error('Error fetching student attendance:', error.message);
      Alert.alert('Error', 'Failed to fetch attendance data.');
    }
  };

  useEffect(() => {
    fetchStudentAttendance();
  }, [userID]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats as YYYY-MM-DD for filtering
  };

  // Handle Date Selection
  const handleDateSelection = (day) => {
    setSelectedDate(day.dateString);
    
    // Filter attendance data for the selected date
    const filteredData = attendanceData.filter((record) => record.date === day.dateString);
    setFilteredAttendance(filteredData);
  
    // Update marked dates to highlight selected date
    setMarkedDates({ [day.dateString]: { selected: true, selectedColor: 'blue' } });
  };
  
  
  
  

  const renderDay = ({ date, state }) => {
    const isSunday = new Date(date.dateString).getDay() === 0;

    // Function to generate marked dates (Events + Sundays)
    const getMarkedDates = (eventData) => {
      const marked = {};

      // Mark all event dates with red text and bold font
      Object.keys(eventData).forEach((date) => {
        marked[date] = {
          selected: true,
          selectedColor: 'blue',
          marked: true,
          dotColor: 'red', // Red dot for events
          customStyles: {
            text: { color: 'red', fontWeight: 'bold' }, // Red text and bold for event dates
          },
        };
      });

      // Mark all Sundays with red text and bold font (same style as event dates)
      const startDate = new Date();
      for (let i = 0; i < 365; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        const dateString = date.toISOString().split('T')[0];

        // Mark Sundays with red text and bold font
        if (date.getDay() === 0) {
          marked[dateString] = {
            ...marked[dateString],
            customStyles: {
              text: { color: 'red', fontWeight: 'bold' }, // Red and bold text for Sundays
            },
          };
        }
      }

      return marked;
    };


    return (
      <TouchableOpacity
        onPress={() => setSelectedDate(date.dateString)}
        style={[styles.dayContainer, selectedDate === date.dateString && styles.selectedDay]}
      >
        <Text
          style={[
            styles.dayText,
            state === 'disabled' && styles.disabledDayText,
            isSunday && styles.sundayText,
          ]}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  };


  return (
    <SafeAreaView style={styles.container}>
      {/* <View style={{ height: '52%' }}>
        <View style={{ height: 400 }}>
        <Calendar
            onDayPress={(day) => setSelectedDate(day.dateString)}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
            }}
            dayComponent={({ date, state }) => renderDay({ date, state })}
            style={styles.calendar}
            theme={{
              textDayFontSize: 12,
    textDayHeaderFontSize: 12,
    textMonthFontSize: 12,
    textDayStyle: { padding: 2 },
    textSectionTitleColor: 'black', // Ensures weekday headers are visible
    textSectionTitleDisabledColor: '#d9e1e8',
    textDayHeaderFontWeight: 'bold', // 🔥 Bold weekday headers
            }}
            enableSwipeMonths={true}

          
          />
        </View>
      </View> */}
      <View style={{ height: '52%' }}>
        <View style={{ height: 400 }}>
          <Calendar
              onDayPress={(day) => {
                handleDateSelection(day);
            
            }}
            markedDates={markedDates}
            dayComponent={({ date, state }) => renderDay({ date, state })}
            style={styles.calendar}
            theme={{
              textDayFontSize: 12,
              textDayHeaderFontSize: 12,
              textMonthFontSize: 12,
              textDayStyle: { padding: 2 },
              textSectionTitleColor: 'black',
              textSectionTitleDisabledColor: '#d9e1e8',
              textDayHeaderFontWeight: '700',
            }}
            enableSwipeMonths={true}
          />
        </View>
      </View>

      {/* Show warning only if a date is selected and no attendance found */}
      {selectedDate && attendanceData.every((record) => record.date !== selectedDate) && (
        <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>
          No attendance found for {selectedDate}
        </Text>
      )}

      {/* Student Attendance List */}
      <FlatList
        data={filteredAttendance}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: responsiveHeight(4) }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentCard}>
            <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
            <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
              <Text style={styles.studentTextid}>{item.student.userID}</Text>
              <Text style={styles.studentText}>{item.student.name} {item.student.surname}</Text>
              <Text style={styles.studentText}>Date: {item.date}</Text>
              <Text style={styles.studentText}>Status: {item.student.status ? 'Present' : 'Absent'}</Text>
            </View>
            {item.student.status ? (
              <Image source={require('../../../../assets/images/images/check.png')} />
            ) : (
              <Image source={require('../../../../assets/images/images/box.png')} style={{ position: 'relative', right: 8 }} />
            )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  calendar: {
    borderRadius: 15,
    marginTop: 50,
    //  height:'85%',
    minHeight: '85%',
    maxHeight: '90%',
    width: '95%',
    alignSelf: 'center',
    //  backgroundColor:'red',

    elevation: 10,

    ...Platform.select({
      ios: {
        marginTop: 0
      },

    }),

  },

  main: {
    ...Platform.select({
      ios: {
        marginTop: -50
      },

    }),
  },

  searchBar: {
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: '#daedff',

  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    alignSelf: 'center',
    height: 100,
  },
  studentTextid: { fontSize: 18, color: '#007bff' },
  studentText: { fontSize: 14 },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: { color: '#fff', fontSize: 18 },
  dayContainer: {
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'green',
    height: 25,
    width: 35
  },
  dayText: { fontSize: 12, textAlign: 'center', color: '#000' },
  sundayText: { color: 'red' },
  selectedDay: { backgroundColor: '#d3e5ff', borderRadius: 5 },
  disabledDayText: { color: 'gray' },
  img: {
    marginHorizontal: 20,
    width: 42,
    height: 42,
  },
  list: {
    flexGrow: 1,
    height: '90%',
    position: 'relative',
    top: responsiveHeight(5)
  },
  dropdown: {
    height: 50,
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#daedff',
    marginBottom: 15,
    alignSelf: 'center',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
    paddingHorizontal: 15
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // zIndex: 100000,
    position: 'relative',
    right: 20,
    top: 10
  },
  search: {
    width: 110,
    height: 35,
    borderRadius: 15,
    backgroundColor: '#58A8F9',
    justifyContent: 'center',
  },
  reset: {
    backgroundColor: 'transparent',
    width: 70,
    height: 35,
    justifyContent: 'center',
    marginRight: 15,
  },
});

export default StudentAttendance;
