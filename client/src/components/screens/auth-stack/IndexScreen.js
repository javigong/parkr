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
        if (user !== null) () => navigation.navigate("ParkingScreen");
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
        if (user !== null) () => navigation.navigate("ParkingScreen");
      })();
    }
  }, [facebookResponse]);

  return (
    <>
      <Center>
        <Box>
          <VStack flex={1} space={4} justifyContent="center">
            <Text fontSize={25}>Welcome to Parkr</Text>
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
                pb="3"
                fontSize="md"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              >
                Or{" "}
              </Text>
              <Ionicons.Button
                name="ios-logo-google"
                iconStyle={{ marginLeft: 3 }}
                height={48}
                width={190}
                size={25}
                backgroundColor="rgb(66,133,244)"
                disabled={!request}
                onPress={() => {
                  promptAsync();
                }}
              >
                Sign in with Google
              </Ionicons.Button>
            </Center>
          </VStack>
        </Box>
      </Center>
    </>
  );
};

export default IndexScreen;
