import Constants from "expo-constants";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, FlatList, StyleSheet, ScrollView } from "react-native";

const baseUrl = Constants.expoConfig.extra.API_URL;


const SalesReceipt = () => {
  const [salesData, setSalesData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { saleId } = useLocalSearchParams();

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await fetch(
          `${baseUrl}/store/sales/${saleId}`
        );
        const data = await response.json();
        if (data.success) {
          setSalesData(data.doc);
        }
      } catch (error) {
        console.error("Error fetching sales data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSalesData();
  }, [saleId]);

  if (loading) return <View style={{ position: "relative", top:'40%' }}>
              <ActivityIndicator size="large" color="#58A8F9" />
              </View>;
  if (!salesData) return <Text style={styles.errorText}>No sales data found</Text>;

  const { seller, createdAt, amountPaid, totalCost, items } = salesData;
  const change =  totalCost - amountPaid;

  return (
    <View style={styles.screenContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>Sales Receipt</Text>
          <Text style={styles.schoolName}>ROSES 'N' LILIES HIGH SCHOOL</Text>
          <Text style={styles.date}>Date: {new Date(createdAt).toLocaleDateString()}</Text>
          <Text style={styles.cashier}>Cashier: {seller}</Text>

          <View style={styles.tableContainer}>
  {/* Table Headers */}
  <View style={styles.tableHeader}>
    <Text style={styles.tableHeaderText}>Sr No.</Text>
    <Text style={styles.tableHeaderText}>Item</Text>
    <Text style={styles.tableHeaderText}>Rate</Text>
    <Text style={styles.tableHeaderText}>Qty</Text>
    <Text style={styles.tableHeaderText}>Amount (Rs)</Text>
  </View>

  {/* Items List */}
  <FlatList
    data={items}
    keyExtractor={(item) => item._id}
    renderItem={({ item, index }) => (
      <View style={[index % 2 === 0 ? styles.tableRow : styles.oddTableRow]}>
        <Text style={styles.tableCell}>{index + 1}</Text>
        <Text style={styles.tableCell}>{item.name}</Text>
        <Text style={styles.tableCell}>{item.rate}</Text>
        <Text style={styles.tableCell}>{item.qty}</Text>
        <Text style={styles.tableCell}>{item.amount}</Text>
      </View>
    )}
  />
</View>


          {/* Summary */}
          <View style={styles.summary}>
            <Text style={styles.summaryText}>Total Cost: {totalCost} Rs</Text>
            <Text style={styles.summaryText}>Amount Paid: {amountPaid} Rs</Text>
            <Text style={styles.summaryText}>Change: {change} Rs</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SalesReceipt;

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#fff", // Whole screen background white
    paddingTop: 100, // Pushes content down, avoiding header
  },
  scrollContainer: {
    flexGrow: 1,
    // justifyContent: "center",
  },
  container: {
    height: 'auto', // Covers half of the screen
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5, // Shadow for better visibility
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color:'#58a8f9'
  },
  schoolName: {
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
    color:'red'
  },
  date: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight:'500'
  },
  cashier: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight:'500'

  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingVertical: 5,
    backgroundColor: "#58a8f9",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color:'white'
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
  },
  oddTableRow: {
    flexDirection: "row",
    paddingVertical: 5,
    borderBottomWidth: 0.5,
    backgroundColor:'#daedff'
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  summary: {
    marginTop: 10,
    padding: 10,
    borderTopWidth: 1,
  },
  summaryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    color: "red",
    fontSize: 18,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: "#58a8f9",
    borderRadius: 5,
    marginVertical: 10,
    overflow: "hidden",
  },

});
