// import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
// import Entypo from '@expo/vector-icons/Entypo';
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// const Sales = () => {
//   const [salesData, setSalesData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);
//   const [name, setName] = useState('');
//   const [amount, setAmount] = useState('');
//   const [totalprice, setTotalPrice] = useState('');
//   const [buyitems, setBuyItems] = useState([]);

//   useEffect(() => {
//     // Fetch data from the API
//     setLoading(true);
//     axios.get('https://dreamscloudtechbackend.onrender.com/api/store/sales')
//       .then((response) => {
//         setSalesData(response.data); // Save the data in state
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error('Error fetching sales data:', error);
//         setLoading(false);
//       });
//   }, []);

//   // Handlers for input fields
//   const handleName = (text) => setName(text);
//   const handleAmount = (text) => setAmount(text);
//   const handlePrice = (text) => setTotalPrice(text);

//   // Add item logic
//   const handleAdd = () => {
//     const item = {
//       name,
//       amount: parseFloat(amount), // Amount for the sale item
//     };
    
//     setBuyItems([...buyitems, item]);
//     setAmount(item.amount); // Set amount for the sale
//     setTotalPrice(totalprice + item.amount); // Add to total price
//     resetForm(); // Reset the form fields
//   };

//   // Reset form fields after adding an item
//   const resetForm = () => {
//     setName('');
//     setAmount('');
//     setTotalPrice('');
//   };

//   // Handle open and close of the form modal
//   const handlePlus = () => setIsOpen(true);
//   const handleClose = () => setIsOpen(false);

//   // Submit the sale to the API
//   const handleSubmitSale = () => {
//     setLoading(true);
//     axios.post('https://dreamscloudtechbackend.onrender.com/api/store/sales/create', {
//       amountPaid: amount,
//       totalCost: totalprice,
//       name,
//       items: buyitems,
//       seller: 'admin',
//     })
//       .then((res) => {
//         setLoading(false);
//         if (res.data.error) {
//           alert(res.data.error);
//           return;
//         }
//         alert('Sale added successfully!');
//         resetForm();
//         setSalesData([...salesData, res.data]);
//         setIsOpen(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//         alert('Error adding sale');
//       });
//   };

//   return (
//     <>
//       <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
//         {loading ? (
//           <Text>Loading...</Text> // Display loading message while fetching data
//         ) : (
//           salesData.map((data, index) => {
//             const formattedDate = new Date(data.createdAt).toLocaleDateString(); // Format date
//             return (
//               <View style={styles.list} key={index}>
//                 <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingTop: 5, marginHorizontal: 15, marginVertical: 8, position: 'relative', left: 25 }}>
//                   <Text style={{ fontSize: 18, color: '#58a8f9' }}>{data.name}</Text>
//                   <Text style={{ fontSize: 11, color: 'grey', fontWeight: '400' }}>Amount Paid: {data.amountPaid ? data.amountPaid : 0}</Text>
//                   <Text style={{ fontSize: 11, color: 'grey', fontWeight: '400' }}>Total Cost: {data.totalCost}</Text>
//                   <Text style={{ fontSize: 11, color: 'grey', fontWeight: '400' }}>Date: {formattedDate}</Text>
//                 </View>
//                 <Image style={{ width: 30, height: 30, position: 'absolute', right: 53, top: 30 }} source={require('../../../assets/images/images/eye.png')} />
//               </View>
//             );
//           })
//         )}
//       </ScrollView>

//       {/* Form to add item */}
//       {isOpen && (
//         <View style={styles.inputContainer}>
//           <Text style={{ fontSize: 24, position: 'absolute', alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 5, top: 15 }}>
//             {'Add Item'}
//           </Text>
//           <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={"Name"} onChangeText={handleName} value={name} />
//           <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={"Amount Paid"} onChangeText={handleAmount} value={amount} keyboardType="numeric" />
//           <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={"Total Cost"} onChangeText={handlePrice} value={totalprice} keyboardType="numeric" />

//           <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
//             <Text style={{ color: '#58A8F9', fontSize: 16 }}>Cancel</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.buttons}>
//             <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }} onPress={handleAdd}>Add</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitSale}>
//             <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Submit Sale</Text>
//           </TouchableOpacity>
//         </View>
//       )}

//       {/* Floating button to open the form */}
//       <TouchableOpacity
//         style={{
//           width: 80,
//           height: 80,
//           backgroundColor: '#58A8F9',
//           zIndex: 90000,
//           position: 'absolute',
//           borderRadius: 100,
//           bottom: 100,
//           justifyContent: 'center',
//           alignSelf: 'flex-end',
//           right: 40,
//           alignItems: 'center',
//         }}
//         onPress={handlePlus}
//       >
//         <Entypo name="plus" size={40} color="white" />
//       </TouchableOpacity>

//     </>
//   );
// };




import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [totalprice, setTotalPrice] = useState(0);  // Ensure totalprice is a number
  const [buyitems, setBuyItems] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    setLoading(true);
    axios.get('https://dreamscloudtechbackend.onrender.com/api/store/sales')
      .then((response) => {
        setSalesData(response.data); // Save the data in state
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching sales data:', error);
        setLoading(false);
      });
  }, []);

  // Handlers for input fields
  const handleName = (text) => setName(text);
  const handleAmount = (text) => setAmount(text);
  const handlePrice = (text) => setTotalPrice(Number(text));  // Ensure totalprice is a number

  // Add item logic
  const handleAdd = () => {
    if (name && amount) {
      const item = {
        name,
        amount: parseFloat(amount), // Amount for the sale item
      };

      // Add item to buyitems
      setBuyItems((prevItems) => [...prevItems, item]);

      // Update the total price by adding the amount
      setTotalPrice(prevTotal => prevTotal + item.amount);

      resetForm(); // Reset the form fields
    } else {
      alert("Please provide both name and amount.");
    }
  };

  // Reset form fields after adding an item
  const resetForm = () => {
    setName('');
    setAmount('');
  };

  // Handle open and close of the form modal
  const handlePlus = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Submit the sale to the API
  const handleSubmitSale = () => {
    if (buyitems.length === 0) {
      alert('Please add at least one item.');
      return;
    }

    setLoading(true);
    axios.post('https://dreamscloudtechbackend.onrender.com/api/store/sales/create', {
      amountPaid: totalprice,  // Use the total price here
      totalCost: totalprice,   // Same for totalCost
      name: 'Sale',            // Default name or set as per your use case
      items: buyitems,
      seller: 'admin',
    })
      .then((res) => {
        setLoading(false);
        if (res.data.error) {
          alert(res.data.error);
          return;
        }
        alert('Sale added successfully!');
        setIsOpen(false);
        resetForm();
        setSalesData([...salesData, res.data]);
        setBuyItems([]);  // Clear items after submission
        setTotalPrice(0); // Reset total price after sale submission
      })
      .catch((error) => {
        setLoading(false);
        alert('Error adding sale');
      });
  };

  return (
    <>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
        {loading ? (
          <Text>Loading...</Text> // Display loading message while fetching data
        ) : (
          salesData.map((data, index) => {
            const formattedDate = new Date(data.createdAt).toLocaleDateString(); // Format date
            return (
              <View style={styles.list} key={index}>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between', paddingTop: 5, marginHorizontal: 15, marginVertical: 8, position: 'relative', left: 25 }}>
                  <Text style={{ fontSize: 18, color: '#58a8f9' }}>{data.name}</Text>
                  <Text style={{ fontSize: 11, color: 'grey', fontWeight: '400' }}>Amount Paid: {data.amountPaid ? data.amountPaid : 0}</Text>
                  <Text style={{ fontSize: 11, color: 'grey', fontWeight: '400' }}>Total Cost: {data.totalCost}</Text>
                  <Text style={{ fontSize: 11, color: 'grey', fontWeight: '400' }}>Date: {formattedDate}</Text>
                </View>
                <Image style={{ width: 30, height: 30, position: 'absolute', right: 53, top: 30 }} source={require('../../../assets/images/images/eye.png')} />
              </View>
            );
          })
        )}
      </ScrollView>

      {/* Form to add item */}
      {isOpen && (
        <View style={styles.inputContainer}>
          <Text style={{ fontSize: 24, position: 'absolute', alignSelf: 'flex-start', paddingHorizontal: 25, paddingVertical: 5, top: 15 }}>
            {'Add Item'}
          </Text>
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={"Name"} onChangeText={handleName} value={name} />
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={"Amount Paid"} onChangeText={handleAmount} value={amount} keyboardType="numeric" />
          <TextInput style={styles.input} placeholderTextColor={'grey'} placeholder={"Total Cost"} onChangeText={handlePrice} value={totalprice.toString()} keyboardType="numeric" />

          <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
            <Text style={{ color: '#58A8F9', fontSize: 16 }}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }} onPress={handleAdd}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmitSale}>
            <Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>Submit Sale</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Floating button to open the form */}
      <TouchableOpacity
        style={{
          width: 80,
          height: 80,
          backgroundColor: '#58A8F9',
          zIndex: 90000,
          position: 'absolute',
          borderRadius: 100,
          bottom: 100,
          justifyContent: 'center',
          alignSelf: 'flex-end',
          right: 40,
          alignItems: 'center',
        }}
        onPress={handlePlus}
      >
        <Entypo name="plus" size={40} color="white" />
      </TouchableOpacity>
    </>
  );
};

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
  height:300,
  backgroundColor:'white',
  // backgroundColor:'red',
  borderRadius:10,
  justifyContent:'center',
  alignSelf:'center',
  flexDirection:'column',
  top:responsiveHeight(1),
  zIndex:900000,
  elevation:8
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
  right:responsiveWidth(35),
  borderRadius:20,
  justifyContent:'center',
  alignSelf:'flex-end',
    }


})





export default Sales