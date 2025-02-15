import { View, Text,ImageBackground,TouchableOpacity,Image, SafeAreaView , StyleSheet,FlatList,TextInput, Modal} from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { BlurView } from 'expo-blur';


const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'


const index = () => {

    const [isOpen, setIsOpen] = useState(false)
    const [edit, setEdit] = useState(false)
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [actNumber, setActNumber] = useState('')
    const [banks, setBanks] = useState([])
    const [currentId, setCurrentId] = useState(null)




    useEffect(() => {
      fetchBanks()
    })


const fetchBanks = async () => {
try {
  const response = await axios.get(`${baseUrl}/banking`)
const banks = response.data

const formatedData = banks.map((bank) => ({
  id: bank._id,
  name: bank.bankName || 'N/A',
  accountName: bank.accountName || 'N/A',
  accountNumber: bank.accountNumber || 'N/A'
}))

setBanks(formatedData)

} catch (error) {
  console.error("unable to fetch the banks" , error.message)
}
}




    const handleAdd = () => {
        
        setIsOpen(false)
        setCity('')
        setName('')
        setActNumber('')
    }

    const handlePlus = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false),
        setEdit(false),
        setCity(''),
        setActNumber(''),
        setName('')
    }
    
    const handleChangeName = (text) => {
            setName(text);
            }
            
    const handleChangeAccountName = (text) => {
            setCity(text);
            }
    const handleChangeAccountNumber = (text) => {
            setActNumber(text);
            }


        const handleDelete = (id) => {
          const confirmDelete = window.confirm("Are you sure you want to delete this campus?");

        }
        const handleEdit = (id) => {
            const updatedCampuses = campuses?.find((item) => item.id === id)
            setCity(updatedCampuses?.city)
            setName(updatedCampuses?.name)
            setCurrentId(id)
            setEdit(true)

        }
        const saveEdit = () => {
            const updatedCampuses = campuses.map((item) => 
              item.id === currentId ? { ...item, name: name, place: city } : item
            );
            setCampuses(updatedCampuses);
            // setIsOpen(false);
            setEdit(false);
            setName('');
            setCity('');
            setCurrentId(null);
          }


    const renderCampuses = ({item}:any) => {
        return (
            <View style={styles.list} key={item.id} >
            
            <View style={styles.listContent}>
              <Text style={{ color: "#58A8F9", fontSize: 20 }}>{item.name}</Text>
              <Text style={{ color: "grey", fontSize: 15, fontWeight: "condensedBold" }}> {item.accountName}</Text>
              <Text style={{ color: "grey", fontSize: 13, fontWeight: "condensedBold" }}>{item.accountNumber}</Text>
            </View>
            <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} onPress={()=>{handleEdit(item.id)}}>
                <Image source={require('../../../../assets/images/images/edit.png')}/>

                </TouchableOpacity>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} onPress={()=>{handleDelete(item.id)}}>
                <Image source={require('../../../../assets/images/images/delete.png')}/>

                </TouchableOpacity>
            </View>
            
          </View>
        )
    }
    
  return (
    <SafeAreaView style={{flex:1}}>
        
   <ImageBackground source={require('../../../../assets/images/images/union.png')} style={styles.background} imageStyle={{resizeMode:'cover', position:'absolute',bottom:580}}>
    <FlatList 
    data={banks}
    keyExtractor={(item) => item.id.toString()}
    renderItem={renderCampuses}
    contentContainerStyle = {styles.lists}
    />

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
        




    {(isOpen || edit ) && <View style={styles.inputContainer}>
        <Text style={{fontSize:24,position:'relative',alignSelf:'flex-start',paddingHorizontal:25,paddingVertical:15}}>{edit ? 'Edit Bank' : 'Add Bank'}</Text>

    <TextInput style={styles.input} placeholder={edit ? "Edit Name" : "Add Name"} onChangeText={handleChangeName} value={name}/>

    <TextInput style={styles.input} placeholder={edit ? "Edit Account Name" : "Add Account Name"} onChangeText={handleChangeAccountName} value={city}/>
    <TextInput style={styles.input} placeholder={edit ? "Edit Account Number" : "Add Account Number"} onChangeText={handleChangeAccountNumber} value={actNumber}/>

    <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'flex-end',marginBottom:10}}>

    <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
    <Text style={{color:'#58A8F9',fontSize:20}}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttons} onPress={edit ? saveEdit : handleAdd}>
    <Text style={{color:'white',fontSize:20, textAlign:'center'}}>{edit ? 'Save' : 'Add'}</Text>
    </TouchableOpacity>
    </View>
    </View>}

    </BlurView>

    </Modal>

   </ImageBackground>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    background:{
        flex:1,
        backgroundColor: '#daedff'
    },
    list: {
        width: "90%",
        height: 100,
        borderColor: "grey",
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        justifyContent: "space-between",
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 15,
        flex:1,
        elevation:4,
      },
      
      listContent: {
        flexDirection: "column",
        position: "relative",
        paddingHorizontal:25,
        justifyContent:'flex-start'
      },
      listBtns:{
        position:'absolute',
        flex:1,
        flexDirection:'row',
        right:30,
        justifyContent:'space-between'
      },
      lists:{
        position:'relative',
        top:60,
        paddingBottom:70,
        
      },
      input: {
        width: '80%',
        height: 50,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
      },
      inputContainer:{
        position:'absolute',
        width:'80%',
        height:320,
        backgroundColor:'white',
        // backgroundColor:'red',
        borderRadius:10,
        justifyContent:'center',
        alignSelf:'center',
        top:'30%',
        flexDirection:'column',
        zIndex:9999999,
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

})

export default index