import React, { useState, createContext, useContext, useEffect } from "react";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
import RegistrationStack from "./src/components/stacks/RegistrationStack";

LogBox.ignoreAllLogs(); // Ignore all notifications

// root navigator:

function RootNavigator() {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { hasBuilding, setHasBuilding } = useContext(HasBuildingContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  }, []);

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
      ) : (user && !hasBuilding) ? (
        <RegistrationStack />
      ) : (
        <AppStack />
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
