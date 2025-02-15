import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Image, Alert, SafeAreaView,ScrollView, Platform, Modal } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Dropdown } from 'react-native-element-dropdown';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const students = [
    { id: 'BK202408', name: 'Deepak Kumar', isSelected: true, class: '10A',"academicYear": "2024-2025",
      "term": "Term 1" },
    { id: 'BK202409', name: 'Rohan Sharma', isSelected: false, class: '10B',"academicYear": "2024-2025",
      "term": "Term 2" },
    { id: 'BK202401', name: 'Ruchi Sharma', isSelected: false, class: '9A',"academicYear": "2024-2025",
      "term": "Term 1" },
    { id: 'BK202404', name: 'Ankita Gaur', isSelected: false, class: '9A',"academicYear": "2024-2025",
      "term": "Term 1" },
    { id: 'BK202405', name: 'Jack Brown', isSelected: false, class: '9A',"academicYear": "2024-2025",
      "term": "Term 1" },
    { id: 'BK202407', name: 'Gopal Chand', isSelected: false, class: '9A',"academicYear": "2024-2025",
      "term": "Term 1" },
    { id: 'BK202406', name: 'Emily Jones', isSelected: false, class: '9A',"academicYear": "2024-2025",
      "term": "Term 1" },
  ]

const Reminder = () => {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [description, setDescription] = useState("Dear parent, please be reminded that your ward {student_name} owes an amount of {amount_owed}. Please pay as soon as possible.");
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [filteredStudents, setFilteredStudents] = useState(students)

  const selectStudent = (id) => {
    const updatedStudents = filteredStudents.map((student) =>
      student.id === id ? { ...student, isSelected: !student.isSelected } : student
    );
    setFilteredStudents(updatedStudents);
  };

  const handleSearch = () => {
    const filtered = students.filter((student) => {
      return (
        (!selectedYear || student.academicYear === selectedYear) &&
        (!selectedClass || student.class === selectedClass) &&
        (!selectedTerm || student.term === selectedTerm)
      );
    });
    setFilteredStudents(filtered);
  };

  const handleReset = () => {
    setFilteredStudents(students)
    setSelectedClass('')
    setSelectedYear('')
    setSelectedTerm('')
  }


  const handlePlus = () => {
    setIsOpen(true)
  }

  // const handleTitle = (text: string) => setName(text);
const handleDescription = (text: string) => setDescription(text);


const handleClose = () => {
  setIsOpen(false)
  setEdit(false)
  // setName('')
 setDescription("Dear parent, please be reminded that your ward {student_name} owes an amount of {amount_owed}. Please pay as soon as possible.")
}
const handleSend = () => {
  setIsOpen(false)
}
  


  return (
    <SafeAreaView style={styles.container}>
      <View style={{height:responsiveHeight(38)}}>
<View style={{marginTop:50}}>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={students.map((student) => ({ label: student.academicYear, value: student.academicYear }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Academic Year'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus('route')}
          onBlur={() => setIsFocus(null)}
          value={selectedYear}
          onChange={(item) => setSelectedYear(item.value)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={students.map((student) => ({ label: student.term, value: student.term }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Select Term'}
          searchPlaceholder="Search..."
          onFocus={() => setIsFocus('route')}
          onBlur={() => setIsFocus(null)}
          value={selectedTerm}
          onChange={(item) => setSelectedTerm(item.value)}
        />
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={students.map((student) => ({ label: student.class, value: student.class }))}
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

       

        <View style={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text style={{ color: '#58A8F9' }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.search} onPress={handleSearch}>
            <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, paddingHorizontal: 10 }}>
              Search
            </Text>
          </TouchableOpacity>
        </View>
</View>
      </View>

      <FlatList
        data={filteredStudents}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={{ paddingBottom: 20,paddingTop:20}} // Adds spacing at the bottom for better scrolling
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.studentCard} onPress={() => selectStudent(item.id)} >
            <Image source={require('../../../assets/images/images/boy.png')} style={styles.img} />
            <View style={{ flexDirection: 'column', position: 'absolute', left: '30%' }}>
              <Text style={styles.studentTextid}>{item.id}</Text>
              <Text style={styles.studentText}>{item.name}</Text>
            </View>

            {item.isSelected === false && <Image source={require('../../../assets/images/images/box.png')} style={{position:'relative',
                right:8
            }}/>}
            {item.isSelected === true && <Image source={require('../../../assets/images/images/check.png')} />}
          </TouchableOpacity>
        )}
      />

      {!isOpen && <TouchableOpacity style={styles.submitButton} onPress={handlePlus} >
        <Text style={styles.submitButtonText}>Proceed</Text>
      </TouchableOpacity>}



 <Modal
        animationType="slide"
        transparent={true}
        visible={(isOpen || edit)}
        onRequestClose={() => setIsOpen(false)}
        >
        
        <BlurView intensity={50} tint="dark" style={styles.modalOverlay}>
        




      {(isOpen || edit) && <View style={styles.inputContainer}>
        <Text style={{fontSize:20,position:'relative',alignSelf:'flex-start',paddingHorizontal:25,paddingVertical:15}}>{'Edit Message'}</Text>

    {/* <TextInput style={styles.input} placeholder={edit ? "Edit Name" : "Add Name"} onChangeText={handleTitle} value={name}/> */}

    <TextInput style={styles.inputDesc} placeholderTextColor={'grey'} placeholder={"Edit Message" } multiline = {true} textAlignVertical='top'  onChangeText={handleDescription} value={description}/>
  


    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:10}}>

    <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
    <Text style={{color:'#58A8F9',fontSize:16}}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttons} >
    <Text style={{color:'white',fontSize:16, textAlign:'center'}} 
    onPress={handleSend}
    >Send</Text>
    </TouchableOpacity>
    </View>
    </View>}

</BlurView>


</Modal>


    </SafeAreaView>




  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: 'white' },
  calendar: {
     borderRadius: 15, 
     marginTop: 50 ,
     height:'85%',
     width:'95%',
     alignSelf:'center',
    //  backgroundColor:'red',
    
     elevation:4
    },
  searchBar: {
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 20,
    height: 50,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: '#daedff',

  },
  studentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '90%',
    alignSelf: 'center',
    height: 75,
  },
  studentTextid: { fontSize: 18, color: '#007bff' },
  studentText: { fontSize: 14 },
  submitButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width:'90%',
    alignSelf:'center',
    ...Platform.select({
      ios:{
        width:'90%',
        alignSelf:'center'
      }
    })
  },
  submitButtonText: { color: '#fff', fontSize: 18 },
  dayContainer: {
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'green',
    height:35,
    width:35
  },
  dayText: { fontSize: 12, textAlign: 'center', color: '#000' },
  sundayText: { color: 'red' },
  selectedDay: { backgroundColor: '#d3e5ff', borderRadius: 5 },
  disabledDayText: { color: 'gray' },
  img: {
    marginHorizontal: 20,
    width: 42,
    height: 42,
  },
  list: {
    flexGrow: 1,
    height:responsiveHeight(80),
    // backgroundColor:'red'
  },
  dropdown: {
    height: 50,
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#daedff',
    marginBottom: 15,
    alignSelf: 'center',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
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
  footer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    // zIndex: 100000,
    position:'relative',
    right:20,
    top:responsiveHeight(0.7),
    // bottom:responsiveHeight(4),
  },
  search: {
    width: 110,
    height: 35,
    borderRadius: 15,
    backgroundColor: '#58A8F9',
    justifyContent: 'center',
  },
  reset: {
    backgroundColor: 'transparent',
    width: 70,
    height: 35,
    justifyContent: 'center',
    marginRight: 15,
  },
  // input: {
  //   width: '80%',
  //   height: 45,
  //   backgroundColor: '#DAEDFF',
  //   // backgroundColor: 'red',
  //   // marginBottom: 10,
  //   borderRadius: 10,
  //   alignSelf: 'center',
  //   paddingHorizontal: 25,
  // },
  inputDesc:{
    width: '80%',
    height: 130,
    backgroundColor: '#DAEDFF',
    // backgroundColor: 'red',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  inputContainer:{
    position:'absolute',
    width:'85%',
    height:270,
    backgroundColor:'white',
    // backgroundColor:'red',
    borderRadius:10,
    justifyContent:'center',
    alignSelf:'center',
    top:'30%',
    flexDirection:'column',
    zIndex:900000,
    elevation:5
  },
  buttons: { 
    width: 100, 
    height: 38, 
    backgroundColor: '#58A8F9', 
    position: 'relative', 
    right: 25,
    borderRadius: 20, 
    justifyContent: 'center', 
    alignSelf: 'flex-end' 
  },
  closeBtn: { 
    position: 'relative', 
    bottom: 5, 
    right: responsiveWidth(14), 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignSelf: 'flex-end'
   },

   modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // This sets the dim background overlay
    justifyContent: "center",
    alignItems: "center",
  },

});

export default Reminder;
