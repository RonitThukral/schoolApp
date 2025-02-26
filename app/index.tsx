import { View, Text,TouchableOpacity,LogBox} from 'react-native'
import React from 'react'
import Login from './auth/login';
import { getUserData } from './utils/storage';
import DrawerNavigator from './components/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { NavigationIndependentTree } from '@react-navigation/native';


LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const index = () => {

  
  return (
 <>

    <Login/>
 </>

  )
}

export default index