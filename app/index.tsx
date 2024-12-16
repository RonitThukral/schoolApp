import { View, Text,TouchableOpacity} from 'react-native'
import React from 'react'
import {useRouter } from 'expo-router'

const index = () => {
  const router = useRouter()

 const  handlePress = () => {
  router.navigate('/home')
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