import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FindParkingScreen from "../screens/parking-stack/FindParkingScreen";
import ConfirmDateTimeScreen from "../screens/parking-stack/ConfirmDateTimeScreen";
import WhoParksScreen from "../screens/parking-stack/WhoParksScreen";
import AvailableTodayScreen from "../screens/parking-stack/AvailableTodayScreen";
import ChooseCarScreen from "../screens/parking-stack/ChooseCarScreen";
import LicensePlateScreen from "../screens/parking-stack/LicensePlateScreen";
import ConfirmReservationScreen from "../screens/parking-stack/ConfirmReservationScreen";

const Stack = createNativeStackNavigator();

const ParkingStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FindParkingScreen" component={FindParkingScreen} />
      <Stack.Screen
        name="ConfirmDateTimeScreen"
        component={ConfirmDateTimeScreen}
      />
      <Stack.Screen name="WhoParksScreen" component={WhoParksScreen} />
      <Stack.Screen
        name="AvailableTodayScreen"
        component={AvailableTodayScreen}
      />
      <Stack.Screen name="ChooseCarScreen" component={ChooseCarScreen} />
      <Stack.Screen name="LicensePlateScreen" component={LicensePlateScreen} />
      <Stack.Screen
        name="ConfirmReservationScreen"
        component={ConfirmReservationScreen}
      />
    </Stack.Navigator>
  );
};

export default ParkingStack;
