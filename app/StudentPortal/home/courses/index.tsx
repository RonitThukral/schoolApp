import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView, SafeAreaView, Platform} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';


const baseUrl = 'https://api.dreameducation.org.in/api'




const courseData = [
    {
      id: "1",
      title: "Science",
      classTeacher: "Daksh Singh",
      department: "Academics",
      classes: 3,
    },
    {
      id: "2",
      title: "Social Science",
      classTeacher: "Deepak Kumar",
      department: "Academics",
      classes: 2,
    },
    {
      id: "3",
      title: "Badminton",
      classTeacher: "Deepak Kumar",
      department: "Sports",
      classes: 2,
    },
  ];
  


  

  const DropdownComponent = () => {

    const {student} = useLocalSearchParams();

    const parsedStudent = student ? JSON.parse(student) : null;


    const [courses, setCourses] = useState(null)
    const [teachers, setTeachers] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([]);


    const router = useRouter();


    const fetchTeachers = async () => {
      try {
        const response = await axios.get(`${baseUrl}/teachers`);
        const teachers = response.data; // Assuming the data returned is an array of teachers
        const formatedData = teachers.map((teacher) => ({
          id: teacher._id,
          userID: teacher.userID || 'N/A',
          designation: teacher.role || 'N/A',
          name: `${teacher.name} ${teacher.surname}`
        }))
        setTeachers(formatedData)
        // console.log(teachers); // You can now use the teachers data as needed
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    }


    const fetchCourses = async() => {
      try {
        const response = await axios.get(`${baseUrl}/courses/class/${parsedStudent.classID}`)

        const formattedData = response.data.docs.map((course) => {
          const teacherData = teachers.find((t) => t.userID === course.teacher) 
          return {
          name: course.name || 'N/A',
          classes : course.classes.length || 'N/A',
          department : course.type ||'N/A',
          teacher: teacherData ? `${teacherData.name}`: 'N/A',
          ClassCode: course.code
        }})
        // console.log('Response  :  ', response.data  )
        setCourses(formattedData)
        setFilteredCourses(formattedData)
      } catch (error) {
        
      }
    }


    useEffect(() => {
      fetchTeachers()
      fetchCourses()
    },[])


    const handleNotes = (course) => {
      router.push({
        pathname: './courses/notes',
        params: {course: course },  // Use 'params' here instead of 'query'
      });
    }


 
    const InfoRow = ({ label, value ,isMultiLine = false}:any) => (
        <View style={styles.infoRow}>
          <Text style={styles.InfoRowLabel}>{label}</Text>
          <View style={{width:'70%', left:10, top:0}}>
    
          <Text style={[isMultiLine ? styles.multiLine : styles.value]}>{value}</Text>
          </View>
        </View>
      );
    
   

    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
          
      </View>


{/* List of students section */}
<ScrollView style={{paddingTop: 20, marginBottom: 0, backgroundColor:'#daedff'}} contentContainerStyle={{paddingBottom:50}}>
{filteredCourses.map((course, index) => {
  return (
    <TouchableOpacity style={styles.list} key={index} onPress={() => {handleNotes(course.ClassCode)}} >
      <Text style={{position:'relative', fontSize:22 , left:35, color:'#58A8F9',marginTop:10}}>{course?.name}</Text>
      <View style={{flex:1, flexDirection:'row'}}>

      <View style={styles.listContent}>
          <InfoRow label="Head Teacher" value={course.teacher} />
          <InfoRow label="Department" value={course.department} />
          {/* <InfoRow label="Classes" value={course.classes} /> */}
          
      </View>
  
      </View>
    </TouchableOpacity>
  )
})}
</ScrollView>


      </SafeAreaView>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#daedff',
      padding: 16,
      paddingVertical:20
      
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
      
    },
    search: {
      position:'relative',
      right:18,
      width: 130,
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
      width: "80%",
      height: 100,
      borderColor: 'grey',
      borderRadius: 10,
      // backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'column',
    //   alignItems:'center',
      alignSelf:'center',
      marginTop: 20,
      elevation:5,
    //   borderWidth: 0.5
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height:1 },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        borderWidth:0.5,
        borderColor:'grey'
      },
      
    }),
    
    },
   
    listContent:{
      flexDirection:'column',
      position: 'relative',
      left:40,
      marginBottom:15,
    //   marginTop:,

    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
      },
      InfoRowLabel: {
        fontWeight:'bold',
        color: '#666',
        fontSize: 13,
      },
      value: {
        color:'grey',
        fontSize: 13,
        marginLeft:25,
        fontWeight:'500'
      },
      multiLine : {
        flexWrap:'wrap',
        // width:'70%',
        // marginTop:10,
        fontSize:12,
        color:'grey'
      },
      listBtns:{
        position:'absolute',
        right:13,
        bottom:20
      }
    

  });