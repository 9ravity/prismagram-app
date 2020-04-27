import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import { AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavControllers from "./components/NavControllers";
import { AuthProvider } from "./AuthContext";

/* 항상 기본 asset 정적인 이미지는 무조건 preload 해야함, 로고같은 */
// expo 에서 나온 uploading component
// app은 preload하고 cache를 restore하는것만 하게 됨
export default function App() {
  const [loaded, setLoaded] = useState(false); //첫 앱 시작할때, loading
  const [client, setClient] = useState(null);
  // login 체크 -> prop을 context로 넘김 context는 prop을 default로 가짐 -> rerender 시킴, authprovider로 체크하지 않음;
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font /* font loading */,
      });
      //await Asset.loadAsync(require("./assets/logo_instagram.png")); 1개의 이미지면 require 사용
      await Asset.loadAsync([require("./assets/logo.png")]); //여러개일 경우 배열로 호출

      //Apollo loading 작업
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage /* AsyncStorage는 웹에서 local storage랑 비슷 */,
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad(); // preLoad 호출
  }, []);

  /* javascript bool check -> false,undefined,null 전부 동작 */
  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavControllers />
          {/* value를 넘겨야만 유저가 로그인 했는지 알 수 있음 - AuthContext.Provider */}
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}

/* 
  cache 사용 이유 -> 카카오톡을 하는데 모든 대화가 카카오톡 실행할때, 서버에서 가져온다면 늦음. 계속 로딩이 되어야함, 
  모바일 폰에 미리 서버의 데이터를 백업해놓고 처리하는 방식. apollo cache persist
  user가 인터넷을 통해 가져온것들은 전부 디바이스에 저장

  context란 모든 component에서 함수를 사용가능하도록 함, 최상위 component
*/
