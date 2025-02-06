import { View, Text,TouchableOpacity,LogBox} from 'react-native'
import React from 'react'
import {useRouter } from 'expo-router'
import Login from './auth/login';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const index = () => {
  const router = useRouter()

 const  handlePress = () => {
  router.navigate('/home')
  }
  
  return (
    <Login/>
   
  )
}

export default index