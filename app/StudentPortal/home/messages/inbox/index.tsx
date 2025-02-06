import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { RotateOutDownRight } from 'react-native-reanimated';

const ComingSoonScreen = () => {
  return (
    <View style={styles.container}>
      <Image 
        source={require('../../../../../assets/images/images/handboy.png')}
        style={styles.image}
      />
      <Text style={styles.title}>We're Launching Soon!</Text>
      <Text style={styles.subtitle}>
        Our team is working hard to give you an amazing experience. Stay tuned!
      </Text>

      <TouchableOpacity style={styles.notifyButton}>
        <Text style={styles.notifyText}>Notify Me</Text>
      </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E2E',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: Dimensions.get('window').width * 0.8,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  notifyButton: {
    backgroundColor: '#FF6F61',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 35,
    marginBottom: 30,
  },
  notifyText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerText: {
    fontSize: 14,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#FFFFFF',
  },
});

export default ComingSoonScreen;