import React, { useEffect, useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,TextInput, SafeAreaView, Modal} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';  
  import Entypo from '@expo/vector-icons/Entypo';
import { Alert } from 'react-native';
import axios from 'axios'; // Assuming axios is installed
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { BlurView } from 'expo-blur';


const baseUrl = "https://dreamscloudtechbackend.onrender.com/api"; // Base API URL






  

  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedName, setSelectedName] = useState(null);
    const [ divisions , setDivisions] = useState([])
    const [filteredDivisions, setfilteredDivisions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editId, setEditId] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // const router = useRouter();


    const fetchDivisions= async() => {
      const res = await axios.get(`${baseUrl}/divisions`);
// console.log(res.data)
      const formattedData = res.data.map((div) => ({
        id: div._id,
        name: div.name || 'N/A',
        description: div.description || 'N/A'
      }))

      // console.log(formattedData)
      setDivisions(formattedData)
      setfilteredDivisions(formattedData)
    }



    useEffect(() => {
      fetchDivisions()
    },[])

   // Search Button Logic
  const handleSearch = () => {
    const filtered = divisions.filter((division) => {
      return (

        (!selectedName || division.name === selectedName) 
        
      );
    });
    setfilteredDivisions(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedName(null);
    setfilteredDivisions(divisions);
  };


    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }


     
    const handleDelete = async (id) => {
      try {
        // Make the delete request
        const res = await axios.delete(`${baseUrl}/divisions/delete/${id}`);
        
        // Check response and handle errors
        if (res.data.error) {
          Alert.alert("Error", "Failed to delete division. Please try again.");
        } else {
          Alert.alert("Success", "Division deleted successfully.");
          fetchDivisions()
        }
      } catch (error) {
        // Handle request errors
        console.error("Error deleting division:", error);
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    };

    const handleAdd = async () => {
      try {
        // Prepare the new division data
        const newDiv = {
          name,
          description,
        };
    
        // Make the POST request to create a new division
        const res = await axios.post(`${baseUrl}/divisions/create`, newDiv);
    
        // Handle the response
        if (res.data.error) {
          // Show an error alert if the API response indicates a failure
          Alert.alert("Error", "Failed to add the division. Please try again.");
        } else {
          // Show a success message
          Alert.alert("Success", "Division added successfully.");
          fetchDivisions()
          setIsOpen(false)
          setName('');
          setDescription('');
    
          
        }
      } catch (error) {
        // Handle request errors
        console.error("Error adding division:", error);
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    };

    const handleEdit = (div) => {
      setEdit(true)
      setEditId(div.id)
      setName(div.name)
      setDescription(div.description)
    }

    const handleSave = async () => {
      try {
        // Prepare the updated division data
        const updatedDiv = {
          name,
          description,
        };
    
        // Make the PUT request to update the division
        const res = await axios.put(`${baseUrl}/divisions/update/${editId}`, updatedDiv);
    
        // Handle the response
        if (res.data.error) {
          // Show an error alert if the API response indicates a failure
          Alert.alert("Error", "Failed to update the division. Please try again.");
        } else {
          // Show a success message
          Alert.alert("Success", "Division updated successfully.");
    fetchDivisions()
         
          setName('');
          setDescription('');
          setEditId(null);
          setEdit(false)
    
          
        }
      } catch (error) {
        // Handle request errors
        console.error("Error updating division:", error);
        Alert.alert("Error", "Something went wrong. Please try again later.");
      }
    };
    
    

    const handlePlus = () => {
      setIsOpen(true)
    }

    const handleTitle = (text: string) => setName(text);
  const handleDescription = (text: string) => setDescription(text);


  const handleClose = () => {
    setIsOpen(false)
    setEdit(false)
    setName('')
   setDescription('')
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
          data={divisions.map((division) => ({ label: division.name, value: division.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Name'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedName}
          onChange={(item) => setSelectedName(item.value)}
       
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
<ScrollView style={{paddingTop: 20, marginBottom: 0,backgroundColor:'white'}} contentContainerStyle={{paddingBottom: 50}}>
{filteredDivisions?.map((div, index) => {
  return (
    <View style={styles.list} key={index} >
      <Text style={{position:'relative', fontSize:18, left:30, color:'#58A8F9',marginTop:10}}>{div.name}</Text>
      <View style={{flex:1, flexDirection:'row'}}>

      <View style={styles.listContent}>
        <View style={{width:'80%'}}>

          <Text style={{fontSize:13,color:'grey'}}>
            {div.description}
          </Text>
        </View>
          <Text style={{fontSize:13,color:'grey'}}>{div.date}</Text>
          
      </View>
      <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center',marginBottom:5}} onPress={() => {handleEdit(div)}}>
                <Image source={require('../../../../assets/images/images/edit.png')}/>

                </TouchableOpacity>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} onPress={() => {handleDelete(div.id)}}>
                <Image source={require('../../../../assets/images/images/delete.png')}/>

                </TouchableOpacity>
            </View>
      </View>
    </View>
  )
})}
</ScrollView>




{!isOpen && <TouchableOpacity style={{width:80, height:80, backgroundColor:'#58A8F9', zIndex:90000, position:'absolute', borderRadius:100, bottom:100, justifyContent:'center',alignSelf:'flex-end',right:40,alignItems:'center'}} onPress={handlePlus}>
      <Entypo name="plus" size={40} color="white" />
      </TouchableOpacity>}


 <Modal
        animationType="slide"
        transparent={true}
        visible={(isOpen || edit)}
        onRequestClose={() => setIsOpen(false)}
        >
        
        <BlurView intensity={50} tint="dark" style={styles.modalOverlay}>
        



{(isOpen || edit) && <View style={styles.inputContainer}>
        <Text style={{fontSize:20,position:'relative',alignSelf:'flex-start',paddingHorizontal:25,paddingVertical:15}}>{edit ? 'Edit Notice' : 'Add Notice'}</Text>

    <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={edit ? "Edit Name" : "Add Name"} onChangeText={handleTitle} value={name}/>

    <TextInput style={styles.inputDesc} placeholderTextColor={'grey'} placeholder={edit ? "Edit Description" : "Add Description"} multiline = {true} textAlignVertical='top'  onChangeText={handleDescription} value={description}/>
  


    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:10}}>

    <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
    <Text style={{color:'#58A8F9',fontSize:16}}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttons} >
    <Text style={{color:'white',fontSize:16, textAlign:'center'}} 
    onPress={edit ? handleSave : handleAdd}
    >{edit ? 'Save' : 'Add'}</Text>
    </TouchableOpacity>
    </View>
    </View>}

    </BlurView>


    </Modal>


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
      height: 105,
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
      left:30,
      marginBottom:15,
    //   marginTop:,

    },
    
      multiLine : {
        flexWrap:'wrap',
        // width:'70%',
        // marginTop:10,
        fontSize:12,
        color:'grey'
      },
      listBtns:{
        position:'absolute',
        right:responsiveWidth(3),
        bottom:10
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
        height:290,
        backgroundColor:'white',
        // backgroundColor:'red',
        borderRadius:10,
        justifyContent:'center',
        alignSelf:'center',
        top:'30%',
        flexDirection:'column',
        zIndex:900000,
// marginVertical:15
elevation:5
      },
      buttons:{
        width:80,
        height:30,
        backgroundColor: '#58A8F9',
        position:'relative',
        bottom:13,
        right:35,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
          },
    
        closeBtn:{
        position:'relative',
        bottom:15,
        right:responsiveWidth(15),
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',

          },

          modalOverlay: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)", // This sets the dim background overlay
            justifyContent: "center",
            alignItems: "center",
          },
    
    

  });