import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const AccountStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ProfileScreen" component={ProfileScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EditVehiclesScreen" component={EditVehiclesScreen} options={{ headerShown: false }} />
  </Stack.Navigator>
);

export default AccountStack;