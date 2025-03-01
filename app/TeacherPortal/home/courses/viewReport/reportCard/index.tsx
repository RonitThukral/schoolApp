import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,ImageBackground,Alert, Platform, SafeAreaView} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import * as Print from 'expo-print';
import axios from 'axios';
import Constants from 'expo-constants';


const baseUrl = Constants.expoConfig.extra.API_URL;

;


  


  const ReportCard = () => {
    const {studentId, term, year, selectedClass,course} = useLocalSearchParams();
    // const [filteredClasses, setFilteredClasses] = useState(listData);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);
    const [subjects , setSubjects] = useState([])
    const [pdfPath, setPdfPath] = useState('');
    
    // const router = useRouter();
    const fetchData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/sba/student/${studentId}/${year}/${term}`);
            const data = res?.data?.docs;
    
            // Filter subjects to only include the one from the params
            const filteredSubjects = data.filter(
                (item) => item.course.toLowerCase() === course.toLowerCase()
            );
    
            setSubjects(filteredSubjects);
        } catch (error) {
            console.error('Error fetching SBA data:', error);
        }
    };
    

   
    useEffect(() => {
        fetchData();
    },[])



    const generatePdfAndPrint = async () => {
        const htmlContent = `
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin-top: 50px;
            padding: 20px;
            background-color: #f9f9f9;
            color: #333;
          }
          .container {
            width: 100%;
            margin: 0 auto;
            text-align: center;
          }
          h1 {
            font-size: 28px;
            color: red;
            margin-bottom: 20px;
          }
          h2 {
            font-size: 26px;
            color: #58a8f9;
            margin-bottom: 20px;
          }
            span{
            font-size: 20px;
            color: black;
            }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
            background-color: #fff;
          }
          th, td {
            border: 1px solid #ddd;
            text-align: left;
            padding: 10px;
          }
          th {
            background-color: #58a8f9;
            color: white;
          }
          tr:nth-child(even) {
            background-color: #f2f2f2;
          }
        </style>
        <div class="container">
          <h1>Roses N Lillies High School</h1>
          <h2>Report Card</h2>
          <p>Class: ${selectedClass.toUpperCase()} | Term: ${term} | Year: ${year} </p>
          <span>${subjects[0].name}</span>
          <table>
            <thead>
              <tr>
                <th>Subject</th>
                <th>Class Work</th>
                <th>Exam</th>
                <th>Exam Percentage</th>
                <th>Class Work Percentage</th>
                <th>Total</th>
                <th>Grade</th>
                <th>Interpretation</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              ${subjects
                .map(
                  (data) => `
                <tr>
                  <td>${data.course}</td>
                  <td>${data.classWork || '--'}</td>
                  <td>${data.exam || '--'}</td>
                  <td>${data.examPercentage || '--'}</td>
                  <td>${data.classWorkPercentage || '--'}</td>
                  <td>${getTotal(data.classWorkPercentage , data.examPercentage) || '--'}</td>
                  <td>${getGrade(data.classWork, data.exam) || '--'}</td>
                  <td>${getInterpretation(data.classWork, data.exam) || '--'}</td>
                  <td>${data.position || '--'}</td>
                </tr>`
                )
                .join('')}
            </tbody>
          </table>
        </div>
      `;
    
        try {
          const { uri } = await Print.printToFileAsync({ html: htmlContent });
          setPdfPath(uri);
          await Print.printAsync({ uri });
          Alert.alert('PDF Generated', 'Report Card is ready to print!');
        } catch (error) {
          console.error('Error generating PDF:', error);
          Alert.alert('Error', 'Failed to generate or print PDF');
        }
      };




    
  const toggleSection = (id: string) => {
    setExpandedSections((prev) => 
      prev.includes(id) ? prev.filter((sectionId) => sectionId !== id) : [...prev, id]
    );
  };


  const getTotal = (exams, work) => {
    if (!work && !exams) {
      return "-";
    }
    return Number(exams || 0) + Number(work || 0);
  };

  const getGrade = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    if (num >= 75 && num <= 100) {
      return "A1";
    } else if (num >= 70 && num <= 74) {
      return "B2";
    } else if (num >= 65 && num <= 69) {
      return "B3";
    } else if (num >= 60 && num <= 64) {
      return "C4";
    } else if (num >= 55 && num <= 59) {
      return "C5";
    } else if (num >= 50 && num <= 54) {
      return "C6";
    } else if (num >= 45 && num <= 49) {
      return "D7";
    } else if (num >= 40 && num <= 44) {
      return "E8";
    } else if (num >= 0 && num <= 39) {
      return "F9";
    } else {
      return null;
    }
  };
      

  const getInterpretation = (classwork, exam) => {
    if (!classwork && !exam) {
      return "-";
    }
    let num = getTotal(classwork, exam);
    num = Number(num);
    if (num > 75 && num <= 100) {
      return "Excellent";
    } else if (num >= 70 && num <= 74) {
      return "Very good";
    } else if (num >= 65 && num <= 69) {
      return "Good";
    } else if (num >= 60 && num <= 64) {
      return "Credit";
    } else if (num >= 55 && num <= 59) {
      return "Credit";
    } else if (num >= 50 && num <= 54) {
      return "Credit";
    } else if (num >= 45 && num <= 49) {
      return "Pass";
    } else if (num >= 40 && num <= 44) {
      return "Pass";
    } else if (num >= 0 && num <= 39) {
      return "Failure";
    } else {
      return null;
    }
  };

    
      const InfoRow1 = ({ label, value}:any) => (
        <View style={styles.infoRow1}>
          <Text style={styles.label1}>{label}</Text>
          <View style={{width:'70%', left:20 }}>
    
          <Text style={styles.value1}>{value}</Text>
          </View>
        </View>
      );
    
      const Section = ({ id,title,subTitle,subTitle2, children }:any):any => {
          const isExpanded = expandedSections.includes(id) || true;
        return(
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => {toggleSection(id)}}
            activeOpacity={0.7}
          >
            <Image style={{width:50,height:50,marginHorizontal:15,position:'relative',left:10}} source={require('../../../../../../assets/images/images/boy.png')}/>
            <View style={{flex:1, flexDirection:'column'}}>

            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={{color:'grey',fontSize:12,paddingLeft:30}}>{subTitle}</Text>
            <Text style={{color:'grey',fontSize:11,paddingLeft:30}}>{subTitle2}</Text>
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
            {/* <View style={styles.listBtns}>
                
            </View> */}

            </View>
          )}
        </View>
      )};
   

    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>    
      
      <ImageBackground
          source={require('../../../../../../assets/images/images/union.png')}
          style={styles.headerBackground}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../../../../../assets/images/images/girl.png')} // Add your placeholder image
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Image source={require('../../../../../../assets/images/images/edit2.png')}/>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.studentId}>Rose N Lilies High School</Text>
              <Text style={styles.studentName}>
                Report Card
              </Text>
              
            </View>

            {/* <TouchableOpacity style={{paddingHorizontal:40,marginVertical:-4,paddingRight:50,}} onPress={generatePdfAndPrint}>
<Text style={{fontSize:10,backgroundColor:'transparent',color:'#000',}}>DOWNLOAD</Text>
</TouchableOpacity> */}

          </View>
        </ImageBackground>

      
          
      </View>
      



{/* List of students section */}
<ScrollView style={{backgroundColor: '#FFFFFF' }} contentContainerStyle={{paddingBottom:40}}>
  {subjects.length === 0 ? (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
      <Text>No scores yet</Text>
    </View>
  ) : (
    subjects?.map((data, index) => (
      <Section
        key={index}
        id={data._id}
        title={data.course.toUpperCase()}
        subTitle={data.name}
        subTitle2={`Term: ${term} | Year: ${year}`}
      >
        <InfoRow1 label="Position" value={data.position || '--'} />
        <InfoRow1 label="Grade" value={getGrade(data.classWorkPercentage, data.examPercentage)} />
        <InfoRow1 label="Interpretation" value={getInterpretation(data.classWorkPercentage, data.examPercentage)} />
        {/* <br /> */}
        <Text style={{color:'#58a8f9',paddingLeft:100,fontWeight:'600',fontSize:16,paddingVertical:8}}>SCORE :</Text>
        <InfoRow1 label="Class Work" value={data.classWork || '--'} />
        <InfoRow1 label="Class Work (%)" value={data.classWorkPercentage || '--'} />
        <InfoRow1 label="Final Exam" value={data.exam || '--'} />
        <InfoRow1 label="Final Exam (%)" value={data.examPercentage || '--'} />
        <InfoRow1 label="Total" value={getTotal(data.classWorkPercentage , data.examPercentage)} />
      </Section>
    ))
  )}
</ScrollView>


      </SafeAreaView>
    );
  };

  export default ReportCard;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      // backgroundColor: 'red',

    },
    headerBackground: {
      width: '100%',
      height: 270, // Adjust height according to your design
      backgroundColor:'#daedff',
      borderBottomWidth:0.8,
      borderBottomColor:'black',

    },
    profileSection: {
      position:'absolute',
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf:'center',
      marginTop: 25,
      padding: 16,
      paddingVertical:35
    },
    avatarContainer: {
      position: 'relative',
      right:15,
      top:25
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
      right: 0,
      backgroundColor: '#58A8F9',
      borderRadius: 12,
      width: 27,
      height: 27,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#daedff',
    },
    profileInfo: {
      marginTop: 10,
      alignItems: 'center',
      flexDirection:'column'
    },
    studentId: {
      color: '000',
      fontSize: 20,
      marginTop:15,
      marginRight: 20
  
    },
    studentName: {
      fontSize: 18,
    //   fontWeight: '600',
      marginBottom: 10,
      marginRight: 15,
      color: '#58A8F9'
    },

    content: {
      width:'100%',
      paddingVertical:20,
      flexDirection:'column',
      justifyContent:'space-between',
      alignSelf:'center',
      position:'relative',
      borderBottomWidth:0.8,
      paddingHorizontal:30,
      // backgroundColor:'red'
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
        //  shadowColor: '#000', // Adds shadow for iOS
        //  shadowOffset: { width: 0, height: 1 },
        //  shadowOpacity: 0.1,
        //  shadowRadius: 3,


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
      sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        // backgroundColor: '#F8F8F8',
        backgroundColor: 'transparent',
        // paddingLeft
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color:'#58A8F9',
        paddingLeft:30
      },
      sectionContent: {
        padding: 16,
        width:"90%",
        alignSelf:'center',
        height:'95%',
        backgroundColor: '#FFF',
        // backgroundColor: 'yellow',
        marginHorizontal: 16,
        // paddingBottom: 0 ,
        borderRadius: 10,
        overflow: 'hidden',
        
      },
      
      infoRow1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
                // backgroundColor:'green',

      },
      // infoRow: {
      //   flexDirection: 'row',
      //   justifyContent: 'space-between',
      //   paddingVertical: 3,
      // },
      label1: {
        fontWeight:'bold',
        color: '#666',
        fontSize: 12,
        // backgroundColor:'green',
        width:'60%'
      },
      // label: {
      //   fontWeight:'bold',
      //   color: '#666',
      //   fontSize: 14,
      //   // backgroundColor:'green',
      //   width:'45%'
      // },
      value1: {
        color:'grey',
        fontSize: 12,
        // paddingRight:30
        
      },
      // value: {
      //   color:'grey',
      //   fontSize: 14,
      //   position:'relative',
      //   left:120
      //   // backgroundColor:'blue'
      // },
     
      
      
      

  });

