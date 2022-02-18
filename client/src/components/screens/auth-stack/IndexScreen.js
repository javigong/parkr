import React, { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import * as Facebook from "expo-auth-session/providers/facebook";
import { Text, Center, Box, VStack, Button, Heading } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithCredential,
} from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();

const IndexScreen = ({ navigation }) => {
  const [request, googleResponse, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1013744309561-i48rf6f03b7ueb637huticdbuergsuuq.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (googleResponse?.type === "success") {
      (async () => {
        const { id_token } = googleResponse.params;
        const auth = getAuth();

        const credential = GoogleAuthProvider.credential(id_token);
        const user = await signInWithCredential(auth, credential);
        console.log("***GOOGLE***", user, "***GOOGLE***");
        // if (user !== null) () => navigation.navigate("ParkingScreen");
      })();
    }
  }, [googleResponse]);

  const [fbRequest, facebookResponse, fbPromptAsync] = Facebook.useAuthRequest({
    responseType: ResponseType.Token,
    clientId: "367814018517994",
  });

  useEffect(() => {
    if (facebookResponse?.type === "success") {
      (async () => {
        const { access_token } = facebookResponse.params;
        const auth = getAuth();

        const credential = FacebookAuthProvider.credential(access_token);
        const user = await signInWithCredential(auth, credential);
        console.log("***FACEBOOK***", user, "***FACEBOOK***");
        // if (user !== null) () => navigation.navigate("ParkingScreen");
      })();
    }
  }, [facebookResponse]);

  return (
    <>
      <Center>
        <Center w="100%">
          <Box safeArea py="8" w="90%" maxW="290">
            <Heading
              py="16"
              size="xl"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: "warmGray.50",
              }}
            >
              Welcome to Parkr
            </Heading>

            <VStack space={3} mt="5" justifyContent="center">
              <Button
                py={3}
                px={1}
                size="lg"
                backgroundColor="rgb(94,39,161)"
                onPress={() => navigation.navigate("LoginScreen")}
              >
                Login
              </Button>
              <Button
                py={3}
                px={1}
                size="lg"
                backgroundColor="rgb(94,39,161)"
                onPress={() => navigation.navigate("SignupScreen")}
              >
                Signup
              </Button>
              <Center>
                <Text
                  fontSize="md"
                  color="coolGray.600"
                  _dark={{
                    color: "warmGray.200",
                  }}
                >
                  Or{" "}
                </Text>
              </Center>
              <Ionicons.Button
                name="ios-logo-google"
                iconStyle={{ marginLeft: 52 }}
                height={48}
                width="100%"
                size={25}
                backgroundColor="rgb(66,133,244)"
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              >
                Sign in with Google
              </Ionicons.Button>
              <Ionicons.Button
                name="ios-logo-facebook"
                iconStyle={{ marginLeft: 51 }}
                height={48}
                width="100%"
                size={25}
                backgroundColor="rgb(56,84,152)"
                disabled={!fbRequest}
                onPress={() => {
                  fbPromptAsync();
                }}
              >
                Login with Facebook
              </Ionicons.Button>
            </VStack>
          </Box>
        </Center>
      </Center>
    </>
  );
};

export default IndexScreen;