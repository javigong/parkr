import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator>
      {/* <Tab.Screen name="Parking" component={ParkingScreen} />
      <Tab.Screen name="Host" component={HostScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Account" component={AccountScreen} /> */}
    </Tab.Navigator>
  );
}

export default MyTabs;