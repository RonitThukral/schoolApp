import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView, ImageBackground, ActivityIndicator, TextInput } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api";

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


const StaffTransactions = () => {
  const { staffId, month, year,name,position } = useLocalSearchParams(); // Get staffId, month, and year from the search params
  const [transactions, setTransactions] = useState([]);
  const [selectMonth, setSelectMonth]= useState(null)
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [expandedSections, setExpandedSections] = useState([]);


  const getMonthDetails = (monthValue) => {
    let monthName, monthNumber;
  
    switch (monthValue) {
      case '1':
        monthName = "January";
        monthNumber = '1';
        break;
      case '2':
        monthName = "February";
        monthNumber = '2';
        break;
      case '3':
        monthName = "March";
        monthNumber = '3';
        break;
      case '4':
        monthName = "April";
        monthNumber = '4';
        break;
      case '5':
        monthName = "May";
        monthNumber = '5';
        break;
      case '6':
        monthName = "June";
        monthNumber = '6';
        break;
      case '7':
        monthName = "July";
        monthNumber = '7';
        break;
      case '8':
        monthName = "August";
        monthNumber = '8';
        break;
      case '9':
        monthName = "September";
        monthNumber = '9';
        break;
      case '10':
        monthName = "October";
        monthNumber = '10';
        break;
      case '11':
        monthName = "November";
        monthNumber = '11';
        break;
      case '12':
        monthName = "December";
        monthNumber = '12';
        break;
      default:
        monthName = "Invalid month";
        monthNumber = null;
        break;
    }
  
    return { monthName, monthNumber };
  };
  
// Calculate Total Paid
let totalPaid = 0;
if (transactions && transactions.length > 0) {
  totalPaid = transactions.reduce((sum, trans) => sum + Number(trans.amount || 0), 0);
}
  // Fetch transactions for the staff
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${baseUrl}/transactions/staff/pay/${staffId}`);
      const filteredTransactions = response.data.filter(
        (txn) =>
          txn.month.toString() === month.toString() &&
          txn.year.toString() === year.toString()
      );
      setTransactions(filteredTransactions);

     
    } catch (error) {
      console.error('Error fetching transactions:', error);
      alert('Failed to fetch transactions. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const fetchDetails = async () => {
    try {
      const res = await axios.get(`${baseUrl}/payrow/${position}`)
      // console.log(res.data)
      

setDetails(res.data.docs)
      

    } catch (error) {
      console.error('Error fetching details:', error);
      alert('Failed to fetch details. Please try again.');
    }
  }

  useEffect(() => {
    fetchDetails();
    fetchTransactions();
  }, [staffId, month, year]);

const handlePayslip = () => {
  // router.push('/home/Teachers/Payment/Payslip')
  setIsOpen(true)
}
const handleClose = () => {
  // router.push('/home/Teachers/Payment/Payslip')
  setIsOpen(false)
}

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
        <Text style={styles.value}>{value}</Text>
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
          <Image style={{ width: 50, height: 50, marginHorizontal: 15 }} source={require('../../../../../assets/images/images/boy.png')} />
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={{ color: 'grey', fontSize: 12 }}>{subTitle}</Text>
            <Text style={{ color: 'grey', fontSize: 11 }}>{subTitle2}</Text>
          </View>
          <Ionicons style={{ marginRight: 20 }} name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#58A8F9" />
        </TouchableOpacity>
        {isExpanded && (
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.sectionContent}>{children}</View>
          </View>
        )}
      </View>
    );
  };

  // Loading State
  if (loading) {
    return <View style={{ position: "relative",top:'45%'}}>
    <ActivityIndicator size="large" color="#58A8F9" />
    </View>;
  }

  return (
    <>

<View style={styles.container}>
        <ImageBackground
          source={require('../../../../../assets/images/images/union.png')}
          style={styles.headerBackground}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../../../../assets/images/images/boy.png')}
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Image source={require('../../../../../assets/images/images/edit2.png')} />
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.studentId}>{staffId}</Text>
              <Text style={styles.studentName}>
                {name}
              </Text>
              <Text style={styles.studentpos}>
                {position}
              </Text>
              <TouchableOpacity style={{width: responsiveWidth(15),height:responsiveHeight(3), backgroundColor:'red',borderRadius:8}} onPress={handlePayslip}>
                <Text style={{fontSize:14,textAlign:'center', color:'white'}}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <InfoRow label="Payrow" value={'Amount'} />
          <InfoRow label="Salary" value={details?.salary || '100'} />
          <InfoRow label="Allowance" value={details?.allowance || '0'} />
          <InfoRow label="Bonus" value={details?.bonus || '100'} />
          <InfoRow label="Total Salary" value={
      Number(details?.salary) +
      Number(details?.allowance) +
      Number(details?.bonus)} />
          <InfoRow label="Total Paid" value={totalPaid || '0'} />
          <InfoRow label="Balance" value={
            (Number(details?.salary) +
        Number(details?.allowance) +
        Number(details?.bonus)) -
      Number(totalPaid)} />
        </View>
      </View>


      <Text style={{ fontSize: 20, backgroundColor: 'white', color: 'grey', paddingHorizontal: 35, paddingVertical: 10 }}>Transactions</Text>
      <ScrollView style={{ backgroundColor: '#FFFFFF' }} contentContainerStyle={{ paddingBottom: 40 }}>
        {transactions.length > 0 ? (
          transactions.map((txn, index) => (
            <Section
              key={txn._id}
              id={txn._id}
              title={`₹ ${txn.amount}`}
              subTitle={`Bank: ${txn.bank}`}
              subTitle2={dayjs(txn.date).format("DD MMMM YYYY")}
            >
              <InfoRow label="Account Number" value={txn.accountNumber || "N/A"} />
              <InfoRow label="Transaction ID" value={txn._id} />
              <InfoRow label="Payment Date" value={dayjs(txn.date).format("DD-MM-YYYY")} />
              <InfoRow label="Month" value={getMonthDetails(txn.month).monthName} />
              <InfoRow label="Year" value={txn.year} />
            </Section>
          ))
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20, color: 'grey' }}>No transactions found for the selected month and year.</Text>
        )}
      </ScrollView>

      
      {isOpen  && <View style={styles.inputContainer}>
        <Text style={{fontSize:20,position:'relative',alignSelf:'flex-start',paddingHorizontal:25,paddingVertical:15}}>{'Salary Due Rs82000'}</Text>

    <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={"82000"} />

    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%' ,marginTop:10}}>
            <TextInput
              style={styles.dateInput}
              placeholder={dayjs(Date.now()).format('DD-MM-YYYY')}
              placeholderTextColor={'grey'}
              // value={} // Display the formatted date
              editable={false} // Read-only input
            />
            <TouchableOpacity style={{ position: 'absolute', left: '80%', top: '25%' }} >
              <Image source={require('../../../../../assets/images/images/Frame.png')} />
            </TouchableOpacity>
          </View>

          
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={`${getMonthDetails(month).monthName}`} />

    <TextInput style={styles.inputDesc} placeholderTextColor={'grey'} placeholder={"Add Description"} multiline = {true} textAlignVertical='top' />


    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:10}}>

    <TouchableOpacity style={styles.closeBtn} onPress={handleClose} >
    <Text style={{color:'#58A8F9',fontSize:16}}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttons} >
    <Text style={{color:'white',fontSize:16, textAlign:'center'}} >{'Pay'}</Text>
    </TouchableOpacity>
    </View>
    </View>}
    </>
  );
};

export default StaffTransactions;

const styles = StyleSheet.create({

  container: {
    backgroundColor: 'white',
    // backgroundColor: 'red',

  },
  headerBackground: {
    width: '100%',
    height: responsiveHeight(35), // Adjust height according to your design
    backgroundColor:'#daedff',
    borderBottomWidth:0.8,
    borderBottomColor:'black'
  
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
  studentpos: {
    fontSize: 14,
    fontWeight: '300',
    position:'relative',
    bottom:responsiveHeight(1),
right:responsiveWidth(2.5)
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

    input: {
      width: '80%',
      height: 45,
      backgroundColor: '#DAEDFF',
      // backgroundColor: 'red',
      // marginBottom: 10,
      borderRadius: 10,
      alignSelf: 'center',
      paddingHorizontal: 25,
    },
    inputDesc:{
      width: '80%',
      height: 100,
      backgroundColor: '#DAEDFF',
      // backgroundColor: 'red',
      marginBottom: 10,
      marginTop: 10,
      borderRadius: 10,
      alignSelf: 'center',
      paddingHorizontal: 25,
    },
    inputContainer:{
      position:'absolute',
      width:'85%',
      height:400,
      backgroundColor:'white',
      // backgroundColor:'red',
      borderRadius:10,
      justifyContent:'center',
      alignSelf:'center',
      top:'30%',
      flexDirection:'column',
      zIndex:900000,
      elevation:5
// marginVertical:15
    },
    buttons: { 
      width: 100, 
      height: 38, 
      backgroundColor: '#58A8F9', 
      position: 'relative', 
      right: 25,
      borderRadius: 20, 
      justifyContent: 'center', 
      alignSelf: 'flex-end' 
    },
    closeBtn: { 
      position: 'relative', 
      bottom: 5, 
      right: responsiveWidth(14), 
      borderRadius: 20, 
      justifyContent: 'center', 
      alignSelf: 'flex-end'
     },
     dateInput: {
      backgroundColor: '#DAEDFF',
      // backgroundColor: 'green',
      width: '80%',
      height: 50,
      alignSelf: 'center',
      borderRadius: 10,
      paddingHorizontal: 25,
      marginBottom:10
    },

});
