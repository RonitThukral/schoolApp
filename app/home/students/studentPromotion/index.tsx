import { View, Text , StyleSheet,ScrollView,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import axios from 'axios';

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
  
  
  
  const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'


const index = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [toSelectedClass, setToSelectedClass] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [classes , setClasses] = useState([])
    const [filteredStudents , setFilteredStudents] = useState([])
    const [currentClass , setCurrentClass] = useState(null)
    const [nextClass , setNextClass] = useState(null)
    const [fromBus , setFromBus] = useState(null)
    const [toBus , setToBus] = useState(null)





    const fetchStudents = async () => {
      // setLoading(true)
      try {
        if(selectedClass){
        const response = await fetch(`${baseUrl}/students/class/${selectedClass}`);
        if (!response.ok) {
          throw new Error('Failed to fetch students');
        }
        const data = await response.json();
  // console.log(data)
        // Transform data to match the design format if needed
        const formattedData = data.users.map((student) => ({
          id: student._id,
          name: `${student.name} ${student.surname || ''}`.trim(),
          class: student.classID || 'N/A',
          userID : student.userID || 'N/A' 
        }));
        
        setFilteredStudents(formattedData);
        // setLoading(false)
      }
      } catch (error) {
        console.error(error.message);
        // setLoading(false)
  
      } 
    };
  



    const fetchClasses = async() => {

      try {
        const response = await axios.get(`${baseUrl}/classes`)
  //  console.log(classes, 'classed')
        const formatedData = response.data.map((cls) => ({
          label: cls.name,
          value: cls.classCode,
        }))

        setClasses(formatedData)


      } catch (error) {
        console.error('Error fetching classes:', error.message);
      }

    }



    useEffect(() => {
      fetchClasses();
      fetchStudents();
    },[])


    
    const handleFocus = (id:string) => {
        setIsFocus(id)
      }
  
      const handleBlur = () => {
        setIsFocus(null)
      }


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'white'}}>
        <Image style={{height:120,backgroundColor:'#daedff'}} source={require('../../../../assets/images/images/union.png')}/>

<ScrollView style={styles.container}   contentContainerStyle={{ paddingBottom: 50 }} // Add padding below the content
>
      <View >
        <Text style ={{fontSize:20,marginVertical:15}}>Promote Student to Another Class</Text>

        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
       
        />
        {selectedClass && <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={filteredStudents}
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
       
        />}

       {selectedClass && 
        <Dropdown
        style={[styles.dropdown,]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={classes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Search by Class'}
        searchPlaceholder="Search..."
        onFocus={() => handleFocus('class')}
        onBlur={handleBlur}
        value={toSelectedClass}
        onChange={(item) => setToSelectedClass(item.value)}
     
      />
        }
<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} >
            <Text  style={{color: '#58A8F9', fontSize:15}}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.promote} >
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Promote</Text>
          </TouchableOpacity>
          </View>

      </View>

      {/* Promote student to next class */}

      <View >
        <Text style ={{fontSize:20,marginVertical:15}}>Promote Student to Next Class</Text>

        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={currentClass}
          onChange={(item) => setCurrentClass(item.value)}
       
        />
      

       
        <Dropdown
        style={[styles.dropdown,]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={classes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Search by Class'}
        searchPlaceholder="Search..."
        onFocus={() => handleFocus('class')}
        onBlur={handleBlur}
        value={nextClass}
        onChange={(item) => setNextClass(item.value)}
     
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

{/* Promote student to Another campus */}

      <View >
        <Text style ={{fontSize:20,marginVertical:15}}>Promote Student to Another Campus</Text>

        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={currentClass}
          onChange={(item) => setCurrentClass(item.value)}
       
        />
      

       
        <Dropdown
        style={[styles.dropdown,]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={classes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Search by Class'}
        searchPlaceholder="Search..."
        onFocus={() => handleFocus('class')}
        onBlur={handleBlur}
        value={nextClass}
        onChange={(item) => setNextClass(item.value)}
     
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


      {/* Promote student to Another bus */}
      <View >
        <Text style ={{fontSize:20,marginVertical:15}}>Promote Student to Another Bus</Text>

        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={classes}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={fromBus}
          onChange={(item) => setFromBus(item.value)}
       
        />
      

       
        <Dropdown
        style={[styles.dropdown,]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={classes}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Search by Class'}
        searchPlaceholder="Search..."
        onFocus={() => handleFocus('class')}
        onBlur={handleBlur}
        value={toBus}
        onChange={(item) => setToBus(item.value)}
     
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

      </ScrollView>

    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
        backgroundColor: 'white',
        // backgroundColor: 'red',
        padding: 16,
        // position:'relative',
        // top:70,
        width:'100%',
        // height:500
        // marginBottom:10
        // marginTop:30
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