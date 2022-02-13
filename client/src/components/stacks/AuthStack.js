import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import IndexScreen from "../screens/auth-stack/IndexScreen";
import LoginScreen from "../screens/auth-stack/LoginScreen";
import SignupScreen from "../screens/auth-stack/SignupScreen";
import ForgotPwdScreen from "../screens/auth-stack/ForgotPwdScreen";
import AppStack from "./AppStack";

const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="IndexScreen" component={IndexScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="SignupScreen" component={SignupScreen} />
    <Stack.Screen name="ForgotPwdScreen" component={ForgotPwdScreen} />
    <Stack.Screen name="AppStack" component={AppStack} />
  </Stack.Navigator>
);

export default AuthStack;
