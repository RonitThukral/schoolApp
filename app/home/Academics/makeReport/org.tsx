// import React, { useEffect, useState } from 'react';
//   import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView , TextInput,KeyboardAvoidingView} from 'react-native';
//   import { Dropdown } from 'react-native-element-dropdown';
//   import AntDesign from '@expo/vector-icons/AntDesign';
// import { useRouter } from 'expo-router';
// import axios from 'axios';


// const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'

// const term = [
//   {label: "1", value: '1'},
//   {label: "2", value: '2'},
//   {label: "3", value: '3'}
// ]

// const year = [
//   {label: "2024", value: '2024'},
//   {label: "2025", value: '2025'},
//   {label: "2026", value: '2026'},
//   {label: "2027", value: '2027'},
//   {label: "2028", value: '2028'},
//   {label: "2029", value: '2029'},
// ]

//   const studentData = [
//     {
//       "id": "BK202408",
//       "name": "Deepak Kumar",
//       "class": "10A",
//       "course": "Course 1",
//       "academicYear": "2024-2025",
//       "term": "Term 1"
//     },
//     {
//       "id": "BK202409",
//       "name": "Rohan Sharma",
//       "class": "10A",
//       "course": "Course 2",
//       "academicYear": "2024-2025",
//       "term": "Term 2"
//     },
//     {
//       "id": "3",
//       "name": "John Doe",
//       "class": "10A",
//       "course": "Course 3",
//       "academicYear": "2024-2025",
//       "term": "Term 3"
//     },
//     {
//       "id": "4",
//       "name": "John Doe",
//       "class": "10A",
//       "course": "Course 4",
//       "academicYear": "2024-2025",
//       "term": "Term 1"
//     },
//     {
//       "id": "5",
//       "name": "Jane Smith",
//       "class": "9B",
//       "course": "Course 5",
//       "academicYear": "2024-2025",
//       "term": "Term 2"
//     },
//     {
//       "id": "6",
//       "name": "Michael Brown",
//       "class": "11C",
//       "course": "Course 6",
//       "academicYear": "2024-2025",
//       "term": "Term 3"
//     },
//     {
//       "id": "7",
//       "name": "Emily Davis",
//       "class": "10A",
//       "course": "Course 7",
//       "academicYear": "2024-2025",
//       "term": "Term 1"
//     },
//     {
//       "id": "8",
//       "name": "Daniel Johnson",
//       "class": "8A",
//       "course": "Course 8",
//       "academicYear": "2024-2025",
//       "term": "Term 2"
//     },
//     {
//       "id": "9",
//       "name": "Sophia Wilson",
//       "class": "12B",
//       "course": "Course 9",
//       "academicYear": "2024-2025",
//       "term": "Term 3"
//     },
//     {
//       "id": "10",
//       "name": "Matthew Miller",
//       "class": "9C",
//       "course": "Course 10",
//       "academicYear": "2024-2025",
//       "term": "Term 1"
//     },
//     {
//       "id": "11",
//       "name": "James Taylor",
//       "class": "8B",
//       "course": "Course 11",
//       "academicYear": "2024-2025",
//       "term": "Term 2"
//     },
//     {
//       "id": "12",
//       "name": "Charlotte",
//       "class": "10C",
//       "course": "Course 12",
//       "academicYear": "2024-2025",
//       "term": "Term 3"
//     },
//     {
//       "id": "13",
//       "name": "Aarav Gupta",
//       "class": "11A",
//       "course": "Course 13",
//       "academicYear": "2024-2025",
//       "term": "Term 1"
//     },
//     {
//       "id": "14",
//       "name": "Ishita Kapoor",
//       "class": "9A",
//       "course": "Course 14",
//       "academicYear": "2024-2025",
//       "term": "Term 2"
//     },
//     {
//       "id": "15",
//       "name": "Nikhil Verma",
//       "class": "12A",
//       "course": "Course 15",
//       "academicYear": "2024-2025",
//       "term": "Term 3"
//     }
//   ]
  
//   const DropdownComponent = () => {
//     const [examPercentage, setExamPercentage] = useState(null)
//     const [examwork, setExamwork] = useState(null)
//     const [classWork, setClassWork] = useState(null)
//     const [classMarks, setClassMarks] = useState(null)
//     const [examMarks, setExamMarks] = useState(null)
//     const [isOpen, setIsOpen] = useState(false)
//     const [submitMarks, setSubmitMarks] = useState(false)
//     const [isFocus, setIsFocus] = useState<string | null>(null);
//     const [selectedTerm, setSelectedTerm] = useState(null);
//     const [selectedCourse, setSelectedCourse] = useState(null);
//     const [selectedClass, setSelectedClass] = useState(null);
//     const [selectedYear, setSelectedYear] = useState(null);
//     const [classes, setClasses] = useState([]);
//     const [classPercentage, setClassPercentage] = useState(null);
//     const [filteredStudents, setFilteredStudents] = useState(studentData);


//     const router = useRouter();

    
//     const fetchClasses = async() => {

//       try {
//         const classes = await axios.get(`${baseUrl}/classes`)
//   //  console.log(classes, 'classed')
//         const formatedData = classes.data.map((cls) => ({
//           label: cls.name,
//           value: cls.classCode,
//         }))

//         setClasses(formatedData)


//       } catch (error) {
//         console.error('Error fetching classes:', error.message);
//       }

//     }

//     const fetchStudents = async () => {
//       // setLoading(true)
//       try {
//         const response = await fetch(`${baseUrl}/students`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch students');
//         }
//         const data = await response.json();

//         // Transform data to match the design format if needed
//         const formattedData = data.map(student => ({
//           id: student._id,
//           name: `${student.name} ${student.surname || ''}`.trim(),
//           class: student.classID || 'N/A',
//           busRoute : student.dormitoryID || 'N/A' ,
//           userID : student.userID || 'N/A' ,
//           gender: student.gender || 'N/A',
//           guardian: student.guadian || 'N/A'
//         }));

//         // setAllStudents(formattedData);
//         setFilteredStudents(formattedData);
//         // setLoading(false)
//       } catch (error) {
//         console.error(error.message);
//         // setLoading(false)

//       } 
//     };


//     const fetchCourses = async() => {
//       try {
//         const response = await axios.get(`${baseUrl}/courses`)

//         const formattedData = response.data.map((course) => {
//           const teacherData = teachers.find((t) => t.userID === course.teacher) 
//           return {
//           name: course.name || 'N/A',
//           classes : course.classes.length || 'N/A',
//           department : course.type ||'N/A',
//           teacher: teacherData ? `${teacherData.name}`: 'N/A'

//         }})
//         console.log('Response  :  ', response.data  )
//         setCourses(formattedData)
//       } catch (error) {
        
//       }
//     }



    

//     useEffect(() => {
//       fetchClasses()
//       fetchStudents()
//       fetchCourses()
//     },[])

//    // Search Button Logic
//   const handleSearch = () => {
//     const filtered = studentData.filter((student) => {
//       return (
//         (!selectedYear || student.academicYear === selectedYear) &&
//         (!selectedCourse || student.course === selectedCourse) &&
//         (!selectedClass || student.class === selectedClass) &&
//         (!selectedTerm || student.term === selectedTerm)
//       );
//     });
//     setFilteredStudents(filtered);
//   };

//   // Reset Button Logic
//   const handleReset = () => {
//     setSelectedTerm(null);
//     setSelectedCourse(null);
//     setSelectedYear(null);
//     setSelectedClass(null);
//     setFilteredStudents(studentData);
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

//     const handlePress = () => {
//       router.navigate('/')
//     }

//     const handleSetPercentage = () => {
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
//           data={classes}
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
      
      
//         <Dropdown
//           style={[styles.dropdown,]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           data={studentData.map((student) => ({ label: student.course, value: student.course }))}
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
       
//         />
      
      
//         <Dropdown
//           style={[styles.dropdown,]}
//           placeholderStyle={styles.placeholderStyle}
//           selectedTextStyle={styles.selectedTextStyle}
//           inputSearchStyle={styles.inputSearchStyle}
//           data={year}
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
       
//         />


      
//       <Dropdown
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
       
//         />

//           <View style ={styles.footer}>

//           <TouchableOpacity style={{flex:1, flexDirection:'row',width:'80%',position:'absolute',right:50,top:4}} onPress={handleSetPercentage}>
//             <Image style={{width:20,height:20,marginRight:10}} source={require('../../../../assets/images/images/edit.png')}/>
//             <Text style={{color:'#58a8f9',fontSize:14}}>Set Percentage</Text>
//           </TouchableOpacity>

//           <TouchableOpacity style={styles.reset} onPress={handleReset}>
//             <Text  style={{color: '#58A8F9', }}>Reset</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style ={styles.search} onPress={handleSearch}>
//           <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
//           </TouchableOpacity>
//           </View>
          
//       </View>

// <View style={{backgroundColor:'white'}}>
// <View style={{position:'relative', flexDirection:'row', justifyContent:'flex-end',marginHorizontal:15,backgroundColor:'white', right:50,marginBottom:0,paddingVertical:5}}>
       
//     <Text style={{marginRight:17, fontSize:10}}>Internal (25)</Text>
//     <Text style={{fontSize:10}}>External (75)</Text>
// </View>
// </View>

// {isOpen && <View style={styles.inputContainer}>

// <Text style={styles.inputHeader}>{'Set Marks'}</Text>

            
//             <TextInput
//               style={styles.input}
//               placeholder={"Class Work"}
//               onChangeText={(text) => setClassWork(text)}
//               value={classWork}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder={"Exam Work"}
//               onChangeText={(text) => setExamwork(text)}
//               value={examwork}
//             />


//             <Text style={styles.inputHeader}>{'Set Percentage'}</Text>

//             <TextInput
//               style={styles.input}
//               placeholder={"Exam Percentage"}
//               onChangeText={(text) => setExamPercentage(text)}
//               value={examPercentage}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder={"Class Percentage"}
//               onChangeText={(text) => setClassPercentage(text)}
//               value={classPercentage}
//             />



//             <View style={styles.inputButtonsContainer}>
//               <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.buttons} >
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

//             <TextInput style={styles.input1} editable={false} />
//             <TextInput style={styles.input1} editable={false} />
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
//       height: 430,
//       backgroundColor: 'whitesmoke',
//       borderRadius: 10,
//       justifyContent: 'center',
//       alignSelf: 'center',
//       top: '30%',
//       flexDirection: 'column',
//       zIndex:463737
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
//       marginBottom: 10,
//     },
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


