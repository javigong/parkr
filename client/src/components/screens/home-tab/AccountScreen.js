import React from "react";
import { Center, Text } from "native-base";

const AccountScreen = () => {
  return (
    <Center>
      <Center bg="primary.400" _text={{
      color: "white",
      fontWeight: "bold"
    }} height={200} width={{
      base: 200,
      lg: 255
    }}>
        AccountScreen
      </Center>
    </Center>
  );
};

export default AccountScreen;
