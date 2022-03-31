import { Box, Input, Button, View, Center, Heading } from "native-base";
import { SafeAreaView, ImageBackground, StyleSheet } from "react-native";
import BuildingSVG from "../../UI/BuildingSVG";
import OrangeSolidButton from "../../UI/SolidOrangeButton";
import React, { useState, useContext } from "react";
import { HasBuildingContext } from "../../contexts/HasBuildingContext";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AutocompleteInput from "react-native-autocomplete-input";

const ParkingLocationScreen = ({ navigation }) => {
  const [parkingLot, setParkingLot] = useState("");
  const { hasBuilding, setHasBuilding } = useContext(HasBuildingContext);

  return (
    <SafeAreaView flex="1" width="100%" backgroundColor="white">
      <View h="35%" w="100%">
        <ImageBackground
          source={require("../../../../assets/orange-background.png")}
          resizeMode="cover"
          alt="background"
          style={styles.backgroundImage}
        ></ImageBackground>
        <Center position="relative" top="-25%">
          <BuildingSVG />
          <Heading pt="5" size="lg">
            Find Your Building
          </Heading>
        </Center>
      </View>
      <GooglePlacesAutocomplete
        placeholder="Enter your Address"
        styles={{
          textInputContainer: {
            backgroundColor: "rgba(0,0,0,0)",
            borderTopWidth: 0,
            borderBottomWidth: 0,
          },
          textInput: {
            marginLeft: 15,
            marginRight: 15,
            height: 50,
            color: "#5d5d5d",
            fontSize: 16,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: "#FF9D63",
          },
          predefinedPlacesDescription: {
            color: "#1faadb",
          },
        }}
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
        <OrangeSolidButton
          width="330"
          buttonText="NEXT"
          onPress={() => {
            setHasBuilding("yes");
          }}
        />
      </Box>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  addressInput: {
    width: "80%",
    // margin: "auto",
  },
});

export default ParkingLocationScreen;

// dependency found on https://openbase.com/js/react-native-google-places-autocomplete
