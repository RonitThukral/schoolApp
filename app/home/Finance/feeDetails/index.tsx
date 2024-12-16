import React, { useState } from 'react';
  import { StyleSheet, Text, View , TouchableOpacity,Image,ScrollView,ImageBackground} from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';


  const data ={
    id: "73739739753",
      Tution: "₹500",
      Maintainance: "₹100",
      Transport: "0",
      Exam: "₹100",
      totalBill: "₹700",
      Scholarship: "N/A",
      totalPaid: "0",
      Balance: "₹700",
  }


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



  const FeeDetails = () => {

    const [filteredClasses, setFilteredClasses] = useState(listData);
    const [expandedSections, setExpandedSections] = useState<string[]>([]);


    const router = useRouter();


   

   

    
    const handlePress = () => {
      router.navigate('/')
    }

    
  const toggleSection = (id: string) => {
    setExpandedSections((prev) => 
      prev.includes(id) ? prev.filter((sectionId) => sectionId !== id) : [...prev, id]
    );
  };
      



      const InfoRow = ({ label, value}:any) => (
        <View style={styles.infoRow}>
          <Text style={styles.label}>{label}</Text>
          <View style={{width:'70%', left:20 }}>
    
          <Text style={styles.value}>{value}</Text>
          </View>
        </View>
      );
      const InfoRow1 = ({ label, value}:any) => (
        <View style={styles.infoRow1}>
          <Text style={styles.label1}>{label}</Text>
          <View style={{width:'70%', left:20 }}>
    
          <Text style={styles.value1}>{value}</Text>
          </View>
        </View>
      );
    
      const Section = ({ id,title,subTitle,subTitle2, children }:any):any => {
          const isExpanded = expandedSections.includes(id);
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
      
      <ImageBackground
          source={require('../../../../assets/images/images/union.png')}
          style={styles.headerBackground}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../../../assets/images/images/boy.png')} // Add your placeholder image
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Image source={require('../../../../assets/images/images/edit2.png')}/>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.studentId}>BK202408</Text>
              <Text style={styles.studentName}>
                Ankita Gaur
              </Text>
            </View>
          </View>
        </ImageBackground>

      <View style={styles.content}>
          <InfoRow label="Tuition Fee" value={data.Tution} />
          <InfoRow label="Maintainance Fee" value={data.Maintainance} />
          <InfoRow label="Transport Fee" value={data.Transport} />
          <InfoRow label="Exam Fee" value={data.Exam} />
          <InfoRow label="Total Bill" value={data.totalBill} />
          <InfoRow label="Scholarship" value={data.Scholarship} />
          <InfoRow label="Total Paid" value={data.totalPaid} />
          <InfoRow label="Balance" value={data.Balance} />
      </View>

          
      </View>

<Text style={{fontSize:20,backgroundColor:'white',color:'grey',paddingHorizontal:35,paddingVertical:10}}>Transactions</Text>

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
          <InfoRow1 label="Roll Number" value={data.rollNumber} />
          <InfoRow1 label="Class" value={data.class} />
          <InfoRow1 label="Guardian" value={data.guardian} />
          <InfoRow1 label="Payment Method" value={data.paymentMethod} />
          
        </Section>
  )
})}
</ScrollView>


      </>
    );
  };

  export default FeeDetails;

  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      // backgroundColor: 'red',

    },
    headerBackground: {
      width: '100%',
      height: 300, // Adjust height according to your design
      backgroundColor:'#daedff',
      borderBottomWidth:0.8,
      borderBottomColor:'black'
    
    },
    profileSection: {
      position:'absolute',
      bottom: 25,
      flexDirection: 'column',
      alignItems: 'center',
      alignSelf:'center',
      marginTop: 25,
      padding: 16,
    },
    avatarContainer: {
      position: 'relative',
      right:15,
      top:25
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
      right: 0,
      backgroundColor: '#58A8F9',
      borderRadius: 12,
      width: 27,
      height: 27,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: '#daedff',
    },
    profileInfo: {
      marginTop: 10,
      alignItems: 'center',
    },
    studentId: {
      color: '#58A8F9',
      fontSize: 24,
      marginTop:15,
      marginRight: 20
  
    },
    studentName: {
      fontSize: 16,
      fontWeight: '600',
      marginBottom: 10,
      marginRight: 15
  
    },

    content: {
      width:'100%',
      paddingVertical:20,
      flexDirection:'column',
      justifyContent:'space-between',
      alignSelf:'center',
      position:'relative',
      borderBottomWidth:0.8,
      paddingHorizontal:30,
      // backgroundColor:'red'
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
        
      },
      
      infoRow1: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 2,
      },
      infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 3,
      },
      label1: {
        fontWeight:'bold',
        color: '#666',
        fontSize: 12,
        // backgroundColor:'green',
        width:'35%'
      },
      label: {
        fontWeight:'bold',
        color: '#666',
        fontSize: 14,
        // backgroundColor:'green',
        width:'45%'
      },
      value1: {
        color:'grey',
        fontSize: 12,
        
        
      },
      value: {
        color:'grey',
        fontSize: 14,
        position:'relative',
        left:120
        // backgroundColor:'blue'
      },
     
      
      
      

  });