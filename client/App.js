import React, { useState, createContext, useContext, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/components/config/firebase";
import Loading from "./src/components/layout/Loading";
import AuthStack from "./src/components/stacks/AuthStack";
import AppStack from "./src/components/stacks/AppStack";
import ParkingScreen from "./src/components/screens/home-tab/ParkingScreen";
import { SafeAreaView } from "react-native-safe-area-context";

// user context:

const AuthenticatedUserContext = createContext({});

const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};

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

    // unsubscribe auth listener on unmount
    return unsubscribeAuth;
  }, [user]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{user ? <AppStack /> : <AuthStack />}</>;

  // return <AuthStack />;

  // return <AppStack />;
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
