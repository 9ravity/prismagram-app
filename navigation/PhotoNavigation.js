import * as React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import selectPhoto from "../screens/Photo/SelectPhoto";
import takePhoto from "../screens/Photo/TakePhoto";
import uploadPhoto from "../screens/Photo/UploadPhoto";

const PhotoNavigation = createMaterialTopTabNavigator();

export default () => {
  return (
    <PhotoNavigation.Navigator>
      <PhotoNavigation.Screen
        name={"select"}
        component={selectPhoto}
        options={{ tabBarLabel: "selectoption" }}
      />
      <PhotoNavigation.Screen
        name={"take"}
        component={takePhoto}
        options={{ tabBarLabel: "takeoptin" }}
      />
      <PhotoNavigation.Screen
        name={"upload"}
        component={uploadPhoto}
        options={{ tabBarLabel: "uploadoption" }}
      />
    </PhotoNavigation.Navigator>
  );
};
