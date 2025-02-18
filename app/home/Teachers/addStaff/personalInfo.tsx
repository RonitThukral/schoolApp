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

type ContactDeatialsErrorType = {
  name?: string,
  surname?: string,
  email?: string,
  title?: string,
  dateofBirth?: string,
};

const AddStudent = () => {

  const router = useRouter();

  const [isFocus, setIsFocus] = useState<string | null>(null);
  const [date, setDate] = useState(dayjs());
  const [openCalendar, setOpenCalendar] = useState(false);

  const [userprofiledata, setuserprofiledata] = useState({});
  const [errors, setErrors] = useState<ContactDeatialsErrorType>({});

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

    const userdetails = userprofiledata as UserDetailsType;
    const newErrors = {
      name: userdetails.name ? undefined : 'First name is required.',
      surname: userdetails.surname ? undefined : 'Last name is required.',
      email: userdetails.email ? undefined : 'Email is required.',
      title: userdetails.title ? undefined : 'Title is required.',
      dateofBirth: userdetails.dateofBirth ? undefined : 'Date of Birth is required.',
    };

    setErrors(newErrors);


    if (userdetails.name && userdetails.surname && userdetails.email && userdetails.title) {
      router.navigate({
        pathname: './employmentInfo',
        params: {
          userdetails: JSON.stringify(userprofiledata),
          profilepicturebase64: "",
        },
      });
    }
  };

  const handleTextInputChange = (text: string, label: string) => setuserprofiledata((olddata) => {
    return {
      ...olddata,
      [label]: text,
    }
  });

  return (
    <KeyboardAvoidingView style={styles.container}>
      <SafeAreaView>
        <ScrollView style={{ paddingHorizontal: 25 }} contentContainerStyle={{ rowGap: 15, paddingBottom: 40, }}>
          {/* header view */}

          <View style={styles.profileSection}>
            <View>
              <Image
                source={require('../../../../assets/images/images/emptyAvatar.png')} // Add your placeholder image
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Feather name="camera" size={20} color="white" />
              </View>
            </View>
          </View>
          {/* <Text style={{ position: 'absolute', top: 210, left: 40, fontSize: 22, fontWeight: '600', marginVertical: 5 }}>Personal Information</Text> */}



          <Dropdown
            style={[styles.input, styles.dropdown]}
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
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}


          <TextInput onChangeText={(text) => handleTextInputChange(text, "name")} style={styles.input} placeholderTextColor={'grey'} placeholder="First Name*" />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          <TextInput onChangeText={(text) => handleTextInputChange(text, "middleName")} style={styles.input} placeholderTextColor={'grey'} placeholder="Middle Name" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "surname")} style={styles.input} placeholderTextColor={'grey'} placeholder="Last Name*" />
          {errors.surname && <Text style={styles.errorText}>{errors.surname}</Text>}
          <TextInput onChangeText={(text) => handleTextInputChange(text, "nationality")} style={styles.input} placeholderTextColor={'grey'} placeholder="Category" />

          <TextInput onChangeText={(text) => handleTextInputChange(text, "religion")} style={styles.input} placeholderTextColor={'grey'} placeholder="Caste" />
          <TextInput onChangeText={(text) => handleTextInputChange(text, "email")} style={styles.input} placeholderTextColor={'grey'} placeholder="Email*" />
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          {/* Date of Admission */}
          <View style={[styles.input, styles.dateInputContainer]}>
            <TextInput
              style={[styles.dateInput]}
              placeholder="Date of Birth*"
              placeholderTextColor={'grey'}
              value={(userprofiledata as UserDetailsType).dateofBirth ?? ""} // Display the formatted date
              editable={false} // Read-only input
            />
            <TouchableOpacity style={styles.dateInputIcon} onPress={() => { handleDate() }}>
              <Image source={require('../../../../assets/images/images/Frame.png')} />
            </TouchableOpacity>
          </View>
          {errors.dateofBirth && <Text style={styles.errorText}>{errors.dateofBirth}</Text>}

          {openCalendar && (
            <SafeAreaView style={[styles.calendarContainer]}>
              <View style={styles.calenderInnerContainer}>
                <DateTimePicker
                  mode="single"
                  date={date.toDate()} // Pass date as a JavaScript Date object
                  onChange={onDateChange} // Handle date selection
                />
              </View>
            </SafeAreaView>
          )}


          {/* Dropdown */}
          <Dropdown
            style={[styles.input, styles.dropdown]}
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
    flex: 1,
    backgroundColor: "white",
  },
  calendarContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#F5FCFF',
    width: '80%',
    // height: 350,
    borderRadius: 15,
    zIndex: 1000,
    position: 'absolute',
    bottom: "37%",
    alignSelf: 'center',
  },
  calenderInnerContainer: {

  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#DAEDFF',
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 25,
  },
  dropdown: {

  },
  dateInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 0,
  },
  dateInput: {
    flexGrow: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
  },
  dateInputIcon: {
    paddingHorizontal: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {

    flexDirection: "row",
    marginTop: 70,
    justifyContent: "center",
    paddingVertical: 20,
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
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  button: {
    height: 35,
    backgroundColor: '#58A8F9',
    paddingHorizontal: 25,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    paddingStart: 15,
  },
});

export default AddStudent;
