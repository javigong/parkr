import React from "react";
import * as WebBrowser from 'expo-web-browser';
import { ResponseType } from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import { Text, Center, Box, VStack, Button } from "native-base";
import { Ionicons } from "@expo/vector-icons";

const IndexScreen = ({ navigation }) => {
  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: "Your-Web-Client-ID.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
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
