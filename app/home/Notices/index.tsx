import React, { useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,TextInput} from 'react-native';
  import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
  import { Dropdown } from 'react-native-element-dropdown';
  import Entypo from '@expo/vector-icons/Entypo';
  import { useRouter } from 'expo-router';



let notices = [
      {
        "id": "1",
        "title": "Important Exam Notice",
        "description": "The final exams will begin from 20th December. Please check the timetable on the notice board.",
        "createdBy": "Deepak Kumar",
        "createdOn": "16 August 2024"
      },
      {
        "id": "2",
        "title": "Holiday Announcement",
        "description": "The school will remain closed on 25th December for Christmas. Happy Holidays!",
        "createdBy": "Deepak Kumar",
        "createdOn": "16 August 2024"
      },
      {
        "id": "3",
        "title": "Parent-Teacher Meeting",
        "description": "A meeting for parents is scheduled on 10th January. Details are available on the school portal.",
        "createdBy": "Deepak Kumar",
        "createdOn": "18 August 2024"
      },
      {
        "id": "4",
        "title": "Sports Day Event",
        "description": "Annual Sports Day will be held on 15th January. All students are encouraged to participate.",
        "createdBy": "Deepak Kumar",
        "createdOn": "15 August 2024"
      },
      {
        "id": "5",
        "title": "Library Updates",
        "description": "New books have been added to the library. Students can borrow them starting next week.",
        "createdBy": "Deepak Kumar",
        "createdOn": "17 August 2024"
      }
    ]


  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [allNotices, setAllNotices] = useState([...notices])
    const [filteredNotices, setFilteredNotices] = useState(allNotices);
    const[title,setTitle] = useState('')
    const[description,setDescription] = useState('')
    const[createdBy,setCreatedBy] = useState('')
    const [isOpen, setIsOpen] = useState(false)
    const [edit, setEdit] = useState(false)

    const [openCalendar, setOpenCalendar] = useState(false);
    const [date, setDate] = useState(dayjs());

  const [dob, setDob] = useState('');
//   const [activeField, setActiveField] = useState(''); // To track which date field is active

    const router = useRouter();


    const handleDate = () => {
        // setActiveField(field)
        setOpenCalendar(true);
      };

      const onDateChange = (params: any) => {
        const selectedDate = dayjs(params.date).format('DD-MM-YYYY'); // Format the date
        // if (activeField === 'dob') {
          setDob(selectedDate);
        // } else if (activeField === 'doa') {
        //   setDoa(selectedDate);
        // }
        setOpenCalendar(false); // Close the calendar
      };

   // Search Button Logic
  const handleSearch = () => {
    const filtered = allNotices.filter((notice) => {
      return (
        (!selectedTitle || notice.title === selectedTitle) &&
        (!selectedDate || notice.createdOn === selectedDate) 
        // (!selectedTitle || notice.title === selectedTitle) &&
    //   (!selectedDate || dayjs(notice.createdOn).format('DD-MM-YYYY') === selectedDate) // Use dayjs to format the createdOn date
      );
    });
    setFilteredNotices(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedDate(null);
    setSelectedTitle(null);
    setFilteredNotices(allNotices);
  };


    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    const handlePress = () => {
      router.navigate('/')
    }

    const handlePlus = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false),
        setEdit(false)
    }

    const handleAdd = () => {
        const newNotice = {
            id: Math.random().toString(),
            title: title,
            description: description,
            createdBy: createdBy,
            createdOn: dob
        };
    
        const updatedNotices = [...allNotices, newNotice];
        setAllNotices(updatedNotices);
        setFilteredNotices(updatedNotices); // Update the filtered notices as well
        
        // Clear input fields
        setDob('');
        setTitle('');
        setDescription('');
        setCreatedBy('');
        setIsOpen(false);
    };
    

    const handleTitle = (text) => {
        setTitle(text)
    }    
    const handleDescription = (text) => {
        setDescription(text)
    }    
    const handleCreatedBy = (text) => {
        setCreatedBy(text)
    }    
   

    return (
        <>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={notices.map((notice) => ({ label: notice.createdOn, value: notice.createdOn }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Date'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedDate}
          onChange={(item) => setSelectedDate(item.value)}
       
        />
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={notices.map((notice) => ({ label: notice.title, value: notice.title }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Title'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedTitle}
          onChange={(item) => setSelectedTitle(item.value)}
       
        />

          <View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} onPress={handleSearch}>
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>
          </View>
          
      </View>


{/* List of students section */}
<ScrollView style={{marginTop: 20, marginBottom: 0}}>
{filteredNotices.map((notice, index) => {
  return (
    <View style={styles.list} key={index} >
      <Text style={{position:'relative', fontSize:18, left:20, color:'#58A8F9',marginTop:10}}>{notice.title}</Text>
      <View style={{flex:1, flexDirection:'row'}}>

      <View style={styles.listContent}>
          <Text style={{fontSize:12,width:"45%",color:'black'}}>
            {notice.description}
          </Text>
          <Text style={{fontSize:11,color:'grey',marginTop: 3}}>{notice.createdBy}</Text>
          <Text style={{fontSize:11,color:'grey'}}>{notice.createdOn}</Text>
          
      </View>
      <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center',marginBottom:5}} >
                <Image source={require('../../../assets/images/images/edit.png')} style={{width:18,height:18}}/>

                </TouchableOpacity>
                
            </View>
      </View>
    </View>
  )
})}
</ScrollView>

<TouchableOpacity style={{width:80, height:80, backgroundColor:'#58A8F9', zIndex:90000, position:'absolute', borderRadius:100, bottom:100, justifyContent:'center',alignSelf:'flex-end',right:40,alignItems:'center'}} onPress={handlePlus}>
      <Entypo name="plus" size={40} color="white" />
      </TouchableOpacity>


{isOpen && <View style={styles.inputContainer}>
        <Text style={{fontSize:20,position:'relative',alignSelf:'flex-start',paddingHorizontal:25,paddingVertical:15}}>{'Add Notice'}</Text>

    <TextInput style={styles.input} placeholder={"Add Title"} onChangeText={handleTitle} value={title}/>

    <TextInput style={styles.inputDesc} placeholder={"Add Description"} multiline = {true} textAlignVertical='top'  onChangeText={handleDescription} value={description}/>

    {openCalendar && (
            <View style={styles.calendarContainer}>
              <DateTimePicker
                mode="single"
                date={date.toDate()} // Pass date as a JavaScript Date object
                onChange={onDateChange} // Handle date selection
              />
            </View>
          )}


    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            <TextInput
              style={styles.dateInput}
              placeholder="Date of Birth"
              value={dob} // Display the formatted date
              editable={false} // Read-only input
            />
            <TouchableOpacity style={{ position: 'absolute', left: '80%', top: '25%' }} onPress={handleDate}>
              <Image source={require('../../../assets/images/images/Frame.png')} />
            </TouchableOpacity>
          </View>

          <TextInput style={styles.input} placeholder={"Created By"} onChangeText={handleCreatedBy} value={createdBy} />



    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:10}}>

    <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
    <Text style={{color:'#58A8F9',fontSize:16}}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttons} >
    <Text style={{color:'white',fontSize:16, textAlign:'center'}} onPress={handleAdd}>Add</Text>
    </TouchableOpacity>
    </View>
    </View>}

      </>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 16,
      paddingVertical:60
      
    },
    calendarContainer: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        // backgroundColor: 'blue',
        width: '80%',
        height: 350,
        alignSelf: 'center',
        borderRadius: 15,
        zIndex: 1000,
        position:'absolute',
        bottom:"37%",
        paddingVertical:15
      },
      dateInput: {
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'green',
        width: '80%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 25,
        marginBottom:10
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
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      
    },
    search: {
      position:'relative',
      right:18,
      width: 130,
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
    list:{
      width: "80%",
      height: 130,
      borderColor: 'grey',
      borderRadius: 10,
      // backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'column',
    //   alignItems:'center',
      alignSelf:'center',
      marginTop: 20,
      elevation:5,
    //   borderWidth: 0.5
    },
   
    listContent:{
      flexDirection:'column',
      position: 'relative',
      left:20,
      marginBottom:15,
    //   width:"100%",

    },
    
      listBtns:{
        position:'absolute',
        right:25,
        bottom:85
      },

      input: {
        width: '80%',
        height: 45,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        // marginBottom: 10,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
      },
      inputDesc:{
        width: '80%',
        height: 100,
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
        height:400,
        backgroundColor:'white',
        // backgroundColor:'red',
        borderRadius:10,
        justifyContent:'center',
        alignSelf:'center',
        top:'30%',
        flexDirection:'column',
        zIndex:900000
// marginVertical:15
      },
      buttons:{
        width:80,
        height:30,
        backgroundColor: '#58A8F9',
        position:'absolute',
        bottom:13,
        right:25,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
          },
    
        closeBtn:{
        position:'absolute',
        bottom:15,
        left:150,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
          }
    

  });