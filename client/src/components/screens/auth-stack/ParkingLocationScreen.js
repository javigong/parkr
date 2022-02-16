import { Box, Input, Button } from "native-base";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

// const GooglePlacesInput = () => {
//   return (
//     <GooglePlacesAutocomplete
//       placeholder='Search'
//       onPress={(data, details = null) => {
//         // 'details' is provided when fetchDetails = true
//         console.log(data, details);
//       }}
//       query={{
//         key: 'YOUR API KEY',
//         language: 'en',
//       }}
//     />
//   );
// };

// export default GooglePlacesInput;

const ParkingLocationScreen = ({ navigation }) => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: "AIzaSyB59OVgaJ7bRTw8ZbF2VDRaW2Qb1XcMn5Y",
        language: "en",
      }}
    />
  );
  s;
};

export default ParkingLocationScreen;

// dependency found on https://openbase.com/js/react-native-google-places-autocomplete
