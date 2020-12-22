import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import color from "../utilities/color";

function NewListButton({ onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="music-circle"
          color={color.white}
          size={40}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.primary1,
    borderRadius: 40,
    borderColor: color.white,
    borderWidth: 10,
    bottom: 30,
    height: 80,
    justifyContent: "center",
    width: 80,
  },
});

export default NewListButton;
