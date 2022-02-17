import React, { useLayoutEffect } from "react";
import { Button, Center, Text } from "native-base";

const ParkingScreen = ({ navigation }) => {
  return (
    <Center>
      <Center bg="primary.400" _text={{
      color: "white",
      fontWeight: "bold"
    }} height={200} width={{
      base: 200,
      lg: 255
    }}>
        ParkingScreen
      </Center>
    </Center>
  );
};

export default ParkingScreen;
