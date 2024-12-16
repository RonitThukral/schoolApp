// import React, { useState, useEffect } from 'react';
// import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { useRouter } from 'expo-router';
// import axios from 'axios';

// const AllStudents = () => {
//   const [students, setStudents] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchStudents = async () => {
//       try {
//         const response = await axios.get('https://dreamscloudtechbackend.onrender.com/api/students');
//         setStudents(response.data);
//       } catch (error) {
//         console.error('Error fetching students:', error);
//       }
//     };

//     fetchStudents();
//   }, []);

//   const handleSelectStudent = (studentId) => {
//     router.push(`/home/students/allStudents/studentDetails?studentId=${studentId}`);
//     console.log('Navigating to studentDetails with studentId:', studentId);
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.item}
//       onPress={() => handleSelectStudent(item.userID)}
//     >
//       <Text style={styles.name}>{item.name}</Text>
//       <Text style={styles.id}>ID: {item.userID}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>All Students</Text>
//       <FlatList
//         data={students}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.userID.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 16,
//   },
//   item: {
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//   },
//   name: {
//     fontSize: 16,
//   },
//   id: {
//     fontSize: 14,
//     color: '#555',
//   },
// });

// export default AllStudents;
