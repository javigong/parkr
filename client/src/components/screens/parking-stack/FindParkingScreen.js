import React, { useState, useContext, useEffect, useRef } from "react";
import { LogBox, Pressable } from "react-native";
import {
  Box,
  Text,
  View,
  Button,
  Flex,
  HStack,
  FormControl,
  Input,
  Icon,
} from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import StartTimeSvg from "../../UI/StartTimeSvg";
import EndTimeSvg from "../../UI/EndTimeSvg";
import ParkingTypeButton from "../../UI/ParkingTypeButton";
import OutlineButton from "../../UI/OutlineButton";
import SolidOrangeButton from "../../UI/SolidOrangeButton";
import { getAllParkingSpots } from "../../services/api";
import { AuthenticatedUserContext } from "../../contexts/AuthenticatedUserContext";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { Ionicons } from "@expo/vector-icons";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

LogBox.ignoreLogs([
  "NativeBase: The contrast ratio of 2.863815068413143:1 for white on",
]); // Ignore log notification by message

const FindParkingScreen = ({ route, navigation }) => {
  const { item, currentDate, type } = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const date = new Date();
  const h = 2;
  date.setTime(date.getTime() + h * 60 * 60 * 1000);
  const [endDate, setEndDate] = useState(date);
  const [mode, setMode] = useState("datetime");
  const [show, setShow] = useState(false);
  const [parkingTypeFilter, setParkingTypeFilter] = useState();
  const [filteredSpotsList, setFilteredSpotsList] = useState();
  const { user, setUser } = useContext(AuthenticatedUserContext);

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setStartDate(currentDate);
  };
  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setEndDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("datetime");
  };

  const parkingTypesArray = [
    "All",
    "Standard",
    "EV Charger",
    "Large",
    "Motorcycle",
    "Small Car",
  ];

  const saveDateTimeHandler = () => {
    navigation.navigate("FoundParkingScreen", {
      item: item,
      currentDate: currentDate.toString(),
      type: type,
      startDate: startDate.toString(),
      endDate: endDate.toString(),
      parkingTypeFilter: parkingTypeFilter,
    });
  };

  const cancelFindParking = () => {
    navigation.popToTop();
  };

  //notification code

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [notify, setNotify] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function schedulePushNotification() {
    let timeInSeconds = 0;

    if (minutes * 60 > (endDate - Date.now()) / 1000) {
      timeInSeconds = 0;
      setNotify("Minutes have to be within expiry and now.");
    } else {
      timeInSeconds = (endDate - Date.now()) / 1000 - minutes * 60;

      await Notifications.scheduleNotificationAsync({
        content: {
          title: "A Message from Parkr 🚗",
          body: `Your parking will expire in ${minutes}.  Would you like to extend it?`,
        },
        trigger: { seconds: timeInSeconds },
      });
    }
  }

  return (
    <Box flex="1" backgroundColor="white">
      <Box m="5" mb="12" flex="1" justifyContent="space-between">
        <Box>
          <Text>Select the period for parking</Text>
          <Flex
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            m="3"
          >
            <StartTimeSvg />
            <Text width="20%">Start</Text>
            <View width="60%">
              <DateTimePicker
                testID="dateTimePicker"
                value={startDate}
                mode={mode}
                is24Hour={true}
                display="compact"
                onChange={onStartDateChange}
              />
            </View>
          </Flex>
          <Flex
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center"
            m="3"
          >
            <EndTimeSvg />
            <Text width="20%">End</Text>
            <View width="60%">
              <DateTimePicker
                testID="dateTimePicker"
                value={endDate}
                mode={mode}
                is24Hour={true}
                display="compact"
                onChange={onEndDateChange}
              />
            </View>
          </Flex>
          <Text>Select the parking type</Text>
          <Flex flexDirection="row" flexWrap="wrap">
            {parkingTypesArray.map((each) => {
              return (
                <ParkingTypeButton
                  key={each}
                  buttonText={each}
                  setParkingTypeFilter={setParkingTypeFilter}
                >
                  {each}
                </ParkingTypeButton>
              );
            })}
          </Flex>
          <HStack alignItems="center">
            <Text mt={5}>Please specify minutes before expiry: </Text>
            <FormControl>
              <Input
                type="number"
                value={minutes}
                width="16"
                ml={5}
                mt={5}
                onChangeText={(text) => setMinutes(text)}
              />
            </FormControl>
          </HStack>
          <Box alignItems="center" my={5}>
            <Button
              borderRadius="20px"
              backgroundColor="#FD6B36"
              width="80%"
              mb={3}
              onPress={async () => {
                await schedulePushNotification();
                if (minutes == 1) {
                  setNotify(
                    `Great! We will notify you ${minutes} minute before it expires.`
                  );
                } else {
                  setNotify(
                    `Great! We will notify you ${minutes} minutes before it expires.`
                  );
                }
              }}
            >
              <HStack justifyContent="center" alignItems="center">
                <Icon
                  color="white"
                  size={6}
                  mr={5}
                  as={<Ionicons name="notifications-outline" />}
                />
                <Text color="white">SET NOTIFICATION</Text>
              </HStack>
            </Button>
            {notify ? notify : <Text></Text>}
          </Box>
        </Box>
        <Flex
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
              onPress={saveDateTimeHandler}
            />
          </View>
        </Flex>
      </Box>
    </Box>
  );
};

export default FindParkingScreen;

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    // console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  return token;
}
