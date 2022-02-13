import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "../tabs/HomeTab";

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeTab} />
  </Stack.Navigator>
);

export default AppStack;
