import React from "react";
import { Box, Center, Text, Button, Icon } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const ReservationDoneScreen = ({ navigation, route }) => {
  const { item } = route.params;

  const ChatHandler = () => {
    navigation.navigate("ChatStack", {
      screen: "LiveChatScreen",
      // params: { item: item, currentDate: currentDate, type: type },
    });
  };

  return (
    <Box flex="1" justifyContent="space-between" alignItems="center" bg="white">
      <Box flex={1} justifyContent="flex-start" alignItems="center">
        <Center>
          <Text fontWeight="bold" fontSize="2xl" mt={10}>
            Parking spot is reserved!
          </Text>
          <Text fontWeight="bold" fontSize="2xl" mt={10}>
            Spot {item.idParkingSlot}
          </Text>
          <Box py={2} px={3} borderRadius="50px" my={6} bg="#FD6B36">
            <Text fontWeight="bold" fontSize="2xl" color="white">
              {item.upFirstName.charAt(0).toUpperCase()}
              {item.upLastName.charAt(0).toUpperCase()}
            </Text>
          </Box>
          <Text>
            {item.upFirstName} {item.upLastName}
          </Text>
          <Button
            onPress={() => ChatHandler()}
            my={6}
            borderRadius="30px"
            backgroundColor="#0CB183"
            width="65%"
          >
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              px={3}
            >
              <Icon
                color="white"
                size={8}
                as={<Ionicons name="chatbubbles-outline" />}
              />
              <Text color="white" fontWeight="bold" fontSize="md">
                {" "}
                START CONVERSATION
              </Text>
            </Box>
          </Button>
          <Text>Your reservation was added to My Activity</Text>
        </Center>
      </Box>

      <Button
        borderRadius="20px"
        backgroundColor="#FD6B36"
        width="80%"
        mb={10}
        onPress={() =>
          navigation.navigate("HomeTab", {
            screen: "ParkingScreen",
          })
        }
      >
        DONE
      </Button>
    </Box>
  );
};

export default ReservationDoneScreen;
