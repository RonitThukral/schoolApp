// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
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

// const ExpenditureReport = () => {
//   const [expenditures, setExpenditures] = useState([]);
//   const [storeData, setStoreData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentScale, setCurrentScale] = useState(1);
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState('All');
//   const [bankFilter, setBankFilter] = useState('All');
//   const [isFocus, setIsFocus] = useState(false);
//   const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
//   const [endDate, setEndDate] = useState(new Date());
//   const [showStartDatePicker, setShowStartDatePicker] = useState(false);
//   const [showEndDatePicker, setShowEndDatePicker] = useState(false);
//   // Payment methods and banks for dropdowns
//   const paymentMethods = [
//     {label: 'All', value: 'All'},
//     {label: 'Cash', value: 'Cash'},
//     {label: 'Cheque', value: 'Cheque'},
//     {label: 'Online', value: 'Online'},
//     {label: 'Card', value: 'Card'}
//   ];
  
//   const banks = [
//     {label: 'All', value: 'All'},
//     {label: 'SBI', value: 'SBI'},
//     {label: 'HDFC', value: 'HDFC'},
//     {label: 'ICICI', value: 'ICICI'},
//     {label: 'Axis', value: 'Axis'},
//     {label: 'PNB', value: 'PNB'},
//     {label: 'Canara', value: 'Canara'}
//   ];

//   // Cell and content dimensions
//   const cellWidth = 90;
//   const columnHeaders = ["Date", "Amount", "Payment Mode", "Bank", "Description", "Category"];
//   const columnCount = columnHeaders.length;
//   const tableWidth = columnCount * cellWidth;

//   // Handle focus state
//   const handleFocus = (field) => {
//     setIsFocus(true);
//   };

//   const handleBlur = () => {
//     setIsFocus(false);
//   };

//   // Fetch Data from API
//   useEffect(() => {
//     // Actual API endpoint for transactions
//     axios.get('https://api.dreameducation.org.in/api/transactions')
//       .then(response => {
//         console.log(response.data, "data");
//         // Filter to get only expenditure type transactions
//         let results = response.data.filter((i) => i.type === "expenditure");
        
//         // Process description field
//         let data = results.map((e) => {
//           return {
//             ...e,
//             description: getTrimString(e.description, 50),
//           };
//         });
        
//         setExpenditures(data);
//         setStoreData(data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error("Error fetching data:", error);
//         // Use sample data for demonstration if API fails
//         const sampleData = [
//           {
//             "_id": "67c0747758cd11004e435ac8",
//             "date": "2025-02-27T00:00:00.000Z",
//             "amount": "200",
//             "paymentMethod": "Cash",
//             "type": "expenditure",
//             "description": "Office Supplies",
//             "bank": "SBI",
//             "chequeNumber": "",
//             "category": "office",
//             "createdAt": "2025-02-27T14:19:35.397Z",
//             "updatedAt": "2025-02-27T14:19:35.397Z"
//           },
//           {
//             "_id": "67c06c2c58cd11004e43587e",
//             "date": "2025-02-26T00:00:00.000Z",
//             "amount": "500",
//             "paymentMethod": "Cheque",
//             "type": "expenditure",
//             "description": "Equipment Purchase",
//             "bank": "HDFC",
//             "chequeNumber": "123456",
//             "category": "capital",
//             "createdAt": "2025-02-26T13:44:12.400Z",
//             "updatedAt": "2025-02-26T13:44:12.400Z"
//           },
//           {
//             "_id": "67c06b4e58cd11004e4357e1",
//             "date": "2025-02-25T00:00:00.000Z",
//             "amount": "150",
//             "paymentMethod": "Online",
//             "type": "expenditure",
//             "description": "Utility Bills",
//             "bank": "ICICI",
//             "chequeNumber": "",
//             "category": "utilities",
//             "createdAt": "2025-02-25T13:40:30.546Z",
//             "updatedAt": "2025-02-25T13:40:30.546Z"
//           },
//           {
//             "_id": "67c06b4e58cd11004e4357e2",
//             "date": "2025-02-24T00:00:00.000Z",
//             "amount": "300",
//             "paymentMethod": "Card",
//             "type": "expenditure",
//             "description": "Staff Lunch",
//             "bank": "Axis",
//             "chequeNumber": "",
//             "category": "meals",
//             "createdAt": "2025-02-24T13:40:30.546Z",
//             "updatedAt": "2025-02-24T13:40:30.546Z"
//           }
//         ];
        
//         setExpenditures(sampleData);
//         setStoreData(sampleData);
//         setLoading(false);
//       });
//   }, []);

//  // Date picker handlers
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
//   const getInitialScale = () => Math.min(1, screenWidth / tableWidth);

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
//       const newScale = Math.max(0.1, Math.min(ctx.startScale * event.scale, 2));
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
//       if (scale.value < 1) return;

//       const scaledWidth = tableWidth * scale.value;
//       const scaledHeight = screenHeight * scale.value;

//       const maxX = Math.max(0, (scaledWidth - screenWidth) / 2);
//       const maxY = Math.max(0, (scaledHeight - screenHeight) / 2);

//       translateX.value = Math.min(maxX, Math.max(-maxX, ctx.startX + event.translationX));
//       translateY.value = Math.min(maxY, Math.max(-maxY, ctx.startY + event.translationY));
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
      
      
//       <GestureHandlerRootView style={styles.container}>
//         <PanGestureHandler onGestureEvent={panHandler}>
//           <Animated.View style={styles.gestureContainer}>
//             <PinchGestureHandler onGestureEvent={pinchHandler}>
//               <Animated.View style={[styles.contentWrapper]}>
//                 <Animated.View 
//                   style={[
//                     styles.tableContainer,
//                     { width: tableWidth },
//                     animatedStyles
//                   ]}
//                 >
//                 <View style={styles.heading}>
//                 {/* Title and Date */}
//                   <Text style={styles.title}>Expenditure Report</Text>
//                   <Text style={styles.date}>Date: 26-Feb-2024 to 26-Feb-2025</Text>

//                 </View>
                  
//                   {/* Loader */}
//                   {loading ? (
//                     <ActivityIndicator size="large" color="#ffcc00" />
//                   ) : (
//                     <View style={styles.table}>
//                       {/* Header Row */}
//                       <View style={styles.row}>
//                         {columnHeaders.map((header, index) => (
//                           <Text key={index} style={[styles.cell, styles.header]}>{header}</Text>
//                         ))}
//                       </View>

//                       {/* Data Rows */}
//                       {expenditures.length > 0 ? (
//                         expenditures.map((item, rowIndex) => (
//                           <View key={rowIndex} style={[
//         styles.row, 
//         rowIndex % 2 === 1 ? { backgroundColor: '#daedff' } : {}
//       ]}>
//                             <Text style={styles.cell}>{formatDate(item.date)}</Text>
//                             <Text style={styles.cell}>{item.amount}</Text>
//                             <Text style={styles.cell}>{item.pay.bank ? "Bank" : 'Cash'}</Text>
//                             <Text style={styles.cell}>{item.pay.bank || "N/A"}</Text>
//                             <Text style={styles.cell}>{item.description}</Text>
//                             <Text style={styles.cell}>{item.category}</Text>
//                           </View>
//                         ))
//                       ) : (
//                         <View style={styles.row}>
//                           <Text style={[styles.cell, styles.noData, { width: tableWidth - 2 }]}>No data matches your filters</Text>
//                         </View>
//                       )}
//                     </View>
//                   )}

//                   {/* Footer */}
//                 </Animated.View>
//               </Animated.View>
//             </PinchGestureHandler>
//           </Animated.View>
//         </PanGestureHandler>

//         {/* Scale indicator */}
//         <View style={styles.scaleIndicator}>
//           <Text style={styles.scaleText}>
//             Scale: {currentScale.toFixed(2)}x
//           </Text>
//         </View>
//       </GestureHandlerRootView>
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
 
//   dropdownLabel: {
//     fontSize: 12,
//     marginBottom: 4,
//     fontWeight: 'bold',
//     marginLeft: 14
//   },
//    datePicker: {
//     height: 50,
//     width: "100%",
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
//     overflow: 'hidden',
//   },
//   contentWrapper: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   tableContainer: {
//     backfaceVisibility: 'hidden',
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginVertical: 5,
//   },
//   date: {
//     fontSize: 14,
//     textAlign: 'center',
//     marginBottom: 5,
  
//   },
//   table: {
//     borderWidth: 1,
//     borderColor: '#000',
//     width: '100%',
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
//     color:'white'
//   },
//   heading:{
//   fontWeight: 'bold',
//   borderTopWidth: 1,
//   borderLeftWidth: 1,
//   borderRightWidth: 1,
//   borderColor: '#000',
//   paddingVertical:8
  
//   },
//   noData: {
//     textAlign: 'center',
//     paddingVertical: 15,
//     fontStyle: 'italic',
//     color: '#666',
//   },
//   footer: {
//     marginTop: 5,
//     textAlign: 'center',
//     fontSize: 14,
//     fontWeight: 'bold',
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

// export default ExpenditureReport;



import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const index = () => {
  return (
    <View>
      <Text>expenditure</Text>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})