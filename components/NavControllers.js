import React from "react";
import { useIsLoggedIn } from "../AuthContext";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
  const isLoggedIn = true;
  console.log(isLoggedIn); // object로 총 3개가 넘어온다. isLoggedIn, logUserIn, logUserOut

  // const logIn = useLogIn();
  // const logOut = useLogOut();
  return (
    <NavigationContainer>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </NavigationContainer>
  );
};
