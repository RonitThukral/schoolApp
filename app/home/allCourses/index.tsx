import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import axios from 'axios';


const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'




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
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedTeacher, setSelectedTeacher] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedDepartment, setSelectedDepartment] = useState(null);
    const [courses, setCourses] = useState(null)
    const [teachers, setTeachers] = useState([])
    const [filteredCourses, setFilteredCourses] = useState([]);


    // const router = useRouter();


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
        console.log(teachers); // You can now use the teachers data as needed
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    }


    const fetchCourses = async() => {
      try {
        const response = await axios.get(`${baseUrl}/courses`)

        const formattedData = response.data.map((course) => {
          const teacherData = teachers.find((t) => t.userID === course.teacher) 
          return {
          name: course.name || 'N/A',
          classes : course.classes.length || 'N/A',
          department : course.type ||'N/A',
          teacher: teacherData ? `${teacherData.name}`: 'N/A'

        }})
        console.log('Response  :  ', response.data  )
        setCourses(formattedData)
        setFilteredCourses(formattedData)
      } catch (error) {
        
      }
    }


    useEffect(() => {
      fetchTeachers()
      fetchCourses()
    },[])

   // Search Button Logic
  const handleSearch = () => {
    const filtered = courses?.filter((course) => {
      return (
        (!selectedTeacher || course.teacher === selectedTeacher) &&
        (!selectedName || course.name === selectedName) &&
        (!selectedDepartment || course.department === selectedDepartment)
      );
    });
    setFilteredCourses(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedTeacher(null);
    setSelectedName(null);
    setSelectedDepartment(null);
    setFilteredCourses(courses);
  };


    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    // const handlePress = () => {
    //   router.navigate('../studentDetails')
    // }

    const InfoRow = ({ label, value ,isMultiLine = false}:any) => (
        <View style={styles.infoRow}>
          <Text style={styles.InfoRowLabel}>{label}</Text>
          <View style={{width:'70%', left:10, top:0}}>
    
          <Text style={[isMultiLine ? styles.multiLine : styles.value]}>{value}</Text>
          </View>
        </View>
      );
    
   

    return (
        <>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={filteredCourses.map((course) => ({ label: course.name, value: course.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Name'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedName}
          onChange={(item) => setSelectedName(item.value)}
       
        />
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={filteredCourses.map((course) => ({ label: course.department, value: course.department  }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Department'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          value={selectedDepartment}
          onChange={(item) => setSelectedDepartment(item.value)}
       
        />
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={filteredCourses.map((course) => ({ label: course.teacher, value: course.teacher }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Teacher'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedTeacher}
          onChange={(item) => setSelectedTeacher(item.value)}
       
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


{/* List of students section */}
<ScrollView style={{paddingTop: 20, marginBottom: 0, backgroundColor:'white'}} contentContainerStyle={{paddingBottom:50}}>
{filteredCourses.map((course, index) => {
  return (
    <View style={styles.list} key={index} >
      <Text style={{position:'relative', fontSize:22 , left:35, color:'#58A8F9',marginTop:10}}>{course?.name}</Text>
      <View style={{flex:1, flexDirection:'row'}}>

      <View style={styles.listContent}>
          <InfoRow label="Head Teacher" value={course.teacher} />
          <InfoRow label="Department" value={course.department} />
          <InfoRow label="Classes" value={course.classes} />
          
      </View>
      <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center',marginBottom:5}} >
                <Image source={require('../../../assets/images/images/edit.png')}/>

                </TouchableOpacity>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../../assets/images/images/delete.png')}/>

                </TouchableOpacity>
            </View>
      </View>
    </View>
  )
})}
</ScrollView>


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
      height: 125,
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