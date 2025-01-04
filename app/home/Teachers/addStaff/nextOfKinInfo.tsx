import { View, Text, StyleSheet, TextInput,TouchableOpacity,ScrollView, SafeAreaView ,Image ,FlatList} from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const contactInfo = () => {

    const [guardian, setGuardian] = useState([])
    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [relationship, setRelationship] = useState('')
    const [occupation, setOccupation] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')



    const router =useRouter()

    const InfoRow = ({ label, value }) => (
        <View style={styles.infoRow}>
          <Text style={styles.label}>{label}</Text>
          <View style={{position:'absolute', left:130, top:3}}>
    
          <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      );



    const handlePrevious = () => {
        router.back()
    }
    
    
    const handleAddGuardian = () => {
        if (!name || !relationship || !email || !occupation || !address) {
          alert('Please fill all fields before adding.');
          return;
        }
    
        setGuardian([
          ...guardian,
          { 
            id: Math.random().toString(), // Unique ID for FlatList
            name, 
            relationship, 
            occupation, 
            email, 
            address 
          },
        ]);
    
        // Clear input fields
        setName('');
        setRelationship('');
        setOccupation('');
        setEmail('');
        setAddress('');
        setLastName('');
      };
      
      const handleAdd = () => {
        router.navigate('/students')
      }




  return (
    <SafeAreaView style={{flex:1}}>
        <ScrollView style={{backgroundColor:'#FFFFFF',}}>


        <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../../../assets/images/images/emptyAvatar.png')} // Add your placeholder image
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Feather name="camera" size={20} color="white" />
              </View>
            </View>
        <Text style={{position:'relative', right:45, fontSize:22,fontWeight:'600', marginVertical:0,paddingTop:45}}>Next Of Kin Information</Text>
          
        </View>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="First Name" onChangeText={setName} value={name}/>
          <TextInput style={styles.input} placeholder="Last Name" onChangeText={setLastName} value={lastName}/>
          <TextInput style={styles.input} placeholder="Mobile Number" onChangeText={setLastName} value={lastName}/>
          <TextInput style={styles.input} placeholder="Relationship" onChangeText={setRelationship} value={relationship}/>
          <TextInput style={styles.input} placeholder="Email" onChangeText={setOccupation} value={occupation}/>
          <TextInput style={styles.input} placeholder="Occupation" onChangeText={setEmail} value={email}/>
          <TextInput style={styles.areaInputResi} placeholder="Area of Residence" numberOfLines={4} multiline textAlignVertical='top' onChangeText={setAddress} value={address}/>
          </View>

          <View style={{flex:1, flexDirection:'row',position:'relative',paddingVertical:10 ,width:"80%",justifyContent:'space-between',alignSelf:'center',bottom:10}}>
        <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
            <Text style={{alignSelf:'center', position:'relative', color:'#58A8F9'}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAddGuardian} >
            <Text style={{alignSelf:'center', position:'relative', color:'white'}}>Add</Text>
        </TouchableOpacity>
    </View>


    <FlatList
          data={guardian}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
          <InfoRow label="Name" value={item.name} />
          <InfoRow label="Relationship" value={item.relationship} />
          <InfoRow label="Occupation" value={item.relationship} />
          <InfoRow label="Email" value={item.relationship} />
          <InfoRow label="Address" value={item.relationship} />
          <InfoRow label="Fee Category" value={item.relationship} />
          </View>
          )}
        />    

    <TouchableOpacity style={{width:'80%', height:60, backgroundColor:"#58A8F9", borderRadius:10, alignSelf:'center', justifyContent:'center',marginVertical:10}} onPress={handleAdd}>
        <Text style={{color:'white',textAlign:'center', fontSize:26}}>Add Staff</Text>
    </TouchableOpacity>
        </ScrollView>
    </SafeAreaView>
    
  )
}

const styles = StyleSheet.create({
    profileSection: {
        position: 'relative',
        top: 25,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15,
        paddingVertical: 16,
        // backgroundColor:'red'
      },
      avatarContainer: {
        position: 'relative',
        right: 15,
        top: 25,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#DDD',
      },
      verifiedBadge: {
        position: 'absolute',
        top: 0,
        left: 70,
        backgroundColor: '#58A8F9',
        borderRadius: 100,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
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
      areaInputResi: {
        width: '80%',
        height: 100,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
        // paddingBottom:70
      },
      
      container:{
        marginVertical:20
       },
       button: {
        width:110,
        height:35,
        backgroundColor: '#58A8F9',
        // position:'absolute',
        // right:20,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
        
      },
      previous:{
        width:110,
        height:35,
        backgroundColor: 'transparent',
        // position:'absolute',
        // left:50,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
        borderColor:"#58A8F9",
        borderWidth:1
      },
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
      },
      label: {
        fontWeight:'bold',
        color: '#666',
        fontSize: 14,
      },
      value: {
        color:'grey',
        fontSize: 14,
      },
      cardContainer:{
        marginVertical:10,
        width:"80%",
        height:190,
        alignSelf:'center',
        borderRadius:10,
        borderWidth:1,
        borderColor:"#58A8F9",
        paddingHorizontal:15,
        paddingVertical:10
        
      }
})

export default contactInfo