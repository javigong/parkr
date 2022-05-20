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
import ReservationDoneScreen from "../screens/parking-stack/ReservationDoneScreen";
import { Button } from "native-base";
import { ms } from "date-fns/locale";
import { ImageHeader } from "../layout/ImageHeader";

const Stack = createNativeStackNavigator();

const ParkingStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: "transparent",
        },
        headerBackground: () => <ImageHeader />,
        headerTintColor: "#FFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="FindParkingScreen"
        component={FindParkingScreen}
        options={{
          title: "Find Parking",
        }}
      />
      <Stack.Screen
        name="FoundParkingScreen"
        component={FoundParkingScreen}
        options={{ headerShown: true, title: "Results" }}
      />
      <Stack.Screen
        name="ConfirmDateTimeScreen"
        component={ConfirmDateTimeScreen}
        options={{ headerShown: true, title: "Date Confirmation" }}
      />
      <Stack.Screen
        name="WhoParksScreen"
        component={WhoParksScreen}
        options={{ headerShown: true, title: "Who's Parking?" }}
      />
      <Stack.Screen
        name="AvailableTodayScreen"
        component={AvailableTodayScreen}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="ChooseCarScreen"
        component={ChooseCarScreen}
        options={{ headerShown: true, title: "Select Car" }}
      />
      <Stack.Screen
        name="LicensePlateScreen"
        component={LicensePlateScreen}
        options={{ headerShown: true, title: "Car Information" }}
      />
      <Stack.Screen
        name="ConfirmReservationScreen"
        component={ConfirmReservationScreen}
        options={{ headerShown: true, title: "Confirm Reservation" }}
      />
      <Stack.Screen
        name="ReservationDoneScreen"
        component={ReservationDoneScreen}
        options={{ headerShown: true, title: "Reservation Complete" }}
      />
    </Stack.Navigator>
  );
};

export default ParkingStack;
