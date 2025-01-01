import React, { useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,TextInput} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';


  

  const listData = [
    {
      id: "73739739753",
      name: "Deepak Kumar",
      amount: "₹5,000",
      date: "7 September 2024",
      rollNumber: "BK20246",
      class: "II-A",
      guardian: "Richa Sharma",
      paymentMethod: "Bank Deposit",
    },
    {
      id: "7373973975",
      name: "Deepak Kumar",
      amount: "₹5,000",
      date: "7 September 2024",
      rollNumber: "BK20247",
      class: "II-B",
      guardian: "Ravi Sharma",
      paymentMethod: "Bank Deposit",
    },
    {
      id: "737397397",
      name: "Deepak Kumar",
      amount: "₹5,000",
      date: "7 September 2024",
      rollNumber: "BK20248",
      class: "II-C",
      guardian: "Anita Sharma",
      paymentMethod: "Bank Deposit",
    },
    {
      id: "7373939753",
      name: "Deepak Kumar",
      amount: "₹5,000",
      date: "7 September 2024",
      rollNumber: "BK20249",
      class: "II-D",
      guardian: "Kavita Singh",
      paymentMethod: "Bank Deposit",
    },
    {
      id: "7379739753",
      name: "Deepak Kumar",
      amount: "₹5,000",
      date: "7 September 2024",
      rollNumber: "BK20250",
      class: "II-E",
      guardian: "Priya Mehta",
      paymentMethod: "Bank Deposit",
    },
    {
      id: "7339739753",
      name: "Deepak Kumar",
      amount: "₹5,000",
      date: "7 September 2024",
      rollNumber: "BK20251",
      class: "II-F",
      guardian: "Neha Sharma",
      paymentMethod: "Bank Deposit",
    },
    {
      id: "7739739753",
      name: "Deepak Kumar",
      amount: "₹5,000",
      date: "7 September 2024",
      rollNumber: "BK20252",
      class: "II-G",
      guardian: "Ajay Kumar",
      paymentMethod: "Bank Deposit",
    },
  ]



  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    const [selectedID, setSelectedID] = useState(null);
    const [selectedName, setSelectedName] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [date, setDate] = useState(dayjs());
    const [filteredClasses, setFilteredClasses] = useState(listData);
    const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
    const [dob, setDob] = useState('');


    // const router = useRouter();

   // Search Button Logic
  const handleSearch = () => {
    const filtered = listData.filter((data) => {
      return (
        (!selectedID || data.id === selectedID) &&
        (!selectedName || data.name === selectedName) &&
        (!selectedClass || data.class === selectedClass)
      );
    });
    setFilteredClasses(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    setSelectedID(null);
    setSelectedName(null);
    setSelectedClass(null);
    setFilteredClasses(listData);
    setDob('')
  };

   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

  
    const toggleSection = (id: string) => {
        setExpandedSectionId((prev) => (prev === id ? null : id));
      };
      const handleDate = (field:string) => {
        setOpenCalendar(true);
      };

      const onDateChange = (params: any) => {
        const selectedDate = dayjs(params.date).format('DD-MM-YYYY'); // Format the date
          setDob(selectedDate);
        
        setOpenCalendar(false); // Close the calendar
      };



      const InfoRow = ({ label, value}:any) => (
        <View style={styles.infoRow}>
          <Text style={styles.label}>{label}</Text>
          <View style={{width:'70%', left:20 }}>
    
          <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      );
    
      const Section = ({ id,title,subTitle,subTitle2, children }:any):any => {
          const isExpanded = expandedSectionId === id
        return(
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            onPress={() => {toggleSection(id)}}
            activeOpacity={0.7}
          >
            <Image style={{width:50,height:50,marginHorizontal:15}} source={require('../../../../assets/images/images/boy.png')}/>
            <View style={{flex:1, flexDirection:'column'}}>

            <Text style={styles.sectionTitle}>{title}</Text>
            <Text style={{color:'grey',fontSize:12}}>{subTitle}</Text>
            <Text style={{color:'grey',fontSize:11}}>{subTitle2}</Text>
            </View>
            <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#58A8F9"
            />
          </TouchableOpacity>
          {isExpanded && (
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.sectionContent}>
              {children}
            </View>
            <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image style={{width:27,height:27}} source={require('../../../../assets/images/images/eye.png')}/>

                </TouchableOpacity>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image  source={require('../../../../assets/images/images/delete.png')}/>

                </TouchableOpacity>
            </View>

            </View>
          )}
        </View>
      )};
   

    return (
        <>
      <View style={styles.container}>

        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={listData.map((data) => ({ label: data.id, value: data.id }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by ID'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedID}
          onChange={(item) => setSelectedID(item.value)}
       
        />
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={listData.map((data) => ({ label: data.name, value: data.name }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Name'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('name')}
          onBlur={handleBlur}
          value={selectedName}
          onChange={(item) => setSelectedName(item.value)}
       
        />
      
      
        <Dropdown
          style={[styles.dropdown,]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={listData.map((data) => ({ label: data.class, value: data.class }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Class'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('class')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
       
        />

<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', width: '100%' }}>
            <TextInput
              style={styles.dateInput}
              placeholder="Date of Birth"
              placeholderTextColor={'grey'}
              value={dob} // Display the formatted date
              editable={false} // Read-only input
            />
            <TouchableOpacity style={{ position: 'absolute', left: '87%',top:15 }} onPress={()=>{handleDate('dob')}}>
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

          <View style ={styles.footer}>
          <TouchableOpacity style={styles.reset} onPress={handleReset}>
            <Text  style={{color: '#58A8F9', }}>Reset</Text>
          </TouchableOpacity>
          <TouchableOpacity style ={styles.search} onPress={handleSearch}>
          <Text style={{textAlign: 'center', color:'white', fontSize: 15,paddingHorizontal:10,}}>Search</Text>
          </TouchableOpacity>
          </View>
          
      </View>


{/* List of students section */}
<ScrollView style={{marginTop: 0, marginBottom: 0, backgroundColor:'#FFFFFF'}}>

{filteredClasses.map((data, index) => {
  return (
    <Section
    key={index}
    id={data.id}
          title={data.amount}
          subTitle= {data.name}
          subTitle2={data.date}
        >
          <InfoRow label="Roll Number" value={data.rollNumber} />
          <InfoRow label="Class" value={data.class} />
          <InfoRow label="Guardian" value={data.guardian} />
          <InfoRow label="Payment Method" value={data.paymentMethod} />
          
        </Section>
  )
})}
</ScrollView>


      </>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      // backgroundColor: 'red',
      padding: 16,
      paddingBottom:120,
      paddingTop:70
    },
    dropdown: {
      height: 50,
      width:"90%",
    //   borderColor: 'gray',
    //   borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      backgroundColor:'#EEF7FF',
      marginBottom: 15,
      alignSelf: 'center'
    },
    icon: {
      marginRight: 5,
    },
    
    placeholderStyle: {
      fontSize: 15,
      color: 'grey',
      paddingHorizontal: 15
    },
    selectedTextStyle: {
      fontSize: 16,
      paddingHorizontal:15
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    
    footer :{
      flex:1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      position:'relative',
      top:70
    },
    search: {
      position:'relative',
      right:18,
      width: 100,
      height:35,
      borderRadius:15,
      backgroundColor: '#58A8F9',
      justifyContent: 'center',
    },
    reset: {
      backgroundColor:'transparent',
      width: 70,
      height: 35,
      justifyContent:'center',
      marginRight: 15
    },
    list:{
      width: "90%",
      height: 100,
      borderColor: 'grey',
      borderRadius: 10,
      // backgroundColor : 'red',
      backgroundColor : '#FFFFFF',
      justifyContent: 'space-between',
      flexDirection:'row',
      alignItems:'center',
      alignSelf:'center',
      marginBottom: 0,
      marginTop: 20
    },
    listBtns:{
        position:'absolute',
        right:30
    },
    stImg:{
      width:60,
      height:60,
      position:'absolute',
      left: 40,
      backgroundColor:'white',
      borderRadius:100
    },
    listContent:{
      flexDirection:'column',
      position: 'relative',
      left:130
    },
    section: {

        width:"80%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        //  backgroundColor: 'red',
         marginHorizontal: 16,
        marginTop: 10,
         borderRadius: 8,
         overflow: 'hidden',
         elevation: 3, // Adds shadow for Android
         shadowColor: '#000', // Adds shadow for iOS
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.1,
         shadowRadius: 3,
      },
      sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        // backgroundColor: '#F8F8F8',
        backgroundColor: 'transparent',
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color:'#58A8F9'
      },
      sectionContent: {
        padding: 16,
        width:"100%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        // backgroundColor: 'red',
        marginHorizontal: 16,
        paddingTop: 0 ,
        borderRadius: 10,
        overflow: 'hidden',
        // flexDirection:'row'
        
        // elevation: 4, // Adds shadow for Android
        // shadowColor: '#000', // Adds shadow for iOS
        // shadowOffset: { width: 0, height: 1 },
        // shadowOpacity: 0.1,
        // shadowRadius: 3,
        
      },
      
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
      },
      label: {
        fontWeight:'bold',
        color: '#666',
        fontSize: 12,
        // backgroundColor:'green',
        width:'35%'
      },
      value: {
        color:'grey',
        fontSize: 12,
        // backgroundColor:'blue'
        
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
        top:"90%",
        paddingVertical:15
      },
      
      dateInput: {
        backgroundColor: '#EEF7FF',
        // backgroundColor: 'green',
        width: '90%',
        height: 50,
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 25,
        position:'relative',
        top:25
      },
    

  });