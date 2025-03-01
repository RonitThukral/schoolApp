import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';
import axios from 'axios';
import * as Print from 'expo-print';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const baseUrl = 'https://api.dreameducation.org.in/api';

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
      const teachers = response.data;
      const formattedData = teachers.map((teacher) => ({
        id: teacher._id,
        userID: teacher.userID || 'N/A',
        designation: teacher.role || 'N/A',
        name: `${teacher.name} ${teacher.surname}`,
        gender: teacher.gender || 'N/A'
      }));
      setTeachers(formattedData);
      setFilteredTeachers(formattedData);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSearch = () => {
    const filtered = teachers.filter((teacher) => {
      return (
        (!selectedID || teacher.userID === selectedID) &&
        (!selectedName || teacher.name === selectedName)
      );
    });
    setFilteredTeachers(filtered);
  };

  const handleReset = () => {
    setSelectedID(null);
    setSelectedName(null);
    setFilteredTeachers(teachers);
  };

  const handleFocus = (id: string) => {
    setIsFocus(id);
  };

  const handleBlur = () => {
    setIsFocus(null);
  };

  const handleSelectStaff = (id) => {
    router.push(`/home/Teachers/allStaff/staffDetails?staffId=${id}`);
  };

  // 📝 Generate PDF Logic with Print
  const generatePDF = async () => {
    try {
      const teacherDetails = filteredTeachers
        .map(
          (teacher) => `
          <tr>
            <td>${teacher.userID}</td>
            <td>${teacher.name}</td>
            <td>${teacher.gender}</td>
            <td>${teacher.designation}</td>
          </tr>`
        )
        .join('');

      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { text-align: center; margin-bottom: 20px; }
              table { width: 100%; border-collapse: collapse; margin-top: 20px; }
              th, td { border: 1px solid #ccc; text-align: left; padding: 8px; }
              th { background-color: #58A8F9; color: white; }
            </style>
          </head>
          <body>
            <h1>Staff List</h1>
            <table>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Position</th>
              </tr>
              ${teacherDetails}
            </table>
          </body>
        </html>
      `;

      // 🖨️ Print the PDF directly
      await Print.printAsync({
        html: htmlContent,
      });
    } catch (error) {
      console.error('Error generating or printing PDF:', error);
    }
  };

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        <Dropdown
          style={[styles.dropdown]}
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
          style={[styles.dropdown]}
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

        <View style={styles.footer}>

        <TouchableOpacity style={{position:'absolute',left:30,top:responsiveHeight(0.8)}} onPress={generatePDF}>
            <Text style={{ color: '#58a8f9', fontSize: 15 }}>Print PDF</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text style={{ color: '#58A8F9' }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} onPress={handleSearch}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Search</Text>
          </TouchableOpacity>

          
        </View>
      </View>

      <ScrollView style={{ backgroundColor: 'white', flex: 1 }} contentContainerStyle={{ paddingBottom: 30 }}>
        {filteredTeachers.map((teacher, index) => (
          <TouchableOpacity
            style={styles.list}
            key={index}
            onPress={() => handleSelectStaff(teacher.userID)}
          >
            <Image style={styles.stImg} source={require('../../../../assets/images/images/avatar.png')} />
            <View style={styles.listContent}>
              <Text style={{ color: '#58A8F9', fontSize: 20,width: responsiveWidth(50) }}>{teacher.name}</Text>
              <Text style={{ color: 'grey', fontSize: 12 }}>{teacher.userID}</Text>
              <Text style={{ color: 'grey', fontSize: 12 }}>{teacher.designation}</Text>
            </View>
            <Feather name="arrow-right" size={26} color="#58A8F9" style={{ position: 'relative', right: responsiveWidth(8) }} />
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
      paddingVertical:50,
      paddingTop:60
      
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
      paddingHorizontal:15,
      fontWeight:400
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
      width: "85%",
      height: 'auto',
      minHeight:100,
      borderColor: 'grey',
      borderRadius: 10,
      // backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      marginBottom: 10,
      marginTop: 6,
      elevation:8,
      ...Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.20,
          shadowRadius: 3.84,
        },
        
      }),
    },
    stImg:{
      width:60,
      height:60,
      position:'absolute',
      left: responsiveWidth(6),
      backgroundColor:'white',
      borderRadius:100
    },
    listContent:{
      flexDirection:'column',
      position: 'relative',
      left:responsiveWidth(27)
      
    },
    

  });