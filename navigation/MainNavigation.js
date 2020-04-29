import "react-native-gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";

const MainNavigation = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <MainNavigation.Navigator>
        <MainNavigation.Screen name={"main"} component={TabNavigation} />
      </MainNavigation.Navigator>
    </NavigationContainer>
  );
};
