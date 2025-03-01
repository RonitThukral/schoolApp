import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView, PinchGestureHandler, PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  useAnimatedGestureHandler,
  runOnJS
} from 'react-native-reanimated';
import { Dropdown } from 'react-native-element-dropdown';

import Constants from 'expo-constants';


  const baseUrl = Constants.expoConfig.extra.API_URL;



// Get screen dimensions
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const UnpaidBalanceReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fees, setFees] = useState([]);
  const [year, setYear] = useState('2024');
  const [term, setTerm] = useState('1');
  const [classID, setClassID] = useState('ii-a');
  const [currentScale, setCurrentScale] = useState(1);
  const [classes, setClasses] = useState([]);

const fetchClasses = async () => {
    try {
      const res = await axios.get(`${baseUrl}/classes`);
      const formattedData = res.data.map((cls) => ({
        label: cls.name,
        value: cls.classCode,
      }));
      setClasses(formattedData);
    } catch (error) {
      console.error('Error fetching classes:', error.message);
      Alert.alert('Error', 'Unable to fetch classes. Please try again.');
    }
  };


  useEffect(()=>{
fetchClasses()
  },[])


  // Format data for dropdowns
  // const classes = [
  //   { label: 'All Classes', value: 'all' },
  //   { label: 'Class I-A', value: 'i-a' },
  //   { label: 'Class I-B', value: 'i-b' },
  //   { label: 'Class II-A', value: 'ii-a' },
  //   { label: 'Class II-B', value: 'ii-b' },
  //   { label: 'Class III-A', value: 'iii-a' },
  //   { label: 'Class III-B', value: 'iii-b' }
  // ];
  
  const years = [
    { label: '2022', value: '2022' },
    { label: '2023', value: '2023' },
    { label: '2024', value: '2024' },
    { label: '2025', value: '2025' }
  ];
  
  const terms = [
    { label: 'Term 1', value: '1' },
    { label: 'Term 2', value: '2' },
    { label: 'Term 3', value: '3' }
  ];

  // Cell and content dimensions
  const cellWidth = 120;
  const columnHeaders = ["Student ID", "Name", "Class", "Total Bill Rs", "Amount Paid Rs", "AmountDue Rs"];
  const columnCount = columnHeaders.length;
  const tableWidth = columnCount * cellWidth;

  // Calculate initial scale to fit all columns
  const getInitialScale = () => Math.min(1, screenWidth / tableWidth);

  // Shared values for gestures
  const scale = useSharedValue(getInitialScale());
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const lastScale = useSharedValue(getInitialScale());

  useEffect(() => {
    // Update scale when column count changes
    const newScale = getInitialScale();
    scale.value = newScale;
    lastScale.value = newScale;
    translateX.value = 0;
    translateY.value = 0;
    runOnJS(setCurrentScale)(newScale);
    
    // Fetch fees data
    axios.get(`${baseUrl}/fees`)
      .then((res) => {
        setFees(res.data);
      })
      .catch(error => {
        console.error("Error fetching fees:", error);
        // Sample fees data for demo
        setFees([
          { code: 'ii-a', regular: { tuition: 1000, admission: 500, uniform: 200 } }
        ]);
      });
  }, []);

  const handleSearch = () => {
    setLoading(true);
    
    const bal = (student) => {
      let fee = fees.find((z) => z?.code === student?.classID);
      return fee
        ? Object.values(fee[student.status] || {}).reduce(
            (t, v) => Number(t) + Number(v),
            0
          )
        : 0;
    };
    
    axios.get(`${baseUrl}/students/unpaidfees/${year}/${term}`)
      .then((res) => {
        let students = res.data.map((e) => {
          let total = bal(e);
          return {
            ...e,
            bill: total,
            owe: total - e.amount,
            total,
          };
        });
        
        let dataAll = students.filter((e) => e.owe > 0);

        if (classID !== "all") {
          dataAll = dataAll.filter((e) => e.classID === classID);
        }
        
        setData(dataAll);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching students:", error);
        // Sample data for demo
        const sampleData = [
          {
            userID: 'student',
            name: 'Goku Shr',
            classID: 'ii-a',
            bill: 1700,
            amount: 0,
            owe: 1700
          },
          {
            userID: 'BK2025646',
            name: 'Rishant Sinha',
            classID: 'ii-a',
            bill: 700,
            amount: 0,
            owe: 700
          },
          {
            userID: 'BK2026441',
            name: 'Kumari Prachi Chitkara',
            classID: 'ii-a',
            bill: 700,
            amount: 0,
            owe: 700
          }
        ];
        setData(sampleData);
        setLoading(false);
      });
  };

  // Handle pinch (zoom) gesture
  const pinchHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startScale = scale.value;
    },
    onActive: (event, ctx) => {
      const newScale = Math.max(0.1, Math.min(ctx.startScale * event.scale, 2));
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
      if (scale.value < 1) return;

      const scaledWidth = tableWidth * scale.value;
      const scaledHeight = screenHeight * scale.value;

      const maxX = Math.max(0, (scaledWidth - screenWidth) / 2);
      const maxY = Math.max(0, (scaledHeight - screenHeight) / 2);

      translateX.value = Math.min(maxX, Math.max(-maxX, ctx.startX + event.translationX));
      translateY.value = Math.min(maxY, Math.max(-maxY, ctx.startY + event.translationY));
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
      <GestureHandlerRootView style={styles.container}>
        {/* Filter section with dropdowns */}
        <View style={styles.filtersContainer}>
          {/* First row with two dropdowns */}
          <View style={styles.filterRow}>
            <View style={styles.dropdownHalfWidth}>
              <Text style={styles.filterLabel}>Year:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={years}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Year"
                value={year}
                onChange={item => setYear(item.value)}
              />
            </View>
            
            <View style={styles.dropdownHalfWidth}>
              <Text style={styles.filterLabel}>Term:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={terms}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Term"
                value={term}
                onChange={item => setTerm(item.value)}
              />
            </View>
          </View>
          
          {/* Second row with class dropdown and search button */}
          <View style={styles.filterRow}>
            <View style={styles.dropdownTwoThirdsWidth}>
              <Text style={styles.filterLabel}>Class:</Text>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={classes}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Select Class"
                value={classID}
                onChange={item => setClassID(item.value)}
              />
            </View>
            
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
            >
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>

        <PanGestureHandler onGestureEvent={panHandler}>
          <Animated.View style={styles.gestureContainer}>
            <PinchGestureHandler onGestureEvent={pinchHandler}>
              <Animated.View style={styles.contentWrapper}>
                <Animated.View 
                  style={[
                    styles.tableContainer,
                    { width: tableWidth },
                    animatedStyles
                  ]}
                >
                  <View style={[loading ? styles.noheading : styles.heading]}>
                    <Text style={styles.title}>DEBTORS LIST FOR TERM: {term} And YEAR: {year}</Text>
                  </View>
                  
                  {/* Loader */}
                  {loading ? (
                    <ActivityIndicator size="large" color="#58a8f9" />
                  ) : (
                    <View style={styles.table}>
                      {/* Header Row */}
                      <View style={styles.headerRow}>
                        {columnHeaders.map((header, index) => (
                          <Text key={index} style={[styles.cell, styles.header]}>{header}</Text>
                        ))}
                      </View>

                      {/* Data Rows */}
                      {data.length > 0 ? (
                        data.map((item, rowIndex) => (
                          <View key={rowIndex} style={[
                            styles.row, 
                            rowIndex % 2 === 1 ? { backgroundColor: '#f0f7ff' } : {}
                          ]}>
                            <Text style={styles.cell}>{item.userID}</Text>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>{item.classID}</Text>
                            <Text style={styles.cell}>{item.bill}</Text>
                            <Text style={styles.cell}>{item.amount || '-'}</Text>
                            <Text style={styles.cell}>{item.owe}</Text>
                          </View>
                        ))
                      ) : (
                        <View style={styles.row}>
                          <Text style={[styles.cell, { width: tableWidth - cellWidth }]}>No debtors found</Text>
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
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  // filtersContainer: {
  //   padding: 15,
  //   backgroundColor: 'white',
  //   borderBottomWidth: 1,
  //   borderBottomColor: '#e0e0e0',
  //   marginTop:100
  // },
  // filterRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'flex-end',
  //   marginBottom: 10,
  // },
  dropdownHalfWidth: {
    width: '48%',
  },
  dropdownTwoThirdsWidth: {
    width: '65%',
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  dropdown: {
    height: 40,
    borderColor: '#daedff',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    backgroundColor: '#daedff',
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#aaa',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#58a8f9',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: '30%',
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  gestureContainer: {
    flex: 1,
    overflow: 'hidden',
  },
 // Change this style
contentWrapper: {
  flex: 1,
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: 20, // Reduce this value to 5 or 0
},

// Also consider reducing this if needed
filtersContainer: {
  padding: 15,
  backgroundColor: 'white',
  borderBottomWidth: 1,
  borderBottomColor: '#e0e0e0',
  marginBottom: 0,
  marginTop:70 // Make sure there's no bottom margin
},

// And if there's still too much gap, you might want to adjust
filterRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginBottom: 10, // Reduce this to 5 if needed for the last row
},

  tableContainer: {
    backfaceVisibility: 'hidden',
    
  },
  heading: {
    paddingVertical: 15,
    alignItems: 'center',
    position:'relative',
    bottom:100
    // marginTop:-100
  },
  noheading: {
    paddingVertical: 15,
    alignItems: 'center',
    
    // marginTop:-100
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#58a8f9',
    textAlign: 'center',
  },
  table: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: 'white',
    position:'relative',
    bottom:90
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#58a8f9',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
  },
  cell: {
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 5,
    textAlign: 'center',
    borderRightWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    fontWeight: 'bold',
    color: 'white',
  },
  noData: {
    textAlign: 'center',
    paddingVertical: 15,
    fontStyle: 'italic',
    color: '#666',
  },
  scaleIndicator: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  scaleText: {
    color: 'white',
    fontSize: 12,
  }
});

export default UnpaidBalanceReport;