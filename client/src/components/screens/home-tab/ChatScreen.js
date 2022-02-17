import React from "react";
import { Center, Text } from "native-base";

const ChatScreen = () => {
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
        ChatScreen
      </Center>
    </Center>
  );
};

export default ChatScreen;
