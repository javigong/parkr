import React from "react";
import { Box, Button, Text, VStack, HStack, Icon } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ParkingSpotDetailsCard = ({ item, currentDate, type, navigation }) => {
  console.log(type);
  return (
    <SafeAreaView flex="1" alignItems="center" backgroundColor="white">
      <Box flex="1" width="80%" justifyContent="space-between" mt={6}>
        <Box flex="1" justifyContent="flex-start">
          <Text fontWeight="bold" fontSize="2xl" mb={5}>
            Spot {item.idParkingSlot}
          </Text>
          <VStack space={4}>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <Text fontSize={16} fontWeight="bold">
                Reservation Period
              </Text>
              <HStack>
                <Text fontWeight="bold">Start</Text>
                <Text color="grey">
                  {" "}
                  {currentDate}, {item.rsrv_start.slice(0, 5)}
                </Text>
              </HStack>
              <HStack mb={3}>
                <Text fontWeight="bold">End</Text>
                <Text color="grey">{"   "}
                  {currentDate}, {item.rsrv_end.slice(0, 5)}</Text>
              </HStack>
            </Box>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <VStack space={2} mb={3}>
                <Text fontSize={16} fontWeight="bold">
                  Who's Parking
                </Text>
                <Text>{}</Text>
              </VStack>
            </Box>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <VStack space={2} mb={3}>
                <Text fontSize={16} fontWeight="bold">
                  Payment
                </Text>
                <HStack justifyContent="space-between">
                  <Text>CAD $1.50 total</Text>
                  <Text>Free</Text>
                </HStack>
              </VStack>
            </Box>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <VStack space={2} mb={3}>
                <Text fontSize={16} fontWeight="bold">
                  Spot Features
                </Text>
                <Text>EV Charger</Text>
              </VStack>
            </Box>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <VStack space={2}>
                <Text fontSize={16} fontWeight="bold">
                  Spot Owner
                </Text>
                <HStack space={4} mb={4}>
                  <Box py={2} px={3} borderRadius="20px" bg="#FD6B36">
                    <Text color="white">JS</Text>
                  </Box>
                  <VStack>
                    <Text fontSize={14}>John Smith</Text>
                    <Text color="grey" fontSize={13}>
                      Registered Jan 1, 2022
                    </Text>
                  </VStack>
                </HStack>
              </VStack>
            </Box>
            <HStack justifyContent="space-between" alignItems="center">
              <Box>
                <Text fontSize={16} fontWeight="bold">
                  Reservation For
                </Text>
                <HStack>
                  <Text>Me, </Text>
                  <Text> Benz, LMO2356</Text>
                </HStack>
              </Box>
              <Box>
                <Button
                  borderRadius="20px"
                  pl="1px"
                  startIcon={
                    <Icon
                      color="white"
                      size={7}
                      ml={2}
                      mr={-1}
                      as={Ionicons}
                      name="chatbubble"
                    />
                  }
                >
                  CHAT
                </Button>
              </Box>
            </HStack>
          </VStack>
        </Box>
        <Button borderRadius="20px" backgroundColor="#FD6B36" mb={7}>
          {(type = "inUse")
            ? "LEAVE SPOT"
            : (type = "upcoming")
            ? "CANCEL RESERVATION"
            : (type = "expired")
            ? "DELETE"
            : ""}
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default ParkingSpotDetailsCard;
