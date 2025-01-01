import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SetPercentageModal = ({
  isVisible,
  onClose,
  onSave,
  examPercentage1,
  classWorkPercentage1,
  setExamPercentage1,
  setClassWorkPercentage1,
  loadingSubmit,
}) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Set Percentages</Text>
          <TextInput
            style={styles.input}
            placeholder="Classwork Percentage"
            keyboardType="numeric"
            value={classWorkPercentage1}
            onChangeText={setClassWorkPercentage1}
          />
          <TextInput
            style={styles.input}
            placeholder="Exam Percentage"
            keyboardType="numeric"
            value={examPercentage1}
            onChangeText={setExamPercentage1}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onSave}
              disabled={loadingSubmit}
            >
              <Text style={styles.buttonText}>
                {loadingSubmit ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
           <Text style={styles.title}>Set Percentages</Text>
          <TextInput
            style={styles.input}
            placeholder="Classwork Percentage"
            keyboardType="numeric"
            value={classWorkPercentage1}
            onChangeText={setClassWorkPercentage1}
          />
          <TextInput
            style={styles.input}
            placeholder="Exam Percentage"
            keyboardType="numeric"
            value={examPercentage1}
            onChangeText={setExamPercentage1}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={onSave}
              disabled={loadingSubmit}
            >
              <Text style={styles.buttonText}>
                {loadingSubmit ? 'Saving...' : 'Save'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.closeButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    width: '80%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#4fb1f6',
    padding: 8,
    borderRadius: 4,
    flex: 1,
    marginHorizontal: 4,
  },
  closeButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SetPercentageModal;

