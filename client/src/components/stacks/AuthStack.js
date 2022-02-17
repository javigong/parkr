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

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <Stack.Screen name="IndexScreen" component={IndexScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen
      name="ParkingLocationScreen"
      component={ParkingLocationScreen}
    />
    <Stack.Screen
      name="SignupFormScreen"
      options={({ route }) => ({
        parkingLot: route.params,
      })}
      component={SignupFormScreen}
    />
    <Stack.Screen name="ForgotPwdScreen" component={ForgotPwdScreen} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="AppStack" component={AppStack} />
  </Stack.Navigator>
);

export default AuthStack;
