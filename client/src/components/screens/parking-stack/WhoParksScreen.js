import React from "react";
import { Box, Radio, Center, Text, VStack, Button } from "native-base";

const WhoParksScreen = ({ navigation }) => {
  return (
    <>
      <Box flex="1" justifyContent="space-between" alignItems="center">
        <Box flex="1" mt={20} justifyContent="flex-start" alignItems="center">
            <Text fontWeight="bold" fontSize="2xl" mb="10">
              Please select who is parking
            </Text>

            <Radio.Group
              defaultValue="1"
              name="userGroup"
              accessibilityLabel="who is parking"
            >
              <Radio colorScheme="emerald" value="1" my={1}>
                Me
              </Radio>

              <Radio colorScheme="emerald" value="2" my={1}>
                My Visitor
              </Radio>
            </Radio.Group>

        </Box>
        <Button mb={10} borderRadius="20px" backgroundColor="#FD6B36" width="80%" onPress={()=> navigation.navigate("")}>NEXT</Button>
      </Box>
    </>
  );
};

export default WhoParksScreen;
