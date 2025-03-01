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

const BalanceSheet = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentScale, setCurrentScale] = useState(1);
  const [yearFilter, setYearFilter] = useState(null);
  const [termFilter, setTermFilter] = useState(null);
  const [availableYears, setAvailableYears] = useState([{label: 'All', value: 'All'}]);
  const [availableTerms, setAvailableTerms] = useState([{label: 'All', value: 'All'}]);
  const [isFocus, setIsFocus] = useState(false);

  // Cell and content dimensions
  const cellWidth = 90;
  const columnHeaders = ["Student", "Year", "Term", "Amount", "Bank", "Payment Type"];
  const columnCount = columnHeaders.length;
  const tableWidth = columnCount * cellWidth;


  // Handle focus state
  const handleFocus = (field) => {
    setIsFocus(true);
  };

  const handleBlur = () => {
    setIsFocus(false);
  };

  // Fetch Data from API
  useEffect(() => {
    axios.get(`${baseUrl}/transactions/students/fees`)
      .then(response => {
        setData(response.data);
        setFilteredData(response.data);
        
        // Extract unique years and terms for dropdown options
        const years = [
          {label: 'All', value: 'All'},
          ...Array.from(new Set(response.data.map(item => item.academicYear)))
            .map(year => ({label: year, value: year}))
        ];
        
        const terms = [
          {label: 'All', value: 'All'},
          ...Array.from(new Set(response.data.map(item => item.term)))
            .map(term => ({label: term, value: term}))
        ];
        
        setAvailableYears(years);
        setAvailableTerms(terms);
        
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  // Apply filters only when search button is clicked
  const applyFilters = () => {
    let results = [...data];
    
    // Apply year filter
    if (yearFilter && yearFilter !== 'All') {
      results = results.filter(item => item.academicYear === yearFilter);
    }
    
    // Apply term filter
    if (termFilter && termFilter !== 'All') {
      results = results.filter(item => item.term === termFilter);
    }
    
    setFilteredData(results);
  };

  // Calculate initial scale to fit all columns
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
      // Allow panning regardless of scale
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
      {/* Filter Controls */}
      <View style={styles.filterContainer}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Year:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={availableYears}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Year"
            searchPlaceholder="Search..."
            onFocus={() => handleFocus('year')}
            onBlur={handleBlur}
            value={yearFilter}
            onChange={(item) => setYearFilter(item.value)}
          />
        </View>
        
        <View style={styles.dropdownContainer}>
          <Text style={styles.dropdownLabel}>Term:</Text>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={availableTerms}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select Term"
            searchPlaceholder="Search..."
            onFocus={() => handleFocus('term')}
            onBlur={handleBlur}
            value={termFilter}
            onChange={(item) => setTermFilter(item.value)}
          />
        </View>
        
        <TouchableOpacity style={styles.filterButton} onPress={applyFilters}>
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
                  <Text style={styles.title}>Head Wise Report</Text>
                  <Text style={styles.date}>Date: 26-Feb-2024 to 26-Feb-2025</Text>

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
                      {filteredData.length > 0 ? (
                        filteredData.map((item, rowIndex) => (
                          <View key={rowIndex} style={styles.row}>
                            <Text style={styles.cell}>{item.userID}</Text>
                            <Text style={styles.cell}>{item.academicYear}</Text>
                            <Text style={styles.cell}>{item.term}</Text>
                            <Text style={styles.cell}>{item.amount}</Text>
                            <Text style={styles.cell}>{item.bank || "N/A"}</Text>
                            <Text style={styles.cell}>{item.paymentMethod}</Text>
                          </View>
                        ))
                      ) : (
                        <View style={styles.row}>
                          <Text style={[styles.cell, styles.noData, { width: tableWidth - 2 }]}>No data matches your filters</Text>
                        </View>
                      )}
                    </View>
                  )}

                  {/* Footer */}
\                </Animated.View>
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
    // backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop:100
  },
  dropdownContainer: {
    width: '40%',
  },
  dropdownLabel: {
    fontSize: 12,
    marginBottom: 4,
    fontWeight: 'bold',
    marginLeft:14
  },
 dropdown: {
      height: 50,
      width:"90%",
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor:'#daedff',
      marginBottom: 15,
      alignSelf: 'center'
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
   
  filterButton: {
    backgroundColor: '#58a8f9',
    paddingHorizontal: 20,
    position: 'relative',
    bottom:20,
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
  }
});

export default BalanceSheet;