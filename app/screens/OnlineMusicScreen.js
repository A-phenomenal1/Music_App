import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Constants from "expo-constants";

function OnlineMusicScreen(props) {
  return (
    <View style={styles.container}>
      <Text>Online Music Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OnlineMusicScreen;
