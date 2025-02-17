import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput, TouchableOpacity, Image, KeyboardAvoidingView } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { UserDetailsType } from './params.types';

const genderdata = ["Male", "Female", "Others"].map(gender => {
  return {
    label: gender,
    value: gender,
  }
});

const titledata = ["Mr", "Mrs", "Ms", "Dr", "Prof"].map((title) => {
  return {
    label: title,
    value: title.toLowerCase(),
  }
});

const AddStudent = () => {

  const router = useRouter();

  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [date, setDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);

  const [userprofiledata, setuserprofiledata] = useState({});

  const handleFocus = (id: string) => {
    setIsFocus(id);
  };

  const handleBlur = () => {
    setIsFocus(null);
  };

  const handleDate = () => {
    setOpenCalendar(true);
  };

  const onDateChange = (params: any) => {
    const selectedDate = dayjs(params.date).format('YYYY-MM-DD'); // Format the date
    handleTextInputChange(selectedDate, "dateofBirth");
    setOpenCalendar(false); // Close the calendar
  };

  const handleNext = () => {
    router.navigate({
      pathname: './employmentInfo',
      params: {
        userdetails: JSON.stringify(
          userprofiledata,
        ),
        profilepicturebase64: "",
      }
    });
  }

  const handleTextInputChange = (text: string, label: string) => setuserprofiledata((olddata) => {
    return {
      ...olddata,
      [label]: text,
    }
  });

  return (
    <KeyboardAvoidingView >
      <SafeAreaView>
        <ScrollView style={{ backgroundColor: '#FFFFFF' }} contentContainerStyle={{ paddingBottom: 20 }}>
          {/* header view */}
          <View>
            <View style={styles.profileSection}>
              <View style={styles.avatarContainer}>
                <Image
                  source={require('../../../../assets/images/images/emptyAvatar.png')} // Add your placeholder image
                  style={styles.avatar}
                />
                <View style={styles.verifiedBadge}>
                  <Feather name="camera" size={20} color="white" />
                </View>
              </View>
            </View>
          </View>
          {/* <Text style={{ position: 'absolute', top: 210, left: 40, fontSize: 22, fontWeight: '600', marginVertical: 5 }}>Personal Information</Text> */}

          <View style={styles.container}>


            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={titledata}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Title*"
              onFocus={() => handleFocus('student')}
              onBlur={handleBlur}
              onChange={(item) => handleTextInputChange(item.value, "title")}
            />

            <TextInput onChangeText={(text) => handleTextInputChange(text, "name")} style={styles.input} placeholderTextColor={'grey'} placeholder="First Name*" />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "middleName")} style={styles.input} placeholderTextColor={'grey'} placeholder="Middle Name" />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "surname")} style={styles.input} placeholderTextColor={'grey'} placeholder="Last Name*" />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "nationality")} style={styles.input} placeholderTextColor={'grey'} placeholder="Category" />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "religion")} style={styles.input} placeholderTextColor={'grey'} placeholder="Caste" />
            <TextInput onChangeText={(text) => handleTextInputChange(text, "email")} style={styles.input} placeholderTextColor={'grey'} placeholder="Email*" />

            {/* Date of Admission */}
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
              <TextInput
                style={styles.dateInput}
                placeholder="Date of Birth*"
                placeholderTextColor={'grey'}
                value={(userprofiledata as UserDetailsType).dateofBirth ?? ""} // Display the formatted date
                editable={false} // Read-only input
              />
              <TouchableOpacity style={{ position: 'absolute', left: '80%', top: '25%' }} onPress={() => { handleDate() }}>
                <Image source={require('../../../../assets/images/images/Frame.png')} />
              </TouchableOpacity>
            </View>

            {openCalendar && (
              <View style={[styles.calendarContainer]}>
                <DateTimePicker
                  mode="single"
                  date={date.toDate()} // Pass date as a JavaScript Date object
                  onChange={onDateChange} // Handle date selection
                />
              </View>
            )}


            {/* Dropdown */}
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={genderdata}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Gender"
              onFocus={() => handleFocus('student')}
              onBlur={handleBlur}
              onChange={(item) => handleTextInputChange(item.value, "gender")}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={{ alignSelf: 'center', position: 'relative', color: 'white' }}>Next</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 60,
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
  calendarContainer1: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    // backgroundColor: 'blue',
    width: '80%',
    height: 350,
    alignSelf: 'center',
    borderRadius: 15,
    zIndex: 1000,
    position: 'absolute',
    top: "20%",
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
  },
  profileSection: {
    position: 'relative',
    top: 25,
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 25,
    padding: 16,
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
  dropdown: {
    height: 50,
    width: '80%',
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: '#DAEDFF',
    marginBottom: 15,
    marginTop: 15,
    alignSelf: 'center',
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
    paddingHorizontal: 15,
  },
  selectedTextStyle: {
    fontSize: 16,
    paddingHorizontal: 15,

  },
  button: {
    width: 110,
    height: 35,
    backgroundColor: '#58A8F9',
    position: 'absolute',
    bottom: 40,
    right: 50,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',

  }
});

export default AddStudent;
