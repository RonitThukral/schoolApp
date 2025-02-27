import { View, Text, StyleSheet, TextInput,TouchableOpacity,ScrollView, SafeAreaView ,Image ,FlatList, Alert} from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import axios from 'axios';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';


const contactInfo = () => {

  const {personalData, academicData, contactData} = useLocalSearchParams()

  const parsedPersonalData = personalData ? JSON.parse(personalData) : null
  const parsedAcademicData = personalData ? JSON.parse(academicData) : null
  const parsedContactData = personalData ? JSON.parse(contactData) : null

  // const parsedStudent = student ? JSON.parse(student) : null;

  // console.log(personalData,'smdsm')
  // console.log(academicData,'smdsfsdfm')
  // console.log(contactData,'smdaOKPsm')


    const [guardian, setGuardian] = useState([])
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [relationship, setRelationship] = useState('')
    const [occupation, setOccupation] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [address, setAddress] = useState('')



    const router = useRouter()

    const InfoRow = ({ label, value ,isMultiLine = true}) => (
        <View style={styles.infoRow}>
          <Text style={styles.label}>{label}</Text>
          <View style={{ position: 'relative', right: responsiveWidth(3), top: 3 }}>
    
          <Text style={[isMultiLine ? styles.multiLine : styles.value]}>{value}</Text>
          </View>
        </View>
      );



    const handlePrevious = () => {
        router.back()
    }
    
    
    const handleAddGuardian = () => {
        if (!name || !relationship || !email || !occupation || !address) {
          alert('Please fill all fields before adding.');
          return;
        }
    
        setGuardian([
          ...guardian,
          { 
            id: Math.random().toString(), // Unique ID for FlatList
            name, 
            lastName,
            mobile,
            relationship, 
            occupation, 
            email, 
            address 
          },
        ]);
    
        // Clear input fields
        setName('');
        setRelationship('');
        setOccupation('');
        setEmail('');
        setAddress('');
        setLastName('');
      };
      
     

      const handleAddStudent = async() => {
        // Extracting data from params
        const studentData = {
          // Mapping the data to match the API structure
          profileUrl: "", // Assuming you will handle profile URL separately
      
          // Personal Data from params
          name: `${parsedPersonalData.firstName}`,
          // setuserID: null, // Assuming autoID logic is handled somewhere else
          middleName: "", // If you need to capture this from the form, add a state for it
          surname: parsedPersonalData.lastName,
          gender: parsedPersonalData.gender,
          dateofBirth: parsedPersonalData.dob, // Ensure format matches API expectations (DD-MM-YYYY)
          email: parsedPersonalData.email,
          nationality: parsedPersonalData.category, // If nationality is required, capture it in the form
          religion: parsedPersonalData.caste, // If religion is required, capture it in the form
          placeOfBirth: "", // If place of birth is required, capture it in the form
          health: "", // If health status is required, capture it in the form
          disease: parsedPersonalData.doa, // If disease information is required, capture it in the form
          allege: "", // If allege information is required, capture it in the form
      
          // Academic Data from params
          setuserID : parsedAcademicData.userID,
          classID: parsedAcademicData.class,
          division: parsedAcademicData.division,
          dormitoryID: parsedAcademicData.dormitories,
          section: parsedAcademicData.section,
          status: parsedAcademicData.status,
          campusID: parsedAcademicData.campus,
          scholarship: parsedAcademicData.scholarship,
      
          // Contact Data from params
          fees: parsedAcademicData.category, // Assuming fees category is required, capture it in the form
          lastSchool: {
            school: "", // If the last school is required, capture it in the form
            reason: "", // If the reason for transfer is required, capture it in the form
          },
          mobilenumber: parsedContactData.mobileNumber,
          telephone: parsedContactData.smsNumber, // If telephone number is required, capture it in the form
          postalAddress: parsedContactData.postalAddress,
          physicalAddress: parsedContactData.areaOfResidence,
      
          // Guardian Data (if any guardians have been added)
          guadian: guardian,  // Send the guardian array here
        };
      
        console.log('Data to send to API:', studentData);
      
        // Send data to the API
        try {
          const response = await axios.post(`${baseUrl}/students/create`, studentData);
        
          console.log("Full API Response:", response?.data);
        
          if (response.data.error) {
            Alert.alert('Error', "Error Adding Student")

            console.error("API Error:", response.data.error);
          } else {
            Alert.alert('Success', "Student added successfully")
            console.log("Student added successfully:", response.data);
          }
        
        } catch (error) {
          console.error("Error status:", error.response ? error.response.status : "No status");
          console.error("Error details:", error.response ? error.response.data : error.message);
        }
        
      
        // After sending data, navigate
        router.back()
        router.back()
        router.back()
        router.back()
      };
      


  return (
    <SafeAreaView style={{flex:1}}>
        <ScrollView style={{backgroundColor:'#FFFFFF',}}>


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
        <Text style={{position:'relative', right:45, fontSize:22,fontWeight:'600', marginVertical:0,paddingTop:45}}>Guardian Information</Text>
          
        </View>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="First Name" onChangeText={setName} value={name}/>
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="Last Name" onChangeText={setLastName} value={lastName}/>
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="Mobile" onChangeText={setMobile} value={mobile} keyboardType='numeric'/>
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="Relationship" onChangeText={setRelationship} value={relationship}/>
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="Occupation" onChangeText={setOccupation} value={occupation}/>
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="Email" onChangeText={setEmail} value={email}/>
          <TextInput style={styles.areaInputResi} placeholderTextColor={'grey'} placeholder="Area of Residence" numberOfLines={4} multiline textAlignVertical='top' onChangeText={setAddress} value={address}/>
          </View>

          <View style={{flex:1, flexDirection:'row',position:'relative',paddingVertical:10 ,width:"80%",justifyContent:'space-between',alignSelf:'center',bottom:10}}>
        <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
            <Text style={{alignSelf:'center', position:'relative', color:'#58A8F9'}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddGuardian} >
            <Text style={{alignSelf:'center', position:'relative', color:'white'}}>Add Guardian</Text>
        </TouchableOpacity>
    </View>


    <FlatList
          data={guardian}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
          <InfoRow label="Name" value={item.name} />
          <InfoRow label="Relationship" value={item.relationship} />
          <InfoRow label="Email" value={item.email} />
          <InfoRow label="Occupation" value={item.occupation} />
          <InfoRow label="Address" value={item.address} />
          </View>
          )}
        />    

    <TouchableOpacity style={{width:'80%', height:60, backgroundColor:"#58A8F9", borderRadius:40, alignSelf:'center', justifyContent:'center',marginVertical:10}} onPress={handleAddStudent}>
        <Text style={{color:'white',textAlign:'center', fontSize:26}}>Add Student</Text>
    </TouchableOpacity>
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
      areaInputResi: {
        width: '80%',
        height: 100,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
        // paddingBottom:70
      },
      
      container:{
        marginVertical:20
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
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
      },
      label: {
        fontWeight:'bold',
        color: '#666',
        fontSize: 14,
      },
      value: {
        color:'grey',
        fontSize: 14,
      },
      multiLine : {
        flexWrap:'wrap',
        // width:'70%',
        // marginTop:10,
        fontSize:12,
        color:'grey',
        paddingRight:responsiveWidth(0),
        marginRight:responsiveWidth(1),
        width:responsiveWidth(38),
        // backgroundColor:'red'
    
      },
      cardContainer:{
        marginVertical:10,
        width:"80%",
        height:'auto',
        alignSelf:'center',
        borderRadius:10,
        borderWidth:1,
        borderColor:"#58A8F9",
        paddingHorizontal:15,
        paddingVertical:10
        
      }
})

export default contactInfo