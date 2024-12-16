// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import axios from 'axios';

// const StudentDetails = () => {
//   const { studentId } = useLocalSearchParams();
//   const [student, setStudent] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchStudentDetails = async () => {
//       try {
//         const response = await axios.get(
//           `https://dreamscloudtechbackend.onrender.com/api/students/student/${studentId}`
//         );
//         setStudent(response.data);
//       } catch (error) {
//         console.error('Error fetching student details:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (studentId) {
//       fetchStudentDetails();
//     } else {
//       console.error('No studentId provided in the URL.');
//     }
//   }, [studentId]);

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!student) {
//     return (
//       <View style={styles.container}>
//         <Text>Student details not found.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Student Details</Text>
//       <Text style={styles.detail}>Student ID: {studentId}</Text>
//       <Text style={styles.detail}>Name: {student.name}</Text>
//       <Text style={styles.detail}>Email: {student.email}</Text>
//       <Text style={styles.detail}>Age: {student.age}</Text>
//       <Text style={styles.detail}>Location: {student.location}</Text>
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
//   detail: {
//     fontSize: 16,
//     marginBottom: 8,
//   },
// });

// export default StudentDetails;
