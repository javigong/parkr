//Sources:
// https://aboutreact.com/react-native-upload-file-to-aws-s3-bucket/
// https://www.youtube.com/watch?v=KrhuoEiv_sk&t=621s

import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Box, Text, VStack, FormControl, Input, WarningOutlineIcon, Image, ScrollView, Button } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';
import { Camera } from 'expo-camera';
import axios from "axios";

const LicensePlateScreen = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [cameraOn, setCameraOn] = useState(false);
  const [cameraText, setCameraText] = useState('Turn On Camera')
  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState();
  const [filePath, setFilePath] = useState({});
  const [imageType, setImageType] = useState();
  const [plateNum, setPlateNum] = useState('');
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState();


// request user permission to access camera

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })
  }, []);

// turn on camera, take picture

  const openCamera = () => {
    if (cameraOn) {
      setCameraOn(false);
      setCameraText('Turn On Camera');
    } else {
      setCameraOn(true);
      setImage(null);
      setCameraText('Turn Off Camera');
    }
  }

  const takePicture = async () => {
    if(camera) {
      const data = await camera.takePictureAsync(null)
      // console.log("data: ", data);
      setImage(data.uri);

      let file = data.uri.substring(data.uri.lastIndexOf('/')+1);
      let type = data.uri.substring(data.uri.lastIndexOf('.')+1);

      setImageType(type);
      setFilename(file);
      setFilePath(data);

   
    }
  }
  
// pick an image from gallery

  const pickImage = async () => {

    setCameraOn(false);

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    let file = result.uri.substring(result.uri.lastIndexOf('/')+1);
    let type = result.uri.substring(result.uri.lastIndexOf('.')+1);
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
      alert('Please select image first');
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
        keyPrefix: 'cars/', 
        bucket: 'parkrbucket', 
        region: 'us-west-2', 
        accessKey: 'AKIAVQJSBTYGFURWAT76',
        secretKey: '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',
        successActionStatus: 201,
      },
      )
      .then((response) => {
        if (response.status !== 201)
          alert('Failed to upload image to S3');
        // console.log(response.body);
        setFilePath('');
        let {
          bucket,
          etag,
          key,
          location
        } = response.body.postResponse;

          setUploadSuccessMessage('Uploaded successfully');
    
        // setUploadSuccessMessage(
        //   `Uploaded Successfully: 
        //   \n1. bucket => ${bucket}
        //   \n2. etag => ${etag}
        //   \n3. key => ${key}
        //   \n4. location => ${location}`,
        // );
        const options = {
          method: 'POST',
          url: 'https://zyanyatech1-license-plate-recognition-v1.p.rapidapi.com/recognize_url',
          params: {
            image_url: `https://parkrbucket.s3.us-west-2.amazonaws.com/cars/${filename}`
          },
          headers: {
            'x-rapidapi-host': 'zyanyatech1-license-plate-recognition-v1.p.rapidapi.com',
            'x-rapidapi-key': 'e2db6c2630msh1ecfed303fd1acfp1b1d28jsn4bb1e7714451'
          }
        };
        
        axios.request(options).then(function (response) {
      
          // console.log(response.data);
          setPlateNum(response.data.results[0].plate);
          
        }).catch(function (error) {
          console.error(error);
        });
       
      });
    }

  return (
    <>
    <ScrollView>
    <SafeAreaView flex={1} alignItems="center">
      <Text fontWeight="bold" fontSize="3xl">Car Information</Text>
      <FormControl padding={5} isRequired>
        <VStack mx="4" space="2">
          <FormControl.Label>Car Model</FormControl.Label>
          <Input type="text" placeholder="i.e. Mazda MX-5" />
          <FormControl.HelperText>
            Please provide brand and model</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 3 characters are required.
          </FormControl.ErrorMessage>  

          <FormControl.Label>License Plate</FormControl.Label>
          <Input type="text" placeholder="i.e. 291 VSA" />
          <FormControl.HelperText>
            Please provide license plate number or upload a clear photo of your license plate.</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>  
        </VStack>

      </FormControl>

      <Box style={{ flex: "1", alignItems: 'center', justifyContent: 'center', width: '100%'}}>
       {image && <Image source={{ uri: image }} alt="car photo" style={{ width: 300, height: 150, borderRadius: 10 }} />}
       <Button style={styles.button} onPress={pickImage}>Go To Gallery</Button>
       {filePath.uri ? (
          <>
            <Button
              style={styles.button2}
              onPress={uploadFile}>
                <Text style={{color: "#FD6B36"}}>Upload Image</Text>
            </Button>
          </>
        ) : null}
        {uploadSuccessMessage ? (
          <Text style={{ color: "#FD6B36" }}>
            {uploadSuccessMessage}
          </Text>
        ) : null}
      </Box>

      <Box style={{ flex: "1", alignItems: 'center', justifyContent: 'center', width: '100%'}}>
      <Button style={styles.button} onPress={()=> openCamera()}>{cameraText}</Button>
      { cameraOn ? 
      (
      <>
      <Box style={styles.cameraContainer}>
        <Camera
          ref={ref => setCamera(ref)}
          style={styles.fixedRatio}
        />
      </Box>

      <Button style={styles.button} onPress={() => takePicture() }>
      Take Picture
      </Button>
      </>
      ) : <Text></Text>}
      </Box>
      {plateNum ? <Text>Is your license plate number: {plateNum} </Text> : <Text></Text>}
      
      <Button mb={10} borderRadius="20px" backgroundColor="#FD6B36" width="80%" onPress={()=> navigation.navigate('ParkingStack', { screen: 'ConfirmReservationScreen'})}>NEXT</Button>

    </SafeAreaView>
    </ScrollView>
    </>
  );
};

export default LicensePlateScreen;

const styles = StyleSheet.create({

  button: {
    alignSelf: 'center',
    backgroundColor: '#FD6B36',
    marginVertical: 10,
    borderRadius: 20,
    width: '85%'
  },
  button2: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderColor: '#FD6B36',
    borderWidth: 2,
    marginVertical: 10,
    borderRadius: 20,
    width: '85%'
  },
  cameraContainer: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    height: 150,
    width: 300,
    borderRadius: 10
  }
});

  
