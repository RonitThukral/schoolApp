// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import axios from 'axios';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api/calendar';

// const CalendarComponent = () => {
//   const [events, setEvents] = useState({});
//   const [allEvents, setAllEvents] = useState([]); // Store all events
//   const [selectedDate, setSelectedDate] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Fetch events from API
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(baseUrl);
//       const eventData = response.data.reduce((acc, event) => {
//         const eventDate = event.day.split('T')[0]; // Extract YYYY-MM-DD
//         if (!acc[eventDate]) acc[eventDate] = [];
//         acc[eventDate].push(event);
//         return acc;
//       }, {});

//       setEvents(eventData);
//       setAllEvents(response.data); // Store all events
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       Alert.alert('Error', 'Failed to load events');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate marked dates for calendar
//   const getMarkedDates = () => {
//     const marked = {};
//     Object.keys(events).forEach((date) => {
//       marked[date] = {
//         marked: true,
//         dotColor: 'blue',
//         selected: date === selectedDate,
//         selectedColor: date === selectedDate ? 'blue' : undefined,
//       };
//     });
//     if (selectedDate && !marked[selectedDate]) {
//       marked[selectedDate] = { selected: true, selectedColor: '#58a8f9' };
//     }
//     return marked;
//   };

//   // Function to check if a day is Sunday
//   const isSunday = (day) => {
//     const date = new Date(day);
//     return date.getDay() === 0;
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : (
//         <>
//           <Calendar
//             onDayPress={(day) => {
//               setSelectedDate(day.dateString);
//               setModalVisible(true);
//             }}
//             markedDates={getMarkedDates()}
//             style={styles.calendar}
//             theme={{
//               textDayFontSize: 14,
//               textMonthFontSize: 16,
//               todayTextColor: 'green', // Today’s date color
//               arrowColor: '#58a8f9',
//               textSectionTitleColor: 'black', // Ensures weekday headers are visible
//               textSectionTitleDisabledColor: '#d9e1e8',
//               textDayHeaderFontWeight: 'bold', // 🔥 Bold weekday headers
//               // Custom day text style for Sundays
//     textDayStyle: (day) => {
//       if (isSunday(day.dateString)) {
//         return { color: 'red' }; // Red text for Sundays
//       }
//       return {};
//     },
//             }}
//             enableSwipeMonths={true}
//           />

//           <Text style={styles.allEventsHeader}>All Events</Text>
//           <FlatList
//             data={allEvents}
//             contentContainerStyle={{ paddingBottom: 40 }}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item, index }) => (
//               <View style={styles.list} key={index}>
//                 <Text
//                   style={{
//                     position: 'relative',
//                     fontSize: 18,
//                     left: 20,
//                     color: '#58A8F9',
//                     marginTop: 10,
//                     top: '25%',
//                     width: '35%',
//                   }}
//                 >
//                   {item.title}
//                 </Text>
//                 <View style={{ flex: 1, flexDirection: 'row' }}>
//                   <View style={styles.listContent}>
//                     <View style={{ width: '80%' }}>
//                       <Text style={{ fontSize: 13, color: 'grey' }}>
//                         {item.description}
//                       </Text>
//                     </View>
//                     <Text style={{ fontSize: 12, color: 'black' }}>
//                       Date: {item.day.split('T')[0]}
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             )}
//             ListEmptyComponent={
//               <Text style={styles.noEventsText}>No events available.</Text>
//             }
//           />

//           {/* Modal for events on selected date */}
//           <Modal visible={modalVisible} transparent={true} animationType="slide">
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalHeader}>Events for {selectedDate}</Text>

//                 <FlatList
//                   data={events[selectedDate] || []}
//                   keyExtractor={(item) => item._id}
//                   renderItem={({ item }) => (
//                     <View style={styles.modalEventItem}>
//                       <Text style={styles.eventTitle}>{item.title}</Text>
//                       <Text style={styles.eventDescription}>{item.description}</Text>
//                       <Text style={styles.eventResource}>Type: {item.resource}</Text>
//                     </View>
//                   )}
//                   ListEmptyComponent={
//                     <Text style={styles.noEventsText}>No events found for this date.</Text>
//                   }
//                 />

//                 <TouchableOpacity
//                   style={styles.closeButton}
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: 'white', paddingTop: 60 },
//   calendar: { borderRadius: 10, marginBottom: 16, elevation: 5 },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 16 },
//   modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
//   noEventsText: { fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 10 },
//   allEventsHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   list: {
//     width: '90%',
//     height: 'auto',
//     borderColor: 'grey',
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'space-between',
//     flexDirection: 'column',
//     alignSelf: 'center',
//     marginTop: 20,
//     elevation: 5,
//   },
//   listContent: {
//     flexDirection: 'column',
//     position: 'relative',
//     left: 130,
//     bottom: 20,
//     width: '65%',
//     paddingHorizontal: 40,
//   },
//   modalEventItem: { 
//     marginBottom: 8 
//   },
//   modalEventText: { 
//     fontSize: 16, 
//     color: '#333' 
//   },
//   input: {
//     borderRadius: 5, 
//     padding: 8, 
//     marginBottom: 8,
//     backgroundColor: '#daedff',
//     width: responsiveWidth(84),
//     height: responsiveHeight(6),
//   },
//   addButton: { 
//     marginTop: 16, 
//     backgroundColor: '#58a8f9', 
//     padding: 10, 
//     borderRadius: 5,
//     height: responsiveHeight(5),
//     marginRight: 5,
//   },
//   addButtonText: { 
//     color: 'white', 
//     textAlign: 'center', 
//     fontSize: 14 
//   },
//   closeButton: { 
//     marginTop: 16, 
//     padding: 8, 
//     backgroundColor: 'transparent', 
//     borderRadius: 5,
//     height: responsiveHeight(5),
//   },
//   closeButtonText: { 
//     color: '#58a8f9', 
//     textAlign: 'center', 
//     fontSize: 16 
//   },
//   eventTitle: { fontSize: 16, fontWeight: 'bold' },
//   eventDescription: { fontSize: 14, color: 'gray' },
//   eventResource: { fontSize: 14, fontWeight: 'bold', color: 'blue' },
// });

// export default CalendarComponent;



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
// } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import axios from 'axios';

// const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api/calendar';

// const CalendarComponent = () => {
//   const [events, setEvents] = useState({});
//   const [allEvents, setAllEvents] = useState([]); // Store all events for the list
//   const [selectedDate, setSelectedDate] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Fetch events from API
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(baseUrl);
//       const eventData = response.data.reduce((acc, event) => {
//         const eventDate = event.day.split('T')[0]; // Extract YYYY-MM-DD
//         if (!acc[eventDate]) acc[eventDate] = [];
//         acc[eventDate].push(event);
//         return acc;
//       }, {});

//       setEvents(eventData);
//       setAllEvents(response.data); // Store all events for the list below
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       Alert.alert('Error', 'Failed to load events');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Generate marked dates for calendar
//   const getMarkedDates = () => {
//     const marked = {};
//     Object.keys(events).forEach((date) => {
//       marked[date] = {
//         selected: true,
//         selectedColor: '#daedff', // Circular background for dates with events
//         marked: true,
//         dotColor: 'red',
//       };
//     });

//     if (selectedDate && !marked[selectedDate]) {
//       marked[selectedDate] = { selected: true, selectedColor: '#58a8f9' };
//     }

//     return marked;
//   };

//   // Function to check if a day is Sunday
//   const isSunday = (dateString) => {
//     const date = new Date(dateString);
//     return date.getDay() === 0; // Sunday = 0
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : (
//         <>
//           {/* Calendar */}
//           <Calendar
//             onDayPress={(day) => {
//               setSelectedDate(day.dateString);
//               setModalVisible(true);
//             }}
//             markedDates={getMarkedDates()}
//             style={styles.calendar}
//             theme={{
//               textDayFontSize: 14,
//               textMonthFontSize: 16,
//               todayTextColor: 'green',
//               arrowColor: '#58a8f9',
//               textSectionTitleColor: 'black',
//               textSectionTitleDisabledColor: '#d9e1e8',
//               textDayHeaderFontWeight: 'bold',
//               textDayStyle: (day) => (isSunday(day.dateString) ? { color: 'blue' } : {}),
//             }}
//             enableSwipeMonths={true}
//           />

//           {/* 🔥 List of All Events Below Calendar */}
//           <Text style={styles.allEventsHeader}>All Events</Text>
//           <FlatList
//             data={allEvents}
//             contentContainerStyle={{ paddingBottom: 40 }}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item, index }) => (
//               <View style={styles.list} key={index}>
//                 <Text style={styles.eventTitleList}>{item.title}</Text>
//                 <View style={styles.listContent}>
//                   <Text style={styles.eventDescription}>{item.description}</Text>
//                   <Text style={styles.eventDate}>Date: {item.day.split('T')[0]}</Text>
//                 </View>
//               </View>
//             )}
//             ListEmptyComponent={
//               <Text style={styles.noEventsText}>No events available.</Text>
//             }
//           />

//           {/* Event Modal */}
//           <Modal visible={modalVisible} transparent={true} animationType="slide">
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalHeader}>Events for {selectedDate}</Text>

//                 <FlatList
//                   data={events[selectedDate] || []}
//                   keyExtractor={(item) => item._id}
//                   renderItem={({ item }) => (
//                     <View style={styles.modalEventItem}>
//                       <Text style={styles.eventTitle}>{item.title}</Text>
//                       <Text style={styles.eventDescription}>{item.description}</Text>
//                       <Text style={styles.eventResource}>Type: {item.resource}</Text>
//                     </View>
//                   )}
//                   ListEmptyComponent={
//                     <Text style={styles.noEventsText}>No events found for this date.</Text>
//                   }
//                 />

//                 <TouchableOpacity
//                   style={styles.closeButton}
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//         </>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: 'white', paddingTop: 60 },
//   calendar: { borderRadius: 10, marginBottom: 16, elevation: 5 },
//   allEventsHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   list: {
//     width: '90%',
//     borderColor: 'grey',
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'space-between',
//     flexDirection: 'column',
//     alignSelf: 'center',
//     marginTop: 20,
//     elevation: 5,
//     padding: 15,
//   },
//   eventTitleList: {
//     fontSize: 18,
//     color: '#58A8F9',
//     fontWeight: 'bold',
//   },
//   listContent: {
//     flexDirection: 'column',
//     marginTop: 5,
//   },
//   eventDescription: { fontSize: 14, color: 'gray' },
//   eventDate: { fontSize: 12, color: 'black', marginTop: 5 },
//   modalOverlay: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0,0,0,0.5)',
//   },
//   modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 16 },
//   modalHeader: { fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
//   noEventsText: { fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 10 },
//   modalEventItem: { marginBottom: 8 },
//   eventTitle: { fontSize: 16, fontWeight: 'bold' },
//   eventResource: { fontSize: 14, fontWeight: 'bold', color: 'blue' },
//   closeButton: { marginTop: 16, padding: 10, backgroundColor: '#58a8f9', borderRadius: 5 },
//   closeButtonText: { color: 'white', textAlign: 'center', fontSize: 16 },
// });

// export default CalendarComponent;



// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Modal,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   SafeAreaView,
//   Platform,
// } from 'react-native';
// import { Calendar } from 'react-native-calendars';
// import axios from 'axios';

// const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api/calendar';

// const CalendarComponent = () => {
//   const [events, setEvents] = useState({});
//   const [allEvents, setAllEvents] = useState([]); // Store all events
//   const [selectedDate, setSelectedDate] = useState('');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [markedDates, setMarkedDates] = useState({});

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   // Fetch events from API
//   const fetchEvents = async () => {
//     try {
//       const response = await axios.get(baseUrl);
//       const eventData = response.data.reduce((acc, event) => {
//         const eventDate = event.day.split('T')[0]; // Extract YYYY-MM-DD
//         if (!acc[eventDate]) acc[eventDate] = [];
//         acc[eventDate].push(event);
//         return acc;
//       }, {});

//       setEvents(eventData);
//       setAllEvents(response.data); // Store all events

//       // Update marked dates (including Sundays)
//       setMarkedDates(getMarkedDates(eventData));
//     } catch (error) {
//       console.error('Error fetching events:', error);
//       Alert.alert('Error', 'Failed to load events');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Function to generate marked dates (Events + Sundays)
//   const getMarkedDates = (eventData) => {
//     const marked = {};

//     // Mark event dates with a circular background
//     Object.keys(eventData).forEach((date) => {
//       marked[date] = {
//         selected: true,
//         selectedColor: 'blue',
//         marked: true,
//         dotColor: 'white',
//       };
//     });

//     // Mark all Sundays in red
//     const startDate = new Date();
//     for (let i = 0; i < 365; i++) {
//       const date = new Date(startDate);
//       date.setDate(date.getDate() + i);
//       const dateString = date.toISOString().split('T')[0];

//       if (date.getDay() === 0) {
//         // Sunday
//         marked[dateString] = {
//           ...marked[dateString],
//           customStyles: {
//             container: {
//               backgroundColor: 'transparent',
//             },
//             text: {
//               color: 'red', // **🔥 Strictly Making Sundays Red**
//               fontWeight: 'bold',
//             },
//           },
//         };
//       }
//     }

//     return marked;
//   };

//   const renderDay = ({ date, state }) => {
//     const isSunday = new Date(date.dateString).getDay() === 0;
//     return (
//       <TouchableOpacity
//         onPress={() => setSelectedDate(date.dateString)}
//         style={[styles.dayContainer, selectedDate === date.dateString && styles.selectedDay]}
//       >
//         <Text
//           style={[
//             styles.dayText,
//             state === 'disabled' && styles.disabledDayText,
//             isSunday && styles.sundayText,
//           ]}
//         >
//           {date.day}
//         </Text>
//       </TouchableOpacity>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : (
//         <>
//           {/* Calendar */}
//           <View style={{ height: '52%' }}>
//             <View style={{ height: 400 }}>
//               <Calendar
//                 onDayPress={(day) => {
//                   setSelectedDate(day.dateString);
//                   setModalVisible(true);
//                 }}
//                 markedDates={markedDates}
//                 dayComponent={({ date, state }) => renderDay({ date, state })}
//                 style={styles.calendar}
//                 theme={{
//                   textDayFontSize: 12,
//                   textDayHeaderFontSize: 12,
//                   textMonthFontSize: 12,
//                   textDayStyle: { padding: 2 },
//                   textSectionTitleColor: 'black', // Ensures weekday headers are visible
//                   textSectionTitleDisabledColor: '#d9e1e8',
//                   textDayHeaderFontWeight: 'bold', // 🔥 Bold weekday headers
//                 }}
//                 enableSwipeMonths={true}
//               />
//             </View>
//           </View>

//           {/* 🔥 List of All Events Below Calendar */}
//           <Text style={styles.allEventsHeader}>All Events</Text>
//           <FlatList
//             data={allEvents}
//             contentContainerStyle={{ paddingBottom: 40 }}
//             keyExtractor={(item) => item._id}
//             renderItem={({ item, index }) => (
//               <View style={styles.list} key={index}>
//                 <Text style={styles.eventTitleList}>{item.title}</Text>
//                 <View style={styles.listContent}>
//                   <Text style={styles.eventDescription}>{item.description}</Text>
//                   <Text style={styles.eventDate}>Date: {item.day.split('T')[0]}</Text>
//                 </View>
//               </View>
//             )}
//             ListEmptyComponent={
//               <Text style={styles.noEventsText}>No events available.</Text>
//             }
//           />

//           {/* Event Modal */}
//           <Modal visible={modalVisible} transparent={true} animationType="slide">
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalHeader}>Events for {selectedDate}</Text>

//                 <FlatList
//                   data={events[selectedDate] || []}
//                   keyExtractor={(item) => item._id}
//                   renderItem={({ item }) => (
//                     <View style={styles.modalEventItem}>
//                       <Text style={styles.eventTitle}>{item.title}</Text>
//                       <Text style={styles.eventDescription}>{item.description}</Text>
//                       <Text style={styles.eventResource}>Type: {item.resource}</Text>
//                     </View>
//                   )}
//                   ListEmptyComponent={
//                     <Text style={styles.noEventsText}>No events found for this date.</Text>
//                   }
//                 />

//                 <TouchableOpacity
//                   style={styles.closeButton}
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text style={styles.closeButtonText}>Close</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>
//         </>
//       )}
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1, padding: 16, backgroundColor: 'white', paddingTop: 60 },
//   calendar: {
//     borderRadius: 15,
//     marginTop: 50,
//     height: '85%',
//     width: '95%',
//     alignSelf: 'center',
//     elevation: 4,
//     ...Platform.select({
//       ios: { marginTop: 0 },
//     }),
//   },
//   allEventsHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   list: {
//     flexGrow: 1,
//     position: 'relative',
//     marginTop: 10,
//   },
//   dayContainer: { alignItems: 'center', justifyContent: 'center', height: 35, width: 35 },
//   dayText: { fontSize: 12, textAlign: 'center', color: '#000' },
//   sundayText: { color: 'red' },
//   selectedDay: { backgroundColor: '#d3e5ff', borderRadius: 5 },
//   modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
//   modalContent: { width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 16 },
//   closeButton: { marginTop: 16, padding: 10, backgroundColor: '#58a8f9', borderRadius: 5 },
//   closeButtonText: { color: 'white', textAlign: 'center', fontSize: 16 },
// });

// export default CalendarComponent;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Platform,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import axios from 'axios';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api/calendar';

const CalendarComponent = () => {
  const [events, setEvents] = useState({});
  const [allEvents, setAllEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [markedDates, setMarkedDates] = useState({});

  useEffect(() => {
    fetchEvents();
  }, []);

  // Fetch events from API
  const fetchEvents = async () => {
    try {
      const response = await axios.get(baseUrl);
      const eventData = response.data.reduce((acc, event) => {
        const eventDate = event.day.split('T')[0]; // Extract YYYY-MM-DD
        if (!acc[eventDate]) acc[eventDate] = [];
        acc[eventDate].push(event);
        return acc;
      }, {});

      setEvents(eventData);
      setAllEvents(response.data);
      setMarkedDates(getMarkedDates(eventData));
    } catch (error) {
      console.error('Error fetching events:', error);
      Alert.alert('Error', 'Failed to load events');
    } finally {
      setLoading(false);
    }
  };

  // Function to generate marked dates (Events + Sundays)
  const getMarkedDates = (eventData) => {
    const marked = {};

    // Mark all event dates with red text and bold font
    Object.keys(eventData).forEach((date) => {
      marked[date] = {
        selected: true,
        selectedColor: 'blue',
        marked: true,
        dotColor: 'red', // Red dot for events
        customStyles: {
          text: { color: 'red', fontWeight: 'bold' }, // Red text and bold for event dates
        },
      };
    });

    // Mark all Sundays with red text and bold font (same style as event dates)
    const startDate = new Date();
    for (let i = 0; i < 365; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split('T')[0];

      // Mark Sundays with red text and bold font
      if (date.getDay() === 0) {
        marked[dateString] = {
          ...marked[dateString],
          customStyles: {
            text: { color: 'red', fontWeight: 'bold' }, // Red and bold text for Sundays
          },
        };
      }
    }

    return marked;
  };


  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const renderDay = ({ date, state }) => {
    const isSunday = new Date(date.dateString).getDay() === 0;
    const isEventDay = events[date.dateString]; // Check if the date has events

    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedDate(date.dateString);
          setModalVisible(true);
        }}
        style={[styles.dayContainer, selectedDate === date.dateString && styles.selectedDay]}
      >
        <Text
          style={[
            styles.dayText,
            state === 'disabled' && styles.disabledDayText,
            isSunday && styles.sundayText,
            isEventDay && styles.eventDayText, // Apply red and bold styling for event days
          ]}
        >
          {date.day}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <>
          {/* Calendar with Updated UI */}
          <View style={{ height: '52%' }}>
            <View style={{ height: 400 }}>
              <Calendar
                onDayPress={(day) => {
                  setSelectedDate(formatDate(day.dateString));
                  setModalVisible(true);
                }}
                markedDates={markedDates}
                dayComponent={({ date, state }) => renderDay({ date, state })}
                style={styles.calendar}
                theme={{
                  textDayFontSize: 12,
                  textDayHeaderFontSize: 12,
                  textMonthFontSize: 12,
                  textDayStyle: { padding: 2 },
                  textSectionTitleColor: 'black',
                  textSectionTitleDisabledColor: '#d9e1e8',
                  textDayHeaderFontWeight: '700',
                }}
                enableSwipeMonths={true}
              />
            </View>
          </View>

          {/* 🔥 List of All Events Below Calendar */}
          <Text style={styles.allEventsHeader}>All Events</Text>
          <FlatList
            data={allEvents}
            contentContainerStyle={{ paddingBottom: 40 }}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View style={styles.list} key={index}>
                <Text style={styles.eventTitleList}>{item.title}</Text>
                <View >
                  <Text style={styles.eventDescription}>{item.description}</Text>
                  <Text style={styles.eventDate}>Date: {formatDate(item.day.split('T')[0])}</Text>
                  </View>
              </View>
            )}
            ListEmptyComponent={
              <Text style={styles.noEventsText}>No events available.</Text>
            }
          />

          {/* Event Modal */}
          <Modal visible={modalVisible} transparent={true} animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Events for {formatDate(selectedDate)}</Text>

                <FlatList
                  data={events[selectedDate] || []}
                  keyExtractor={(item) => item._id}
                  renderItem={({ item, index }) => (
                    
                    <View key={index} style={styles.eventItem}>
                    <View
                      style={[
                        styles.eventDot,
                        {
                          backgroundColor:
                            item.resource === 'Holiday'
                              ? '#EA4747'
                              : item.resource === 'Trip'
                              ? '#47EA47'
                              : '#4775EA',
                        },
                      ]}
                    />
                    <View>
                      <Text style={styles.eventTitle}>{item.title}</Text>
                      <Text style={styles.eventTime}>
                        {item.start && new Date(item.start).toLocaleTimeString()}
                      </Text>
                    </View>
                  </View>
                  )}
                  ListEmptyComponent={
                    <Text style={styles.noEventsText}>No events found for this date.</Text>
                  }
                />

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: 'white', paddingTop: 60 },
  calendar: {
    borderRadius: 15,
    marginTop: 20,
    height: '89%',
    width: '95%',
    alignSelf: 'center',
    elevation: 4,
  },
  allEventsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  list: {
    width: '90%',
    borderColor: 'grey',
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    marginTop: 20,
    elevation: 5,
    padding: 15,
    alignSelf:'center',
    // paddingVertical
  },
  eventTitleList: {
    fontSize: 18,
    color: '#58A8F9',
    fontWeight: 'bold',
  },
  eventDescription: { fontSize: 14, color: 'black',paddingBottom:5, paddingTop:10  },
  eventDate: { fontSize: 12, color: 'grey', marginTop: 5 },
  sundayText: { color: 'red' },
  disabledDayText: { color: 'gray' },
  eventDayText: { color: 'red' }, // Red and bold for event days
  selectedDay: { backgroundColor: '#d3e5ff', borderRadius: 5 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 15, padding: 16 },
  closeButton: { marginTop: 16, padding: 10, backgroundColor: '#4775EA', borderRadius: 5 },
  closeButtonText: { color: 'white', textAlign: 'center', fontSize: 16 },

  eventResource: { fontSize: 14, fontWeight: 'bold', color: 'blue' },
  noEventsText: { fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 10 },
  // eventTitle: { fontSize: 16, fontWeight: 'bold' },
  modalEventItem: { 
    marginBottom: 8
  },

  eventDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#4775EA',
    marginTop: 2,
  },

  eventItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  eventTime: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
  },

  modalHeader: { 
    fontSize: 18, 
    fontWeight: 'bold',
     marginBottom: 8 
    },

  dayContainer: {
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor:'green',
    height:35,
    width:35
  },
  dayText: { fontSize: 12, textAlign: 'center', color: '#000' },
  
  img: {
    marginHorizontal: 20,
    width: 42,
    height: 42,
  },
 
  dropdown: {
    height: 50,
    width: '90%',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: '#daedff',
    marginBottom: 15,
    alignSelf: 'center',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 15,
    color: 'grey',
    paddingHorizontal: 15
  },
  selectedTextStyle: {
    fontSize: 16,
  },

  

});

export default CalendarComponent;
