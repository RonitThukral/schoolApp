

import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Modal , TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { useState } from 'react';

// Sample events data
const sampleEvents = {
  '2024-12-05': [
    { title: 'Team Meeting', time: '10:00 AM', type: 'work' },
    { title: 'Lunch with Client', time: '12:30 PM', type: 'work' }
  ],
  '2024-12-15': [
    { title: 'Birthday Party', time: '7:00 PM', type: 'personal' }
  ],
  '2024-12-25': [
    { title: 'Christmas Celebration', time: '11:00 AM', type: 'holiday' }
  ]
};

// Event Modal Component
const EventModal = ({ visible, events, date, onClose }: any):any => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>{`Events for ${date}`}</Text>
          {events.map((event:any, index:number):any => (
            <View key={index} style={styles.eventItem}>
              <View style={[styles.eventDot, { backgroundColor: event.type === 'work' ? '#4775EA' : event.type === 'personal' ? '#EA4747' : '#47EA47' }]} />
              <View>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventTime}>{event.time}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

// Calendar Component
const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const currentDate = new Date();
  const daysInMonth = new Date(2024, 11, 0).getDate();
  const firstDayOfMonth = new Date(2024, 11, 1).getDay();
  
  const formatDate = (day:any) => {
    return day ? `2024-12-${day.toString().padStart(2, '0')}` : null;
  };

  const hasEvents = (day:any):any => {
    const date = formatDate(day);
    return date && sampleEvents[date];
  };

  const handleDayPress = (day: number | null) => {
    const date = formatDate(day);
    if (date && sampleEvents[date]) {
      setSelectedDate(date);
      setModalVisible(true);
    }
  };

  const generateCalendarDays = () => {
    const days = [];
    let dayCounter = 1;
    
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDayOfMonth) {
          week.push(null);
        } else if (dayCounter <= daysInMonth) {
          week.push(dayCounter);
          dayCounter++;
        } else {
          week.push(null);
        }
      }
      days.push(week);
    }
    return days;
  };

  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const calendarDays = generateCalendarDays();

  return (
    <View style={styles.calendarContainer}>
      <View style={styles.calendarHeader}>
        <Text style={styles.calendarTitle}>Event Calendar</Text>
        <Text style={styles.monthYear}>Dec, 2024</Text>
      </View>
      
      <View style={styles.weekDaysContainer}>
        {weekDays.map((day, index) => (
          <Text key={index} style={styles.weekDay}>
            {day}
          </Text>
        ))}
      </View>
      
      <View style={styles.daysContainer}>
        {calendarDays.map((week, weekIndex) => (
          <View key={weekIndex} style={styles.weekRow}>
            {week.map((day, dayIndex) => (
              <TouchableOpacity
                key={dayIndex}
                style={[styles.dayCell, hasEvents(day) && styles.hasDayEvents]}
                onPress={() => handleDayPress(day)}
                disabled={!day}
              >
                {day && (
                  <View>
                    <Text style={styles.dayText}>{day}</Text>
                    {hasEvents(day) && <View style={styles.eventDot} />}
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <EventModal
        visible={modalVisible}
        events={selectedDate ? sampleEvents[selectedDate] : []}
        date={selectedDate}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

// Finance Chart
const FinanceChart = () => {
  const data = {
    labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
    datasets: [
      {
        data: [30, 45, 28, 65, 45, 55, 40],
        color: () => '#4A90E2', // Income
        strokeWidth: 2,
      },
      {
        data: [20, 35, 40, 45, 35, 40, 30],
        color: () => '#F44336', // Expense
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View style={styles.financeContainer}>
      <Text style={styles.financeTitle}>Finance</Text>
      <LineChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: () => '#999999',
          style: {
            borderRadius: 16,
          },
        }}
        bezier
        style={styles.chart}
      />
    </View>
  );
};

// Main Dashboard
const Dashboard = () => {
  return (
    <ScrollView style={styles.container}>
      <Calendar />
      <FinanceChart />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  
  financeContainer: {
    backgroundColor: 'white',
    margin: 16,
    borderRadius: 12,
    padding: 16,
  },
  financeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      },
      modalContent: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '80%',
        maxHeight: '80%',
      },
      modalHeader: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
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
      closeButton: {
        marginTop: 15,
        padding: 10,
        backgroundColor: '#4775EA',
        borderRadius: 10,
        alignItems: 'center',
      },
      closeButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
      },
      container: {
            flex: 1,
            backgroundColor: 'white',
          },
          calendarContainer: {
            padding: 25,
          },
          calendarHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 25,
          },
          calendarTitle: {
            fontSize: 20,
            fontWeight: 'bold',
          },
          monthYear: {
            fontSize: 16,
            color: '#666',
          },
          weekDaysContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 10,
          },
          weekDay: {
            fontSize: 12,
            color: '#666',
          },
          daysContainer: {
            borderWidth: 1,
            borderColor: '#eee',
            borderRadius: 10,
          },
          weekRow: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 10,
          },
          dayCell: {
            width: 30,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            
          },
          hasDayEvents: {
            backgroundColor: '#f0f7ff',
            borderRadius: 15,
          },
          dayText: {
            fontSize: 14,
          },
          eventDot: {
            width: 4,
            height: 4,
            borderRadius: 2,
            backgroundColor: '#4775EA',
            marginTop: 2,
          },
});

export default Dashboard;
