// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
// import { RotateOutDownRight } from 'react-native-reanimated';

// const ComingSoonScreen = () => {
//   return (
//     <View style={styles.container}>
//       <Image 
//         source={require('../../../../assets/images/images/handboy.png')}
//         style={styles.image}
//       />
//       <Text style={styles.title}>We're Launching Soon!</Text>
//       <Text style={styles.subtitle}>
//         Our team is working hard to give you an amazing experience. Stay tuned!
//       </Text>

//       <TouchableOpacity style={styles.notifyButton}>
//         <Text style={styles.notifyText}>Notify Me</Text>
//       </TouchableOpacity>


//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#1E1E2E',
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 20,
//   },
//   image: {
//     width: Dimensions.get('window').width * 0.8,
//     height: 200,
//     resizeMode: 'contain',
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#CCCCCC',
//     textAlign: 'center',
//     marginBottom: 30,
//     lineHeight: 24,
//   },
//   notifyButton: {
//     backgroundColor: '#FF6F61',
//     borderRadius: 25,
//     paddingVertical: 12,
//     paddingHorizontal: 35,
//     marginBottom: 30,
//   },
//   notifyText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   footerText: {
//     fontSize: 14,
//     color: '#FFFFFF',
//     marginBottom: 10,
//   },
//   socialIcons: {
//     flexDirection: 'row',
//     gap: 20,
//   },
//   icon: {
//     width: 30,
//     height: 30,
//     tintColor: '#FFFFFF',
//   },
// });

// export default ComingSoonScreen;
import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// Initial events
const initialEvents = {
  '2024-12-05': [
    { title: 'Team Meeting', time: '10:00 AM', type: 'work' },
    { title: 'Lunch with Client', time: '12:30 PM', type: 'work' },
  ],
  '2024-12-15': [{ title: 'Birthday Party', time: '7:00 PM', type: 'personal' }],
  '2024-12-25': [{ title: 'Christmas Celebration', time: '11:00 AM', type: 'holiday' }],
};

const CalendarComponent = () => {
  const [events, setEvents] = useState(initialEvents);
  const [selectedDate, setSelectedDate] = useState('');
  const [newEvent, setNewEvent] = useState({ title: '', time: '', type: 'personal' });
  const [modalVisible, setModalVisible] = useState(false);

  const getMarkedDates = () => {
    const marked: any = {};
    Object.keys(events).forEach((date) => {
      marked[date] = {
        marked: true,
        dotColor: 'blue',
        selected: date === selectedDate,
        selectedColor: date === selectedDate ? 'blue' : undefined,
      };
    });
    if (selectedDate && !marked[selectedDate]) {
      marked[selectedDate] = { selected: true, selectedColor: '#58a8f9' };
    }
    return marked;
  };

  const handleAddEvent = () => {
    if (selectedDate && newEvent.title && newEvent.time) {
      const updatedEvents = { ...events };
      if (!updatedEvents[selectedDate]) {
        updatedEvents[selectedDate] = [];
      }
      updatedEvents[selectedDate].push(newEvent);
      setEvents(updatedEvents);
      setNewEvent({ title: '', time: '', type: 'personal' });
      setModalVisible(false); // Close modal after adding event
    }
  };

  const handleDeleteEvent = (index: number) => {
    if (selectedDate) {
      const updatedEvents = { ...events };
      updatedEvents[selectedDate].splice(index, 1);
      if (updatedEvents[selectedDate].length === 0) {
        delete updatedEvents[selectedDate];
      }
      setEvents(updatedEvents);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => {
          setSelectedDate(day.dateString);
          setModalVisible(true);
        }}
        markedDates={getMarkedDates()}
        style={styles.calendar}
        theme={{
          textDayFontSize: 14,
          textMonthFontSize: 16,
          todayTextColor: 'red',
          arrowColor: '#58a8f9',
        }}
        enableSwipeMonths={true}
      />

      <FlatList
        data={events[selectedDate] || []}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.eventItem}>
            <Text style={styles.eventText}>{`${item.title} - ${item.time}`}</Text>
            <TouchableOpacity onPress={() => handleDeleteEvent(index)} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>{`Events for ${selectedDate}`}</Text>
            {/* {events[selectedDate]?.map((event, index) => (
              <View key={index} style={styles.modalEventItem}>
                <Text style={styles.modalEventText}>{`${event.title} - ${event.time}`}</Text>
              </View>
            ))} */}
            <TextInput
              style={styles.input}
              placeholder="Event Title"
              value={newEvent.title}
              onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Time (e.g., 10:00 AM)"
              value={newEvent.time}
              onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
            />
            <View style={{flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(85)}}>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.addButton} onPress={handleAddEvent}>
              <Text style={styles.addButtonText}>Add Event</Text>
            </TouchableOpacity>
            
            </View>
            
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 16, 
    backgroundColor: 'white', 
    paddingTop: 60 
  },
  calendar: {
    borderRadius: 10, 
    marginBottom: 16, 
    elevation: 5
  },
  eventItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15, 
    borderWidth: 0.5, 
    marginBottom: 10, 
    width: responsiveWidth(85), 
    alignSelf: 'center', 
    borderRadius: 10, 
    height: responsiveHeight(8) 
  },
  eventText: { 
    fontSize: 18, 
    color: '#333', 
    textAlignVertical: 'center' 
  },
  deleteButton: { 
    backgroundColor: '#58a8f9', 
    padding: 5, 
    borderRadius: 5 
  },
  deleteButtonText: { 
    color: 'white', 
    fontSize: 12, 
    textAlignVertical: 'center' 
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalContent: { 
    width: '90%', 
    backgroundColor: 'white', 
    borderRadius: 10, 
    padding: 16 
  },
  modalHeader: { 
    fontSize: 18, 
    fontWeight: 'bold',
     marginBottom: 8 
    },
  modalEventItem: { 
    marginBottom: 8 
  },
  modalEventText: { 
    fontSize: 16, 
    color: '#333' 
  },
  input: {
    //  borderWidth: 1, 
    //  borderColor: '#ccc',
      borderRadius: 5, 
      padding: 8, 
      marginBottom: 8,
      backgroundColor:'#daedff',
      width:responsiveWidth(84),
      height:responsiveHeight(6)

     },
  addButton: { 
    marginTop: 16, 
    backgroundColor: '#58a8f9', 
    padding: 10, 
    borderRadius: 5,
    height:responsiveHeight(5),
    marginRight:5
   },
  addButtonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontSize: 14 
  },
  closeButton: { 
    marginTop: 16, 
    padding: 8, 
    backgroundColor: 'transparent', 
    borderRadius: 5,
    height:responsiveHeight(5),
 
  },
  closeButtonText: { 
    color: '#58a8f9', 
    textAlign: 'center', 
    fontSize: 16 
  },
});

export default CalendarComponent;
