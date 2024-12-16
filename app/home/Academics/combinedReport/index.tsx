import { View, Text , StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import React from 'react'


const classOptions = [
   
    { "id": "1", "name": "Class 1" },
    { "id": "2", "name": "Class 2" },
    { "id": "3", "name": "Class 3" },
    { "id": "4", "name": "Class 4" },
    { "id": "5", "name": "Class 5" },
    { "id": "6", "name": "Class 6" },
    { "id": "7", "name": "Class 7" },
    { "id": "8", "name": "Class 8" },
    { "id": "9", "name": "Class 9" },
    { "id": "10", "name": "Class 10" }
  
  ];
  


const academicYearOptions= [
    { "id": "1", "name": "2022-2023" },
    { "id": "2", "name": "2023-2024" },
    { "id": "3", "name": "2024-2025" },
    { "id": "4", "name": "2025-2026" },
    { "id": "5", "name": "2026-2027" }
  ];
  
  const termOptions= [
    { "id": "1", "name": "Term 1" },
    { "id": "2", "name": "Term 2" },
    { "id": "3", "name": "Term 3" },
    { "id": "4", "name": "Term 4" }
  ]

const index = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [selectedTerm, setSelectedTerm] = useState(null);


    
    const handleFocus = (id:string) => {
        setIsFocus(id)
      }
  
      const handleBlur = () => {
        setIsFocus(null)
      }


  return (
    <View style={styles.container}>
      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classOptions.map((c) => ({ label: c.name, value: c.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
        />



      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={academicYearOptions.map((year) => ({ label: year.name, value: year.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Student'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedYear}
          onChange={(item) => setSelectedYear(item.value)}
        />
      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={termOptions.map((term) => ({ label: term.name, value: term.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Student'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedTerm}
          onChange={(item) => setSelectedTerm(item.value)}
        />




<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} >
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} >
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>
          </View>
          </View>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        paddingVertical:80,
        flex:1,
        
      },
      dropdown: {
        height: 50,
        width:"90%",
      //   borderColor: 'gray',
      //   borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor:'#EEF7FF',
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
        paddingHorizontal: 15

      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      
      footer :{
        // flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position:'fixed',
        top:25,
        borderBottomWidth:0.5,
        paddingBottom:15

      },
      search: {
        position:'relative',
        right:18,
        width: 110,
        height:35,
        borderRadius:15,
        backgroundColor: '#58A8F9',
        justifyContent: 'center',
      },
      reset: {
        backgroundColor:'transparent',
        width: 70,
        height: 35,
        justifyContent:'center',
        marginRight: 15
      },
     
})

export default index