import React, { useContext } from "react";
import { Box, Button, Text, VStack, HStack } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { postReservation } from "../../services/api";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";

const ConfirmReservationScreen = ({ route, navigation }) => {
  const { user, setUser } = useContext(AuthenticatedUserContext);
  const { userType, carType, plateNum, item, currentDate, startDate, endDate } =
    route.params;

  const parkingType = () => {
    switch (item.paVehicleType) {
      case 1:
        return <Text>Handicap</Text>;
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

  let ISOStartDate = "";
  let ISOEndDate = "";

  if (startDate == undefined && endDate == undefined) {
    const onlyDate = new Date().toISOString().split("T")[0];
    const rsrvStart = item.rsrv_start.split(" ")[1];
    const rsrvEnd = item.rsrv_end.split(" ")[1];
    ISOStartDate = onlyDate + " " + rsrvStart;
    ISOEndDate = onlyDate + " " + rsrvEnd;
  } else {
    const UTCStartDate = new Date(startDate);
    const UTCEndDate = new Date(endDate);
    const StartTime = startDate.split(" ")[4];
    const EndTime = endDate.split(" ")[4];
    ISOStartDate = UTCStartDate.toISOString().split("T")[0] + " " + StartTime;
    ISOEndDate = UTCEndDate.toISOString().split("T")[0] + " " + EndTime;
  }

  const ReservationDoneHandler = () => {
    const tokenJwt = user.accessToken;

    postReservation(
      item.idParkingSlot,
      user.providerData[0].email,
      ISOStartDate,
      ISOEndDate,
      item.paFee,
      item.paStatus,
      item.paVehicleType,
      plateNum,
      carType,
      tokenJwt
    )
      .then(console.log("reservation complete!"))
      .catch((error) => console.log("error", error));

    navigation.navigate("ParkingStack", {
      screen: "ReservationDoneScreen",
      params: {
        item: item,
      },
    });
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
                  <Text color="grey">
                    {startDate ? (
                      <>
                        {" "}
                        {startDate.slice(0, 10)}, {startDate.slice(16, 21)}
                      </>
                    ) : (
                      <Text> {ISOStartDate}</Text>
                    )}
                  </Text>
                </HStack>
                <HStack mb={3}>
                  <Text fontWeight="bold">End</Text>
                  <Text color="grey">
                    {endDate ? (
                      <>
                        {" "}
                        {endDate.slice(0, 10)}, {endDate.slice(16, 21)}
                      </>
                    ) : (
                      <Text> {ISOEndDate}</Text>
                    )}
                  </Text>
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
            onPress={() => ReservationDoneHandler()}
          >
            RESERVE
          </Button>
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default ConfirmReservationScreen;
