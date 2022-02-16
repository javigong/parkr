import { Box, Input, Button } from "native-base";
import { Autocomplete, Button } from "react-native";

const ParkingLocationInput = () => {
  return (
    <Box alignItems="center">
      <Input mx="3" placeholder="Input" w="75%" maxWidth="300px" />
      <Autocomplete />

      <Button />
    </Box>
  );
};

export default ParkingLocationInput;
