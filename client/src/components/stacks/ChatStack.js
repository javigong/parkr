import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LiveChatScreen from "../screens/chat-stack/LiveChatScreen";

const Stack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LiveChatScreen"
        component={LiveChatScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChatStack;
