import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

const screenWidth = Dimensions.get("window").width;

const data = [
  [
    { title: "My Profile", icon: require("../../../assets/images/images/kid.png"), linking: "./home/profile" },
    { title: "Syllabus", icon: require("../../../assets/images/images/acad.png"), linking: "./home/courses" },
    { title: "Rewards", icon: require("../../../assets/images/images/classdesk.png"), linking: "./home/rewards" },
    { title: "Time Table", icon: require("../../../assets/images/images/calendar.png"), linking: "./home/timetable" },
    { title: "Fees", icon: require("../../../assets/images/images/finan.png"), linking: "./home/finance" },
    { title: "Report Card", icon: require("../../../assets/images/images/dashboards.png"), linking: "./home/reportCard" },
    { title: "Attendance", icon: require("../../../assets/images/images/atten.png"), linking: "./home/attendance" },
    { title: "Notices", icon: require("../../../assets/images/images/sent.png"), linking: "./home/notices" },
    { title: "Calender", icon: require("../../../assets/images/images/calender.png"), linking: "./home/calender" },
    { title: "Messages", icon: require("../../../assets/images/images/cours.png"), linking: "./home/messages" },
    { title: "SMS", icon: require("../../../assets/images/images/jj.png"), linking: "./home/messages/messageTeacher" },
    { title: "Settings", icon: require("../../../assets/images/images/setting.png"), linking: "./home/settings" },
  ],
];

const Slider = ({student}) => {
  const router = useRouter();
// console.log(student, 'stuetnjtkeakds')
  const handlePress = (link) => {
    router.push({
        pathname: link,
        params: { student: JSON.stringify(student) },  // Use 'params' here instead of 'query'
      });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handlePress(item.linking)}>
      <View style={{ width: "80%", height: "85%" }}>
        <Image
          source={item.icon}
          style={[
            styles.icon,
            item.title === "Teachers" && styles.icon1,
            item.title === "My Class" && styles.icon3,
            item.title === "Fees" && styles.icon4,
            item.title === "SMS" && styles.icon7,
            item.title === "Time Table" && styles.icon6,
            item.title === "Liberary" && styles.icon11,
            item.title === "Buses" && styles.icon16,
            item.title === "Settings" && styles.icon17,
            item.title === "Messages" && styles.icon9,
            item.title === "Notices" && styles.icon13,
            item.title === "Courses" && styles.icon14,
          ]}
        />
      </View>
      <View style={{ width: "110%" }}>
        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data[0]} // Displaying the first group
        renderItem={renderItem}
        keyExtractor={(item, idx) => idx.toString()}
        numColumns={3}
        style={styles.slide}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    position: "relative",
    left: "6%",
  },
  slide: {
    width: screenWidth,
  },
  card: {
    width: screenWidth / 3.9,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F2F9FF",
    borderRadius: 20,
    margin: 8,
    height: 105,
  },
  icon: {
    width: 48,
    height: 58,
    marginBottom: 8,
    alignSelf: "center",
  },
  icon7: {
    width: 50,
    height: 60,
    marginBottom: 15,
    alignSelf: "center",
    marginRight: 10,
  },
  icon6: {
    width: 55,
    height: 55,
    marginTop: 5,
    alignSelf: "center",
  },
  icon9: {
    width: 40,
    height: 55,
    marginTop: 5,
    alignSelf: "center",
  },
  icon13: {
    width: 60,
    height: 60,
    marginTop: 5,
    alignSelf: "center",
    marginRight: 15,
  },
  icon16: {
    width: 55,
    height: 55,
    marginTop: 5,
    alignSelf: "center",
  },
  icon17: {
    width: 55,
    height: 55,
    marginTop: 5,
    alignSelf: "center",
  },
  icon14: {
    width: 65,
    height: 60,
    marginTop: 5,
    alignSelf: "center",
  },
  icon11: {
    width: 50,
    height: 50,
    marginTop: 5,
    alignSelf: "center",
  },
  icon1: {
    width: 65,
    height: 58,
    marginBottom: 8,
    alignSelf: "center",
  },
  icon3: {
    width: 70,
    height: 60,
    marginBottom: 8,
    alignSelf: "center",
  },
  icon4: {
    width: 63,
    height: 53,
    marginBottom: 8,
    alignSelf: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    color: "#333",
    fontWeight: "500",
    marginBottom: 10,
  },
});

export default Slider;
