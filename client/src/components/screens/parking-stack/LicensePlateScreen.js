import React, { useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity } from "react-native";
import { Box, Checkbox, Text, VStack, FormControl, Input, WarningOutlineIcon, Button, Image } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';

const LicensePlateScreen = () => {

  const [image, setImage] = useState(null);
  const [filename, setFilename] = useState();
  const [filePath, setFilePath] = useState({});
  const [uploadSuccessMessage, setUploadSuccessMessage] = useState('');

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    let file = result.uri.substring(result.uri.lastIndexOf('/')+1);
  
    setFilename(file);

    if (!result.cancelled) {
      setImage(result.uri);
      setFilePath(result);
    }
  };

  const uploadFile = () => {
    if (Object.keys(filePath).length == 0) {
      alert('Please select image first');
      return;
    }
    RNS3.put(
      {
        uri: filePath.uri,
        name: filename,
        type: filePath.type,
      },
      {
        keyPrefix: 'cars/', 
        bucket: 'parkrbucket', 
        region: 'us-west-2', 
        accessKey: 'AKIAVQJSBTYGFURWAT76',
        secretKey: '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',
        successActionStatus: 201,
      },
    )
      .progress((progress) =>
        setUploadSuccessMessage(
          `Uploading: ${progress.loaded / progress.total} (${
            progress.percent
          }%)`,
        ),
      )
      .then((response) => {
        if (response.status !== 201)
          alert('Failed to upload image to S3');
        console.log(response.body);
        setFilePath('');
        let {
          bucket,
          etag,
          key,
          location
        } = response.body.postResponse;
        setUploadSuccessMessage(
          `Uploaded Successfully: 
          \n1. bucket => ${bucket}
          \n2. etag => ${etag}
          \n3. key => ${key}
          \n4. location => ${location}`,
        );
      });
    }

  return (
    <>
    <SafeAreaView>
    <Box justifyContent="center" alignItems="center">
      <Text fontWeight="bold" fontSize="3xl">Car Information</Text>
      <FormControl padding={5} isRequired>
        <VStack mx="4" space="2">
          <FormControl.Label>Car Model</FormControl.Label>
          <Input type="text" placeholder="i.e. Mazda MX-5" />
          <FormControl.HelperText>
            Please supply brand and model</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 3 characters are required.
          </FormControl.ErrorMessage>  

          <FormControl.Label>License Plate</FormControl.Label>
          <Input type="text" placeholder="i.e. 291 VSA" />
          <FormControl.HelperText>
            Please provide license plate number</FormControl.HelperText>
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            At least 6 characters are required.
          </FormControl.ErrorMessage>  
          {/* <Checkbox size="xs" defaultIsChecked>
          Check if there are no damages to report.
          </Checkbox> */}
        </VStack>
      </FormControl>
      <Box style={{ alignItems: 'center'}}>
       {image && <Image source={{ uri: image }} alt="car photo" style={{ width: 200, height: 200 }} />}
       <Button onPress={pickImage}>Choose Image</Button>
       {filePath.uri ? (
          <>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.buttonStyleGreen}
              onPress={uploadFile}>
              <Text style={styles.textStyleWhite}>
                Upload Image
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
        {uploadSuccessMessage ? (
          <Text style={styles.textStyleGreen}>
            {uploadSuccessMessage}
          </Text>
        ) : null}
      </Box>
    </Box>
    </SafeAreaView>
    </>
  );
};

export default LicensePlateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  textStyle: {
    padding: 10,
    color: 'black',
    textAlign: 'center',
  },
  textStyleGreen: {
    padding: 10,
    color: 'green',
  },
  textStyleWhite: {
    padding: 10,
    color: 'white',
  },
  buttonStyle: {
    alignItems: 'center',
    backgroundColor: 'orange',
    marginVertical: 10,
    width: '100%',
  },
  buttonStyleGreen: {
    alignItems: 'center',
    backgroundColor: 'green',
    marginVertical: 10,
    width: '100%',
  }
});