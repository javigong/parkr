import React from "react";
import { Box, Text, Input, HStack } from "native-base";
import { Svg, Path } from "react-native-svg";

const FindParkingScreen = () => {
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
        <Input variant="underlined"></Input>
      </HStack>
    </Box>
  );
};

export default FindParkingScreen;
