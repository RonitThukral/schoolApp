import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import * as Print from 'expo-print';

const baseUrl = 'https://api.dreameducation.org.in/api';



const term = [
  {label: "1", value: '1'},
  {label: "2", value: '2'},
  {label: "3", value: '3'}
];

const index = () => {
  const [data, setData] = useState([]);
  const [classes, setClasses] = useState([]);
  const [years, setYears] = useState([]);
  const [isFocus, setIsFocus] = useState<string | null>(null);

  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedTerm, setSelectedTerm] = useState(null);

  const fetchInitialData = async () => {
    try {
      const classesResponse = await axios.get('https://api.dreameducation.org.in/api/classes');
      setClasses(classesResponse.data || []);
      
      const yearResponse = await axios.get('https://api.dreameducation.org.in/api/yeargroup');
      setYears(yearResponse.data || []);
    } catch (err) {
      console.error('Error fetching initial data:', err);
    }
  };

  useEffect(() => {
    fetchInitialData();
  },[]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selectedClass === "" || selectedTerm === "" || selectedYear === "") {
      return;
    }
    axios.get(`${baseUrl}/sba/class/${selectedClass}/${selectedYear}/${selectedTerm}`).then((result) => {
      setData(result.data.docs);
    });
  };

  const generatePDF = async () => {
    const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
          }
          h2 {
            text-align: center;
            color: #00796b;
            margin-bottom: 20px;
            margin-top: 60px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }
          th, td {
            padding: 10px;
            text-align: center;
            border: 1px solid #ddd;
          }
          th {
            background-color: #00796b;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
          tr:nth-child(odd) {
            background-color: #ffffff;
          }
          .grade-A {
            background-color: #4caf50;
            color: white;
          }
          .grade-B {
            background-color: #ffeb3b;
            color: black;
          }
          .grade-C {
            background-color: #ff9800;
            color: white;
          }
          .grade-F {
            background-color: #f44336;
            color: white;
          }
        </style>
      </head>
      <body>
        <h2>Student Marks Report</h2>
        <table>
          <thead>
            <tr>
            <th>Subject</th>
              <th>Student Name</th>
              <th>Exam Marks</th>
              <th>Classwork Marks</th>
              <th>Total Marks</th>
              <th>Grade</th>
              <th>Position</th>
            </tr>
          </thead>
          <tbody>
            ${data?.map((subject) => subject.students.map((student) => `
              <tr>
              <td>${subject.course.toUpperCase()}</td>
                <td>${student.name}</td>
                <td>${student.exam}</td>
                <td>${student.classWork}</td>
                <td>${student.total}</td>
                <td>${getGrade(student.total)}</td>
                <td>${student.position}</td>
              </tr>
            `)).join('')}
          </tbody>
        </table>
      </body>
    </html>
  `;

  const { uri } = await Print.printAsync({
    html: htmlContent,
  });
    console.log('PDF generated at:', uri);
  };

  const getGrade = (totalMarks) => {
    if (totalMarks >= 90) return 'A+';
    if (totalMarks >= 80) return 'A';
    if (totalMarks >= 70) return 'B+';
    if (totalMarks >= 60) return 'B';
    if (totalMarks >= 50) return 'C+';
    if (totalMarks >= 40) return 'C';
    return 'F';
  };

   
  const handleFocus = (id:string) => {
    setIsFocus(id)
  }

  const handleBlur = () => {
    setIsFocus(null)
  }

  const handleReset = () => {
    setSelectedClass(null)
    setSelectedYear(null)
    setSelectedTerm(null)
    setData([])
  }

  return (
    <SafeAreaView style={{flex:1}}>
    <View style={styles.container}>
      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes.map((cls) => ({label: cls.name, value: cls.classCode}))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
        />



      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={years.map((y) => ({label: y.year, value: y.year}))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Year'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedYear}
          onChange={(item) => setSelectedYear(item.value)}
        />

      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={term}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Term'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedTerm}
          onChange={(item) => setSelectedTerm(item.value)}
        />




<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset} >
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} onPress={handleSearch} >
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>
          </View>


         {data.length > 0 && <TouchableOpacity style={styles.printButton} onPress={generatePDF}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Generate PDF</Text>
      </TouchableOpacity>}

          </View>
          </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        paddingVertical:80,
        flex:1,
        
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
      
      footer :{
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position:'fixed',
        top:25,
        borderBottomWidth:0.5,
        paddingBottom:15,
       

      },
      search: {
        position:'relative',
        right:18,
        width: 110,
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
      printButton: {
        backgroundColor: '#58a8f9',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        position:'absolute',
        top:'70%',
        alignSelf:'center'
      },
     
})

export default index