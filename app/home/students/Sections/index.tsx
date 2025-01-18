import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import axios from "axios";
import { responsiveWidth } from "react-native-responsive-dimensions";

const API_BASE_URL = "https://dreamscloudtechbackend.onrender.com/api";

const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [sections, setSections] = useState([]);
  const [sectionName, setSectionName] = useState("");
  const [currentId, setCurrentId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/sections`);
      if (response.data && Array.isArray(response.data)) {
        setSections(response.data);
      } else {
        setSections([]);
        Alert.alert("Error", "Invalid data received from the server.");
      }
    } catch (error) {
      console.error("Error fetching sections", error);
      Alert.alert("Error", "Failed to fetch sections.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddSection = async () => {
    if (!sectionName.trim()) {
      Alert.alert("Error", "Section name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`${API_BASE_URL}/sections/create`, {
        name: sectionName,
      });
      setSections([response.data.doc, ...sections]);
      setSectionName("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error adding section", error);
      Alert.alert("Error", "Failed to add section.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSection = async (id) => {
    setLoading(true);
    try {
      await axios.delete(`${API_BASE_URL}/sections/delete/${id}`);
      setSections(sections.filter((section) => section._id !== id));
    } catch (error) {
      console.error("Error deleting section", error);
      Alert.alert("Error", "Failed to delete section.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditSection = (id) => {
    const section = sections.find((item) => item._id === id);
    if (!section) {
      Alert.alert("Error", "Section not found.");
      return;
    }
    setSectionName(section.name);
    setCurrentId(id);
    setEdit(true);
  };

  const handleUpdateSection = async () => {
    if (!sectionName.trim()) {
      Alert.alert("Error", "Section name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/sections/update/${currentId}`, {
        name: sectionName,
      });
      setSections(
        sections.map((section) =>
          section._id === currentId ? response.data?.doc : section
        )
      );
      setEdit(false);
      setSectionName("");
      setCurrentId(null);
    } catch (error) {
      console.error("Error updating section", error);
      Alert.alert("Error", "Failed to update section.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "long", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", options).replace(",", ""); // Remove any commas
  };

  const renderSection = useCallback(
    ({ item }) => (
      <View style={styles.list} key={item._id}>
        <View style={styles.listContent}>
          <Text style={{ color: "#58A8F9", fontSize: 22, fontWeight: "bold" }}>
            {item.name}
          </Text>
          <Text style={{ color: "grey", fontSize: 12, fontWeight: "800", paddingVertical: 5 }}>
            Created On: {formatDate(item.createdAt)}
          </Text>
        </View>
        <View style={styles.listBtns}>
          <TouchableOpacity
            style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}
            onPress={() => handleEditSection(item._id)}
          >
            <Image source={require("../../../../assets/images/images/edit.png")} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{ width: 40, height: 40, justifyContent: "center", alignItems: "center" }}
            onPress={() => handleDeleteSection(item._id)}
          >
            <Image source={require("../../../../assets/images/images/delete.png")} />
          </TouchableOpacity>
        </View>
      </View>
    ),
    [sections]
  );

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSections();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../../../assets/images/images/union.png")}
        style={styles.background}
        imageStyle={{ resizeMode: "cover", position: "absolute", bottom: 580 }}
      >
        <View style={{ position: "relative", marginTop: 65 }}>
          {loading && sections.length === 0 ? (
            <ActivityIndicator size="large" color="#58A8F9" />
          ) : (
            <FlatList
              data={sections}
              keyExtractor={(item) => item._id.toString()}
              renderItem={renderSection}
              contentContainerStyle={styles.lists}
              refreshing={refreshing}
              onRefresh={handleRefresh}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={10}
            />
          )}
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsOpen(true)}
        >
          <Entypo name="plus" size={40} color="white" />
        </TouchableOpacity>

        {(isOpen || edit) && (
          <View style={styles.inputContainer}>
            <Text style={styles.inputHeader}>{edit ? "Edit Section" : "Add Section"}</Text>
            <TextInput
              style={styles.input}
              placeholder={edit ? "Edit Section" : "Add Section"}
              onChangeText={(text) => setSectionName(text)}
              value={sectionName}
            />
            <View style={styles.inputActions}>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => {
                  setIsOpen(false);
                  setEdit(false);
                  setSectionName("");
                }}
              >
                <Text style={styles.closeBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.saveBtn}
                onPress={edit ? handleUpdateSection : handleAddSection}
              >
                <Text style={styles.saveBtnText}>{edit ? "Save" : "Add"}</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#daedff",
  },
  list: {
    width: "90%",
    height: 100,
    borderColor: "grey",
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 15,
    flex: 1,
    elevation: 4,

    
  },
  listContent: {
    flexDirection: "column",
    paddingHorizontal: 25,
    justifyContent: "flex-start",
  },
  listBtns: {
    flexDirection: "row",
    position: "absolute",
    right: 30,
    justifyContent: "space-between",
  },
  lists: {
    paddingTop: 20, // Added padding to avoid mix-up
    paddingBottom: 70,
    ...Platform.select({
      ios: {
        paddingTop: 0, // Added padding to avoid mix-up
        paddingBottom: 20,
      },
      
    }),
  },
  addButton: {
    width: 80,
    height: 80,
    backgroundColor: "#58A8F9",
    zIndex: 1,
    position: "absolute",
    borderRadius: 40,
    bottom: 85,
    justifyContent: "center",
    alignSelf: "flex-end",
    right: 55,
    alignItems: "center",
  },
  inputContainer: {
    position: "absolute",
    width: "80%",
    height: 180,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: "center",
    alignSelf: "center",
    top: "30%",
    elevation:5
  },
  inputHeader: {
    fontSize: 24,
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignSelf: "flex-start",
  },
  input: {
    width: "80%",
    height: 50,
    backgroundColor: "#DAEDFF",
    borderRadius: 10,
    alignSelf: "center",
    paddingHorizontal: 25,
    marginBottom: 15,
  },
  inputActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  closeBtn: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: responsiveWidth(5),
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
  },
  closeBtnText: {
    color: "#58A8F9",
    fontSize: 16,
  },
  saveBtn: {
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#58A8F9",
    marginRight:responsiveWidth(8)
  },
  saveBtnText: {
    color: "white",
    fontSize: 16,
  },
});

export default App;
