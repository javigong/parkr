import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Box, Center, Text, HStack, Button, Pressable } from "native-base";

const WhoParksScreen = ({ route, navigation }) => {
  const { item, startDate, endDate } = route.params;
  const [userType, setUserType] = useState();

  let color = {
    backgroundColor: "#43D3A4",
  };

  // This will handle the selection of user and passed as a params in route

  const handlePress = (user) => {
    setUserType(user);
    console.log("pressed", user);
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

          {/* <Radio.Group
              defaultValue="1"
              name="userGroup"
              accessibilityLabel="who is parking"
            >
              <Radio colorScheme="emerald" value="1" my={1}>
                Me
              </Radio>

              <Radio colorScheme="emerald" value="2" my={1}>
                My Visitor
              </Radio>
            </Radio.Group> */}
        </Box>
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
                startDate: startDate,
                endDate: endDate,
              },
            })
          }
        >
          NEXT
        </Button>
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
