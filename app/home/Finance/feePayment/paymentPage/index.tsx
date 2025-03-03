import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Dropdown } from 'react-native-element-dropdown';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import Constants from 'expo-constants';

const baseUrl = Constants.expoConfig.extra.API_URL;



const dummyData = {
  paymentType: [
    { label: "CASH", value: "Cash" },
    { label: "CHEQUE", value: "Cheque" },
    { label: "BANK DEPOSIT", value: "Bank Deposit" },
    { label: "OTHER", value: "Other" },
  ],
};

const initialTypes = {
  tuition: false,
  sports: false,
  library: false,
  transport: false,
};

const Index = () => {
  const { studentId, term, year,balance } = useLocalSearchParams();

  const [selectedType, setSelectedType] = useState(null);
  const [amount, setAmount] = useState('');
  const [remarks, setRemarks] = useState('');
  const [bank, setBank] = useState('');
  const [chequeNo, setChequeNo] = useState('');
//   const [date, setDate] = useState('');
  const [balances, setBalances] = useState(''); // Added balance state
  const [types, setTypes] = useState(initialTypes);
  const [applyToEnabled, setApplyToEnabled] = useState(true); // Controls checkbox toggling
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]); // YYYY-MM-DD format


  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (key) => {
    setApplyToEnabled(true); // Enable checkboxes on first selection
    setTypes((prevTypes) => ({
      ...prevTypes,
      [key]: !prevTypes[key],
    }));
  };
  

  const handlePayment = async () => {
    if (!amount.trim() || !selectedType || !remarks.trim() || !date.trim()) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    const selectedFees = Object.keys(types).filter((key) => types[key]);
    if (selectedFees.length === 0) {
      Alert.alert('Error', 'Please select at least one fee type.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${baseUrl}/transactions/create`, {
        date,
        amount,
        paymentMethod: selectedType,
        type: "income",
        description: remarks,
        bank: selectedType === "Cheque" ? bank : "",
        chequeNumber: selectedType === "Cheque" ? chequeNo : "",
        category: "fees",
        fees: {
          userID: studentId,
          term,
          academicYear: year,
          applyTo: selectedFees,
        },
      });

      setLoading(false);

      if (response.data.error) {
        return Alert.alert('Error', response.data.error);
      }

      Alert.alert('Success', 'Payment successfully recorded');
      router.back();
     
    } catch (error) {
      setLoading(false);
      console.error('Payment error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ backgroundColor: '#FFFFFF' }}>
        <View style={styles.profileSection}>
          <Text style={styles.title}>Payment Information</Text>
        </View>

        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder="Payment Date"
            placeholderTextColor={'grey'}
            value={date}
            onChangeText={setDate}
          />
          <TextInput
            style={styles.input}
            placeholder="Amount"
            placeholderTextColor={'grey'}
            value={amount}
            onChangeText={setAmount}
          />
          <TextInput
            style={styles.input}
            placeholder="Payment Due (Balance)"
            placeholderTextColor={'grey'}
            value={balance}
            onChangeText={setBalances}
          />
          <TextInput
            style={styles.input}
            placeholder="Academic Year"
            placeholderTextColor={'grey'}
            value={year}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Term"
            placeholderTextColor={'grey'}
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

          {selectedType === "Cheque" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Bank Name"
                placeholderTextColor={'grey'}
                value={bank}
                onChangeText={setBank}
              />
              <TextInput
                style={styles.input}
                placeholder="Cheque Number"
                placeholderTextColor={'grey'}
                value={chequeNo}
                onChangeText={setChequeNo}
              />
            </>
          )}

          <TouchableOpacity
            style={[styles.applyButton, { backgroundColor: applyToEnabled ? '#58A8F9' : '#A8A8A8' }]}
            onPress={() => setApplyToEnabled(!applyToEnabled)}

          >
            <Text style={styles.applyButtonText}>Apply Payment To</Text>
          </TouchableOpacity>

          {applyToEnabled && <><Text style={styles.subtitle}>Select Fees Type:</Text>
          <View style={{ paddingHorizontal: 80 }}>
            {Object.keys(types).map((key) => (
              <TouchableOpacity
                key={key}
                onPress={() => handleCheckboxChange(key)}
                style={styles.checkboxContainer}
              >
                <View
                  style={[
                    styles.checkbox,
                    { backgroundColor: types[key] ? '#58A8F9' : 'white' },
                  ]}
                >
                  {types[key] && <MaterialIcons name="check" size={16} color="white" />}
                </View>
                <Text style={{ fontSize: 16 }}>{key.charAt(0).toUpperCase() + key.slice(1)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          </>}

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

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePayment} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Record Pay'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
      },
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
    container: {
        marginVertical: 20
    },
    
    previous: {
        width: 110,
        height: 35,
        backgroundColor: 'transparent',
        // position:'absolute',
        // left:50,
        borderRadius: 20,
        justifyContent: 'center',
        alignSelf: 'flex-end',
        borderColor: "#58A8F9",
        borderWidth: 1
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
    applyButton: {
        width: '80%',
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 15,
      },
      applyButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
      },
      subtitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        paddingHorizontal: 25,
      },
      checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#58A8F9',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
      },
      checkboxLabel: {
        fontSize: 16,
        color: '#333',
      },
      buttonContainer: {
        alignItems: 'center',
        marginVertical: 20,
      },
      button: {
        width: '80%',
        height: 50,
        backgroundColor: '#58A8F9',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
      buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      },
});
