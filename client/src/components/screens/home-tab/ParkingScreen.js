import React, { useLayoutEffect, useState } from "react";
import { Button, Center, Box, Text, Icon, Container } from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import SegmentedControlTab from "react-native-segmented-control-tab";
import { Ionicons } from "@expo/vector-icons";
import TodaySpotList from "../../lists/TodaySpotList";

const data = [
  {
    id: "1",
    firstName: "Brian",
    lastName: "Feder",
    spotNumber: "10",
    type: "motorcycle",
    startDate: "Feb 20",
    startTime: "06:00",
    endDate: null,
    endTime: null,
    price: "1.50",
  },
  {
    id: "2",
    firstName: "Debora",
    lastName: "Morris",
    spotNumber: "25",
    type: "ev",
    startDate: "Feb 20",
    startTime: "06:00",
    endDate: null,
    endTime: null,
    price: "4.50",
  },
  {
    id: "3",
    firstName: "Sandra",
    lastName: "Coleman",
    spotNumber: "57",
    type: "standard",
    startDate: "Feb 20",
    startTime: "11:30",
    endDate: null,
    endTime: null,
    price: "2.00",
  },
];

const ParkingScreen = ({ navigation }) => {
  const [customStyleIndex, setCustomStyleIndex] = useState(0);

  const handleCustomIndexSelect = (index) => {
    setCustomStyleIndex(index);
  };

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const findParkingHandler = () => {
    navigation.navigate("ParkingStack");
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Box style={styles.container}>
          {/* This is where we add the location details and notification */}
          <Box flexDirection="row" justifyContent="space-between">
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
            <Text mx="8" mb="5" textAlign="center" fontSize="md" color="white">
              Need to schedule a specific period for long-term or short-term
              parking?
            </Text>

            <Button
              onPress={findParkingHandler}
              backgroundColor="white"
              width="85%"
              mb="10"
            >
              <Text color="#FD6B36" fontWeight="bold">
                FIND PARKING
              </Text>
            </Button>
          </Center>
          {customStyleIndex === 0 && (
            <Box width="100%">
              {/* <Text style={styles.tabContent}> Tab one</Text> */}
              <Box backgroundColor="white">
                <TodaySpotList data={data} />
              </Box>
              <Box></Box>
            </Box>
          )}
          {customStyleIndex === 1 && (
            <Box flex="1" width="100%">
              {/* Here is where we add the activity component/container */}
              <Text style={styles.tabContent}> Tab two</Text>
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
    backgroundColor: "#FD6B36",
  },
  tabContent: {
    textAlign: "center",
    height: "100%",
    color: "black",
    backgroundColor: "white",
    fontSize: 18,
  },
});
