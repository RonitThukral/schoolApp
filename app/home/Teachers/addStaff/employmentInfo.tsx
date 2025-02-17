import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Feather from '@expo/vector-icons/Feather';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { UserDetailsType } from './params.types';

const dummyData = {
  staffrole: [
    { label: "Teacher", value: "Teacher" },
    { label: "Senior Teacher", value: "Senior Teacher" },
  ],
  Deaparments: [
    { label: "Academics", value: "Academics" },
  ],
  Campuses: [
    { label: "Roses N lilies Highschool", value: "6699e8006c787309e0acaf35" },
    { label: "National Institute of Technology", value: "66b489ed47f2d08490b54b7c" },
    { label: "Lord Krishna Branch", value: "66b48a3047f2d08490b54b94" },
    { label: "Silver Stone Branch", value: "66b48a1247f2d08490b54b90" },
    { label: "AV Pratap", value: "6767c91cc22b976eacd32950" },
  ],
  Bank: [
    { label: "Hdfc Bank", value: "Hdfc Bank" },
    { label: "Idfc Bank", value: "Idfc Bank" },
    { label: "Axis Bank", value: "Axis Bank" },
    { label: "Kotak Mahindra Bank", value: "Kotak Mahindra Bank" },
    { label: "SBI Bank", value: "SBI Bank" },
    { label: "Axis Bank", value: "Axis Bank" },
    { label: "Punjab National Bank", value: "Punjab National Bank" },
    { label: "Yes Bank", value: "Yes Bank" },
    { label: "Bank Of Baroda", value: "Bank Of Baroda" },
    { label: "Indusland Bank", value: "Indusland Bank" },
    { label: "Canara Bank", value: "Canara Bank" },
    { label: "ICICI", value: "ICICI" },
  ],


};

const academicInfo = () => {
  const params = useLocalSearchParams();
  const userpersonaldetails: UserDetailsType = JSON.parse(params.userdetails as string);


  const [date, setDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [userdetails, setuserdetails] = useState<UserDetailsType>(userpersonaldetails);

  const router = useRouter();

  const handleDate = () => {
    setOpenCalendar(true);
  };


  const onDateChange = (params: any) => {
    const selectedDate = dayjs(params.date).format('YYYY-MM-DD'); // Format the date
    handleTextInputChange(selectedDate, "employmentDate");
    setOpenCalendar(false); // Close the calendar
  };

  const handlePrevious = () => {
    router.back()
  }
  const handleNext = () => {
    router.navigate({
      pathname: './contactDetails',
      params: {
        userdetails: JSON.stringify(userdetails),
        profilepicturebase64: params.profilepicturebase64,
      }
    })
  }

  const handleTextInputChange = (text: string, label: string) => setuserdetails((olddata) => {
    return {
      ...olddata,
      [label]: text,
    }
  });


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }} >
          {/* <Text style={{ position: 'relative', top: 50, left: 40, fontSize: 22, fontWeight: '600', marginVertical: 0 }}>Employment Information</Text> */}

          <View style={styles.container}>

            <Dropdown
              style={[styles.dropdown,]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //   inputSearchStyle={styles.inputSearchStyle}
              data={dummyData.staffrole}
              //   search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Staff Role'}
              searchPlaceholder="Search..."
              onChange={(item) => handleTextInputChange(item.value, "position")}
            />
            <Dropdown
              style={[styles.dropdown,]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //   inputSearchStyle={styles.inputSearchStyle}
              data={dummyData.Deaparments}
              //   search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Department'}
              searchPlaceholder="Search..."
              onChange={(item) => handleTextInputChange(item.value, "department")}
            />
            <Dropdown
              style={[styles.dropdown,]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //   inputSearchStyle={styles.inputSearchStyle}
              data={dummyData.Campuses}
              //   search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Campus'}
              searchPlaceholder="Search..."
              onChange={(item) => handleTextInputChange(item.value, "campusID")}
            />

            {openCalendar && (
              <View style={styles.calendarContainer}>
                <DateTimePicker
                  mode="single"
                  date={date.toDate()} // Pass date as a JavaScript Date object
                  onChange={onDateChange} // Handle date selection
                />
              </View>
            )}


            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
              <TextInput
                style={styles.dateInput}
                placeholder="Date of Employment"
                value={userdetails.employmentDate ?? ""} // Display the formatted date
                editable={false} // Read-only input
              />
              <TouchableOpacity style={{ position: 'absolute', left: '80%', top: '25%' }} onPress={() => { handleDate() }}>
                <Image source={require('../../../../assets/images/images/Frame.png')} />
              </TouchableOpacity>
            </View>

            <Dropdown
              style={[styles.dropdown,]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              //   inputSearchStyle={styles.inputSearchStyle}
              data={dummyData.Bank}
              //   search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={'Bank'}
              searchPlaceholder="Search..."
              onChange={(item) => handleTextInputChange(item.value, "bank")}
            />

            <TextInput onChangeText={(text) => handleTextInputChange(text, "accountNumber")} style={styles.input} placeholderTextColor={'grey'} placeholder="Account Number" />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "qualifications")} style={styles.input} placeholderTextColor={'grey'} placeholder="Qualification" />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "salary")} style={styles.input} placeholderTextColor={'grey'} placeholder="Basic Salary" keyboardType='numeric' />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "allowance")} style={styles.input} placeholderTextColor={'grey'} placeholder="Allowance" keyboardType='numeric' />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "years")} style={styles.input} placeholderTextColor={'grey'} placeholder="Year Of Experience" keyboardType='numeric' />
          </View>

          <View style={{ flex: 1, flexDirection: 'row', position: 'relative', paddingVertical: 120, width: "80%", justifyContent: 'space-between', alignSelf: 'center', bottom: 1 }}>
            <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
              <Text style={{ alignSelf: 'center', position: 'relative', color: '#58A8F9' }}>Previous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleNext} >
              <Text style={{ alignSelf: 'center', position: 'relative', color: 'white' }}>Next</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView >
    </SafeAreaView>
  )
}


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
  calendarContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // backgroundColor: 'blue',
    width: '80%',
    height: 350,
    alignSelf: 'center',
    borderRadius: 15,
    zIndex: 1000,
    position: 'absolute',
    bottom: "37%",
    paddingVertical: 15
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
  dateInput: {
    backgroundColor: '#DAEDFF',
    // backgroundColor: 'green',
    width: '80%',
    height: 50,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 25,
    marginBottom: 15
  },
  container: {
    position: 'relative',
    top: 60,
    // backgroundColor:'red'
  },
  dropdown: {
    height: 50,
    width: "80%",
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#DAEDFF',
    marginBottom: 15,
    alignSelf: 'center'
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'transparent',
    left: 45,
    top: 5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
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
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  button: {
    width: 110,
    height: 35,
    backgroundColor: '#58A8F9',
    // position:'absolute',
    // right:20,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',

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
})

export default academicInfo