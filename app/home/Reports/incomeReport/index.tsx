import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView, PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';
import Constants from 'expo-constants';

const baseUrl = Constants.expoConfig?.extra?.API_URL || 'https://api.dreameducation.org.in/api';

// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Function to trim strings for display
const getTrimString = (str, maxLength) => {
  if (!str) return "";
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

// Custom date picker component to replace the native one
const CustomDatePicker = ({ visible, value, onConfirm, onCancel }) => {
  const [selectedDate, setSelectedDate] = useState(value);
  
  // Track selected date components
  const [day, setDay] = useState(value.getDate());
  const [month, setMonth] = useState(value.getMonth() + 1);
  const [year, setYear] = useState(value.getFullYear());
  
  useEffect(() => {
    setSelectedDate(new Date(year, month - 1, day));
  }, [day, month, year]);
  
  const confirmSelection = () => {
    onConfirm(selectedDate);
  };
  
  const renderOptions = (start, end, current, setter) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <TouchableOpacity 
          key={i} 
          style={[styles.pickerOption, i === current ? styles.selectedOption : null]}
          onPress={() => setter(i)}
        >
          <Text style={[styles.pickerText, i === current ? styles.selectedOptionText : null]}>
            {i < 10 ? `0${i}` : i}
          </Text>
        </TouchableOpacity>
      );
    }
    return options;
  };
  
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Select Date</Text>
          
          <View style={styles.pickerContainer}>
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Day</Text>
              <ScrollView style={styles.pickerScrollView}>
                {renderOptions(1, 31, day, setDay)}
              </ScrollView>
            </View>
            
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Month</Text>
              <ScrollView style={styles.pickerScrollView}>
                {renderOptions(1, 12, month, setMonth)}
              </ScrollView>
            </View>
            
            <View style={styles.pickerColumn}>
              <Text style={styles.pickerLabel}>Year</Text>
              <ScrollView style={styles.pickerScrollView}>
                {renderOptions(2020, 2030, year, setYear)}
              </ScrollView>
            </View>
          </View>
          
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.confirmButton} onPress={confirmSelection}>
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const IncomeReport = () => {
  const [expenditures, setExpenditures] = useState([]);
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentScale, setCurrentScale] = useState(1);
  
  // Date filter states
  const [startDate, setStartDate] = useState(new Date(new Date().setFullYear(new Date().getFullYear() - 1)));
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  // Cell and content dimensions
  const cellWidth = 90;
  const columnHeaders = ["Date", "Amount","Student ID", "Payment Method", "Bank", "Description", "Category"];
  const columnCount = columnHeaders.length;
  const tableWidth = columnCount * cellWidth;

  // Fetch Data from API
  useEffect(() => {
    axios.get(`${baseUrl}/transactions`)
      .then(response => {
        // console.log(response.data, "data");

        // Filter to get only income type transactions
        let results = response.data.filter((i) => i.type === "income");

        let data = results.map((e) => {
          return {
            ...e,
            description: getTrimString(e.description, 50),
            bank: e.bank && e.bank !== "" ? e.bank : "N/A",
            paymentMethod: e.paymentMethod ? e.paymentMethod : "Online", // Default if missing
          };
        });

        setExpenditures(data);
        setStoreData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        // Add fallback for demo/testing
        setLoading(false);
      });
  }, []);

  // Date picker handlers
  const onStartDateChange = (selectedDate) => {
    setShowStartDatePicker(false);
    setStartDate(selectedDate);
  };

  const onEndDateChange = (selectedDate) => {
    setShowEndDatePicker(false);
    setEndDate(selectedDate);
  };

  // Apply date range filter
  const applyDateFilter = () => {
    let results = [...storeData];
    
    // Apply date range filter
    results = results.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate && itemDate <= endDate;
    });
    
    setExpenditures(results);
  };

  // Calculate initial scale to fit all columns
  const getInitialScale = () => Math.min(0.8, screenWidth / tableWidth);

  // Shared values for gestures
  const scale = useSharedValue(getInitialScale());
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const lastScale = useSharedValue(getInitialScale());

  // Update when column count changes
  useEffect(() => {
    const newScale = getInitialScale();
    scale.value = newScale;
    lastScale.value = newScale;
    translateX.value = 0;
    translateY.value = 0;
    runOnJS(setCurrentScale)(newScale);
  }, []);

  // Handle pinch (zoom) gesture
  const pinchHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startScale = scale.value;
    },
    onActive: (event, ctx) => {
      const newScale = Math.max(0.4, Math.min(ctx.startScale * event.scale, 2));
      scale.value = newScale;
      runOnJS(setCurrentScale)(newScale);
    },
    onEnd: () => {
      lastScale.value = scale.value;
    }
  });

  // Handle pan (drag) gesture
  const panHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
      ctx.startY = translateY.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
      translateY.value = ctx.startY + event.translationY;
    },
  });

  // Animated styles for the content
  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value }
      ]
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
       {/* Date Filter Controls */}
           <View style={styles.filterContainer}>
             <View style={styles.datePickerSection}>
               <Text style={styles.dropdownLabel}>Start Date:</Text>
               <TouchableOpacity 
                 style={styles.datePicker}
                 onPress={() => setShowStartDatePicker(true)}
               >
                 <Text style={styles.selectedTextStyle}>{formatDate(startDate.toISOString())}</Text>
               </TouchableOpacity>
               
               <CustomDatePicker
                 visible={showStartDatePicker}
                 value={startDate}
                 onConfirm={onStartDateChange}
                 onCancel={() => setShowStartDatePicker(false)}
               />
             </View>
             
             <View style={styles.datePickerSection}>
               <Text style={styles.dropdownLabel}>End Date:</Text>
               <TouchableOpacity 
                 style={styles.datePicker}
                 onPress={() => setShowEndDatePicker(true)}
               >
                 <Text style={styles.selectedTextStyle}>{formatDate(endDate.toISOString())}</Text>
               </TouchableOpacity>
               
               <CustomDatePicker
                 visible={showEndDatePicker}
                 value={endDate}
                 onConfirm={onEndDateChange}
                 onCancel={() => setShowEndDatePicker(false)}
               />
             </View>
             
             <TouchableOpacity style={styles.filterButton} onPress={applyDateFilter}>
               <Text style={styles.filterButtonText}>Filter</Text>
             </TouchableOpacity>
           </View>
           
      
      <GestureHandlerRootView style={styles.container}>
        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View style={styles.gestureContainer}>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.View style={[styles.contentWrapper]}>
                <Animated.View 
                  style={[
                    styles.tableContainer,
                    { width: tableWidth },
                    animatedStyles
                  ]}
                >
                  {/* Title and Date */}
                  <Text style={styles.title}>Income Report</Text>
                  <Text style={styles.date}>
                    Date: {formatDate(startDate.toISOString())} to {formatDate(endDate.toISOString())}
                  </Text>

                  {/* Loader */}
                  {loading ? (
                    <ActivityIndicator size="large" color="#ffcc00" />
                  ) : (
                    <View style={styles.table}>
                      {/* Header Row */}
                      <View style={styles.row}>
                        {columnHeaders.map((header, index) => (
                          <Text key={index} style={[styles.cell, styles.header]}>{header}</Text>
                        ))}
                      </View>

                      {/* Data Rows */}
                      {expenditures.length > 0 ? (
                        expenditures.map((item, rowIndex) => (
                          <View key={rowIndex} style={[
                            styles.row, 
                            rowIndex % 2 === 1 ? { backgroundColor: '#daedff' } : {}
                          ]}>
                            <Text style={styles.cell}>{formatDate(item.date)}</Text>
                            <Text style={styles.cell}>{item.amount}</Text>
                            <Text style={styles.cell}>{item.fees?.userID}</Text>
                            <Text style={styles.cell}>{item.paymentMethod}</Text>
                            <Text style={styles.cell}>{item.bank || "N/A"}</Text>
                            <Text style={styles.cell}>{item.description}</Text>
                            <Text style={styles.cell}>{item.category}</Text>
                          </View>
                        ))
                      ) : (
                        <View style={styles.row}>
                          <Text style={[styles.cell, styles.noData, { width: tableWidth - 2 }]}>No data matches your filters</Text>
                        </View>
                      )}
                    </View>
                  )}
                </Animated.View>
              </Animated.View>
            </PinchGestureHandler>
          </Animated.View>
        </PanGestureHandler>

        {/* Scale indicator */}
        <View style={styles.scaleIndicator}>
          <Text style={styles.scaleText}>
            Scale: {currentScale.toFixed(2)}x
          </Text>
        </View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 100
  },
  datePickerSection: {
    width: '40%',
  },
  dropdownLabel: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    marginLeft: 14
  },
  datePicker: {
    height: 50,
    width: "90%",
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#daedff',
    marginBottom: 15,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal: 15
  },
  filterButton: {
    backgroundColor: '#58a8f9',
    paddingHorizontal: 20,
    position: 'relative',
    bottom: 20,
    borderRadius: 4,
    height: 40,
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  gestureContainer: {
    flex: 1,
    overflow: 'hidden',
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  tableContainer: {
    backfaceVisibility: 'hidden',
    
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  date: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 5,
  },
  table: {
    borderWidth: 1,
    borderColor: '#000',
    width: '100%',
    
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  cell: {
    width: 90,
    paddingVertical: 5,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: '#000',
    fontSize: 12,
  },
  header: {
    fontWeight: 'bold',
    backgroundColor: '#58a8f9',
    color: 'white'
  },
  noData: {
    textAlign: 'center',
    paddingVertical: 15,
    fontStyle: 'italic',
    color: '#666',
  },
  footer: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
  scaleIndicator: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  scaleText: {
    color: 'white',
    fontSize: 10,
  },
  // Custom date picker styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  pickerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 10,
  },
  pickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  pickerLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  pickerScrollView: {
    height: 150,
    width: '80%',
  },
  pickerOption: {
    padding: 10,
    alignItems: 'center',
  },
  pickerText: {
    fontSize: 16,
  },
  selectedOption: {
    backgroundColor: '#daedff',
    borderRadius: 5,
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: '#58a8f9',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#333',
  },
  confirmButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#58a8f9',
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default IncomeReport;