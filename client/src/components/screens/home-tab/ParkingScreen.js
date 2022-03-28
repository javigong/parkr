import React, { useContext, useEffect, useState } from "react";
import { Button, Center, Box, Text, Icon, useToast } from "native-base";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons";
import ParkingSpotList from "../../lists/ParkingSpotList";
import { getAllParkingSpots, getBuildingInfo } from "../../services/api";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";

import { NotificationContext } from "../../contexts/NotificationContext";
import SolidOrangeButton from "../../UI/SolidOrangeButton";

const Tab = createMaterialTopTabNavigator();

const _exampleDataStructure = [
  {
    idParkingSlot: "P1-20",
    paUnitNo: "703",
    paOwnerId: "mariasmith@testing.com",
    upFirstName: "Maria",
    upLastName: "Smith",
    paVehicleType: 4,
    paStatus: 1,
    paVisitorId: null,
    paFee: "3.00",
    rsrv_start: "12:00:00",
    rsrv_end: "20:00:00",
    availability: 1,
  },
];

const ParkingScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { enable, setEnable } = useContext(NotificationContext);
  const [customStyleIndex, setCustomStyleIndex] = useState(0);
  const [spotsTodayList, setSpotsTodayList] = useState(null);
  const [buildingInfo, setBuildingInfo] = useState();
  const [currentDate, setCurrentDate] = useState(null);
  const toast = useToast();

  const date = new Date();
  const dateString = date.toString();

  const handleCustomIndexSelect = (index) => {
    setCustomStyleIndex(index);
  };

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const findParkingHandler = () => {
    navigation.navigate("ParkingStack", {
      screen: "FindParkingScreen",
      params: { item: null, currentDate: dateString, type: "search" },
    });
  };

  useEffect(() => {
    const tokenJwt = user.accessToken;

    setCurrentDate(date.toString().slice(4, 10));
    getAllParkingSpots(tokenJwt).then((results) => setSpotsTodayList(results));
    getBuildingInfo(tokenJwt).then((results) => setBuildingInfo(results));
  }, []);

  // console.log("Building info is:", buildingInfo);

  const handleEnable = () => {
    if (enable === true) {
      setEnable(false);
      toast.show({
        title: "Notification disabled",
        placement: "top-right",
        backgroundColor: "#107a57",
      });
    } else {
      setEnable(true);
      toast.show({
        title: "Notification enabled",
        placement: "top-right",
        backgroundColor: "#107a57",
      });
    }
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Box style={styles.container}>
          {/* This is where we add the location details and notification */}
          <Box flexDirection="row" justifyContent="space-between">
            <ImageBackground
              source={require("../../../../assets/orange-background.png")}
              resizeMode="cover"
              alt="background"
              style={styles.backgroundImage}
            >
              <Box flexDirection="row" justifyContent="space-between">
                <Box>
                  {buildingInfo != undefined ? (
                    <>
                      <Text
                        mt={5}
                        ml={8}
                        fontFamily="heading"
                        fontWeight="bold"
                        fontSize="2xl"
                        color="white"
                      >
                        Parkr
                        {/* {buildingInfo[0].biName} */}
                      </Text>
                      <Text
                        ml={8}
                        fontSize="md"
                        fontWeight="bold"
                        color="white"
                      >
                        {buildingInfo[0].biAddress}
                      </Text>
                    </>
                  ) : (
                    <Text></Text>
                  )}
                </Box>
                <Icon
                  mt={8}
                  mr={8}
                  color="white"
                  size={8}
                  as={
                    <Ionicons
                      name="notifications-outline"
                      onPress={() => handleEnable()}
                    />
                  }
                />
              </Box>
              <Center>
                <Box width="100%">
                  <Center>
                    <SegmentedControlTab
                      values={["Parking", "Activity"]}
                      selectedIndex={customStyleIndex}
                      onTabPress={handleCustomIndexSelect}
                      borderRadius={20}
                      tabsContainerStyle={{
                        height: 40,
                        width: "85%",
                        margin: 20,
                        // marginTop: 60,
                        backgroundColor: "none",
                        borderStyle: "solid",
                        borderRadius: 20,
                      }}
                      tabStyle={{
                        backgroundColor: "rgba(255,255,255,0.4)",
                        borderWidth: 1,
                        borderColor: "white",
                      }}
                      activeTabStyle={{
                        backgroundColor: "white",
                        marginTop: 0,
                      }}
                      tabTextStyle={{ color: "white", fontWeight: "bold" }}
                      activeTabTextStyle={{ color: "#FD6B36" }}
                    />
                  </Center>
                </Box>
              </Center>
            </ImageBackground>
          </Box>

          {customStyleIndex === 0 && (
            <Box flex="1" width="100%" backgroundColor="white">
              <Center mt="2">
                <SolidOrangeButton width="90%" buttonText="FIND PARKING" onPress={findParkingHandler}/>
              </Center>
              <Box flex="1">
                <Tab.Navigator
                  sceneContainerStyle={{ backgroundColor: "white" }}
                  screenOptions={{
                    tabBarIndicatorStyle: {
                      borderBottomColor: "#FD6B36",
                      borderBottomWidth: 3,
                    },
                    tabBarLabelStyle: { fontSize: 12 },
                  }}
                >
                  <Tab.Screen name="Today">
                    {() => (
                      <ParkingSpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                        type={"today"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="This Week">
                    {() => (
                      <ParkingSpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                        type={"thisWeek"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="This Month">
                    {() => (
                      <ParkingSpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                        type={"thisMonth"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              </Box>
            </Box>
          )}
          {customStyleIndex === 1 && (
            <Box flex="1" width="100%">
              <Box flex="1">
                <Tab.Navigator
                  sceneContainerStyle={{ backgroundColor: "white" }}
                  screenOptions={{
                    tabBarIndicatorStyle: {
                      borderBottomColor: "#FD6B36",
                      borderBottomWidth: 3,
                    },
                    tabBarLabelStyle: { fontSize: 12 },
                  }}
                >
                  <Tab.Screen name="In Use">
                    {() => (
                      <ParkingSpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                        type={"inUse"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Upcoming">
                    {() => (
                      <ParkingSpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                        type={"upcoming"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Expired">
                    {() => (
                      <ParkingSpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                        type={"expired"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              </Box>
            </Box>
          )}
        </Box>
      </SafeAreaView>
    </>
  );
};

export default ParkingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  tabContent: {
    flex: 1,
    textAlign: "center",
    height: "100%",
    color: "black",
    backgroundColor: "white",
    fontSize: 18,
  },
  backgroundImage: {
    flex: 1,
  },
});
