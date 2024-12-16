import { View, Text , StyleSheet,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';

const dummyData = {
    classes: [
      { id: 1, name: "Class 1" },
      { id: 2, name: "Class 2" },
      { id: 3, name: "Class 3" },
      { id: 4, name: "Class 4" },
      { id: 5, name: "Class 5" },
    ],
    students: [
      { id: 101, name: "John Doe", currentClass: "Class 1" },
      { id: 102, name: "Jane Smith", currentClass: "Class 2" },
      { id: 103, name: "Sam Wilson", currentClass: "Class 3" },
      { id: 104, name: "Lisa Brown", currentClass: "Class 4" },
      { id: 105, name: "Tom Holland", currentClass: "Class 5" },
    ],
    
  };
  
  
  


const index = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);


    
    const handleFocus = (id:string) => {
        setIsFocus(id)
      }
  
      const handleBlur = () => {
        setIsFocus(null)
      }


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <Image source={require('../../../../assets/images/images/Vector.png')}/>

      <View style={styles.container}>
        <Text style ={{fontSize:20,marginVertical:15}}>Promote Student to Another Class</Text>

        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.classes}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'Select Student Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
       
        />
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.students}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'Select Student'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          value={selectedStudent}
          onChange={(item) => setSelectedStudent(item.value)}
       
        />
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.classes}
          search
          maxHeight={300}
          labelField="name"
          valueField="name"
          placeholder={'Move to Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
       
        />

<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} >
            <Text  style={{color: '#58A8F9', fontSize:15}}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.promote} >
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Promote</Text>
          </TouchableOpacity>
          </View>

      </View>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        position:'absolute',
        top:70,
        width:'100%'
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
      footer :{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        
      },

      promote: {
        position:'relative',
        right:18,
        width: 110,
        height:38,
        borderRadius:15,
        backgroundColor: '#58A8F9',
        justifyContent: 'center',
      },
      reset: {
        backgroundColor:'transparent',
        width: 70,
        height: 38,
        justifyContent:'center',
        marginRight: 15
      },
})

export default index