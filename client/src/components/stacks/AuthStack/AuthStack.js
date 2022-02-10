import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/Login.js';
import SignUpScreen from './screens/Signup.js';
import ForgotPasswordScreen from './screens/ForgotPwd.js';

const Stack = createNativeStackNavigator()

const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen
        name='Login'
        component={LoginScreen}
      />
        <Stack.Screen
        name='Signup'
        component={SignUpScreen}
      />
        <Stack.Screen
        name='ForgotPassword'
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
)

export default AuthStack;