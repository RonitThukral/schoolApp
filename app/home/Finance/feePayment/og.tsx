





// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert, SafeAreaView } from 'react-native';
// import axios from 'axios';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { Dropdown } from 'react-native-element-dropdown';

// // Constants for dropdown options
// const Term = [
//   { label: '1st Term', value: '1' },
//   { label: '2nd Term', value: '2' },
//   { label: '3rd Term', value: '3' }
// ];

// const AcademicYear = [
//   { label: '2024', value: '2024' },
//   { label: '2025', value: '2025' },
//   { label: '2026', value: '2026' }
// ];

// const baseUrl = "https://dreamscloudtechbackend.onrender.com/api";

// const SearchStudentScreen = ({ navigation }) => {
//   const [selectedYear, setSelectedYear] = useState(null);
//   const [selectedTerm, setSelectedTerm] = useState(null);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/classes`);
//       const formattedData = response.data.map((cls) => ({
//         label: cls.name,
//         value: cls.classCode
//       }));
//       setClasses(formattedData);
//     } catch (error) {
//       console.error('Error fetching classes:', error.message);
//     }
//   };

//   const fetchStudents = async () => {
//     if (!selectedYear || !selectedTerm || !selectedClass) {
//       Alert.alert('Error', 'Please select Academic Year, Term, and Class.');
//       return;
//     }
//     setLoading(true);
//     try {
//       const res = await axios.get(`${baseUrl}/students/class/${selectedClass}`);
//       const studentsData = res.data.users || [];
//       const enrichedStudents = await Promise.all(
//         studentsData.map(async (student) => {
//           const feesRes = await axios.get(`${baseUrl}/fees/type/${student.classID}/${student.status}`);
//           const transactionsRes = await axios.get(`${baseUrl}/transactions/student/${student.userID}`);
//           return {
//             ...student,
//             fees: feesRes.data || {},
//             transactions: transactionsRes.data || []
//           };
//         })
//       );
//       setStudents(enrichedStudents);
//     } catch (error) {
//       console.error('Error fetching students:', error.message);
//     }
//     setLoading(false);
//   };

//   const calculatePaymentStatus = (student) => {
//     const fees = student?.fees || {};
//     const transactions = student?.transactions || [];
//     let totalFee = Object.values(fees).reduce((sum, fee) => sum + Number(fee || 0), 0);
//     const totalPaid = transactions.reduce((sum, txn) => sum + Number(txn.amount || 0), 0);
//     const balance = totalFee - totalPaid;
//     return { status: balance === 0 ? 'Fully Paid' : 'Pending', balance };
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View>
//         <Dropdown
//           style={styles.dropdown}
//           data={AcademicYear}
//           labelField="label"
//           valueField="value"
//           placeholder="Select Academic Year"
//           value={selectedYear}
//           onChange={(item) => setSelectedYear(item.value)}
//         />
//         <Dropdown
//           style={styles.dropdown}
//           data={Term}
//           labelField="label"
//           valueField="value"
//           placeholder="Select Term"
//           value={selectedTerm}
//           onChange={(item) => setSelectedTerm(item.value)}
//         />
//         <Dropdown
//           style={styles.dropdown}
//           data={classes}
//           labelField="label"
//           valueField="value"
//           placeholder="Select Class"
//           value={selectedClass}
//           onChange={(item) => setSelectedClass(item.value)}
//         />
//         <TouchableOpacity style={styles.searchButton} onPress={fetchStudents}>
//           <Text style={styles.searchButtonText}>Search</Text>
//         </TouchableOpacity>
//       </View>
//       <FlatList
//         data={students}
//         keyExtractor={(item) => item.userID}
//         renderItem={({ item }) => {
//           const { status, balance } = calculatePaymentStatus(item);
//           return (
//             <TouchableOpacity
//               style={styles.studentCard}
//               onPress={() => navigation.navigate('StudentDetails', { studentID: item.userID })}
//             >
//               <Image source={require('../../assets/images/boy.png')} style={styles.img} />
//               <View>
//                 <Text style={styles.studentName}>{item.name}</Text>
//                 <Text style={status === 'Fully Paid' ? styles.paid : styles.pending}>
//                   {status} (Balance: ₹{balance})
//                 </Text>
//               </View>
//               <AntDesign name="right" size={24} color="#58A8F9" />
//             </TouchableOpacity>
//           );
//         }}
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 20 },
//   dropdown: { marginVertical: 10, height: 50, backgroundColor: '#f9f9f9', borderRadius: 8 },
//   searchButton: { backgroundColor: '#58A8F9', padding: 10, borderRadius: 5, marginTop: 10 },
//   searchButtonText: { color: 'white', textAlign: 'center' },
//   studentCard: { flexDirection: 'row', alignItems: 'center', marginVertical: 10, backgroundColor: '#f0f0f0', padding: 10, borderRadius: 8 },
//   img: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
//   studentName: { fontSize: 16, fontWeight: 'bold' },
//   paid: { color: 'green' },
//   pending: { color: 'red' }
// });

// export default SearchStudentScreen;



// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import { Dropdown } from 'react-native-element-dropdown';
// import { useRouter } from 'expo-router';
// import axios from 'axios';

// const Term = [
//   { label: '1', value: '1' },
//   { label: '2', value: '2' },
//   { label: '3', value: '3' }
// ];

// const AcademicYear = [
//   { label: '2024', value: '2024' },
//   { label: '2026', value: '2026' },
//   { label: '2027', value: '2027' },
//   { label: '2029', value: '2029' }
// ];

// const baseUrl = "https://dreamscloudtechbackend.onrender.com/api";

// const FeePayment = () => {
//   const [isFocus, setIsFocus] = useState<string | null>(null);
//   const [selectedTerm, setSelectedTerm] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(null);
//   const [selectedClass, setSelectedClass] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [classes, setClasses] = useState([]);
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [classStudents, setClassStudents] = useState([]);
//   const [paid, setPaid] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     fetchClasses();
//   }, []);

//   const fetchClasses = async () => {
//     try {
//       const response = await axios.get(`${baseUrl}/classes`);
//       const formattedData = response.data.map((cls) => ({
//         label: cls.name,
//         value: cls.classCode
//       }));
//       setClasses(formattedData);
//     } catch (error) {
//       console.error('Error fetching classes:', error.message);
//     }
//   };

//   const fetchStudents = async () => {
//     if (!selectedYear || !selectedTerm || !selectedClass) {
//       Alert.alert('Error', 'Please select Academic Year, Term, and Class.');
//       return;
//     }
//     try {
//       const res = await axios.get(`${baseUrl}/students/class/${selectedClass}`);
//       const studentsData = res.data.users || [];
//       const enrichedStudents = await Promise.all(
//         studentsData.map(async (student) => {
//           const feesRes = await axios.get(`${baseUrl}/fees/type/${student.classID}/${student.status}`);
//           const transactionsRes = await axios.get(`${baseUrl}/transactions/student/${student.userID}`);
//           return {
//             ...student,
//             fees: feesRes.data || {},
//             transactions: transactionsRes.data || []
//           };
//         })
//       );
//       setStudents(enrichedStudents);
//     } catch (error) {
//       console.error('Error fetching students:', error.message);
//     }
//   };

//   const calculatePaymentStatus = (student) => {
//     const fees = student?.fees || {};
//     const transactions = student?.transactions || [];
//     let totalFee = Object.values(fees).reduce((sum, fee) => sum + Number(fee || 0), 0);
//     const totalPaid = transactions.reduce((sum, txn) => sum + Number(txn.amount || 0), 0);
//     const balance = totalFee - totalPaid;
//     return { status: balance === 0 ? 'Fully Paid' : 'Pending', balance };
//   };

//   const handleReset = () => {
//     setClassStudents([]);
//     setSelectedClass(null);
//     setSelectedStudent(null);
//     setSelectedYear(null);
//     setSelectedTerm(null);
//   };

//   const handlePress = () => {
//     router.navigate('./feeDetails');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={{ height: '40%' }}>
//         <View style={{ marginTop: 50 }}>
//         <Dropdown
//           style={styles.dropdown}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           data={AcademicYear}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'Select Academic Year'}
//           searchPlaceholder="Search..."
//           onFocus={() => setIsFocus('route')}
//           onBlur={() => setIsFocus(null)}
//           value={selectedYear}
//           onChange={(item) => setSelectedYear(item.value)}
//         />
//           <Dropdown
//             style={styles.dropdown}
//             data={Term}
//             labelField="label"
//             valueField="value"
//             placeholder={'Select Term'}
//             value={selectedTerm}
//             onChange={(item) => setSelectedTerm(item.value)}
//           />
//            <Dropdown
//           style={styles.dropdown}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           data={classes}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'Select Class'}
//           searchPlaceholder="Search..."
//           onFocus={() => setIsFocus('route')}
//           onBlur={() => setIsFocus(null)}
//           value={selectedClass}
//           onChange={(item) => setSelectedClass(item.value)}
//         />
//           <TouchableOpacity style={styles.search} onPress={fetchStudents}>
//             <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Search</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <FlatList
//         data={students}
//         keyExtractor={(item) => item.userID}
//         renderItem={({ item }) => {
//           const { status, balance } = calculatePaymentStatus(item);
//           return (
//             <TouchableOpacity style={styles.studentCard} onPress={handlePress}>
//               <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
//               <View>
//                 <Text>{item.name}</Text>
//                 <Text style={status === 'Fully Paid' ? styles.paid : styles.pending}>
//                   {status} (Balance: ₹{balance})
//                 </Text>
//               </View>
//               <AntDesign name="right" size={24} color="#58A8F9" />
//             </TouchableOpacity>
//           );
//         }}
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
//     paddingHorizontal: 15

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
//   paid:{
//     width:70,
//     height:20, 
//     backgroundColor:'#daf6cb',
//     borderRadius:15, 
//     position:'relative',
//     left:55
//   },
//   paidText:{
//     textAlign:'center',
//     paddingTop:3,
//     fontSize:10,
//     color:'green'
//   },
//   pending:{
//     width:70,
//     height:20, 
//     backgroundColor:'#ff7c7c',
//     borderRadius:15, 
//     position:'relative',
//     left:55
//   },
//   pendingText:{
//     textAlign:'center',
//     paddingTop:2,
//     fontSize:10,
//     color:'green'
//   }
// });

// export default FeePayment;
