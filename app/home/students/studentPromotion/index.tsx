import { View, Text , StyleSheet,ScrollView,SafeAreaView,Image,TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useState } from 'react';
import axios from 'axios';

  
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
    const [currentCampus , setCurrentCampus] = useState(null)
    const [Campuses , setCampuses] = useState([])
    const [nextCampus , setNextCampus] = useState(null)
    const [buses , setBuses] = useState([])
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
  console.log(data)
        // Transform data to match the design format if needed
        const formattedData = data.users.map((student) => ({
          // id: student._id,
          label: `${student.name} ${student.surname || ''}`.trim(),
          // class: student.classID || 'N/A',
          value : student.userID || 'N/A' 
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


    const fetchCampuses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/campuses`);
        const formattedData = response.data.map((camp) => ({
          label: camp.name,
          value: camp.name
        }))
        setCampuses(formattedData);
      } catch (error) {
        console.error("Error fetching campuses:", error);
      } finally {
        // setLoading(false);
      }
    };


    const fetchBuses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/dormitories`);
        const formattedData = response.data.map((bus) => ({
          label: bus.name,
          value: bus.name
        }))
        setBuses(formattedData);
      } catch (error) {
        console.error("Error fetching campuses:", error);
      } finally {
        // setLoading(false);
      }
    };



    useEffect(() => {
      fetchClasses();
      fetchStudents();
      fetchCampuses();
      fetchBuses();
    },[selectedClass])


    
    const handleFocus = (id:string) => {
        setIsFocus(id)
      }
  
      const handleBlur = () => {
        setIsFocus(null)
      }


      const resetSelections = () => {
        setSelectedClass(null);
        setToSelectedClass(null);
        setSelectedStudent(null);
        setCurrentClass(null);
        setNextClass(null);
        setCurrentCampus(null);
        setNextCampus(null);
        setFromBus(null);
        setToBus(null);
        setFilteredStudents([])
    };
    


      const handlePromoteToClass = async () => {
        if (!selectedStudent || !toSelectedClass) {
          return alert("Please select both a student and a class.");
        }
      
        try {
          // setLoading(true);
          const res = await axios.put(`${baseUrl}/students/update/${selectedStudent}`, { classID: toSelectedClass });
      
          // setLoading(false);
          if (res.data.error) {
            return alert(res.data.error);
          }
      
          alert("Student promoted successfully!");
          fetchStudents(); // Refresh students list after promotion
        } catch (error) {
          // setLoading(false);
          console.error("Error promoting student:", error);
          alert("Failed to promote student.");
        }
      };


      const handleNextClass = async () => {
        if (!currentClass || !nextClass) {
          return alert('Please select both current and next class.');
        }
        try {
          const res = await axios.post(`${baseUrl}/students/upgrade/class`, { currentclass: currentClass, nextclass: nextClass });
          if (res.data.error) {
            return alert(res.data.error);
          }
          alert('Students promoted to the next class successfully!');
          fetchStudents();
        } catch (error) {
          console.error('Error promoting students:', error);
          alert('Failed to promote students.');
        }
      };
  
      const handleCampus = async () => {
        if (!currentCampus || !nextCampus) {
          return alert("Please select both current and next campus.");
        }
      
        try {
          // setLoading(true);
          const res = await axios.post(`${baseUrl}/students/upgrade/campus`, {
            currentcampus: currentCampus,
            nextcampus: nextCampus,
          });
      
          // setLoading(false);
      
          if (res.data.error) {
            return alert(res.data.error);
          }
      
          alert("Students promoted to the next campus successfully!");
          fetchStudents(); // Refresh student list if needed
        } catch (error) {
          // setLoading(false);
          console.error("Error promoting students:", error);
          alert("Failed to promote students.");
        }
      };

      const handleBus = async () => {
        if (!fromBus || !toBus) {
            return alert("Please select both the current and next bus.");
        }
      
        try {
            const res = await axios.post(`${baseUrl}/students/upgrade/dormitories`, {
              currentdormitories: fromBus,
              nextdormitories: toBus,
            });
          
            if (res.data.error) {
                return alert(res.data.error);
            }
          
            alert("Students promoted to the next bus successfully!");
            fetchStudents(); // Refresh student list if needed
        } catch (error) {
            console.error("Error promoting students:", error);
            alert("Failed to promote students.");
        }
    };
    
      
  

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
          placeholder={'Select'}
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
          labelField="label"
          valueField="value"
          placeholder={'Select'}
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
        placeholder={'Select'}
        searchPlaceholder="Search..."
        onFocus={() => handleFocus('class')}
        onBlur={handleBlur}
        value={toSelectedClass}
        onChange={(item) => setToSelectedClass(item.value)}
     
      />
        }
<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={resetSelections}>
            <Text  style={{color: '#58A8F9', fontSize:15}}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.promote} onPress={handlePromoteToClass}>
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
          placeholder={'Select'}
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
        placeholder={'Select'}
        searchPlaceholder="Search..."
        onFocus={() => handleFocus('class')}
        onBlur={handleBlur}
        value={nextClass}
        onChange={(item) => setNextClass(item.value)}
     
      />
        
<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} >
            <Text  style={{color: '#58A8F9', fontSize:15}} onPress={resetSelections}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.promote} onPress={handleNextClass}>
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
          data={Campuses}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={currentCampus}
          onChange={(item) => setCurrentCampus(item.value)}
       
        />
      

       
        <Dropdown
        style={[styles.dropdown,]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={Campuses}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select'}
        searchPlaceholder="Search..."
        onFocus={() => handleFocus('class')}
        onBlur={handleBlur}
        value={nextCampus}
        onChange={(item) => setNextCampus(item.value)}
     
      />
        
<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={resetSelections}>
            <Text  style={{color: '#58A8F9', fontSize:15}}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.promote}onPress={handleCampus} >
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
          data={buses}
          search
          dropdownPosition='top'
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select'}
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
        data={buses}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select'}
        searchPlaceholder="Search..."
        onFocus={() => handleFocus('class')}
        onBlur={handleBlur}
        value={toBus}
        onChange={(item) => setToBus(item.value)}
     
      />
        
<View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={resetSelections}>
            <Text  style={{color: '#58A8F9', fontSize:15}}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.promote} onPress={handleBus}>
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