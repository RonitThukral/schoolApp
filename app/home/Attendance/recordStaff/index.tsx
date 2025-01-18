import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView, Alert, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const StaffAttendance = () => {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    today.setHours(today.getHours() + 5); // Add 5 hours
    today.setMinutes(today.getMinutes() + 30); // Add 30 minutes
    return today.toISOString().split('T')[0];
  });
    const [selectedClass, setSelectedClass] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [staff, setStaff] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true); // Calendar visibility
  const [isSearched, setIsSearched] = useState(false); // Track if search is clicked
  const [loading, setLoading] = useState(false);

  // Fetch Staff Data
  const fetchStaff = async () => {
    try {
      const res = await axios.get(`${baseUrl}/teachers`);
      const formattedData = res.data.map((staffMember) => ({
        ...staffMember,
        status: false, // Default status for attendance
      }));
      setStaff(formattedData);
    } catch (error) {
      console.error('Error fetching staff:', error.message);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // Handle Attendance Registration
  const handleRegisterAttendance = () => {
    setLoading(true);
    axios
      .post(`${baseUrl}/attendance/register`, {
        users: staff,
        classID: selectedClass,
        role: 'staff',
      })
      .then((res) => {
        setLoading(false);
        if (res.data.error) {
          Alert.alert('Error', res.data.error);
        } else {
          Alert.alert('Success', 'Attendance Registered Successfully');
          setSearchQuery('')
      setIsCalendarVisible(true),
      setStaff([]),
      setIsSearched(false)
      setSelectedClass(null)
        }
      })
      
      .catch((err) => {
        console.log(err);
        setLoading(false);
        Alert.alert('Error', 'Sorry, something went wrong.');
      });
  };

  const toggleAttendance = (id) => {
    const updatedStaff = staff.map((staffMember) =>
      staffMember._id === id ? { ...staffMember, status: !staffMember.status } : staffMember
    );
    setStaff(updatedStaff);
  };


  const handleReset = () => {
    setSearchQuery('')
    setIsCalendarVisible(true),
    // setStaff([]),
    setIsSearched(false)
    setSelectedClass(null)

  }

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
              textMonthFontSize: 12,
              textDayStyle: { padding: 2 },
            }}
            enableSwipeMonths={true}
          />
        </View>
      )}

      {/* Dropdown Section */}
      <View style={styles.main}>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={[{ label: 'Staff', value: 'staff' }]}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
        />

        {/* Search Bar */}
        <TextInput
          style={styles.searchBar}
          placeholder="Search by Id or Name"
          placeholderTextColor={'grey'}
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />

        {/* Buttons */}
        <View style={styles.footer}>
           <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text style={{ color: '#58A8F9' }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} onPress={() => {
            setIsSearched(true)
            setIsCalendarVisible(false)
            }}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Staff List */}
      {isSearched && (
        <FlatList
          data={staff}
          keyExtractor={(item) => item._id}
          style={styles.list}
          contentContainerStyle={{ paddingTop:20 ,position:'relative',top:70}}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.studentCard} onPress={() => toggleAttendance(item._id)}>
              <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
              <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
                <Text style={styles.studentTextid}>{item.userID}</Text>
                <Text style={styles.studentText}>{item.name}</Text>
                <Text style={styles.studentText}>Status: {item.status ? 'Present' : 'Absent'}</Text>
              </View>
              {item.status ? (
                <Image source={require('../../../../assets/images/images/check.png')} />
              ) : (
                <Image source={require('../../../../assets/images/images/box.png')} />
              )}
            </TouchableOpacity>
          )}
        />
      )}

      {!isCalendarVisible && (
        <TouchableOpacity style={styles.submitButton} onPress={handleRegisterAttendance} disabled={loading}>
          <Text style={styles.submitButtonText}>{loading ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

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
      
       elevation:4,
       
        ...Platform.select({
          ios: {
            marginTop:0
          },
          
        }),
      
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
    main: {
      ...Platform.select({
        ios: {
          marginTop:-50
        },
        
      }),
    },
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
      zIndex: 100000,
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
      width: 80,
      height: 40,
      justifyContent: 'center',
      marginRight: 15,
    },
  });
      


export default StaffAttendance;
