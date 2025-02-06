import AsyncStorage from '@react-native-async-storage/async-storage';

// Save user data
export const saveUserData = async (userData) => {
  try {
    await AsyncStorage.setItem('user_data', JSON.stringify(userData));
  } catch (error) {
    console.error('Error saving user data', error);
  } 
};

// Get user data
export const getUserData = async () => {
  try {
    const userData = await AsyncStorage.getItem('user_data');
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error('Error getting user data', error);
    return null;
  }
};

// Clear user data (for logout)
export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem('user_data');
  } catch (error) {
    console.error('Error clearing user data', error);
  }
};
