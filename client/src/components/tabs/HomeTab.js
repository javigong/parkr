import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ParkingScreen from "../screens/home-tab/ParkingScreen";

const Tab = createMaterialBottomTabNavigator();

const HomeTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Parking" component={ParkingScreen} />
      {/* <Tab.Screen name="Host" component={HostScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Account" component={Account} /> */}
    </Tab.Navigator>
  );
};

export default HomeTab;
