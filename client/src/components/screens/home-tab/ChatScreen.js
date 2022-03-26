import React from "react";
import { SafeAreaView } from "react-native";
import { Center, Heading, Text } from "native-base";
import LiveChatScreen from "../chat-stack/LiveChatScreen";

const ChatScreen = ({ navigation }) => {
  return (
    // <Center>
    //   <Center
    //     bg="primary.400"
    //     _text={{
    //       color: "white",
    //       fontWeight: "bold",
    //     }}
    //     height={200}
    //     width={{
    //       base: 200,
    //       lg: 255,
    //     }}
    //   >
    //     <Heading>Chat Screen</Heading>
    //   </Center>
    // </Center>
    <SafeAreaView>
      <LiveChatScreen />
    </SafeAreaView>
  );
};

export default ChatScreen;
