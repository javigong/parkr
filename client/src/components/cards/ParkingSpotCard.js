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

const ParkingSpotCard = ({
  item,
  currentDate,
  type,
  navigation,
  startDate,
  endDate,
}) => {
  // Object structure sample:
  //   {
  //     "idParkingSlot": "P1-13",
  //     "buildingId": 1001,
  //     "paUnitNo": "504",
  //     "paOwnerId": "sandracoleman@testing.com",
  //     "upFirstName": "Sandra",
  //     "upLastName": "Coleman",
  //     "paVehicleType": 2,
  //     "paStatus": 1,
  //     "paFee": "2.80",
  //     "rsrv_start": "2022-04-07 06:30:00",
  //     "rsrv_end": "2022-04-07 18:00:00",
  //     "availability": 1
  // }

  // type 1 -standard -> handicap \\ntype 2 - large\\ntype 3 - electric car\\ntype 4 - motorcycle

  // Set StartDate as Current Offset is	UTC/GMT -7 hours
  const rsrv_start_date_noLocale =new Date(item.rsrv_start.slice(0, 10));
  rsrv_start_date_noLocale.setHours(rsrv_start_date_noLocale.getHours() + 7 );
  
  const rsrv_start_date = rsrv_start_date_noLocale
    .toString()
    .slice(0, 10);
  const rsrv_start_time = item.rsrv_start.slice(11, 16);

  const rsrv_end_date = new Date(item.rsrv_end.slice(0, 10))
    .toString()
    .slice(0, 10);

  const rsrv_end_time = item.rsrv_end.slice(11, 16);

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
                    {type !== "hostSpot" && (
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
                    )}

                    {type !== "hostSpot" ? (
                      <VStack space="1">
                        <HStack alignItems="center" space="2">
                          <HStack alignItems="center" space="2" w="260">
                            <Box>
                              <Text fontWeight="medium" fontSize="xl">
                                Spot {item.idParkingSlot}
                              </Text>
                            </Box>
                            <HStack justifyContent="space-between">
                              <Box>
                                {item.paVehicleType == "1" && (
                                  <Box
                                    width="78"
                                    px="2"
                                    borderWidth="1"
                                    borderColor="#0CB183"
                                    rounded="full"
                                  >
                                    <Text
                                      flex="1"
                                      fontSize="13"
                                      color="#0CB183"
                                    >
                                      Handicap
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
                      <Box ml="2">
                        <Text>
                          {rsrv_start_date}, {rsrv_start_time} -{" "}
                          {/* {type === "today" && `${rsrv_end_date}, `} */}
                          {rsrv_end_time}
                        </Text>
                      </Box>
                      <Box>
                        <Text>CAD ${item.paFee}</Text>
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

export default ParkingSpotCard;
