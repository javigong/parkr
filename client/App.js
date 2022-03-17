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
import SignupScreen from "./src/components/screens/auth-stack/SignupScreen";
import LoginScreen from "./src/components/screens/auth-stack/LoginScreen";
import WelcomeScreen from "./src/components/screens/auth-stack/WelcomeScreen";
import SignupFormScreen from "./src/components/screens/auth-stack/SignupFormScreen";
import ParkingLocationScreen from "./src/components/screens/auth-stack/ParkingLocationScreen";
import ParkingSpotCard from "./src/components/cards/ParkingSpotCard";
import LicensePlateScreen from "./src/components/screens/parking-stack/LicensePlateScreen";
import WhoParksScreen from "./src/components/screens/parking-stack/WhoParksScreen";
import ChooseCarScreen from "./src/components/screens/parking-stack/ChooseCarScreen";
import ConfirmDateTimeScreen from "./src/components/screens/parking-stack/ConfirmDateTimeScreen";

import { LogBox } from "react-native";
import ParkingSpotList from "./src/components/lists/ParkingSpotList";
import ParkingScreen from "./src/components/screens/home-tab/ParkingScreen";
import HostScreen from "./src/components/screens/home-tab/HostScreen";

LogBox.ignoreLogs(
  [
    "AsyncStorage has been extracted from react-native core and will be removed in a future release",
  ],
  ["NativeBase: The contrast ratio of 2.863815068413143:1 for white on"]
); // Ignore log notification by message

// root navigator:

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
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

  return <>{user ? <AppStack /> : <AuthStack />}</>;

  // return <AuthStack />;
  // return <WelcomeScreen />;
  // return <SignupFormScreen />;
  // return <AppStack />;
  // return <LicensePlateScreen />;
  // return <WhoParksScreen />;
  // return <ChooseCarScreen />;
  // return <ConfirmDateTimeScreen />;
  // return <HostScreen />
}

const App = () => {
  return (
    <NativeBaseProvider>
      <AuthenticatedUserProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </AuthenticatedUserProvider>
    </NativeBaseProvider>
  );
};

export default App;
