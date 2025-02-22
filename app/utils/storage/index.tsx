import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { StudentInfoType } from '../app.types';

const baseUrl = "https://dreamscloudtechbackend.onrender.com/api";
// Save user data
export const saveUserData = async (userData: any) => {
  try {
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data', error);
  }
};

// Get user data
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data', error);
    return null;
  }
};

// Clear user data (for logout)
export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('user_data');
  } catch (error) {
    console.error('Error clearing user data', error);
  }
};

let studentInfoMap = new Map();
export const cacheStudentMap = (students_info: StudentInfoType[]) => {
  studentInfoMap.clear()
  students_info.forEach((student) => {
    studentInfoMap.set(student.userID, student);
  });
};

export const fetchAndSaveStudentsInfoCache = async () => {
  try {
    const resp = await axios.get(`${baseUrl}/students`)
    if (resp.data.error || resp.status !== 200) {
      console.error("Could not Fetch Students");
    } else {
      cacheStudentMap(resp.data)
      AsyncStorage.setItem('students_info', JSON.stringify(resp.data));
    }
    console.log(resp.status, resp.data.error);
    return resp.data;

  } catch (error) {
    console.error('Error Fetching Students Info', error);
  }
  return null;
}

export const getStudentsInfo = async () => {
  try {
    const students_info = await AsyncStorage.getItem('students_info');
    const students = students_info ? JSON.parse(students_info) : null;
    if (studentInfoMap.size === 0 && students !== null) {
      cacheStudentMap(students);
    }
    return students;
  } catch (error) {
    console.error('Error getting students data', error);
    return null;
  }
}

export const getStudentInfo = (id: string): StudentInfoType | null => {
  if (studentInfoMap.has(id)) {
    return studentInfoMap.get(id);
  }
  return null;
}

export const clearStudentsInfo = async () => {
  try {
    await AsyncStorage.removeItem('students_info');
  } catch (error) {
    console.error('Error clearing students info', error);
  }
}