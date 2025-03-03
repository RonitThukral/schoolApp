import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from 'axios';
import dayjs from 'dayjs';
import { responsiveWidth } from "react-native-responsive-dimensions";
import FeeDetails from "../feeDetails";
import Constants from 'expo-constants';


const baseUrl = Constants.expoConfig.extra.API_URL;




const InfoRow1 = ({ label, value }) => (
  <View style={styles.infoRow1}>
    <Text style={styles.label1}>{label}</Text>
    <View style={{ width: '70%', left: 20 }}>
      <Text style={styles.value1}>{value}</Text>
    </View>
  </View>
);

const Section = ({ id, title, subTitle, subTitle2, children, isExpanded, toggleSection }) => {
  return (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader1}
        onPress={() => toggleSection(id)}
        activeOpacity={0.7}
      >
        <Image style={{ width: 50, height: 50, marginHorizontal: 15 }} source={require('../../../../../assets/images/images/boy.png')} />
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <Text style={styles.sectionTitle1}>{title}</Text>
          <Text style={{ color: 'grey', fontSize: 12 }}>{subTitle}</Text>
          <Text style={{ color: 'grey', fontSize: 11 }}>{subTitle2}</Text>
        </View>
        <AntDesign style={{ marginRight: 20 }} name={isExpanded ? "up" : "down"} size={24} color="#58A8F9" />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.sectionContent}>
          {children}
        </View>
      )}
    </View>
  );
};

const FeesTab = () => {
  
  const [tuitionExpanded, setTuitionExpanded] = useState(true);
  const [otherExpanded, setOtherExpanded] = useState(true);
  

  const [totalFee, setTotalFee] = useState(null)
  const { studentId, year } = useLocalSearchParams();
  const [student, setStudent] = useState(null);


  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${baseUrl}/students/student/${studentId}`);
      // console.log("Fetched student data:", res.data.student);  //  API response is correct
      setStudent(res.data.student);
  
      if (res.data.student) {
        const feesRes = await axios.get(`${baseUrl}/fees/type/${res.data.student.classID}/${res.data.student.status}`);

        let totalFee = Object.values(feesRes.data).reduce((sum, fee) => sum + Number(fee || 0), 0);

         setTotalFee(totalFee)
// FeesTab(totalFee)
        // console.log(totalFee); // <-- Check fees API response
      }
    } catch (error) {
      console.error("Error fetching student dataa:", error);
    }
  };
  
  useEffect(() => {
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);  // <-- Run effect when `studentId` changes
  


  

  
  const otherFeeData = [{ for: "Back_Dues", amount: "2000", paid: "2000", status: "Paid" }];

  const [tuitionData, setTuitionData] = useState([
    { month: "January", amount:"Loading...", paid: "Loading...", status: "Paid" },
    { month: "Feburary", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "March", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "April", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "May", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "June", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "July", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "August", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "September", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "October", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "November", amount: "Loading...", paid: "Loading...", status: "Paid" },
    { month: "December", amount: "Loading...", paid: "Loading...", status: "Paid" },
  ]);

  async function updateTuitionData() {
    try {
      const response = await fetch(`${baseUrl}/transactions/student/${studentId}`);
      const transactions = await response.json();
  
      const filteredTransactions = transactions.filter((txn) => txn.fees.academicYear === year);
      const monthlyFees = filteredTransactions.reduce((acc, txn) => {
        const month = txn.fees.term;
        acc[month] = (acc[month] || 0) + parseFloat(txn.amount);
        return acc;
      }, {});
      const updatedTuitionData = tuitionData.map((entry) => {
        const feePaid = monthlyFees[entry.month] || '0';
        const feeTotal = totalFee;
    
        // Check if data is still being fetched
        if (feeTotal == null || feePaid == null) {
            return {
                ...entry,
                amount: 'Loading...',
                paid: 'Loading...',
                status: 'Loading...'
            };
        }
    
        // Compute status correctly
        const remaining = Number(feeTotal) - Number(feePaid);
        const status = remaining === 0 ? 'Paid' : remaining > 0 ? 'Pending' : 'Loading...';
    
        return {
            ...entry,
            amount: feeTotal,
            paid: feePaid,
            status
        };
    });
    
  
      setTuitionData(updatedTuitionData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  useEffect(() => {
    updateTuitionData();
  }, []);
  
  
  // Call the function to update tuition data
  updateTuitionData();
  
  return (
    <ScrollView style={styles.container}>
      <FeesSection
        title="Total Fees"
        data={tuitionData}
        headers={["Month", "Amount", "Paid", "Status"]}
        isExpanded={tuitionExpanded}
        toggleExpand={() => setTuitionExpanded(!tuitionExpanded)}
      />

      <FeesSection
        title="Other Fees"
        data={otherFeeData}
        headers={["For", "Amount", "Paid", "Status"]}
        isExpanded={otherExpanded}
        toggleExpand={() => setOtherExpanded(!otherExpanded)}
      />
    </ScrollView>
  );
};

const FeesSection = ({ title, data, headers, isExpanded, toggleExpand }) => (
  <View>
    <TouchableOpacity onPress={toggleExpand} style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <AntDesign style={styles.arrow} name={isExpanded ? "up" : "down"} size={24} color="white" />
    </TouchableOpacity>

    {isExpanded && (
      <>
        <View style={styles.tableHeader}>
          {headers.map((header, index) => (
            <Text key={index} style={[styles.tableHeaderText, styles.verticalLine]}>
              {header}
            </Text>
          ))}
        </View>

        <ScrollView>
          {Array.isArray(data) ? data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              {Object.values(item).map((value, idx) => (
                <Text key={idx} style={[styles.tableCell, styles.verticalLine, value === "Paid" ? styles.paidStatus : value ==="Pending" ? styles.pending :null]}>
                  {value}
                </Text>
              ))}
            </View>
          )) : []}
        </ScrollView>
      </>
    )}
  </View>
);

const FeeReceipts = () => {
  const { studentId } = useLocalSearchParams();
//   const parsedStudent = student ? JSON.parse(student) : null
//   const studentId = parsedStudent.userID
//   console.log(studentId)
  const [transactions, setTransactions] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const studentRes = await axios.get(`${baseUrl}/students/student/${studentId}`);
        setStudentDetails(studentRes.data.student);

        const transactionsRes = await axios.get(`${baseUrl}/transactions/student/${studentRes.data.student.userID}`);
        setTransactions(transactionsRes.data.reverse());
      } catch (error) {
        console.error('Failed to fetch details:', error);
      }
    };
    fetchDetails();
  }, [studentId]);

  const toggleSection = (id) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((sectionId) => sectionId !== id) : [...prev, id]
    );
  };

  return (
    <ScrollView style={{ backgroundColor: '#FFFFFF' }} contentContainerStyle={{ paddingBottom: 40 }}>
      {transactions.map((txn, index) => (
        <Section
          key={index}
          id={txn._id}
          title={`₹ ${txn.amount}`}
          subTitle={`${studentDetails?.name} ${studentDetails?.surname || ''}`}
          subTitle2={dayjs(txn.date).format("DD MMMM YYYY")}
          isExpanded={expandedSections.includes(txn._id)}
          toggleSection={toggleSection}
        >
          <InfoRow1 label="Roll Number" value={studentDetails?.userID} />
          <InfoRow1 label="Class" value={studentDetails?.classID.toUpperCase()} />
          <InfoRow1 label="Guardian" value={studentDetails?.guadian?.[0].name  + " " + studentDetails?.guadian?.[0].lastname || 'N/A'} />
          <InfoRow1 label="Payment Mode" value={txn.paymentMethod} />
        </Section>
      ))}
    </ScrollView>
  );
};

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "fees", title: "Fees" },
    { key: "monthlyDues", title: "Monthly Dues" },
    // { key: "hostelDues", title: "Hostel Dues" },
    { key: "feeReceipts", title: "Fee Receipts" },
  ]);
const [totalFee, setTotalFee] = useState(null)
    
  const { studentId } = useLocalSearchParams();
  const [student, setStudent] = useState(null);


  const fetchStudent = async () => {
    try {
      const res = await axios.get(`${baseUrl}/students/student/${studentId}`);
      // console.log("Fetched student data:", res.data.student);  // <-- Check if API response is correct
      setStudent(res.data.student);
  
      if (res.data.student) {
        const feesRes = await axios.get(`${baseUrl}/fees/type/${res.data.student.classID}/${res.data.student.status}`);

        let totalFee = Object.values(feesRes.data).reduce((sum, fee) => sum + Number(fee || 0), 0);
         setTotalFee(totalFee)
        // console.log(totalFee); // <-- Check fees API response
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };






  
  useEffect(() => {
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);  // <-- Run effect when `studentId` changes
  


const MonthlyDues = () => (
  <View style={styles.dummyContainer}>
    <Text style={styles.dummyText}>Monthly Dues Content Here</Text>
  </View>
);

const HostelDues = () => (
  <View style={styles.dummyContainer}>
    <Text style={styles.dummyText}>Hostel Dues Content Here</Text>
  </View>
);

  const renderScene = SceneMap({
    fees: FeeDetails,
    monthlyDues: FeesTab,
    // hostelDues: HostelDues,
    feeReceipts: FeeReceipts,
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#5E787D" barStyle="light-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
           <Text style={styles.backArrow}>←</Text>
         </TouchableOpacity>
         <Text style={styles.headerText}>Fees Detail</Text>
       </View>
            <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "white", height: 3 }}
            style={{ backgroundColor: "#58a8f9", height: 55 }}
            tabStyle={{ width: "auto", paddingHorizontal: responsiveWidth(7.8)}}
            scrollEnabled={false}
            renderLabel={({ route }) => (
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>{route.title}</Text>
            )}
          />
        )}
      />
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#58a8f9",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  backButton: {
    marginRight: 10,
  },
  backArrow: {
    fontSize: 20,
    color: "#fff",
  },
  headerText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5CB6A9",
    paddingVertical: 15,
    paddingHorizontal: 15,
    height: 55,
    borderBottomWidth: 1,
    borderBottomColor: "white",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  arrow: {
    fontSize: 16,
    color: "#fff",
    paddingVertical: 5,
    marginRight: 30,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#58a8f9",
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderWidth: 1.5,
    borderColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    paddingVertical: 5,
    borderRightWidth: 1.5, // Vertical line for header
    borderRightColor: "#ccc",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1.5, // Thick bottom border
    borderColor: "#ccc",
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    textAlign: "center",
    color: "#333",
    paddingVertical: 8,
    borderRightWidth: 1.5, // Vertical line for cell
    borderRightColor: "#ccc",
    borderBottomWidth: 1.5, // Extend to next row
    borderBottomColor: "#ccc",
  },
  verticalLine: {
    borderRightWidth: 1.5,
    borderRightColor: "#ccc",
  },
  paidStatus: {
    color: "green",
    fontWeight: "bold",
  },
  pending: {
    color: "red",
    fontWeight: "bold",
  },

  dummyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      },
      dummyText: {
        fontSize: 18,
        color: "#555",
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
      sectionHeader1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        // backgroundColor: '#F8F8F8',
        backgroundColor: 'transparent',
      },
      sectionTitle1: {
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
        position:'relative',
        left:20
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

      listBtns:{
        position:'absolute',
        right:30
    },
     
});



