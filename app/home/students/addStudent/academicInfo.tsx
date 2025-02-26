import { View, Text,StyleSheet, SafeAreaView,ScrollView,Image,TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';

const dummyData = {
    class: [
      { label: "Nursery", value: "nursery" },
      { label: "Kindergarten", value: "kg" },
      { label: "Grade 1", value: "grade_1" },
      { label: "Grade 2", value: "grade_2" },
      { label: "Grade 3", value: "grade_3" },
      // Add more grades as needed
    ],
    sectionHouse: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
      { label: "Yellow", value: "yellow" },
    ],
    division: [
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
      { label: "D", value: "D" },
    ],
    status: [
      { label: "With Transport", value: "border" },
      { label: "Without Transport", value: "day" },
    ],
    busVan: [
      { label: "Bus 1", value: "bus_1" },
      { label: "Bus 2", value: "bus_2" },
      { label: "Van 1", value: "van_1" },
      { label: "Van 2", value: "van_2" },
    ],
    scholarship: [
      { label: "None", value: "none" },
      { label: "50% Fee Waiver", value: "50_percent" },
      { label: "Full Fee Waiver", value: "full" },
    ],
    feeCategory: [
      { label: "p-nur", value: "p-nur" },
      { label: "nur", value: "nur" },
      { label: "iv-a", value: "iv-a" },
      { label: "ii-a", value: "ii-a" },
    
    ],
    campus: [
      { label: "Main Campus", value: "main" },
      { label: "East Wing", value: "east_wing" },
      { label: "West Wing", value: "west_wing" },
      { label: "West Wing", value: "west_wing" },
      { label: "West Wing", value: "west_wing" },
      { label: "West Wing", value: "west_wing" },
    ],
  };

  const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'

  

const academicInfo = () => {

const {personalData} = useLocalSearchParams();
console.log(personalData, ' djfskjbgkjs')

    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [userID, setUserID] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSection, setSelectedSection] = useState(null);
    const [selectedDiv, setSelectedDiv] = useState(null);
    const [selectedDorm, setSelectedDorm] = useState(null);
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [selectedCampus, setSelectedCampus] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [classes, setClasses] = useState([]);
    const [sections, setSections] = useState([]);
    const [divs, setDivs] = useState([]);
    const [dorms, setDorms] = useState([]);
    const [scholarships, setScholarships] = useState([]);
    const [campuses, setCampuses] = useState([]);


    const router = useRouter();

    const fetchSections = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/sections`);
        const formatedData = response.data.map((sec) => ({
          label: sec.name,
          value: sec._id,
        }))

        setSections(formatedData)
      } catch (error) {
        console.error("Error fetching sections", error);
        Alert.alert("Error", "Failed to fetch sections.");
      }
      
    };


    const fetchCampus = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/campuses`);
        const formatedData = response.data.map((camp) => ({
          label: camp.name,
          value: camp._id,
        }))

        setCampuses(formatedData)
      } catch (error) {
        console.error("Error fetching sections", error);
        Alert.alert("Error", "Failed to fetch sections.");
      }
      
    };


    const fetchScholarships = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/scholarships`);
        const formatedData = response.data.map((sec) => ({
          label: sec.name,
          value: sec._id,
        }))

        setScholarships(formatedData)
      } catch (error) {
        console.error("Error fetching sections", error);
        Alert.alert("Error", "Failed to fetch sections.");
      }
      
    };


    const fetchDorm = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/dormitories`);
        const formatedData = response.data.map((dorm) => ({
          label: dorm.name,
          value: dorm._id,
        }))

        setDorms(formatedData)
      } catch (error) {
        console.error("Error fetching sections", error);
        Alert.alert("Error", "Failed to fetch sections.");
      }
      
    };
  
    const fetchDivision = async () => {
      // setLoading(true);
      try {
        const response = await axios.get(`${baseUrl}/divisions`);
        const formatedData = response.data.map((div) => ({
          label: div.name,
          value: div._id,
        }))

        setDivs(formatedData)
      } catch (error) {
        console.error("Error fetching sections", error);
        Alert.alert("Error", "Failed to fetch sections.");
      }
      
    };
  

    const fetchClasses = async() => {

      try {
        const response = await axios.get(`${baseUrl}/classes`)
  //  console.log(classes, 'classed')
        const formatedData = response.data.map((cls) => ({
          label: cls.name,
          value: cls.classCode,
        }))

        setClasses(formatedData)


      } catch (error) {
        console.error('Error fetching classes:', error.message);
      }

    }

    useEffect(() => {
      fetchClasses()
      fetchSections()
      fetchDivision()
      fetchDorm()
      fetchScholarships()
      fetchCampus()
    },[])
 
   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    const handlePrevious = () => {
        router.back()
    }
    const handleNext = () => {
      if(!selectedCampus || !selectedClass || !selectedDiv || !selectedStatus || !selectedDorm || !selectedScholarship || !selectedSection || !selectedStatus || !userID) {
        Alert.alert('Warning', 'Kindly Fill All The Fields')
      }
      const academicData = {
        class: selectedClass,
        section: selectedSection,
        division: selectedDiv,
        status: selectedStatus,
        dormitories: selectedDorm,
        scholarship: selectedScholarship,
        category: selectedCategory,
        campus: selectedCampus,
        userID: userID
      };
      router.navigate({ pathname: './contactInfo', params: { academicData: JSON.stringify(academicData),personalData } });
    }


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
        <ScrollView contentContainerStyle={{paddingBottom:40,flexGrow:1,}} >
        
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../../../assets/images/images/emptyAvatar.png')} // Add your placeholder image
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Feather name="camera" size={20} color="white" />
              </View>
            </View>
          
        </View>
        <Text style={{position:'relative', top:50 , left:40, fontSize:22,fontWeight:'600', marginVertical:0}}>Academic Information</Text>

    <View style={styles.container}>

    <TextInput style={styles.input} placeholder="Student ID (BK2024XX...)" placeholderTextColor="grey" value={userID} onChangeText={setUserID} />

    
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={classes}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={sections}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Section/House'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedSection}
          onChange={(item) => setSelectedSection(item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={divs}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Division'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedDiv}
          onChange={(item) => setSelectedDiv(item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.status}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Status'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedStatus}
          onChange={(item) => setSelectedStatus(item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dorms}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Bus/Van'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedDorm}
          onChange={(item) => setSelectedDorm(item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={scholarships}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Scolarship'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedScholarship}
          onChange={(item) => setSelectedScholarship(item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          dropdownPosition='top'
        //   containerStyle={styles.dropdownContainer}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.feeCategory}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Fee Category'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedCategory}
          onChange={(item) => setSelectedCategory(item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          dropdownPosition='top'
        //   inputSearchStyle={styles.inputSearchStyle}
          data={campuses}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Campus'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedCampus}
          onChange={(item) => setSelectedCampus(item.value)}
       
        />
    </View>

    <View style={{flex:1, flexDirection:'row',position:'relative',paddingVertical:120 ,width:"80%",justifyContent:'space-between',alignSelf:'center',bottom:1}}>
        <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
            <Text style={{alignSelf:'center', position:'relative', color:'#58A8F9'}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext} >
            <Text style={{alignSelf:'center', position:'relative', color:'white'}}>Next</Text>
        </TouchableOpacity>
    </View>

        </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    profileSection: {
        position: 'relative',
        top: 25,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15,
        paddingVertical: 16,
        // backgroundColor:'red'
      },
      avatarContainer: {
        position: 'relative',
        right: 15,
        top: 25,
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
        left: 70,
        backgroundColor: '#58A8F9',
        borderRadius: 100,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
      },
      input: {
        width: '80%',
        height: 50,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
      },
      container:{
        position:'relative',
        top:60,
        // backgroundColor:'red'
      },
      dropdown: {
        height: 50,
        width:"80%",
      //   borderColor: 'gray',
      //   borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor:'#DAEDFF',
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
      button: {
        width:110,
        height:35,
        backgroundColor: '#58A8F9',
        // position:'absolute',
        // right:20,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
        
      },
      previous:{
        width:110,
        height:35,
        backgroundColor: 'transparent',
        // position:'absolute',
        // left:50,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
        borderColor:"#58A8F9",
        borderWidth:1
      },
    //   dropdownContainer :{
    //     position:'relative',
    //     // backgroundColor:'red',
    //     bottom: 188,
    //     height:400
    //   }

})

export default academicInfo