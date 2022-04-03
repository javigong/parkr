import React, { useContext, useEffect, useState } from "react";
import { Button, Center, Box, Text, Icon } from "native-base";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons";
import ParkingSpotList from "../../lists/ParkingSpotList";
import { getAllParkingSpots, getAvailabilityByDate, getAvailabilityByDateMonthly, getAvailabilityByDateWeekly, getBuildingInfo, getMyActivityCurrent, getMyActivityExpired, getMyActivityIncoming } from "../../services/api";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";

import { NotificationContext } from "../../contexts/NotificationContext";
import SolidOrangeButton from "../../UI/SolidOrangeButton";
import ActivitySpotList from "../../lists/ActivitySpotList";
import ActvExpiredSpotCard from "../../cards/ActvExpiredSpotCard";
import ActvExpiredSpotList from "../../lists/ActvExpiredSpotList";

const Tab = createMaterialTopTabNavigator();

const ParkingScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [email, setEmail] = useState(null);
  const { enable, setEnable } = useContext(NotificationContext);
  const [customStyleIndex, setCustomStyleIndex] = useState(0);

  const [spotsTodayList, setSpotsTodayList] = useState(null);
  const [spotsWeekList, setSpotsWeekList] = useState(null);
  const [spotsMonthList, setSpotsMonthList] = useState(null);

  const [spotsInUseList, setSpotsInUseList] = useState(null);
  const [spotsUpcomingList, setSpotsUpcomingList] = useState(null);
  const [spotsExpiredList, setSpotsExpiredList] = useState(null);
  
  const [buildingInfo, setBuildingInfo] = useState();
  const [currentDate, setCurrentDate] = useState(null);

  const date = new Date();
  const dateString = date.toString();
  const dateISOString = date.toISOString();
  // console.log(dateISOString);

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

    setEmail(user.providerData[0].email);
    setCurrentDate(date.toString().slice(4, 10));
    
    getBuildingInfo(tokenJwt).then((results) => setBuildingInfo(results));

    // console.log("Building info is:", buildingInfo);

    // getAllParkingSpots(tokenJwt).then((results) => setSpotsTodayList(results));

    // Parking Availability
    getAvailabilityByDate(dateISOString, tokenJwt).then((results) => setSpotsTodayList(results));

    getAvailabilityByDateWeekly(dateISOString, tokenJwt).then((results) => setSpotsWeekList(results));

    getAvailabilityByDateMonthly(dateISOString, tokenJwt).then((results) => setSpotsMonthList(results));

    // Parking Activity
    getMyActivityCurrent(user.providerData[0].email, tokenJwt).then((results) =>
    setSpotsInUseList(results)
    );

    getMyActivityIncoming(user.providerData[0].email, tokenJwt).then(
      (results) => setSpotsUpcomingList(results)
    );

    getMyActivityExpired(user.providerData[0].email, tokenJwt).then((results) =>
    setSpotsExpiredList(results)
    );

  }, []);

  const handleEnable = () => {
    if (enable === true) {
      setEnable(false);
    } else {
      setEnable(true);
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
                        Park
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
                {enable ? (
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
                ) : (
                  <Icon
                    mt={8}
                    mr={8}
                    color="white"
                    size={8}
                    as={
                      <Ionicons
                        name="notifications-off-outline"
                        onPress={() => handleEnable()}
                      />
                    }
                  />
                )}
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
                        data={spotsWeekList}
                        currentDate={currentDate}
                        type={"thisWeek"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="This Month">
                    {() => (
                      <ParkingSpotList
                        data={spotsMonthList}
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
                      <ActivitySpotList
                        data={spotsInUseList}
                        currentDate={currentDate}
                        type={"inUse"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Upcoming">
                    {() => (
                      <ActivitySpotList
                        data={spotsUpcomingList}
                        currentDate={currentDate}
                        type={"upcoming"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Expired">
                    {() => (
                      <ActvExpiredSpotList
                        data={spotsExpiredList}
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
