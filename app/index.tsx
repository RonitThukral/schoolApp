import { View, Text, TouchableOpacity, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import Login from './auth/login';
import { fetchAndSaveStudentsInfoCache } from './utils/storage';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const index = () => {

  useEffect(() => {
    // Make calls that are needed by the whole app, and store it in asyncStorage.
    // example students info
    fetchAndSaveStudentsInfoCache();
  }, []);

  const router = useRouter()

  const handlePress = () => {
    router.navigate('/home')
  }

  return (
    <Login />

  )
}

export default index