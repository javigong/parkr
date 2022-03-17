import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HostDetailsScreen from "../screens/host-stack/HostDetailsScreen";
import HostEditScreen from "../screens/host-stack/HostEditScreen";
import HostAddAvailabilityScreen from "../screens/host-stack/HostAddAvailabilityScreen";
import HostRepeatAvailabilityScreen from "../screens/host-stack/HostRepeatAvailabilityScreen";

const Stack = createNativeStackNavigator();

const HostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HostDetailsScreen"
        component={HostDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HostEditScreen"
        component={HostEditScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HostAddAvailabilityScreen"
        component={HostAddAvailabilityScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HostRepeatAvailabilityScreen"
        component={HostRepeatAvailabilityScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default HostStack;
