import React, { useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView , SafeAreaView} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';



  const studentData = [
    {
      "id": "BK202408",
      "name": "Deepak Kumar",
      "class": "10A",
      "course": "Course 1",
      "academicYear": "2024-2025",
      "term": "Term 1"
    },
    {
      "id": "BK202409",
      "name": "Rohan Sharma",
      "class": "10A",
      "course": "Course 2",
      "academicYear": "2024-2025",
      "term": "Term 2"
    },
    {
      "id": "3",
      "name": "John Doe",
      "class": "10A",
      "course": "Course 3",
      "academicYear": "2024-2025",
      "term": "Term 3"
    },
    {
      "id": "4",
      "name": "John Doe",
      "class": "10A",
      "course": "Course 4",
      "academicYear": "2024-2025",
      "term": "Term 1"
    },
    {
      "id": "5",
      "name": "Jane Smith",
      "class": "9B",
      "course": "Course 5",
      "academicYear": "2024-2025",
      "term": "Term 2"
    },
    {
      "id": "6",
      "name": "Michael Brown",
      "class": "11C",
      "course": "Course 6",
      "academicYear": "2024-2025",
      "term": "Term 3"
    },
    {
      "id": "7",
      "name": "Emily Davis",
      "class": "10A",
      "course": "Course 7",
      "academicYear": "2024-2025",
      "term": "Term 1"
    },
    {
      "id": "8",
      "name": "Daniel Johnson",
      "class": "8A",
      "course": "Course 8",
      "academicYear": "2024-2025",
      "term": "Term 2"
    },
    {
      "id": "9",
      "name": "Sophia Wilson",
      "class": "12B",
      "course": "Course 9",
      "academicYear": "2024-2025",
      "term": "Term 3"
    },
    {
      "id": "10",
      "name": "Matthew Miller",
      "class": "9C",
      "course": "Course 10",
      "academicYear": "2024-2025",
      "term": "Term 1"
    },
    {
      "id": "11",
      "name": "James Taylor",
      "class": "8B",
      "course": "Course 11",
      "academicYear": "2024-2025",
      "term": "Term 2"
    },
    {
      "id": "12",
      "name": "Charlotte",
      "class": "10C",
      "course": "Course 12",
      "academicYear": "2024-2025",
      "term": "Term 3"
    },
    {
      "id": "13",
      "name": "Aarav Gupta",
      "class": "11A",
      "course": "Course 13",
      "academicYear": "2024-2025",
      "term": "Term 1"
    },
    {
      "id": "14",
      "name": "Ishita Kapoor",
      "class": "9A",
      "course": "Course 14",
      "academicYear": "2024-2025",
      "term": "Term 2"
    },
    {
      "id": "15",
      "name": "Nikhil Verma",
      "class": "12A",
      "course": "Course 15",
      "academicYear": "2024-2025",
      "term": "Term 3"
    }
  ]
  
  


  
  

  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedTerm, setSelectedTerm] = useState(null);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [filteredStudents, setFilteredStudents] = useState(studentData);


    const router = useRouter();

   // Search Button Logic
  const handleSearch = () => {
    const filtered = studentData.filter((student) => {
      return (
        (!selectedYear || student.academicYear === selectedYear) &&
        (!selectedCourse || student.course === selectedCourse) &&
        (!selectedClass || student.class === selectedClass) &&
        (!selectedTerm || student.term === selectedTerm)
      );
    });
    setFilteredStudents(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedTerm(null);
    setSelectedCourse(null);
    setSelectedYear(null);
    setSelectedClass(null);
    setFilteredStudents(studentData);
  };

   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    const handlePress = () => {
      router.navigate('/')
    }
   

    return (
        <>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={studentData.map((student) => ({ label: student.class, value: student.class }))}
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
      
      
        {/* <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={studentData.map((student) => ({ label: student.course, value: student.course }))}
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
       
        /> */}
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={studentData.map((student) => ({ label: student.academicYear, value: student.academicYear }))}
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
       
        />


      
      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={studentData.map((student) => ({ label: student.term, value: student.term}))}
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
       
        />

          <View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} onPress={handleSearch}>
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>
          </View>
          
      </View>

{/* <View style={{backgroundColor:'white'}}>
<View style={{position:'relative', flexDirection:'row', justifyContent:'flex-end',marginHorizontal:15,backgroundColor:'white', right:40,marginBottom:8}}>
    <Text style={{marginRight:17, fontSize:15}}>Internal</Text>
    <Text style={{fontSize:15}}>External</Text>
</View>
</View> */}


{/* List of students section */}
<SafeAreaView style={{backgroundColor:'white',flex:1}}>

<ScrollView style={{backgroundColor:'white',  marginBottom:10}}>
{filteredStudents.map((student, index) => {
  return (
    <View style={styles.list} key={index}>
        <Image source={require('../../../../assets/images/images/boy.png')} style={styles.setImg}/>
        <View style={styles.listContent}>
            <Text style={{fontSize:20,color:'#58A8F9'}}>{student.id}</Text>
            <Text style={{fontSize:13, color:'grey'}}>{student.name}</Text>
        </View>

       
        <TouchableOpacity>
        <Image source={require('../../../../assets/images/images/eye.png')} style={styles.eyeImg}/>        
        </TouchableOpacity>
    </View>
  )
})}
</ScrollView>
</SafeAreaView>






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
      backgroundColor:'#EEF7FF',
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
    eyeImg:{
        width:30,
        height:30,
position:'relative',
right:40
    },
    listContent:{
      width:'30%',
      flexDirection:'column',
      position: 'relative',
      right:50,
      justifyContent:'flex-start'
    },
    
    

  });