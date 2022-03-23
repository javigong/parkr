import React, { useState, createContext, useContext, useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/components/config/firebase";
import {
  AuthenticatedUserContext,
  AuthenticatedUserProvider,
} from "./src/components/contexts/AuthenticatedUserContext";
import Loading from "./src/components/layout/Loading";
import AuthStack from "./src/components/stacks/AuthStack";
import AppStack from "./src/components/stacks/AppStack";
import { LogBox } from "react-native";
import {
  HasBuildingContext,
  HasBuildingProvider,
} from "./src/components/contexts/HasBuildingContext";
import SignupFormScreen from "./src/components/screens/auth-stack/SignupFormScreen";

import SignupScreen from "./src/components/screens/auth-stack/SignupScreen";
import LoginScreen from "./src/components/screens/auth-stack/LoginScreen";
import WelcomeScreen from "./src/components/screens/auth-stack/WelcomeScreen";
import ParkingLocationScreen from "./src/components/screens/auth-stack/ParkingLocationScreen";
import ParkingSpotCard from "./src/components/cards/ParkingSpotCard";
import LicensePlateScreen from "./src/components/screens/parking-stack/LicensePlateScreen";
import WhoParksScreen from "./src/components/screens/parking-stack/WhoParksScreen";
import ChooseCarScreen from "./src/components/screens/parking-stack/ChooseCarScreen";
import ConfirmDateTimeScreen from "./src/components/screens/parking-stack/ConfirmDateTimeScreen";
import ParkingSpotList from "./src/components/lists/ParkingSpotList";
import ParkingScreen from "./src/components/screens/home-tab/ParkingScreen";
import HostScreen from "./src/components/screens/home-tab/HostScreen";
import ConfirmReservationScreen from "./src/components/screens/parking-stack/ConfirmReservationScreen";
import ParkingSpotDetailsCard from "./src/components/cards/ParkingSpotDetailsCard";
import DetailsScreen from "./src/components/screens/myactivity-stack/DetailsScreen";
import FindParkingScreen from "./src/components/screens/parking-stack/FindParkingScreen";
import OutlineButton from "./src/components/UI/OutlineButton";
import SolidOrangeButton from "./src/components/UI/SolidOrangeButton";

LogBox.ignoreAllLogs(); // Ignore all notifications

// root navigator:

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { hasBuilding, setHasBuilding } = useContext(HasBuildingContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setIsLoading(false);
      }
    );
    // console.log("user", user);
    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {!user ? (
        <AuthStack />
      ) : hasBuilding ? (
        <AppStack />
      ) : (
        <SignupFormScreen />
      )}
    </>
  );

  // return <AuthStack />;
  // return <WelcomeScreen />;
  // return <SignupFormScreen />;
  // return <AppStack />;
  // return <LicensePlateScreen />;
  // return <WhoParksScreen />;
  // return <ChooseCarScreen />;
  // return <ConfirmDateTimeScreen />;
  // return <HostScreen />
  // return <ConfirmReservationScreen/>
  // return <ParkingSpotDetailsCard />
  // return <ParkingLocationScreen />;
  // return <SignupFormScreen />;
  // return <OutlineButton />;
  // return <SolidOrangeButton />;
}

const App = () => {
  return (
    <NativeBaseProvider>
      <AuthenticatedUserProvider>
        <HasBuildingProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </HasBuildingProvider>
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  );
};

export default App;
