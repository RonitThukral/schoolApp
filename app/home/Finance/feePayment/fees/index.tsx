import { AntDesign } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import axios from 'axios';
import dayjs from 'dayjs';
import { responsiveWidth } from "react-native-responsive-dimensions";
const baseUrl = "https://dreamscloudtechbackend.onrender.com/api"; // Base API URL

const tuitionData = [
  { month: "April", amount: "6500", paid: "600", status: "Paid" },
  { month: "May", amount: "5900", paid: "600", status: "Paid" },
  { month: "June", amount: "5300", paid: "600", status: "Paid" },
  { month: "July", amount: "4700", paid: "1000", status: "Paid" },
  { month: "August", amount: "3700", paid: "600", status: "Paid" },
  { month: "September", amount: "3100", paid: "1000", status: "Paid" },
  { month: "October", amount: "2100", paid: "1500", status: "Paid" },
];

const otherFeeData = [{ for: "Back_Dues", amount: "2000", paid: "2000", status: "Paid" }];

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

  return (
    <ScrollView style={styles.container}>
      <FeesSection
        title="Tuition Fee"
        data={tuitionData}
        headers={["Month", "Amount", "Paid", "Status"]}
        isExpanded={tuitionExpanded}
        toggleExpand={() => setTuitionExpanded(!tuitionExpanded)}
      />

      <FeesSection
        title="Other Fee"
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
          {data.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              {Object.values(item).map((value, idx) => (
                <Text key={idx} style={[styles.tableCell, styles.verticalLine, value === "Paid" ? styles.paidStatus : null]}>
                  {value}
                </Text>
              ))}
            </View>
          ))}
        </ScrollView>
      </>
    )}
  </View>
);

const FeeReceipts = () => {
  const { studentId } = useLocalSearchParams();
  const [transactions, setTransactions] = useState([]);
  const [studentDetails, setStudentDetails] = useState(null);
  const [expandedSections, setExpandedSections] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const studentRes = await axios.get(`${baseUrl}/students/student/${studentId}`);
        setStudentDetails(studentRes.data.student);

        const transactionsRes = await axios.get(`${baseUrl}/transactions/student/${studentRes.data.student.userID}`);
        setTransactions(transactionsRes.data);
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
          <InfoRow1 label="Class" value={studentDetails?.classID} />
          <InfoRow1 label="Guardian" value={studentDetails?.guardian?.[0] || 'N/A'} />
          <InfoRow1 label="Payment Method" value={txn.paymentMethod} />
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
    { key: "hostelDues", title: "Hostel Dues" },
    { key: "feeReceipts", title: "Fee Receipts" },
  ]);


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
    fees: FeesTab,
    monthlyDues: MonthlyDues,
    hostelDues: HostelDues,
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
            tabStyle={{ width: "auto", paddingHorizontal: 10}}
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

// import { AntDesign } from "@expo/vector-icons";
// import { useLocalSearchParams } from "expo-router";
// import React, { useEffect, useState } from "react";
// import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity } from "react-native";
// import { TabView, SceneMap, TabBar } from "react-native-tab-view";
// import axios from 'axios';
// import { responsiveWidth } from "react-native-responsive-dimensions";

// const baseUrl = "https://dreamscloudtechbackend.onrender.com/api"; // Base API URL


// const tuitionData = [
//   { month: "April", amount: "6500", paid: "600", status: "Paid" },
//   { month: "May", amount: "5900", paid: "600", status: "Paid" },
//   { month: "June", amount: "5300", paid: "600", status: "Paid" },
//   { month: "July", amount: "4700", paid: "1000", status: "Paid" },
//   { month: "August", amount: "3700", paid: "600", status: "Paid" },
//   { month: "September", amount: "3100", paid: "1000", status: "Paid" },
//   { month: "October", amount: "2100", paid: "1500", status: "Paid" },
// ];

// const otherFeeData = [{ for: "Back_Dues", amount: "2000", paid: "2000", status: "Paid" }];

// const FeesSection = ({ title, data, headers, isExpanded, toggleExpand }) => (
//   <View>
//     <TouchableOpacity onPress={toggleExpand} style={styles.sectionHeader}>
//       <Text style={styles.sectionTitle}>{title}</Text>
//       <AntDesign style={styles.arrow} name={isExpanded ? "up" : "down"} size={24} color="white" />
//     </TouchableOpacity>

//     {isExpanded && (
//       <>
//         {/* Table Header */}
//         <View style={styles.tableHeader}>
//           {headers.map((header, index) => (
//             <Text key={index} style={[styles.tableHeaderText, styles.verticalLine]}>
//               {header}
//             </Text>
//           ))}
//         </View>

//         {/* Data Rows */}
//         <ScrollView>
//           {data.map((item, index) => (
//             <View key={index} style={styles.tableRow}>
//               {Object.values(item).map((value, idx) => (
//                 <Text
//                   key={idx}
//                   style={[
//                     styles.tableCell,
//                     styles.verticalLine,
//                     value === "Paid" ? styles.paidStatus : null,
//                   ]}
//                 >
//                   {value}
//                 </Text>
//               ))}
//             </View>
//           ))}
//         </ScrollView>
//       </>
//     )}
//   </View>
// );




// const InfoRow1 = ({ label, value }) => (
//     <View style={styles.infoRow1}>
//       <Text style={styles.label1}>{label}</Text>
//       <View style={{ width: '70%', left: 20 }}>
//         <Text style={styles.value1}>{value}</Text>
//       </View>
//     </View>
//   );

//   // Section Component
//   const Section = ({ id, title, subTitle, subTitle2, children }) => {
//     const isExpanded = expandedSections.includes(id);
//     return (
//       <View style={styles.section}>
//         <TouchableOpacity
//           style={styles.sectionHeader1}
//           onPress={() => toggleSection(id)}
//           activeOpacity={0.7}
//         >
//           <Image style={{ width: 50, height: 50, marginHorizontal: 15 }} source={require('../../../../../assets/images/images/boy.png')} />
//           <View style={{ flex: 1, flexDirection: 'column' }}>
//             <Text style={styles.sectionTitle1}>{title}</Text>
//             <Text style={{ color: 'grey', fontSize: 12 }}>{subTitle}</Text>
//             <Text style={{ color: 'grey', fontSize: 11 }}>{subTitle2}</Text>
//           </View>
//           <AntDesign style={{marginRight:20}} name={isExpanded ? "up" : "down"} size={24} color="#58A8F9" />
//         </TouchableOpacity>
//         {isExpanded && (
//           <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
//             <View style={styles.sectionContent}>{children}</View>
//             <View style={styles.listBtns}>
//               <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} >
//                 <Image style={{ width: 27, height: 27 }} source={require('../../../../../assets/images/images/eye.png')} />
//               </TouchableOpacity>
//               <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }} >
//                 <Image source={require('../../../../../assets/images/images/delete.png')} />
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}
//       </View>
//     );
//   };



//   const toggleSection = (id) => {
//     setExpandedSections((prev) =>
//       prev.includes(id) ? prev.filter((sectionId) => sectionId !== id) : [...prev, id]
//     );
//   };



// const FeesTab = () => {
//   const [tuitionExpanded, setTuitionExpanded] = useState(true);
//   const [otherExpanded, setOtherExpanded] = useState(true);
//   const [transactions, setTransactions] = useState([]);
//   const [expandedSections, setExpandedSections] = useState([]);
//   const [studentDetails, setStudentDetails] = useState(null);
//   const [fees, setFees] = useState({});
//   const { studentId } = useLocalSearchParams();  // Get studentId from URL


//   const fetchDetails = async () => {
//     try {
//       // Fetch student details
//       const studentRes = await axios.get(
//         `${baseUrl}/students/student/${studentId}`
//       );
//       setStudentDetails(studentRes.data.student);
 
//       // Fetch fee details based on class and status
//       const feesRes = await axios.get(
//         `${baseUrl}/fees/type/${studentRes.data.student.classID}/${studentRes.data.student.status}`
//       );
//       setFees(feesRes.data);

//       // Fetch transaction data based on student ID
//       const transactionsRes = await axios.get(
//         `${baseUrl}/transactions/student/${studentRes.data.student.userID}`
//       );
//       setTransactions(transactionsRes.data);
//     } catch (error) {
//       console.error('Failed to fetch details:', error);
//       alert('Failed to fetch details. Please try again.');
//     } finally {
//     //   setLoading(false);
//     }
//   };



//   useEffect(() => {
    
//     fetchDetails();


//   }, [studentId]);






//   return (
//     <ScrollView style={styles.container}>
//       <FeesSection
//         title="Tuition Fee"
//         data={tuitionData}
//         headers={["Month", "Amount", "Paid", "Status"]}
//         isExpanded={tuitionExpanded}
//         toggleExpand={() => setTuitionExpanded(!tuitionExpanded)}
//       />

//       <FeesSection
//         title="Other Fee"
//         data={otherFeeData}
//         headers={["For", "Amount", "Paid", "Status"]}
//         isExpanded={otherExpanded}
//         toggleExpand={() => setOtherExpanded(!otherExpanded)}
//       />
//     </ScrollView>
//   );
// };

// const MonthlyDues = () => (
//   <View style={styles.dummyContainer}>
//     <Text style={styles.dummyText}>Monthly Dues Content Here</Text>
//   </View>
// );

// const HostelDues = () => (
//   <View style={styles.dummyContainer}>
//     <Text style={styles.dummyText}>Hostel Dues Content Here</Text>
//   </View>
// );

// const FeeReceipts = () => (
//     <ScrollView style={{ backgroundColor: '#FFFFFF' }} contentContainerStyle = {{paddingBottom:40}}>
//     {transactions.map((txn, index) => (
//       <Section key={index} id={txn._id} title={`₹ ${txn.amount}`} subTitle={`${studentDetails?.name} ${studentDetails?.surname}` || 'N/A'} subTitle2={dayjs(txn.date).format("DD MMMM YYYY")}>
//         <InfoRow1 label="Roll Number" value={studentDetails?.userID} />
//         <InfoRow1 label="Class" value={studentDetails?.classID} />
//         <InfoRow1 label="Guardian" value={studentDetails?.guadian[0] || 'N/A'} />
//         <InfoRow1 label="Payment Method" value={txn.paymentMethod} />
//       </Section>
//     ))}
//   </ScrollView>
// );

// export default function App() {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: "fees", title: "Fees" },
//     { key: "monthlyDues", title: "Monthly Dues" },
//     { key: "hostelDues", title: "Hostel Dues" },
//     { key: "feeReceipts", title: "Fee Receipts" },
//   ]);

//   const renderScene = SceneMap({
//     fees: FeesTab,
//     monthlyDues: MonthlyDues,
//     hostelDues: HostelDues,
//     feeReceipts: FeeReceipts,
//   });

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#5E787D" barStyle="light-content" />

//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton}>
//           <Text style={styles.backArrow}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Fees Detail</Text>
//       </View>

//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         renderTabBar={(props) => (
//           <TabBar
//             {...props}
//             indicatorStyle={{ backgroundColor: "white", height: 3 }}
//             style={{ backgroundColor: "#58a8f9", height: 55 }}
//             tabStyle={{ width: "auto", paddingHorizontal: 10}}
//             scrollEnabled={false}
//             renderLabel={({ route }) => (
//               <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 12 }}>{route.title}</Text>
//             )}
//           />
//         )}
//       />
//     </SafeAreaView>
//   );
// }

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