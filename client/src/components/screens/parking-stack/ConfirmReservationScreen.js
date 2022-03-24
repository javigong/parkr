import React from "react";
import { Box, Button, Text, VStack, HStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";

const ConfirmReservationScreen = ({ route, navigation }) => {
  const { userType, carType, plateNum, item } = route.params;

  const parkingType = () => {
    switch (item.paVehicleType) {
      case 1:
        return <Text>Standard</Text>;
        break;
      case 2:
        return <Text>Large</Text>;
        break;
      case 3:
        return <Text>EV Charger</Text>;
        break;
      case 4:
        return <Text>Motorcycle</Text>;
        break;
      default:
        return <Text>Standard</Text>;
    }
  };

  return (
    <Box flex="1" bg="white">
      <SafeAreaView flex="1" alignItems="center">
        <Box flex="1" width="80%" justifyContent="space-between">
          <Box flex="1" justifyContent="flex-start">
            <Text fontWeight="bold" fontSize="2xl" mb={5}>
              {item.idParkingSlot}
            </Text>
            <VStack space={4}>
              <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
                <Text fontSize={16} fontWeight="bold">
                  Reservation Period
                </Text>
                <HStack>
                  <Text fontWeight="bold">Start</Text>
                  <Text color="grey"> Feb 1, 10:00</Text>
                </HStack>
                <HStack mb={3}>
                  <Text fontWeight="bold">End</Text>
                  <Text color="grey"> Feb 1, 20:00</Text>
                </HStack>
              </Box>
              <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
                <VStack space={2} mb={3}>
                  <Text fontSize={16} fontWeight="bold">
                    Who's Parking
                  </Text>
                  <Text>{userType}</Text>
                </VStack>
              </Box>
              <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
                <VStack space={2} mb={3}>
                  <Text fontSize={16} fontWeight="bold">
                    Payment
                  </Text>
                  <HStack justifyContent="space-between">
                    {item != null ? (
                      <Text>CAD ${item.paFee} total</Text>
                    ) : (
                      <Text>Free</Text>
                    )}
                  </HStack>
                </VStack>
              </Box>
              <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
                <VStack space={2} mb={3}>
                  <Text fontSize={16} fontWeight="bold">
                    Spot Features
                  </Text>
                  {parkingType()}
                </VStack>
              </Box>
              <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
                <VStack space={2}>
                  <Text fontSize={16} fontWeight="bold">
                    Spot Owner
                  </Text>
                  <HStack space={4} mb={4}>
                    <Box py={2} px={3} borderRadius="20px" bg="#FD6B36">
                      <Text color="white">
                        {item != null ? (
                          <>
                            {item.upFirstName.charAt(0).toUpperCase()}
                            {item.upLastName.charAt(0).toUpperCase()}
                          </>
                        ) : (
                          {}
                        )}
                      </Text>
                    </Box>
                    <VStack>
                      <Text fontSize={14}>
                        {item != null ? (
                          <>
                            {item.upFirstName} {item.upLastName}
                          </>
                        ) : (
                          {}
                        )}
                      </Text>
                      <Text color="grey" fontSize={13}>
                        Registered Jan 1, 2022
                      </Text>
                    </VStack>
                  </HStack>
                </VStack>
              </Box>
              <Box>
                <Text fontSize={16} fontWeight="bold">
                  Reservation For
                </Text>
                <HStack>
                  <Text>{userType}, </Text>
                  <Text>
                    {" "}
                    {carType}, {plateNum}
                  </Text>
                </HStack>
              </Box>
            </VStack>
          </Box>
          <Button
            borderRadius="20px"
            backgroundColor="#FD6B36"
            mb={1}
            onPress={() => {
              // make POST request here
              navigation.navigate("ParkingStack", {
                screen: "ReservationDoneScreen",
              });
            }}
          >
            RESERVE
          </Button>
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default ConfirmReservationScreen;
