import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getUserPostBody, UserDetailsType } from './params.types';
import axios from 'axios';

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api";
const nextOfKin = () => {
  const params = useLocalSearchParams();
  const usercontactdetails = JSON.parse(params.userdetails as string);
  const [userdetails, setuserdetails] = useState<UserDetailsType>(usercontactdetails);

  console.log("nextOfKin", params.userdetails);

  const router = useRouter()

  const handlePrevious = () => {
    router.back()
  }

  const handleAdd = async () => {

    if (params.profilepicturebase64.length !== 0) {
      // https://dreamscloudtechbackend.onrender.com/api/upload
      // image, resize locally, to 300x300px
      // base64 encoding
      // upload post
      const imageData = {
        "dataUrl": params.profilepicturebase64,
      };
    }

    const userdata = getUserPostBody(userdetails);
    console.log("Sending to create", userdata);
    try {
      const response = await axios.post(`${baseUrl}/teachers/create`, userdata);
      if (response.status != 200) {
        Alert.alert('Failed', "Could not add Teacher");
        return;
      }
      if (response.data.error) {
        console.error("Failed to add teacher", response.data.error);
        return;
      }
      console.log("Success", response.data);
    }
    catch (error) {
      Alert.alert('Failed', "Could not add Teacher");
      return;
    }

    // https://dreamscloudtechbackend.onrender.com/api/activitylog/create
    // const activitylogpost = {
    //   "activity": "staff member Adhiraj Pandey was created",
    //   "user": "admin"
    // };

    Alert.alert('Success', 'Teacher Added Successfully')
    // router.back()
    // router.back()
    // router.back()
    // router.back()

  }


  const handleTextInputChange = (text: string, label: string) => setuserdetails((olddata) => {
    const nextofKin = {
      ...olddata.nextofKin,
      [label]: text,
    };
    return {
      ...olddata,
      nextofKin,
    }
  });


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: '#FFFFFF', }}>


        <View style={styles.container}>
          <TextInput onChangeText={(text) => handleTextInputChange(text, "name")} style={styles.input} placeholderTextColor={'grey'} placeholder="First Name*" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "lastname")} style={styles.input} placeholderTextColor={'grey'} placeholder="Last Name*" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "mobile")} style={styles.input} placeholderTextColor={'grey'} placeholder="Mobile Number*" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "email")} style={styles.input} placeholderTextColor={'grey'} placeholder="Email" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "relationship")} style={styles.input} placeholderTextColor={'grey'} placeholder="Relationship*" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "occupation")} style={styles.input} placeholderTextColor={'grey'} placeholder="Occupation" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "address")} style={styles.areaInputResi} placeholderTextColor={'grey'} placeholder="Area of Residence" numberOfLines={4} multiline textAlignVertical='top' />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', position: 'relative', paddingVertical: 10, width: "80%", justifyContent: 'space-between', alignSelf: 'center', bottom: 10 }}>
          <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
            <Text style={{ alignSelf: 'center', position: 'relative', color: '#58A8F9' }}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleAdd} >
            <Text style={{ alignSelf: 'center', position: 'relative', color: 'white' }}>Add</Text>
          </TouchableOpacity>
        </View>

        {/* <TouchableOpacity style={{ width: '80%', height: 60, backgroundColor: "#58A8F9", borderRadius: 40, alignSelf: 'center', justifyContent: 'center', marginVertical: 10 }} onPress={handleAdd}>
          <Text style={{ color: 'white', textAlign: 'center', fontSize: 26 }}>Add Staff</Text>
        </TouchableOpacity> */}
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

  container: {
    marginTop: 65,
    marginVertical: 20
  },
  button: {
    width: 110,
    height: 35,
    backgroundColor: '#58A8F9',
    // position:'absolute',
    // right:20,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',

  },
  previous: {
    width: 110,
    height: 35,
    backgroundColor: 'transparent',
    // position:'absolute',
    // left:50,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    borderColor: "#58A8F9",
    borderWidth: 1
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3,
  },
  label: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 14,
  },
  value: {
    color: 'grey',
    fontSize: 14,
  },
  cardContainer: {
    marginVertical: 10,
    width: "80%",
    height: 190,
    alignSelf: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#58A8F9",
    paddingHorizontal: 15,
    paddingVertical: 10

  }
})

export default nextOfKin