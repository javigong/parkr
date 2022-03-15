import React, { useState, useEffect } from "react";
import { Box, Button, Text, Radio, Center } from "native-base";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCarListByUser } from "../../services/api";

const ChooseCarScreen = ({ navigation }) => {
  const [carList, setCarList] = useState([]);

  //Will get this email when user logs in
  const loggedUserEmail = "deboramorris@testing.com";

  useEffect(() => {
    getCarListByUser(loggedUserEmail).then((results) => setCarList(results));
  }, []);

  console.log("car list: ", carList);

  return (
    <SafeAreaView flex="1" alignItems="center">
      <Box flex="1" width="80%" justifyContent="space-between" mt={10}>
        <Box flex="1" justifyContent="flex-start">
          <Center>
            <Text fontWeight="bold" fontSize="2xl">
              Select the visitor car
            </Text>

            <Radio.Group
              defaultValue="1"
              name="carGroup1"
              accessibilityLabel="choose car"
            >
              <Radio colorScheme="emerald" value="1" my={1}>
                New Car
              </Radio>

              {carList ? (
                carList.map((car, index) => (
                  <Radio key={index} colorScheme="emerald" value={index} my={1}>
                    {car.rsvcarmodel}
                  </Radio>
                ))
              ) : (
                <Text></Text>
              )}
            </Radio.Group>
            <Text>Test API</Text>
            <Text>{carList[0].rsvcarmodel} {carList[0].rsvcarplateno}</Text>
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
