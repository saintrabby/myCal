import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import BottomNavigator from '../components/BottomNavigator'

const Calendar = ({ navigation }) => {

  //시작 날짜 생성
  let date = new Date()

  const [curDate, setCurDate] = useState({
    Year: date.getFullYear(),
    Month: date.getMonth() + 1,
    Day: date.getDate(),
  })

  //년도 월 일 선택
  const [selYear, setSelYear] = useState(curDate.Year)
  const [selMonth, setSelMonth] = useState(curDate.Month)
  // const [selDate, setSelDate] = useState(curDate.Day)

  const Week_arr = ['일', '월', '화', '수', '목', '금', '토']


  //달력 생성
  const CalDates = () => {
    //전월 전체일수
    let lastMonthMax = new Date(selYear, selMonth - 1, 0).getDate()
    //현월 시작요일
    let curMonthStartWeek = new Date(selYear, selMonth - 1, 1).getDay()
    //현월 전체일수
    let curMonthMax = new Date(selYear, selMonth, 0).getDate()
    //현월 마지막요일
    let curMonthLastWeek = new Date(selYear, selMonth, 0).getDay()

    let createCurDate = 1
    let createNextDate = 1

    //달력 담을 배열
    let createMonthArr = []

    //전월 마지막주 마지막일까지 채우기
    for (let i = 1; i <= curMonthStartWeek; i++) {
      createMonthArr.push({ date: lastMonthMax - curMonthStartWeek + i, isCur: false })
    }
    //이어서 현재월 마지막일까지 채우기
    for (let i = 0; i < curMonthMax; i++) {
      createMonthArr.push({ date: createCurDate++, isCur: true })
    }
    //남은자리 익월 시작일부터 채우기
    for (let i = 0; i < 6 - curMonthLastWeek; i++) {
      createMonthArr.push({ date: createNextDate++, isCur: false })
    }

    //만들어진 달력배열을 출력
    return <View style={{ flexWrap: 'wrap', flex: 9.3, flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
      {createMonthArr.map((v, i) => {
        return <TouchableOpacity
          key={i}
          activeOpacity={0.4}
          style={{ flex: 1, height: '8%', minWidth: 44 }}
          onPress={() => {
            SelectDate(v)
          }}
        >
          {/* //선택된 날짜만 border그려서 표시
              //현재 일자 외에는 날짜글자색을 #bbb로 변경 */}
          {curDate.Day === v.date && curDate.Month === selMonth && curDate.Year === selYear && v.isCur ?
            <View style={{ borderWidth: 2, margin: 6, borderRadius: 50, borderColor: '#46e' }}>
              <Text style={{ color: `${v.isCur === false ? '#bbb' : '#000'}`, textAlign: 'center', textAlignVertical: 'center', height: '100%', width: '100%', }}>{v.date}</Text>
            </View> :
            <Text style={{ color: `${v.isCur === false ? '#bbb' : '#000'}`, textAlign: 'center', textAlignVertical: 'center', height: '100%', width: '100%', }}>{v.date}</Text>
          }
        </TouchableOpacity>
      })}

      <View style={{ width: '100%', marginTop: 40, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>선택중인 일자 : {curDate.Year}년 {curDate.Month}월 {curDate.Day}일</Text>
        <TouchableOpacity
          activeOpacity={0.2}
          style={{ marginTop: 40 }}
          onPress={() => {
            setSelYear(curDate.Year)
            setSelMonth(curDate.Month)
          }}
        >
          <Text>선택중인 달력으로 가기</Text>
        </TouchableOpacity>
      </View>
    </View>
  }



  //날짜 선택
  const SelectDate = (data) => {

    console.log(data);
    //기본적으로는 해당 날짜 선택
    if (data.isCur === true) {
      setCurDate({ Day: data.date, Year: selYear, Month: selMonth })
    }
    //다른 월의 날짜 클릭시
    else {
      let changeMonth = selMonth
      let changeYear = selYear

      //그 월에 해당하는 달력으로 이동시키기
      if (data.date < 15) {
        changeMonth += 1
        SelectMonth(1)
      }
      else {
        changeMonth -= 1
        SelectMonth(-1)
      }

      //초과하는 월은 년도까지 교체
      if (changeMonth > 12) {
        changeMonth = 1
        changeYear += 1
      }
      if (changeMonth < 1) {
        changeMonth = 12
        changeYear -= 1
      }

      setCurDate({ Day: data.date, Year: changeYear, Month: changeMonth })
    }
  }



  //화살표로 달력바꾸기
  const SelectMonth = (plusMonth) => {
    //1월 아래로 내려갈시 년도조절
    if (selMonth + plusMonth < 1) {
      setSelYear(selYear - 1)
      setSelMonth(12)
    }
    //12월 초과시 년도조절
    else if (selMonth + plusMonth > 12) {
      setSelYear(selYear + 1)
      setSelMonth(1)
    }
    //바뀐날짜 적용
    else {
      setSelMonth(selMonth + plusMonth)
    }
  }



  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 40, marginLeft: 20, marginRight: 20, justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity
          activeOpacity={0.4}
          style={{ flex: 1, alignItems: 'flex-start' }}
          onPress={() => SelectMonth(-1)}
        >
          <Text style={{ width: '30%', textAlign: 'center', fontSize: 20 }}>◀</Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ margin: 10 }}>{selMonth}월</Text>
          <Text style={{ margin: 10 }}>{selYear}년</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.4}
          style={{ flex: 1, alignItems: 'flex-end' }}
          onPress={() => SelectMonth(1)}
        >
          <Text style={{ width: '30%', textAlign: 'center', fontSize: 20 }}>▶</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 8, marginLeft: 20, marginRight: 20, alignItems: 'center' }}>
        <View style={{ flex: 0.7, flexDirection: 'row', width: '100%', justifyContent: 'space-between', }}>
          {Week_arr.map((v, i) => {
            return <Text
              key={i}
              style={{ textAlign: 'center', textAlignVertical: 'center', width: '14%', color: i === 0 ? 'red' : i === 6 ? 'blue' : 'black' }}>{v}</Text>
          })}
        </View>

        {CalDates()}
      </View>

      <View style={{ flex: 1 }}>
        <BottomNavigator navigation={navigation} />
      </View>
    </View>
  )
}

export default Calendar



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