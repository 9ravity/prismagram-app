import React from "react";
import styled from "styled-components";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

export default () => {
  return (
    <View>
      <Text>Message</Text>
    </View>
  );
};
