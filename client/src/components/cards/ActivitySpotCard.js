import {
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Pressable,
  Text,
  VStack,
} from "native-base";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";

const ActivitySpotCard = ({
  item,
  currentDate,
  type,
  navigation,
  startDate,
  endDate,
}) => {
  // Object structure sample:
  // {
  //   "idbooking": 92,
  //   "rsvparkingslotid": "P2-09",
  //   "rsvvisitorid": "eugenetollefson@testing.com",
  //   "paOwnerId": "john.doe.parkr@gmail.com",
  //   "rsrv_start": "2022-04-03T19:00:00.000Z",
  //   "rsrv_end": "2022-04-03T21:00:00.000Z",
  //   "rsvstatus": 1,
  //   "paVehicleType": 1,
  //   "rsvfee": "3.05",
  //   "rsvcarplateno": "VLS432",
  //   "rsvcarmodel": "Nissan"
  // }

  // type 1 -standard -> handicap \\ntype 2 - large\\ntype 3 - electric car\\ntype 4 - motorcycle

  // date time readable format:

  const rsrv_start = new Date(item.rsrv_start);
  const rsrv_start_date = rsrv_start.toString().slice(0, 10);
  const rsrv_start_time = rsrv_start.toString().slice(16, 21);
  const rsrv_end = new Date(item.rsrv_end);
  const rsrv_end_date = rsrv_end.toString().slice(0, 10);
  const rsrv_end_time = rsrv_end.toString().slice(16, 21);

  const whoParksDirectHandler = () => {
    navigation.navigate("ParkingStack", {
      screen: "WhoParksScreen",
      params: {
        item: item,
        currentDate: currentDate,
        type: type,
        startDate: startDate,
        endDate: endDate,
        cancelButton: true,
      },
    });
  };

  const detailsHandler = () => {
    navigation.navigate("MyActivityStack", {
      screen: "DetailsScreen",
      params: { item: item, currentDate: currentDate, type: type },
    });
  };

  const hostDetailsHandler = () => {
    // console.log("type:", type);
    navigation.navigate("HostStack", {
      screen: "HostDetailsScreen",
      params: { item: item, currentDate: currentDate, type: type },
    });
  };

  const hostEditHandler = () => {
    // console.log("type:", type);
    navigation.navigate("HostStack", {
      screen: "HostEditScreen",
      params: { item: item, currentDate: currentDate, type: type },
    });
  };

  const whoParksHandler = () => {
    // console.log("type:", type);
    navigation.navigate("ParkingStack", {
      screen: "WhoParksScreen",
      params: {
        item: item,
        currentDate: currentDate,
        type: type,
        startDate: startDate,
        endDate: endDate,
      },
    });
  };

  return (
    <>
      <Pressable
        onPress={() => {
          switch (type) {
            case "today":
            case "thisWeek":
            case "thisMonth":
              whoParksDirectHandler();
              break;
            case "inUse":
            case "upcoming":
            case "expired":
              detailsHandler();
              break;
            case "hostReservation":
            case "hostArchive":
              hostDetailsHandler();
              break;
            case "hostSpot":
              hostEditHandler();
              break;
            case "searchResult":
              whoParksHandler();
              break;
            default:
              return;
          }
        }}
      >
        {({ isPressed }) => {
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
                style={{
                  transform: [
                    {
                      scale: isPressed ? 0.98 : 1,
                    },
                  ],
                }}
              >
                <VStack space="4">
                  <HStack space="4">
                    {type !== "hostSpot" ? (
                      <VStack space="1">
                        <HStack alignItems="center" space="2">
                          <HStack alignItems="center" space="2" w="307">
                            <Box>
                              <Text fontWeight="medium" fontSize="xl">
                                Spot {item.rsvparkingslotid}
                              </Text>
                            </Box>
                            <HStack justifyContent="space-between">
                              <Box>
                                {item.paVehicleType == "1" && (
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
                            </HStack>
                          </HStack>

                          <Box>
                            <Button
                              background="transparent"
                              startIcon={
                                <Icon
                                  color="black"
                                  size={5}
                                  ml={2}
                                  as={MaterialIcons}
                                  name="navigate-next"
                                />
                              }
                            />
                          </Box>
                        </HStack>
                      </VStack>
                    ) : (
                      <HStack
                        pt="3"
                        pb="3"
                        space="1"
                        w="100%"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Text fontWeight="medium" fontSize="xl">
                            Spot {item.idParkingSlot}
                          </Text>
                        </Box>
                        {item.availability ? (
                          <Text fontSize="13" color="#0CB183">
                            Available
                          </Text>
                        ) : (
                          <Text fontSize="13" color="#C33905">
                            Not Available
                          </Text>
                        )}
                      </HStack>
                    )}
                  </HStack>
                  {type !== "hostSpot" && (
                    <HStack space="4" justifyContent="space-between">
                      <Box>
                        <VStack>
                          <Text>
                            <Text fontWeight="medium">Start:</Text>{" "}
                            {rsrv_start_date}, {rsrv_start_time}
                          </Text>
                          <Text>
                            <Text fontWeight="medium">End:</Text>{" "}
                            {rsrv_end_date}, {rsrv_end_time}
                          </Text>
                        </VStack>
                      </Box>
                      <Box alignSelf="flex-end">
                        <Text>CAD ${item.rsvfee}</Text>
                      </Box>
                    </HStack>
                  )}
                </VStack>
              </Box>
            </>
          );
        }}
      </Pressable>
    </>
  );
};

export default ActivitySpotCard;
