import { View, Text , StyleSheet,TextInput,TouchableOpacity, Platform} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { router, useRouter } from 'expo-router';


const classes = [
    { id: "10-A", name: "10-A" },
    { id: "10-B", name: "10-B" },
    { id: "9-A", name: "9-A" },
    { id: "9-B", name: "9-B" },
  ];
  


const students = [
    { id: "Aryan-Sharma", name: "Aryan Sharma" },
    { id: "Riya-Gupta", name: "Riya Gupta" },
    { id: "Kabir-Mehta", name: "Kabir Mehta" },
    { id: "Neha-Roy", name: "Neha Roy" },
    { id: "Aman-Verma", name: "Aman Verma" },
    { id: "Sneha-Das", name: "Sneha Das" },
    { id: "Rahul-Yadav", name: "Rahul Yadav" },
    { id: "Anjali-Singh", name: "Anjali Singh" },
    { id: "Vikram-Rana", name: "Vikram Rana" },
  ];
  

const index = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);

    const router = useRouter()

    
    const handleFocus = (id:string) => {
        setIsFocus(id)
      }
  
      const handleBlur = () => {
        setIsFocus(null)
      }

      const handlePress = () => {
        router.back()
              }

  return (
    <View style={styles.container}>
      


      <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={students.map((course) => ({ label: course.name, value: course.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Teacher'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedStudent}
          onChange={(item) => setSelectedStudent(item.value)}
        />


<TextInput style={styles.areaInputResi} placeholder="Enter Message" placeholderTextColor={'grey'}
 numberOfLines={4} multiline textAlignVertical='top'/>


<View style ={styles.footer}>
          <TouchableOpacity style ={styles.search} onPress={handlePress}>
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Send</Text>
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
        ...Platform.select({
          ios: {
            position:'relative',
            top:responsiveHeight(3)
        },
          
        }),
        
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
      areaInputResi: {
        width: '90%',
        height: 180,
        backgroundColor: '#daedff',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
        // paddingBottom:70
      },
      footer :{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        position:'fixed',
        top:100
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
     
})

export default index