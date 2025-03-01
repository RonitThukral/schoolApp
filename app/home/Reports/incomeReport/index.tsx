// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
// import axios from 'axios';
// import { GestureHandlerRootView, PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
// import Animated, { 
//   useSharedValue, 
//   useAnimatedStyle, 
//   useAnimatedGestureHandler,
//   runOnJS
// } from 'react-native-reanimated';
// import DateTimePicker from '@react-native-community/datetimepicker';

// // Get screen dimensions
// const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// // Function to trim strings for display
// const getTrimString = (str, maxLength) => {
//   if (!str) return "";
//   return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
// };

// // Format date for display
// const formatDate = (dateString) => {
//   const date = new Date(dateString);
//   return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
// };

// const IncomeReport = () => {
//   const [expenditures, setExpenditures] = useState([]);
//   const [storeData, setStoreData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentScale, setCurrentScale] = useState(1);
  
//   // Date filter states
//   const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
//   const [endDate, setEndDate] = useState(new Date());
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);

//   // Cell and content dimensions
//   const cellWidth = 90;
//   const columnHeaders = ["Date", "Amount", "Payment Method", "Bank", "Description", "Category"];
//   const columnCount = columnHeaders.length;
//   const tableWidth = columnCount * cellWidth;

//   // Fetch Data from API
//   useEffect(() => {
//     axios.get('https://api.dreameducation.org.in/api/transactions')
//       .then(response => {
//         console.log(response.data, "data");

//         // Filter to get only income type transactions
//         let results = response.data.filter((i) => i.type === "income");

//         let data = results.map((e) => {
//           return {
//             ...e,
//             description: getTrimString(e.description, 50),
//             bank: e.bank && e.bank !== "" ? e.bank : "N/A",
//             paymentMethod: e.paymentMethod ? e.paymentMethod : "Online", // Default if missing
//           };
//         });

//         setExpenditures(data);
//         setStoreData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   // Date picker handlers
//   const onStartDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || startDate;
//     setShowStartDatePicker(false);
//     setStartDate(currentDate);
//   };

//   const onEndDateChange = (event, selectedDate) => {
//     const currentDate = selectedDate || endDate;
//     setShowEndDatePicker(false);
//     setEndDate(currentDate);
//   };

//   // Apply date range filter
//   const applyDateFilter = () => {
//     let results = [...storeData];
    
//     // Apply date range filter
//     results = results.filter(item => {
//       const itemDate = new Date(item.date);
//       return itemDate >= startDate && itemDate <= endDate;
//     });
    
//     setExpenditures(results);
//   };

//   // Calculate initial scale to fit all columns
//   const getInitialScale = () => Math.min(0.8, screenWidth / tableWidth);

//   // Shared values for gestures
//   const scale = useSharedValue(getInitialScale());
//   const translateX = useSharedValue(0);
//   const translateY = useSharedValue(0);
//   const lastScale = useSharedValue(getInitialScale());

//   // Update when column count changes
//   useEffect(() => {
//     const newScale = getInitialScale();
//     scale.value = newScale;
//     lastScale.value = newScale;
//     translateX.value = 0;
//     translateY.value = 0;
//     runOnJS(setCurrentScale)(newScale);
//   }, []);

//   // Handle pinch (zoom) gesture
//   const pinchHandler = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.startScale = scale.value;
//     },
//     onActive: (event, ctx) => {
//       const newScale = Math.max(0.4, Math.min(ctx.startScale * event.scale, 2));
//       scale.value = newScale;
//       runOnJS(setCurrentScale)(newScale);
//     },
//     onEnd: () => {
//       lastScale.value = scale.value;
//     }
//   });

//   // Handle pan (drag) gesture
//   const panHandler = useAnimatedGestureHandler({
//     onStart: (_, ctx) => {
//       ctx.startX = translateX.value;
//       ctx.startY = translateY.value;
//     },
//     onActive: (event, ctx) => {
//       // Allow panning regardless of scale
//       translateX.value = ctx.startX + event.translationX;
//       translateY.value = ctx.startY + event.translationY;
//     },
//   });

//   // Animated styles for the content
//   const animatedStyles = useAnimatedStyle(() => {
//     return {
//       transform: [
//         { translateX: translateX.value },
//         { translateY: translateY.value },
//         { scale: scale.value }
//       ]
//     };
//   });

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       {/* Date Filter Controls */}
//       <View style={styles.filterContainer}>
//         <View style={styles.datePickerSection}>
//           <Text style={styles.dropdownLabel}>Start Date:</Text>
//           <TouchableOpacity 
//             style={styles.datePicker}
//             onPress={() => setShowStartDatePicker(true)}
//           >
//             <Text style={styles.selectedTextStyle}>{formatDate(startDate.toISOString())}</Text>
//           </TouchableOpacity>
//           {showStartDatePicker && (
//             <DateTimePicker
//               value={startDate}
//               mode="date"
//               display="default"
//               onChange={onStartDateChange}
//             />
//           )}
//         </View>
        
//         <View style={styles.datePickerSection}>
//           <Text style={styles.dropdownLabel}>End Date:</Text>
//           <TouchableOpacity 
//             style={styles.datePicker}
//             onPress={() => setShowEndDatePicker(true)}
//           >
//             <Text style={styles.selectedTextStyle}>{formatDate(endDate.toISOString())}</Text>
//           </TouchableOpacity>
//           {showEndDatePicker && (
//             <DateTimePicker
//               value={endDate}
//               mode="date"
//               display="default"
//               onChange={onEndDateChange}
//             />
//           )}
//         </View>
        
//         <TouchableOpacity style={styles.filterButton} onPress={applyDateFilter}>
//           <Text style={styles.filterButtonText}>Filter</Text>
//         </TouchableOpacity>
//       </View>
      
//       <View style={styles.container}>
//         <GestureHandlerRootView style={styles.gestureContainer}>
//           <PanGestureHandler onGestureEvent={panHandler}>
//             <Animated.View style={styles.gestureWrapper}>
//               <PinchGestureHandler onGestureEvent={pinchHandler}>
//                 <Animated.View style={styles.contentWrapper}>
//                   <ScrollView 
//                     horizontal={true} 
//                     contentContainerStyle={styles.horizontalScrollContent}
//                   >
//                     <ScrollView 
//                       vertical={true}
//                       contentContainerStyle={styles.verticalScrollContent}
//                     >
//                       <Animated.View 
//                         style={[
//                           styles.tableContainer,
//                           { width: tableWidth },
//                           animatedStyles
//                         ]}
//                       >
//                         {/* Title and Date */}
//                         <Text style={styles.title}>Expenditure Report</Text>
//                         <Text style={styles.date}>
//                           Date: {formatDate(startDate.toISOString())} to {formatDate(endDate.toISOString())}
//                         </Text>

//                         {/* Loader */}
//                         {loading ? (
//                           <ActivityIndicator size="large" color="#ffcc00" />
//                         ) : (
//                           <View style={styles.table}>
//                             {/* Header Row */}
//                             <View style={styles.row}>
//                               {columnHeaders.map((header, index) => (
//                                 <Text key={index} style={[styles.cell, styles.header]}>{header}</Text>
//                               ))}
//                             </View>

//                             {/* Data Rows */}
//                             {expenditures.length > 0 ? (
//                               expenditures.map((item, rowIndex) => (
//                                 <View key={rowIndex} style={styles.row}>
//                                   <Text style={styles.cell}>{formatDate(item.date)}</Text>
//                                   <Text style={styles.cell}>{item.amount}</Text>
//                                   <Text style={styles.cell}>{item.paymentMethod}</Text>
//                                   <Text style={styles.cell}>{item.bank || "N/A"}</Text>
//                                   <Text style={styles.cell}>{item.description}</Text>
//                                   <Text style={styles.cell}>{item.category}</Text>
//                                 </View>
//                               ))
//                             ) : (
//                               <View style={styles.row}>
//                                 <Text style={[styles.cell, styles.noData, { width: tableWidth - 2 }]}>No data matches your filters</Text>
//                               </View>
//                             )}
//                           </View>
//                         )}
//                       </Animated.View>
//                     </ScrollView>
//                   </ScrollView>
//                 </Animated.View>
//               </PinchGestureHandler>
//             </Animated.View>
//           </PanGestureHandler>
//         </GestureHandlerRootView>

//         {/* Scale indicator */}
//         <View style={styles.scaleIndicator}>
//           <Text style={styles.scaleText}>
//             Scale: {currentScale.toFixed(2)}x
//           </Text>
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   filterContainer: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ddd',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingTop: 100
//   },
//   datePickerSection: {
//     width: '40%',
//   },
//   dropdownLabel: {
//     fontSize: 12,
//     marginBottom: 4,
//     fontWeight: 'bold',
//     marginLeft: 14
//   },
//   datePicker: {
//     height: 50,
//     width: "90%",
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     backgroundColor: '#daedff',
//     marginBottom: 15,
//     alignSelf: 'center',
//     justifyContent: 'center'
//   },
  
//   selectedTextStyle: {
//     fontSize: 16,
//     paddingHorizontal: 15
//   },
//   filterButton: {
//     backgroundColor: '#58a8f9',
//     paddingHorizontal: 20,
//     position: 'relative',
//     bottom: 20,
//     borderRadius: 4,
//     height: 40,
//     justifyContent: 'center',
//     alignSelf: 'flex-end',
//   },
//   filterButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gestureContainer: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   gestureWrapper: {
//     flex: 1,
//     overflow: 'visible',
//   },
//   contentWrapper: {
//     flex: 1,
//   },
//   horizontalScrollContent: {
//     flexGrow: 1,
//   },
//   verticalScrollContent: {
//     flexGrow: 1,
//   },
//   tableContainer: {
//     padding: 12,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 5,
//   },
//   date: {
//     fontSize: 12,
//     textAlign: 'center',
//     marginBottom: 5,
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: '#000',
//     width: '105%',
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#000',
//   },
//   cell: {
//     width: 90,
//     paddingVertical: 5,
//     textAlign: 'center',
//     borderRightWidth: 1,
//     borderColor: '#000',
//     fontSize: 12,
//   },
//   header: {
//     fontWeight: 'bold',
//     backgroundColor: '#58a8f9',
//   },
//   noData: {
//     textAlign: 'center',
//     paddingVertical: 15,
//     fontStyle: 'italic',
//     color: '#666',
//   },
//   scaleIndicator: {
//     position: 'absolute',
//     bottom: 10,
//     alignSelf: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 15,
//   },
//   scaleText: {
//     color: 'white',
//     fontSize: 10,
//   }
// });

// export default IncomeReport;




import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View>
      <Text>income</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})