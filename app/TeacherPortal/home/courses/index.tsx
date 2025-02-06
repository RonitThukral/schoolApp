import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Platform, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const DropdownComponent = () => {
  const { teacher } = useLocalSearchParams();
  const parsedTeacher = teacher ? JSON.parse(teacher) : null;

  const router = useRouter();

  const [filteredCourses, setFilteredCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${baseUrl}/courses/teacher/${parsedTeacher.userID}`);
      const allCourses = response.data.docs;

      // Prepare the list of courses for the teacher based on the classes array
      const teacherCourses = allCourses
        .flatMap((course) =>
          course.classes
            .filter((cls) => cls.teacher === parsedTeacher.userID)
            .map((cls) => ({
              name: course.name || 'N/A',
              code: course.code || 'N/A',
              teacherId: parsedTeacher.userID || 'N/A',
              division: cls.class || 'N/A',
              type: course.type || 'N/A',
            }))
        );

      setFilteredCourses(teacherCourses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);


  const handlePress = (cls, course) => {
    // console.log(cls, 'msaofnsa')
    // console.log(course, 'slfmsl')
    router.push({
        pathname: './courses/notes',
        params: { classs: cls, course: course },  // Use 'params' here instead of 'query'
      });
  }



  const InfoRow = ({ label, value, isMultiLine = false }) => (
    <View style={styles.infoRow}>
      <Text style={styles.InfoRowLabel}>{label}</Text>
      <View style={{ width: '70%', left: 10, top: 0 }}>
        <Text style={[isMultiLine ? styles.multiLine : styles.value]}>{value}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ paddingTop: 50, marginBottom: 0, backgroundColor: '#daedff' }}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {filteredCourses.map((course, index) => (
          <TouchableOpacity style={styles.list} key={index} 
          onPress={() => {handlePress(course.division, course.code)}}
          >
            <Text
              style={{ position: 'relative', fontSize: 22, left: 60, color: '#58A8F9', marginTop: 10 }}
            >
              {course.name}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View style={styles.listContent}>
                <InfoRow label="Teacher ID" value={course.teacherId} />
                <InfoRow label="Class" value={course.division} />
                <InfoRow label="Type" value={course.type} />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
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
      left:60,
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