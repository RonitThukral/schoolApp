import React from "react";
import { View, Text, StyleSheet, ScrollView, ImageBackground } from "react-native";
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from "react";


const classes = [
    { id: 1, name: 'Class 1' },
    { id: 2, name: 'Class 2' },
    { id: 3, name: 'Class 3' },
    { id: 4, name: 'Class 4' },
    { id: 5, name: 'Class 5' }
  
  ]

  const periods= [
    { id: 1, name: 'Morning' },
    { id: 2, name: 'Afternoon' },
    { id: 3, name: 'Evening' }
  ]
  

export default function Attendance() {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedClass, setSelectedClass] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState(null);

  
  const handleFocus = (id:string) => {
    setIsFocus(id)
  }

  const handleBlur = () => {
    setIsFocus(null)
  }

  return (
    <ScrollView style={styles.container1}>
      
      <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes.map((c) => ({ label: c.name, value: c.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus('route')}
          onBlur={() => setIsFocus(null)}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
        />


      <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={periods.map((p) => ({ label: p.name, value: p.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus('route')}
          onBlur={() => setIsFocus(null)}
          value={selectedPeriod}
          onChange={(item) => setSelectedPeriod(item.value)}
        />
    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 40,
    
  },
  dropdown: {
    height: 50,
    width:"90%",
      borderWidth: 0.5,
    borderColor: '#58a8f9',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor:'transparent',
    marginBottom: 15,
    alignSelf: 'center'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 45,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
    paddingHorizontal: 15
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal:15
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});







