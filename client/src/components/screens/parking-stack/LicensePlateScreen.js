import React from "react";
import { Box, Text, VStack, HStack, Checkbox, FormControl, Input, WarningOutlineIcon } from "native-base";

const LicensePlateScreen = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text fontWeight="bold" fontSize="3xl">Car Information</Text>
      <FormControl padding={5} isRequired>
        <VStack mx="4" space="2">
          <FormControl.Label>Car Model</FormControl.Label>
          <Input type="text" placeholder="i.e. Mazda MX-5" />
          <FormControl.HelperText>
            Please supply brand and model</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 3 characters are required.
          </FormControl.ErrorMessage>  

          <FormControl.Label>License Plate</FormControl.Label>
          <Input type="text" placeholder="i.e. 291 VSA" />
          <FormControl.HelperText>
            Please provide license plate number</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>  
        </VStack>
        <HStack justifyContent="center">
          <Checkbox size="xs" shadow={2} value="test" defaultIsChecked>
          Check if there are no damages to report.
          </Checkbox>
        </HStack>
      </FormControl>
    </Box>
  );
};

export default LicensePlateScreen;