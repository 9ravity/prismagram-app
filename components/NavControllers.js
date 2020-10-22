import React from "react";
import { useIsLoggedIn } from "../AuthContext";
import "react-native-gesture-handler";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";
import styled from "styled-components";

const View = styled.View`
  flex: 1;
`;

export default () => {
  const isLoggedIn = true;
  console.log(isLoggedIn); // object로 총 3개가 넘어온다. isLoggedIn, logUserIn, logUserOut

  // const logIn = useLogIn();
  // const logOut = useLogOut();
  return <View>{isLoggedIn ? <MainNavigation /> : <AuthNavigation />}</View>;
};
