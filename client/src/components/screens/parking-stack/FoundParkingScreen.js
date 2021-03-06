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
        // const eachResStart = each.rsrv_start;
        // const startResDate = new Date(eachResStart);
        // Split timestamp into [ Y, M, D, h, m, s ]
        const t = each.rsrv_start.split(/[- :]/);

        // Apply each element to the Date function
        const eachResStartFormat = new Date(
          Date.UTC(t[0], t[1] - 1, t[2], t[3], t[4], t[5])
        );

        const q = each.rsrv_end.split(/[- :]/);
        // console.log(d.toString());
        const eachResEndFormat = new Date(
          Date.UTC(q[0], q[1] - 1, q[2], q[3], q[4], q[5])
        );
        // console.log(each.rsrv_start + " and " + startDate);
        // console.log(startResDate);
        console.log(eachResStartFormat);

        // Set StartDate as Current Offset is	UTC/GMT -7 hours
        const startDateLocale = new Date(startDate);
        startDateLocale.setHours(startDateLocale.getHours() + 7);

        const endDateLocale = new Date(endDate);
        endDateLocale.setHours(endDateLocale.getHours() + 7);

        if (
          // Start date search is equal or greater than start date availability
          startDateLocale.getTime() >= eachResStartFormat.getTime() &&
          // End date search is equal or less than end date availability
          // end date currently unavailable
          // endDateLocale.getTime() <= eachResEndFormat.getTime() &&
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
    padding: "10%",
    lineHeight: 25.5,
    color: "gray",
    fontSize: 20,
    flex: 1,
    marginTop: "30%",
    justifyContent: "center",
    alignItems: "center",
  },
});
