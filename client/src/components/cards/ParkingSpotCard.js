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
  // type 1 -standard -> handicap \\ntype 2 - large\\ntype 3 - electric car\\ntype 4 - motorcycle

  // date time readable format:
  const rsrv_start_date = new Date(item.rsrv_start.slice(0, 10))
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
                      <HStack>
                        <Box width="79%">
                          {item.paVehicleType == "1" && (
                            <Box
                              width="78"
                              px="2"
                              borderWidth="1"
                              borderColor="#0CB183"
                              rounded="full"
                            >
                              <Text flex="1" fontSize="13" color="#0CB183">
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
                  </HStack>
                  <HStack space="4" justifyContent="space-between">
                    <Box>
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
