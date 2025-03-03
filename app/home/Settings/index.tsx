import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Feather from '@expo/vector-icons/Feather';
import * as Updates from 'expo-updates';  // Correct import after installation

import { useLocalSearchParams, useRouter } from 'expo-router';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import { clearUserData } from '@/app/utils/storage';

const contactInfo = () => {

  const router = useRouter();
  const scrollViewRef = useRef<ScrollView | null>(null);

  const { scrollToPassword: scrollToPasswordParam } = useLocalSearchParams();
  const scrollToPassword: boolean = JSON.parse(scrollToPasswordParam as string | undefined ?? "false");


  const handlePrevious = () => {
    router.back()
  }
  const handleNext = () => {
    // router.navigate('./guardianInfo')
  }

  useEffect(() => {
    if (scrollToPassword) {
      scrollViewRef.current?.scrollToEnd();
    }
  }, []);

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ backgroundColor: '#FFFFFF' }}
        contentContainerStyle={{ paddingBottom: 40 }}
        ref={scrollViewRef}>


        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require('../../../assets/images/images/emptyAvatar.png')} // Add your placeholder image
              style={styles.avatar}
            />
            <View style={styles.verifiedBadge}>
              <Feather name="camera" size={20} color="white" />
            </View>
          </View>

          <View style={{ width: '80%', flexDirection: 'row', paddingHorizontal: 35 }}>
            <Text style={{ position: 'relative', textAlign: 'center', fontSize: 22, fontWeight: '600', marginVertical: 0, paddingTop: 45, }}>ROSES 'N' LILIES HIGH SCHOOL </Text>
            <TouchableOpacity style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', position: 'relative', top: responsiveHeight(5), right: responsiveWidth(0) }} >
              <Image source={require('../../../assets/images/images/edit.png')} style={{ width: 25, height: 25 }} />

            </TouchableOpacity>
          </View>

        </View>
        <View style={styles.container}>
          <TextInput style={styles.input} placeholder="Name" placeholderTextColor={'grey'}
          />
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="Motto" />

          <TextInput style={styles.input} placeholder="Email" placeholderTextColor={'grey'}
          />
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="Telephone" />

          <TextInput style={styles.areaInputPost} placeholderTextColor={'grey'} placeholder="Address" numberOfLines={3} multiline textAlignVertical='top' />

        </View>

        <View style={{ flex: 1, flexDirection: 'row', position: 'relative', paddingVertical: 10, width: "80%", justifyContent: 'space-between', alignSelf: 'center', bottom: 1 }}>
          <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
            <Text style={{ alignSelf: 'center', position: 'relative', color: '#58A8F9' }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleNext} >
            <Text style={{ alignSelf: 'center', position: 'relative', color: 'white' }}>Save</Text>
          </TouchableOpacity>
        </View>

        <View>

          <View style={{ width: '80%', flexDirection: 'row', paddingBottom: '5%' }}>
            <Text style={{ position: 'relative', textAlign: 'center', fontSize: 22, fontWeight: '600', marginVertical: 0, paddingTop: 45, left: responsiveWidth(10) }}>Change Password </Text>
          </View>

          <TextInput style={styles.input} placeholder="Old Password" placeholderTextColor={'grey'}
          />
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder="New Password" />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', position: 'relative', paddingVertical: 10, width: "80%", justifyContent: 'flex-end', alignSelf: 'center', bottom: 1 }}>

          <TouchableOpacity style={styles.button} onPress={handleNext} >
            <Text style={{ alignSelf: 'center', position: 'relative', color: 'white' }}>Sumbit</Text>
          </TouchableOpacity>
        </View>


        <View style={{ flexDirection: 'row', padding: '9%', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 12 }}>You are logged in as: Nilesh shr</Text>
          <TouchableOpacity style={styles.button2} onPress={handleLogout}>
            <Text style={{ alignSelf: 'center', textAlignVertical: 'center', color: 'white' }}>Log Out</Text>
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


  button2: {
    width: 110,
    height: 35,
    backgroundColor: 'red',
    // position:'absolute',
    // right:20,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginLeft: responsiveWidth(5),
    position: 'relative',
    bottom: 10

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