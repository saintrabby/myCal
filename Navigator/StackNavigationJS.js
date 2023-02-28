import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react'
import BottomNavigator from "../components/BottomNavigator";

import Calendar from "../Pages/Calendar";
import Home from "../Pages/Home";
import Library from "../Pages/Library";
import Mypage from "../Pages/Mypage";

const Stack = createStackNavigator();

const StackNavigationJS = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Calendar" component={Calendar} options={{ headerShown: false }} />
        <Stack.Screen name="Library" component={Library} options={{ headerShown: false }} />
        <Stack.Screen name="Mypage" component={Mypage} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigationJS