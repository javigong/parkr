import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screens/myactivity-stack/DetailsScreen";
import ExpiredScreen from "../screens/myactivity-stack/ExpiredScreen";
import InUseScreen from "../screens/myactivity-stack/InUseScreen";
import UpcomingScreen from "../screens/myactivity-stack/UpcomingScreen";

const Stack = createNativeStackNavigator();

const MyActivityStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="InUseScreen"
        component={InUseScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UpcomingScreen"
        component={UpcomingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ExpiredScreen"
        component={ExpiredScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default MyActivityStack;
