import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import Constants from 'expo-constants';

const baseUrl = Constants.expoConfig.extra.API_URL;

;

const StaffDetails = () => {
  const [expandedSections, setExpandedSections] = useState({
    studentInfo: true,
    academicInfo: true,
    guardianInfo: true,
    contactInfo: true,
  });

  const [teacher, setTeacher] = useState(null);
  const [campus, setCampus] = useState(null);
  const { staffId } = useLocalSearchParams();

  const fetchTeacherDetails = async () => {
    try {
      const response = await axios.get(`${baseUrl}/teachers/${staffId}`);
      if (response.status === 200) {
        setTeacher(response.data.teacher);
      } else {
        console.error('Failed to fetch teacher details. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching teacher details:', error.message || error);
    }
  };

  useEffect(() => {
    if (teacher) {
      fetchCampuses()
    }
    fetchTeacherDetails();
  }, [teacher]);


  const fetchCampuses = async () => {
    if (!teacher?.campusID) return;  // Check that campusID exists
    try {
      const response = await axios.get(`${baseUrl}/campuses/${teacher.campusID}`);
      setCampus(response.data?.docs?.name);
    } catch (error) {
      console.error("Error fetching campuses:", error);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const InfoRow = ({ label, value, isMultiLine = false }) => (
    <View style={styles.infoRow}>
      <Text style={styles.label}>{label}</Text>
      <View style={{ width: '70%', left: 10, top: 0 }}>
        <Text style={[isMultiLine ? styles.multiLine : styles.value]}>
          {value || 'N/A'}
        </Text>
      </View>
    </View>
  );

  const Section = ({ title, isExpanded, onPress, children }) => (
    <View style={styles.section}>
      <TouchableOpacity
        style={styles.sectionHeader}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <Text style={styles.sectionTitle}>{title}</Text>
        <Ionicons
          name={isExpanded ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#58A8F9"
        />
      </TouchableOpacity>
      {isExpanded && <View style={styles.sectionContent}>{children}</View>}
    </View>
  );


  const capitalizeFirstLetter = (text) => {
    return text ? text.charAt(0).toUpperCase() + text.slice(1) : '';
  };






  const formatDate = (dateString) => {
    if (!dateString) return '';

    const date = new Date(dateString);
    const day = date.getDate(); // Get the day (1-31)
    const month = date.toLocaleString('en-US', { month: 'long' }); // Get full month name
    const year = date.getFullYear(); // Get the full year

    return `${day} ${month} ${year}`;
  };



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.scrollViewContent}>

        {teacher ? (
          <>
            <ImageBackground
              source={require('../../../../../assets/images/images/union.png')}
              style={styles.headerBackground}
            >
              <View style={styles.profileSection}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={require('../../../../../assets/images/images/girl.png')}
                    style={styles.avatar}
                  />
                  <View style={styles.verifiedBadge}>
                    <Image
                      source={require('../../../../../assets/images/images/edit2.png')}
                    />
                  </View>
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.studentId}>{teacher?.userID || 'N/A'}</Text>
                  <Text style={styles.studentName}>
                    {`${teacher?.name || ''} ${teacher?.surname || ''}`}
                  </Text>
                </View>
              </View>
            </ImageBackground>
            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
              <View
                style={[
                  expandedSections.contactInfo ? styles.rule1 : styles.rule2,
                ]}
              ></View>

              <Section
                title="Teacher Information"
                isExpanded={expandedSections.studentInfo}
                onPress={() => toggleSection('studentInfo')}
              >
                <InfoRow label="Title" value={capitalizeFirstLetter(teacher?.title)} />
                <InfoRow label="Name" value={teacher?.name} />
                <InfoRow label="Surname" value={teacher?.surname} />
                <InfoRow label="Gender" value={capitalizeFirstLetter(teacher?.gender)} />
                <InfoRow label="Email" value={teacher?.email} />
                <InfoRow label="Caste" value={teacher?.religion} />
                <InfoRow label="Category" value={teacher?.nationality} />
                <InfoRow label="DOB" value={formatDate(teacher?.dateOfBirth)} />
              </Section>

              <View
                style={[
                  expandedSections.contactInfo ? styles.rule1 : styles.rule2,
                ]}
              ></View>

              <Section
                title="Employment Information"
                isExpanded={expandedSections.academicInfo}
                onPress={() => toggleSection('academicInfo')}
              >
                <InfoRow label="Position" value={capitalizeFirstLetter(teacher.role)} />
                <InfoRow
                  label="Qualification"
                  value={teacher.qualifications || 'N/A'}
                />
                <InfoRow label="Department" value={teacher.department || 'N/A'} />
                <InfoRow label="Campus" value={campus || 'N/A'} />
                <InfoRow label="Bank" value={teacher.bank || 'N/A'} />
                <InfoRow
                  label="Account No."
                  value={teacher.accountNumber || 'N/A'}
                />
                <InfoRow
                  label="Joining Date"
                  value={formatDate(teacher.employmentDate) || 'N/A'}
                />
              </Section>

              <View
                style={[
                  expandedSections.contactInfo ? styles.rule1 : styles.rule2,
                ]}
              ></View>

              <Section
                title="Contact Information"
                isExpanded={expandedSections.contactInfo}
                onPress={() => toggleSection('contactInfo')}
              >
                <InfoRow label="Telephone No." value={teacher.telephone} />
                <InfoRow label="Mobile No." value={teacher.mobilenumber} />
                <InfoRow label="Residence" value={teacher.physicalAddress} />
                <InfoRow
                  label="Postal Address"
                  value={teacher.postalAddress}
                // isMultiLine
                />
              </Section>

              <View
                style={[
                  expandedSections.contactInfo ? styles.rule1 : styles.rule2,
                ]}
              ></View>

              <Section
                title="Next Of Kin Information"
                isExpanded={expandedSections.guardianInfo}
                onPress={() => toggleSection('guardianInfo')}
              >
                <InfoRow
                  label="Name"
                  value={`${teacher?.nextofKin?.name || ''} ${teacher?.nextofKin?.lastname || ''
                    }`}
                />
                <InfoRow
                  label="Relationship"
                  value={teacher?.nextofKin?.relationship}
                />
                <InfoRow label="Occupation" value={teacher?.nextofKin?.occupation} />
                <InfoRow label="Contact" value={teacher?.nextofKin?.mobile} />
                <InfoRow label="Email" value={teacher?.nextofKin?.email} />
                <InfoRow
                  label="Address"
                  value={teacher?.nextofKin?.address}
                  isMultiLine
                />
              </Section>
            </ScrollView>
          </>
        ) : (
          <View style={{ position: "relative", top: '45%' }}>
            <ActivityIndicator size="large" color="#58A8F9" />
          </View>
        )}
      </View>
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
    flex: 1,
    // paddingBottom: 20, // Add space at the bottom to prevent the last item from being cut off
  },
  headerBackground: {
    width: '100%',
    height: 300, // Adjust height according to your design
    backgroundColor: '#daedff',

  },
  profileSection: {
    position: 'absolute',
    bottom: 25,
    flexDirection: 'column',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 25,
    padding: 16,
  },
  avatarContainer: {
    position: 'relative',
    right: 15,
    top: 25
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
    marginTop: 15,
    marginRight: 20

  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginRight: 15

  },
  section: {
    width: "90%",
    alignSelf: 'center',
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
    color: '#58A8F9',
  },
  sectionContent: {
    padding: 16,
    width: "90%",
    alignSelf: 'center',
    height: 'auto',
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
    borderColor: 'grey',
    borderWidth: 0.2,


  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 1,
  },
  label: {
    fontWeight: 'bold',
    color: '#666',
    fontSize: 11.5,
  },
  value: {
    color: 'grey',
    fontSize: 11.5,
    paddingLeft: responsiveWidth(4)
  },
  rule1: {
    height: 0.5,
    width: '70%',
    borderWidth: 0.5,
    borderColor: 'grey',
    alignSelf: 'center',
    position: 'fixed',
    top: 62
  },
  rule2: {
    height: 0.5,
    width: '80%',
    borderWidth: 0.5,
    borderColor: 'grey',
    alignSelf: 'center',
    position: 'fixed',
    top: 70
  },
  multiLine: {
    flexWrap: 'wrap',
    // width:'70%',
    // marginTop:10,
    fontSize: 12,
    color: 'grey',
    paddingLeft: responsiveWidth(4)

  }
});

export default StaffDetails;
