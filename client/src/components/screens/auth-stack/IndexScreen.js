import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { Text, Center, Box, VStack, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { signInWithCredential } from 'firebase/auth';

import { auth, provider } from "../../config/firebase";

WebBrowser.maybeCompleteAuthSession();

const IndexScreen = ({ navigation }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "982042294137-meilc590t5ohvhh3esghbegr74ndimio.apps.googleusercontent.com",
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response]);

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
                onPress={() => promptAsync}
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
