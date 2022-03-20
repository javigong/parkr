import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeTab from "../tabs/HomeTab";
import ParkingStack from "./ParkingStack";
import MyActivityStack from "./MyActivityStack";
import HostStack from "./HostStack";
import ChatStack from "./ChatStack";
import AccountStack from "./AccountStack";
import { ImageHeader } from "../layout/ImageHeader";

const Stack = createNativeStackNavigator();

const AppStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="HomeTab"
      component={HomeTab}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ParkingStack"
      component={ParkingStack}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="MyActivityStack"
      component={MyActivityStack}
      options={{
        title: "Spot Details",
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerBackground: () => <ImageHeader />,
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="HostStack"
      component={HostStack}
      options={{
        title: "Spot Details",
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerBackground: () => <ImageHeader />,
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="ChatStack"
      component={ChatStack}
      options={{
        title: "Chat",
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerBackground: () => <ImageHeader />,
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    />
    <Stack.Screen
      name="AccountStack"
      component={AccountStack}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

export default AppStack;
