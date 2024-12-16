import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert, SafeAreaView,ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

import RNPickerSelect from 'react-native-picker-select';

const StudentHistory = () => {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [students, setStudents] = useState([
    { id: 'BK202408', name: 'Deepak Kumar', present: true, class: '10A' },
    { id: 'BK202409', name: 'Rohan Sharma', present: false, class: '10B' },
    { id: '3', name: 'John Doe', present: false, class: '9A' },
  ]);

  const markAttendance = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, present: !student.present } : student
    );
    setStudents(updatedStudents);
  };

  const submitAttendance = () => {
    const attendanceData = students.map(({ id, name, present }) => ({
      id,
      name,
      status: present ? 'Present' : 'Absent',
    }));
    Alert.alert('Attendance Submitted', JSON.stringify(attendanceData, null, 2));
  };

  const filteredStudents = students.filter((student) =>
    student?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <SafeAreaView style={styles.container}>
      <View style={{height:'75%'}}>
        <View style={{height:400}}>

        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={{
            [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
          }}
          dayComponent={({ date, state }) => renderDay({ date, state })}
          style={styles.calendar}
          theme={{
          
            // calendarBackground: 'blue',
            textDayFontSize: 12,       // Smaller text size for days
            textDayHeaderFontSize: 12, // Smaller text size for day headers
            textMOnthFontSize: 12, // Smaller text size for day headers
            textDayStyle: {padding:2}, // Add padding to shrink height
          }}
          enableSwipeMonths={true}
        />
        </View>

<View style={{marginTop:0}}>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={students.map((student) => ({ label: student.class, value: student.class }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus('route')}
          onBlur={() => setIsFocus(null)}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
        />

        <TextInput
          style={styles.searchBar}
          placeholder="Search by Id"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        <View style={styles.footer}>
          <TouchableOpacity style={styles.reset}>
            <Text style={{ color: '#58A8F9' }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, paddingHorizontal: 10 }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
</View>
      </View>

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 20}} // Adds spacing at the bottom for better scrolling
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentCard} >
            <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
            <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
              <Text style={styles.studentTextid}>{item.id}</Text>
              <Text style={styles.studentText}>{item.name}</Text>
            </View>

            {item.present === false && <Image source={require('../../../../assets/images/images/box.png')} style={{position:'relative',
                right:8
            }}/>}
            {item.present === true && <Image source={require('../../../../assets/images/images/check.png')} />}
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitAttendance}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  calendar: {
     borderRadius: 15, 
     marginTop: 50 ,
     height:'85%',
     width:'95%',
     alignSelf:'center',
    //  backgroundColor:'red',
    
     elevation:4
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

export default StudentHistory;
