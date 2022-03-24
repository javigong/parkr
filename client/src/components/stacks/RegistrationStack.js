import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IndexScreen from "../screens/auth-stack/IndexScreen";
import LoginScreen from "../screens/auth-stack/LoginScreen";
import SignupScreen from "../screens/auth-stack/SignupScreen";
import ForgotPwdScreen from "../screens/auth-stack/ForgotPwdScreen";
import AppStack from "./AppStack";
import WelcomeScreen from "../screens/auth-stack/WelcomeScreen";
import OnboardingScreen from "../screens/auth-stack/OnboardingScreen";
import SignupFormScreen from "../screens/auth-stack/SignupFormScreen";

import ParkingLocationScreen from "../screens/auth-stack/ParkingLocationScreen";

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
      name="FindBuildingScreen"
      component={FindBuildingScreen}
      options={{
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="SignupFormScreen"
      component={SignupFormScreen}
    />
  </Stack.Navigator>
);

export default RegistrationStack;