import React from "react";
import { Box, Radio, Center, Text, VStack, Button } from "native-base";

const WhoParksScreen = ({ navigation }) => {
  return (
    <>
      <Box flex="1" mt="16">
      <Center>
        <VStack marginBottom="450">
          <Center>
            <Text fontWeight="bold" fontSize="20px" mb="10">
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
          </Center>
        </VStack>
        <Button borderRadius="20px" backgroundColor="#FD6B36" width="80%" onPress={()=> navigation.navigate("")}>NEXT</Button>
        </Center>
      </Box>
    </>
  );
};

export default WhoParksScreen;
