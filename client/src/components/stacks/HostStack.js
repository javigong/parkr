import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ShowSpotScreen from "../screens/host-stack/ShowSpotScreen";

const Stack = createNativeStackNavigator();

const HostStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ShowSpotScreen" component={ShowSpotScreen} />
      
    </Stack.Navigator>
  )
}

export default HostStack