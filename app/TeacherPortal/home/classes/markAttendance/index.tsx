import axios from 'axios';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView, Alert, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';
const StudentRecord = () => {
  const { classId } = useLocalSearchParams();

  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [selectedClass, setSelectedClass] = useState(classId);
  const [searchQuery, setSearchQuery] = useState('');
  const [classStudents, setClassStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true);
  const [isSearched, setIsSearched] = useState(false);

  const fetchClasses = async () => {
    try {
      const res = await axios.get(`${baseUrl}/classes`);
      const formattedData = res.data.map((cls) => ({
        label: cls.name,
        value: cls.classCode,
      }));
      setClasses(formattedData);
    } catch (error) {
      console.error('Error fetching classes:', error.message);
      Alert.alert('Error', 'Unable to fetch classes. Please try again.');
    }
  };

  const fetchStudents = async () => {
    try {
      if (selectedClass && selectedDate) { // Make sure both class and date are selected
        const res = await axios.get(`${baseUrl}/students/class/${selectedClass}`);
        if (!res.data.users || res.data.users.length === 0) {
          setClassStudents([]);
          Alert.alert('Error', 'There are no students in this class yet!');
        } else {
          const formattedData = res.data.users.map((student) => ({
            ...student,
            status: 'Absent', // Default status is absent
          }));
          setClassStudents(formattedData);
          setFilteredStudents(formattedData);
        }
      }
    } catch (error) {
      console.error('Error fetching students:', error.message);
      Alert.alert('Error', 'Unable to fetch students. Please try again.');
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const handleClassSelection = (item) => {
    setSelectedClass(item.value);
    setIsCalendarVisible(true); // Show the calendar when class is selected
    setIsSearched(false);
  };

  const handleSearch = () => {
    if (!selectedDate || !selectedClass) {
      Alert.alert('Error', 'Please select both date and class before searching.');
      return;
    }
    fetchStudents();
    setIsSearched(true);
  };

  const handleReset = () => {
    setSelectedDate('');
    setSelectedClass('');
    setSearchQuery('');
    setClassStudents([]);
    setFilteredStudents([]);
    setIsCalendarVisible(true);
    setIsSearched(false);
  };

  const toggleAttendance = (id) => {
    const updatedStudents = classStudents.map((student) =>
      student._id === id
        ? { ...student, status: student.status === 'Present' ? 'Absent' : 'Present' }
        : student
    );
    setClassStudents(updatedStudents);
    setFilteredStudents(updatedStudents);
  };

  const registerAttendance = async () => {
    try {
      const users = classStudents.map((student) => ({
        userID: student.userID,
        name: student.name,
        surname: student.surname,
        status: student.status === 'Present', // Convert status to boolean
      }));

      const res = await axios.post(`${baseUrl}/attendance/register`, {
        users,
        classID: selectedClass,
        role: 'students',
      });

      if (res.data.error) {
        Alert.alert('Error', res.data.error);
      } else {
        Alert.alert('Success', 'Attendance registered successfully.');
      }
    } catch (error) {
      console.error('Error registering attendance:', error.message);
      Alert.alert('Error', 'Sorry, something went wrong.');
    }
  };

  const filterStudents = (query) => {
    const filtered = classStudents.filter(
      (student) =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.userID.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  useEffect(() => {
    filterStudents(searchQuery);
  }, [searchQuery]);

  // Render day component with styling for selected date
  const renderDay = ({ date, state }) => {
    const isSunday = new Date(date.dateString).getDay() === 0;
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(date.dateString);
          setIsCalendarVisible(false); // Hide calendar once a date is selected
          fetchStudents(); // Fetch the students once the date is selected
        }}
        style={[styles.dayContainer, selectedDate === date.dateString && styles.selectedDay]}
      >
        <Text
          style={[styles.dayText, state === 'disabled' && styles.disabledDayText, isSunday && styles.sundayText]}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={[isCalendarVisible ? styles.container : styles.container1]}>
      {/* Calendar Section */}
      {isCalendarVisible && (
        <View style={{ height: 400 }}>
          <Calendar
            onDayPress={(day) => {
              setSelectedDate(day.dateString);
              setIsCalendarVisible(false); // Hide calendar when a date is selected
              fetchStudents(); // Fetch students for the selected date
            }}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
            }}
            dayComponent={({ date, state }) => renderDay({ date, state })}
            style={styles.calendar}
            theme={{
              textDayFontSize: 12,
              textDayHeaderFontSize: 12,
              textMOnthFontSize: 12,
              textDayStyle: { padding: 2 },
            }}
            enableSwipeMonths={true}
          />
        </View>
      )}

      {/* Students List */}
      {!isCalendarVisible && (
        <FlatList
          data={classStudents}
          keyExtractor={(item) => item._id}
          style={styles.list}
          contentContainerStyle={{ paddingTop: 20 }}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.studentCard} onPress={() => toggleAttendance(item._id)}>
              <Image source={require('../../../../../assets/images/images/boy.png')} style={styles.img} />
              <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
                <Text style={styles.studentTextid}>{item.userID}</Text>
                <Text style={styles.studentText}>{item.name}</Text>
                <Text style={styles.studentText}>Status: {item.status}</Text>
              </View>
              {item.status === 'Absent' && (
                <Image source={require('../../../../../assets/images/images/box.png')} style={{ position: 'relative', right: 8 }} />
              )}
              {item.status === 'Present' && (
                <Image source={require('../../../../../assets/images/images/check.png')} />
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {/* Save Button to Register Attendance */}
      {!isCalendarVisible && (
        <TouchableOpacity style={styles.submitButton} onPress={registerAttendance}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  container1: { flex: 1, padding: 20, backgroundColor: 'white', paddingTop: 70 },
  calendar: {
    borderRadius: 15,
    marginTop: 50,
    minHeight: '85%',
    maxHeight: '90%',
    width: '95%',
    alignSelf: 'center',
    elevation: 4,
    ...Platform.select({
      ios: {
        marginTop: 0
      },
    }),
  },
  submitButtonText: { color: '#fff', fontSize: 18 },
  submitButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#58A8F9',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
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
    height: 75,
  },
  studentTextid: { fontSize: 18, color: '#007bff' },
  studentText: { fontSize: 14 },
  dayContainer: {
    height: 25,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
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
    height: '80%',
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
    paddingHorizontal: 15,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position: 'relative',
    right: 20,
    top: 10,
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
  main: {
    ...Platform.select({
      ios: {
        marginTop: -50,
      },
    }),
  }
});

export default StudentRecord;
