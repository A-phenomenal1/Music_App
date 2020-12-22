import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";

function RandomMusicScreen() {
  return (
    <View style={styles.container}>
      <Text>Random Music Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RandomMusicScreen;
