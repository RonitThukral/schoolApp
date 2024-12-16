import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo vector icons

const StaffDetails = () => {
  const [expandedSections, setExpandedSections] = useState({
    studentInfo: true,
    academicInfo: true,
    guardianInfo: true,
    contactInfo: true,
  });

  const teacherData = {
    id: "PK302411",
  title: "Ms.",
  name: "Ankita",
  surname: "Gaur",
  gender: "Female",
  email: "ankita@dreamseducation.org.in",
  caste: "Hindu",
  category: "General",
  dob: "15-09-2024",
    academic: {
      classSection: "IV-C",
      studentStatus: "Border",
      campus: "Roses N Lilies",
      busRoot: "Bus No. 3",
      scholarship: "N/A",
      feeCategory: "P-NUR"
    },
    employmentInformation: {
    position: "Teacher",
    qualification: "B.Ed Mathematics",
    department: "Mathematics",
    experience: "3 years",
    campus: "N/A",
    bank: "N/A",
    accountNo: "N/A",
    joiningDate: "02 September 2024"
  },
  contactInformation: {
    telephoneNo: "9898988565",
    mobileNo: "9565932685",
    areaOfResidence: "N/A",
    postalAddress: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  guardianInformation: {
    name: "Manara",
    relationship: "Mother",
    occupation: "N/A",
    contact: "4545586532",
    email: "manara@gmail.com",
    address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  },
  };

  const toggleSection = (section:any):any => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const InfoRow = ({ label, value ,isMultiLine = false}:any) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={{width:'70%', left:10, top:0}}>

      <Text style={[isMultiLine ? styles.multiLine : styles.value]}>{value}</Text>
      </View>
    </View>
  );

  const Section = ({ title, isExpanded, onPress, children }:any):any => (
    <View style={styles.section}>
      <TouchableOpacity 
        style={styles.sectionHeader} 
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons 
          name={isExpanded ? "chevron-up" : "chevron-down"} 
          size={24} 
          color="#58A8F9"
        />
      </TouchableOpacity>
      {isExpanded && (
        <View style={styles.sectionContent}>
          {children}
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>

        {/* Profile Section */}
        <ImageBackground
          source={require('../../assets/images/images/union.png')}
          style={styles.headerBackground}
        >
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              <Image
                source={require('../../assets/images/images/girl.png')} // Add your placeholder image
                style={styles.avatar}
              />
              <View style={styles.verifiedBadge}>
                <Image source={require('../../assets/images/images/edit2.png')}/>
              </View>
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.studentId}>{teacherData.id}</Text>
              <Text style={styles.studentName}>
                {`${teacherData.name} ${teacherData.surname}`}
              </Text>
            </View>
          </View>
        </ImageBackground>
        
        <View style={[expandedSections.contactInfo ? styles.rule1 : styles.rule2]}></View>


        {/* Student Information Section */}
        <Section
          title="Teacher Information"
          isExpanded={expandedSections.studentInfo}
          onPress={() => toggleSection('studentInfo')}
        >
          <InfoRow label="Title" value={teacherData.title} />
          <InfoRow label="Name" value={teacherData.name} />
          <InfoRow label="Surname" value={teacherData.surname} />
          <InfoRow label="Gender" value={teacherData.gender} />
          <InfoRow label="Email" value={teacherData.email} />
          <InfoRow label="Caste" value={teacherData.caste} />
          <InfoRow label="Category" value={teacherData.category} />
          <InfoRow label="DOB" value={teacherData.dob} />
        </Section>

        <View style={[expandedSections.contactInfo ? styles.rule1 : styles.rule2]}></View>


        {/* Academic Information Section */}
        <Section
          title="Employment Information"
          isExpanded={expandedSections.academicInfo}
          onPress={() => toggleSection('academicInfo')}
        >
          <InfoRow label="Postion" value={teacherData.employmentInformation.position} />
          <InfoRow label="Qualification" value={teacherData.employmentInformation.qualification} />
          <InfoRow label="Department" value={teacherData.employmentInformation.department} />
          <InfoRow label="Campus" value={teacherData.employmentInformation.campus} />
          <InfoRow label="Bank" value={teacherData.employmentInformation.bank} />
          <InfoRow label="Account No." value={teacherData.employmentInformation.accountNo} />
          <InfoRow label="Joining Date" value={teacherData.employmentInformation.joiningDate} />
        </Section>


        <View style={[expandedSections.contactInfo ? styles.rule1 : styles.rule2]}></View>


{/* Contact Information Section */}
<Section
          title="Contact Information"
          isExpanded={expandedSections.contactInfo}
          onPress={() => toggleSection('contactInfo')}
        >
          {/* Add contact information content here */}

          <InfoRow label="Telephone No." value={teacherData.contactInformation.telephoneNo} />
          <InfoRow label="Mobile No." value={teacherData.contactInformation.mobileNo} />
          <InfoRow label="Residance" value={teacherData.contactInformation.areaOfResidence} />
          <InfoRow label="Postal Address" value={teacherData.contactInformation.postalAddress} isMultiLine={true}/>

        </Section>

        <View style={[expandedSections.contactInfo ? styles.rule1 : styles.rule2]}></View>


        {/* Guardian Information Section */}
        <Section
          title="Guardian Information"
          isExpanded={expandedSections.guardianInfo}
          onPress={() => toggleSection('guardianInfo')}
        >
          {/* Add guardian information content here */}
          <InfoRow label="Name" value={teacherData.guardianInformation.name} />
          <InfoRow label="Relationship" value={teacherData.guardianInformation.relationship} />
          <InfoRow label="Occupation" value={teacherData.guardianInformation.occupation} />
          <InfoRow label="Contact" value={teacherData.guardianInformation.contact} />
          <InfoRow label="Email" value={teacherData.guardianInformation.email} />
          <InfoRow label="Address" value={teacherData.guardianInformation.address} isMultiLine = {true} />
        </Section>

        

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#F5F5F5',
    backgroundColor: 'white',
  },
  scrollViewContent: {
    paddingBottom: 20, // Add space at the bottom to prevent the last item from being cut off
  },
  headerBackground: {
    width: '100%',
    height: 300, // Adjust height according to your design
    backgroundColor:'#daedff',
  
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
  section: {
    width:"90%",
    alignSelf:'center',
    marginTop: 5,
   
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
    fontSize: 16,
    fontWeight: '600',
  },
  sectionContent: {
    padding: 16,
    width:"90%",
    alignSelf:'center',
    height:'auto',
    backgroundColor: '#FFF',
    // backgroundColor: 'red',
    marginHorizontal: 16,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 4, // Adds shadow for Android
    shadowColor: '#000', // Adds shadow for iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    borderColor :'grey',
    borderWidth:0.2,
    
    
  },
  
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 1,
  },
  label: {
    fontWeight:'bold',
    color: '#666',
    fontSize: 11.5,
  },
  value: {
    color:'grey',
    fontSize: 11.5,
  },
  rule1:{
    height:0.5, 
    width:'70%',
    borderWidth:0.5,
    borderColor:'grey', 
    alignSelf:'center',
    position:'fixed', 
    top:62
  },
  rule2:{
    height:0.5, 
    width:'80%',
    borderWidth:0.5,
    borderColor:'grey', 
    alignSelf:'center',
    position:'fixed', 
    top:70
  },
  multiLine : {
    flexWrap:'wrap',
    // width:'70%',
    // marginTop:10,
    fontSize:12,
    color:'grey'
  }
});

export default StaffDetails;
