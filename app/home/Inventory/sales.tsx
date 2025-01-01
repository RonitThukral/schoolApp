import { StyleSheet, Text, View,ScrollView,Image,TouchableOpacity,TextInput } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react'
import { useState } from 'react';

const saleData = [
    
        {
          "id": 'F3ERG4365JYNBFDES',
          "amount": 1200,
          "date": "2024-12-01",
          "studentId": "STU1001"
        },
        {
          "id": 'GF45455HJYTTRGSJ',
          "amount": 750,
          "date": "2024-12-02",
          "studentId": "STU1002"
        },
        {
          "id": 'REGER34T4TRHEEFGRTTRJ6W',
          "amount": 500,
          "date": "2024-12-02",
          "studentId": "STU1003"
        },
        {
          "id": 'GFESRGERHTRHTHR34T4EH54H',
          "amount": 800,
          "date": "2024-12-03",
          "studentId": "STU1004"
        },
        {
          "id": 'EGE4WGRFBFGSFGEGERQ',
          "amount": 950,
          "date": "2024-12-03",
          "studentId": "STU1005"
        },
        {
          "id": 'SFSERHSRGERGWGRE',
          "amount": 650,
          "date": "2024-12-04",
          "studentId": "STU1006"
        },
        {
          "id": 'BK2SEFEGS024',
          "amount": 400,
          "date": "2024-12-04",
          "studentId": "STU1007"
        },
        {
          "id": 'BK202FEEWEEWFEW48',
          "amount": 1100,
          "date": "2024-12-05",
          "studentId": "STU1008"
        },
        {
          "id": 'BK20249',
          "amount": 300,
          "date": "2024-12-05",
          "studentId": "STU1009"
        },
        {
          "id": 'BK202410',
          "amount": 1500,
          "date": "2024-12-06",
          "studentId": "STU1010"
        }
      
      
  ]
  



const Sales = () => {
  



    

    

  return (
  <>
    <ScrollView style={styles.container} contentContainerStyle={{paddingBottom:30}}>
{saleData.map((data,index) => {
  return(
<View style={styles.list} key={index}>

<View style={{flexDirection:'column',justifyContent:'space-between',paddingTop:5,marginHorizontal:15,marginVertical:8,position:'relative',left:25}}>
<Text style={{fontSize:18,color:'#58a8f9'}}>{data.studentId}</Text>

  <Text style={{fontSize:11, color:'grey',fontWeight:'400'}}>Amount: {data.amount}</Text>
<Text style={{fontSize:11,color:'grey',fontWeight:'400'}}>ID:  {data.id}</Text>

  <Text style={{fontSize:11, color:'grey',fontWeight:'400'}}>Date: {data.date}</Text>
</View>

<Image style={{ width:30,height:30,position:'absolute',right:53,top:30}} source={require('../../../assets/images/images/eye.png')}/>


</View>
  )
})}


    </ScrollView>


</>
  )
}


const styles = StyleSheet.create({
    
container : {
    flex:1,
    backgroundColor:'white'
},
list:{
  width:'85%',
  maxHeight:140,
  height:'auto',
  borderRadius:10,
  elevation:4,
  alignSelf:'center',
  backgroundColor:'white',
  marginVertical:10,
  borderWidth:0.3,
  borderColor:'grey'

},


})





export default Sales