// import React, { useEffect, useState } from 'react';
//   import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,TextInput, SafeAreaView} from 'react-native';
//   import Entypo from '@expo/vector-icons/Entypo';
//   import axios from 'axios';
// import { responsiveWidth } from 'react-native-responsive-dimensions';

// const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'

  
// const feeData = [
//   {
//     "role": "Senior Teacher",
//     "total": "₹ 82,000",
//     "details": {
//       "Salary": "₹ 70,000",
//       "Allowance": "₹ 10,000",
//       "Bonus": "₹ 2,000"
//     }
//   },
//   {
//     "role": "Teacher",
//     "total": "₹ 56,000",
//     "details": {
//       "Salary": "₹ 50,000",
//       "Allowance": "₹ 5,000",
//       "Bonus": "₹ 1,000"
//     }
//   }
// ];





//   const DropdownComponent = () => {
//   const [feeData, setFeeData] = useState([])
//   const [isOpen, setIsOpen] = useState(false);
//   const [edit, setEdit] = useState(false);
//   const [salary, setSalary] = useState(null);
//   const [allow, setAllow] = useState(null);
//   const [bonus, setBonus] = useState(null);
//   const [name, setName] = useState(null);

//   const fetchPayrow = async() => {
//     try {
//       const response = await axios.get(`${baseUrl}/payrow`)
//       setFeeData(response.data)
//     } catch (error) {
      
//       console.error(error.message);

//     }
//   }


//   useEffect(() => {
//     fetchPayrow();
//   },[])


//   const handleAdd = () => {
//     setIsOpen(true)
//   }
//   const handleEdit = () => {
//     setEdit(true)
//   }

//  const handleAddPayrow = () => {
  
//  }
//  const saveEdit = () => {

//  }
//  const handleDelte = () => {

//  }

 


//       const InfoRow = ({ label, value}:any) => (
//         <View style={styles.infoRow}>
//           <Text style={styles.label}>{label}</Text>
//           <View style={{width:'70%', left:20 }}>
    
//           <Text style={styles.value}>{value}</Text>
//           </View>
//         </View>
//       );
    
//       const Section = ({ id,title,title2, children }:any):any => {
//           // const isExpanded = expandedSectionId === id
//         return(
//         <View style={styles.section}>
//           <TouchableOpacity 
//             style={styles.sectionHeader} 
//             activeOpacity={0.7}
//           >
           
//             <View style={{flex:1, flexDirection:'row',justifyContent:'space-between'}}>

//             <Text style={styles.sectionTitle}>{title}</Text>
//             <Text style={styles.sectionTitle2}>{title2}</Text>
//             </View>
            
//           </TouchableOpacity>
         
//             <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
//             <View style={styles.sectionContent}>
//               {children}
//             </View>
//             <View style={styles.listBtns}>
//                 <TouchableOpacity style={{ width:30,height:30,justifyContent:'center',alignItems:'center'}}onPress={handleEdit} >
//                 <Image style={{width:20,height:20,position:'relative',left:5,marginBottom:20}} source={require('../../../../assets/images/images/edit.png')}/>

//                 </TouchableOpacity>
//                 <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} onPress={handleDelte}>
//                 <Image  source={require('../../../../assets/images/images/delete.png')}/>

//                 </TouchableOpacity>
//             </View>

//             </View>
          
//         </View>
//       )};
   

//     return (
//         <SafeAreaView style={{flex:1}}>
//       <View style={styles.container}>

// {/* List of students section */}
// <ScrollView style={{marginTop: 0, marginBottom: 0, backgroundColor:'#FFFFFF'}}>

// {feeData.map((data, index) => (
//         <Section key={index} id={data._id} title={data.name} title2={`₹ ${data.salary}`}>
//           <InfoRow label="Salary" value={data.salary} />
//           <InfoRow label="Allowance" value={data.allowance} />
//           <InfoRow label="Bonus" value={data.bonus} />
//         </Section>
//       ))
//     }
// </ScrollView>


// {(isOpen || edit) && (
//           <View style={styles.inputContainer}>
//             <Text style={styles.inputHeader}>{edit ? 'Edit Payrow' : 'Add Payrow'}</Text>

//             <TextInput
//               style={styles.input}
//               placeholder={edit ? "Edit Name" : "Add Name"}
//               onChangeText={(text) => setName(text)}
//               value={name}
//             />

//             <TextInput
//               style={styles.input}
//               placeholder={edit ? "Edit Salary" : "Add Salary"}
//               onChangeText={(text) => setSalary(text)}
//               value={salary}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder={edit ? "Edit Allowance" : "Add Allowance"}
//               onChangeText={(text) => setAllow(text)}
//               value={allow}
//             />
//             <TextInput
//               style={styles.input}
//               placeholder={edit ? "Edit Bonus" : "Add Bonus"}
//               onChangeText={(text) => setBonus(text)}
//               value={bonus}
//             />

//             <View style={styles.inputButtonsContainer}>
//               <TouchableOpacity style={styles.closeBtn} onPress={() => { setIsOpen(false); setEdit(false); }}>
//                 <Text style={styles.cancelText}>Cancel</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.buttons} onPress={edit ? saveEdit : handleAddPayrow}>
//                 <Text style={styles.addText}>{edit ? 'Save' : 'Add'}</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         )}

// <TouchableOpacity style={{width:80, height:80, backgroundColor:'#58A8F9', zIndex:90000, position:'relative', borderRadius:100, bottom:100, justifyContent:'center',left:responsiveWidth(65),alignItems:'center'}} onPress={handleAdd} >
//       <Entypo name="plus" size={40} color="white" />
//       </TouchableOpacity>

// </View>
//       </SafeAreaView>
//     );
//   };



import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View , TouchableOpacity, Image, ScrollView, TextInput, SafeAreaView, Modal, Alert } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { BlurView } from 'expo-blur';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const DropdownComponent = () => {
  const [feeData, setFeeData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [salary, setSalary] = useState(null);
  const [allow, setAllow] = useState(null);
  const [bonus, setBonus] = useState(null);
  const [name, setName] = useState(null);

  const fetchPayrow = async () => {
    try {
      const response = await axios.get(`${baseUrl}/payrow`);
      setFeeData(response.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchPayrow();
  }, []);

  const handleAdd = () => {
    setIsOpen(true);
  };

  const handleEdit = (data) => {
    setEdit(true);
    setName(data.name);
    setSalary(data.salary);
    setAllow(data.allowance);
    setBonus(data.bonus);
  };

  const handleAddPayrow = () => {
    axios
      .post(`${baseUrl}/payrow/add`, {
        name,
        salary,
        allowance: allow,
        bonus,
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          return;
        }
        setFeeData([res.data.doc, ...feeData]);
        setName(null);
        setSalary(null);
        setAllow(null);
        setBonus(null);
        setIsOpen(false);
        alert("Payrow added successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to add payrow");
      });
  };

  const saveEdit = () => {
    axios
      .put(`${baseUrl}/payrow/update`, {
        
        salary,
        allowance: allow,
        bonus,
      })
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
          return;
        }
        const updatedFeeData = feeData.map((item) =>
          item._id === res.data.doc._id ? res.data.doc : item
        );
        setFeeData(updatedFeeData);
        setName(null);
        setSalary(null);
        setAllow(null);
        setBonus(null);
        setEdit(false);
        alert("Payrow updated successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("Failed to update payrow");
      });
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Deletion",
      "Are you sure you want to delete this payrow?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => {
            axios
              .delete(`${baseUrl}/payrow/delete/${id}`)
              .then((res) => {
                if (res.data.error) {
                  Alert.alert("Error", res.data.error);
                  return;
                }
                setFeeData(feeData.filter((item) => item._id !== id));
                Alert.alert("Success", "Payrow deleted successfully");
              })
              .catch((err) => {
                console.error("Error deleting payrow:", err);
                Alert.alert("Error", "Failed to delete payrow");
              });
          },
          style: "destructive"
        }
      ]
    );
  };

  const InfoRow = ({ label, value }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ width: '70%', left: 20 }}>
        <Text style={styles.value}>{value}</Text>
      </View>
    </View>
  );

  const Section = ({ id, title, title2, children }) => {
    return (
      <View style={styles.section}>
        <TouchableOpacity style={styles.sectionHeader} activeOpacity={0.7}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={styles.sectionTitle2}>{title2}</Text>
          </View>
        </TouchableOpacity>

        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={styles.sectionContent}>
            {children}
          </View>
          <View style={styles.listBtns}>
            <TouchableOpacity
              style={{ width: 30, height: 30, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => handleEdit(id)}
            >
              <Image style={{ width: 20, height: 20, position: 'relative', left: 5, marginBottom: 20 }} source={require('../../../../assets/images/images/edit.png')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
              onPress={() => handleDelete(id)}
            >
              <Image source={require('../../../../assets/images/images/delete.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        {/* List of payrows */}
        <ScrollView style={{ marginTop: 0, marginBottom: 0, backgroundColor: '#FFFFFF' }}>
          {feeData.map((data, index) => (
            <Section key={index} id={data._id} title={data.name} title2={`₹ ${data.salary}`}>
              <InfoRow label="Salary" value={data.salary} />
              <InfoRow label="Allowance" value={data.allowance} />
              <InfoRow label="Bonus" value={data.bonus} />
            </Section>
          ))}
        </ScrollView>



 <Modal
        animationType="slide"
        transparent={true}
        visible={(isOpen || edit)}
        onRequestClose={() => setIsOpen(false)}
        >
        
        <BlurView intensity={50} tint="dark" style={styles.modalOverlay}>
        




        {(isOpen || edit) && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>{edit ? 'Edit Payrow' : 'Add Payrow'}</Text>

           {!edit &&<TextInput
              style={styles.input}
              placeholder={edit ? "Edit Name" : "Add Name"}
              onChangeText={(text) => setName(text)}
              value={name}
            />}

            <TextInput
              style={styles.input}
              placeholder={edit ? "Edit Salary" : "Add Salary"}
              onChangeText={(text) => setSalary(text)}
              value={salary}
              keyboardType='numeric'
            />
            <TextInput
              style={styles.input}
              placeholder={edit ? "Edit Allowance" : "Add Allowance"}
              onChangeText={(text) => setAllow(text)}
              value={allow}
              keyboardType='numeric'

            />
            <TextInput
              style={styles.input}
              placeholder={edit ? "Edit Bonus" : "Add Bonus"}
              onChangeText={(text) => setBonus(text)}
              value={bonus}
              keyboardType='numeric'

            />

            <View style={styles.inputButtonsContainer}>
              <TouchableOpacity style={styles.closeBtn} onPress={() => { setIsOpen(false); setEdit(false); }}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttons} onPress={edit ? saveEdit : handleAddPayrow}>
                <Text style={styles.addText}>{edit ? 'Save' : 'Add'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        </BlurView>


        </Modal>

        {!isOpen && <TouchableOpacity
          style={{
            width: 80,
            height: 80,
            backgroundColor: '#58A8F9',
            zIndex: 90000,
            position: 'relative',
            borderRadius: 100,
            bottom: 100,
            justifyContent: 'center',
            left: responsiveWidth(65),
            alignItems: 'center',
          }}
          onPress={handleAdd}
        >
          <Entypo name="plus" size={40} color="white" />
        </TouchableOpacity>
        }
      </View>
    </SafeAreaView>
  );
};


  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      // backgroundColor: 'red',
      padding: 16,
      paddingTop:70,
      flex:1
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
      position:'relative',
      top:70
    },
    search: {
      position:'relative',
      right:18,
      width: 100,
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
      width: "90%",
      height: 100,
      borderColor: 'grey',
      borderRadius: 10,
      // backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      marginBottom: 0,
      marginTop: 20
    },

    listBtns:{
        position:'absolute',
        right:30
    },
    stImg:{
      width:60,
      height:60,
      position:'absolute',
      left: 40,
      backgroundColor:'white',
      borderRadius:100
    },
    listContent:{
      flexDirection:'column',
      position: 'relative',
      left:130
    },
    section: {

        width:"80%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        //  backgroundColor: 'red',
         marginHorizontal: 16,
        marginVertical: 10,
         borderRadius: 8,
         overflow: 'hidden',
         elevation: 3, // Adds shadow for Android
         shadowColor: '#000', // Adds shadow for iOS
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.1,
         shadowRadius: 3,
         borderWidth:0.2,
         borderColor:'grey'

      },
      sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical:8,
        // backgroundColor: '#F8F8F8',
        backgroundColor: 'transparent',
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '400',
        color:'#58A8F9'
      },
      sectionTitle2: {
        fontSize: 15,
        fontWeight: '500',
        color:'black',
        position:'absolute',
        right:15,
        top:5
      },
      sectionContent: {
        paddingBottom: 16,
        paddingHorizontal:15,
        width:"100%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        // backgroundColor: 'red',
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: 'hidden',
        
        
      },
      
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
      },
      label: {
        fontWeight:'bold',
        color: '#666',
        fontSize: 12,
        // backgroundColor:'green',
        width:'35%'
      },
      value: {
        color:'grey',
        fontSize: 12,
        // backgroundColor:'blue'
        
      },
     
      input: {
        width: '80%',
        height: 50,
        backgroundColor: '#DAEDFF',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
      },

      inputContainer: {
        position: 'absolute',
        width: '80%',
        height: 380,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignSelf: 'center',
        top: '30%',
        flexDirection: 'column',
        elevation:5
      },
      inputHeader: {
        fontSize: 24,
        position: 'relative',
        alignSelf: 'flex-start',
        paddingHorizontal: 25,
        paddingVertical: 15,
      },
      inputButtonsContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        marginBottom: 10,
      },
      buttons: {
        width: 100,
        height: 38,
        backgroundColor: '#58A8F9',
        position: 'absolute',
        right: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      closeBtn: {
        width: 100,
        height: 38,
        // backgroundColor: '#DAEDFF',
        position: 'absolute',
        left: 25,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
      },
      addButton: {
        position: 'absolute',
        bottom: 50,
        right: 20,
        backgroundColor: '#58A8F9',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
      },
      cancelText: {
        color: '#58A8F9',
        fontWeight: '600',
      },
      addText: {
        color: 'white',
        fontWeight: '600',
      },
      
      modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)", // This sets the dim background overlay
        justifyContent: "center",
        alignItems: "center",
      },

  });