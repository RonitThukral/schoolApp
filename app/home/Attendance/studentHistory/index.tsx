// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import { Dropdown } from 'react-native-element-dropdown';

// const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

// const StudentHistory = () => {
//   const [isFocus, setIsFocus] = useState<string | null>(null);
//   const [selectedDate, setSelectedDate] = useState('');
//   const [selectedClass, setSelectedClass] = useState('');
//   const [searchQuery, setSearchQuery] = useState('');
//   const [attendance, setAttendance] = useState([]);
//   // const [students, setStudents] = useState([]);

//   // Fetch attendance data
//   const fetchAttendance = async () => {
//     try {
//       const res = await axios.get(`${baseUrl}/attendance/students`);
//       const formattedData = res.data.map((data) => ({
//         id: data._id,
//         date: formatDate(data.createdAt),
//         students: data.users,
//         role: data.role,
//         class: data.classID || 'N/A'
//       }));
//       setAttendance(formattedData);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   useEffect(() => {
//     fetchAttendance();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const month = (date.getMonth() + 1).toString().padStart(2, '0');
//     const day = date.getDate().toString().padStart(2, '0');
//     const year = date.getFullYear();
//     return `${month}/${day}/${year}`;
//   };

//   // Filter the students based on selected date
//   const getStudentsForSelectedDate = () => {
//     const dateFormatted = formatDate(new Date(selectedDate));

//     const selectedAttendance = attendance.filter(
//       (attendanceRecord) => attendanceRecord.date === dateFormatted
//     );

//     const presentStudents = selectedAttendance.flatMap((attendanceRecord) =>
//       attendanceRecord.students.map((student) => ({
//         ...student,
//         status: student.status ? 'Present' : 'Absent',
//       }))
//     );

//     return presentStudents;
//   };

//   // Filter students based on search query and selected class
//   const filteredStudents = getStudentsForSelectedDate().filter((student) =>
//     (student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//     student.userID.toLowerCase().includes(searchQuery.toLowerCase())) &&
//     (selectedClass ? student.class === selectedClass : true)
//   );

//   // Render day component with styling for selected date
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

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{height:'75%'}}>
//         <View style={{ height: 400 }}>
//           <Calendar
//             onDayPress={(day) => setSelectedDate(day.dateString)}
//             markedDates={{
//               [selectedDate]: { selected: true, marked: true, selectedColor: 'blue' },
//             }}
//             dayComponent={({ date, state }) => renderDay({ date, state })}
//             style={styles.calendar}
//             theme={{
//               textDayFontSize: 12,
//               textDayHeaderFontSize: 12,
//               textMOnthFontSize: 12,
//               textDayStyle: { padding: 2 },
//             }}
//             enableSwipeMonths={true}
//           />
//         </View>

        

//          <View style={{ marginTop: 0 }}>
//           <Dropdown
//             style={styles.dropdown}
//             placeholderStyle={styles.placeholderStyle}
//             selectedTextStyle={styles.selectedTextStyle}
//             inputSearchStyle={styles.inputSearchStyle}
//             data={attendance.map((attendance) => ({ label: attendance.class, value: attendance.class }))}
//             search
//             maxHeight={300}
//             labelField="label"
//             valueField="value"
//             placeholder={'Select Class'}
//             searchPlaceholder="Search..."
//             onFocus={() => setIsFocus('route')}
//             onBlur={() => setIsFocus(null)}
//             value={selectedClass}
//             onChange={(item) => setSelectedClass(item.value)}
//           />

//           <TextInput
//             style={styles.searchBar}
//             placeholder="Search by Id or Name"
//             value={searchQuery}
//             onChangeText={(text) => setSearchQuery(text)}
//           />

//           <View style={styles.footer}>
//             <TouchableOpacity style={styles.reset}>
//               <Text style={{ color: '#58A8F9' }}>Reset</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.search}>
//               <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, paddingHorizontal: 10 }}>
//                 Search
//               </Text>
//             </TouchableOpacity>
//           </View>

//         </View> 

//       </View>

//       <FlatList
//         data={filteredStudents}
//         keyExtractor={(item) => item._id}
//         style={styles.list}
//         contentContainerStyle={{ paddingBottom: 20 }}
//         renderItem={({ item }) => (
//           <View style={styles.studentCard}>
//             <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
//             <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
//               <Text style={styles.studentTextid}>{item.userID}</Text>
//               <Text style={styles.studentText}>{item.name}</Text>
//               <Text style={styles.studentText}>Status: {item.status}</Text>
//             </View>
//             <TouchableOpacity style={{position:'absolute',right:20}}>
//             <Image  source={require('../../../../assets/images/images/edit.png')}/>
//             </TouchableOpacity>
            
//             {item.status === 'Absent' && (
//               <Image source={require('../../../../assets/images/images/box.png')} style={{ position: 'relative', right: 50 }} />
//             )}
//             {item.status === 'Present' && <Image source={require('../../../../assets/images/images/check.png')} style={{ position: 'relative', right: 45 }}/>}
            
//           </View>
//         )}
//       />
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

// export default StudentHistory;



import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, SafeAreaView, Alert, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const StudentHistory = () => {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [attendance, setAttendance] = useState([]);
  const [isCalendarVisible, setIsCalendarVisible] = useState(true); // Calendar visibility
  const [isSearched, setIsSearched] = useState(false); // Track if search is clicked

  // Fetch attendance data
  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`${baseUrl}/attendance/students`);
      const formattedData = res.data.map((data) => ({
        id: data._id,
        date: formatDate(data.createdAt),
        students: data.users,
        role: data.role,
        class: data.classID || 'N/A'
      }));
      setAttendance(formattedData);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  // Filter students based on date and class
  const getStudentsForSelectedDateAndClass = () => {
    const dateFormatted = formatDate(new Date(selectedDate));

    const selectedAttendance = attendance.filter(
      (attendanceRecord) => 
        attendanceRecord.date === dateFormatted &&
        attendanceRecord.class === selectedClass
    );

    return selectedAttendance.flatMap((attendanceRecord) =>
      attendanceRecord.students.map((student) => ({
        ...student,
        status: student.status ? 'Present' : 'Absent',
      }))
    );
  };

  // Filter students based on search query
  const filteredStudents = getStudentsForSelectedDateAndClass().filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    student.userID.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle Class Selection
  const handleClassSelection = (item) => {
    setSelectedClass(item.value);
    setIsCalendarVisible(false); // Hide calendar after selecting class
  };

  // Handle Search Button Click
  const handleSearch = () => {
    if (!selectedDate || !selectedClass) {
      Alert.alert('Error', 'Please select both date and class before searching.');
      return;
    }
    setIsSearched(true); // Show filtered list after search
  };

  // Handle Reset Button Click
  const handleReset = () => {
    setSelectedDate('');
    setSelectedClass('');
    setSearchQuery('');
    setIsCalendarVisible(true); // Show calendar again
    setIsSearched(false); // Hide the student list
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
      <View style={{ height: '30%' }}>
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
                textSectionTitleColor: 'black',
                textSectionTitleDisabledColor: '#d9e1e8',
                textDayHeaderFontWeight: '700',
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
            data={attendance.map((attendance) => ({ label: attendance.class, value: attendance.class }))}
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
            placeholderTextColor={'grey'}
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          {/* Buttons */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.reset} onPress={handleReset}>
              <Text style={{ color: '#58A8F9' }}>Reset</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.search} onPress={handleSearch}>
              <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, paddingHorizontal: 10 }}>
                Search
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Students List - Only visible after Search */}
      {isSearched && (
        <FlatList
          data={filteredStudents}
          keyExtractor={(item) => item._id}
          style={styles.list}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.studentCard}>
              <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
              <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
                <Text style={styles.studentTextid}>{item.userID}</Text>
                <Text style={styles.studentText}>{item.name}</Text>
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
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

// export default StudentHistory;



const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  container1: { flex: 1, padding: 20, backgroundColor: 'white' ,paddingTop:'70'},
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

export default StudentHistory