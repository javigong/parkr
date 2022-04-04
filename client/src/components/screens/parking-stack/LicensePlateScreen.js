//Sources:
// https://aboutreact.com/react-native-upload-file-to-aws-s3-bucket/
// https://www.youtube.com/watch?v=KrhuoEiv_sk&t=621s

import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Center, HStack, Icon, Pressable } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import SolidOrangeButton from "../../UI/SolidOrangeButton";
import {
  Box,
  Text,
  VStack,
  FormControl,
  Input,
  WarningOutlineIcon,
  Image,
  ScrollView,
  Button,
  View,
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { RNS3 } from "react-native-aws3";
import { Camera } from "expo-camera";
import axios from "axios";

const LicensePlateScreen = ({ route, navigation }) => {
  const { userType, item, currentDate, startDate, endDate } = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [carType, setCarType] = useState("");
  const [camera, setCamera] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraText, setCameraText] = useState("Turn On Camera");
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState();
  const [filePath, setFilePath] = useState({});
  const [imageType, setImageType] = useState();
  const [plateNum, setPlateNum] = useState("");
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState();

  // request user permission to access camera

  useEffect(() => {
    async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
  }, []);

  // turn on camera, take picture

  const openCamera = () => {
    if (cameraOn) {
      setCameraOn(false);
      setCameraText("Turn On Camera");
    } else {
      setCameraOn(true);
      setImage(null);
      setCameraText("Turn Off Camera");
    }
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      // console.log("data: ", data);
      setImage(data.uri);

      let file = data.uri.substring(data.uri.lastIndexOf("/") + 1);
      let type = data.uri.substring(data.uri.lastIndexOf(".") + 1);

      setImageType(type);
      setFilename(file);
      setFilePath(data);
    }
  };

  // pick an image from gallery

  const pickImage = async () => {
    setCameraOn(false);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let file = result.uri.substring(result.uri.lastIndexOf("/") + 1);
    let type = result.uri.substring(result.uri.lastIndexOf(".") + 1);
    setFilename(file);
    setImageType(type);

    if (!result.cancelled) {
      setImage(result.uri);
      setFilePath(result);
    }
  };

  // upload file to AWS S3 Bucket for easy storage and retrieval

  const uploadFile = () => {
    if (Object.keys(filePath).length == 0) {
      alert("Please select image first");
      return;
    }
    RNS3.put(
      {
        uri: filePath.uri,
        name: filename,
        type: imageType,
      },
      {
        //can make prefix to user's name
        keyPrefix: "cars/",
        bucket: "parkrbucket",
        region: "us-west-2",
        accessKey: "AKIAVQJSBTYGFURWAT76",
        secretKey: "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",
        successActionStatus: 201,
      }
    ).then((response) => {
      if (response.status !== 201) alert("Failed to upload image to S3");
      setFilePath("");
      let { bucket, etag, key, location } = response.body.postResponse;

      setUploadSuccessMessage("Uploaded successfully");

      const options = {
        method: "POST",
        url: "https://zyanyatech1-license-plate-recognition-v1.p.rapidapi.com/recognize_url",
        params: {
          image_url: `https://parkrbucket.s3.us-west-2.amazonaws.com/cars/${filename}`,
        },
        headers: {
          "x-rapidapi-host":
            "zyanyatech1-license-plate-recognition-v1.p.rapidapi.com",
          "x-rapidapi-key":
            "e2db6c2630msh1ecfed303fd1acfp1b1d28jsn4bb1e7714451",
        },
      };

      axios
        .request(options)
        .then(function (response) {
          setPlateNum(response.data.results[0].plate);
        })
        .catch(function (error) {
          console.error(error);
        });
    });
  };

  return (
    <>
      <Box flex="1" bg="white">
        <SafeAreaView flex={1} alignItems="center">
          <Text style={styles.pageTitle}>Car Information</Text>
          <FormControl padding={5} isRequired>
            <VStack mx="4" space="2">
              <Box>
                <FormControl.Label m="0" mb="1">
                  Car Make & Model
                </FormControl.Label>
                <Input
                  type="text"
                  value={carType}
                  placeholder="i.e. Mazda MX-5"
                  onChangeText={(text) => setCarType(text)}
                  style={styles.inputCar}
                  borderColor="#FD6B36"
                  height="40px"
                  borderRadius="17"
                />

                <FormControl.ErrorMessage
                  leftIcon={<WarningOutlineIcon size="xs" />}
                >
                  At least 3 characters are required.
                </FormControl.ErrorMessage>
              </Box>
              <Box>
                <FormControl.Label m="0" mb="1">
                  License Plate
                </FormControl.Label>
                <Input
                  type="text"
                  value={plateNum}
                  placeholder="i.e. 291VSA"
                  onChangeText={(text) => setPlateNum(text)}
                  borderColor="#FD6B36"
                  height="40px"
                  borderRadius="17"
                />
              </Box>
              <FormControl.ErrorMessage
                leftIcon={<WarningOutlineIcon size="xs" />}
              >
                At least 6 characters are required.
              </FormControl.ErrorMessage>
            </VStack>
          </FormControl>

          <Box
            borderWidth={1}
            borderColor="gray.200"
            borderRadius="20px"
            width="85%"
            mb={6}
            py={5}
            height="50%"
            shadow={2}
          >
            <ScrollView width="100%">
              <Box
                style={{
                  flex: "1",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                {image && (
                  <Image
                    source={{ uri: image }}
                    alt="car photo"
                    style={{ width: 300, height: 150, borderRadius: 10 }}
                  />
                )}

                <Box
                  style={{
                    flex: "1",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {cameraOn ? (
                    <>
                      <Box style={styles.cameraContainer}>
                        <Camera
                          ref={(ref) => setCamera(ref)}
                          style={styles.fixedRatio}
                        />
                      </Box>

                      <Pressable style={styles.button2a}>
                        <Pressable
                          style={styles.button2b}
                          onPress={() => takePicture()}
                        ></Pressable>
                      </Pressable>
                    </>
                  ) : (
                    <Text></Text>
                  )}
                </Box>
                {uploadSuccessMessage ? (
                  <Text
                    fontWeight="bold"
                    style={{ color: "#FD6B36" }}
                    fontSize="16px"
                  >
                    {uploadSuccessMessage}
                  </Text>
                ) : null}

                {plateNum ? (
                  <>
                    <Center>
                      <Text fontSize="16px">
                        Is your license plate number:{" "}
                      </Text>
                      <Text fontWeight="bold" fontSize="2xl">
                        {plateNum}
                      </Text>
                    </Center>
                  </>
                ) : (
                  <Text></Text>
                )}
              </Box>
            </ScrollView>

            <HStack justifyContent="space-evenly">
              <Pressable style={styles.button} onPress={pickImage}>
                <Icon
                  color="white"
                  size={8}
                  as={<Ionicons name="images-outline" />}
                />
              </Pressable>

              <Pressable style={styles.button} onPress={() => openCamera()}>
                <Icon
                  color="white"
                  size={8}
                  as={<Ionicons name="camera-outline" />}
                />
              </Pressable>

              <Pressable style={styles.button} onPress={uploadFile}>
                <Icon
                  color="white"
                  size={8}
                  as={<Ionicons name="cloud-upload-outline" />}
                />
              </Pressable>
            </HStack>
          </Box>
          <View flex="1" mt="50px" width="80%">
            <SolidOrangeButton
              width="100%"
              buttonText="NEXT"
              onPress={() =>
                navigation.navigate("ParkingStack", {
                  screen: "ConfirmReservationScreen",
                  params: {
                    userType: userType,
                    carType: carType,
                    plateNum: plateNum,
                    item: item,
                    currentDate: currentDate,
                    startDate: startDate,
                    endDate: endDate,
                  },
                })
              }
            />
          </View>
        </SafeAreaView>
      </Box>
    </>
  );
};

export default LicensePlateScreen;

const styles = StyleSheet.create({
  pageTitle: {
    fontWeight: "bold",
    fontSize: 25,
    lineHeight: 30,
    marginTop: "5%",
  },
  inputCar: {
    borderColor: "#FD6B36",
    height: "20%",
    borderRadius: 17,
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#0CB183",
    marginVertical: 10,
    padding: 12,
    borderRadius: 50,
  },
  button2a: {
    marginVertical: 20,
    alignSelf: "center",
    backgroundColor: "#0CB183",
    borderColor: "white",
    padding: 6,
    borderRadius: 50,
  },
  button2b: {
    alignSelf: "center",
    backgroundColor: "#0CB183",
    borderColor: "white",
    borderWidth: 3,
    padding: 20,
    borderRadius: 50,
  },
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    height: 150,
    width: 300,
    borderRadius: 10,
  },
});
