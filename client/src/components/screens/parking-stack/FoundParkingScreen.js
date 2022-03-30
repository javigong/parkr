import { Box, Text, View } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { getAllParkingSpots } from "../../services/api";
import ParkingSpotList from "../../lists/ParkingSpotList";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";
import { SafeAreaView, StyleSheet } from "react-native";

const FoundParkingScreen = ({ navigation, route }) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { item, startDate, endDate, currentDate, type, parkingTypeFilter } =
    route.params;
  const [filteredSpotsList, setFilteredSpotsList] = useState([]);

  useEffect(() => {
    const tokenJwt = user.accessToken;
    const filteredSpotsArray = [];
    // const date = new Date();
    // setCurrentDate(date.toString().slice(4, 10));
    getAllParkingSpots(tokenJwt).then((results) => {
      // setFilteredSpotsList(results);
      results.filter((each) => {
        if (
          each.rsrv_start <= startDate.slice(16, 24) &&
          each.rsrv_end >= endDate.slice(16, 24) &&
          each.paVehicleType === parkingTypeFilter
        ) {
          filteredSpotsArray.push(each);
        }
      });
      setFilteredSpotsList(filteredSpotsArray);
    });
  }, []);

  return (
    <Box style={styles.container}>
      <Text ml="5" mt="3" fontSize="lg" bold>
        Results
      </Text>
      <Text ml="5" mb="5">
        {/* {format(startDate, "EEE,d MMM, hh:mm  ")} - {""}
        {format(endDate, "EEE,d MMM, hh:mm  ")} */}
        {`${startDate.slice(4, 10)}, ${startDate.slice(16, 21)}`} - {""}
        {`${endDate.slice(4, 10)}, ${endDate.slice(16, 21)}`}
      </Text>
      {filteredSpotsList.length === 0 ? (
        <Text style={styles.noResultsTxt}>
          Sorry, no spots available for the requested period
        </Text>
      ) : (
        <ParkingSpotList
          data={filteredSpotsList}
          type={"searchResult"}
          item={item}
          currentDate={currentDate.slice(0, 6)}
          navigation={navigation}
          startDate={startDate}
          endDate={endDate}
        />
      )}
    </Box>
  );
};

export default FoundParkingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
  },
  tabContent: {
    flex: 1,
    textAlign: "center",
    height: "100%",
    color: "black",
    backgroundColor: "white",
    fontSize: 18,
  },
  noResultsTxt: {
    textAlign: "center",
    color: "gray",
    fontSize: 20,
    flex: 1,
    marginTop: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
});
