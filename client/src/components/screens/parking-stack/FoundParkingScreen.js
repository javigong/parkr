import { Box, Text, View } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { getAllParkingSpots } from "../../services/api";
import ParkingSpotList from "../../lists/ParkingSpotList";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";
import { SafeAreaView, StyleSheet } from "react-native";

const FoundParkingScreen = ({ navigation, route }) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { item, startDate, endDate, currentDate, type } = route.params;
  const [filteredSpotsList, setFilteredSpotsList] = useState(null);

  useEffect(() => {
    const tokenJwt = user.accessToken;
    // const date = new Date();
    // setCurrentDate(date.toString().slice(4, 10));
    getAllParkingSpots(tokenJwt).then(
      (results) => setFilteredSpotsList(results)
      // console.log(results)
    );
    console.log(filteredSpotsList);
  }, []);

  return (
    <Box style={styles.container}>
      <Text>Results</Text>
      <Text>
        {format(startDate, "EEE,d MMM, hh:mm  ")} - {""}
        {format(endDate, "EEE,d MMM, hh:mm  ")}
      </Text>
      <ParkingSpotList
        data={filteredSpotsList}
        type={"searchResult"}
        currentDate={currentDate}
        navigation={navigation}
      />
    </Box>
  );
};

export default FoundParkingScreen;

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
