import { Badge, Box, Center, Divider, HStack, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ParkingSpotCard = ({
  ownerInitials = "FH",
  spotNumber = "10",
  type = "standard",
  startDate = "Feb 20",
  startTime = "06:00",
  endDate = "Feb 21",
  endTime = "17:00",
  price = "0.00",
}) => {
  return (
    <SafeAreaView>
      <Box
        m="4"
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
                  {ownerInitials}
                </Text>
              </Center>
            </Box>
            <VStack space="1">
              <Box>
                <Text fontSize="xl">Spot {spotNumber}</Text>
              </Box>
              <Box>
                {type == "ev" && (
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
                {type == "motorcycle" && (
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
                {type == "standard" && (
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
                {startDate}, {startTime} - {endDate}, {endTime}
              </Text>
            </Box>
            <Box>
              <Text>CAD ${price}</Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </SafeAreaView>
  );
};

export default ParkingSpotCard;
