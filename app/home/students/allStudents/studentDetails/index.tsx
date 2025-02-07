// import React, { useEffect, useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   ScrollView,
//   SafeAreaView,
//   ImageBackground
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
// import { useRoute } from '@react-navigation/native';
// import { useLocalSearchParams } from 'expo-router';

// const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'



// const StudentDetails = () => {
//   const { studentId } = useLocalSearchParams();
//   // console.log(studentId)
//   const [expandedSections, setExpandedSections] = useState({
//     studentInfo: true,
//     academicInfo: true,
//     guardianInfo: false,
//     contactInfo: false,
//   });
//   const [loading , setLoading] = useState(false)
//   // const [allStudents , setAllStudents] = useState([])
//   const [selectedStudent , setSelectedStudent] = useState({})



// const fetchStudents = async () => {
//   setLoading(true)
//   try {
//     const student = await fetch(`${baseUrl}/students/student/${studentId}`);
//     if (!student.ok) {
//       throw new Error('Failed to fetch students');
//     }
//     // const data = await response.json();

//     // Transform data to match the design format if needed
//     // const formattedData = data.map(student => ({
//     //   id: student._id,
//     //   name: `${student.name} ${student.surname || ''}`.trim(),
//     //   class: student.classID || 'N/A',
//     //   busRoute : student.dormitoryID || 'N/A' ,
//     //   userID : student.userID || 'N/A' 
//     // }));

//     // setAllStudents(formattedData);
//     // console.log(student)
//     setSelectedStudent(student)
//     console.log(student)
//     setLoading(false)
//   } catch (error) {
//     console.error(error.message);
//     setLoading(false)

//   } 
// };

// useEffect(() => {
// fetchStudents()
// },[])


//   const studentData = {
//     id: "PK302411",
//     name: "Ankita",
//     surname: "Gaur",
//     gender: "Female",
//     dob: "22-06-2000",
//     email: "ankita@dreamseducation.org.in",
//     caste: "Hindu",
//     category: "General",
//     admissionDate: "N/A",
//     academic: {
//       classSection: "IV-C",
//       studentStatus: "Border",
//       campus: "Roses N Lilies",
//       busRoot: "Bus No. 3",
//       scholarship: "N/A",
//       feeCategory: "P-NUR"
//     }
//   };

// // const findStudent = () => {
// //   const student = allStudents.map((student) => {
// //     student.id === id 
// //   })
// //   console.log(student)
// //   setSelectedStudent(student)
// // }

//   const toggleSection = (section) => {
//     setExpandedSections(prev => ({
//       ...prev,
//       [section]: !prev[section]
//     }));
//   };

//   const InfoRow = ({ label, value }) => (
//     <View style={styles.infoRow}>
//       <Text style={styles.label}>{label}</Text>
//       <View style={{position:'absolute', left:130, top:3}}>

//       <Text style={styles.value}>{value}</Text>
//       </View>
//     </View>
//   );

//   const Section = ({ title, isExpanded, onPress, children }) => (
//     <View style={styles.section}>
//       <TouchableOpacity 
//         style={styles.sectionHeader} 
//         onPress={onPress}
//         activeOpacity={0.7}
//       >
//         <Text style={styles.sectionTitle}>{title}</Text>
//         <Ionicons 
//           name={isExpanded ? "chevron-up" : "chevron-down"} 
//           size={24} 
//           color="#58A8F9"
//         />
//       </TouchableOpacity>
//       {isExpanded && (
//         <View style={styles.sectionContent}>
//           {children}
//         </View>
//       )}
//     </View>
//   );

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView contentContainerStyle={styles.scrollViewContent}>

//         {/* Profile Section */}
//         <View
//           style={styles.headerBackground}
//         >
//           <Image source={require('../../../../../assets/images/images/union.png')}/>
//           <View style={styles.profileSection}>
//             <View style={styles.avatarContainer}>
//               <Image
//                 source={require('../../../../../assets/images/images/girl.png')} // Add your placeholder image
//                 style={styles.avatar}
//               />
//               <View style={styles.verifiedBadge}>
//                 <Image source={require('../../../../../assets/images/images/editwhite.png')}/>
//               </View>
//             </View>
//             <View style={styles.profileInfo}>
//               <Text style={styles.studentId}>{studentData.id}</Text>
//               <Text style={styles.studentName}>
//                 {`${studentData.name} ${studentData.surname}`}
//               </Text>
//             </View>
//           </View>
//         </View>
        
//         <View style={[expandedSections.studentInfo ? styles.rule1 : styles.rule2]}></View>

//         {/* Student Information Section */}
//         <Section
//           title="Student Information"
//           isExpanded={expandedSections.studentInfo}
//           onPress={() => toggleSection('studentInfo')}
//         >
//           <InfoRow label="Name" value={selectedStudent?.name} />
//           <InfoRow label="Surname" value={studentData.surname} />
//           <InfoRow label="Gender" value={studentData.gender} />
//           <InfoRow label="DOB" value={studentData.dob} />
//           <InfoRow label="Email" value={studentData.email} />
//           <InfoRow label="Caste" value={studentData.caste} />
//           <InfoRow label="Category" value={studentData.category} />
//           <InfoRow label="Admission Date" value={studentData.admissionDate} />
//         </Section>


//         <View style={[expandedSections.academicInfo ? styles.rule1 : styles.rule2]}></View>


//         {/* Academic Information Section */}
//         <Section
//           title="Academic Information"
//           isExpanded={expandedSections.academicInfo}
//           onPress={() => toggleSection('academicInfo')}
//         >
//           <InfoRow label="Class/Section" value={studentData.academic.classSection} />
//           <InfoRow label="Student Status" value={studentData.academic.studentStatus} />
//           <InfoRow label="Campus" value={studentData.academic.campus} />
//           <InfoRow label="Bus Root" value={studentData.academic.busRoot} />
//           <InfoRow label="Scholarship" value={studentData.academic.scholarship} />
//           <InfoRow label="Fee Category" value={studentData.academic.feeCategory} />
//         </Section>


//         <View style={[expandedSections.guardianInfo ? styles.rule1 : styles.rule2]}></View>


//         {/* Guardian Information Section */}
//         <Section
//           title="Guardian Information"
//           isExpanded={expandedSections.guardianInfo}
//           onPress={() => toggleSection('guardianInfo')}
//         >
//           {/* Add guardian information content here */}
//         </Section>

//         <View style={[expandedSections.contactInfo ? styles.rule1 : styles.rule2]}></View>


//         {/* Contact Information Section */}
//         <Section
//           title="Contact Information"
//           isExpanded={expandedSections.contactInfo}
//           onPress={() => toggleSection('contactInfo')}
//         >
//           {/* Add contact information content here */}
//         </Section>

//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#F5F5F5',
//     backgroundColor: 'white',
//   },
//   scrollViewContent: {
//     paddingBottom: 20, // Add space at the bottom to prevent the last item from being cut off
//   },
//   headerBackground: {
//     width: '100%',
//     height: 300, // Adjust height according to your design
//     backgroundColor:'#daedff',
  
//   },
//   profileSection: {
//     position:'absolute',
//     bottom: 25,
//     flexDirection: 'column',
//     alignItems: 'center',
//     alignSelf:'center',
//     marginTop: 25,
//     padding: 16,
//   },
//   avatarContainer: {
//     position: 'relative',
//     right:15,
//     top:25
//   },
//   avatar: {
//     width: 100,
//     height: 100,
//     borderRadius: 100,
//     backgroundColor: '#DDD',
//   },
//   verifiedBadge: {
//     position: 'absolute',
//     top: 0,
//     right: 0,
//     backgroundColor: '#58A8F9',
//     borderRadius: 12,
//     width: 27,
//     height: 27,
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderWidth: 2,
//     borderColor: '#daedff',
//   },
//   profileInfo: {
//     marginTop: 10,
//     alignItems: 'center',
//   },
//   studentId: {
//     color: '#58A8F9',
//     fontSize: 24,
//     marginTop:15,
//     marginRight: 20

//   },
//   studentName: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 10,
//     marginRight: 15

//   },
//   section: {
//     width:"90%",
//     alignSelf:'center',
//     marginTop: 5,
   
//   },
//   sectionHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     // backgroundColor: '#F8F8F8',
//     backgroundColor: 'transparent',
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   sectionContent: {
//     padding: 16,
//     width:"90%",
//     alignSelf:'center',
//     height:'auto',
//     backgroundColor: '#FFF',
//     // backgroundColor: 'red',
//     marginHorizontal: 16,
//     borderRadius: 10,
//     overflow: 'hidden',
//     elevation: 4, // Adds shadow for Android
//     shadowColor: '#000', // Adds shadow for iOS
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     borderColor :'grey',
//     borderWidth:0.2,
    
    
//   },
  
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 1,
//   },
//   label: {
//     fontWeight:'bold',
//     color: '#666',
//     fontSize: 11.5,
//   },
//   value: {
//     color:'grey',
//     fontSize: 11.5,
//   },
//   rule1:{
//     height:0.5, 
//     width:'70%',
//     borderWidth:0.5,
//     borderColor:'grey', 
//     alignSelf:'center',
//     position:'fixed', 
//     top:62
//   },
//   rule2:{
//     height:0.5, 
//     width:'80%',
//     borderWidth:0.5,
//     borderColor:'grey', 
//     alignSelf:'center',
//     position:'fixed', 
//     top:70
//   }
// });

// export default StudentDetails;







import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'; // Handle null or undefined dates
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(date);
};

const StudentDetails = () => {
  const { studentId } = useLocalSearchParams();
  const [expandedSections, setExpandedSections] = useState({
    studentInfo: true,
    academicInfo: true,
    guardianInfo: false,
    contactInfo: false,
  });
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [campus, setCampus] = useState(null);
  const [scholar, setScholar] = useState(null);
  const [bus, setBus] = useState(null);
  const [div, setDiv] = useState(null);
  const [sec, setSec] = useState(null);


  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    return `${date.getDate()} ${date.toLocaleString("en-US", { month: "long" })} ${date.getFullYear()}`;
  };
  



  const fetchStudentDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/students/student/${studentId}`);
      const data = await response.json();
      if (data.success) {
        setSelectedStudent(data.student);
      } else {
        console.error('Failed to fetch student details');
      }
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchStudentDetails();
    }
  }, [studentId]);



  useEffect(() => {
    if (selectedStudent) {  // Only fetch after student details are set
      fetchScholarship();
      fetchCampuses();
      fetchBus();
      fetchDiv();
      fetchSec();
    }
  }, [selectedStudent]);  // This will trigger only after selectedStudent is set
  
  const fetchBus = async () => {
    if (!selectedStudent?.dormitoryID) return;  // Check that dormitoryID exists
    try {
      const response = await axios.get(`${baseUrl}/dormitories/${selectedStudent.dormitoryID}`);
      setBus(response?.data?.doc?.name);
    } catch (error) {
      console.error("Error fetching BUS:", error);
    }
  };
  
  const fetchCampuses = async () => {
    if (!selectedStudent?.campusID) return;  // Check that campusID exists
    try {
      const response = await axios.get(`${baseUrl}/campuses/${selectedStudent.campusID}`);
      setCampus(response.data?.docs?.name);
    } catch (error) {
      console.error("Error fetching campuses:", error);
    }
  };
  
  const fetchDiv = async () => {
    if (!selectedStudent?.division) return;  // Check that division exists
    try {
      const response = await axios.get(`${baseUrl}/divisions`);
      const div = response.data.find((div) => div._id === selectedStudent.division);
      setDiv(div?.name);
    } catch (error) {
      console.error("Error fetching DIVISIONS:", error);
    }
  };
  
  const fetchSec = async () => {
    if (!selectedStudent?.section) return;  // Check that section exists
    try {
      const response = await axios.get(`${baseUrl}/sections/${selectedStudent.section}`);
      setSec(response.data?.doc?.name);
    } catch (error) {
      console.error("Error fetching SECTION:", error);
    }
  };
  
  const fetchScholarship = async () => {
    if (!selectedStudent?.scholarship) return; // Check that scholarship exists
    try {
      const response = await axios.get(`${baseUrl}/scholarships/${selectedStudent.scholarship}`);
      
      if (response.data?.doc) {
        setScholar(response.data.doc.name);
      } else {
        console.warn("Scholarship data is missing or incorrect:", response.data);
        // setScholar("N/A"); // Set a default value if the scholarship is not found
      }
    } catch (error) {
      console.error("Error fetching SCHOLARSHIP:", error);
      // setScholar("N/A"); // Handle the error gracefully
    }
  };
  
  


  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };



  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ position: 'absolute', left: 130, top: 3 }}>
        <Text style={styles.value}>{value || 'N/A'}</Text>
      </View>
    </View>
  );

  const Section = ({ title, isExpanded, onPress, children }) => (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <AntDesign
          name={isExpanded ? 'up' : 'down'}
          size={24}
          color="#58A8F9"
        />
      </TouchableOpacity>
      {isExpanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator style={{position:'relative',
    top:'50%'}} size="large" color="#58A8F9" />
      </SafeAreaView>
    );
  }

  if (!selectedStudent) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Student details not found.</Text>
      </SafeAreaView>
    );
  }

  const studentData = selectedStudent;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>
        <View style={styles.headerBackground}>
          <Image source={require('../../../../../assets/images/images/union.png')}/>

          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../../../../assets/images/images/girl.png')}
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Image
                  source={require('../../../../../assets/images/images/editwhite.png')}
                />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.studentId}>{studentData.userID}</Text>
              <Text style={styles.studentName}>
                {`${studentData.name} ${studentData.middleName || ''} ${studentData.surname}`}
              </Text>
            </View>
          </View>
        </View>

        <ScrollView contentContainerStyle={{paddingBottom:30}}>

        <View
          style={[expandedSections.studentInfo ? styles.rule1 : styles.rule2]}
        ></View>

        <Section
          title="Student Information"
          isExpanded={expandedSections.studentInfo}
          onPress={() => toggleSection('studentInfo')}
        >
          <InfoRow label="Name" value={studentData.name} />
          <InfoRow label="Middle Name" value={studentData.middleName} />
          <InfoRow label="Surname" value={studentData.surname} />
          <InfoRow label="Gender" value={studentData.gender} />
          <InfoRow label="Date of Birth" value={formatDate(studentData.dateofBirth)} />
          <InfoRow label="Nationality" value={studentData.nationality} />
          <InfoRow label="Religion" value={studentData.religion} />
          <InfoRow label="Place of Birth" value={formatDate(studentData.placeOfBirth)} />
        </Section>

        <View
          style={[expandedSections.academicInfo ? styles.rule1 : styles.rule2]}
        ></View>

        <Section
          title="Academic Information"
          isExpanded={expandedSections.academicInfo}
          onPress={() => toggleSection('academicInfo')}
        >
          <InfoRow label="Class" value={studentData.classID} />
          <InfoRow label="Division" value={div || 'N/A'} />
          <InfoRow label="Section" value={sec || 'N/A'} />
          <InfoRow label="Dormitory ID" value={bus || 'N/A'} />
          <InfoRow label="Campus ID" value={campus || 'N/A'} />
          <InfoRow label="Scholarship" value={scholar || 'N/A'} />
          <InfoRow label="Fees" value={studentData.fees} />
        </Section>

        <View
          style={[expandedSections.guardianInfo ? styles.rule1 : styles.rule2]}
        ></View>

        <Section
          title="Guardian Information"
          isExpanded={expandedSections.guardianInfo}
          onPress={() => toggleSection('guardianInfo')}
        >
          {studentData.guadian.map((guardian) => (
            <View key={guardian._id}>
              <InfoRow label="Name" value={guardian.name} />
              <InfoRow label="Relationship" value={guardian.relationship} />
              <InfoRow label="Mobile" value={guardian.mobile} />
              <InfoRow label="Email" value={guardian.email} />
              <InfoRow label="Occupation" value={guardian.occupation} />
              <InfoRow label="Address" value={guardian.address} />
            </View>
          ))}
        </Section>

        <View
          style={[expandedSections.contactInfo ? styles.rule1 : styles.rule2]}
        ></View>

        <Section
          title="Contact Information"
          isExpanded={expandedSections.contactInfo}
          onPress={() => toggleSection('contactInfo')}
        >
          <InfoRow label="Mobile Number" value={studentData.mobilenumber} />
          <InfoRow label="Telephone" value={studentData.telephone} />
          <InfoRow label="Postal Address" value={studentData.postalAddress} />
          <InfoRow label="Physical Address" value={studentData.physicalAddress} />
        </Section>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
    backgroundColor: 'white',
    
  },
  scrollViewContent: {
    flex:1
    // paddingBottom: 20, // Add space at the bottom to prevent the last item from being cut off
  },
  headerBackground: {
    width: '100%',
    height: 300, // Adjust height according to your design
    backgroundColor:'#daedff',
  
  },
  profileSection: {
    position:'absolute',
    bottom: 25,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 25,
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    right:15,
    top:25
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#DDD',
  },
  verifiedBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#58A8F9',
    borderRadius: 12,
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#daedff',
  },
  profileInfo: {
    marginTop: 10,
    alignItems: 'center',
  },
  studentId: {
    color: '#58A8F9',
    fontSize: 24,
    marginTop:15,
    marginRight: 20

  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginRight: 15

  },
  section: {
    width:"90%",
    alignSelf:'center',
    marginTop: 5,
   
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    // backgroundColor: '#F8F8F8',
    backgroundColor: 'transparent',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContent: {
    padding: 16,
    width:"90%",
    alignSelf:'center',
    height:'auto',
    backgroundColor: '#FFF',
    // backgroundColor: 'red',
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderColor :'grey',
    borderWidth:0.2,
    
    
  },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 1,
  },
  label: {
    fontWeight:'bold',
    color: '#666',
    fontSize: 11.5,
    paddingLeft:responsiveWidth(2)

  },
  value: {
    color:'grey',
    fontSize: 11.5,
    paddingLeft:responsiveWidth(3)
  },
  rule1:{
    height:0.5, 
    width:'70%',
    borderWidth:0.5,
    borderColor:'grey', 
    alignSelf:'center',
    position:'fixed', 
    top:62
  },
  rule2:{
    height:0.5, 
    width:'80%',
    borderWidth:0.5,
    borderColor:'grey', 
    alignSelf:'center',
    position:'fixed', 
    top:70
  }
});

export default StudentDetails;
