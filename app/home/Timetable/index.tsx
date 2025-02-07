// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { RotateOutDownRight } from 'react-native-reanimated';

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

import React from 'react';
import { StyleSheet, View, Image, Dimensions, FlatList } from 'react-native';
import { RotateInDownLeft, RotateInDownRight } from 'react-native-reanimated';

const { width, height } = Dimensions.get('screen'); // Get full screen dimensions

const images = [
  require('../../../assets/images/images/clat.jpg'),
  require('../../../assets/images/images/tcal.jpg'),
];

const ImageSwiper = () => {
  return (
    <FlatList
      data={images}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <View style={styles.imageContainer}>
          <Image source={item} style={styles.image} />
        </View>
      )}
    />
  );
};

export default ImageSwiper;

const styles = StyleSheet.create({
  imageContainer: {
    width, // Full screen width for each image
    height, // Full screen height
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: width,  
    height: height,  
    resizeMode: 'contain',
    // transform: RotateInDownRight
  },
});
// import React, { useState } from "react";
// import { View, Text, ScrollView, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity, Animated } from "react-native";
// import { TabView, SceneMap, TabBar } from "react-native-tab-view";

// const feesData = [
//   { month: "April", amount: "500.00", paid: "0", status: "Due" },
//   { month: "May", amount: "500.00", paid: "0", status: "Due" },
//   { month: "June", amount: "500.00", paid: "0", status: "Due" },
//   { month: "July", amount: "500.00", paid: "0", status: "Due" },
//   { month: "August", amount: "500.00", paid: "0", status: "Due" },
//   { month: "September", amount: "500.00", paid: "0", status: "Due" },
//   { month: "October", amount: "500.00", paid: "0", status: "Due" },
//   { month: "November", amount: "500.00", paid: "0", status: "Due" },
//   { month: "December", amount: "500.00", paid: "0", status: "Due" },
//   { month: "January", amount: "500.00", paid: "0", status: "Due" },
//   { month: "February", amount: "500.00", paid: "0", status: "Due" },
// ];

// const TransportFee = () => {
//   const [expanded, setExpanded] = useState(true);
//   const toggleExpand = () => setExpanded(!expanded);

//   return (
//     <View>
//       {/* Transport Fee Section */}
//       <TouchableOpacity onPress={toggleExpand} style={styles.sectionHeader}>
//         <Text style={styles.sectionTitle}>Transport Fee</Text>
//         <Text style={styles.arrow}>{expanded ? "⌃" : "⌄"}</Text>
//       </TouchableOpacity>

//       {expanded && (
//         <>
//           <View style={styles.tableHeader}>
//             <Text style={styles.tableHeaderText}>Month</Text>
//             <Text style={styles.tableHeaderText}>Amount</Text>
//             <Text style={styles.tableHeaderText}>Paid</Text>
//             <Text style={styles.tableHeaderText}>Status</Text>
//           </View>

//           <ScrollView>
//             {feesData.map((item, index) => (
//               <View key={index} style={styles.tableRow}>
//                 <Text style={styles.tableCell}>{item.month}</Text>
//                 <Text style={styles.tableCell}>{item.amount}</Text>
//                 <Text style={styles.tableCell}>{item.paid}</Text>
//                 <Text style={[styles.tableCell, styles.dueStatus]}>{item.status}</Text>
//               </View>
//             ))}
//           </ScrollView>
//         </>
//       )}
//     </View>
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

// export default function App() {
//   const [index, setIndex] = useState(0);
//   const [routes] = useState([
//     { key: "fees", title: "Fees" },
//     { key: "monthlyDues", title: "Monthly Dues" },
//     { key: "hostelDues", title: "Hostel Dues" },
//   ]);

//   const renderScene = SceneMap({
//     fees: TransportFee,
//     monthlyDues: MonthlyDues,
//     hostelDues: HostelDues,
//   });

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#007AFF" barStyle="light-content" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity style={styles.backButton}>
//           <Text style={styles.backArrow}>←</Text>
//         </TouchableOpacity>
//         <Text style={styles.headerText}>Fees</Text>
//       </View>

//       {/* Tab Navigation */}
//       <TabView
//         navigationState={{ index, routes }}
//         renderScene={renderScene}
//         onIndexChange={setIndex}
//         renderTabBar={props => (
//           <TabBar
//             {...props}
//             indicatorStyle={{ backgroundColor: "white" }}
//             style={{ backgroundColor: "grey" }}
//             labelStyle={{ color: "#007AFF", fontWeight: "bold" }}
//           />
//         )}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   header: {
//     flexDirection: "row",
//     alignItems: "center",
//     backgroundColor: "#007AFF",
//     paddingVertical: 15,
//     paddingHorizontal: 20,
//   },
//   backButton: {
//     marginRight: 10,
//   },
//   backArrow: {
//     fontSize: 20,
//     color: "#fff",
//   },
//   headerText: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   sectionHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     backgroundColor: "#5CB6A9",
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#fff",
//   },
//   arrow: {
//     fontSize: 16,
//     color: "#fff",
//   },
//   tableHeader: {
//     flexDirection: "row",
//     backgroundColor: "#66B3FF",
//     paddingVertical: 8,
//     paddingHorizontal: 5,
//   },
//   tableHeaderText: {
//     flex: 1,
//     fontSize: 14,
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//   },
//   tableRow: {
//     flexDirection: "row",
//     borderBottomWidth: 1,
//     borderColor: "#ccc",
//     paddingVertical: 8,
//     paddingHorizontal: 5,
//   },
//   tableCell: {
//     flex: 1,
//     fontSize: 14,
//     textAlign: "center",
//     color: "#333",
//   },
//   dueStatus: {
//     color: "red",
//     fontWeight: "bold",
//   },
//   dummyContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   dummyText: {
//     fontSize: 18,
//     color: "#555",
//   },
// });


