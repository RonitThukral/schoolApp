import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const StudentRecord = () => {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [classStudents, setClassStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true); // Calendar visibility
  const [isSearched, setIsSearched] = useState(false); // Track if search is clicked

  const fetchStudents = async () => {
    try {
      if (selectedClass) {
        const res = await axios.get(`${baseUrl}/students/class/${selectedClass}`);
        if (!res.data.users) {
          setSelectedClass(null);
          Alert.alert('Error', 'There are No Students in This Class Yet!');
        } else {
          const formattedData = res.data.users.map((student) => ({
            ...student,
            status: student.status ? 'Present' : 'Absent', // Ensure default status mapping
          }));
          setClassStudents(formattedData);
        }
      }
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  const fetchClasses = async () => {
    try {
      const classes = await axios.get(`${baseUrl}/classes`);
      const formatedData = classes.data.map((cls) => ({
        label: cls.name,
        value: cls.classCode,
      }));
      setClasses(formatedData);
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  // Handle Class Selection
  const handleClassSelection = (item) => {
    setSelectedClass(item.value);
    setIsCalendarVisible(false);
    setIsSearched(false); // Reset search state
  };

  // Handle Search Button Click
  const handleSearch = () => {
    if (!selectedDate || !selectedClass) {
      Alert.alert('Error', 'Please select both date and class before searching.');
      return;
    }
    fetchStudents(); // Fetch students based on class
    setIsSearched(true);
  };

  // Handle Reset Button Click
  const handleReset = () => {
    setSelectedDate('');
    setSelectedClass('');
    setSearchQuery('');
    setClassStudents([]);
    setIsCalendarVisible(true);
    setIsSearched(false);
  };

  // Toggle Attendance Status
  const toggleAttendance = (id) => {
    const updatedStudents = classStudents.map((student) => 
      student._id === id ? { ...student, status: student.status === 'Present' ? 'Absent' : 'Present' } : student
    );
    setClassStudents(updatedStudents);
  };

  // Render day component with styling for selected date
  const renderDay = ({ date, state }) => {
    const isSunday = new Date(date.dateString).getDay() === 0;
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
    <SafeAreaView style={[isCalendarVisible ? styles.container : styles.container1]}>
      {/* Calendar Section */}
      {isCalendarVisible && (
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
              textMOnthFontSize: 12,
              textDayStyle: { padding: 2 },
            }}
            enableSwipeMonths={true}
          />
        </View>
      )}

      {/* Dropdown Section */}
      <View>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus('route')}
          onBlur={() => setIsFocus(null)}
          value={selectedClass}
          onChange={handleClassSelection}
        />

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Id or Name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        {/* Buttons */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text style={{ color: '#58A8F9' }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} onPress={handleSearch}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Students List */}
      {isSearched && (
        <FlatList
          data={classStudents}
          keyExtractor={(item) => item._id}
          style={styles.list}
          contentContainerStyle={{ paddingTop: 70 ,}}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.studentCard} onPress={() => toggleAttendance(item._id)}>
              <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
              <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
                <Text style={styles.studentTextid}>{item.userID}</Text>
                <Text style={styles.studentText}>{item.name}</Text>
                <Text style={styles.studentText}>Status: {item.status}</Text>
              </View>
              {item.status === 'Absent' && (
                <Image source={require('../../../../assets/images/images/box.png')} style={{ position: 'relative', right: 8 }} />
              )}
              {item.status === 'Present' && (
                <Image source={require('../../../../assets/images/images/check.png')} />
              )}
            </TouchableOpacity>
          )}
        />
      )}

{!isCalendarVisible && <TouchableOpacity style={styles.submitButton}  >
        <Text style={styles.submitButtonText}>Save</Text>
      </TouchableOpacity>}
    </SafeAreaView>
  );
};

// export default StudentHistory;



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  container1: { flex: 1, padding: 20, backgroundColor: 'white' ,paddingTop:70},
  calendar: {
     borderRadius: 15, 
     marginTop: 50 ,
     height:'85%',
     width:'95%',
     alignSelf:'center',
    //  backgroundColor:'red',
    
     elevation:4
    },
    submitButtonText: { color: '#fff', fontSize: 18 },
    submitButton: {
        position:'absolute',
        bottom: 20  ,
        backgroundColor: '#58A8F9',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        width:'80%',
        alignSelf:'center'
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
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'green',
    height:35,
    width:35
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
    height:'80%'
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
    position:'relative',
    right:20,
    top:10
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

export default StudentRecord