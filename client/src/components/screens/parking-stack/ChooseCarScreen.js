import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import {
  Box,
  Button,
  Text,
  Center,
  HStack,
  VStack,
  Pressable,
} from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCarListByUser } from "../../services/api";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";

const ChooseCarScreen = ({ route, navigation }) => {
  const { userType, item } = route.params;

  const [carList, setCarList] = useState([]);
  const [carType, setCarType] = useState("newCar");
  const [plateNum, setPlateNum] = useState(null);
  const { user, setUser } = useContext(AuthenticatedUserContext);

  //Will get this email when user logs in
  const loggedUserEmail = "deboramorris@testing.com";

  // console.log("user email:", user.providerData[0].email)

  let color = {
    backgroundColor: "#43D3A4",
  };

  // This will handle the selection of car and passed as a params in route

  const handlePress = (car, plateNo) => {
    setCarType(car);
    setPlateNum(plateNo);
    console.log("pressed", car + " " + plateNo);
  };

  const handleCarSelect = () => {
    if (carType == "newCar") {
      navigation.navigate("ParkingStack", {
        screen: "LicensePlateScreen",
        params: {
          userType: userType,
          item: item,
        },
      });
    } else {
      navigation.navigate("ParkingStack", {
        screen: "ConfirmReservationScreen",
        params: {
          userType: userType,
          carType: carType,
          plateNum: plateNum,
          item: item,
        },
      });
    }
  };

  useEffect(() => {
    const tokenJwt = user.accessToken;
    getCarListByUser(user.providerData[0].email, tokenJwt).then((results) =>
      setCarList(results)
    );
  }, []);

  // console.log("car list: ", carList);

  return (
    <Box flex="1" bg="white">
      <SafeAreaView flex="1" alignItems="center">
        <Box flex="1" width="80%" justifyContent="space-between">
          <Box flex="1" justifyContent="flex-start">
            <Center>
              <Text fontWeight="bold" fontSize="2xl" mb={3}>
                Select the visitor car
              </Text>
            </Center>
            <HStack justifyContent="space-around" mb={3}>
              <Text style={styles.carmodel}>New Car</Text>

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
                  style={carType == "newCar" ? color : {}}
                  onPress={() => {
                    handlePress("newCar");
                  }}
                ></Pressable>
              </Pressable>
            </HStack>
            <Text>Choose from previously registered cars</Text>
            {carList.length > 0 ? (
              carList.map((car, index) => {
                return (
                  <>
                    <Box
                      key={car.idbooking}
                      borderBottomWidth={1}
                      borderBottomColor="#FD6B36"
                    >
                      <HStack key={index} justifyContent="space-around">
                        <VStack>
                          <Text style={styles.carmodel}>{car.rsvcarmodel}</Text>
                          <Text style={styles.carplate}>
                            {car.rsvcarplateno}
                          </Text>
                        </VStack>
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
                            style={carType == car.rsvcarmodel ? color : {}}
                            onPress={() => {
                              handlePress(car.rsvcarmodel, car.rsvcarplateno);
                            }}
                          ></Pressable>
                        </Pressable>
                      </HStack>
                    </Box>
                  </>
                );
              })
            ) : (
              <Text></Text>
            )}
          </Box>
          <Button
            borderRadius="20px"
            backgroundColor="#FD6B36"
            mb={3}
            onPress={() => handleCarSelect()}
          >
            NEXT
          </Button>
        </Box>
      </SafeAreaView>
    </Box>
  );
};

export default ChooseCarScreen;

const styles = StyleSheet.create({
  carmodel: {
    marginTop: 6,
    width: 160,
    fontSize: 16,
  },
  carplate: {
    fontSize: 12,
    color: "grey",
    marginBottom: 6,
  },
});
