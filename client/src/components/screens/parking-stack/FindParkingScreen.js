import React, { useState } from "react";
import { LogBox, Pressable } from "react-native";
import { Box, Text, View, Button, Flex } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import StartTimeSvg from "../../UI/StartTimeSvg";
import EndTimeSvg from "../../UI/EndTimeSvg";
import ParkingTypeButton from "../../UI/ParkingTypeButton";
import OutlineButton from "../../UI/OutlineButton";
import SolidOrangeButton from "../../UI/SolidOrangeButton";

LogBox.ignoreLogs([
  "NativeBase: The contrast ratio of 2.863815068413143:1 for white on",
]); // Ignore log notification by message

const FindParkingScreen = ({ route, navigation: { goBack } }) => {
  const { item, currentDate, type } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [mode, setMode] = useState("datetime");
  const [show, setShow] = useState(false);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setStartDate(currentDate);
  };
  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("datetime");
  };

  const parkingTypesArray = [
    "All",
    "Standard",
    "EV Charger",
    "Large",
    "Motorcycle",
    "Small Car",
  ];

  const saveDateTimeHandler = () => {
    // console.log("Save Clicked");
    navigation.navigate("FoundParkingScreen", { startDate, endDate });
  };

  const cancelFindParking = () => {
    navigation.popToTop();
    navigation.navigate("AppStack", {
      screen: "HomeTab",
      params: {
        screen: "ParkingScreen",
      },
    });
  };

  return (
    <Flex justifyContent="space-between">
      <Box>
        <Text>Select the period for parking</Text>
        <Flex
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          m="3"
        >
          <StartTimeSvg />
          <Text width="20%">Start</Text>
          <View width="60%">
            <DateTimePicker
              testID="dateTimePicker"
              value={startDate}
              mode={mode}
              is24Hour={true}
              display="compact"
              onChange={onStartDateChange}
            />
          </View>
        </Flex>
        <Flex
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          m="3"
        >
          <EndTimeSvg />
          <Text width="20%">End</Text>
          <View width="60%">
            <DateTimePicker
              testID="dateTimePicker"
              value={endDate}
              mode={mode}
              is24Hour={true}
              display="compact"
              onChange={onEndDateChange}
            />
          </View>
        </Flex>
        <Text>Select the parking type</Text>
        <Flex flexDirection="row" flexWrap="wrap">
          {parkingTypesArray.map((each) => {
            return (
              <ParkingTypeButton key={each} buttonText={each}>
                {each}
              </ParkingTypeButton>
            );
          })}
        </Flex>
      </Box>
      <Flex flexDirection="row" justifyContent="space-around">
        <OutlineButton
          style={{ flex: 1 }}
          buttonText="CANCEL"
          onPress={cancelFindParking}
        />
        <SolidOrangeButton buttonText="SAVE" onPress={saveDateTimeHandler} />
      </Flex>
    </Flex>
  );
};

export default FindParkingScreen;
