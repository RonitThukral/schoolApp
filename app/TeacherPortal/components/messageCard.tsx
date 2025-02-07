import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions, Image, TouchableOpacity, Platform } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";


const screenWidth = Dimensions.get("window").width;


const data = [
  [
    { title: "Inbox", icon: require("../../../assets/images/images/graduate.png"), linking: './message/inbox' },
    { title: "Chat", icon: require("../../../assets/images/images/education.png"), linking: '../../home/Chat' },
    { title: "Message Student", icon: require("../../../assets/images/images/team.png"), linking: './message/messageStudent' },
    { title: "Message Admin", icon: require("../../../assets/images/images/historyStu.png"), linking: './message/messageAdmin' },

  ],

];

const MessageCard = () => {
  const router = useRouter()

  const { teacher } = useLocalSearchParams();
  const parsedTeacher = teacher ? JSON.parse(teacher) : null;


  const handlePress = (link) => {
    router.push({
      pathname: link,
      params: { name: parsedTeacher.name, role: parsedTeacher.role }
    })
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => { handlePress(item.linking) }}>
      <View style={{ width: '80%', height: '85%' }}>

        <Image source={item.icon} style={styles.icon} />
      </View>

      <View style={{ width: '110%', }}>

        <Text style={styles.text}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <View>
          {data.map((group, index) => (
            <FlatList
              key={index}
              data={group}
              renderItem={renderItem}
              keyExtractor={(item, idx) => idx.toString()}
              numColumns={2}
            // style={styles.slide}
            />
          ))}
        </View>

      </View>

    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    //   alignSelf:'center'
    position: 'relative',
    left: 2,
    top: 30,
    backgroundColor: 'white',
    ...Platform.select({
      ios: {
        height: 1000
      },

    }),
  },
  slide: {
    width: screenWidth,
  },
  card: {
    width: screenWidth / 3,
    alignItems: "center",
    padding: 16,
    backgroundColor: "#F2F9FF",
    // backgroundColor: "blue",
    borderRadius: 20,
    margin: 8,
    height: 110
  },
  icon: {
    width: 55,
    height: 60,
    marginTop: -8,
    alignSelf: 'center'
  },
  text: {
    textAlign: "center",
    fontSize: 12,
    color: "#333",
    fontWeight: '500',
    marginVertical: -5
  },

});


export default MessageCard;
