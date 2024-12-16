import React, { useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';



const divisions = [
  
          {
            "id": "1",
            "name": "Group-4 (Roll no. 91-120)",
            "description": "This Group is for students from roll no. 91 to 120",
            "date": "16 August 2024"
          },
          {
            "id": "2",
            "name": "Group-3 (Roll no. 61-90)",
            "description": "This Group is for students from roll no. 61 to 90",
            "date": "16 August 2024"
          },
          {
            "id": "3",
            "name": "Group-2 (Roll no. 31-60)",
            "description": "This Group is for students from roll no. 31 to 60",
            "date": "16 August 2024"
          },
          {
            "id": "4",
            "name": "Group-1 (Roll no. 1-30)",
            "description": "This Group is for students from roll no. 1 to 30",
            "date": "16 August 2024"
          },
          {
            "id": "5",
            "name": "No Division",
            "description": "This is when there are no groups in a Class",
            "date": "16 August 2024"
          }
        
    
      
  ];
  


  

  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedName, setSelectedName] = useState(null);
    const [filteredCourses, setFilteredCourses] = useState(divisions);


    const router = useRouter();

   // Search Button Logic
  const handleSearch = () => {
    const filtered = divisions.filter((division) => {
      return (
        // (!selectedTeacher || course.classTeacher === selectedTeacher) &&
        (!selectedName || division.name === selectedName) 
        // &&
        // (!selectedDepartment || course.department === selectedDepartment)
      );
    });
    setFilteredCourses(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedName(null);
    setFilteredCourses(divisions);
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
          data={divisions.map((division) => ({ label: division.name, value: division.name }))}
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
<ScrollView style={{marginTop: 20, marginBottom: 0}}>
{filteredCourses.map((course, index) => {
  return (
    <View style={styles.list} key={index} >
      <Text style={{position:'relative', fontSize:18, left:30, color:'#58A8F9',marginTop:10}}>{course.name}</Text>
      <View style={{flex:1, flexDirection:'row'}}>

      <View style={styles.listContent}>
          <Text style={{fontSize:13,width:"75%",color:'grey'}}>
            {course.description}
          </Text>
          <Text style={{fontSize:13,color:'grey'}}>{course.date}</Text>
          
      </View>
      <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center',marginBottom:5}} >
                <Image source={require('../../../../assets/images/images/edit.png')}/>

                </TouchableOpacity>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../../../assets/images/images/delete.png')}/>

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
      height: 105,
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
      left:30,
      marginBottom:15,
    //   marginTop:,

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
        right:35,
        bottom:10
      }
    

  });