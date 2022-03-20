import { Header } from "@react-navigation/elements";
import { Image, View } from "native-base";
import { StyleSheet } from "react-native";

export const ImageHeader = (props) => (
  <View style={{ backgroundColor: "#eee" }}>
    <Image
      style={StyleSheet.absoluteFill}
      source={require("../../../assets/orange-background.png")}
    />
    <Header {...props} style={{ backgroundColor: "transparent" }} />
  </View>
);