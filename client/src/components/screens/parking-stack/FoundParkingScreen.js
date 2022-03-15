import { Box, Text } from "native-base";
import { format } from "date-fns";

const FoundParkingScreen = ({ navigation, route }) => {
  const { startDate, endDate } = route.params;

  return (
    <Box>
      <Text>Results</Text>
      <Text>
        {format(startDate, "EEE,d,MMM, hh:mm b ")} -{" "}
        {format(endDate, "EEE,d,MMM, hh:mm b ")}
      </Text>
    </Box>
  );
};

export default FoundParkingScreen;
