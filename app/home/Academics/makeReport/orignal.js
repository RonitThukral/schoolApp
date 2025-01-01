// import React, { useEffect, useState,useCallback } from 'react';
//   import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView , TextInput,KeyboardAvoidingView,Alert} from 'react-native';
//   import { Dropdown } from 'react-native-element-dropdown';
// //   import AntDesign from '@expo/vector-icons/AntDesign';
// // import { useRouter } from 'expo-router';
// import axios from 'axios';


// const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'

// const term = [
//   {label: "1", value: '1'},
//   {label: "2", value: '2'},
//   {label: "3", value: '3'}
// ]



//   // const studentData = [
//   //   {
//   //     "id": "BK202408",
//   //     "name": "Deepak Kumar",
//   //     "class": "10A",
//   //     "course": "Course 1",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 1"
//   //   },
//   //   {
//   //     "id": "BK202409",
//   //     "name": "Rohan Sharma",
//   //     "class": "10A",
//   //     "course": "Course 2",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 2"
//   //   },
//   //   {
//   //     "id": "3",
//   //     "name": "John Doe",
//   //     "class": "10A",
//   //     "course": "Course 3",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 3"
//   //   },
//   //   {
//   //     "id": "4",
//   //     "name": "John Doe",
//   //     "class": "10A",
//   //     "course": "Course 4",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 1"
//   //   },
//   //   {
//   //     "id": "5",
//   //     "name": "Jane Smith",
//   //     "class": "9B",
//   //     "course": "Course 5",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 2"
//   //   },
//   //   {
//   //     "id": "6",
//   //     "name": "Michael Brown",
//   //     "class": "11C",
//   //     "course": "Course 6",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 3"
//   //   },
//   //   {
//   //     "id": "7",
//   //     "name": "Emily Davis",
//   //     "class": "10A",
//   //     "course": "Course 7",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 1"
//   //   },
//   //   {
//   //     "id": "8",
//   //     "name": "Daniel Johnson",
//   //     "class": "8A",
//   //     "course": "Course 8",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 2"
//   //   },
//   //   {
//   //     "id": "9",
//   //     "name": "Sophia Wilson",
//   //     "class": "12B",
//   //     "course": "Course 9",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 3"
//   //   },
//   //   {
//   //     "id": "10",
//   //     "name": "Matthew Miller",
//   //     "class": "9C",
//   //     "course": "Course 10",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 1"
//   //   },
//   //   {
//   //     "id": "11",
//   //     "name": "James Taylor",
//   //     "class": "8B",
//   //     "course": "Course 11",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 2"
//   //   },
//   //   {
//   //     "id": "12",
//   //     "name": "Charlotte",
//   //     "class": "10C",
//   //     "course": "Course 12",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 3"
//   //   },
//   //   {
//   //     "id": "13",
//   //     "name": "Aarav Gupta",
//   //     "class": "11A",
//   //     "course": "Course 13",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 1"
//   //   },
//   //   {
//   //     "id": "14",
//   //     "name": "Ishita Kapoor",
//   //     "class": "9A",
//   //     "course": "Course 14",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 2"
//   //   },
//   //   {
//   //     "id": "15",
//   //     "name": "Nikhil Verma",
//   //     "class": "12A",
//   //     "course": "Course 15",
//   //     "academicYear": "2024-2025",
//   //     "term": "Term 3"
//   //   }
//   // ]
  
//   const DropdownComponent = () => {
//     const [examPercentage, setExamPercentage] = useState(null)
//     // const [examwork, setExamwork] = useState(null)
//     // const [classWork, setClassWork] = useState(null)
//     const [classMarks, setClassMarks] = useState(null)
//     const [examMarks, setExamMarks] = useState(null)
//     const [isOpen, setIsOpen] = useState(false)
//     const [submitMarks, setSubmitMarks] = useState(false)
//     const [examPercentage1, setExamPercentage1] = useState('');
//     const [classWorkPercentage1, setClassWorkPercentage1] = useState('');
//     const [classWorkPercentage, setClassWorkPercentage] = useState('');

//     const [isFocus, setIsFocus] = useState<string | null>(null);
//     const [selectedTerm, setSelectedTerm] = useState(null);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [selectedYear, setSelectedYear] = useState(null);
    
//     const [filteredStudents, setFilteredStudents] = useState([]);
// const [isVisible, setIsVisible] = useState(false)

//     const [classes, setClasses] = useState([]);
//     const [courses, setCourses] = useState([]);
//     const [years, setYears] = useState([]);
   
//     const [data, setData] = useState(null);
//     const [students, setStudents] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [loadingSubmit, setLoadingSubmit] = useState(false);
//     const [editModalVisible, setEditModalVisible] = useState(false);
//     const [percentageModalVisible, setPercentageModalVisible] = useState(false);
//     const [selectedStudent, setSelectedStudent] = useState(null);
//     const [error, setError] = useState(null);


//     const fetchInitialData = async () => {
//       try {
//         const classesResponse = await axios.get('https://dreamscloudtechbackend.onrender.com/api/classes');
//         setClasses(classesResponse.data || []);
        
//         const yearResponse = await axios.get('https://dreamscloudtechbackend.onrender.com/api/yeargroup');
//         setYears(yearResponse.data || []);
        
//       } catch (err) {
//         console.error('Error fetching initial data:', err);
//       } 
//     };

//     const fetchCourses = async () => {
    
//       try {
//         // setLoadingData(prev => ({ ...prev, courses: true }));
//         const response = await axios.get(`${baseUrl}/courses/class/${selectedClass}`);
//         setCourses(response.data?.docs.map((course) => ({
//           label: course.name,
//           value: course.code
//         })));
//       } catch (err) {
//         console.error('Error fetching courses:', err);
//       } 
//     };


//    const fetchStudents = async() => {
    
//     try {
//       const res = await axios.get(`${baseUrl}/classes/classCode/${selectedClass}`)
//       if (selectedClass && (!res.data.docs?.sba || res.data.docs?.sba === false)){
//         Alert.alert('No SBA Data', 'SBA data is not available for the selected class.')
//         return;
//       }

//       const response = await axios.get(`${baseUrl}/sba/${selectedClass}/${selectedCourse}/${selectedYear}/${selectedTerm}`)

//       const dataa = response?.data?.docs
//       const students = response?.data?.docs?.students
//       // console.log('response:  ', students)

//       // setStudents(fetchedData.students?.sort((a, b) => b.total - a.total) || []);
//       setData(dataa)
//       setClassMarks(dataa.classWork || '');
//       setExamMarks(dataa.exam || '');
//       setExamPercentage(dataa.examPercentage || '');
//       setClassWorkPercentage(dataa.classWorkPercentage || '');
//       setExamPercentage1(dataa.examPercentage || '');
//       setClassWorkPercentage1(dataa.classWorkPercentage || '');

//       setClassWorkPercentage(response?.data?.docs?.classWorkPercentage)
//       setFilteredStudents(students || [])
//     } catch (error) {
      
//     }
//     }


//     const updateStudentPercentages = useCallback((students, examMark, classWorkMark, examPercentage, classWorkPercentage) => {
//       return students.map(student => {
//         if (student.exam && student.classWork) {
//           const examScore = (Number(student.exam) / Number(examMark)) * (Number(examPercentage) / 100);
//           const classWorkScore = (Number(student.classWork) / Number(classWorkMark)) * (Number(classWorkPercentage) / 100);
//           return {
//             ...student,
//             examPercentage: Math.round(examScore * 100),
//             classWorkPercentage: Math.round(classWorkScore * 100),
//             total: Math.round((examScore + classWorkScore) * 100)
//           };
//         }
//         return student;
//       });
//     }, []);
  
//     useEffect(() => {
//       fetchInitialData();
//       fetchCourses();
//       fetchStudents();
//     }, [selectedClass]);
  
  
//    // Search Button Logic
//   const handleSearch = () => {
//     if (!selectedClass|| !selectedTerm|| !selectedCourse|| !selectedYear) {
//       return Alert.alert("Please select all fields");
//     }
//     setIsVisible(true)
//     fetchStudents()
//   };


//   const handleSetPercentage = async (newExamPercentage, newClassWorkPercentage) => {
//     if (!data?._id) {
//       setError('Invalid class ID for updating percentages.');
//       return;
//     }

//     setLoadingSubmit(true);
//     try {
//       const updatedStudents = updateStudentPercentages(filteredStudents, examMarks, classMarks, newExamPercentage, newClassWorkPercentage);
      
//       await axios.put(`https://dreamscloudtechbackend.onrender.com/api/sba/update/${data?._id}`, {
//         examPercentage: examPercentage1,
//         classWorkPercentage: classWorkPercentage1,
//         // students: updatedStudents,
//         exam: examMarks,
//         classWork: classMarks
//       });
      
//       setExamPercentage1(examPercentage1);
//       setClassWorkPercentage1(classWorkPercentage1);
//       setStudents(updatedStudents);
//       setIsOpen(false);
//     } catch (error) {
//       console.error('Set percentage error:', error);
//       setError('Failed to update percentages. Please try again.');
//     } finally {
//       setLoadingSubmit(false);
//     }
//   };

//   // Reset Button Logic
//   const handleReset = () => {
//     setSelectedTerm(null);
//     setSelectedCourse(null);
//     setSelectedYear(null);
//     setSelectedClass(null);
//     setFilteredStudents([]);
//     setIsVisible(false)
//   };

//   const handleClose =() => {
//     setIsOpen(false)
//   }
//   const handleCancel =() => {
//     setSubmitMarks(false)
//   }
   

//     const handleFocus = (id:string) => {
//       setIsFocus(id)
//     }

//     const handleBlur = () => {
//       setIsFocus(null)
//     }

   

//     const handleSetPercentage1 = () => {
//       setIsOpen(true)
//     }
   

//     const handleSetMarks = () => {
//       setSubmitMarks(true)
//     }
   

//     return (
//         <>
//         {/* <KeyboardAvoidingView enabled= {true} behavior='padding'> */}

//       <View style={styles.container}>
//         {/* {renderLabel(value)} */}
//         <Dropdown
//           style={[styles.dropdown,]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           data={classes.map((cls) => ({label: cls.name, value: cls.classCode}))}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'Select Class'}
//           searchPlaceholder="Search..."
//           onFocus={() => handleFocus('student')}
//           onBlur={handleBlur}
//           value={selectedClass}
//           onChange={(item) => setSelectedClass(item.value)}
       
//         />
      
//       {courses.length > 0 && <Dropdown
//           style={[styles.dropdown,]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           data={courses}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'Select Course'}
//           searchPlaceholder="Search..."
//           onFocus={() => handleFocus('name')}
//           onBlur={handleBlur}
//           value={selectedCourse}
//           onChange={(item) => setSelectedCourse(item.value)}
       
//         />}
      
      
//       {courses.length > 0 &&  <Dropdown
//           style={[styles.dropdown,]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           data={years.map((y) => ({label: y.year, value: y.year}))}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'Select Acedemic Year'}
//           searchPlaceholder="Search..."
//           onFocus={() => handleFocus('class')}
//           onBlur={handleBlur}
//           value={selectedYear}
//           onChange={(item) => setSelectedYear(item.value)}
       
//         />}


      
// {courses.length > 0 && <Dropdown
//           style={[styles.dropdown,]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           data={term}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={'Select Term'}
//           searchPlaceholder="Search..."
//           onFocus={() => handleFocus('route')}
//           onBlur={handleBlur}
//           onChange={() => {
//             setIsFocus(null);
//           }}
//           value={selectedTerm}
//           onChange={(item) => setSelectedTerm(item.value)}
       
//         />}

//           <View style ={styles.footer}>

//           {isVisible && <TouchableOpacity style={{flex:1, flexDirection:'row',width:'80%',position:'absolute',right:50,top:4}} onPress={handleSetPercentage1}>
//             <Image style={{width:20,height:20,marginRight:10}} source={require('../../../../assets/images/images/edit.png')}/>
//             <Text style={{color:'#58a8f9',fontSize:14}}>Set Percentage</Text>
//           </TouchableOpacity>}

//           <TouchableOpacity style={styles.reset} onPress={handleReset}>
//             <Text  style={{color: '#58A8F9', }}>Reset</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style ={styles.search} onPress={handleSearch}>
//           <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
//           </TouchableOpacity>
//           </View>
          
//       </View>

// {isVisible && <View style={{backgroundColor:'white'}}>
// <View style={{position:'relative', flexDirection:'row', justifyContent:'flex-end',marginHorizontal:15,backgroundColor:'white', right:50,marginBottom:0,paddingVertical:5}}>
       
//     <Text style={{marginRight:17, fontSize:10}}>Internal (25)</Text>
//     <Text style={{fontSize:10}}>External (75)</Text>
// </View>
// </View>}

// {isOpen && <View style={styles.inputContainer}>

// <Text style={styles.inputHeader}>{'Set Marks'}</Text>

            
//             <TextInput
//               style={styles.input}
//               placeholder={"Class Work"}
//               // onChangeText={(text) => setClassWork(text)}
//               // value={classWork}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder={"Exam Work"}
//               // onChangeText={(text) => setExamwork(text)}
//               // value={examwork}
//             />

// <View style={styles.inputButtonsContainer}>
//               <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.buttons} onPress={() => handleSetPercentage(examPercentage1, classWorkPercentage1)}>
//                 <Text style={styles.addText}>{'Add'}</Text>
//               </TouchableOpacity>
//             </View>

//             <Text style={styles.inputHeader}>{'Set Percentage'}</Text>

//             <TextInput
//               style={styles.input}
//               placeholder={"Exam Percentage"}
//               onChangeText={(text) => setExamPercentage1(text)}
//               // value={examPercentage}
//               keyboardType="numeric"
//               value={examPercentage1}
              
//             />

//             <TextInput
//               style={styles.input}
//               placeholder={"Class Percentage"}
//               onChangeText={(text) => setClassWorkPercentage1(text)}
//               // value={classPercentage}
//               keyboardType="numeric"
//               value={classWorkPercentage1}
//               onChangeText={setClassWorkPercentage1}
//             />



//             <View style={styles.inputButtonsContainer}>
//               <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.buttons} onPress={() => handleSetPercentage(examPercentage1, classWorkPercentage1)}>
//                 <Text style={styles.addText}>{'Add'}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>}
        


//           {submitMarks  && (
//           <View style={styles.inputContainer1}>
//             <Text style={styles.inputHeader}>{'Set Marks'}</Text>

//             <TextInput
//               style={styles.input}
//               placeholder={"Add Class Marks"}
//               onChangeText={(text) => setClassMarks(text)}
//               value={classMarks}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder={"Add Exam Marks"}
//               onChangeText={(text) => setExamMarks(text)}
//               value={examMarks}
//             />

//             <View style={styles.inputButtonsContainer}>
//               <TouchableOpacity style={styles.closeBtn} onPress={handleCancel}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.buttons}>
//                 <Text style={styles.addText}>{'Submit'}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}


// {/* List of students section */}

// <ScrollView style={{marginTop: 0, marginBottom: 0,backgroundColor:'white'}} contentContainerStyle ={{paddingBottom:40}}>
// {filteredStudents.map((student, index) => {
//   return (
//     <View style={styles.list} key={index}>
//         <Image source={require('../../../../assets/images/images/boy.png')} style={styles.setImg}/>
//         <View style={styles.listContent}>
//             <Text style={{fontSize:14,color:'#58A8F9'}}>{student.userID}</Text>
//             <Text style={{fontSize:10, color:'grey'}}>{student.name}</Text>
//         </View>

//         <View style={{ flexDirection:'row'}}>
// <View style={{flexDirection:'row',position:'relative',left:20}}>

//             <TextInput style={styles.input1} value={`${student?.classWork || ''}`} editable={false} textAlign='center'/>
//             <TextInput style={styles.input1} value={`${student?.exam || ''}`} editable={false} textAlign='center'  />

// </View>
            
//           <TouchableOpacity style={{flex:1, flexDirection:'row',position:'relative',left:25,top:4}}  onPress={handleSetMarks}>
//             <Image style={{width:20,height:20,marginLeft:10}} source={require('../../../../assets/images/images/edit.png')}/>
//           </TouchableOpacity>

//         </View>
//     </View>
//   )
// })}
// </ScrollView>


// <View style={{backgroundColor:'white'}}>
// <TouchableOpacity style={{width:'90%',height:40, backgroundColor:'#58A8F9',borderRadius:15,justifyContent:'center',alignSelf:'center',position:'relative',bottom:15}}>
//     <Text style={{fontSize:24, color:'white',textAlign:'center'}}>Save</Text>
// </TouchableOpacity>
// </View>
// {/* </KeyboardAvoidingView> */}


//       </>
//     );
//   };

//   export default DropdownComponent;

//   const styles = StyleSheet.create({
//     container: {
//       backgroundColor: 'white',
//       padding: 16,
//       paddingVertical:60
//     },
//     dropdown: {
//       height: 50,
//       width:"90%",
//     //   borderColor: 'gray',
//     //   borderWidth: 0.5,
//       borderRadius: 8,
//       paddingHorizontal: 8,
//       backgroundColor:'#daedff',
//       marginBottom: 15,
//       alignSelf: 'center'
//     },
//     icon: {
//       marginRight: 5,
//     },
//     label: {
//       position: 'absolute',
//       backgroundColor: 'transparent',
//       left: 45,
//       top: 5,
//       zIndex: 999,
//       paddingHorizontal: 8,
//       fontSize: 14,
//     },
//     placeholderStyle: {
//       fontSize: 15,
//       color: 'grey',
//       paddingHorizontal: 15
//     },
//     selectedTextStyle: {
//       fontSize: 16,
//       paddingHorizontal: 15

//     },
//     iconStyle: {
//       width: 20,
//       height: 20,
//     },
//     inputSearchStyle: {
//       height: 40,
//       fontSize: 16,
//     },
    
//     footer :{
//       flex:1,
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       position:'relative',
//       top:15
//     },
//     search: {
//       position:'relative',
//       right:18,
//       width: 100,
//       height:35,
//       borderRadius:15,
//       backgroundColor: '#58A8F9',
//       justifyContent: 'center',
//     },
//     reset: {
//       backgroundColor:'transparent',
//       width: 70,
//       height: 35,
//       justifyContent:'center',
//       marginRight: 15
//     },
//     list:{
//       width: "85%",
//       height: 80,
//       borderColor: 'grey',
//       borderRadius: 10,
//     //   backgroundColor : 'red',
//       backgroundColor : '#FFFFFF',
//       justifyContent: 'space-between',
//       flexDirection:'row',
//       alignItems:'center',
//       alignSelf:'center',
//       marginBottom: 0,
//       marginTop: 20,
//       resizeMode:'cover',
//       elevation:3

//     },
//     setImg:{
//         marginHorizontal:20,
//         width:42,
//         height:42
//     },
//     listContent:{
//       flexDirection:'column',
//       position: 'relative',
//       right:10,
//       width:'23%'
      
//     },
//     input1:{
//         width:50,
//         height:40,
//         // backgroundColor:'blue',
//         marginHorizontal:5,
//         borderRadius:10,
//         borderColor:'grey',
//         borderWidth:0.5,
//         fontSize:16
//         // marginRight:5
//     },
//     input: {
//       width: '80%',
//       height: 50,
//       backgroundColor: '#DAEDFF',
//       marginBottom: 15,
//       borderRadius: 10,
//       alignSelf: 'center',
//       paddingHorizontal: 25,
//     },
//     inputContainer: {
//       position: 'absolute',
//       width: '80%',
//       height: 500,
//       backgroundColor: 'white',
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignSelf: 'center',
//       top: '23%',
//       flexDirection: 'column',
//       zIndex:463737,
//       elevation:10
//     },
//     inputContainer1: {
//       position: 'absolute',
//       width: '80%',
//       height: 250,
//       backgroundColor: 'whitesmoke',
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignSelf: 'center',
//       top: '30%',
//       flexDirection: 'column',
//       zIndex:463737
//     },
//     inputHeader: {
//       fontSize: 20,
//       position: 'relative',
//       alignSelf: 'flex-start',
//       paddingHorizontal: 35,
//       paddingVertical: 15,
//     },
//     inputButtonsContainer: {
//       flex: 1,
//       flexDirection: 'row',
//       justifyContent: 'flex-end',
//       alignItems: 'flex-end',
//       marginTop: 5,
//       marginBottom: 19,
//     },
//     // inputButtonsContainer1: {
//     //   flex: 1,
//     //   flexDirection: 'row',
//     //   justifyContent: 'flex-end',
//     //   alignItems: 'flex-end',
//     //   marginBottom: 10,
//     //   marginVertical:10
//     // },
//     buttons: {
//       width: 100,
//       height: 38,
//       backgroundColor: '#58A8F9',
//       position: 'absolute',
//       right: 25,
//       borderRadius: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     closeBtn: {
//       width: 100,
//       height: 38,
//       // backgroundColor: '#DAEDFF',
//       position: 'absolute',
//       left: 25,
//       borderRadius: 20,
//       justifyContent: 'center',
//       alignItems: 'center',
//     },
//     addButton: {
//       position: 'absolute',
//       bottom: 50,
//       right: 20,
//       backgroundColor: '#58A8F9',
//       width: 60,
//       height: 60,
//       borderRadius: 30,
//       justifyContent: 'center',
//       alignItems: 'center',
//       elevation: 4,
//     },
//     cancelText: {
//       color: '#58A8F9',
//       fontWeight: '600',
//     },
//     addText: {
//       color: 'white',
//       fontWeight: '600',
//     },
    

//   });






import React, { useEffect, useState,useCallback } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView , TextInput,KeyboardAvoidingView,Alert} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
//   import AntDesign from '@expo/vector-icons/AntDesign';
// import { useRouter } from 'expo-router';
import axios from 'axios';


const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'

const term = [
  {label: "1", value: '1'},
  {label: "2", value: '2'},
  {label: "3", value: '3'}
]



  // const studentData = [
  //   {
  //     "id": "BK202408",
  //     "name": "Deepak Kumar",
  //     "class": "10A",
  //     "course": "Course 1",
  //     "academicYear": "2024-2025",
  //     "term": "Term 1"
  //   },
  //   {
  //     "id": "BK202409",
  //     "name": "Rohan Sharma",
  //     "class": "10A",
  //     "course": "Course 2",
  //     "academicYear": "2024-2025",
  //     "term": "Term 2"
  //   },
  //   {
  //     "id": "3",
  //     "name": "John Doe",
  //     "class": "10A",
  //     "course": "Course 3",
  //     "academicYear": "2024-2025",
  //     "term": "Term 3"
  //   },
  //   {
  //     "id": "4",
  //     "name": "John Doe",
  //     "class": "10A",
  //     "course": "Course 4",
  //     "academicYear": "2024-2025",
  //     "term": "Term 1"
  //   },
  //   {
  //     "id": "5",
  //     "name": "Jane Smith",
  //     "class": "9B",
  //     "course": "Course 5",
  //     "academicYear": "2024-2025",
  //     "term": "Term 2"
  //   },
  //   {
  //     "id": "6",
  //     "name": "Michael Brown",
  //     "class": "11C",
  //     "course": "Course 6",
  //     "academicYear": "2024-2025",
  //     "term": "Term 3"
  //   },
  //   {
  //     "id": "7",
  //     "name": "Emily Davis",
  //     "class": "10A",
  //     "course": "Course 7",
  //     "academicYear": "2024-2025",
  //     "term": "Term 1"
  //   },
  //   {
  //     "id": "8",
  //     "name": "Daniel Johnson",
  //     "class": "8A",
  //     "course": "Course 8",
  //     "academicYear": "2024-2025",
  //     "term": "Term 2"
  //   },
  //   {
  //     "id": "9",
  //     "name": "Sophia Wilson",
  //     "class": "12B",
  //     "course": "Course 9",
  //     "academicYear": "2024-2025",
  //     "term": "Term 3"
  //   },
  //   {
  //     "id": "10",
  //     "name": "Matthew Miller",
  //     "class": "9C",
  //     "course": "Course 10",
  //     "academicYear": "2024-2025",
  //     "term": "Term 1"
  //   },
  //   {
  //     "id": "11",
  //     "name": "James Taylor",
  //     "class": "8B",
  //     "course": "Course 11",
  //     "academicYear": "2024-2025",
  //     "term": "Term 2"
  //   },
  //   {
  //     "id": "12",
  //     "name": "Charlotte",
  //     "class": "10C",
  //     "course": "Course 12",
  //     "academicYear": "2024-2025",
  //     "term": "Term 3"
  //   },
  //   {
  //     "id": "13",
  //     "name": "Aarav Gupta",
  //     "class": "11A",
  //     "course": "Course 13",
  //     "academicYear": "2024-2025",
  //     "term": "Term 1"
  //   },
  //   {
  //     "id": "14",
  //     "name": "Ishita Kapoor",
  //     "class": "9A",
  //     "course": "Course 14",
  //     "academicYear": "2024-2025",
  //     "term": "Term 2"
  //   },
  //   {
  //     "id": "15",
  //     "name": "Nikhil Verma",
  //     "class": "12A",
  //     "course": "Course 15",
  //     "academicYear": "2024-2025",
  //     "term": "Term 3"
  //   }
  // ]
  
  const DropdownComponent = () => {
    const [examPercentage, setExamPercentage] = useState(null)
    // const [examwork, setExamwork] = useState(null)
    // const [classWork, setClassWork] = useState(null)
    const [classMarks, setClassMarks] = useState(null)
    const [examMarks, setExamMarks] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [submitMarks, setSubmitMarks] = useState(false)
    const [examPercentage1, setExamPercentage1] = useState('');
    const [classWorkPercentage1, setClassWorkPercentage1] = useState('');
    const [classWorkPercentage, setClassWorkPercentage] = useState('');

    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    
    const [filteredStudents, setFilteredStudents] = useState([]);
const [isVisible, setIsVisible] = useState(false)

    const [classes, setClasses] = useState([]);
    const [courses, setCourses] = useState([]);
    const [years, setYears] = useState([]);
   
    const [data, setData] = useState(null);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingSubmit, setLoadingSubmit] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [percentageModalVisible, setPercentageModalVisible] = useState(false);
    // const [selectedStudent, setSelectedStudent] = useState(null);
    const [error, setError] = useState(null);
    const [editclassWork, setEditClassWork] = useState('');
    const [editexam, setEditExam] = useState('');

    const fetchInitialData = async () => {
      try {
        const classesResponse = await axios.get('https://dreamscloudtechbackend.onrender.com/api/classes');
        setClasses(classesResponse.data || []);
        
        const yearResponse = await axios.get('https://dreamscloudtechbackend.onrender.com/api/yeargroup');
        setYears(yearResponse.data || []);
        
      } catch (err) {
        console.error('Error fetching initial data:', err);
      } 
    };

    const fetchCourses = async () => {
    
      try {
        // setLoadingData(prev => ({ ...prev, courses: true }));
        const response = await axios.get(`${baseUrl}/courses/class/${selectedClass}`);
        setCourses(response.data?.docs.map((course) => ({
          label: course.name,
          value: course.code
        })));
      } catch (err) {
        console.error('Error fetching courses:', err);
      } 
    };


   const fetchStudents = async() => {
    
    try {
      const res = await axios.get(`${baseUrl}/classes/classCode/${selectedClass}`)
      if (selectedClass && (!res.data.docs?.sba || res.data.docs?.sba === false)){
        Alert.alert('No SBA Data', 'SBA data is not available for the selected class.')
        return;
      }

      const response = await axios.get(`${baseUrl}/sba/${selectedClass}/${selectedCourse}/${selectedYear}/${selectedTerm}`)

      const dataa = response?.data?.docs
      const students = response?.data?.docs?.students
      // console.log('response:  ', students)

      // setStudents(fetchedData.students?.sort((a, b) => b.total - a.total) || []);
      setData(dataa)
      setClassMarks(dataa.classWork || '');
      setExamMarks(dataa.exam || '');
      setExamPercentage(dataa.examPercentage || '');
      setClassWorkPercentage(dataa.classWorkPercentage || '');
      setExamPercentage1(dataa.examPercentage || '');
      setClassWorkPercentage1(dataa.classWorkPercentage || '');

      setClassWorkPercentage(response?.data?.docs?.classWorkPercentage)
      setFilteredStudents(students || [])
    } catch (error) {
      
    }
    }

    const handleUpdateMarks = async (newExamMark, newClassWorkMark) => {
      if (!data?._id) {
        setError('Invalid class ID for updating marks.');
        return;
      }
  
      setLoadingSubmit(true);
      try {
        const updatedStudents = updateStudentPercentages(filteredStudents, newExamMark, newClassWorkMark, examPercentage, classWorkPercentage);
        
        await axios.put(`https://dreamscloudtechbackend.onrender.com/api/sba/update/${data?._id}`, {
          exam: newExamMark,
          classWork: newClassWorkMark,
          examPercentage,
          classWorkPercentage,
          students: updatedStudents
        });
        
        setExamMarks(newExamMark);
        setClassMarks(newClassWorkMark);
        setStudents(updatedStudents);
        setIsOpen(false);
        setError(null);
      } catch (error) {
        console.error('Update marks error:', error);
        setError('Failed to update marks. Please try again.');
      } finally {
        setLoadingSubmit(false);
      }
    };



    const updateStudentPercentages = useCallback((students, examMark, classWorkMark, examPercentage, classWorkPercentage) => {
      return students.map(student => {
        if (student.exam && student.classWork) {
          const examScore = (Number(student.exam) / Number(examMark)) * (Number(examPercentage) / 100);
          const classWorkScore = (Number(student.classWork) / Number(classWorkMark)) * (Number(classWorkPercentage) / 100);
          return {
            ...student,
            examPercentage: Math.round(examScore * 100),
            classWorkPercentage: Math.round(classWorkScore * 100),
            total: Math.round((examScore + classWorkScore) * 100)
          };
        }
        return student;
      });
    }, []);
  
    useEffect(() => {
      fetchInitialData();
      fetchCourses();
      fetchStudents();
      
    }, [selectedClass,editclassWork,editexam,selectedStudent]);
  
  
   // Search Button Logic
  const handleSearch = () => {
    if (!selectedClass|| !selectedTerm|| !selectedCourse|| !selectedYear) {
      return Alert.alert("Please select all fields");
    }
    setIsVisible(true)
    fetchStudents()
  };
  



  const handleSetPercentage = async (newExamPercentage, newClassWorkPercentage) => {
    if (!data?._id) {
      setError('Invalid class ID for updating percentages.');
      return;
    }

    setLoadingSubmit(true);
    try {
      const updatedStudents = updateStudentPercentages(filteredStudents, examMarks, classMarks, newExamPercentage, newClassWorkPercentage);
      
      await axios.put(`https://dreamscloudtechbackend.onrender.com/api/sba/update/${data?._id}`, {
        examPercentage: examPercentage1,
        classWorkPercentage: classWorkPercentage1,
        // students: updatedStudents,
        exam: examMarks,
        classWork: classMarks
      });
      
      setExamPercentage1(examPercentage1);
      setClassWorkPercentage1(classWorkPercentage1);
      setStudents(updatedStudents);
      setIsOpen(false);
    } catch (error) {
      console.error('Set percentage error:', error);
      setError('Failed to update percentages. Please try again.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedTerm(null);
    setSelectedCourse(null);
    setSelectedYear(null);
    setSelectedClass(null);
    setFilteredStudents([]);
    setIsVisible(false)
  };

  const handleSaveEdit = async (updatedStudent) => {
    setLoadingSubmit(true);
    try {
      const selectedstu={...updatedStudent,classWork:editclassWork,exam:editexam}
      const newStudents = filteredStudents.map((s) =>
        s.userID === selectedstu.userID ? selectedstu : s
      );
      console.log(selectedstu)
      const updatedStudents = updateStudentPercentages(newStudents, examMarks, classMarks, examPercentage1, classWorkPercentage1);
      
      await axios.put(`https://dreamscloudtechbackend.onrender.com/api/sba/update/${data?._id}`, {
        students: updatedStudents,
        examPercentage1,
        classWorkPercentage1,
        exam: examMarks,
        classWork: classMarks
      });
      
      setStudents(updatedStudents);
      setSelectedStudent([])
      setSubmitMarks(false);
    } catch (error) {
      console.error('Save edit error:', error);
      setError('Failed to save changes. Please try again.');
    } finally {
      setLoadingSubmit(false);
    }
  };

  const handleClose =() => {
    setIsOpen(false)
  }
  const handleCancel =() => {
    setSubmitMarks(false)
  }
   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

   

    const handleSetPercentage1 = () => {
      setIsOpen(true)
    }
   

    const handleSetMarks = (student) => {
      setEditClassWork(student.classWork)
      setEditExam(student.exam)
      setSelectedStudent(student)
      setSubmitMarks(true)
    }
   

    return (
        <>
        {/* <KeyboardAvoidingView enabled= {true} behavior='padding'> */}

      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes.map((cls) => ({label: cls.name, value: cls.classCode}))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
       
        />
      
      {courses.length > 0 && <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={courses}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Course'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          value={selectedCourse}
          onChange={(item) => setSelectedCourse(item.value)}
       
        />}
      
      
      {courses.length > 0 &&  <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={years.map((y) => ({label: y.year, value: y.year}))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Acedemic Year'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedYear}
          onChange={(item) => setSelectedYear(item.value)}
       
        />}


      
{courses.length > 0 && <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={term}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Term'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('route')}
          onBlur={handleBlur}
          onChange={() => {
            setIsFocus(null);
          }}
          value={selectedTerm}
          onChange={(item) => setSelectedTerm(item.value)}
       
        />}

          <View style ={styles.footer}>

          {isVisible && <TouchableOpacity style={{flex:1, flexDirection:'row',width:'80%',position:'absolute',right:50,top:4}} onPress={handleSetPercentage1}>
            <Image style={{width:20,height:20,marginRight:10}} source={require('../../../../assets/images/images/edit.png')}/>
            <Text style={{color:'#58a8f9',fontSize:14}}>Set Percentage</Text>
          </TouchableOpacity>}

          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} onPress={handleSearch}>
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>
          </View>
          
      </View>

{isVisible && <View style={{backgroundColor:'white'}}>
<View style={{position:'relative', flexDirection:'row', justifyContent:'flex-end',marginHorizontal:15,backgroundColor:'white', right:50,marginBottom:0,paddingVertical:5}}>
       
    <Text style={{marginRight:17, fontSize:10}}>Internal (25)</Text>
    <Text style={{fontSize:10}}>External (75)</Text>
</View>
</View>}

{isOpen && <View style={styles.inputContainer}>

<Text style={styles.inputHeader}>{'Set Marks'}</Text>

            
            <TextInput
              style={styles.input}
              placeholder={"Class Work"}
              keyboardType="numeric"
              onChangeText={(text) => setClassMarks(text)}
              value={classMarks}
            />
            <TextInput
              style={styles.input}
              placeholder={"Exam Work"}
              // onChangeText={(text) => setExamwork(text)}
              // value={examwork}
              onChangeText={(text) => setExamMarks(text)}
              // value={examPercentage}
              keyboardType="numeric"
              value={examMarks}
            />

<View style={styles.inputButtonsContainer}>
              <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={() => handleUpdateMarks(examMarks, classMarks)}>
                <Text style={styles.addText}>{'Add'}</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.inputHeader}>{'Set Percentage'}</Text>

            <TextInput
              style={styles.input}
              placeholder={"Exam Percentage"}
              onChangeText={(text) => setExamPercentage1(text)}
              // value={examPercentage}
              keyboardType="numeric"
              value={examPercentage1}
              
            />

            <TextInput
              style={styles.input}
              placeholder={"Class Percentage"}
              onChangeText={(text) => setClassWorkPercentage1(text)}
              // value={classPercentage}
              keyboardType="numeric"
              value={classWorkPercentage1}
              onChangeText={setClassWorkPercentage1}
            />



            <View style={styles.inputButtonsContainer}>
              <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={() => handleSetPercentage(examPercentage1, classWorkPercentage1)}>
                <Text style={styles.addText}>{'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>}
        

//A
          {submitMarks  && (
          <View style={styles.inputContainer1}>
            <Text style={styles.inputHeader}>{'Set Marks'}</Text>

            <TextInput
              style={styles.input}
              placeholder={"Add Class Marks"}
              keyboardType='numeric'
              onChangeText={(text) => setEditClassWork(text)}
              value={editclassWork}
            />

            <TextInput
              style={styles.input}
              placeholder={"Add Exam Marks"}
              keyboardType='numeric'
              onChangeText={(text) => setEditExam(text)}
              value={editexam}
            />

            <View style={styles.inputButtonsContainer}>
              <TouchableOpacity style={styles.closeBtn} onPress={handleCancel}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={()=>{handleSaveEdit(selectedStudent)}}>
                <Text style={styles.addText}>{'Submit'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}


{/* List of students section */}

<ScrollView style={{marginTop: 0, marginBottom: 0,backgroundColor:'white'}} contentContainerStyle ={{paddingBottom:40}}>
{filteredStudents.map((student, index) => {
  return (
    <View style={styles.list} key={index}>
        <Image source={require('../../../../assets/images/images/boy.png')} style={styles.setImg}/>
        <View style={styles.listContent}>
            <Text style={{fontSize:14,color:'#58A8F9'}}>{student.userID}</Text>
            <Text style={{fontSize:10, color:'grey'}}>{student.name}</Text>
        </View>

        <View style={{ flexDirection:'row'}}>
<View style={{flexDirection:'row',position:'relative',left:20}}>

            <TextInput style={styles.input1} value={`${student?.classWork || ''}`} editable={false} textAlign='center'/>
            <TextInput style={styles.input1} value={`${student?.exam || ''}`} editable={false} textAlign='center'  />

</View>
            
          <TouchableOpacity style={{flex:1, flexDirection:'row',position:'relative',left:25,top:4}}  onPress={() => {handleSetMarks(student)}}>
            <Image style={{width:20,height:20,marginLeft:10}} source={require('../../../../assets/images/images/edit.png')}/>
          </TouchableOpacity>

        </View>
    </View>
  )
})}
</ScrollView>


<View style={{backgroundColor:'white'}}>
<TouchableOpacity style={{width:'90%',height:40, backgroundColor:'#58A8F9',borderRadius:15,justifyContent:'center',alignSelf:'center',position:'relative',bottom:15}}>
    <Text style={{fontSize:24, color:'white',textAlign:'center'}}>Save</Text>
</TouchableOpacity>
</View>
{/* </KeyboardAvoidingView> */}


      </>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      paddingVertical:60
    },
    dropdown: {
      height: 50,
      width:"90%",
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor:'#daedff',
      marginBottom: 15,
      alignSelf: 'center'
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'transparent',
      left: 45,
      top: 5,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 15,
      color: 'grey',
      paddingHorizontal: 15
    },
    selectedTextStyle: {
      fontSize: 16,
      paddingHorizontal: 15

    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    
    footer :{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      position:'relative',
      top:15
    },
    search: {
      position:'relative',
      right:18,
      width: 100,
      height:35,
      borderRadius:15,
      backgroundColor: '#58A8F9',
      justifyContent: 'center',
    },
    reset: {
      backgroundColor:'transparent',
      width: 70,
      height: 35,
      justifyContent:'center',
      marginRight: 15
    },
    list:{
      width: "85%",
      height: 80,
      borderColor: 'grey',
      borderRadius: 10,
    //   backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      marginBottom: 0,
      marginTop: 20,
      resizeMode:'cover',
      elevation:3

    },
    setImg:{
        marginHorizontal:20,
        width:42,
        height:42
    },
    listContent:{
      flexDirection:'column',
      position: 'relative',
      right:10,
      width:'23%'
      
    },
    input1:{
        width:50,
        height:40,
        // backgroundColor:'blue',
        marginHorizontal:5,
        borderRadius:10,
        borderColor:'grey',
        borderWidth:0.5,
        fontSize:16
        // marginRight:5
    },
    input: {
      width: '80%',
      height: 50,
      backgroundColor: '#DAEDFF',
      marginBottom: 15,
      borderRadius: 10,
      alignSelf: 'center',
      paddingHorizontal: 25,
    },
    inputContainer: {
      position: 'absolute',
      width: '80%',
      height: 500,
      backgroundColor: 'white',
      borderRadius: 10,
      justifyContent: 'center',
      alignSelf: 'center',
      top: '23%',
      flexDirection: 'column',
      zIndex:463737,
      elevation:10
    },
    inputContainer1: {
      position: 'absolute',
      width: '80%',
      height: 250,
      backgroundColor: 'whitesmoke',
      borderRadius: 10,
      justifyContent: 'center',
      alignSelf: 'center',
      top: '30%',
      flexDirection: 'column',
      zIndex:463737
    },
    inputHeader: {
      fontSize: 20,
      position: 'relative',
      alignSelf: 'flex-start',
      paddingHorizontal: 35,
      paddingVertical: 15,
    },
    inputButtonsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
      marginTop: 5,
      marginBottom: 19,
    },
    // inputButtonsContainer1: {
    //   flex: 1,
    //   flexDirection: 'row',
    //   justifyContent: 'flex-end',
    //   alignItems: 'flex-end',
    //   marginBottom: 10,
    //   marginVertical:10
    // },
    buttons: {
      width: 100,
      height: 38,
      backgroundColor: '#58A8F9',
      position: 'absolute',
      right: 25,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeBtn: {
      width: 100,
      height: 38,
      // backgroundColor: '#DAEDFF',
      position: 'absolute',
      left: 25,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    addButton: {
      position: 'absolute',
      bottom: 50,
      right: 20,
      backgroundColor: '#58A8F9',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
    },
    cancelText: {
      color: '#58A8F9',
      fontWeight: '600',
    },
    addText: {
      color: 'white',
      fontWeight: '600',
    },
    

  });




