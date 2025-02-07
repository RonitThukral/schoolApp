import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image, Alert, SafeAreaView,StyleSheet,Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { useLocalSearchParams } from 'expo-router';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const StaffHistory = () => {
  const [staffData, setStaffData] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const { teacher } = useLocalSearchParams();
  const parsedTeacher = teacher ? JSON.parse(teacher) : null;
  const userID = parsedTeacher.userID; // Extract userID from teacher object

  // Fetch Staff Attendance Data
  const fetchStaffAttendance = async () => {
    try {
      const res = await axios.get(`${baseUrl}/attendance/user/${userID}`);
      const formattedData = res.data.map((data) => ({
        id: data._id,
        date: formatDate(data.createdAt),
        staff: data.users.find((user) => user.userID === userID),
      })).filter((entry) => entry.staff); // Remove null entries

      setStaffData(formattedData);
      setFilteredStaff(formattedData); // Show all records initially
    } catch (error) {
      console.error('Error fetching staff attendance:', error.message);
      Alert.alert('Error', 'Failed to fetch staff attendance data.');
    }
  };

  useEffect(() => {
    fetchStaffAttendance();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Formats as YYYY-MM-DD for filtering
  };

  // Handle Date Selection
  const handleDateSelection = (day) => {
    setSelectedDate(day.dateString);
    const filteredData = staffData.filter((record) => record.date === day.dateString);
    
    // Update filtered list only if attendance exists, otherwise show all records
    setFilteredStaff(filteredData.length > 0 ? filteredData : staffData);
  };


  
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
      <View style={{ height: '52%' }}>
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
      </View>

      {/* Show warning only if a date is selected and no attendance found, but keep the full list */}
      {selectedDate && staffData.every((record) => record.date !== selectedDate) && (
        <Text style={{ textAlign: 'center', color: 'red', marginTop: 10 }}>
          No attendance found for {selectedDate}
        </Text>
      )}

      {/* Staff Attendance List */}
      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: responsiveHeight(4) }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentCard}>
            <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
            <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
              <Text style={styles.studentTextid}>{item.staff.userID}</Text>
              <Text style={styles.studentText}>{item.staff.name} {item.staff.surname}</Text>
              <Text style={styles.studentText}>Date: {item.date}</Text>
              <Text style={styles.studentText}>Status: {item.staff.status ? 'Present' : 'Absent'}</Text>
            </View>
            {item.staff.status ? (
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
     marginTop: 50 ,
     height:'85%',
     width:'95%',
     alignSelf:'center',
    //  backgroundColor:'red',
    
     elevation:4,
     
      ...Platform.select({
        ios: {
          marginTop:0
        },
        
      }),
    
    },

    main: {
      ...Platform.select({
        ios: {
          marginTop:-50
        },
        
      }),
    },

  searchBar: {
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 20,
    minHeight: '85%',
    maxHeight: '90%',
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
    height:25,
    width:35,
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
    height:'90%',
    position:'relative',
    top:responsiveHeight(2)
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

export default StaffHistory;
