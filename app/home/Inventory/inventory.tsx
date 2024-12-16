import { StyleSheet, Text, View,ScrollView,Image,TouchableOpacity,TextInput } from 'react-native'
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react'
import { useState } from 'react';

const storeData = [
    {
      "id": 1,
      "name": "School Uniform - Boys",
      "units": "set",
      "description": "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aliquid inventore modi vel dolorum perferendis. Maxime labore non soluta minima obcaecati sunt id nihil dignissimos.",
      "price": 500,
      "quantity": 50
    },
    {
      "id": 2,
      "name": "School Uniform - Girls",
      "units": "set",
      "description": "Girls' formal school uniform (shirt and skirt)",
      "price": 500,
      "quantity": 50
    },
    {
      "id": 3,
      "name": "School Shoes",
      "units": "pair",
      "description": "Black formal shoes with lace for school uniform",
      "price": 300,
      "quantity": 100
    },
    {
      "id": 4,
      "name": "Sports Shoes",
      "units": "pair",
      "description": "White sports shoes for physical education classes",
      "price": 400,
      "quantity": 80
    },
    {
      "id": 5,
      "name": "School Bag",
      "units": "piece",
      "description": "Ergonomic school bag with multiple compartments",
      "price": 800,
      "quantity": 30
    },
    {
      "id": 6,
      "name": "Water Bottle",
      "units": "piece",
      "description": "750ml insulated stainless steel water bottle",
      "price": 200,
      "quantity": 150
    },
    {
      "id": 7,
      "name": "Geometry Box",
      "units": "piece",
      "description": "Complete geometry set with ruler, compass, and protractor",
      "price": 150,
      "quantity": 120
    },
    {
      "id": 8,
      "name": "Notebook Pack",
      "units": "pack",
      "description": "Pack of 5 ruled notebooks (200 pages each)",
      "price": 250,
      "quantity": 200
    },
    {
      "id": 9,
      "name": "Textbooks",
      "units": "set",
      "description": "Complete set of textbooks for the academic year",
      "price": 1200,
      "quantity": 40
    },
    {
      "id": 10,
      "name": "Drawing Kit",
      "units": "set",
      "description": "Drawing kit with sketch pens, crayons, and markers",
      "price": 300,
      "quantity": 60
    }
  ]
  



const Inventory = () => {
    const[description,setDescription] = useState('')
    const[name,setName] = useState('')
    const[units,setUnits] = useState('')
    const[price,setPrice] = useState('')
    const[quantity,setQuantity] = useState('')
    const[allItems,setAllItems] = useState([...storeData])
    const[filteredItems,setFilteredItems] = useState(storeData)

    const [isOpen, setIsOpen] = useState(false)


    const handlePlus = () => {
        setIsOpen(true)
    }
    const handleClose = () => {
        setIsOpen(false),
        setName('');
        setPrice('');
        setDescription('');
        setQuantity('');
    }

    const handleName = (text) => {
        setName(text)
    }    
    const handleDescription = (text) => {
        setDescription(text)
    }    
    const handleUnits = (text) => {
        setUnits(text)
    }    
    const handlePrice = (text) => {
        setPrice(text)
    }    
    const handleQuantity = (text) => {
        setQuantity(text)
    }    


    const handleAdd = () => {
        const newItem = {
            id: Math.random().toString(),
            name,
            description,
            price,
            quantity
        };
    
        const updatedInventory = [...allItems, newItem];
        setAllItems(updatedInventory);
        setFilteredItems(updatedInventory); // Update the filtered notices as well
        
        // Clear input fields
        setName('');
        setPrice('');
        setDescription('');
        setQuantity('');
        setIsOpen(false);
    };

  return (
  <>
    <ScrollView style={styles.container}>
{filteredItems.map((data,index) => {
  return(
<View style={styles.list} key={index}>

<View style={{flexDirection:'row',justifyContent:'space-between',paddingTop:5,marginHorizontal:15}}>
<Text style={{fontSize:20,color:'#58a8f9'}}>{data.name}</Text>

<View style={{flexDirection:'row',paddingTop:5}}>

<Image style={{marginRight:25}} source={require('../../../assets/images/images/edit.png')}/>
<Image source={require('../../../assets/images/images/delete.png')}/>
</View>
</View>

<Text style={{width:'90%',fontSize:11,marginLeft:20,color:'grey',fontWeight:'500'}}>{data.description}</Text>


<View style={{flexDirection:'row' , justifyContent:'space-between',marginVertical:5,marginHorizontal:23}}>
  <Text style={{fontSize:13}}>Price: {data.price}</Text>
  <Text style={{fontSize:13}}>Quantity: {data.quantity}</Text>
</View>


</View>
  )
})}


    </ScrollView>

<TouchableOpacity style={{width:80, height:80, backgroundColor:'#58A8F9', zIndex:90000, position:'absolute', borderRadius:100, bottom:100, justifyContent:'center',alignSelf:'flex-end',right:40,alignItems:'center'}} onPress={handlePlus}>
<Entypo name="plus" size={40} color="white" />
</TouchableOpacity>

{isOpen && <View style={styles.inputContainer}>
        <Text style={{fontSize:24,position:'absolute',alignSelf:'flex-start',paddingHorizontal:25,paddingVertical:5,top:15}}>{'Add Notice'}</Text>

    <TextInput style={styles.input} placeholder={"Name"} onChangeText={handleName} value={name}/>

    <TextInput style={styles.inputDesc} placeholder={"Add Description"} multiline = {true} textAlignVertical='top'  onChangeText={handleDescription} value={description}/>

    <TextInput style={styles.input} placeholder={"Units (e.g kg)"} onChangeText={handleUnits} value={units} />
    <TextInput style={styles.input} placeholder={"Price"} onChangeText={handlePrice} value={price} />
    <TextInput style={styles.input} placeholder={"Quantity"} onChangeText={handleQuantity} value={quantity} />

    <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
    <Text style={{color:'#58A8F9',fontSize:16}}>Cancel</Text>
    </TouchableOpacity>
    <TouchableOpacity style={styles.buttons} >
    <Text style={{color:'white',fontSize:16, textAlign:'center'}} onPress={handleAdd}>Add</Text>
    </TouchableOpacity>

</View>}
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
  marginVertical:10

},
input: {
    width: '80%',
    height: 45,
    backgroundColor: '#DAEDFF',
    // backgroundColor: 'red',
    // marginBottom: 10,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 25,
    marginVertical:3
  },
  inputDesc:{
    width: '80%',
    height: 100,
    backgroundColor: '#DAEDFF',
    // backgroundColor: 'red',
    marginBottom: 5,
    marginTop: 5,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  inputContainer:{
    position:'absolute',
    width:'85%',
    height:450,
    backgroundColor:'white',
    // backgroundColor:'red',
    borderRadius:10,
    justifyContent:'center',
    alignSelf:'center',
    flexDirection:'column',
    top:0,
    zIndex:900000,
// marginVertical:15
  },
  buttons:{
    width:80,
    height:30,
    backgroundColor: '#58A8F9',
    position:'absolute',
    bottom:13,
    right:25,
    borderRadius:20,
    justifyContent:'center',
    alignSelf:'flex-end',
      },

    closeBtn:{
    position:'absolute',
    bottom:15,
    left:150,
    borderRadius:20,
    justifyContent:'center',
    alignSelf:'flex-end',
      }

})





export default Inventory