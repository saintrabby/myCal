import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import BottomNavigator from '../components/BottomNavigator'

const Home = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center' }}>
        <Text>홈</Text>
      </View>
      <View style={{ flex: 1 }}>
        <BottomNavigator navigation={navigation} />
      </View>
    </View>
  )
}

export default Home

