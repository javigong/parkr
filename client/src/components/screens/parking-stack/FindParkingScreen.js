import React, { useState } from "react";
import { Box, Text, View, Button, Flex, HStack } from "native-base";

import DateTimePicker from "@react-native-community/datetimepicker";
import StartTimeSvg from "../../UI/StartTimeSvg";
import EndTimeSvg from "../../UI/EndTimeSvg";
import ParkingTypeButton from "../../UI/ParkingTypeButton";

const FindParkingScreen = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("datetime");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
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

  return (
    <Box>
      <Text>Select the period for parking</Text>

      <StartTimeSvg />

      <Text>Start</Text>
      <View w="100%">
        <Button onPress={showDatepicker} title="Start Date" />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="compact"
            onChange={onChange}
          />
        )}
      </View>

      <EndTimeSvg />

      <Text>End</Text>
      <View>
        <Button onPress={showDatepicker} title="End Date" />

        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="spinner"
            onChange={onChange}
          />
        )}
      </View>

      <Text>Select the parking type</Text>
      <Flex flexDirection="row" flexWrap="wrap">
        {parkingTypesArray.map((each) => {
          return (
            <ParkingTypeButton buttonText={each}>{each}</ParkingTypeButton>
          );
        })}
      </Flex>
    </Box>
  );
};

export default FindParkingScreen;
