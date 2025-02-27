// import React from 'react';
// import { View, Text, StyleSheet, TextInput, SafeAreaView } from 'react-native';
// import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

// const Library = () => {
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
//       <View style={styles.container}>
//         <Text style={styles.heading}>Welcome To the Library</Text>
//         <TextInput style={styles.input} placeholder="Search Books/Authors" placeholderTextColor="grey" />
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'flex-start', // Align items at the top of the screen
//     alignItems: 'center', // Center horizontally
//     paddingTop: responsiveHeight(15), // Adjust spacing from the top
//   },
//   input: {
//     width: '80%',
//     height: 50,
//     backgroundColor: 'white',
//     marginTop: 15, // Add spacing after the heading
//     borderRadius: 10,
//     paddingHorizontal: 25,
//     borderWidth:1,
//     borderColor:'#58a8f9'
//   },
//   heading: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     width: responsiveWidth(80),
//   },
// });

// export default Library;


import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, SafeAreaView, FlatList,Image, TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';

const Library = () => {
  const [searchText, setSearchText] = useState('');
  
 // Dummy book data with images
const books = [
  { 
    id: '1', 
    title: 'The Hobbit', 
    author: 'J.R.R. Tolkien', 
    image: 'https://covers.openlibrary.org/b/id/7984916-L.jpg' 
  },
  { 
    id: '4', 
    title: 'Pride and Prejudice', 
    author: 'Jane Austen', 
    image: 'https://covers.openlibrary.org/b/id/8281991-L.jpg' 
  },
  { 
    id: '7', 
    title: 'War and Peace', 
    author: 'Leo Tolstoy', 
    image: 'https://covers.openlibrary.org/b/id/8349252-L.jpg' 
  },
  { 
    id: '5', 
    title: 'The Catcher in the Rye', 
    author: 'J.D. Salinger', 
    image: 'https://covers.openlibrary.org/b/id/8225264-L.jpg' 
  },
  { 
    id: '2', 
    title: 'To Kill a Mockingbird', 
    author: 'Harper Lee', 
    image: 'https://covers.openlibrary.org/b/id/8228691-L.jpg' 
  },
  { 
    id: '3', 
    title: '1984', 
    author: 'George Orwell', 
    image: 'https://covers.openlibrary.org/b/id/7222246-L.jpg' 
  },
  // { 
  //   id: '3', 
  //   title: 'The Great Gatsby', 
  //   author: 'F. Scott Fitzgerald', 
  //   image: 'https://covers.openlibrary.org/b/id/6054896-L.jpg' 
  // },
  { 
    id: '6', 
    title: 'Moby-Dick', 
    author: 'Herman Melville', 
    image: 'https://covers.openlibrary.org/b/id/8091016-L.jpg' 
  },
  // { 
  //   id: '9', 
  //   title: 'Crime and Punishment', 
  //   author: 'Fyodor Dostoevsky', 
  //   image: 'https://covers.openlibrary.org/b/id/8091011-L.jpg' 
  // },
  { 
    id: '8', 
    title: 'The Alchemist', 
    author: 'Paulo Coelho', 
    image: 'https://covers.openlibrary.org/b/id/8369255-L.jpg' 
  },
];


  // Filter books based on the search text
  const filteredBooks = books.filter(
    book =>
      book.title.toLowerCase().includes(searchText.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome To the Library</Text>
        <TextInput
          style={styles.input}
          placeholder="Search Books/Authors"
          placeholderTextColor="grey"
          value={searchText}
          onChangeText={setSearchText}
        />
        <FlatList
          data={filteredBooks}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.bookItemCard}>
              <View style={{flex:1}}>

              <Image style={styles.img} source={{ uri: item.image }} />
              <Text style={styles.bookTitle}>{item.title}</Text>
              <Text style={styles.bookAuthor}>{item.author}</Text>
              </View>

              <View style={{flexDirection:'row',width:responsiveWidth(33), justifyContent:'space-between',position:'relative',
                bottom:responsiveHeight(1),marginLeft:-8
              }}>

              <TouchableOpacity style={styles.btns}>
                <Text style={styles.btnText}>View List</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btns}>
                <Text style={styles.btnText}>Issue Book</Text>
              </TouchableOpacity>
              </View>

            </View>
          )}
          ListEmptyComponent={<Text style={styles.emptyMessage}>No books found</Text>}
          style={styles.flatlist}
          numColumns={2}
        />
      </View>

              

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: responsiveHeight(10),
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#DAEDFF',
    marginBottom: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  flatlist:{
    width:responsiveWidth(90)
  },
  img:{
    width:responsiveWidth(33),
    height:responsiveHeight(20),
    marginVertical:10
  },
  bookItemCard: {
    width:responsiveWidth(40),
    height:responsiveHeight(38),
    backgroundColor: '#daedff',
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal:10
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookAuthor: {
    fontSize: 14,
    color: '#6C757D',
  },
  btns:{
    width:responsiveWidth(18),
    height:responsiveHeight(6),
    // backgroundColor:'',
    borderWidth:1,
    borderColor:'#58a8f9',
    borderRadius:10,
    marginRight:5,
    paddingVertical:5
    
  },
  btnText: {
    textAlign:'center',
    textAlignVertical:'center',
    width:'85%',
    fontSize:14,
    marginHorizontal:5
  },

  emptyMessage: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 20,
  },
});

export default Library;
