import React, { useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,TextInput} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';


  
const feeData = [
  {
    classId: "1A",
    fees: [
      {
        title: "With Transport",
        totalFee: "₹ 700",
        details: { Tuition: "₹ 500", Transport: "₹ 0", Maintenance: "₹ 100", Exam: "₹ 100" }
      },
      {
        title: "Without Transport",
        totalFee: "₹ 1700",
        details: { Tuition: "₹ 500", Transport: "₹ 1000", Maintenance: "₹ 100", Exam: "₹ 100" }
      }
    ]
  },
  {
    classId: "2B",
    fees: [
      {
        title: "With Transport",
        totalFee: "₹ 800",
        details: { Tuition: "₹ 600", Transport: "₹ 50", Maintenance: "₹ 100", Exam: "₹ 50" }
      },
      {
        title: "Without Transport",
        totalFee: "₹ 1200",
        details: { Tuition: "₹ 800", Transport: "₹ 0", Maintenance: "₹ 200", Exam: "₹ 200" }
      }
    ]
  },
  {
    classId: "3C",
    fees: [
      {
        title: "With Transport",
        totalFee: "₹ 1000",
        details: { Tuition: "₹ 800", Transport: "₹ 150", Maintenance: "₹ 30", Exam: "₹ 20" }
      },
      {
        title: "Without Transport",
        totalFee: "₹ 1300",
        details: { Tuition: "₹ 1000", Transport: "₹ 0", Maintenance: "₹ 100", Exam: "₹ 200" }
      }
    ]
  },
  {
    classId: "4D",
    fees: [
      {
        title: "With Transport",
        totalFee: "₹ 1500",
        details: { Tuition: "₹ 1200", Transport: "₹ 200", Maintenance: "₹ 50", Exam: "₹ 50" }
      },
      {
        title: "Without Transport",
        totalFee: "₹ 1800",
        details: { Tuition: "₹ 1500", Transport: "₹ 0", Maintenance: "₹ 200", Exam: "₹ 100" }
      }
    ]
  }
];




  const DropdownComponent = () => {
    const [isFocus, setIsFocus] = useState<string | null>(null);
    // const [selectedID, setSelectedID] = useState(null);
    // const [selectedName, setSelectedName] = useState(null);
    const [selectedClass, setSelectedClass] = useState(null);
    // const [openCalendar, setOpenCalendar] = useState(false);
    // const [date, setDate] = useState(dayjs());
    const [filteredClasses, setFilteredClasses] = useState(feeData);
    // const [expandedSectionId, setExpandedSectionId] = useState<string | null>(null);
    // const [dob, setDob] = useState('');


    const router = useRouter();

   // Search Button Logic
  const handleSearch = () => {
    const filtered = feeData.filter((data) => {
      return (
       
        (!selectedClass || data.classId === selectedClass)
      );
    });
    setFilteredClasses(filtered);
  };

  // Reset Button Logic
  const handleReset = () => {
    // setSelectedID(null);
    // setSelectedName(null);
    setSelectedClass(null);
    setFilteredClasses(feeData);
  };

   

    const handleFocus = (id:string) => {
      setIsFocus(id)
    }

    const handleBlur = () => {
      setIsFocus(null)
    }

    const handlePress = () => {
      router.navigate('/')
    }

    // const toggleSection = (id: string) => {
    //     setExpandedSectionId((prev) => (prev === id ? null : id));
    //   };
    //   const handleDate = (field:string) => {
    //     setOpenCalendar(true);
    //   };

      // const onDateChange = (params: any) => {
      //   const selectedDate = dayjs(params.date).format('DD-MM-YYYY'); // Format the date
      //     setDob(selectedDate);
        
      //   setOpenCalendar(false); // Close the calendar
      // };



      const InfoRow = ({ label, value}:any) => (
        <View style={styles.infoRow}>
          <Text style={styles.label}>{label}</Text>
          <View style={{width:'70%', left:20 }}>
    
          <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      );
    
      const Section = ({ id,title,subTitle,subTitle2, children }:any):any => {
          // const isExpanded = expandedSectionId === id
        return(
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader} 
            activeOpacity={0.7}
          >
           
            <View style={{flex:1, flexDirection:'column'}}>

            <Text style={styles.sectionTitle}>{title}</Text>
            </View>
            {/* <Ionicons 
              name={isExpanded ? "chevron-up" : "chevron-down"} 
              size={24} 
              color="#58A8F9"
            /> */}
          </TouchableOpacity>
         
            <View style={{flex:1, flexDirection:'row', justifyContent:'space-between'}}>
            <View style={styles.sectionContent}>
              {children}
            </View>
            <View style={styles.listBtns}>
                <TouchableOpacity style={{ width:30,height:30,justifyContent:'center',alignItems:'center'}} >
                <Image style={{width:20,height:20,position:'relative',left:5,marginBottom:30}} source={require('../../../../assets/images/images/edit.png')}/>

                </TouchableOpacity>
                <TouchableOpacity style={{ width:40,height:40,justifyContent:'center',alignItems:'center'}} >
                <Image  source={require('../../../../assets/images/images/delete.png')}/>

                </TouchableOpacity>
            </View>

            </View>
          
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
          data={feeData.map((data) => ({ label: data.classId, value: data.classId }))}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={'Search by Class ID'}
          searchPlaceholder="Search..."
          onFocus={() => handleFocus('student')}
          onBlur={handleBlur}
          value={selectedClass}
          onChange={(item) => setSelectedClass(item.value)}
       
        />
      
      
       
      
      

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

{feeData
    .filter((item) => selectedClass === item.classId) // Filter the selected class
    .map((filteredClass) =>
      filteredClass.fees.map((fee, index) => (
        <Section key={index} id={filteredClass.classId} title={fee.title}>
          <InfoRow label="Tuition Fees" value={fee.details.Tuition} />
          <InfoRow label="Transport Fees" value={fee.details.Transport} />
          <InfoRow label="Maintenance Fees" value={fee.details.Maintenance} />
          <InfoRow label="Exam Fees" value={fee.details.Exam} />
        </Section>
      ))
    )}
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
      top:30
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
        marginVertical: 10,
         borderRadius: 8,
         overflow: 'hidden',
         elevation: 3, // Adds shadow for Android
         shadowColor: '#000', // Adds shadow for iOS
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.1,
         shadowRadius: 3,
         borderWidth:0.2,
         borderColor:'grey'

      },
      sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical:8,
        // backgroundColor: '#F8F8F8',
        backgroundColor: 'transparent',
      },
      sectionTitle: {
        fontSize: 20,
        fontWeight: '400',
        color:'#58A8F9'
      },
      sectionContent: {
        paddingBottom: 16,
        paddingHorizontal:15,
        width:"100%",
        alignSelf:'center',
        height:'auto',
        backgroundColor: '#FFF',
        // backgroundColor: 'red',
        marginHorizontal: 16,
        borderRadius: 10,
        overflow: 'hidden',
        
        
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