import { Box, Text } from "native-base";
import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { getAllParkingSpots } from "../../services/api";
import ParkingSpotList from "../../lists/ParkingSpotList";

const FoundParkingScreen = ({ navigation, route }) => {
  const { startDate, endDate } = route.params;
  const [filteredSpotsList, setFilteredSpotsList] = useState(null);

  useEffect(() => {
    getAllParkingSpots().then((results) => setFilteredSpotsList(results));
  }, []);

  return (
    <Box>
      <Text>Results</Text>
      <Text>
        {format(startDate, "EEE,d MMM, hh:mm b ")} - {""}
        {format(endDate, "EEE,d MMM, hh:mm b ")}
      </Text>
      {() => <ParkingSpotList data={filteredSpotsList} />}
    </Box>
  );
};

export default FoundParkingScreen;
