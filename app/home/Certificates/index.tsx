// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

// const ComingSoonScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Image 
//         source={require('../../../assets/images/images/handboy.png')}
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


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';
import * as Print from 'expo-print';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';



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
      const classesResponse = await axios.get('https://dreamscloudtechbackend.onrender.com/api/classes');
      setClasses(classesResponse.data || []);
      
      const yearResponse = await axios.get('https://dreamscloudtechbackend.onrender.com/api/yeargroup');
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
            text-align: center;
            margin: 0;
            padding: 0;
            height: 100%;
          }
          .certificate-container {
            border: 5px solid #00796b;
            border-radius: 15px;
            padding: 30px;
            background: white;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
          }
          .header {
            font-size: 36px;
            font-weight: bold;
            color: #00796b;
            margin-bottom: 20px;
          }
          .subheader {
            font-size: 24px;
            color: #333;
            margin-bottom: 40px;
          }
          .student-name {
            font-size: 32px;
            font-weight: bold;
            color: #4caf50;
            margin-bottom: 30px;
          }
          .description {
            font-size: 24px;
            color: #555;
            margin-bottom: 50px;
            max-width: 80%;
          }
          .footer {
            font-size: 20px;
            color: #00796b;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="certificate-container">
          <div class="header">Certificate of Achievement</div>
          <div class="subheader">This is to certify that</div>
          <div class="student-name">${data[0]?.students[0]?.name || 'Student Name'}</div>
          <div class="description">
            Has successfully demonstrated excellence in their performance and has completed the term 
            with great distinction.
          </div>
          <div class="footer">Issued on: ${new Date().toLocaleDateString()}</div>
        </div>
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







<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset} >
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} onPress={handleSearch} >
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>
          </View>


         {data.length >= 0 && <TouchableOpacity style={styles.printButton} onPress={generatePDF}>
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