import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IndexScreen from './screens/IndexScreen.js';

const Stack = createNativeStackNavigator()

const AppStack = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name='Index'
        component={IndexScreen}
        options={{
          title: 'Parkr App',
          headerStyle: {
            backgroundColor: '#2c3e50'
          },
          headerTitleStyle: {
            color: '#fff'
          }
        }}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default AppStack;