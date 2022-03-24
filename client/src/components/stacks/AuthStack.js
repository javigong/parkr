import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import OnboardingScreen from "../screens/auth-stack/OnboardingScreen";
import IndexScreen from "../screens/auth-stack/IndexScreen";
import LoginScreen from "../screens/auth-stack/LoginScreen";
import SignupScreen from "../screens/auth-stack/SignupScreen";
import ForgotPwdScreen from "../screens/auth-stack/ForgotPwdScreen";
import WelcomeScreen from "../screens/auth-stack/WelcomeScreen";
import RegistrationStack from "./RegistrationStack";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerTintColor: "#FD6B36",
      headerTitleStyle: {
        color: "white",
      },
    }}
  >
    <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    <Stack.Screen name="IndexScreen" component={IndexScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen
      name="SignupScreen"
      component={SignupScreen}
      options={{
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen name="SignupFormScreen" component={SignupFormScreen} />
    <Stack.Screen name="ForgotPwdScreen" component={ForgotPwdScreen} />
    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
    <Stack.Screen name="RegistrationStack" component={RegistrationStack} />
    <Stack.Screen name="AppStack" component={AppStack} />
  </Stack.Navigator>
);

export default AuthStack;
