import React, { useState } from "react";
import { Button } from "react-native";
import { Box, Text, View, Input, HStack } from "native-base";
import { Svg, Path } from "react-native-svg";
import DateTimePicker from "@react-native-community/datetimepicker";

const FindParkingScreen = () => {
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
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
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  return (
    <Box>
      <Text>Select the period for parking</Text>

      <HStack>
        <Svg
          width="27"
          height="28"
          viewBox="0 0 27 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M13.1321 2.26074L1.6968 0.658747L6.0271 11.363L13.1321 2.26074ZM24.1321 14.2607C24.1321 20.3359 19.2073 25.2607 13.1321 25.2607V27.2607C20.3118 27.2607 26.1321 21.4404 26.1321 14.2607H24.1321ZM13.1321 25.2607C7.05701 25.2607 2.13214 20.3359 2.13214 14.2607H0.132141C0.132141 21.4404 5.95244 27.2607 13.1321 27.2607V25.2607ZM2.13214 14.2607C2.13214 11.1575 3.4159 8.35574 5.48398 6.35468L4.09325 4.91737C1.65187 7.27963 0.132141 10.5936 0.132141 14.2607H2.13214Z"
            fill="#FD6B36"
          />
        </Svg>
        <Text>Start</Text>
      </HStack>
      <View>
        <View>
          <Button onPress={showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={showTimepicker} title="Show time picker!" />
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
      <HStack>
        <Svg
          width="26"
          height="27"
          viewBox="0 0 26 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M13.0353 24.9999L24.4753 26.5682L20.1135 15.8768L13.0353 24.9999ZM2.00006 13.0324C1.98217 6.95725 6.89252 2.01791 12.9676 2.00002L12.9617 3.15271e-05C5.78207 0.0211657 -0.0210702 5.85857 6.39595e-05 13.0382L2.00006 13.0324ZM12.9676 2.00002C19.0427 1.98214 23.9821 6.89249 24 12.9676L26 12.9617C25.9788 5.78204 20.1414 -0.0211026 12.9617 3.15271e-05L12.9676 2.00002ZM24 12.9676C24.0091 16.0709 22.7336 18.8763 20.6714 20.8835L22.0664 22.3167C24.5008 19.9473 26.0107 16.6289 26 12.9617L24 12.9676Z"
            fill="#FD6B36"
          />
        </Svg>
        <Text>End</Text>
      </HStack>
    </Box>
  );
};

export default FindParkingScreen;
