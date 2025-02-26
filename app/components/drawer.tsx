import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../home';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }) => {
  return (
    <View style={styles.drawerContainer}>
      <TouchableOpacity onPress={() => alert('Settings Clicked')}>
        <Text style={styles.drawerItem}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => alert('Logout Clicked')}>
        <Text style={styles.drawerItem}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  drawerItem: {
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});
