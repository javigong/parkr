import { Box, Input, Button } from "native-base";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const ParkingLocationScreen = ({ navigation }) => {
  const [parkingLot, setParkingLot] = useState("");

  return (
    <>
      <GooglePlacesAutocomplete
        placeholder="Search"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setParkingLot(data.description);
        }}
        query={{
          key: "AIzaSyB59OVgaJ7bRTw8ZbF2VDRaW2Qb1XcMn5Y",
          language: "en",
          components: "country:ca",
        }}
      />
      <Box alignItems="center" w="100%" safeArea>
        <Button
          w="80%"
          onPress={() =>
            navigation.navigate("SignupFormScreen", {
              parkingLot,
            })
          }
        >
          Next
        </Button>
      </Box>
    </>
  );
  s;
};

export default ParkingLocationScreen;

// dependency found on https://openbase.com/js/react-native-google-places-autocomplete
