import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Link } from 'expo-router';

const Login = () => {
  const [selectedValue, setSelectedValue] = useState('student');

  const handleRadioPress = (value:any) => {
    setSelectedValue(value);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <Image source={require('../../assets/images/images/Logooo.png')} style={{position:'absolute',width:300,height:100,zIndex:99999,top:50,left:35}}/>
      <ImageBackground
        source={require('../../assets/images/images/login.png')}
        style={styles.bgcontainer}
      >
        {/* Username and Password Input Fields */}
        <View>
          <TextInput
            style={styles.input1}
            placeholder="Username"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input2}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#888"
          />
        </View>

        {/* Custom Radio Buttons */}
        <View style={styles.radioContainer}>
          {['student', 'teacher', 'admin'].map((role) => (
            <TouchableOpacity
              key={role}
              style={styles.radioButton}
              onPress={() => handleRadioPress(role)}
            >
              <View
                style={[
                  styles.radioCircle,
                ]}
              />
              <View style={[selectedValue === role ? styles.selectedRadioCircle:null]}></View>
              <Text style={styles.radioLabel}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Login Button */}
          <TouchableOpacity style={styles.button}>
        <Link href={'/home'} >
            <Text style={styles.btntext}>Login</Text>
        </Link>
          </TouchableOpacity>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bgcontainer: { flex: 1, flexDirection: 'column' },
  input1: {
    width: '80%',
    height: 55,
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 180,
    paddingLeft: 25,
    elevation: 3,
  },
  input2: {
    width: '80%',
    height: 55,
    backgroundColor: 'white',
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 20,
    paddingLeft: 25,
    elevation: 3,
  },
  radioContainer: {
    alignSelf: 'center',
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
  },
  radioButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  selectedRadioCircle :{
    width:10,
    height:10,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    left:5
  },
  radioCircleSelected: {
    backgroundColor: 'white',
  },
  radioLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: 120,
    height: 40,
    backgroundColor: '#58A8F9',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 30,
    elevation: 3,
  },
  btntext: { color: 'white', fontSize: 16, fontWeight: '600' },
  link: { alignSelf: 'center', marginTop: 20 },
});

export default Login;
