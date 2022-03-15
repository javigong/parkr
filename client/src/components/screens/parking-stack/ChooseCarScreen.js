import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Box, Button, Text, Center, Pressable } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCarListByUser } from "../../services/api";

const ChooseCarScreen = ({ navigation }) => {
  const [carList, setCarList] = useState([]);

  //Will get this email when user logs in
  const loggedUserEmail = "deboramorris@testing.com";

  const handlePress = (car) => {
    console.log("pressed", car)
  }

  useEffect(() => {
    getCarListByUser(loggedUserEmail).then((results) => setCarList(results));
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
          
            {carList.length > 0 ? carList.map((car,index) => {
            return <>
            <Pressable key={index} onPress={() => handlePress(car.rsvcarmodel)}><Text key={index} style={styles.car}>{car.rsvcarmodel}, {car.rsvcarplateno}</Text></Pressable>
            </>
            })
           :
           <Text></Text> }
          </Center>
         
        </Box>
        <Button borderRadius="20px" backgroundColor="#FD6B36">
          Next
        </Button>
      </Box>
    </SafeAreaView>
  );
};

export default ChooseCarScreen;

const styles = StyleSheet.create({

  car: {
    borderWidth: 2,
    marginVertical: 6,
    padding: 8,
    borderRadius: 20,
    color: "#FD6B36", 
    borderColor: "#FD6B36",
    width: 160,
  }
});