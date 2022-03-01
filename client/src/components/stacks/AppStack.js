import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "../tabs/HomeTab";
import ParkingStack from "./ParkingStack";
import MyActivityStack from "./MyActivityStack";
import HostStack from "./HostStack";
import ChatStack from "./ChatStack";
import AccountStack from "./AccountStack";

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
    <Stack.Screen name="ParkingStack" component={ParkingStack} options={{ headerShown: false }} />
    <Stack.Screen name="MyActivityStack" component={MyActivityStack} options={{ headerShown: false }} />
    <Stack.Screen name="HostStack" component={HostStack} options={{ headerShown: false }} />
    <Stack.Screen name="ChatStack" component={ChatStack} options={{ headerShown: false }} />
    <Stack.Screen name="AccountStack" component={AccountStack} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AppStack;