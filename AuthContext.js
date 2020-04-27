import React, { createContext, useContext, useState } from "react";
import { AsyncStorage } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ isLoggedIn: isLoggedInProp, children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(isLoggedInProp); // local storage에 접근해서 로그인 여부 파악하기 위함

  const logUserIn = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "true");
      console.log("IsLoggedIn user");
      setIsLoggedIn(true);
    } catch (e) {
      console.log(e);
    }
  };

  const logUserOut = async () => {
    try {
      await AsyncStorage.setItem("isLoggedIn", "false");
      console.log("IsLoggedOut user");
      setIsLoggedIn(false);
    } catch (error) {
      console.log(e);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, logUserIn, logUserOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useIsLoggedIn = () => {
  // useContext 대신, useIsLoggedIn 사용
  // context를 import 해주고 isLoggedIn(true, false)을 준다
  const { isLoggedIn } = useContext(AuthContext);
  console.log("useIsLoggedIn isLoggedIn ^^ : " + isLoggedIn);
  return isLoggedIn;
};

export const useLogIn = () => {
  const { logUserIn } = useContext(AuthContext);
  return logUserIn;
};
export const useLogOut = () => {
  const { logUserOut } = useContext(AuthContext);
  return logUserOut;
};

/* 
    context는 object 라고 생각 함수 및 변수를 포함하는 object 
    모든 components를 context.provider 안에 둬야함;

    useContext를 사용하여 어디서든 접근할 수 있음.
*/
