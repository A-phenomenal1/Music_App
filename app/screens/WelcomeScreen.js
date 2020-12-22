import React from "react";
import {
  StyleSheet,
  ImageBackground,
  Text,
  StatusBar,
  View,
} from "react-native";
import Constants from "expo-constants";
import AppButton from "../components/AppButton";
import color from "../utilities/color";

function WelcomeScreen({ callback }) {
  return (
    <ImageBackground
      style={styles.background}
      source={require("../assets/welcome2.jpg")}
    >
      <StatusBar backgroundColor="#2f1d61" barStyle="light-content" />
      <Text style={styles.tagline}>Explore music</Text>
      <Text style={styles.subTagline}>
        Explore Your Favourite Playlist In Your Favourite Language
      </Text>
      <AppButton
        title="Try It"
        iconName="arrow-right-thick"
        onPressEvent={() => callback("clicked")}
      />
      <View style={{ marginBottom: 30 }} />
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  subTagline: {
    fontSize: 20,
    fontWeight: "500",
    fontFamily: "Roboto",
    marginHorizontal: 30,
    marginBottom: 15,
    color: color.white,
    textAlign: "center",
    opacity: 0.7,
  },
  tagline: {
    fontSize: 32,
    fontWeight: "bold",
    fontFamily: "Roboto",
    color: color.secondary1,
  },
});

export default WelcomeScreen;
