import React from "react";
import { Center, Text } from "native-base";

const HostScreen = () => {
  return (
    <Center>
      <Center
        bg="primary.400"
        _text={{
          color: "white",
          fontWeight: "bold",
        }}
        height={200}
        width={{
          base: 200,
          lg: 255,
        }}
      >
        HostScreen
      </Center>
    </Center>
  );
};

export default HostScreen;
