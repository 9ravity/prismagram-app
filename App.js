import React, { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { AppLoading, Font, Asset } from "expo";
import { Text, View, AsyncStorage } from "react-native";
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClientOptions from "./apollo";

/* 항상 기본 asset 정적인 이미지는 무조건 preload 해야함, 로고같은 */
// expo 에서 나온 uploading component
export default function App() {
  const [loaded, setLoaded] = useState(false); //첫 앱 시작할때, loading
  const [client, setClient] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        ...Ionicons.font /* font loading */,
      });
      //await Asset.loadAsync(require("./assets/logo_instagram.png")); 1개의 이미지면 require 사용
      await Asset.loadAsync([require("./assets/logo_instagram.png")]); //여러개일 경우 배열로 호출

      //Apollo loading 작업
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        ...apolloClientOptions,
      });
      setLoaded(true);
      setClient(client);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    preLoad(); // preLoad 호출
  }, []);

  return loaded && client ? (
    <ApolloProvider client={client}>
      <View>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}

/* 
  cache 사용 이유 -> 카카오톡을 하는데 모든 대화가 카카오톡 실행할때, 서버에서 가져온다면 늦음. 계속 로딩이 되어야함, 
  모바일 폰에 미리 서버의 데이터를 백업해놓고 처리하는 방식. apollo cache persist
  user가 인터넷을 통해 가져온것들은 전부 디바이스에 저장
*/
