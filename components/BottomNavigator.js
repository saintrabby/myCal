import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const BottomNavigator = ({ navigation }) => {
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 1 }}>
      <TouchableOpacity activeOpacity={0.4} style={styles.BottomButton} onPress={() => navigation.navigate('Home')}>
        <Text>🏚</Text>
        <Text>홈</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={styles.BottomButton} onPress={() => navigation.navigate('Calendar')}>
        <Text>🗓</Text>
        <Text>캘린더</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={styles.BottomButton} onPress={() => navigation.navigate('Library')}>
        <Text>📚</Text>
        <Text>라이브러리</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={styles.BottomButton} onPress={() => navigation.navigate('Mypage')}>
        <Text>🙍‍♂️</Text>
        <Text>마이페이지</Text>
      </TouchableOpacity>
    </View>
  )
}

export default BottomNavigator



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  BottomButton: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
    borderWidth: 0.2,
    borderColor: '#999'
  }
});