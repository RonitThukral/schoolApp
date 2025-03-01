import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import axios from 'axios';

const baseUrl = 'https://api.dreameducation.org.in/api'


const dummyData = {
  paymentType: [
    { label: "CASH", value: "Cash" },
    { label: "CHEQUE", value: "Cheque" },
    { label: "BANK DEPOSIT", value: "Bank Deposit" },
    { label: "OTHER", value: "Other" },
  ],
};

const index = () => {
  const { studentId, term, year } = useLocalSearchParams();
//   console.log(studentId);
//   console.log(term);
//   console.log(year);

  const [selectedType, setSelectedType] = useState(null);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [loadingPayment, setLoadingPayment] = useState(false);

  const handlePayment = async () => {
    if (!amount.trim() || !selectedType || !remarks.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    setLoadingPayment(true);

    try {
      const response = await axios.post(`${baseUrl}/nonbillpayment/create`, {
        amount,
        bank: selectedType === 'Cheque' ? 'Bank Name' : '',  // Adjust logic for bank if necessary
        chequeNum: selectedType === 'Cheque' ? 'Cheque Number' : '',  // Adjust logic for cheque number if needed
        year,
        student: studentId,
        term,
        paymentType: selectedType,
        remarks,
      });

      setLoadingPayment(false);

      if (response.data.error) {
        return Alert.alert('Error', response.data.error);
      }

      Alert.alert('Success', 'Payment recorded successfully');

      router.back()
      router.back()
    } catch (error) {
      setLoadingPayment(false);
      console.error('Payment error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
        <View style={styles.profileSection}>
          <Text style={{ position: 'relative', right: 45, fontSize: 22, fontWeight: '600', marginVertical: 0, paddingTop: 45 }}>
            Payment Information
          </Text>
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor={'grey'}
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'grey'}
            placeholder="Academic Year"
            value={year}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholderTextColor={'grey'}
            placeholder="Term"
            value={term}
            editable={false}
          />

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            data={dummyData.paymentType}
            search={false}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={'Select Payment Type'}
            value={selectedType}
            onChange={(item) => setSelectedType(item.value)}
          />

          <TextInput
            style={styles.areaInputPost}
            placeholderTextColor={'grey'}
            placeholder="Remarks"
            numberOfLines={3}
            multiline
            textAlignVertical="top"
            value={remarks}
            onChangeText={setRemarks}
          />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', position: 'relative', paddingVertical: 30, width: '80%', justifyContent: 'flex-end', alignSelf: 'center', bottom: 1 }}>
          <TouchableOpacity style={styles.button} onPress={handlePayment} disabled={loadingPayment}>
            <Text style={{ alignSelf: 'center', position: 'relative', color: 'white' }}>
              {loadingPayment ? 'Processing...' : 'Record Pay'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index

const styles = StyleSheet.create({
    profileSection: {
        position: 'relative',
        top: 25,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 15,
        paddingVertical: 16,
        // backgroundColor:'red'
      },
      avatarContainer: {
        position: 'relative',
        right: 15,
        top: 25,
      },
      avatar: {
        width: 100,
        height: 100,
        borderRadius: 100,
        backgroundColor: '#DDD',
      },
      verifiedBadge: {
        position: 'absolute',
        top: 0,
        left: 70,
        backgroundColor: '#58A8F9',
        borderRadius: 100,
        width: 35,
        height: 35,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
      },
      input: {
        width: '80%',
        height: 50,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
      },
      areaInputResi: {
        width: '80%',
        height: 100,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
        // paddingBottom:70
      },
      areaInputPost: {
        width: '80%',
        height: 90,
        backgroundColor: '#DAEDFF',
        // backgroundColor: 'red',
        marginBottom: 15,
        borderRadius: 10,
        alignSelf: 'center',
        paddingHorizontal: 25,
        // paddingBottom:60

      },
      container:{
        marginVertical:20
       },
       button: {
        width:110,
        height:35,
        backgroundColor: '#58A8F9',
        // position:'absolute',
        // right:20,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
        
      },
      previous:{
        width:110,
        height:35,
        backgroundColor: 'transparent',
        // position:'absolute',
        // left:50,
        borderRadius:20,
        justifyContent:'center',
        alignSelf:'flex-end',
        borderColor:"#58A8F9",
        borderWidth:1
      },

      dropdown: {
        height: 50,
        width: '80%',
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: '#daedff',
        marginBottom: 15,
        alignSelf: 'center',
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
      placeholderStyle: {
        fontSize: 15,
        color: 'grey',
        paddingHorizontal: 15
      },
      selectedTextStyle: {
        fontSize: 16,
        paddingHorizontal: 15
      },

})