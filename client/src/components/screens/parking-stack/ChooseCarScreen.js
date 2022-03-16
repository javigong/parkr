import React, { useState, useEffect, useContext } from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Text, Center, HStack, VStack, Pressable } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCarListByUser } from "../../services/api";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";

// import ChooseCarRadioButton from "../../UI/ChooseCarRadioButton";

const ChooseCarScreen = ({ navigation }) => {
  const [carList, setCarList] = useState([]);
  // const [chooseColor, setChooseColor] = useState("white");
  const { user, setUser } = useContext(AuthenticatedUserContext);

  //Will get this email when user logs in
  const loggedUserEmail = "deboramorris@testing.com";

  const handlePress = (car) => {
    console.log("pressed", car);
  };

  useEffect(() => {
    const tokenJwt = user.accessToken;
    getCarListByUser(loggedUserEmail, tokenJwt).then((results) =>
      setCarList(results)
    );
  }, []);

  console.log("car list: ", carList);

  return (
    <SafeAreaView flex="1" alignItems="center">
      <Box flex="1" width="80%" justifyContent="space-between" mt={10}>
        <Box flex="1" justifyContent="flex-start">
          <Center>
            <Text fontWeight="bold" fontSize="2xl" mb={5}>
              Select the visitor car
            </Text>
          </Center>
          {carList.length > 0 ? (
            carList.map((car, index) => {
              return (
                <>
                  <Box borderBottomWidth={1} borderBottomColor="#FD6B36">
                  <HStack justifyContent="space-around" >
                    <VStack>
                    <Text key={car.idbooking} style={styles.carmodel}>
                      {car.rsvcarmodel}  
                    </Text>
                    <Text key={car.rsvcarplateno} style={styles.carplate}>
                    {car.rsvcarplateno}
                    </Text>
                    </VStack>
                    {/* <ChooseCarRadioButton onPress={() => {
              handlePress(car.rsvcarmodel);
              setChooseColor("#FD6B36")}} 
              bg={chooseColor} /> */}
                    <Box borderWidth={2}
                      borderColor="#43D3A4"
                      borderRadius={50}
                      padding={1}
                      alignSelf="center">
                    <Pressable
                      borderWidth={2}
                      borderColor="#43D3A4"
                      borderRadius={20}
                      padding={1}
                      alignSelf="center"
                      key={index}
                      // bg={chooseColor}
                      onPress={() => {
                        handlePress(car.rsvcarmodel);
                        // setChooseColor("#43D3A4");
                      }}
                    ></Pressable>
                    </Box>
                  </HStack>
                  </Box>
                </>
              );
            })
          ) : (
            <Text></Text>
          )}
        </Box>
        <Button borderRadius="20px" backgroundColor="#FD6B36" onPress={()=> navigation.navigate('ParkingStack', { screen: 'LicensePlateScreen'})}>
          Next
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default ChooseCarScreen;

const styles = StyleSheet.create({
  carmodel: {
    marginTop: 6,
    width: 160,
    fontSize: 16
  },
  carplate: {
    fontSize: 12,
    color: "grey",
    marginBottom: 6
  }
});
