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
// import { responsiveHeight } from 'react-native-responsive-dimensions';

// const baseUrl = 'https://api.dreameducation.org.in/api/calendar';

// const CalendarComponent = () => {
//   const [events, setEvents] = useState({});
//   const [allEvents, setAllEvents] = useState([]);
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
//       setAllEvents(response.data);
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

//     // Mark all event dates with red text and bold font
//     Object.keys(eventData).forEach((date) => {
//       marked[date] = {
//         selected: true,
//         selectedColor: 'blue',
//         marked: true,
//         dotColor: 'red', // Red dot for events
//         customStyles: {
//           text: { color: 'red', fontWeight: 'bold' }, // Red text and bold for event dates
//         },
//       };
//     });

//     // Mark all Sundays with red text and bold font (same style as event dates)
//     const startDate = new Date();
//     for (let i = 0; i < 365; i++) {
//       const date = new Date(startDate);
//       date.setDate(date.getDate() + i);
//       const dateString = date.toISOString().split('T')[0];

//       // Mark Sundays with red text and bold font
//       if (date.getDay() === 0) {
//         marked[dateString] = {
//           ...marked[dateString],
//           customStyles: {
//             text: { color: 'red', fontWeight: 'bold' }, // Red and bold text for Sundays
//           },
//         };
//       }
//     }

//     return marked;
//   };


//   const formatDate = (dateString) => {
//     const [year, month, day] = dateString.split('-');
//     return `${day}-${month}-${year}`;
//   };

//   const renderDay = ({ date, state }) => {
//     const isSunday = new Date(date.dateString).getDay() === 0;
//     const isEventDay = events[date.dateString]; // Check if the date has events

//     return (
//       <TouchableOpacity
//         onPress={() => {
//           setSelectedDate(date.dateString);
//           setModalVisible(true);
//         }}
//         style={[styles.dayContainer, selectedDate === date.dateString && styles.selectedDay]}
//       >
//         <Text
//           style={[
//             styles.dayText,
//             state === 'disabled' && styles.disabledDayText,
//             isSunday && styles.sundayText,
//             isEventDay && styles.eventDayText, // Apply red and bold styling for event days
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
//           {/* Calendar with Updated UI */}
//           <View style={{ height: '52%' }}>
//             <View style={{ height: 400 }}>
//               <Calendar
//                 onDayPress={(day) => {
//                   setSelectedDate(formatDate(day.dateString));
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
//                   textSectionTitleColor: 'black',
//                   textSectionTitleDisabledColor: '#d9e1e8',
//                   textDayHeaderFontWeight: '700',
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
//                 <View >
//                   <Text style={styles.eventDescription}>{item.description}</Text>
//                   <Text style={styles.eventDate}>Date: {formatDate(item.day.split('T')[0])}</Text>
//                   </View>
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
//                 <Text style={styles.modalHeader}>Events for {formatDate(selectedDate)}</Text>

//                 <FlatList
//                   data={events[selectedDate] || []}
//                   keyExtractor={(item) => item._id}
//                   renderItem={({ item, index }) => (
                    
//                     <View key={index} style={styles.eventItem}>
//                     <View
//                       style={[
//                         styles.eventDot,
//                         {
//                           backgroundColor:
//                             item.resource === 'Holiday'
//                               ? '#EA4747'
//                               : item.resource === 'Trip'
//                               ? '#47EA47'
//                               : '#4775EA',
//                         },
//                       ]}
//                     />
//                     <View>
//                       <Text style={styles.eventTitle}>{item.title}</Text>
//                       <Text style={styles.eventTime}>
//                         {item.start && new Date(item.start).toLocaleTimeString()}
//                       </Text>
//                     </View>
//                   </View>
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
//     marginTop: 20,
//     minHeight: responsiveHeight(45),
//     maxHeight: responsiveHeight(45),    width: '95%',
//     alignSelf: 'center',
//     elevation: 4,
//   },
//   allEventsHeader: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//     paddingVertical:responsiveHeight(4)
//   },
//   list: {
//     width: '90%',
//     borderColor: 'grey',
//     borderRadius: 10,
//     backgroundColor: '#FFFFFF',
//     marginTop: 20,
//     elevation: 5,
//     padding: 15,
//     alignSelf:'center',
//     // position:'relative',
//     // top:responsiveHeight(0)
//   },
//   eventTitleList: {
//     fontSize: 18,
//     color: '#58A8F9',
//     fontWeight: 'bold',
//   },
//   eventDescription: { fontSize: 14, color: 'black',paddingBottom:5, paddingTop:10  },
//   eventDate: { fontSize: 12, color: 'grey', marginTop: 5 },
//   sundayText: { color: 'red' },
//   disabledDayText: { color: 'gray' },
//   eventDayText: { color: 'red' }, // Red and bold for event days
//   selectedDay: { backgroundColor: '#d3e5ff', borderRadius: 5 },
//   modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
//   modalContent: { width: '80%', backgroundColor: 'white', borderRadius: 15, padding: 16 },
//   closeButton: { marginTop: 16, padding: 10, backgroundColor: '#4775EA', borderRadius: 5 },
//   closeButtonText: { color: 'white', textAlign: 'center', fontSize: 16 },

//   eventResource: { fontSize: 14, fontWeight: 'bold', color: 'blue' },
//   noEventsText: { fontSize: 14, color: 'gray', textAlign: 'center', marginTop: 10 },
//   // eventTitle: { fontSize: 16, fontWeight: 'bold' },
//   modalEventItem: { 
//     marginBottom: 8
//   },

//   eventDot: {
//     width: 4,
//     height: 4,
//     borderRadius: 2,
//     backgroundColor: '#4775EA',
//     marginTop: 2,
//   },

//   eventItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   eventTitle: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginLeft: 10,
//   },
//   eventTime: {
//     fontSize: 14,
//     color: '#666',
//     marginLeft: 10,
//   },

//   modalHeader: { 
//     fontSize: 18, 
//     fontWeight: 'bold',
//      marginBottom: 8 
//     },

//   dayContainer: {
//     // padding: 10,
//     alignItems: 'center',
//     justifyContent: 'center',
//     // backgroundColor:'green',
//     height:35,
//     width:35
//   },
//   dayText: { fontSize: 12, textAlign: 'center', color: '#000' },
  
//   img: {
//     marginHorizontal: 20,
//     width: 42,
//     height: 42,
//   },
 
//   dropdown: {
//     height: 50,
//     width: '90%',
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     backgroundColor: '#daedff',
//     marginBottom: 15,
//     alignSelf: 'center',
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
//   placeholderStyle: {
//     fontSize: 15,
//     color: 'grey',
//     paddingHorizontal: 15
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },

  

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

const baseUrl = 'https://api.dreameducation.org.in/api/calendar';

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
    minHeight: responsiveHeight(45),
    maxHeight: responsiveHeight(45),    width: '95%',
    alignSelf: 'center',
    elevation: 4,
  },
  allEventsHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    paddingVertical:responsiveHeight(4)
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
    // position:'relative',
    // top:responsiveHeight(0)
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

