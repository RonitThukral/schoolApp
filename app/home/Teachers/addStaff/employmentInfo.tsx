import { View, Text,StyleSheet, SafeAreaView,ScrollView,Image,TouchableOpacity,TextInput } from 'react-native'
import React from 'react'
import { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import Feather from '@expo/vector-icons/Feather';
import { useRouter } from 'expo-router';

const dummyData = {
    class: [
      { label: "Nursery", value: "nursery" },
      { label: "Kindergarten", value: "kg" },
      { label: "Grade 1", value: "grade_1" },
      { label: "Grade 2", value: "grade_2" },
      { label: "Grade 3", value: "grade_3" },
      // Add more grades as needed
    ],
    sectionHouse: [
      { label: "Red", value: "red" },
      { label: "Blue", value: "blue" },
      { label: "Green", value: "green" },
      { label: "Yellow", value: "yellow" },
    ],
    division: [
      { label: "A", value: "A" },
      { label: "B", value: "B" },
      { label: "C", value: "C" },
      { label: "D", value: "D" },
    ],
    status: [
      { label: "Active", value: "active" },
      { label: "Inactive", value: "inactive" },
      { label: "Suspended", value: "suspended" },
    ],
    busVan: [
      { label: "Bus 1", value: "bus_1" },
      { label: "Bus 2", value: "bus_2" },
      { label: "Van 1", value: "van_1" },
      { label: "Van 2", value: "van_2" },
    ],
    scholarship: [
      { label: "None", value: "none" },
      { label: "50% Fee Waiver", value: "50_percent" },
      { label: "Full Fee Waiver", value: "full" },
    ],
    feeCategory: [
      { label: "Regular", value: "regular" },
      { label: "Discounted", value: "discounted" },
      { label: "Scholarship", value: "scholarship" },
      { label: "Scholarship1", value: "scholarship1" },
      { label: "Scholarship2", value: "scholarship2" },
      { label: "Scholarship3", value: "scholarship3" },
    ],
    campus: [
      { label: "Main Campus", value: "main" },
      { label: "East Wing", value: "east_wing" },
      { label: "West Wing", value: "west_wing" },
      { label: "West Wing", value: "west_wing" },
      { label: "West Wing", value: "west_wing" },
      { label: "West Wing", value: "west_wing" },
    ],
  };
  

const academicInfo = () => {
  const [date, setDate] = useState(dayjs());
  const [formattedDate, setFormattedDate] = useState('');
  const [openCalendar, setOpenCalendar] = useState(false);
  const [doa, setDoa] = useState('');

    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedID, setSelectedID] = useState(null);


    const router = useRouter();

   

 
    const handleDate = () => {
      setOpenCalendar(true);
    };


    const onDateChange = (params: any) => {
      const selectedDate = dayjs(params.date).format('DD-MM-YYYY'); // Format the date
      
        setDoa(selectedDate);
      
      setOpenCalendar(false); // Close the calendar
    };
   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    const handlePrevious = () => {
        router.back()
    }
    const handleNext = () => {
        router.navigate('./contactDetails')
    }


  return (
    <SafeAreaView style={{flex:1,backgroundColor:'#FFFFFF'}}>
        <ScrollView contentContainerStyle={{paddingBottom:20}} >
        
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
        <Text style={{position:'relative', top:50 , left:40, fontSize:22,fontWeight:'600', marginVertical:0}}>Employment Information</Text>

    <View style={styles.container}>
    
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.class}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Staff Role'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={dummyData.class.value}
          onChange={(item) => (item.value)}
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.sectionHouse}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Department'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={dummyData.sectionHouse.value}
          onChange={(item) => (item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.division}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Campus'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={dummyData.division.value}
          onChange={(item) => (item.value)}
       
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
              value={doa} // Display the formatted date
              editable={false} // Read-only input
            />
            <TouchableOpacity style={{ position: 'absolute', left: '80%', top: '25%' }} onPress={()=>{handleDate()}}>
              <Image source={require('../../../../assets/images/images/Frame.png')} />
            </TouchableOpacity>
          </View>

    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.status}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Bank'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={dummyData.status.value}
          onChange={(item) => (item.value)}
       
        />


         <TextInput style={styles.input} placeholder="Account Number" />
         <TextInput style={styles.input} placeholder="Qualification" />
         <TextInput style={styles.input} placeholder="Basic Salary" keyboardType='numeric' />
         <TextInput style={styles.input} placeholder="Allowance" keyboardType='numeric'/>
         <TextInput style={styles.input} placeholder="Year Of Experience" keyboardType='numeric'/>

    {/* <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.busVan}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Bus/Van'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={dummyData.busVan.value}
          onChange={(item) => (item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.scholarship}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Scolarship'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={dummyData.scholarship.value}
          onChange={(item) => (item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          dropdownPosition='top'
        //   containerStyle={styles.dropdownContainer}
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.feeCategory}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Fee Category'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={dummyData.feeCategory.value}
          onChange={(item) => (item.value)}
       
        />
    <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          dropdownPosition='top'
        //   inputSearchStyle={styles.inputSearchStyle}
          data={dummyData.campus}
        //   search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Campus'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={dummyData.campus.value}
          onChange={(item) => (item.value)}
       
        /> */}
    </View>

    <View style={{flex:1, flexDirection:'row',position:'relative',paddingVertical:120 ,width:"80%",justifyContent:'space-between',alignSelf:'center',bottom:1}}>
        <TouchableOpacity style={styles.previous} onPress={handlePrevious}>
            <Text style={{alignSelf:'center', position:'relative', color:'#58A8F9'}}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext} >
            <Text style={{alignSelf:'center', position:'relative', color:'white'}}>Next</Text>
        </TouchableOpacity>
    </View>

        </ScrollView>
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
        position:'absolute',
        bottom:"37%",
        paddingVertical:15
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
        marginBottom:15
      },
      container:{
        position:'relative',
        top:60,
        // backgroundColor:'red'
      },
      dropdown: {
        height: 50,
        width:"80%",
      //   borderColor: 'gray',
      //   borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor:'#DAEDFF',
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
    //   dropdownContainer :{
    //     position:'relative',
    //     // backgroundColor:'red',
    //     bottom: 188,
    //     height:400
    //   }

})

export default academicInfo