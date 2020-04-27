import React from "react";
import { View } from "react-native";
import { useIsLoggedIn } from "../AuthContext";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";

export default () => {
  const isLoggedIn = true;
  console.log(isLoggedIn); // object로 총 3개가 넘어온다. isLoggedIn, logUserIn, logUserOut

  // const logIn = useLogIn();
  // const logOut = useLogOut();
  return (
    <View style={{ flex: 1 }}>
      {isLoggedIn ? <MainNavigation /> : <AuthNavigation />}
    </View>
  );
};
