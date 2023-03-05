import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'

import BottomNavigator from '../components/BottomNavigator'

const Calendar = ({ navigation }) => {

  //시작 날짜 생성
  let date = new Date()

  const [curDate, setCurDate] = useState({
    Year: date.getFullYear(),
    Month: date.getMonth() + 1,
    Day: date.getDate(),
  })

  //년도 월 선택
  const [selYear, setSelYear] = useState(curDate.Year)
  const [selMonth, setSelMonth] = useState(curDate.Month)

  const Week_arr = ['일', '월', '화', '수', '목', '금', '토']

  // const [viewMode, setViewMode] = useState('Month')
  // const [showWeek, setShowWeek] = useState([])
  // const [showMonth, setShowMonth] = useState([])

  //애니메이션 기본값
  let LeftRightAni = useRef(new Animated.Value(0)).current
  let UpDownAni = useRef(new Animated.Value(300)).current
  const [LRaniMove, setLRaniMove] = useState(0)
  const [UDaniMove, setUDaniMove] = useState(300)

  let CalArr = []





  //
  const DateEasyView = (getYear, getMonth, getDate) => {
    let easy = new Date(getYear, getMonth - 1, getDate)

    return {
      Year: easy.getFullYear(),
      Month: easy.getMonth() + 1,
      Date: easy.getDate(),
      Day: easy.getDay(),
    }
  }

  //달력 ---------------------------------------------------버벅거림으로 계산을 바꿈
  const CalCreate = (getYear, getMonth) => {
    let lastMonth = []
    let curMonth = []
    let afterMonth = []

    let lastFrontAdd = []
    let lastBackAdd = []
    let curFrontAdd = []
    let curBackAdd = []
    let afterFrontAdd = []
    let afterBackAdd = []

    //최대 날짜
    let lastlastAllDate = new Date(getYear, getMonth - 2, 1).getUTCDate()
    let lastAllDate = new Date(getYear, getMonth - 1, 1).getUTCDate()
    let curAllDate = new Date(getYear, getMonth, 1).getUTCDate()
    let afterAllDate = new Date(getYear, getMonth + 1, 1).getUTCDate()

    //각 월 해당날짜 넣기
    for (let i = 1; i <= lastAllDate; i++) {
      lastMonth.push(DateEasyView(getYear, getMonth - 1, i))
    }
    for (let i = 1; i <= curAllDate; i++) {
      curMonth.push(DateEasyView(getYear, getMonth, i))
    }
    for (let i = 1; i <= afterAllDate; i++) {
      afterMonth.push(DateEasyView(getYear, getMonth + 1, i))
    }

    //전월 나머지 날짜추가
    for (let i = lastlastAllDate - lastMonth[0].Day + 1; i <= lastlastAllDate; i++) {
      lastFrontAdd.push({ Date: i })
    }
    lastBackAdd = (curMonth.slice(0, 6 - lastMonth[lastMonth.length - 1].Day))

    //현월 나머지 날짜추가
    curFrontAdd = curMonth[0].Day === 0 ? [] : (lastMonth.slice(-curMonth[0].Day))
    curBackAdd = (afterMonth.slice(0, 6 - curMonth[curMonth.length - 1].Day))

    //익월 나머지 날짜추가
    afterFrontAdd = (curMonth.slice(-afterMonth[0].Day))
    for (let i = afterMonth[afterMonth.length - 1].Day + 1; i <= 6; i++) {
      afterBackAdd.push({ Date: i })
    }

    //달력 통합
    lastMonth = [...lastFrontAdd, ...lastMonth, ...lastBackAdd]
    curMonth = [...curFrontAdd, ...curMonth, ...curBackAdd]
    afterMonth = [...afterFrontAdd, ...afterMonth, ...afterBackAdd]

    CalArr = [lastMonth, curMonth, afterMonth]

    return <View style={{ flex: 1, flexDirection: 'row', margin: 0, transform: [{ translateX: -320 }] }}>

      <View style={styles.CalDate}>
        {CalArr[0].map((v1, i1) => {
          return <Text key={i1} style={styles.CalSideDate}>
            {v1.Date}
          </Text>
        })}
      </View>

      <View style={styles.CalDate}>
        {CalArr[1].map((v1, i1) => {
          return <TouchableOpacity
            key={i1}
            activeOpacity={0.4}
            style={{ flex: 1, height: '8%', minWidth: 44 }}
            onPress={() => {
              SelectDate(v1)
            }}
          >
            {/* //선택된 날짜만 border그려서 표시
                //현재 일자는 #000색, 외에는 날짜글자색을 #bbb로 변경 */}
            {curDate.Day === v1.Date && curDate.Month === v1.Month && curDate.Year === v1.Year ?
              <View style={styles.SelectDateBorder}>
                <Text style={mstyles(selMonth, v1.Month).CurMonthView}>{v1.Date}</Text>
              </View> :
              <Text style={mstyles(selMonth, v1.Month).CurMonthView}>{v1.Date}</Text>
            }
          </TouchableOpacity>
        })}
      </View>

      <View style={styles.CalDate}>
        {CalArr[2].map((v1, i1) => {
          return <Text key={i1} style={styles.CalSideDate}>
            {v1.Date}
          </Text>
        })}
      </View>
    </View>
  }



  //날짜 선택
  const SelectDate = (data) => {
    // 다른 달의 날짜 선택시 그 달로 이동하기
    if (selMonth > data.Month)
      SelectMonth(-1)
    else if (selMonth < data.Month)
      SelectMonth(1)

    setCurDate({ Day: data.Date, Year: data.Year, Month: data.Month })
  }

  //화살표로 달력바꾸기
  const SelectMonth = (plusMonth) => {
    //화살표도 애니메이션처리
    // if (plusMonth > 0)
    //   setAniMove(aniMove - 320)
    // else if (plusMonth < 0)
    //   setAniMove(aniMove + 320)

    //1월 아래로 내려갈시 년도조절
    if (selMonth - 1 + plusMonth < 1) {
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

  //제스처 컨트롤X
  const GestureLeftRight = (e) => {
    if (e > 100) {
      setLRaniMove(LRaniMove + 320)
      // SelectMonth(-1)
    }

    if (e < -100) {
      setLRaniMove(LRaniMove - 320)
      // SelectMonth(1)
    }
  }

  //제스처 컨트롤Y
  const GestureUpDown = (e) => {
    if (e > 100) {
      setUDaniMove(300)
    }

    if (e < -100) {
      setUDaniMove(0)
    }
  }



  //제스처 애니메이션 시작, 재시작
  useEffect(() => {
    Animated.timing(LeftRightAni, {
      toValue: LRaniMove,
      duration: 400,
      useNativeDriver: true,
    }
    ).start()

  }, [LRaniMove])

  useEffect(() => {
    Animated.timing(UpDownAni, {
      toValue: UDaniMove,
      duration: 400,
      useNativeDriver: true,
    }
    ).start()

  }, [UDaniMove])



  return (
    <View style={{ flex: 1 }}>
      <View style={styles.TopContents}>
        {/* ---------------------------------------------------화살표 - ◀ */}
        <TouchableOpacity
          activeOpacity={0.4}
          style={{ flex: 1, alignItems: 'flex-start' }}
          onPress={() => SelectMonth(-1)}
        >
          <Text style={styles.ArrowBtn}>◀</Text>
        </TouchableOpacity>

        {/* ---------------------------------------------------상단 년 월 표시 */}
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ margin: 10 }}>{selMonth}월</Text>
          <Text style={{ margin: 10 }}>{selYear}년</Text>
        </View>

        {/* ---------------------------------------------------화살표 - ▶ */}
        <TouchableOpacity
          activeOpacity={0.4}
          style={{ flex: 1, alignItems: 'flex-end' }}
          onPress={() => SelectMonth(1)}
        >
          <Text style={styles.ArrowBtn}>▶</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.CenterContents}>
        {/* ---------------------------------------------------일-토 요일표시 */}
        <View style={styles.CenterWeek}>
          {Week_arr.map((v, i) => {
            return <Text
              key={i}
              style={{ textAlign: 'center', textAlignVertical: 'center', width: '14%', color: i === 0 ? 'red' : i === 6 ? 'blue' : 'black' }}>{v}</Text>
          })}
        </View>

        {/* ---------------------------------------------------날짜 1-31표시 */}
        <PanGestureHandler
          // onGestureEvent={(e) => setTx(e.nativeEvent.translationX)}
          onEnded={(e) => GestureLeftRight(e.nativeEvent.translationX)}
        >
          <Animated.View style={{ flex: 9.3, width: '100%', flexDirection: 'row', transform: [{ translateX: LeftRightAni }] }}>
            {CalCreate(selYear, selMonth)}
          </Animated.View>
        </PanGestureHandler>
      </View>

      {/* ---------------------------------------------------업다운 제스처 */}
      <PanGestureHandler
        onEnded={(e) => GestureUpDown(e.nativeEvent.translationY)}
      >
        <Animated.View style={{ position: 'absolute', backgroundColor: '#bbb', bottom: 0, height: '74%', width: '100%', justifyContent: 'flex-start', alignItems: 'center', transform: [{ translateY: UpDownAni }] }}>
          <Text style={{ marginTop: 10 }}>선택중인 일자 : {curDate.Year}년 {curDate.Month}월 {curDate.Day}일</Text>

          <TouchableOpacity
            activeOpacity={0.2}
            style={{ marginTop: 40 }}
            onPress={() => {
              setSelYear(curDate.Year)
              setSelMonth(curDate.Month)
            }}
          >
            <Text style={{ borderWidth: 1, padding: 10, borderRadius: 10 }}>선택중인 달력으로 가기</Text>
          </TouchableOpacity>
        </Animated.View>
      </PanGestureHandler>

      {/* ---------------------------------------------------네비게이션 */}
      <View style={{ flex: 1 }}>
        <BottomNavigator navigation={navigation} />
      </View>
    </View >
  )
}

export default Calendar



const styles = StyleSheet.create({
  //Top
  TopContents: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ArrowBtn: {
    width: '30%',
    textAlign: 'center',
    fontSize: 20,
  },

  //Center
  CenterContents: {
    flex: 8,
    marginLeft: 20,
    marginRight: 20,
    alignItems: 'center',
  },
  CenterWeek: {
    flex: 0.7,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  CalDate: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  CalSideDate: {
    flex: 1,
    height: '8%',
    minWidth: 44,
    color: '#bbb',
    textAlign: 'center',
    textAlignVertical: 'center',
    width: '100%',
  },
  SelectDateBorder: {
    borderWidth: 2,
    margin: 6,
    borderRadius: 50,
    borderColor: '#46e',
  },
});

const mstyles = (month1, month2) => StyleSheet.create({
  CurMonthView: {
    color: month1 === month2 ? '#000' : '#bbb',
    textAlign: 'center',
    textAlignVertical: 'center',
    height: '100%',
    width: '100%',
  },
})