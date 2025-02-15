import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Image, FlatList, Platform, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Feather, Fontisto, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import axios from 'axios';
import { getUserData } from '@/app/utils/storage';

type SingeChatMessage = {
  isViewed: boolean,
  _id: string,
  message: string,
  senderID: string,
  channelID: string,
  date: string,
}
const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api'

type UserInfo = {
  userID: string,
  role: string,
  name: string,
};

const ConversationThread = () => {

  const { chatID, chatName } = useLocalSearchParams();
  const [messages, setMessages] = useState<SingeChatMessage[]>([]);
  const [newmessage, setNewMessage] = useState<string>('');
  const flatListRef = useRef<FlatList<SingeChatMessage> | null>(null);
  const [scrollToEnd, setScrollToEnd] = useState<boolean>(false);
  const [currentUser, setcurrentUser] = useState<UserInfo | null>(null);

  getUserData().then((d) => setcurrentUser(d));

  const myAlternateUserId = "TK20243";
  const myStudentUserId = "BK20242";
  const myUserId = myStudentUserId;

  const fetchChat = async () => {
    // console.log("Fetch chat", chatID)
    const response = await axios.get(`${baseUrl}/chats/chat/${chatID}`);
    setMessages(response.data.messages);
    setScrollToEnd(!scrollToEnd);
  }

  useEffect(() => {
    fetchChat();
  }, [chatID]);

  useEffect(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, [scrollToEnd]);

  const sendNewMessage = async () => {
    console.log(newmessage);
    if (newmessage.length > 0) {
      // Hardcoding senderID for now, this should ideally
      // be the userID of the person logging in
      const response = await axios.put(`${baseUrl}/chats/send/${chatID}`, {
        message: newmessage,
        senderID: myUserId,
        channelID: chatID,
      });
      if (response.data.success === true) {
        setMessages(response.data.doc.messages);
        setNewMessage('');
        setScrollToEnd(!scrollToEnd);
      }
    }
  }

  const renderItem = ({ item, index }: { item: SingeChatMessage, index: number }) => {
    //  (item.senderID
    const flexdirection = item.senderID === myUserId ? 'row-reverse' : 'row';
    const chatboxColor = item.senderID === myUserId ? '#58A8F935' : '#58A8F915';
    return (<View style={{
      flexDirection: flexdirection
    }}>
      <View style={{
        borderWidth: 1,
        borderColor: '#7e7e7e28',
        paddingHorizontal: 10,
        width: 'auto',
        paddingVertical: 10,
        marginVertical: 5,
        flexDirection: flexdirection,
        backgroundColor: chatboxColor,
        borderRadius: 5,

      }}>
        <Text style={[flexdirection === 'row' ? { textAlign: 'left' } : null]}>{item.message}</Text>
      </View>
    </View>);
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', top: '15%' }}>
            <View style={styles.headerIcons}>
              {/* <TouchableOpacity>
                <Feather name="message-square" size={22} color="black" style={{ position: 'relative', top: 3 }} />
              </TouchableOpacity>
              <Fontisto name="bell" size={22} color="black" /> */}
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{currentUser?.name}</Text>
              <Text style={styles.userRole}>{currentUser?.role}</Text>
            </View>
            <Image source={require('../../../../assets/images/images/image.png')} style={styles.avatar} />
          </View>
        </View>

        {/* Conversation section */}
        <View style={{
          height: 1,
          width: '100%',
          borderBottomWidth: 0.5,
          borderColor: 'grey',
          marginTop: 50,
          position: 'relative',
        }} />

        {/* <View style={{}}> */}
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
          marginHorizontal: 30,
          // borderWidth: 1, borderColor: "red",
        }}>
          <Text style={styles.Converation}>
            {chatName}
          </Text>
        </View>

        <View style={styles.container1}>
          {/* <ScrollView> */}
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
          />
          {/* </ScrollView> */}
        </View>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center'
        }}>
          <TextInput
            value={newmessage}
            onChangeText={(v) => setNewMessage(v)}
            placeholder='Type ...'
            style={{
              flex: 1,
              borderColor: '#767676',
              borderWidth: 1,
              borderRadius: 24,
              paddingHorizontal: 20,
              marginVertical: 10,
              marginHorizontal: 10,
            }}
          ></TextInput>
          <TouchableOpacity
            onPress={sendNewMessage}
            style={{
              marginEnd: 10,
              backgroundColor: '#ffffff28',
              borderRadius: 24,
              height: 34,
              width: 34,
              alignItems: 'center',
              justifyContent: 'center',
              paddingLeft: 3,
            }}>
            <MaterialIcons name="send" size={24} color="#58A8F9" />
            {/* <Ionicons name="send" size={20} color="#58A8F9" /> */}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>

  );

};

export const styles = StyleSheet.create({
  container: {
    zIndex: 300,
    maxWidth: responsiveWidth(85),
    maxHeight: 220,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    position: 'relative',
    top: '3%',
    alignSelf: 'center',
    borderRadius: '10%',
    borderColor: 'black',
    elevation: 1.5,

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.10,
        shadowRadius: 3.84,
      },

    }),

  },


  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    zIndex: 300,
    position: 'relative',
    top: 25
  },

  userInfo: {
    alignItems: 'center',
    opacity: 1,
    zIndex: 500,
    marginRight: 10,
    position: 'relative',
    bottom: 13
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    opacity: 1,
    zIndex: 500
  },
  userRole: {
    fontSize: 12,
    color: '#7e7e7e',
    lineHeight: 11,
    opacity: 1,
    zIndex: 500

  },
  headerIcons: {
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    opacity: 1,
    zIndex: 500,
    top: 0
  },
  avatar:
  {
    width: 35,
    height: 35,
    borderRadius: 100,
    backgroundColor: 'lightgreen',
    position: 'relative',
    bottom: 13
  },
  container1: {
    flex: 1,
    padding: 30,
    backgroundColor: '#fffff',
  },

  Converation: {
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1

  },
});

export default ConversationThread;