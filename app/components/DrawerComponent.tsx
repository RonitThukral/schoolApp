import { View, Text, TouchableOpacity, Image, StyleSheet, BackHandler, TouchableWithoutFeedback, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons'
import { RelativePathString, router } from 'expo-router'
import { clearUserData, getUserData } from '../utils/storage'
import * as Updates from 'expo-updates';  // Correct import after installation
import { Item } from 'react-native-paper/lib/typescript/components/Drawer/Drawer'
import { UserInfo } from '../utils/app.types'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { GestureEvent, PanGestureHandler, PanGestureHandlerEventPayload } from 'react-native-gesture-handler'



const DrawerComponent = ({ drawerOpen, setDrawerOpen, settingsRoute }: {
  drawerOpen: boolean;
  setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  settingsRoute: RelativePathString,
}) => {
  const [currentUser, setcurrentUser] = useState<UserInfo | null>(null);

  getUserData().then((d) => setcurrentUser(d));

  const translateX = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(drawerOpen ? 0 : -300, { duration: 300 }) }],
    };
  });

  const onGestureEvent = (event: GestureEvent<PanGestureHandlerEventPayload>) => {
    if (event.nativeEvent.translationX > 100) {
      setDrawerOpen(true);
    } else if (event.nativeEvent.translationX < -100) {
      setDrawerOpen(false);
    }
  };

  // Handle back button press on Android to close the drawer
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (drawerOpen) {
        setDrawerOpen(false);
        return true; // prevent default back button behavior (exit app)
      }
      return false; // allow default back button behavior (exit app)
    });

    return () => backHandler.remove();
  }, [drawerOpen]);

  const handlesettingPress = () => {
    setDrawerOpen(false);
    // router.navigate(settingsRoute);

    const params = currentUser?.role === "admin"
      ? { admin: JSON.stringify(currentUser) }
      : currentUser?.role === "student"
        ? { student: JSON.stringify(currentUser) }
        : { teacher: JSON.stringify(currentUser) };
    router.push({
      pathname: settingsRoute,
      params,  // Use 'params' here instead of 'query'
    });
  }

  const handleLogout1 = async () => {
    try {
      await clearUserData();
      // Assuming userData is stored after login
      await Updates.reloadAsync();  // This will reload the app to the initial state

      router.replace('/'); // Redirect to login if not authenticated
      // Navigate to the root of your app
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  return (
    <>
      {drawerOpen && <TouchableWithoutFeedback onPress={() => setDrawerOpen(false)}>
        <View style={styles.overlay} />
      </TouchableWithoutFeedback>}

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={[styles.drawer, translateX]}>
          <SafeAreaView style={styles.drawerContent}>

            <View style={styles.container}>
              <View style={styles.bannercontainer}>
                <Image source={require('../../assets/images/images/Vector.png')} style={styles.banner} />
                <View style={styles.profilecontainer}>
                  <Image source={require('../../assets/images/images/image.png')} style={styles.profilepic} />
                  <View style={styles.profileinfo}>
                    <Text style={styles.profilename}>{currentUser?.name} </Text>
                    <Text style={styles.profilerole}>{currentUser?.role} </Text>
                  </View>
                </View>
                {/* <Image source={require('../../assets/images/images/Vector.png')} /> */}
              </View>

              <View style={styles.setting}>
                <TouchableOpacity onPress={handlesettingPress} style={styles.item}>
                  <FontAwesome6 name="gear" size={30} color="#58a8f9" /><Text style={styles.itemtext}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleLogout1} style={styles.item}>
                  <MaterialCommunityIcons name="logout" size={30} color="#58a8f9" /><Text style={styles.itemtext}>Logout</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 300,
  },
  banner: {
    width: 300,
    position: 'absolute',
    top: 0,
    left: 0,
    height: 200,
  },
  bannercontainer: {
    position: "static",
    height: 200,
  },
  setting: {
    padding: 20,
    gap: 10,
  },
  item: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
  },
  itemtext: {
    fontSize: 20,
  },
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#ffffff',
    zIndex: 3100,
  },
  drawerContent: {
    flex: 1,
    // padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent overlay
    zIndex: 5,
  },
  profilecontainer: {
    flexDirection: "row",
    padding: 20,
    gap: 20,
    alignItems: "center",
    height: '100%',
  },
  profilepic: {
    width: 100,
    height: 100,
  },
  profileinfo: {
    justifyContent: "center",
  },
  profilename: {
    fontSize: 20,
    color: "#58a8f9",
    fontWeight: "bold",
  },
  profilerole: {
    fontSize: 12,
  }
})



export default DrawerComponent