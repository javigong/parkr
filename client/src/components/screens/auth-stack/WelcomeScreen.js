import { getAuth } from "firebase/auth";
import { Center, Image, Text } from "native-base";
import React, { useEffect, useState } from "react";

const WelcomeScreen = () => {
  const [userData, setUserData] = useState({});
  
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user !== null) {
      setUserData = {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
    }
  }, []);

  return (
    <>
      <Center>
        <Image
          size={150}
          resizeMode={"contain"}
          borderRadius={100}
          source={{
            uri: userData.photoURL,
          }}
          alt="Alternate Text"
        />
      </Center>
      <Center>
        <Text>{userData.displayName}</Text>
      </Center>
    </>
  );
};

export default WelcomeScreen;
