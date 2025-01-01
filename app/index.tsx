import { View, Text,TouchableOpacity,LogBox} from 'react-native'
import React from 'react'
import {useRouter } from 'expo-router'

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation',
]);

const index = () => {
  const router = useRouter()

 const  handlePress = () => {
  router.navigate('/home/Academics/progressReport')
  }
  
  return (
    <TouchableOpacity onPress={handlePress} style={{width:'60%', height:100, backgroundColor:'grey'}}>
    <View style={{justifyContent: 'center', flex: 1, alignItems:'center'}}>
      <Text>Home</Text>
    </View>
    </TouchableOpacity>
  )
}

export default index