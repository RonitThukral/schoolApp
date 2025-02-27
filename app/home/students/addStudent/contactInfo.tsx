import { View, Text, StyleSheet, TextInput,TouchableOpacity,ScrollView, SafeAreaView ,Image } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';

const contactInfo = () => {
  const {personalData, academicData} = useLocalSearchParams();

  // console.log(personalData, academicData)


  const [smsNumber, setSmsNumber] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [areaOfResidence, setAreaOfResidence] = useState('');
  const [postalAddress, setPostalAddress] = useState('');





    const router =useRouter()

    const handlePrevious = () => {
        router.back()
    }
    const handleNext = () => {
      // Collect contact data
      const contactData = {
        smsNumber,
        mobileNumber,
        areaOfResidence,
        postalAddress,
      };
  
      // Navigate to guardianInfo with all collected data
      router.navigate({
        pathname: './guardianInfo',
        params: {
          personalData,
          academicData,
          contactData: JSON.stringify(contactData),
        },
      });
    };

  return (
    <SafeAreaView>
        <ScrollView style={{backgroundColor:'#FFFFFF'}}>


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
        <Text style={{position:'relative', right:45, fontSize:22,fontWeight:'600', marginVertical:0,paddingTop:45}}>Contact Information</Text>
          
        </View>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Sms Number" placeholderTextColor={'grey'} keyboardType='numeric'  value={smsNumber}
            onChangeText={setSmsNumber}
 />
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="Mobile Number" keyboardType='numeric' value={mobileNumber}
            onChangeText={setMobileNumber} />

          <TextInput style={styles.areaInputResi} placeholderTextColor={'grey'} placeholder="Area of Residence" numberOfLines={4} multiline textAlignVertical='top' value={areaOfResidence}
            onChangeText={setAreaOfResidence}/>

          <TextInput style={styles.areaInputPost} placeholderTextColor={'grey'} placeholder="Postal Address" numberOfLines={3} multiline textAlignVertical='top' value={postalAddress}
            onChangeText={setPostalAddress}/>

          </View>

          <View style={{flex:1, flexDirection:'row',position:'relative',paddingVertical:120 ,width:"80%",justifyContent:'space-between',alignSelf:'center',bottom:1}}>
        <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
            <Text style={{alignSelf:'center', position:'relative', color:'#58A8F9'}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext} >
            <Text style={{alignSelf:'center', position:'relative', color:'white'}}>Next</Text>
        </TouchableOpacity>
    </View>


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
      areaInputPost: {
        width: '80%',
        height: 90,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
        // paddingBottom:60

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
})

export default contactInfo