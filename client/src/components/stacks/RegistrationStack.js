import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ParkingLocationScreen from "../screens/registration-stack/ParkingLocationScreen";
import SignupFormScreen from "../screens/registration-stack/SignupFormScreen";


const Stack = createNativeStackNavigator();

const RegistrationStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "#FD6B36",
      headerTitleStyle: {
        color: "white",
      },
    }}
  >
    <Stack.Screen
      name="ParkingLocationScreen"
      component={ParkingLocationScreen}
      options={{
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="SignupFormScreen"
      component={SignupFormScreen}
      options={{
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

export default RegistrationStack;
