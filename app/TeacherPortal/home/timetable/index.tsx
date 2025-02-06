import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';

const { width, height } = Dimensions.get('screen'); // Get full screen dimensions

const index = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../../assets/images/images/tcal.jpg')}
        style={styles.image}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row', // Helps with landscape layout
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  image: {
    width: height,  // Swap width & height for landscape mode
    height: width,  
    resizeMode: 'contain', // Show full image without zooming
    transform: [{ rotate: '90deg' }], // Rotate for landscape display
  },
});
