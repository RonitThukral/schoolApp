import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
   <Stack>
<Stack.Screen name='test/index' options={{title: 'test',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
<Stack.Screen name='pdf/index' options={{title: 'test',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>




    
    <Stack.Screen name='home/Inventory/index' options={{title: 'Store',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/Banking/index' options={{title: 'Banking',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/feePayment/feeDetails/index' options={{title: 'Fee Details',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/feePayment/index' options={{title: 'Fee Payment',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/setPayrow/index' options={{title: 'Set Payrow',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/setFees/index' options={{title: 'Set Fees',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/studentFees/index' options={{title: 'Student Fees',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Attendance/index' options={{title: 'Attendance',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/index' options={{title: 'Finance',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Reports/index' options={{title: 'Reports',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Attendance/staffHistory/index' options={{title: 'Staff History',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Attendance/recordStudents/index' options={{title: 'Students Record',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Attendance/studentHistory/index' options={{title: 'Student History',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/progressReport/reportCard/index' options={{title: 'Report Card',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/progressReport/index' options={{title: 'Progress Report',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/makeReport/index' options={{title: 'Make Report',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Notices/index' options={{title: 'Notices',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/Divisions/index' options={{title: 'Divisions',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/combinedReport/index' options={{title: 'Combined Reports',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Message/index' options={{title: 'Message',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/smsReminder/index' options={{title: 'Sms Bill Reminder',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Message/messageBulk/index' options={{title: 'Bulk Message',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Message/messageGuardian/index' options={{title: 'Message Guardian',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Message/messageStaff/index' options={{title: 'Message Staff',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Message/messageStudent/index' options={{title: 'Message Student',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/Sections/index' options={{title: 'Sections',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/allCourses/index' options={{title: 'All Courses',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/allClasses/index' options={{title: 'All Classes',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/yearGroups/index' options={{title: 'Year Groups',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/classGroups/index' options={{title: 'Class Groups',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/index' options={{title: 'Academics',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/allStaff/staffDetails/index' options={{title: 'Staff Details',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/allStaff/index' options={{title: 'All Staff',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/index' options={{title: 'Teachers',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/studentPromotion/index' options={{title: 'Student Promotions',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/Scholarships/index' options={{title: 'Scholarships',headerStyle:{backgroundColor:'#daedff'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/Transport/index' options={{title: 'Transport',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/Campuses/index' options={{title: 'Campuses',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/prefects/index' options={{title: 'Prefects',headerStyle:{backgroundColor:'#FFFFFF'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/addStudent/guardianInfo' options={{title: 'Add New Student',headerStyle:{backgroundColor:'#FFFFFF'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/addStudent/contactInfo' options={{title: 'Add New Student',headerStyle:{backgroundColor:'#FFFFFF'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/addStudent/academicInfo' options={{title: 'Add New Student',headerStyle:{backgroundColor:'#FFFFFF'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/addStudent/personalInfo' options={{title: 'Add New Student',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/allStudents/studentDetails/index' options={{title: 'Student Details',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/allStudents/index' options={{title: 'All Students'}}/>
    <Stack.Screen name='auth/login' options={{title: 'login',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='home/index' options={{title: 'Home',headerShown:false}}/>
    <Stack.Screen name='home/students/index' options={{title: 'Students',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
   </Stack>
  )
}

export default _layout