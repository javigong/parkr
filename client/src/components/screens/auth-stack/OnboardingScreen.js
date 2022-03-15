import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Image } from "native-base";
import Onboarding from "react-native-onboarding-swiper";

const Done = ({ ...props }) => {
  return (
    <TouchableOpacity style={{ marginHorizontal: 15 }} {...props}>
      <Text style={{ fontSize: 16 }}>Done</Text>
    </TouchableOpacity>
  );
};

const Dots = ({ selected }) => {
  let backgroundColor;

  backgroundColor = selected ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.3)";
  return (
    <View
      style={{
        width: 10,
        height: 10,
        borderRadius: 50,
        marginHorizontal: 3,
        backgroundColor,
      }}
    />
  );
};

const OnboardingScreen = ({ navigation }) => {
  return (
    <>
      <Onboarding
        onSkip={() => navigation.replace("IndexScreen")}
        onDone={() => navigation.replace("IndexScreen")}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        containerStyles={{}}
        imageContainerStyles={{
          paddingBottom: 30,
        }}
        subTitleStyles={{
          paddingHorizontal: 40,
          paddingBottom: 120,
        }}
        pages={[
          {
            backgroundColor: "white",
            image: (
              <Image
                style={{ width: 315, height: 300 }}
                source={require("../../../../assets/onboard_image1.png")}
                alt="onboarding image"
                ml={3}
                mb={10}
              />
            ),
            title: "Visiting a friend",
            subtitle:
              "You wonder if there will be a visitor's spot available when you arrive",
          },
          {
            backgroundColor: "white",
            image: (
              <Image
                style={{ width: 300, height: 300 }}
                source={require("../../../../assets/onboard_image2.png")}
                alt="onboarding image"
                mb={10}
              />
            ),
            title: "Try Parkr",
            subtitle:
              "You're in luck! Your friend's building is registered with Parkr.",
          },
          {
            backgroundColor: "white",
            image: (
              <Image
                style={{ width: 300, height: 300 }}
                source={require("../../../../assets/onboard_image3.png")}
                alt="onboarding image"
                mb={10}
              />
            ),
            title: "Park without hassle",
            subtitle:
              "Parkr lets you reserve spots at participating buildings in advance.",
          },
        ]}
      />
    </>
  );
};

export default OnboardingScreen;
