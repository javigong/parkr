import { Box, Center, Divider, HStack, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ParkingSpotCard = ({ item }) => {

  return (
    <>
      <Box
        mx="4"
        my="1"
        px="4"
        py="2"
        borderWidth="1"
        rounded="2xl"
        borderColor="coolGray.300"
        borderRadius="md"
      >
        <VStack space="4">
          <HStack space="4">
            <Box
              width="39"
              height="39"
              rounded="full"
              backgroundColor="#FD6B36"
            >
              <Center h="39">
                <Text color="white" fontSize="xl">
                  {item.firstName.charAt(0).toUpperCase()}{item.lastName.charAt(0).toUpperCase()}
                </Text>
              </Center>
            </Box>
            <VStack space="1">
              <Box>
                <Text fontSize="xl">Spot {item.spotNumber}</Text>
              </Box>
              <Box>
                {item.type == "ev" && (
                  <Box
                    px="2"
                    borderWidth="1"
                    borderColor="#FD6B36"
                    rounded="full"
                  >
                    <Text fontSize="13" color="#FD6B36">
                      EV Charger
                    </Text>
                  </Box>
                )}
                {item.type == "motorcycle" && (
                  <Box
                    px="2"
                    borderWidth="1"
                    borderColor="#0CB183"
                    rounded="full"
                  >
                    <Text fontSize="13" color="#0CB183">
                      Motorcycle
                    </Text>
                  </Box>
                )}
                {item.type == "standard" && (
                  <Box
                    px="2"
                    borderWidth="1"
                    borderColor="#09A1C6"
                    rounded="full"
                  >
                    <Text fontSize="13" color="#09A1C6">
                      Standard
                    </Text>
                  </Box>
                )}
              </Box>
            </VStack>
          </HStack>
          <HStack space="4" justifyContent="space-between">
            <Box>
              <Text>
                {item.startDate}, {item.startTime} {item.endDate && `- ${item.endDate}, ${item.endTime}`}
              </Text>
            </Box>
            <Box>
              <Text>CAD ${item.price}</Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default ParkingSpotCard;
