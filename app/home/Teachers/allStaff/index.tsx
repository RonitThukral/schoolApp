import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import axios from 'axios';



// const teacherData =  [
//     {
//         id: "TK20242",
//         name: "Daksh Singh",
//         designation: "Teacher",
//         class: "10-A",
//       },
//       {
//         id: "TK20244",
//         name: "Nitesh Kumar",
//         designation: "Senior Teacher",
//         class: "12-B",
//       },
//       {
//         id: "TK202437",
//         name: "Emily Jones",
//         designation: "Teacher",
//         class: "8-C",
//       },
//       {
//         id: "TK202411",
//         name: "Ankita Gaur",
//         designation: "Senior Teacher",
//         class: "11-D",
//       },
//       {
//         id: "TK202408",
//         name: "Deepak Kumar",
//         designation: "Senior Teacher",
//         class: "9-E",
//       },
//     ];
  
  


//   const data = [
//     { label: 'Item 1', value: '1' },
//     { label: 'Item 2', value: '2' },
//     { label: 'Item 3', value: '3' },
//     { label: 'Item 4', value: '4' },
//     { label: 'Item 5', value: '5' },
//     { label: 'Item 6', value: '6' },
//     { label: 'Item 7', value: '7' },
//     { label: 'Item 8', value: '8' },
//   ];

  // interface Values {
  //   [key: string]: string | null;
  // }

  const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'


  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedID, setSelectedID] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [filteredTeachers, setFilteredTeachers] = useState([]);
    const [teachers, setTeachers] = useState([]);


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
        setFilteredTeachers(formatedData)
        console.log(teachers); // You can now use the teachers data as needed
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    }



    useEffect(() => {
      fetchTeachers();
    },[])

   // Search Button Logic
  const handleSearch = () => {
    const filtered = filteredTeachers.filter((teacher) => {
      return (
        (!selectedID || teacher.userID === selectedID) &&
        (!selectedName || teacher.name === selectedName) 
        // &&
        // (!selectedClass || student.class === selectedClass)
      );
    });
    setFilteredTeachers(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedID(null);
    setSelectedName(null);
    // setSelectedClass(null);
    setFilteredTeachers(teachers);
  };

   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    const handlePress = () => {
      router.navigate('../staffDetails')
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
          data={filteredTeachers.map((teacher) => ({ label: teacher.userID, value: teacher.userID }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by ID'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedID}
          onChange={(item) => setSelectedID(item.value)}
       
        />
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={filteredTeachers.map((teacher) => ({ label: teacher.name, value: teacher.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Name'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
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
<ScrollView style={{backgroundColor:'white',flex:1}}>
{filteredTeachers.map((teacher, index) => {
  return (
    <TouchableOpacity style={styles.list} key={index} onPress={handlePress}>
      <Image style={styles.stImg} source={require('../../../../assets/images/images/avatar.png')}/>
      <View style={styles.listContent}>
      <Text style={{color: '#58A8F9', fontSize:20}}>{teacher.name}</Text>
      <Text style={{color: 'grey', fontSize:12, fontWeight:'condensedBold'}}>{teacher.userID}</Text>
      <Text style={{color: 'grey', fontSize:12,fontWeight:'condensedBold'}}>{teacher.designation}</Text>
      </View>
      <AntDesign name="arrowright" size={24} color="#58A8F9" style={{position:'relative', right:30}} />
    </TouchableOpacity>
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
      paddingVertical:50
      
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
      paddingHorizontal:15
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
      width: "90%",
      height: 100,
      borderColor: 'grey',
      borderRadius: 10,
      // backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      marginBottom: 10,
      marginTop: 10,
      elevation:3
    },
    stImg:{
      width:60,
      height:60,
      position:'absolute',
      left: 40,
      backgroundColor:'white',
      borderRadius:100
    },
    listContent:{
      flexDirection:'column',
      position: 'relative',
      left:130
    },
    

  });