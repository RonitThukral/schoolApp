import { Feather, Fontisto, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Platform, FlatList, TextInput } from 'react-native'
import { responsiveWidth } from 'react-native-responsive-dimensions'
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { router } from 'expo-router';

export type ChatsResponseItem = {
  _id: string,
  acceptor_id?: string,
  requestor_id?: string,
  chatName?: string,
  messages: {
    isViewed: boolean,
    _id: string,
    message: string,
    senderID: string,
    channelID: string,
    date: string,
  }[]
};

export type UserDataResponseItem = {
  _id: string,
  name: string,
  middleName: string,
  surname: string,
  userID: string,
};

export type UsersStore = Map<string, UserDataResponseItem>;

const baseUrl = 'https://dreamscloudtechbackend.onrender.com/api';

const Conversation = () => {

  const [data, setData] = useState<ChatsResponseItem[]>([]);
  const [users, setUsers] = useState<UsersStore>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);





  const renderItem = ({ item, index }: { item: ChatsResponseItem, index: number }) => (
    <View style={{ flexDirection: "row", gap: 20, alignItems: 'center' }}>
      {/* <Image source={(item.profile)} /> */}
      <Image style={styles.profilephoto} source={require('../../../assets/images/images/emptyAvatar.png')} />
      <TouchableOpacity onPress={() => {
        const chatName: string = `${users?.get(item.acceptor_id ?? "")?.name ?? ""} ${users?.get(item.acceptor_id ?? "")?.middleName ?? ""} ${users?.get(item.acceptor_id ?? "")?.surname ?? ""} ${item.chatName ?? ""}`;
        router.push({
          pathname: '/home/Chat/ConversationThread',
          params: { chatID: item._id, chatName },  // Use 'params' here instead of 'query'
        });
      }}>
        <View style={styles.messageContainer}>
          {index != 0 && <View style={styles.hr} />}
          {item.acceptor_id &&
            <Text style={styles.sender}>{users?.get(item.acceptor_id)?.name} {users?.get(item.acceptor_id)?.middleName} {users?.get(item.acceptor_id)?.surname}</Text>}
          {item.chatName &&
            <Text style={styles.sender}>{item.chatName}</Text>}
          <Text style={styles.message} ellipsizeMode='tail' numberOfLines={1}>{item.messages[item.messages.length - 1]?.message}</Text>

          {/* Only render horizontal line if it's not the last message */}
        </View>
      </TouchableOpacity>
    </View>
  );

  const fetchChats = async () => {
    setLoading(true); // Start loading when the request begins
    try {
      const [chatsResponse, teacherResponse, studentsResponse] = await Promise.all([
        axios.get(`${baseUrl}/chats`),
        axios.get(`${baseUrl}/teachers`),
        axios.get(`${baseUrl}/students`),
      ]);
      // const response = await axios.get('https://dreamscloudtechbackend.onrender.com/api/chats');
      setData(chatsResponse.data); // Set the data to state
      let userMap = new Map<string, UserDataResponseItem>();
      teacherResponse.data.forEach((item: UserDataResponseItem) => {
        userMap.set(item.userID, item);
      });
      studentsResponse.data.forEach((item: UserDataResponseItem) => {
        userMap.set(item.userID, item);
      });
      userMap.set('admin', {
        userID: 'admin',
        name: "Admin",
        _id: "0",
        middleName: "",
        surname: "",
      })
      setUsers(userMap);
      console.log(chatsResponse.data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong!'); // Handle errors
    } finally {
      setLoading(false); // Stop loading once request is complete
    }
    console.log("FetchChat finished");
  };

  useEffect(() => {
    fetchChats(); // Call fetchData function
  }, []); // Empty dependency array ensures it runs once when the component mounts

  if (loading) {
    return <Text></Text>; // You can customize loading state display
  }

  if (error) {
    return <Text>Error: {error}</Text>; // Handle errors gracefully
  }







  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        {/* <ScrollView style={styles.container1}> */}
        {/* Header Section */}
        <View style={styles.header}>
          {/* <TouchableOpacity>
            <MaterialIcons name="menu" size={28} color="#000" />
          </TouchableOpacity> */}
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', top: '15%' }}>


            <View style={styles.headerIcons}>
              {/* <TouchableOpacity>
                <Feather name="message-square" size={22} color="black" style={{ position: 'relative', top: 3 }} />
              </TouchableOpacity> */}
              {/* <Fontisto name="bell" size={22} color="black" /> */}

            </View>
            <View style={styles.userInfo}>
              <Text style={styles.userName}>Nilesh Shr</Text>
              <Text style={styles.userRole}>Admin</Text>
            </View>
            <Image source={require('../../../assets/images/images/image.png')} style={styles.avatar} />
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
            Conversations
          </Text>
          {/* <View style={{}}> */}
          <TouchableOpacity style={styles.button} onPress={() => console.log('Primary Button Pressed')}>
            {/* <Text style={styles.buttonText1}>search</Text> */}
            <TextInput style={{ padding: 3, height: 25, flexGrow: 1, fontSize: 12 }} placeholder='search'></TextInput>
            <Icon style={{ textAlign: 'left' }} name="search" size={15} color="#787878" />
          </TouchableOpacity>
          {/* </View> */}


        </View>






        <View style={styles.container1}>

          {/* <ScrollView> */}
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
          />
          {/* </ScrollView> */}
        </View>
      </SafeAreaView>
    </>

  );
}

export const styles = StyleSheet.create({
  container: {
    zIndex: 300,
    maxWidth: responsiveWidth(85),
    maxHeight: 220,
    //  boxShadow: '20px',
    //  shadowColor: 'black',
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    //  backgroundColor: 'red',
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

    //  shadowOpacity: 10,

  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: '5%',
    paddingTop: '2%',
    marginTop: '5%',
  },
  innercontainer: {
    maxWidth: '90%',
    maxHeight: '90%',
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'flex-start',
    marginBottom: '5%',
    top: 12,
    //  backgroundColor: 'red',
    marginLeft: 25,
    marginRight: 18,
    zIndex: 3000

  },

  cardHeading: {
    fontSize: 13,
    padding: 5,

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
    //   backgroundColor:'red'
  },
  headerIconSpacing: {
    marginLeft: 10,
    opacity: 1,
    zIndex: 500,

  },
  noticesSection: {
    position: 'relative',
    padding: 15,
    backgroundColor: '#ffffff',
    //backgroundColor: 'green',
    elevation: 5,
    borderRadius: 10,
    width: '80%',
    alignSelf: 'center',
    top: '4%',

    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },

    }),
  },
  noticeText: {
    fontSize: 12,
    color: '#7e7e7e',

    ...Platform.select({
      ios: {
        fontSize: 12
      },

    }),
  },
  dashboardSection: {
    marginTop: '30%',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  bgimg: {
    zIndex: 10,
    width: 'auto',
    height: 'auto',
    position: 'absolute',

    ...Platform.select({
      ios: {
        width: responsiveWidth(10),
        // left:5,
        transform: [{ scale: 1.02 }],
      },

    }),
  },
  avatar: {
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
    backgroundColor: 'white',
  },
  messageContainer: {
    marginBottom: 0, // space between each chat message
  },
  sender: {
    fontSize: 20,
    marginBottom: 4,
    color: "#58A8F9",
  },
  message: {
    fontSize: 16,
    color: '#333',
    width: 280,
  },
  hr: {
    height: 1,
    width: '100%',
    borderBottomWidth: 0.5,
    borderColor: 'grey',
    marginVertical: 10, // space around the horizontal line
  },


  Converation: {
    // marginBlockEnd: 10,
    // marginBlockStart: 50,
    // marginLeft: 30,
    fontWeight: 'bold',
    fontSize: 15,
    flex: 1

  },

  searchButton: {
    borderBlockColor: '#58A8F9',
  },


  buttonText: {
    color: '#fff',
    fontSize: 30,

  },


  outlineDanger: {
    backgroundColor: "#58a8f9",
  },

  // button: {
  //   textAlign: 'right',
  //   color: 'black',
  //   fontSize: 15,
  //   paddingHorizontal: 20,
  //   bottom: 33,
  // },

  container2: {
    alignItems: 'flex-end',
    justifyContent: "center",
    marginBlockStart: 0.5,
    paddingRight: 20,
    borderRadius: 10,
    position: 'relative',
    marginTop: 1,

  },
  button: {
    backgroundColor: '#daedff', // Bootstrap's primary color
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 20,
    // marginBlock: 0.5,
    // position: 'absolute', // Absolute positioning
    // top: 0.5, // Positioning the button 100 units from the top of the parent
    // right: 20, // Optional: positions the button 20 units from the right edge
    // width: 150, //
    // marginBlockEnd: 10,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  buttonText1: {
    color: '#7e7f80',
    fontSize: 16,
    // textAlign: 'left',
    // position: "relative"

  },

  profilephoto: {
    height: 50,
    width: 50,
    borderRadius: 50,
  }

});

export default Conversation;