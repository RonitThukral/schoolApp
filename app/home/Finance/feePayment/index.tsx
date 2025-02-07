

// Import statements remain unchanged
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert, SafeAreaView, ScrollView } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dropdown } from 'react-native-element-dropdown';
import { useRouter,useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Term = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' }
];

const AcademicYear = [
  { label: '2024', value: '2024' },
  { label: '2026', value: '2026' },
  { label: '2027', value: '2027' },
  { label: '2029', value: '2029' }
];

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api"; // Base API URL

const FeePayment = () => {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [classStudents, setClassStudents] = useState([]);
  const [paid, setPaid] = useState(false);

  const router = useRouter();

  const fetchClasses = async () => {
    try {
      const classes = await axios.get(`${baseUrl}/classes`);
      const formatedData = classes.data.map((cls) => ({
        label: cls.name,
        value: cls.classCode,
      }));
      setClasses(formatedData);
    } catch (error) {
      console.error('Error fetching classes:', error.message);
    }
  };

  const fetchStudents = async () => {
   
    try {
      const res = await axios.get(`${baseUrl}/students/class/${selectedClass}`);
      const studentsData = res.data.users || [];
      const enrichedStudents = await Promise.all(
        studentsData.map(async (student) => {
          const feesRes = await axios.get(`${baseUrl}/fees/type/${student.classID}/${student.status}`);
          const transactionsRes = await axios.get(`${baseUrl}/transactions/student/${student.userID}`);
          return {
            ...student,
            fees: feesRes.data || {},
            transactions: transactionsRes.data || []
          };
        })
      );
      setStudents(enrichedStudents);
    } catch (error) {
      console.error('Error fetching students:', error.message);
    }
  };

  const calculatePaymentStatus = (student) => {
    const fees = student?.fees || {};
    const transactions = student?.transactions || [];

    let totalFee = Object.values(fees).reduce((sum, fee) => sum + Number(fee || 0), 0);

    // Filter transactions based on selectedTerm and selectedYear
    const filteredTransactions = transactions.filter(
      (txn) => txn.fees?.term === selectedTerm && txn.fees?.academicYear === selectedYear
    );

    const totalPaid = filteredTransactions.reduce((sum, txn) => sum + Number(txn.amount || 0), 0);
    const balance = totalFee - totalPaid ;

    // New status for advance payment when balance < 0
    const status = balance === 0 ? 'Fully Paid' : balance < 0 ? 'Advance Payment' : 'Pending';
    
    return { status, balance };
  };

  useEffect(() => {
    fetchClasses();
    fetchStudents();
  }, [selectedClass]);

  const handleSearch = () => {
    if (!selectedYear || !selectedTerm || !selectedClass) {
      Alert.alert('Error', 'Please select Academic Year, Term, and Class.');
      return;
    }
    const filtered = students?.filter((student) => {
      return (
        (!selectedClass || student.class === selectedClass) &&
        (!selectedStudent || student.name === selectedStudent)
      );
    });
    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setClassStudents([]);
    setSelectedClass(null);
    setSelectedStudent(null);
    setSelectedYear(null);
    setSelectedTerm(null);
    setStudents([]);
  };



  const handlePress = (id) => {
    router.push({
      pathname: '/home/Finance/feePayment/fees',
      params: { studentId: id },  // Use 'params' here instead of 'query'
    });
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={{ height: responsiveWidth(75) }}>
        <View style={{ marginTop: 50 }}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={AcademicYear}
            search={false}  // Disabled auto-search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Academic Year'}
            value={selectedYear}
            onChange={(item) => setSelectedYear(item.value)}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={Term}
            search={false}  // Disabled auto-search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Term'}
            value={selectedTerm}
            onChange={(item) => setSelectedTerm(item.value)}
          />
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={classes}
            search={false}  // Disabled auto-search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Class'}
            value={selectedClass}
            onChange={(item) => setSelectedClass(item.value)}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text style={{ color: '#58A8F9' }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} onPress={handleSearch}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15 }}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredStudents.length > 0 ? filteredStudents : students}  // Use filtered students
        keyExtractor={(item) => item._id}
        style={styles.list}
        contentContainerStyle={{paddingTop:responsiveHeight(4),paddingBottom:20}}
        renderItem={({ item }) => {
          const { status, balance } = calculatePaymentStatus(item);
          return (
            <TouchableOpacity style={styles.studentCard} onPress={()=>{handlePress(item.userID)}}>
              <Image source={require('../../../../assets/images/images/boy.png')} style={styles.img} />
              
              <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
               <Text style={styles.studentTextid}>{item.userID}</Text>
               <Text style={styles.studentText}>{item.name}</Text>
             </View>
              <View style={status === 'Fully Paid' ? styles.paid : status === 'Advance Payment' ? styles.advance : styles.pending}>
                <Text style={status === 'Fully Paid' ? styles.paidText : status === 'Advance Payment' ? styles.advanceText : styles.pendingText}>{status}</Text>
                {status === 'Pending' && <Text style={{fontSize:12,marginTop:5,marginLeft:10,color:'#ff7c7c'} } >₹{balance}</Text>}
                {status === 'Advance Payment' && <Text style={{fontSize:12,marginTop:5,marginLeft:10,color:'#ff7c7c'} } >₹{Math.abs(balance)}</Text>} {/* Displaying advance payment balance */}
              </View>

              <AntDesign name="right" size={24} color="#58A8F9" style={{position:'relative', right:5}} />
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
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

export default FeePayment;