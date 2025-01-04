import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import axios from 'axios';


  const studentData =[
    
      {
        "id": "1",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "2",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "3",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "4",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "5",
        name: "John Doe",
        "class": "10A"
      },
      {
        "id": "6",
        name: "Jane Smith",
        "class": "9B"
      },
      {
        "id": "7",
        name: "Michael Brown",
        "class": "11C"
      },
      {
        "id": "8",
        name: "Emily Davis",
        "class": "10A"
      },
      {
        "id": "8",
        name: "Daniel Johnson",
        "class": "8A"
      },
      {
        "id": "9",
        name: "Sophia Wilson",
        "class": "12B"
      },
      {
        "id": "10",
        name: "Matthew Miller",
        "class": "9C"
      },
      {
        "id": "11",
        name: "Olivia Martin",
        "class": "11A"
      },
      {
        "id": "12",
        name: "James Taylor",
        "class": "8B"
      },
      {
        "id": "13",
        name: "Charlotte Anderson",
        "class": "10C"
      }
  ]

  const listData = [
    {
        id: "73739739753",
      name: "Roses N Lilies",
      title:'Pre-Nursery',
      classTeacher: "Daksh Singh",
      group: "nur",
      division: "Group 4",
      prefect: "Richa Sharma",
      sbaStaff: "N/A"
    },
    {
        id: "7373973975",
      name: "Roses N Lilies",
      title:'Nursery',
      classTeacher: "Daksh Singh",
      group: "nur",
      division: "Group 4",
      prefect: "Richa Sharma",
      sbaStaff: "N/A"
    },
    
      {
        id: "737397397",
        name: "Roses N Lilies",
        title:'L.K.G',
        classTeacher: "Anita Kumar",
        group: "LKG A",
        division: "Group 1",
        prefect: "Ajay Mehta",
        sbaStaff: "N/A"
      },
      {
        id: "7373939753",
        name: "Roses N Lilies",
        title:'L.K.G',
        classTeacher: "Anita Kumar",
        group: "LKG B",
        division: "Group 2",
        prefect: "Sita Rao",
        sbaStaff: "N/A"
      },
    {
        id: "7379739753",
      name: "Roses N Lilies",
      title:'U.K.G',
      classTeacher: "Ravi Patel",
      group: "UKG A",
      division: "Group 1",
      prefect: "Vikram Singh",
      sbaStaff: "N/A"
    },
    {
        id: "7339739753",
      name: "Roses N Lilies",
      title:'U.K.G',
      classTeacher: "Priya Singh",
      group: "1A",
      division: "Group 1",
      prefect: "Neha Desai",
      sbaStaff: "N/A"
    },
     {
        id: "7739739753",
      name: "Roses N Lilies",
      title:'Pre-Nursery',
      classTeacher: "Mohit Sharma",
      group: "2A",
      division: "Group 2",
      prefect: "Karan Gupta",
      sbaStaff: "N/A"
    
  }]


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
    const [selectedCampuses, setSelectedCampuses] = useState(null)
    const [selectedClassTeacher, setSelectedClassTeacher] = useState(null);
    const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
    const [classes , setClasses] = useState([])
    const [filteredClasses, setFilteredClasses] = useState([]);
const [campuses, setCampuses] = useState([])
const [teachers, setTeachers] = useState([])
   



    useEffect(() => {
      const fetchAllData = async () => {
        try {
          // Fetch campuses and teachers in parallel
          const [campusResponse, teacherResponse] = await Promise.all([
            axios.get(`${baseUrl}/campuses`),
            axios.get(`${baseUrl}/teachers`)
          ]);
    
          // Set campuses data
          setCampuses(campusResponse.data);
    
          // Set teachers data
          const formattedTeachers = teacherResponse.data.map((teacher) => ({
            id: teacher._id,
            userID: teacher.userID || 'N/A',
            designation: teacher.role || 'N/A',
            name: `${teacher.name} ${teacher.surname}`
          }));
          setTeachers(formattedTeachers);
    
          // Fetch classes after campuses and teachers are populated
          const classesResponse = await axios.get(`${baseUrl}/classes`);
          const formattedClasses = classesResponse.data.map((cls) => {
            const teacherData = formattedTeachers.find((teacher) => teacher.userID === cls.teacherID);
            const campusData = campusResponse.data.find((campus) => campus._id === cls.campusID);
    
            return {
              name: cls.name,
              classCode: cls.classCode,
              campus: campusData ? campusData.name : 'N/A',
              id: cls._id,
              teacher: teacherData ? teacherData.name : 'N/A',
              academic: cls.academic || 'N/A',
              prefect: cls.prefect || 'N/A',
              division: cls.division || 'N/A',
              sba: cls.sba,
              group: cls.group || 'N/A',
              sbaStaff: cls.sbaStaff || 'N/A',
            };
          });
    
          setClasses(formattedClasses);
          setFilteredClasses(formattedClasses);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchAllData();
    }, []);
    


   // Search Button Logic
  const handleSearch = () => {
    const filtered = classes.filter((data) => {
      return (
        (!selectedID || data.classCode === selectedID) &&
        (!selectedCampuses || data.campus === selectedCampuses) &&
        (!selectedClassTeacher || data.teacher === selectedClassTeacher)
      );
    });
    setFilteredClasses(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedID(null);
    setSelectedCampuses(null);
    setSelectedClassTeacher(null);
    setFilteredClasses(classes);
  };

   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    

    const toggleSection = (id: string) => {
        setExpandedSectionId((prev) => (prev === id ? null : id));
      };



      const InfoRow = ({ label, value ,isMultiLine = false}:any) => (
        <View style={styles.infoRow}>
          <Text style={styles.label}>{label}</Text>
          <View style={{width:'70%', left:10, top:0}}>
    
          <Text style={[isMultiLine ? styles.multiLine : styles.value]}>{value}</Text>
          </View>
        </View>
      );
    
      const Section = ({ id,title,subTitle, children }:any):any => {
          const isExpanded = expandedSectionId === id
        return(
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => {toggleSection(id)}}
            activeOpacity={0.7}
          >
            <View style={{flex:1, flexDirection:'column'}}>

            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={{color:'grey',position:'relative',left:15}}>{subTitle}</Text>
            </View>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#58A8F9"
            />
          </TouchableOpacity>
          {isExpanded && (
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.sectionContent}>
              {children}
            </View>
            <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../../assets/images/images/edit.png')}/>

                </TouchableOpacity>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image source={require('../../../assets/images/images/delete.png')}/>

                </TouchableOpacity>
            </View>

            </View>
          )}
        </View>
      )};
   

    return (
        <>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes.map((cls) => ({label: cls.classCode.toUpperCase(), value: cls.classCode}))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Class'}
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
          data={campuses.map((data) => ({ label: data.name, value: data.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Campus'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          value={selectedCampuses}
          onChange={(item) => setSelectedCampuses(item.value)}
       
        />
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={teachers.map((data) => ({ label: data.name, value: data.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Teacher'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedClassTeacher}
          onChange={(item) => setSelectedClassTeacher(item.value)}
       
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

<View style={{height:1,width:'100%', borderBottomWidth:0.5,borderColor:'grey'}}></View>

{/* List of students section */}
<ScrollView style={{marginTop: 0, marginBottom: 0, backgroundColor:'#FFFFFF'}} contentContainerStyle={{paddingBottom:40}}>

{filteredClasses.map((data, index) => {
  return (
    <Section
    key={index}
    id={data.id}
          title={data.name}
          subTitle= {data.campus}
          
        >
          <InfoRow label="Class Teacher" value={data.teacher} />
          <InfoRow label="SBA Staff" value={data.sbaStaff} />
          <InfoRow label="division" value={data.division} />
          <InfoRow label="prefect" value={data.prefect} />
          <InfoRow label="group" value={data.group} />
          
        </Section>
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
      paddingVertical:70,
      marginTop:0
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
    // label: {
    //   position: 'absolute',
    //   backgroundColor: 'transparent',
    //   left: 45,
    //   top: 5,
    //   zIndex: 999,
    //   paddingHorizontal: 8,
    //   fontSize: 14,
    // },
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
      // paddingTop:15
      position:'relative',
      top:10
      
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
      marginBottom: 0,
      marginTop: 20
    },
    listBtns:{
        position:'absolute',
        right:30
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
    section: {

        width:"80%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        //  backgroundColor: 'red',
         marginHorizontal: 16,
        marginTop: 10,
         borderRadius: 8,
         overflow: 'hidden',
         elevation: 3, // Adds shadow for Android
         shadowColor: '#000', // Adds shadow for iOS
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.1,
         shadowRadius: 3,
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
        fontSize: 20,
        fontWeight: '500',
        color:'#58A8F9',
        position:'relative',
        left:13
      },
      sectionContent: {
        padding: 16,
        width:"100%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        // backgroundColor: 'red',
        marginHorizontal: 16,
        paddingTop: 0 ,
        borderRadius: 10,
        overflow: 'hidden',
        // flexDirection:'row'
        
        // elevation: 4, // Adds shadow for Android
        // shadowColor: '#000', // Adds shadow for iOS
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
        
      },
      
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
      },
      label: {
        fontWeight:'600',
        color: '#666',
        fontSize: 12,
      },
      value: {
        color:'grey',
        fontSize: 12,
        // fontWeight:'400'
        position:'relative',
        left:20
      },
      multiLine : {
        flexWrap:'wrap',
        // width:'70%',
        // marginTop:10,
        fontSize:12,
        color:'grey'
      }
    

  });