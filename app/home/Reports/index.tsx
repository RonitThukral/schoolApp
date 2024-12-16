import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions,TouchableOpacity,ImageBackground, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Summary from './summary';
import Students from './totalStudents';
import Staff from './totalStaff';
import Finance from './finance';
import Academics from './acedemics';
import Attendance from './attendance';

const TabCarousel = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'summary', title: 'SUMMARY' },
    { key: 'academics', title: 'ACADEMICS' },
    { key: 'attendance', title: 'ATTENDANCE' },
    { key: 'students', title: 'STUDENTS' },
    { key: 'staff', title: 'STAFF' },
    { key: 'finance', title: 'FINANCE' },
    { key: 'activity', title: 'ACTIVITY' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'academics':
        return (
          <Academics />
        );
      case 'attendance':
        return (
          <Attendance />
        );
      case 'students':
        return (
         <Students />
        );
      case 'finance':
        return (
          <Finance />
        );
      case 'staff':
        return (
          <Staff />
        );
      case 'activity':
        return (
          <Staff />
        );
      case 'summary':
        return (
            <Summary />
          
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/images/union.png')} style={styles.bgImg}>
<View style={styles.schoolInfo}>
        <Text style={styles.schoolName}>ROSES 'N' LILIES HIGH SCHOOL</Text>
        <Text style={styles.schoolSub}>DREAMS CLOUDTECH</Text>
      </View>

      {/* Tabs */}
     
</ImageBackground>

      <TabView
      style={styles.tabView}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={layout}
        renderTabBar={(props) => (
          <TabBar
            {...props}
            style={styles.tabBar}
            indicatorStyle={styles.indicatorStyle} 
            // tabStyle={styles.tabStyle} 
            scrollEnabled={true}
            renderTabBarItem={({ route }) => (
              <TouchableOpacity onPress={() => setIndex(props.navigationState.routes.findIndex(r => r.key === route.key))}>
                <Text
                  style={[
                    styles.labelStyle,
                    { color: index === props.navigationState.routes.findIndex(r => r.key === route.key) ? '#58a8f9' : 'grey' } // Set color based on the active index
                  ]}
                >
                  {route.title}
                </Text>
              </TouchableOpacity>
            )}
            
          />
        )}
      />
</View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',    
  },
 
  scene: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'green',
    // height:'100%',
   
    
  },
  tabView:{
    flex:1,
    // backgroundColor:'transparent',
    // backgroundColor:'blue',
    zIndex:837,
    position:'relative',
    marginTop:-50

  },
  tabBar: {
    backgroundColor: 'transparent',  // Tab bar background color
  //  fontSize:18
  },
  indicatorStyle: {
    backgroundColor: '#58a8f9',  // Indicator color
    height: 2,
    width:Dimensions.get('window').width*0.25,
    marginLeft:30,
    marginBottom:10
  },
  labelStyle: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: 'blue', // Label color
    backgroundColor:'transparent',
    height:60,
    width: Dimensions.get('window').width*0.4,
    textAlign:'center',
    textAlignVertical:'center'
  },
  tabStyle: {
    

  },
  bgImg:{
    backgroundColor:'#daedff',
    height:270,
    width:'100%'
  },
 
  schoolInfo: {
    alignItems: "center",
    marginBottom: 20,
    position:'absolute',
    top:'40%',
    alignSelf:'center'
  },
  schoolName: {
    textAlign:'center',
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
  },
  schoolSub: {
    fontSize: 14,
    color: "#58a8f9",
    fontWeight:'600'
  },
});

export default TabCarousel;
