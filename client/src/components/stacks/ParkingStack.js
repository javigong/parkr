import React from "react";
import {
  createNativeStackNavigator,
  headerBackButton,
} from "@react-navigation/native-stack";
import FindParkingScreen from "../screens/parking-stack/FindParkingScreen";
import FoundParkingScreen from "../screens/parking-stack/FoundParkingScreen";
import ConfirmDateTimeScreen from "../screens/parking-stack/ConfirmDateTimeScreen";
import WhoParksScreen from "../screens/parking-stack/WhoParksScreen";
import AvailableTodayScreen from "../screens/parking-stack/AvailableTodayScreen";
import ChooseCarScreen from "../screens/parking-stack/ChooseCarScreen";
import LicensePlateScreen from "../screens/parking-stack/LicensePlateScreen";
import ConfirmReservationScreen from "../screens/parking-stack/ConfirmReservationScreen";
import { Button } from "native-base";
import { HeaderBackButton } from "@react-navigation/elements";
import { ms } from "date-fns/locale";

const Stack = createNativeStackNavigator();

const ParkingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "#FD6B36",
        },
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="FindParkingScreen"
        component={FindParkingScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="FoundParkingScreen"
        component={FoundParkingScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ConfirmDateTimeScreen"
        component={ConfirmDateTimeScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="WhoParksScreen"
        component={WhoParksScreen}
        options={{ headerShown: true }}
      />
      {/* <Stack.Screen
        name="AvailableTodayScreen"
        component={AvailableTodayScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChooseCarScreen"
        component={ChooseCarScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="LicensePlateScreen"
        component={LicensePlateScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ConfirmReservationScreen"
        component={ConfirmReservationScreen}
        options={{ headerShown: true }}
      />
    </Stack.Navigator>
  );
};

export default ParkingStack;
