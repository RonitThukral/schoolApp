import React, { useState } from 'react';
import { StyleSheet, View, Text, Dimensions, TouchableOpacity, ImageBackground, useWindowDimensions } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import Summary from '../Reports/summary';
import Inventory from './inventory';
import Sales from './sales';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const TabCarousel = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'inventory', title: 'INVENTORY' },
    { key: 'sales', title: 'SALES' },

  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {

      case 'inventory':
        return (
          <Inventory />
        );
      case 'sales':
        return (
          <Sales />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../../../assets/images/images/ellipse1.png')} style={styles.bgImg} imageStyle={{ width: responsiveHeight(70), position: 'relative', alignSelf: 'flex-end', }}>
        <View style={styles.schoolInfo}>

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
  tabView: {
    flex: 1,
    // backgroundColor:'transparent',
    // backgroundColor:'blue',
    zIndex: 837,
    position: 'relative',
    marginTop: -50,

  },
  tabBar: {
    backgroundColor: 'transparent',  // Tab bar background color
    paddingHorizontal: 30
  },
  indicatorStyle: {
    backgroundColor: '#58a8f9',  // Indicator color
    height: 2,
    width: Dimensions.get('window').width * 0.1,
    marginLeft: 93,
    marginBottom: 10
  },
  labelStyle: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: 'blue', // Label color
    backgroundColor: 'transparent',
    height: 60,
    width: Dimensions.get('window').width * 0.4,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  tabStyle: {
    // padding: 0,
    // color:'blue' // Add padding to the tab for better visibility
    // backgroundColor:'red'
    // position:'absolute',
    // bottom:90

  },
  bgImg: {
    backgroundColor: '#daedff',
    height: 160,
    width: '100%',
  },

  schoolInfo: {
    alignItems: "center",
    marginBottom: 20,
    position: 'absolute',
    top: '40%',
    alignSelf: 'center'
  },
  schoolName: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: "bold",
    color: "#1f2937",
  },
  schoolSub: {
    fontSize: 12,
    color: "#6b7280",
  },
});

export default TabCarousel;
