import { Box, Center, Divider, HStack, Text, VStack } from "native-base";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ParkingSpotCard = ({ item, currentDate }) => {
  // type 1 -standard\\ntype 2 - large\\ntype 3 - electric car\\ntype 4 - motorcycle

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
        borderRadius="20px"
        backgroundColor="white"
        shadow={4}
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
                  {item.upFirstName.charAt(0).toUpperCase()}
                  {item.upLastName.charAt(0).toUpperCase()}
                </Text>
              </Center>
            </Box>
            <VStack space="1">
              <Box>
                <Text fontSize="xl">Spot {item.idParkingSlot}</Text>
              </Box>
              <Box>
                {item.paVehicleType == "1" && (
                  <Box
                    width="75"
                    px="2"
                    borderWidth="1"
                    borderColor="#0CB183"
                    rounded="full"
                  >
                    <Text fontSize="13" color="#0CB183">
                      Standard
                    </Text>
                  </Box>
                )}
                {item.paVehicleType == "2" && (
                  <Box
                    width="55"
                    px="2"
                    borderWidth="1"
                    borderColor="#FD6B36"
                    rounded="full"
                  >
                    <Text fontSize="13" color="#FD6B36">
                      Large
                    </Text>
                  </Box>
                )}
                {item.paVehicleType == "3" && (
                  <Box
                    width="90"
                    px="2"
                    borderWidth="1"
                    borderColor="#09A1C6"
                    rounded="full"
                  >
                    <Text fontSize="13" color="#09A1C6">
                      EV Charger
                    </Text>
                  </Box>
                )}
                {item.paVehicleType == "4" && (
                  <Box
                    width="87"
                    px="2"
                    borderWidth="1"
                    borderColor="#DB7D16"
                    rounded="full"
                  >
                    <Text fontSize="13" color="#DB7D16">
                      Motorcycle
                    </Text>
                  </Box>
                )}
              </Box>
            </VStack>
          </HStack>
          <HStack space="4" justifyContent="space-between">
            <Box>
              <Text>
                {currentDate}, {item.rsrv_start.slice(0, 5)} -{" "}
                {item.rsrv_end.slice(0, 5)}
              </Text>
            </Box>
            <Box>
              <Text>CAD ${item.paFee}</Text>
            </Box>
          </HStack>
        </VStack>
      </Box>
    </>
  );
};

export default ParkingSpotCard;
