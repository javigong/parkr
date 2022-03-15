import { Box, Text } from "native-base";

const FoundParkingScreen = ({ navigation, route }) => {
  const { startDate, endDate } = route.params;

  return (
    <Box>
      <Text>Results</Text>
      <Text>
        {startDate} - {endDate}
      </Text>
    </Box>
  );
};

export default FoundParkingScreen;
