// user가 로그아웃할때, render 되는 부분
import * as React from "react";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// navigator를 render 하고 싶을때, createAppContainer가 필요
import Signup from "../screens/Auth/Signup";
import Confirm from "../screens/Auth/Confirm";
import Login from "../screens/Auth/Login";
import AuthHome from "../screens/Auth/AuthHome";

const Stack = createStackNavigator();
// Stack Navigation 전체에 공통적으로 속성을 적용하고 싶으면 Stack.Navigator의 screenOptions을 사용
export default () => {
  return (
    <Stack.Navigator initialRouteName="AuthHome" headerMode="none">
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Confirm" component={Confirm} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="AuthHome" component={AuthHome} />
    </Stack.Navigator>
  );
};
