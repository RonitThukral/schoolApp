import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import Feather from '@expo/vector-icons/Feather';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { UserDetailsType } from './params.types';

const contactInfo = () => {
  const params = useLocalSearchParams();
  const useremploymentdetails = JSON.parse(params.userdetails as string);
  const [userdetails, setuserdetails] = useState<UserDetailsType>(useremploymentdetails);

  const router = useRouter()

  const handlePrevious = () => {
    router.back()
  }

  const handleNext = () => {
    router.navigate({
      pathname: './nextOfKinInfo',
      params: {
        userdetails: JSON.stringify(userdetails),
        profilepicturebase64: params.profilepicturebase64,
      }
    })
  }

  const handleTextInputChange = (text: string, label: string) => setuserdetails((olddata) => {
    return {
      ...olddata,
      [label]: text,
    }
  });

  return (
    <SafeAreaView>
      <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
        <View style={styles.container}>
          <TextInput onChangeText={(text) => handleTextInputChange(text, "telephone")} style={styles.input} placeholderTextColor={'grey'} placeholder="Sms Number*" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "mobilenumber")} style={styles.input} placeholderTextColor={'grey'} placeholder="Mobile Number*" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "physicalAddress")} style={styles.areaInputResi} placeholderTextColor={'grey'} placeholder="Area of Residence*" numberOfLines={4} multiline textAlignVertical='top' />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "postalAddress")} style={styles.areaInputPost} placeholderTextColor={'grey'} placeholder="Postal Address" numberOfLines={3} multiline textAlignVertical='top' />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', position: 'relative', paddingVertical: 120, width: "80%", justifyContent: 'space-between', alignSelf: 'center', bottom: 1 }}>
          <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
            <Text style={{ alignSelf: 'center', position: 'relative', color: '#58A8F9' }}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext} >
            <Text style={{ alignSelf: 'center', position: 'relative', color: 'white' }}>Next</Text>
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
})

export default contactInfo