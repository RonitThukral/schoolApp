import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground,ActivityIndicator } from 'react-native';
import {useLocalSearchParams } from 'expo-router';
import dayjs from 'dayjs'; // Make sure to import dayjs

import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { responsiveWidth } from 'react-native-responsive-dimensions';

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api"; // Base API URL

const FeeDetails = () => {
  const { student } = useLocalSearchParams();  // Get studentId from URL
// console.log(studentId,'iddd')
    const parsedStudent = student ? JSON.parse(student) : null;

    const studentId = parsedStudent.userID
    
  const [studentDetails, setStudentDetails] = useState(null);
  const [fees, setFees] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [expandedSections, setExpandedSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scholar, setScholar] = useState(null);


  useEffect(() => {
    if (studentDetails?.scholarship) {
      fetchScholarship();
    }
  }, [studentDetails]);

  const fetchDetails = async () => {
    try {
      // Fetch student details
      const studentRes = await axios.get(
        `${baseUrl}/students/student/${studentId}`
      );
    //   console.log(studentRes.data, 'stdhfusdknf')
      setStudentDetails(studentRes.data.student);
 
      // Fetch fee details based on class and status
      const feesRes = await axios.get(
        `${baseUrl}/fees/type/${studentRes.data.student.classID}/${studentRes.data.student.status}`
      );
      setFees(feesRes.data);

      // Fetch transaction data based on student ID
      const transactionsRes = await axios.get(
        `${baseUrl}/transactions/student/${studentRes.data.student.userID}`
      );
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error('Failed to fetch details:', error);
      alert('Failed to fetch details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchScholarship = async () => {
    // if (!selectedStudent?.scholarship) return;  // Check that scholarship exists
    try {
      const response = await axios.get(`${baseUrl}/scholarships/${studentDetails.scholarship}`);

      // console.log(response?.data?.doc, 'adokanlf')
      setScholar(response.data?.doc?.name);
    } catch (error) {
      console.error("Error fetching SCHOLARSHIP:", error);
    }
  };


  // Fetch data from API
  useEffect(() => {
    
    fetchDetails();


  }, [studentId]);

  // console.log("transcation : ", transactions)

  // Calculate Total Bill, Paid, and Balance
  const totalBill = Object.values(fees).reduce((sum, fee) => sum + Number(fee || 0), 0);
  const totalPaid = transactions.reduce((sum, txn) => sum + Number(txn.amount || 0), 0);
  const balance = totalBill - totalPaid;

  // Toggle Section Expand/Collapse
  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sectionId) => sectionId !== id) : [...prev, id]
    );
  };

  // Info Row Component
  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ width: '70%', left: 20 }}>
        <Text style={styles.value}>{` ${value}`}</Text>
      </View>
    </View>
  );

  const InfoRow1 = ({ label, value }) => (
    <View style={styles.infoRow1}>
      <Text style={styles.label1}>{label}</Text>
      <View style={{ width: '70%', left: 20 }}>
        <Text style={styles.value1}>{value}</Text>
      </View>
    </View>
  );

  // Section Component
  const Section = ({ id, title, subTitle, subTitle2, children }) => {
    const isExpanded = expandedSections.includes(id);
    return (
      <View style={styles.section}>
        <TouchableOpacity
          style={styles.sectionHeader}
          onPress={() => toggleSection(id)}
          activeOpacity={0.7}
        >
          <Image style={{ width: 50, height: 50, marginHorizontal: 15 }} source={require('../../../../assets/images/images/boy.png')} />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={{ color: 'grey', fontSize: 12 }}>{subTitle}</Text>
            <Text style={{ color: 'grey', fontSize: 11 }}>{subTitle2}</Text>
          </View>
          <AntDesign style={{marginRight:20}} name={isExpanded ? "up" : "down"} size={24} color="#58A8F9" />
        </TouchableOpacity>
        {isExpanded && (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.sectionContent}>{children}</View>
            <View style={styles.listBtns}>
              <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} >
                <Image style={{ width: 27, height: 27 }} source={require('../../../../assets/images/images/eye.png')} />
              </TouchableOpacity>
             
            </View>
          </View>
        )}
      </View>
    );
  };

  // Loading State
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={require('../../../../assets/images/images/union.png')}
          style={styles.headerBackground}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../../../assets/images/images/boy.png')}
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Image source={require('../../../../assets/images/images/edit2.png')} />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.studentId}>{studentDetails?.userID || 'BK202408'}</Text>
              <Text style={styles.studentName}>
                {studentDetails?.name || 'Ankita Gaur'}
              </Text>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <InfoRow label="Tuition Fee" value={`₹${fees?.tution}` || '500'} />
          <InfoRow label="Maintenance Fee" value={`₹${fees?.maintenance}` || '100'} />
          <InfoRow label="Transport Fee" value={`₹${fees?.facility}` || '0'} />
          <InfoRow label="Exam Fee" value={`₹${fees?.exam}` || '100'} />
          <InfoRow label="Total Bill" value={`₹${totalBill}` || '700'} />
          <InfoRow label="Scholarship" value={scholar || 'N/A'} />
          <InfoRow label="Total Paid" value={`₹${totalPaid}` || '0'} />
          <InfoRow label="Balance" value={`₹${balance}` || '700'} />
        </View>
      </View> 

      <Text style={{ fontSize: 20, backgroundColor: 'white', color: 'grey', paddingHorizontal: 35, paddingVertical: 10 }}>Transactions</Text>

      <ScrollView style={{ backgroundColor: '#FFFFFF' }} contentContainerStyle = {{paddingBottom:40}}>
        {transactions.map((txn, index) => (
          <Section key={index} id={txn._id} title={`₹ ${txn.amount}`} subTitle={`${studentDetails?.name} ${studentDetails?.surname}` || 'N/A'} subTitle2={dayjs(txn.date).format("DD MMMM YYYY")}>
            <InfoRow1 label="Roll Number" value={studentDetails?.userID} />
            <InfoRow1 label="Class" value={studentDetails?.classID} />
            <InfoRow1 label="Guardian" value={studentDetails?.guadian[0] || 'N/A'} />
            <InfoRow1 label="Payment Method" value={txn.paymentMethod} />
          </Section>
        ))}
      </ScrollView>
    </>
  );
};

export default FeeDetails;



const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // backgroundColor: 'red',

  },
  headerBackground: {
    width: '100%',
    height: 250, // Adjust height according to your design
    backgroundColor:'#daedff',
    borderBottomWidth:0.2,
    borderBottomColor:'grey'
  
  },
  profileSection: {
    position:'absolute',
    // bottom: 1,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf:'center',
    marginTop: 25,
    padding: 16,
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
  },
  studentId: {
    color: '#58A8F9',
    fontSize: 24,
    marginTop:15,
    marginRight: 20

  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginRight: 15

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
    borderColor:'grey'
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
       elevation: 5, // Adds shadow for Android
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
      fontWeight: '600',
      color:'#58A8F9'
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
      
    },
    
    infoRow1: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 2,
    },
    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 3,
    },
    label1: {
      fontWeight:'bold',
      color: '#666',
      fontSize: 12,
      // backgroundColor:'green',
      width:'35%'
    },
    label: {
      fontWeight:'bold',
      color: '#666',
      fontSize: 14,
      // backgroundColor:'green',
      width:'45%',
      marginLeft:15
    },
    value1: {
      color:'grey',
      fontSize: 12,
      
      
    },
    value: {
      color:'grey',
      fontSize: 14,
      position:'relative',
      left:responsiveWidth(14)
      // backgroundColor:'blue'
    },
   
    
    
    

});
