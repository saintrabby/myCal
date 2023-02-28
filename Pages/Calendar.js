import React from 'react'
import { Text, View } from 'react-native'

import BottomNavigator from '../components/BottomNavigator'

const Calendar = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center' }}>
        <Text>캘린더</Text>
      </View>
      <View style={{ flex: 1 }}>
        <BottomNavigator navigation={navigation} />
      </View>
    </View>
  )
}

export default Calendar