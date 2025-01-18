// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { RotateOutDownRight } from 'react-native-reanimated';


// const ComingSoonScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Image 
//         source={require('../../../../assets/images/images/handboy.png')}
//         style={styles.image}
//       />
//       <Text style={styles.title}>We're Launching Soon!</Text>
//       <Text style={styles.subtitle}>
//         Our team is working hard to give you an amazing experience. Stay tuned!
//       </Text>
      
//       <TouchableOpacity style={styles.notifyButton}>
//         <Text style={styles.notifyText}>Notify Me</Text>
//       </TouchableOpacity>

     
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E1E2E',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: Dimensions.get('window').width * 0.8,
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#CCCCCC',
//     textAlign: 'center',
//     marginBottom: 30,
//     lineHeight: 24,
//   },
//   notifyButton: {
//     backgroundColor: '#FF6F61',
//     borderRadius: 25,
//     paddingVertical: 12,
//     paddingHorizontal: 35,
//     marginBottom: 30,
//   },
//   notifyText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     marginBottom: 10,
//   },
//   socialIcons: {
//     flexDirection: 'row',
//     gap: 20,
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     tintColor: '#FFFFFF',
//   },
// });

// export default ComingSoonScreen;

// Import statements remain unchanged
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter,useLocalSearchParams, router } from 'expo-router';
import axios from 'axios';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';


const months = [
  { label: 'January', value: '1' },
  { label: 'February', value: '2' },
  { label: 'March', value: '3' },
  { label: 'April', value: '4' },
  { label: 'May', value: '5' },
  { label: 'June', value: '6' },
  { label: 'July', value: '7' },
  { label: 'August', value: '8' },
  { label: 'September', value: '9' },
  { label: 'October', value: '10' },
  { label: 'November', value: '11' },
  { label: 'December', value: '12' },
];


const AcademicYear = [
  { label: '2024', value: '2024' },
  { label: '2025', value: '2025' },
  { label: '2026', value: '2026' },
  { label: '2027', value: '2027' },
  { label: '2029', value: '2029' }
];

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api"; // Base API URL


const SalaryPayment = () => {
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [staff, setStaff] = useState([]);

  const fetchStaff = async () => {
    try {
      const response = await axios.get(`${baseUrl}/teachers`);
      const formattedStaff = response.data.map((person) => ({
        userID: person.userID || 'N/A',
        name: `${person.name} ${person.surname}` ||'N/A',
        position: person.position || 'N/A'
      }));
      setStaff(formattedStaff);
    } catch (error) {
      console.error('Error fetching staff:', error.message);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);


  const handleStaff = (id,name,position) => {
    if (!selectedMonth || !selectedYear){
     return Alert.alert('Warning','Choose Month and Year first')
    }
    router.push({
      pathname: '/home/Teachers/Payment/Payrow',
      params: { staffId: id,month:selectedMonth,year: selectedYear,name: name,position: position },  // Use 'params' here instead of 'query'
    });
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: responsiveWidth(75) }}>
        <View style={{ marginTop: 50 }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={months}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Month'}
            value={selectedMonth}
            onChange={(item) => setSelectedMonth(item.value)}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={AcademicYear}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Academic Year'}
            value={selectedYear}
            onChange={(item) => setSelectedYear(item.value)}
          />
          
         
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.reset} >
            <Text style={{ color: '#58A8F9' }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} >
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Search</Text>
          </TouchableOpacity>
        </View>
        </View>

<View style={styles.container1}>

        <FlatList
        data={staff}  // Use filtered students
        keyExtractor={(item) => item.userID}
        style={styles.list}
        contentContainerStyle={{paddingTop:responsiveHeight(4),paddingBottom:20}}
        renderItem={({ item }) => {
          
          return (
            <TouchableOpacity style={styles.studentCard} onPress={() => handleStaff(item.userID,item.name,item.position)}>
              <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
              
              <View style={{ flexDirection: 'column', position: 'absolute', left: '33%' }}>
               <Text style={styles.studentTextid}>{item.userID}</Text>
               <Text style={styles.studentText}>{item.name}</Text>
             </View>
              

              <TouchableOpacity>
        <Image source={require('../../../../assets/images/images/eye.png')} style={styles.eyeImg}/>        
        </TouchableOpacity>
            </TouchableOpacity>
          );
        }}
      />
</View>


     
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  container1: { flex: 1, backgroundColor: 'white' ,position:'relative',bottom:responsiveHeight(10)},
  searchBar: {
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: '#daedff',
  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    alignSelf: 'center',
    height: 75,
  },
  studentTextid: { fontSize: 18, color: '#007bff' },
  studentText: { fontSize: 14 },
  img: {
    marginHorizontal: 20,
    width: 42,
    height: 42,
  },
  eyeImg:{
    width:30,
    height:30,
position:'relative',
right:40
},
  list: {
    flexGrow: 1,
    height:'80%'
  },
  dropdown: {
    height: 50,
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#daedff',
    marginBottom: 15,
    alignSelf: 'center',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    position:'relative',
    right:20,
    top:10
  },
  search: {
    width: 110,
    height: 35,
    borderRadius: 15,
    backgroundColor: '#58A8F9',
    justifyContent: 'center',
  },
  reset: {
    backgroundColor: 'transparent',
    width: 70,
    height: 35,
    justifyContent: 'center',
    marginRight: 15,
  },
  paid:{
    width:70,
    height:20, 
    backgroundColor:'#daf6cb',
    borderRadius:15, 
    position:'relative',
    left:responsiveWidth(10),
    bottom:responsiveWidth(1),
  },
  paidText:{
    textAlign:'center',
    paddingTop:3,
    fontSize:10,
    color:'green'
  },
  advance:{
    width:70,
    height:20, 
    backgroundColor:'#f0ad4e',
    borderRadius:15, 
    position:'relative',
    left:responsiveWidth(10),
    bottom:responsiveWidth(1),
  },
  advanceText:{
    textAlign:'center',
    paddingTop:3,
    fontSize:10,
    color:'#a94442'
  },
  pending:{
    width:70,
    height:20, 
    backgroundColor:'#ff7c7c',
    borderRadius:15, 
    position:'relative',
    left:responsiveWidth(10),
    
    bottom:responsiveWidth(1),
  },
  pendingText:{
    textAlign:'center',
    paddingTop:2,
    fontSize:10,
    color:'#842323'
  }
});

export default SalaryPayment;