import {
  View,
  Center,
  Heading,
  Box,
  FormControl,
  Input,
  Text,
  VStack,
  Select,
  CheckIcon,
  Button,
  Flex,
  ScrollView,
} from "native-base";
import { SafeAreaView, ImageBackground, StyleSheet } from "react-native";
import BuildingSVG from "../../UI/BuildingSVG";
import OrangeSolidButton from "../../UI/SolidOrangeButton";
import React, { useContext, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import AutocompleteInput from "react-native-autocomplete-input";
import { HasBuildingContext } from "../../contexts/HasBuildingContext";

const SignupFormScreen = ({ navigation, route }) => {
  const { hasBuilding, setHasBuilding } = useContext(HasBuildingContext);
  
  const [parkingLot, setParkingLot] = useState("");
  const [haveParking, setHaveParking] = useState();
  const [haveCar, setHaveCar] = useState();

  const SingupFormHandler = () => {
    navigation.push("SignupFormScreen");
  };

  // const { parkingLot } = route.params;

  const handleRegister = () => {
    setHasBuilding(true);
    // navigation.navigate("AppStack", {
    //   parkingLot,
    // });
  };

  // navigation.navigate("ParkingStack", {
  //   screen: "FindParkingScreen",
  //   params: { item: null, currentDate: dateString, type: "search" },
  // });

  return (
    <SafeAreaView>
      <ScrollView>
        <View h="250" w="100%">
          <ImageBackground
            source={require("../../../../assets/orange-background.png")}
            resizeMode="cover"
            alt="background"
            style={styles.backgroundImage}
          ></ImageBackground>
          <Center position="relative" top="-25%">
            <BuildingSVG />
            <Heading pt="5" mb="-9" size="lg">
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

        <Box margin="3">
          <Flex>
            <Box mt="4" mb="4">
              <Heading size="md">Your Parking Lot</Heading>
              <Text fontSize="lg">{parkingLot}</Text>
            </Box>
            <FormControl>
              <VStack space={10}>
                <Box>
                  <FormControl.Label isRequired>
                    What is your Unit Number?
                  </FormControl.Label>
                  <Input variant="underlined" placeholder="E.g. 701" />
                </Box>
                <Box>
                  <FormControl.Label>
                    Do you have a parking spot?
                  </FormControl.Label>
                  <Select
                    selectedValue={haveParking}
                    minWidth="200"
                    accessibilityLabel="Choose your answer"
                    placeholder="Choose your answer"
                    _selectedItem={{
                      bg: "lightgray",
                      endIcon: <CheckIcon size="4" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setHaveParking(itemValue)}
                  >
                    <Select.Item label="Yes" value="yes" />
                    <Select.Item label="No" value="no" />
                  </Select>
                </Box>
                <Box>
                  <FormControl.Label>
                    What is your parking spot number?
                  </FormControl.Label>
                  <Input variant="underlined" placeholder="E.g. P2-12" />
                </Box>
                <Box>
                  <FormControl.Label>Do you have a car?</FormControl.Label>
                  <Select
                    selectedValue={haveCar}
                    minWidth="200"
                    accessibilityLabel="Choose your answer"
                    placeholder="Choose your answer"
                    _selectedItem={{
                      bg: "lightgray",
                      endIcon: <CheckIcon size="4" />,
                    }}
                    mt={1}
                    onValueChange={(itemValue) => setHaveCar(itemValue)}
                  >
                    <Select.Item label="Yes" value="yes" />
                    <Select.Item label="No" value="no" />
                  </Select>
                </Box>
                <Box>
                  <FormControl.Label>
                    What is your License Plate number?
                  </FormControl.Label>
                  <Input variant="underlined" placeholder="E.g. AA123A" />
                </Box>
              </VStack>
            </FormControl>
            <Box alignItems="center" w="100%" safeArea>
              <OrangeSolidButton
                width="80%"
                buttonText="REGISTER"
                onPress={handleRegister}
              >
                Register
              </OrangeSolidButton>
            </Box>
          </Flex>
        </Box>
      </ScrollView>
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

export default SignupFormScreen;

// dependency found on https://openbase.com/js/react-native-google-places-autocomplete
