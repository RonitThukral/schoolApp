// import React from "react";
// import { View, Text, StyleSheet, ScrollView, ImageBackground, TouchableOpacity } from "react-native";
// import AntDesign from '@expo/vector-icons/AntDesign';//@ts-ignore
// import { Dimensions } from "react-native";
// import { useRouter } from "expo-router";

// const { width } = Dimensions.get("window");

// export default function Finance() {
//   // const dataStudents = [
//   //   {
//   //     key: 1,
//   //     value: 10,
//   //     svg: { fill: "#4A90E2" }, // Male (Blue)
//   //   },
//   //   {
//   //     key: 2,
//   //     value: 5,
//   //     svg: { fill: "#F5A623" }, // Female (Orange)
//   //   },
//   // ];
//   // const dataStaff = [
//   //   {
//   //     key: 1,
//   //     value: 20,
//   //     svg: { fill: "#4A90E2" }, // Male (Blue)
//   //   },
//   //   {
//   //     key: 2,
//   //     value: 12,
//   //     svg: { fill: "#F5A623" }, // Female (Orange)
//   //   },
//   // ];

//   // const totalStaff = dataStaff.reduce((sum, item) => sum + item.value, 0);
//   // const totalStudents = dataStudents.reduce((sum, item) => sum + item.value, 0);

// const router = useRouter()


// const handlePress = (link) => {
//   if(link === 'i') {
//     router.navigate('/home/Reports/incomeReport/index')
//   }else if(link === 'e') {
//     router.navigate('/home/Reports/expenditureReport/index')

//   }else if(link === 'd') {
//     router.navigate('/home/Reports/debtorsReport/index')

//   }else if(link === 'n') {
//     router.navigate('/home/Reports/nonBillPaymentReport/index')

//   }else {
//     router.navigate('/home/Reports/billPaymentReport/index')

//   }
// }

//   return (
//     <ScrollView style={styles.container1}>
      
// <TouchableOpacity style={styles.list} onPress={() => handlePress('b')}> 
//   <Text style={styles.text}>Bill Payment Reminder</Text>
//   <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
// </TouchableOpacity>
// <View style={styles.ruler}></View>
    
// <TouchableOpacity style={styles.list} onPress={() => handlePress('n')}> 
//   <Text style={styles.text}>Non-Bill Payment Report</Text>
//   <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
// </TouchableOpacity>
// <View style={styles.ruler}></View>
    
// <TouchableOpacity style={styles.list} onPress={() => handlePress('e')}> 
//   <Text style={styles.text}>Expenditure Report</Text>
//   <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
// </TouchableOpacity>
// <View style={styles.ruler}></View>
    
// <TouchableOpacity style={styles.list} onPress={() => handlePress('i')}> 
//   <Text style={styles.text}>Supplementry Income Report</Text>
//   <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
// </TouchableOpacity>
// <View style={styles.ruler}></View>
    
// {/* <View style={styles.list}> 
//   <Text style={styles.text}>Students Payment History</Text>
//   <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
// </View>
// <View style={styles.ruler}></View> */}
    
// {/* <View style={styles.list}> 
//   <Text style={styles.text}>Class Ledger Report</Text>
//   <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
// </View>
// <View style={styles.ruler}></View> */}
    
// <TouchableOpacity style={styles.list} onPress={() => handlePress(d)}> 
//   <Text style={styles.text}>Debtors Report</Text>
//   <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon}/>
// </TouchableOpacity>
// <View style={styles.ruler}></View>
    
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container1: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingTop: 30,
    
//   }, 
//   list: {
//     width:'80%',
//     flex:1, 
//     flexDirection:'row',
//     justifyContent:'space-between',
//     position:'relative',
//     left:40
//   },
//   icon:{
//     position:'relative',
//     right:10,
//     top:10
//   },
//   text:{
//     fontSize:20,
//     color:'#58a8f9',
//     width:'86%'
//   },
//   ruler:{
//     width:'85%', 
//     borderBottomWidth:0.5, 
//     borderBottomColor: 'grey', 
//     height:1,
//     marginVertical:10 ,
//     alignSelf:'center'
//   }
// });





import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Dimensions } from "react-native";
import { useRouter } from "expo-router";

const { width } = Dimensions.get("window");

export default function Finance() {
  const router = useRouter();

  const handlePress = (link) => {
    if (link === 'i') {
      router.push('/home/Reports/incomeReport');
    } else if (link === 'e') {
      router.push('/home/Reports/expenditureReport');
    } else if (link === 'd') {
      router.push('/home/Reports/debtorsReport');
    } else if (link === 'n') {
      router.push('/home/Reports/nonBillPaymentReport');
    } else {
      router.push('/home/Reports/billPaymentReport');
    }
  };

  return (
    <ScrollView style={styles.container1}>
      <TouchableOpacity style={styles.list} onPress={() => handlePress('b')}>
        <Text style={styles.text}>Fee Payment Report</Text>
        <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.ruler}></View>

      <TouchableOpacity style={styles.list} onPress={() => handlePress('n')}>
        <Text style={styles.text}>Non-Bill Payment Report</Text>
        <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.ruler}></View>

      <TouchableOpacity style={styles.list} onPress={() => handlePress('e')}>
        <Text style={styles.text}>Expenditure Report</Text>
        <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.ruler}></View>

      <TouchableOpacity style={styles.list} onPress={() => handlePress('i')}>
        <Text style={styles.text}>Income Report</Text>
        <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.ruler}></View>

      <TouchableOpacity style={styles.list} onPress={() => handlePress('d')}>
        <Text style={styles.text}>Debtors Report</Text>
        <AntDesign name="right" size={22} color="#58a8f9" style={styles.icon} />
      </TouchableOpacity>
      <View style={styles.ruler}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container1: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 30,
  },
  list: {
    width: '80%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'relative',
    left: 40,
  },
  icon: {
    position: 'relative',
    right: 10,
    top: 10,
  },
  text: {
    fontSize: 20,
    color: '#58a8f9',
    width: '86%',
  },
  ruler: {
    width: '85%',
    borderBottomWidth: 0.5,
    borderBottomColor: 'grey',
    height: 1,
    marginVertical: 10,
    alignSelf: 'center',
  },
});