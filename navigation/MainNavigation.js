import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigation from "./TabNavigation";

const MainNavigation = createStackNavigator();

export default () => {
  return (
    <MainNavigation.Navigator>
      <MainNavigation.Screen name={"tab"} component={TabNavigation} />
    </MainNavigation.Navigator>
  );
};
