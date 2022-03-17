import { Box, Text, View } from "native-base";
import React, { useEffect, useState, useContext } from "react";
import { format } from "date-fns";
import { getAllParkingSpots } from "../../services/api";
import ParkingSpotList from "../../lists/ParkingSpotList";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";

const FoundParkingScreen = ({ navigation, route }) => {
  const { startDate, endDate, currentDate } = route.params;
  const [filteredSpotsList, setFilteredSpotsList] = useState();
  const { user, setUser } = useContext(AuthenticatedUserContext);

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
    <Box>
      <Text>Results</Text>
      <Text>
        {format(startDate, "EEE,d MMM, hh:mm b ")} - {""}
        {format(endDate, "EEE,d MMM, hh:mm b ")}
      </Text>

      {() => (
        <ParkingSpotList
          data={filteredSpotsList}
          type="searchResults"
          currentDate={currentDate}
          navigation={navigation}
        />
      )}
    </Box>
  );
};

export default FoundParkingScreen;
