import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
   <Stack>

<Stack.Screen name='pdf/index' options={{title: 'test',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>




    
    <Stack.Screen name='home/Inventory/index' options={{title: 'Store',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/Banking/index' options={{title: 'Banking',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/feePayment/feeDetails/index' options={{title: 'Fee Details',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/Transactions/index' options={{title: 'Transactions',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/recordFeePayment/index' options={{title: 'Record Fee Payment',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/recordFeePayment/payslip/index' options={{title: 'Payment',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/feePayment/index' options={{title: 'Fee Payment',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/setPayrow/index' options={{title: 'Set Payrow',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/setFees/index' options={{title: 'Set Fees',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/studentFees/index' options={{title: 'Student Fees',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Finance/index' options={{title: 'Finance',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>


    <Stack.Screen name='home/Reports/index' options={{title: 'Reports',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Notices/index' options={{title: 'Notices',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Chat/index' options={{title: 'Chats',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Chat/ConversationThread/index' options={{title: 'Chats',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>

    <Stack.Screen name='home/Attendance/index' options={{title: 'Attendance',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Attendance/staffHistory/index' options={{title: 'Staff History',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Attendance/recordStudents/index' options={{title: 'Students Record',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Attendance/recordStaff/index' options={{title: 'Staff Record',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true,}}/>

    <Stack.Screen name='home/Attendance/studentHistory/index' options={{title: 'Student History',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>

    <Stack.Screen name='home/Academics/progressReport/reportCard/index' options={{title: 'Report Card',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/progressReport/index' options={{title: 'Progress Report',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/Calender/index' options={{title: 'Calender',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Academics/makeReport/index' options={{title: 'Make Report',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
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

    <Stack.Screen name='home/Teachers/Payment/Payrow/index' options={{title: 'Payment',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/Payment/index' options={{title: 'Payment',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/Payment/Payslip/index' options={{title: 'Make Payment',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/Deductions/index' options={{title: 'Deductions',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>

    <Stack.Screen name='home/Teachers/addStaff/nextOfKinInfo' options={{title: 'Next Of Kin',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/addStaff/contactDetails' options={{title: 'Contact Details',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/addStaff/employmentInfo' options={{title: 'Employment Info',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/addStaff/personalInfo' options={{title: 'Personal Info',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/allStaff/index' options={{title: 'All Staff',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/Teachers/index' options={{title: 'Teachers',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/studentPromotion/index' options={{title: 'Student Promotions',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/Scholarships/index' options={{title: 'Scholarships',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/Transport/index' options={{title: 'Transport',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/Campuses/index' options={{title: 'Campuses',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/prefects/index' options={{title: 'Prefects',headerStyle:{backgroundColor:'#FFFFFF'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/addStudent/guardianInfo' options={{title: 'Add New Student',headerStyle:{backgroundColor:'#FFFFFF'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/addStudent/contactInfo' options={{title: 'Add New Student',headerStyle:{backgroundColor:'#FFFFFF'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/addStudent/academicInfo' options={{title: 'Add New Student',headerStyle:{backgroundColor:'#FFFFFF'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/addStudent/personalInfo' options={{title: 'Add New Student',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/allStudents/studentDetails/index' options={{title: 'Student Details',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='home/students/allStudents/index' options={{title: 'All Students'}}/>

    <Stack.Screen name='home/Timetable/index' options={{title: 'Timetable',headerStyle:{backgroundColor:'#1E1E2E'}, headerTransparent:true,headerTitleStyle:{color: 'white'}, headerTintColor:'white' }}/>
    <Stack.Screen name='home/Settings/index' options={{title: 'Settings',headerStyle:{backgroundColor:'white'},headerTransparent:true}}/>
    <Stack.Screen name='home/Certificates/index' options={{title: 'Certificates',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='home/Liberary/index' options={{title: 'Library',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    {/* <Stack.Screen name='auth/login' options={{title: 'login',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/> */}
    <Stack.Screen name='home/index' options={{title: 'Home',headerShown:false}}/>
    <Stack.Screen name='home/students/index' options={{title: 'Students',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='index' options={{title: '',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>

    //Students Portal
    <Stack.Screen name='StudentPortal/home/index' options={{title: 'Home',headerShown:false}}/>
    <Stack.Screen name='StudentPortal/home/myClass/index' options={{title: 'My Class',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/notices/index' options={{title: 'Notices',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/calender/index' options={{title: 'Calender',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/reportCard/index' options={{title: 'Report',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/reportCard/report/index' options={{title: 'Report Card',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/finance/index' options={{title: 'Fees',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
   
    <Stack.Screen name='StudentPortal/home/courses/index' options={{title: 'My Courses',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/courses/notes/index' options={{title: 'Notes',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/messages/index' options={{title: 'Messages',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/settings/index' options={{title: 'Settings',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/messages/messageTeacher/index' options={{title: 'Message Teacher',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/messages/messageAdmin/index' options={{title: 'Message Admin',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/messages/inbox/index' options={{title: 'Inbox',headerStyle:{backgroundColor:'#1E1E2E'}, headerTransparent:true,headerTitleStyle:{color: 'white'}, headerTintColor:'white' }}/>
    <Stack.Screen name='StudentPortal/home/messages/chat/index' options={{title: 'Chats',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/messages/Chat/ConversationThread/index' options={{title: 'Chats',headerStyle:{backgroundColor:'transparent'}, headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/attendance/index' options={{title: 'Attendance',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/profile/index' options={{title: 'My Profile',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='StudentPortal/home/timetable/index' options={{title: 'Time Table',headerStyle:{backgroundColor:'white'}}}/>
    <Stack.Screen name='StudentPortal/home/rewards/index' options={{title: 'Rewards',headerStyle:{backgroundColor:'#1E1E2E'}, headerTransparent:true,headerTitleStyle:{color: 'white'}, headerTintColor:'white' }}/>

// Teachers Portal
<Stack.Screen name='TeacherPortal/home/index' options={{title: 'Home',headerShown:false}}/>
<Stack.Screen name='TeacherPortal/home/attendance/index' options={{title:'Attendance',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/classes/index' options={{title:'Classes',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/classes/students/index' options={{title:'Class Students',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/timetable/index' options={{title:'Time Table',headerStyle:{backgroundColor:'white'}}}/>
<Stack.Screen name='TeacherPortal/home/payrow/index' options={{title:'Payrow',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/payrow/payment/index' options={{title:'Payrow',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/calendar/index' options={{title:'Calendar',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/notice/index' options={{title:'Notices',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/settings/index' options={{title:'Settings',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/message/index' options={{title:'Messages',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/message/messageAdmin/index' options={{title:'Message Admin',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/message/messageStudent/index' options={{title:'Message Student',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='TeacherPortal/home/message/chat/index' options={{title: 'Chats',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='TeacherPortal/home/message/chat/ConversationThread/index' options={{title: 'Chats',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
    <Stack.Screen name='TeacherPortal/home/message/inbox/index' options={{title: 'Inbox',headerStyle:{backgroundColor:'#1E1E2E'}, headerTransparent:true,headerTitleStyle:{color: 'white'}, headerTintColor:'white' }}/>
<Stack.Screen name='TeacherPortal/home/profile/index' options={{title:'My Profile',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/courses/index' options={{title:'My Tutorial Courses',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/courses/notes/index' options={{title:'Notes',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/courses/makeReport/index' options={{title:'Make Report',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/courses/viewReport/index' options={{title:'Course Report',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/courses/viewReport/reportCard/index' options={{title:'Course Report',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>

<Stack.Screen name='TeacherPortal/home/classes/markAttendance/index' options={{title:'Mark Attendance',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>
<Stack.Screen name='TeacherPortal/home/classes/viewAttendance/index' options={{title:'View Attendance',headerStyle:{backgroundColor:'transparent'},headerTransparent:true}}/>


   </Stack>
  )
}

export default _layout