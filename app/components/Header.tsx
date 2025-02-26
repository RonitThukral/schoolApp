import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';

import { useRouter } from 'expo-router';
import { UserInfo } from '../utils/app.types';
import { getUserData } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';

const HeaderLarge = ({ menuIcon, chatIcon, notificationIcon, handlePressChat, handlePressNotification, openDrawer }: {
  menuIcon?: boolean;
  chatIcon?: boolean;
  notificationIcon?: boolean;
  handlePressChat?: () => void;
  handlePressNotification?: () => void;
  openDrawer?: () => void;
}) => {
  const router = useRouter();
  const [currentUser, setcurrentUser] = useState<UserInfo | null>(null);

  getUserData().then((d) => setcurrentUser(d));
  const navigation = useNavigation();


  const handlePress = () => {
    if (handlePressChat !== undefined) {
      handlePressChat();
    } else {
      router.navigate('./home/Chat');
    }
  }

  const handleNotificationPress = () => {
    if (handlePressNotification) {
      handlePressNotification();
    } else {
      router.navigate('./home/Notices');
    }
  }

  return (
    <View style={styles.header}>
      {menuIcon !== false && <TouchableOpacity onPress={() => { openDrawer && openDrawer(); }}>
        <MaterialIcons name="menu" size={28} color="#000" />
      </TouchableOpacity>}
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', top: '15%' }}>
        <View style={styles.headerIcons}>
          {chatIcon !== false && <TouchableOpacity onPress={handlePress}>
            <Feather name="message-square" size={22} color="black" style={{ position: 'relative', top: 3 }} />
          </TouchableOpacity>}
          {notificationIcon !== false && <TouchableOpacity onPress={handleNotificationPress}>
            <Fontisto name="bell" size={22} color="black" />
            {/* <MaterialCommunityIcons name="bell-badge-outline" size={24} color="black" /> Use when you hace notfication, unseen*/}
          </TouchableOpacity>}
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{currentUser?.name}</Text>
          <Text style={styles.userRole}>{currentUser?.role}</Text>
        </View>
        <Image source={require('../../assets/images/images/image.png')} style={styles.avatar} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 300,
    position: 'relative',
    top: 25


  },
  headerIcons: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    opacity: 1,
    zIndex: 500,
    top: 0
    //   backgroundColor:'red'
  },
  userInfo: {
    alignItems: 'center',
    opacity: 1,
    zIndex: 500,
    marginRight: 10,
    position: 'relative',
    bottom: 1

  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 1,
    zIndex: 500
  },
  userRole: {
    fontSize: 12,
    color: '#7e7e7e',
    lineHeight: 11,
    opacity: 1,
    zIndex: 500

  },
  avatar:
  {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: 'lightgreen',
    position: 'relative',
    bottom: 2
  },
});
export default HeaderLarge;