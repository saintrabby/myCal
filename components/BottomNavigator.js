import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const BottomNavigator = ({ navigation }) => {
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', borderWidth: 1 }}>
      <TouchableOpacity activeOpacity={0.4} style={styles.BottomButton} onPress={() => navigation.navigate('Home')}>
        <Text>π</Text>
        <Text>ν</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={styles.BottomButton} onPress={() => navigation.navigate('Calendar')}>
        <Text>π</Text>
        <Text>μΊλ¦°λ</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={styles.BottomButton} onPress={() => navigation.navigate('Library')}>
        <Text>π</Text>
        <Text>λΌμ΄λΈλ¬λ¦¬</Text>
      </TouchableOpacity>
      <TouchableOpacity activeOpacity={0.4} style={styles.BottomButton} onPress={() => navigation.navigate('Mypage')}>
        <Text>πββοΈ</Text>
        <Text>λ§μ΄νμ΄μ§</Text>
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