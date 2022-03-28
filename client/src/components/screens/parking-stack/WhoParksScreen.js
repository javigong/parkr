import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Center, Text, HStack, Button, Pressable, Flex, View } from "native-base";
import OutlineButton from "../../UI/OutlineButton";
import SolidOrangeButton from "../../UI/SolidOrangeButton";

const WhoParksScreen = ({ route, navigation }) => {
  const { item, currentDate, startDate, endDate, cancelButton } = route.params;
  const [userType, setUserType] = useState();

  const cancelFindParking = () => {
    navigation.popToTop();
  };

  let color = {
    backgroundColor: "#43D3A4",
  };

  // This will handle the selection of user and passed as a params in route

  const handlePress = (user) => {
    setUserType(user);
  };

  return (
    <>
      <Box
        bg="white"
        flex="1"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box flex="1" mt={10} justifyContent="flex-start">
          <Center>
            <Text fontWeight="bold" fontSize="2xl" mb="10">
              Please select who is parking
            </Text>
          </Center>

          <Box borderBottomWidth={1} py={2} borderBottomColor="#FD6B36">
            <HStack justifyContent="space-around">
              <Text style={styles.usertype}>Me</Text>
              <Pressable
                borderWidth={2}
                borderColor="#43D3A4"
                borderRadius={50}
                padding={1}
                alignSelf="center"
              >
                <Pressable
                  borderWidth={2}
                  borderColor="#43D3A4"
                  borderRadius={20}
                  padding={1}
                  alignSelf="center"
                  style={userType == "Me" ? color : {}}
                  onPress={() => {
                    handlePress("Me");
                  }}
                ></Pressable>
              </Pressable>
            </HStack>
          </Box>
          <Box borderBottomWidth={1} py={2} borderBottomColor="#FD6B36">
            <HStack justifyContent="space-around">
              <Text style={styles.usertype}>Visitor</Text>

              <Pressable
                borderWidth={2}
                borderColor="#43D3A4"
                borderRadius={50}
                padding={1}
                alignSelf="center"
              >
                <Pressable
                  borderWidth={2}
                  borderColor="#43D3A4"
                  borderRadius={20}
                  padding={1}
                  alignSelf="center"
                  style={userType == "Visitor" ? color : {}}
                  onPress={() => {
                    handlePress("Visitor");
                  }}
                ></Pressable>
              </Pressable>
            </HStack>
          </Box>
        </Box>
        {!cancelButton ? (
          <Button
            mb={9}
            borderRadius="20px"
            backgroundColor="#FD6B36"
            width="80%"
            onPress={() =>
              navigation.navigate("ParkingStack", {
                screen: "ChooseCarScreen",
                params: {
                  userType: userType,
                  item: item,
                  currentDate: currentDate,
                  startDate: startDate,
                  endDate: endDate,
                },
              })
            }
          >
            NEXT
          </Button>
        ) : (
          <Flex
          width="90%"
          mb={9}
            flex="1"
            flexDirection="row"
            alignItems="flex-end"
            // justifyContent="space-around"
          >
            <View flex="1">
              <OutlineButton buttonText="CANCEL" onPress={cancelFindParking} />
            </View>
            <View flex="1">
              <SolidOrangeButton
                buttonText="SAVE"
                onPress={() =>
                  navigation.navigate("ParkingStack", {
                    screen: "ChooseCarScreen",
                    params: {
                      userType: userType,
                      item: item,
                      currentDate: currentDate,
                      startDate: startDate,
                      endDate: endDate,
                    },
                  })
                }
              />
            </View>
          </Flex>
        )}
      </Box>
    </>
  );
};

export default WhoParksScreen;

const styles = StyleSheet.create({
  usertype: {
    marginTop: 6,
    width: 160,
    fontSize: 16,
  },
});
