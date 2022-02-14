import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { auth } from "../config/firebase";
import ParkingScreen from "../screens/home-tab/ParkingScreen";

const Tab = createMaterialBottomTabNavigator();

const HomeTab = () => {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <Tab.Navigator
    options={{
          headerRight: () => (
            <Button onPress={onSignOut} title="Logout" color="#000" />
          ),
        }}>
      <Tab.Screen
        name="Parking"
        component={ParkingScreen}
      />
      {/* <Tab.Screen name="Host" component={HostScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Account" component={Account} /> */}
    </Tab.Navigator>
  );
};

export default HomeTab;
