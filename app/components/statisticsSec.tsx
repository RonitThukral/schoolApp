import { StyleSheet, Text, TouchableOpacity, View,Image, Platform } from 'react-native'
import React from 'react'
import { responsiveWidth } from 'react-native-responsive-dimensions'





const StatisticsSec = () => {

    const formattedDate = new Date().toISOString().slice(0, 10)

    const date = formattedDate.split('-').reverse().join('-');
  

    const Item = [
    
        {
          name: "Students",
          icon: <Image source={require('../../assets/images/images/1.png')} style={{ width: 21, height: 18 }} />,
          content: 300
        },
        {
          name: "Teachers",
          icon: <Image source={require('../../assets/images/images/2.png')} style={{ width: 17, height: 20 }} />,
          content: 70
        },
        {
          name: "Messages",
          icon: <Image source={require('../../assets/images/images/3.png')} style={{ width: 17, height: 17 }} />,
          content: 50
        },
        {
          name: "Classes",
          icon: <Image source={require('../../assets/images/images/4.jpg')} style={{ width: 17, height: 17  }} />,
          content: 36
        },
        {
          name: "Courses",
          icon: <Image source={require('../../assets/images/images/5.jpg')} style={{ width: 17, height: 17 }} />,
          content: 27
        },
        {
          name: "Buses",
          icon: <Image source={require('../../assets/images/images/6.png')} style={{ width: 19, height: 16 }} />,
          content: 20
        }
      ]


  return (
     <View style={styles.container}>
                  <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', width: '90%' }}>
                    <Text style={styles.heading}>Statistics</Text>
                    <Text style={{ fontSize: 13, position: 'relative', width: 'auto', marginTop: 25 }}>{`${date}`}</Text>
                  </View>
                  <View style={styles.innercontainer}>
                    {Item.map((item, index): any => {
                      return (
                        <TouchableOpacity style={styles.Card} key={index}>
    
                          <Text style={styles.cardHeading}>{item.name}</Text>
                          <View style={styles.cardContent}>
                            {item.icon}
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginLeft: 5 }}>{item.content}</Text>
                          </View>
    
                        </TouchableOpacity>
                      )
                    })}
    
                  </View>
                </View>
  )
}

export default StatisticsSec

const styles = StyleSheet.create({
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
    
      Card: {
        width: '30%',
        height: '40%',
        position: 'relative',
        borderRadius: '10%',
        backgroundColor: '#EEF7FF',
        flexDirection: 'column',
        //  aspectRatio: 1
    
      },
      cardHeading: {
        fontSize: 13,
        padding: 5,
    
      },
      cardContent: {
        flex: 2,
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 6,
        justifyContent: 'center',
        gap: 10,
        bottom: 5
      },
})