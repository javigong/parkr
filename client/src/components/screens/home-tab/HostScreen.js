import React, { useContext, useEffect, useState } from "react";
import { Button, Center, Box, Text, Icon, Container } from "native-base";
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons";
import ParkingSpotList from "../../lists/ParkingSpotList";
import {
  getAllHostSlots,
  getAllParkingSpots,
  getBuildingInfo,
  getHostCurrentIncoming,
  getHostExpired,
} from "../../services/api";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";
import HostSpotList from "../../lists/HostSpotList";

const Tab = createMaterialTopTabNavigator();

// Object structure sample:
// {
//   "idbooking": 92,
//   "rsvparkingslotid": "P2-09",
//   "rsvvisitorid": "eugenetollefson@testing.com",
//   "paOwnerId": "john.doe.parkr@gmail.com",
//   "rsrv_start": "2022-04-03T19:00:00.000Z",
//   "rsrv_end": "2022-04-03T21:00:00.000Z",
//   "rsvstatus": 1,
//   "paVehicleType": 1,
//   "rsvfee": "3.05",
//   "rsvcarplateno": "VLS432",
//   "rsvcarmodel": "Nissan"
// }

const HostScreen = ({ navigation }) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const [email, setEmail] = useState(null);
  const [customStyleIndex, setCustomStyleIndex] = useState(0);

  const [spotsTodayList, setSpotsTodayList] = useState(null);
  const [allHostSlotsList, setAllHostSlotsList] = useState(null);
  const [spotsReservationList, setSpotsReservationList] = useState(null);
  const [spotsArchiveList, setSpotsArchiveList] = useState(null);

  const [buildingInfo, setBuildingInfo] = useState();
  const [currentDate, setCurrentDate] = useState(null);

  const handleCustomIndexSelect = (index) => {
    setCustomStyleIndex(index);
  };

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useEffect(() => {
    const tokenJwt = user.accessToken;

    setEmail(user.providerData[0].email);

    const date = new Date();

    setCurrentDate(date.toString().slice(4, 10));
    getBuildingInfo(tokenJwt).then((results) => setBuildingInfo(results));

    getAllParkingSpots(tokenJwt).then((results) => setSpotsTodayList(results));

    getHostCurrentIncoming(user.providerData[0].email, tokenJwt).then(
      (results) => setSpotsReservationList(results)
    );

    getHostExpired(user.providerData[0].email, tokenJwt).then((results) =>
      setSpotsArchiveList(results)
    );

    getAllHostSlots(user.providerData[0].email, tokenJwt).then((results) =>
      setAllHostSlotsList(results)
    );
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Box style={styles.container}>
          {/* This is where we add the location details and notification */}

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
                      {/* {buildingInfo[0].biName} */}
                      Host
                    </Text>
                    <Text ml={8} fontSize="md" fontWeight="bold" color="white">
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
                as={<Ionicons name="notifications-outline" />}
              />
            </Box>
            <Center>
              <Box width="100%">
                <Center>
                  <SegmentedControlTab
                    values={["Activity", "Spots"]}
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
                    activeTabStyle={{ backgroundColor: "white", marginTop: 0 }}
                    tabTextStyle={{ color: "white", fontWeight: "bold" }}
                    activeTabTextStyle={{ color: "#FD6B36" }}
                  />
                </Center>
              </Box>
            </Center>
          </ImageBackground>

          {customStyleIndex === 0 && (
            <Box flex="1" width="100%" backgroundColor="white">
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
                  <Tab.Screen name="Reservation">
                    {() => (
                      <HostSpotList
                        data={spotsReservationList}
                        currentDate={currentDate}
                        type={"hostReservation"}
                        navigation={navigation}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Archive">
                    {() => (
                      <HostSpotList
                        data={spotsArchiveList}
                        currentDate={currentDate}
                        type={"hostArchive"}
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
                <ParkingSpotList
                  data={allHostSlotsList}
                  currentDate={currentDate}
                  type={"hostSpot"}
                  navigation={navigation}
                />
              </Box>
            </Box>
          )}
        </Box>
      </SafeAreaView>
    </>
  );
};

export default HostScreen;

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
  backgroundImage: {},
});
