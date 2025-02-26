import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  Alert,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { getUserData, saveUserData } from '../utils/storage';  // Adjust path based on file structure
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Login = () => {
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('abcyuuiy');
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState('student');
  const [checkingUser, setCheckingUser] = useState(true);  // New state for initial check

  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in and navigate
    const checkUserLoggedIn = async () => {
      const userData = await getUserData();
      if (userData) {
        navigateToPortal(userData.role);
      } else {
        setCheckingUser(false); // Allow login screen to show
      }
    };

    checkUserLoggedIn();
  }, []);

  const handleLogin = async () => {
    if (!userID.trim()) {
      Alert.alert('Error', 'Please enter a valid User ID.');
      return;
    }
  
    try {
      setLoading(true);
      const response = await axios.post('https://dreamscloudtechbackend.onrender.com/api/school/signin', {
        userID,
        password,
      });
  
      const data = response.data;  // Store the response data
      setLoading(false);
  
      if (data.success) {
        const role = data.user.role; // Normalize the role
  
        // Save user data to AsyncStorage
        await saveUserData(data.user);
  
        // Redirect based on role
        navigateToPortal(role, data);  // Pass data to the navigateToPortal function
      } else {
        Alert.alert('Login Failed', data.error || 'Invalid credentials.');
      }
    } catch (error) {
      setLoading(false);
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };
  
  const navigateToPortal = (role: string, data: any) => {  // Add the data parameter here
    if (role === 'student') {
      router.replace({
        pathname: '/StudentPortal/home',
        params: { student: JSON.stringify(data.user) },
      });    
    } else if (role === 'teacher') {
      router.replace({
        pathname: '/TeacherPortal/home',
        params: { teacher: JSON.stringify(data.user) },
      });
    } else if (role === 'admin') {
      router.replace('/home');
    }
  };
  
  const handleRadioPress = (value: string) => {
    setSelectedValue(value);
  };


  if (checkingUser) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#58A8F9" />
      </View>
    );
  }


  return (
    <SafeAreaView style={{flex : 1}}>
      <View style={{width:responsiveWidth(80), height:responsiveHeight(10),backgroundColor:'white',position:'absolute',zIndex:99,left:43,top:55,borderRadius:10}}>

      </View>
      <Image source={require('../../assets/images/images/logooooo.png')} style={{position:'absolute',width:responsiveHeight(37),height:responsiveHeight(9),zIndex:99999,top:57,left:50}}/>
      <ImageBackground
        source={require('../../assets/images/images/loginn.png')}
        style={styles.bgcontainer}
      >
        {/* Username and Password Input Fields */}
        <View>
          <TextInput
            style={styles.input1}
            placeholder="Username"
            placeholderTextColor="#888"
            onChangeText={setUserID}
          />
          <TextInput
            style={styles.input2}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor="#888"
            onChangeText={setPassword}
          />
        </View>

        {/* Custom Radio Buttons */}
        <View style={styles.radioContainer}>
          {[ 'admin','student', 'teacher'].map((role) => (
            <TouchableOpacity
              key={role}
              style={styles.radioButton}
              onPress={() => handleRadioPress(role)}
            >
              <View
                style={[styles.radioCircle]}
              />
              {selectedValue === role && (
                <View style={styles.selectedRadioCircle} />
              )}
              <Text style={styles.radioLabel}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bgcontainer: { flex: 1, flexDirection: 'column' ,resizeMode:'cover',position:'absolute',height: responsiveHeight(100), width:responsiveHeight(50)},

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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
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
  selectedRadioCircle: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'absolute',
    left: 5,
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
});

export default Login;
