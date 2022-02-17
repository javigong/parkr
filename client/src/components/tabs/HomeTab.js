import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../config/firebase";
import AccountScreen from "../screens/home-tab/AccountScreen";
import ChatScreen from "../screens/home-tab/ChatScreen";
import HostScreen from "../screens/home-tab/HostScreen";
import ParkingScreen from "../screens/home-tab/ParkingScreen";

const Tab = createMaterialBottomTabNavigator();

const HomeTab = () => {
  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  return (
    <Tab.Navigator
      initialRouteName="Park"
      activeColor="white"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "rgb(94,39,161)" }}
      options={{
        headerRight: () => (
          <Button onPress={onSignOut} title="Logout" color="rgb(94,39,161)" />
        ),
      }}
    >
      <Tab.Screen
        name="Park"
        component={ParkingScreen}
        options={{
          tabBarLabel: "Park",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="parking" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Host"
        component={HostScreen}
        options={{
          tabBarLabel: "Host",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="table-cog" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="chat-processing"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account-circle"
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
