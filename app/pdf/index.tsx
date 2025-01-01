import React, { useState } from 'react';
import { View, Button, Text, Alert, StyleSheet } from 'react-native';
import * as Print from 'expo-print';

const App = () => {
  const [pdfPath, setPdfPath] = useState('');

  const generatePdfAndPrint = async () => {
    const htmlContent = `
  <style>
    body {
      font-family: 'Arial', sans-serif;
      margin: 0;
      padding: 20px;
      background-color: #f9f9f9;
      color: #333;
    }
    .container {
      width: 100%;
      margin: 0 auto;
      text-align: center;
    }
    h1 {
      font-size: 24px;
      color: #4CAF50;
      margin-bottom: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
      background-color: #fff;
    }
    th, td {
      border: 1px solid #ddd;
      text-align: left;
      padding: 10px;
    }
    th {
      background-color: #4CAF50;
      color: white;
    }
    tr:nth-child(even) {
      background-color: #f2f2f2;
    }
    p {
      font-size: 16px;
      font-weight: bold;
      margin-top: 20px;
    }
  </style>
  <div class="container">
    <h1>Student Marksheet</h1>
    <table>
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
    <p>Total: 355/400</p>
  </div>
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

