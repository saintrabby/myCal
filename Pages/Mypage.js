import React from 'react'
import { Text, View } from 'react-native'

import BottomNavigator from '../components/BottomNavigator'

const Mypage = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 9, justifyContent: 'center', alignItems: 'center' }}>
        <Text>마이페이지</Text>
      </View>
      <View style={{ flex: 1 }}>
        <BottomNavigator navigation={navigation} />
      </View>
    </View>
  )
}

export default Mypage