import React, { useContext, useEffect, useState } from "react";
import { Button, Center, Box, Text, Icon, Container } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons";
import TodaySpotList from "../../lists/TodaySpotList";
import { getAllParkingSpots } from "../../services/api";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";

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

  const [customStyleIndex, setCustomStyleIndex] = useState(0);
  const [spotsTodayList, setSpotsTodayList] = useState(null);
  const [currentDate, setCurrentDate] = useState(null);

  const handleCustomIndexSelect = (index) => {
    setCustomStyleIndex(index);
  };

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const findParkingHandler = () => {
    navigation.navigate("ParkingStack");
  };
  useEffect(() => { 
    const token = user.accessToken;
    const date = new Date();
    setCurrentDate(date.toString().slice(4, 10));
    getAllParkingSpots(token).then((results) => setSpotsTodayList(results));

  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Box style={styles.container}>
          {/* This is where we add the location details and notification */}
          <Box
            backgroundColor="#FD6B36"
            flexDirection="row"
            justifyContent="space-between"
          >
            <Box>
              <Text
                mt={5}
                ml={8}
                fontFamily="heading"
                fontWeight="bold"
                fontSize="2xl"
                color="white"
              >
                Park
              </Text>
              <Text ml={8} fontSize="md" fontWeight="bold" color="white">
                5470 Ormidale Street, Vancouver
              </Text>
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
            <Box width="100%" backgroundColor="#FD6B36">
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
                    borderWidth: 0,
                    borderColor: "#FD6B36",
                  }}
                  activeTabStyle={{ backgroundColor: "white", marginTop: 0 }}
                  tabTextStyle={{ color: "white", fontWeight: "bold" }}
                  activeTabTextStyle={{ color: "#FD6B36" }}
                />
              </Center>
            </Box>
          </Center>
          {customStyleIndex === 0 && (
            <Box flex="1" width="100%" backgroundColor="white">
              <Center>
                <Button
                  height="40px"
                  width="85%"
                  mt="4"
                  mb="3"
                  borderRadius="20"
                  backgroundColor="#FD6B36"
                  onPress={findParkingHandler}
                >
                  <Text color="white" fontWeight="bold">
                    FIND PARKING
                  </Text>
                </Button>
              </Center>
              <Box flex="1">
                <Tab.Navigator
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
                      <TodaySpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="This Week">
                    {() => (
                      <TodaySpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="This Month">
                    {() => (
                      <TodaySpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                      />
                    )}
                  </Tab.Screen>
                </Tab.Navigator>
              </Box>
              <Box></Box>
            </Box>
          )}
          {customStyleIndex === 1 && (
            <Box flex="1" width="100%">
              <Box flex="1">
                <Tab.Navigator
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
                      <TodaySpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Upcoming">
                    {() => (
                      <TodaySpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
                      />
                    )}
                  </Tab.Screen>
                  <Tab.Screen name="Expired">
                    {() => (
                      <TodaySpotList
                        data={spotsTodayList}
                        currentDate={currentDate}
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
});
