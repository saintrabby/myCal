import React from 'react'
import { Text, View } from 'react-native'

import BottomNavigator from '../components/BottomNavigator'

const Library = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center' }}>
        <Text>라이브러리</Text>
      </View>
      <View style={{ flex: 1 }}>
        <BottomNavigator navigation={navigation} />
      </View>
    </View>
  )
}

export default Library