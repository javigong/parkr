import React from "react";
import { Box, Button, Text, VStack, HStack, Icon } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { updateCurrentUser } from "firebase/auth";

const ParkingSpotDetailsCard = ({ item, currentDate, type, navigation }) => {
  const ChatHandler = () => {
    navigation.navigate("ChatStack", {
      screen: "LiveChatScreen",
      params: { item: item, currentDate: currentDate, type: type },
    });
  };

  // date time readable format:
  const rsrv_start_date = new Date(item.rsrv_start.slice(0, 10))
    .toString()
    .slice(0, 10);
  const rsrv_start_time = item.rsrv_start.slice(11, 16);
  const rsrv_end_date = new Date(item.rsrv_end.slice(0, 10))
    .toString()
    .slice(0, 10);
  const rsrv_end_time = item.rsrv_end.slice(11, 16);

  return (
    <SafeAreaView flex="1" alignItems="center" backgroundColor="white">
      <Box flex="1" width="80%" justifyContent="space-between" mt={6}>
        <Box flex="1" justifyContent="flex-start">
          <Text fontWeight="bold" fontSize="2xl" mb={5}>
            {type === "hostReservation" || type === "hostArchive"
              ? `Spot ${item.rsvparkingslotid}`
              : `Spot ${item.idParkingSlot}`}
          </Text>
          <VStack space={4}>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <Text fontSize={16} fontWeight="bold">
                Reservation Period
              </Text>
              <HStack>
                <Text fontWeight="bold">Start</Text>
                <Text color="grey">
                  {type === "hostReservation" || type === "hostArchive"
                    ? ` ${rsrv_start_date}, ${rsrv_start_time}`
                    : ` ${currentDate}, ${item.rsrv_start.slice(0, 5)}`}
                </Text>
              </HStack>
              <HStack mb={3}>
                <Text fontWeight="bold">End</Text>
                <Text color="grey">
                  {type === "hostReservation" || type === "hostArchive"
                    ? ` ${rsrv_end_date}, ${rsrv_end_time}`
                    : ` ${currentDate}, ${item.rsrv_end.slice(0, 5)}`}
                </Text>
              </HStack>
            </Box>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <VStack space={2} mb={3}>
                <Text fontSize={16} fontWeight="bold">
                  Who's Parking
                </Text>
                <Text>
                  {type === "hostReservation" || type === "hostArchive"
                    ? ` ${item.rsvvisitorid}`
                    : item.paVisitorId
                    ? `${item.upFirstName} ${item.upLastName}`
                    : "Visitor"}
                </Text>
              </VStack>
            </Box>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <VStack space={2} mb={3}>
                <Text fontSize={16} fontWeight="bold">
                  Fee
                </Text>
                <HStack justifyContent="space-between">
                  <Text>
                    {type === "hostReservation" || type === "hostArchive"
                      ? `CAD $${item.rsvfee} x hour`
                      : item.paFee
                      ? `CAD $${item.paFee} x hour`
                      : `Free`}
                  </Text>
                </HStack>
              </VStack>
            </Box>
            <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
              <VStack space={2} mb={3}>
                <Text fontSize={16} fontWeight="bold">
                  Spot Features
                </Text>
                <Text>
                  {item.paVehicleType === "1"
                    ? "Handicap"
                    : type === "2"
                    ? "Large"
                    : type === "3"
                    ? "Elecric car"
                    : "Motorcycle"}
                </Text>
              </VStack>
            </Box>

            <HStack justifyContent="space-between" alignItems="center">
              {type === "hostReservation" || type === "hostArchive" ? (
                <Text></Text>
              ) : (
                <Box>
                  <VStack space={2}>
                    <Text fontSize={16} fontWeight="bold">
                      Spot Owner
                    </Text>
                    <HStack space={4} mb={4}>
                      <Box py={2} px={3} borderRadius="20px" bg="#FD6B36">
                        <Text color="white">
                          {item.upFirstName &&
                            item.upFirstName.charAt(0).toUpperCase()}
                          {item.upLastName &&
                            item.upLastName.charAt(0).toUpperCase()}
                        </Text>
                      </Box>
                      <VStack>
                        <Text fontSize={14}>
                          {item.upFirstName && item.upFirstName}{" "}
                          {item.upLastName && item.upLastName}
                        </Text>
                        <Text color="grey" fontSize={13}>
                          Registered Jan 1, 2022
                        </Text>
                      </VStack>
                    </HStack>
                  </VStack>
                </Box>
              )}
              <Box>
                <Button
                  onPress={() => ChatHandler()}
                  backgroundColor="#0CB183"
                  borderRadius="20px"
                  mt="16px"
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
        {type !== "hostReservation" && type !== "hostArchive" && (
          <Button borderRadius="20px" backgroundColor="#FD6B36" mb={4}>
            {type === "inUse"
              ? "LEAVE SPOT"
              : type === "upcoming"
              ? "CANCEL RESERVATION"
              : type === "expired"
              ? "DELETE"
              : type === "hostSpot"
              ? "SAVE"
              : ""}
          </Button>
        )}
        {type === "hostSpot" && (
          <Button
            borderRadius="20px"
            borderWidth="1px"
            borderColor="#FD6B36"
            backgroundColor="white"
            mb={7}
          >
            <Text>DELETE SPOT</Text>
          </Button>
        )}
      </Box>
    </SafeAreaView>
  );
};

export default ParkingSpotDetailsCard;
