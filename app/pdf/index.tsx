import React, { useState } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import * as Print from 'expo-print';

const App = () => {
  const [pdfPath, setPdfPath] = useState('');

  const generatePdfAndPrint = async () => {
    const htmlContent = `
      <h1>Student Marksheet</h1>
      <table border="1" cellpadding="10" cellspacing="0" style="width: 100%; margin-top: 20px;">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mathematics</td>
            <td>85</td>
          </tr>
          <tr>
            <td>English</td>
            <td>90</td>
          </tr>
          <tr>
            <td>Science</td>
            <td>88</td>
          </tr>
          <tr>
            <td>History</td>
            <td>92</td>
          </tr>
        </tbody>
      </table>
      <p><strong>Total: 355/400</strong></p>
    `;

    try {
      // Generate PDF using expo-print
      const { uri } = await Print.printToFileAsync({ html: htmlContent });

      // Set the generated PDF URI
      setPdfPath(uri);
      // Open the print dialog directly
      await Print.printAsync({
        uri: uri,
      });
      
      Alert.alert('Print dialog opened!', 'Ready to print the PDF.');
    } catch (error) {
      console.error("Error generating PDF:", error);
      Alert.alert('Error', 'Failed to generate or print PDF');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Generate and Print PDF" onPress={generatePdfAndPrint} />
      {pdfPath ? (
        <Text style={styles.text}>PDF saved at: {pdfPath}</Text>
      ) : (
        <Text style={styles.text}>No PDF generated yet.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default App;

