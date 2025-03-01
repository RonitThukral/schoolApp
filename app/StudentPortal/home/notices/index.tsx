import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,TextInput, Alert, SafeAreaView, Platform} from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { Dropdown } from 'react-native-element-dropdown';
import Entypo from '@expo/vector-icons/Entypo';
import { useRouter } from 'expo-router';
import axios from 'axios'; 
import { responsiveWidth } from 'react-native-responsive-dimensions';
import Constants from 'expo-constants';


  const baseUrl = Constants.expoConfig.extra.API_URL;




// let notices = [
//       {
//         "id": "1",
//         "title": "Important Exam Notice",
//         "description": "The final exams will begin from 20th December. Please check the timetable on the notice board.",
//         "createdBy": "Deepak Kumar",
//         "createdOn": "16 August 2024"
//       },
//       {
//         "id": "2",
//         "title": "Holiday Announcement",
//         "description": "The school will remain closed on 25th December for Christmas. Happy Holidays!",
//         "createdBy": "Deepak Kumar",
//         "createdOn": "16 August 2024"
//       },
//       {
//         "id": "3",
//         "title": "Parent-Teacher Meeting",
//         "description": "A meeting for parents is scheduled on 10th January. Details are available on the school portal.",
//         "createdBy": "Deepak Kumar",
//         "createdOn": "18 August 2024"
//       },
//       {
//         "id": "4",
//         "title": "Sports Day Event",
//         "description": "Annual Sports Day will be held on 15th January. All students are encouraged to participate.",
//         "createdBy": "Deepak Kumar",
//         "createdOn": "15 August 2024"
//       },
//       {
//         "id": "5",
//         "title": "Library Updates",
//         "description": "New books have been added to the library. Students can borrow them starting next week.",
//         "createdBy": "Deepak Kumar",
//         "createdOn": "17 August 2024"
//       }
//     ]


const DropdownComponent = () => {
  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [allNotices, setAllNotices] = useState([]);
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [date, setDate] = useState(dayjs());
  const [editId, setEditId] = useState('');


  // Fetch Notices
  const fetchNotices = async () => {
    try {
      const response = await axios.get(`${baseUrl}/notification`);
      const notices = response.data;

      // Format the fetched notices
      const formattedData = notices.map((notice) => ({
        id: notice._id,
        title: notice.title || 'N/A',
        description: notice.description || 'N/A',
        createdBy: notice.createdBy || 'N/A',
        date: dayjs(notice.date).format('DD-MM-YYYY') || 'N/A',
        
      }));
      setAllNotices(formattedData);
      setFilteredNotices(formattedData);
    } catch (error) {
      console.error('Error fetching notices:', error.message);
    }
  };

  // UseEffect to fetch notices on mount
  useEffect(() => {
    fetchNotices();
  }, []); // Empty dependency array ensures it runs only once

  // Handle Date Selection
  const handleDate = () => {
    setOpenCalendar(true);
  };

  const onDateChange = (params: any) => {
    const formattedDate = dayjs(params.date).format('DD-MM-YYYY');
    setCreatedAt(formattedDate);
    setOpenCalendar(false); // Close the calendar
  };

  // Search Button Logic
  const handleSearch = () => {
    const filtered = allNotices.filter((notice) => {
      return (
        (!selectedTitle || notice.title === selectedTitle) &&
        (!selectedDate || notice.date === selectedDate)
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
  


  // Add New Notice
  const handleAdd = async () => {
    try {

      const formattedDate = dayjs(createdAt, 'DD-MM-YYYY').toISOString();

      const newNotice = {
        title,
        description,
        createdBy,
        date: formattedDate,
      };

      // console.log('Adding notice with data:', newNotice);


      const response = await axios.post(`${baseUrl}/notification/create`, newNotice);
      // console.log('response ::  ', response)
      if (response.data.error) {
        Alert.alert('Error', 'Failed to add Notice');
        return;
      }

      Alert.alert('Success', 'Notice added successfully');
      fetchNotices(); // Refresh the notices list

    } catch (error) {
      console.error('Error adding notice:', error.message);
      Alert.alert('Error', 'Failed to add Noticess');
    } finally {
      // Clear input fields
      setTitle('');
      setDescription('');
      setCreatedBy('');
      setCreatedAt('');
      setSelectedDate(null);
      setIsOpen(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the backend
      const response = await axios.delete(`${baseUrl}/notification/delete/${id}`);
      
      // Debugging: Log the entire response object to ensure proper data structure
      // console.log('Delete response:', response);
  
      // Check if the response contains success status or any related flag
      if (response && response.status === 200 && response.data) {
        if (response.data._id === id) {
          // Successfully deleted, update the state
          Alert.alert('Success', 'Notice deleted successfully');
          fetchNotices(); // Refresh the list of notices
        } else {
          // Handle unexpected response format
          console.error('Unexpected response data:', response.data);
          Alert.alert('Error', 'Failed to delete notice');
        }
      } else {
        console.error('Error in response:', response.data || 'Unknown error');
        Alert.alert('Error', 'Failed to delete notice');
      }
    } catch (error) {
      // Handle errors gracefully
      console.error('Error deleting notice:', error.response?.data || error.message);
  
      // If the error is from the backend (status code not 200)
      if (error.response) {
        const backendErrorMessage = error.response?.data?.message || 'Unknown error from server';
        console.error('Backend Error:', backendErrorMessage);
        Alert.alert('Error', `Failed to delete notice. Reason: ${backendErrorMessage}`);
      } else {
        // If there is no response (likely a network issue)
        console.error('Network error:', error.message);
        Alert.alert('Error', 'Network error or server is down');
      }
    }
  };
  
  

  const handleEdit = (notice) => {
    setEdit(true)
    setTitle(notice.title)
    setCreatedAt(notice.date)
    setCreatedBy(notice.createdBy)
    setDescription(notice.description)
    setEditId(notice.id)
  
  }

 
  

  const handleSave = async () => {
    try {
      const formattedDate = dayjs(createdAt, 'DD-MM-YYYY').toISOString();
  
      const updatedNotice = {
        title,
        date: formattedDate,
        createdBy,
        description,
      };
  
      const response = await axios.put(`${baseUrl}/notification/update/${editId}`, updatedNotice);
  
      if (response.data.error) {
        Alert.alert('Error', 'Failed to update notice');
        return;
      }
  
      Alert.alert('Success', 'Notice updated successfully');
      fetchNotices(); // Refresh the list of notices after editing
  
      // Clear input fields and reset state
      setEdit(false);
      setTitle('');
      setDescription('');
      setCreatedBy('');
      setCreatedAt('');
      setEditId('');
      setIsOpen(false);
    } catch (error) {
      console.error('Failed updating the notice:', error.message);
      Alert.alert('Error', 'Failed to update the notice');
    }
  };
  


  // Handlers for Form Inputs
  const handleTitle = (text: string) => setTitle(text);
  const handleDescription = (text: string) => setDescription(text);
  const handleCreatedBy = (text: string) => setCreatedBy(text);

  const handlePlus = () => {
    setIsOpen(true)
  }
  const handleClose = () => {
    setIsOpen(false)
    setEdit(false)
    setTitle('')
    setCreatedBy('')
    setDescription('')
    setCreatedAt('')
  }

    return (
        <SafeAreaView style={{flex:1}}>
      <View style={styles.container}>
        {/* {renderLabel(value)} */}
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={allNotices.map((notice) => ({ label: notice.date, value: notice.date }))}
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
          data={allNotices.map((notice) => ({ label: notice.title, value: notice.title }))}
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
<ScrollView style={{paddingTop: 0, marginBottom: 0,backgroundColor:'white'}} contentContainerStyle={{paddingBottom:40}}>
{filteredNotices.map((notice, index) => {
const noticeDate = new Date(notice.date);
const formattedDate = noticeDate.toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});
  return (
    <View style={styles.list} key={index} >
      <Text style={{position:'relative', fontSize:18, left:20, color:'#58A8F9',marginTop:10,maxWidth:'98%'}}>{notice.title}</Text>
      <View style={{flex:1, flexDirection:'row'}}>

      <View style={styles.listContent}>
          <Text style={{fontSize:15,minWidth:"90%",maxWidth:'95%',color:'black',}}>
            {notice.description}
          </Text>
          <Text style={{fontSize:12,color:'grey',marginTop: 3}}>CreatedBy: {notice.createdBy}</Text>
          <Text style={{fontSize:12,color:'grey'}}>CreatedAt: {formattedDate}</Text>
          
      </View>
      <View style={styles.listBtns}>
                
                
            </View>
      </View>
    </View>
  )
})}
</ScrollView>



      </SafeAreaView>
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
      width: "85%",
      height: 150,
      maxHeight:150,
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
      paddingVertical:10,
    //   borderWidth: 0.5

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height:1 },
        shadowOpacity: 0.20,
        shadowRadius: 3.84,
        borderWidth:0.5,
        borderColor:'grey',
        
      },
      
    }),

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
        bottom:35
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
        zIndex:900000,
        elevation:5
// marginVertical:15
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
    

  });