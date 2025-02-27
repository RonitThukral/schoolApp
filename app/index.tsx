import { View, Text, TouchableOpacity, LogBox } from 'react-native'
import React, { useEffect } from 'react'
import Login from './auth/login';
import { fetchAndSaveStudentsInfoCache, getUserData } from './utils/storage';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationIndependentTree } from '@react-navigation/native';


LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const index = () => {

  useEffect(() => {
    // Make calls that are needed by the whole app, and store it in asyncStorage.
    // example students info
    fetchAndSaveStudentsInfoCache();
  }, []);

  return (
    <>

      <Login />
    </>

  )
}

export default index