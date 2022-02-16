import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../config/firebase";
import ParkingScreen from "../screens/home-tab/ParkingScreen";

const Tab = createMaterialBottomTabNavigator();

const HomeTab = () => {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <Tab.Navigator
      initialRouteName="Park"
      initialRouteName="Feed"
      activeColor="black"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: "rgb(94,39,161)" }}
      options={{
        headerRight: () => (
          <Button onPress={onSignOut} title="Logout" color="rgb(94,39,161)" />
        ),
      }}
    >
      <Tab.Screen
        name="Parking"
        component={ParkingScreen}
        options={{
          tabBarLabel: "Park",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="local-parking"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Host"
        component={HostScreen}
        options={{
          tabBarLabel: "Park",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="local-parking"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: "Park",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="local-parking"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: "Park",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="local-parking"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
