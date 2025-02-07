// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Alert, SafeAreaView, } from 'react-native';
// import { Calendar } from 'react-native-calendars';



// const staffData =[
//     { id: 'BK202408', name: 'Deepak Kumar', present: true, class: '10A' },
//     { id: 'BK202409', name: 'Rohan Sharma', present: false, class: '10B' },
//     { id: '3', name: 'John Doe', present: true, class: '9A' },
//     { id: '4', name: 'John Doe', present: false, class: '9A' },
//     { id: '5', name: 'John Doe', present: true, class: '9A' },
//     { id: '6', name: 'John Doe', present: false, class: '9A' },
//     { id: '7', name: 'John Doe', present: true, class: '9A' },
//     { id: '8', name: 'John Doe', present: true, class: '9A' },
//   ]


// const StaffHistory = () => {
//   const [selectedDate, setSelectedDate] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [students, setStudents] = useState(staffData);



//   const submitAttendance = () => {
//     const attendanceData = students.map(({ id, name, present }) => ({
//       id,
//       name,
//       status: present ? 'Present' : 'Absent',
//     }));
//     Alert.alert('Attendance Submitted', JSON.stringify(attendanceData, null, 2));
//   };

//   const filteredStudents = students.filter((student) =>
//     student?.name?.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const renderDay = ({ date, state }) => {
//     const isSunday = new Date(date.dateString).getDay() === 0;
//     return (
//       <TouchableOpacity
//         onPress={() => setSelectedDate(date.dateString)}
//         style={[styles.dayContainer, selectedDate === date.dateString && styles.selectedDay]}
//       >
//         <Text
//           style={[
//             styles.dayText,
//             state === 'disabled' && styles.disabledDayText,
//             isSunday && styles.sundayText,
//           ]}
//         >
//           {date.day}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   // const handleCheck = (id) => {
//   //   const updatedStudents = students.map((student) => (
//   //     student.id === id ? {...student , present : !student.present} : student
//   //   ))

//   //   setStudents(updatedStudents)
    
//   // }

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{height:'52%'}}>
//         <View style={{height:400}}>

//         <Calendar
//           onDayPress={(day) => setSelectedDate(day.dateString)}
//           markedDates={{
//             [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
//           }}
//           dayComponent={({ date, state }) => renderDay({ date, state })}
//           style={styles.calendar}
//           theme={{
          
//             // calendarBackground: 'blue',
//             textDayFontSize: 12,       // Smaller text size for days
//             textDayHeaderFontSize: 12, // Smaller text size for day headers
//             textMOnthFontSize: 12, // Smaller text size for day headers
//             textDayStyle: {padding:2}, // Add padding to shrink height
//           }}
//           enableSwipeMonths={true}
//         />
//         </View>


//       </View>

//       <FlatList
//         data={filteredStudents}
//         keyExtractor={(item) => item.id}
//         style={styles.list}
//         contentContainerStyle={{ paddingBottom: 20}} // Adds spacing at the bottom for better scrolling
//         renderItem={({ item }) => (
//           <TouchableOpacity style={styles.studentCard} >
//             <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
//             <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
//               <Text style={styles.studentTextid}>{item.id}</Text>
//               <Text style={styles.studentText}>{item.name}</Text>
//             </View>

//             {item.present === false && <Image source={require('../../../../assets/images/images/box.png')} style={{position:'relative',
//                 right:8
//             }}/>}
//             {item.present === true && <Image source={require('../../../../assets/images/images/check.png')} />}
//           </TouchableOpacity>
//         )}
//       />

// {/* 
//       <TouchableOpacity style={styles.submitButton} onPress={submitAttendance}>
//         <Text style={styles.submitButtonText}>Submit</Text>
//       </TouchableOpacity> */}
      
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20, backgroundColor: 'white' },
//   calendar: {
//      borderRadius: 15, 
//      marginTop: 50 ,
//      height:'85%',
//      width:'95%',
//      alignSelf:'center',
//     //  backgroundColor:'red',
    
//      elevation:4
//     },
//   searchBar: {
//     width: '90%',
//     borderRadius: 8,
//     paddingHorizontal: 20,
//     height: 50,
//     marginBottom: 10,
//     alignSelf: 'center',
//     backgroundColor: '#daedff',

//   },
//   studentCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding: 10,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     width: '90%',
//     alignSelf: 'center',
//     height: 75,
//   },
//   studentTextid: { fontSize: 18, color: '#007bff' },
//   studentText: { fontSize: 14 },
//   submitButton: {
//     backgroundColor: '#007bff',
//     paddingVertical: 10,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   submitButtonText: { color: '#fff', fontSize: 18 },
//   dayContainer: {
//     // padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor:'green',
//     height:35,
//     width:35
//   },
//   dayText: { fontSize: 12, textAlign: 'center', color: '#000' },
//   sundayText: { color: 'red' },
//   selectedDay: { backgroundColor: '#d3e5ff', borderRadius: 5 },
//   disabledDayText: { color: 'gray' },
//   img: {
//     marginHorizontal: 20,
//     width: 42,
//     height: 42,
//   },
//   list: {
//     flexGrow: 1,
//     height:'80%'
//   },
//   dropdown: {
//     height: 50,
//     width: '90%',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     backgroundColor: '#daedff',
//     marginBottom: 15,
//     alignSelf: 'center',
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   placeholderStyle: {
//     fontSize: 15,
//     color: 'grey',
//     paddingHorizontal: 15
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   footer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//     // zIndex: 100000,
//     position:'relative',
//     right:20,
//     top:10
//   },
//   search: {
//     width: 110,
//     height: 35,
//     borderRadius: 15,
//     backgroundColor: '#58A8F9',
//     justifyContent: 'center',
//   },
//   reset: {
//     backgroundColor: 'transparent',
//     width: 70,
//     height: 35,
//     justifyContent: 'center',
//     marginRight: 15,
//   },
// });




import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Alert, SafeAreaView, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const StaffHistory = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [staffData, setStaffData] = useState([]);
  const [filteredStaff, setFilteredStaff] = useState([]);

  // Fetch Staff Attendance Data
  const fetchStaffAttendance = async () => {
    try {
      const res = await axios.get(`${baseUrl}/attendance/staff`);
      const formattedData = res.data.map((data) => ({
        id: data._id,
        date: formatDate(data.createdAt),
        staff: data.users.map((user) => ({
          id: user._id,
          userID: user.userID,
          name: user.name,
          surname: user.surname,
          status: user.status,
        })),
      }));
      setStaffData(formattedData);
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
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Filter staff based on selected date
  useEffect(() => {
    if (selectedDate) {
      const dateFormatted = formatDate(new Date(selectedDate));
      const selectedAttendance = staffData.find((record) => record.date === dateFormatted);
      if (selectedAttendance) {
        setFilteredStaff(
          selectedAttendance.staff.map((staff) => ({
            ...staff,
            status: staff.status ? 'Present' : 'Absent',
          }))
        );
      } else {
        setFilteredStaff([]);
      }
    }
  }, [selectedDate, staffData]);

  // Render calendar day
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
              textSectionTitleColor: 'black',
              textSectionTitleDisabledColor: '#d9e1e8',
              textDayHeaderFontWeight: '700',
            }}
            enableSwipeMonths={true}
          />
        </View>
      </View>

      {/* Staff List */}
      <FlatList
        data={filteredStaff}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: responsiveHeight(4),  }}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentCard}>
            <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
            <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
              <Text style={styles.studentTextid}>{item.userID}</Text>
              <Text style={styles.studentText}>{item.name} {item.surname}</Text>
              <Text style={styles.studentText}>Status: {item.status}</Text>
            </View>
            {item.status === 'Absent' && (
              <Image
                source={require('../../../../assets/images/images/box.png')}
                style={{ position: 'relative', right: 8 }}
              />
            )}
            {item.status === 'Present' && (
              <Image source={require('../../../../assets/images/images/check.png')} />
            )}
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

// export default StaffHistory;



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  calendar: {
     borderRadius: 15, 
     marginTop: 50 ,
    //  height:'85%',
    minHeight: '85%',
    maxHeight: '90%',
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
    height:'80%',
    position:'relative',
    top:responsiveHeight(5)
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
