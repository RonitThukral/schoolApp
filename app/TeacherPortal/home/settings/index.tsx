import { View, Text, StyleSheet, TextInput,TouchableOpacity,ScrollView, SafeAreaView ,Image } from 'react-native'
import React from 'react'
import * as Updates from 'expo-updates';  // Correct import after installation
import { useLocalSearchParams, useRouter } from 'expo-router';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { clearUserData } from '@/app/utils/storage';

const contactInfo = () => {

  const {teacher} = useLocalSearchParams()

  const parsedTeacher = teacher ? JSON.parse(teacher) : null;

    const router =useRouter()

    const handlePrevious = () => {
        router.back()
    }
    const handleNext = () => {
        // router.navigate('./guardianInfo')
    }


    const handleLogout = async () => {
      try {
        await clearUserData();
       // Assuming userData is stored after login
       await Updates.reloadAsync();  // This will reload the app to the initial state
    
          router.replace('/'); // Redirect to login if not authenticated
        // Navigate to the root of your app
      } catch (error) {
        console.error('Logout error:', error);
      }
    };

  return (
    <SafeAreaView style={{flex:1}}>
        <ScrollView style={{backgroundColor:'#FFFFFF'}} contentContainerStyle={{paddingBottom:40}}>


<View>

    <View style={{width:'80%',flexDirection:'row', paddingBottom:'5%',paddingTop:'15%'}}>
    <Text style={{position:'relative', textAlign:'center', fontSize:22,fontWeight:'600', marginVertical:0,paddingTop:45,left:responsiveWidth(10)}}>Change Password </Text>
    </View>

    <TextInput style={styles.input} placeholder="Old Password" placeholderTextColor={'grey'}
 />
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="New Password" />
</View>
<View style={{flex:1, flexDirection:'row',position:'relative',paddingVertical:10 ,width:"80%",justifyContent:'flex-end',alignSelf:'center',bottom:1}}>
        
        <TouchableOpacity style={styles.button} onPress={handleNext} >
            <Text style={{alignSelf:'center', position:'relative', color:'white'}}>Sumbit</Text>
        </TouchableOpacity>
    </View>

    <View style={{flexDirection:'row',marginTop:40,marginLeft:30}}>
  <Text>You are logged in as: {`${parsedTeacher.name} ${parsedTeacher.surname}`}</Text>
  <TouchableOpacity style={{width:80, height:40, backgroundColor:'red',borderRadius:15,marginHorizontal:15,marginVertical:-10,paddingVertical:7}} onPress={handleLogout}>
<Text style={{alignSelf:'center',textAlignVertical:'center',color:'white'}}>Log Out</Text>
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