import {
  Box,
  FormControl,
  Input,
  Text,
  Heading,
  VStack,
  Select,
  CheckIcon,
  Button,
  Flex,
} from "native-base";
import { useContext, useState } from "react";
import { HasBuildingContext } from "../../contexts/HasBuildingContext";
import OrangeSolidButton from "../../UI/SolidOrangeButton";

const SignupFormScreen = ({ navigation, route }) => {
  const { hasBuilding, setHasBuilding } = useContext(HasBuildingContext);
  const { parkingLot } = route.params;
  const [haveParking, setHaveParking] = useState();
  const [haveCar, setHaveCar] = useState();

  const handleRegister = () => {
    setHasBuilding("yes");
  };

  return (
    <Box p="25" mb="2" flex="1" bgColor="white">
      <Flex flex="1" justifyContent="space-between">
        <Box mt="30">
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
              <FormControl.Label>Do you have a parking spot?</FormControl.Label>
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
            width="330"
            buttonText="REGISTER"
            onPress={handleRegister}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default SignupFormScreen;
