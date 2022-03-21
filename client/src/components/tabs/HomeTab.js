import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth } from "../config/firebase";
import AccountIcon from "../icons/AccountIcon";
import ChatIcon from "../icons/ChatIcon";
import HostIcon from "../icons/HostIcon";
import ParkIcon from "../icons/ParkIcon";
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
      shifting={false}
      initialRouteName="Park"
      activeColor="#FD6B36"
      inactiveColor="#818181"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: "white", paddingTop: 5 }}
    >
      <Tab.Screen
        name="Park"
        component={ParkingScreen}
        options={{
          headerShown: false,
          tabBarLabel: "Park",
          tabBarIcon: ({ color }) => <ParkIcon mb="12" color={color} />,
        }}
      />
      <Tab.Screen
        name="Host"
        component={HostScreen}
        options={{
          tabBarLabel: "Host",
          tabBarIcon: ({ color }) => <HostIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarLabel: "Chat",
          tabBarIcon: ({ color }) => <ChatIcon color={color} />,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          tabBarLabel: "Account",
          tabBarIcon: ({ color }) => <AccountIcon color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeTab;
