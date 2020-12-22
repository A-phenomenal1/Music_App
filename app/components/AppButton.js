import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import color from "../utilities/color.js";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppButton({
  title,
  onPressEvent,
  btnColor = "primary1",
  iconName,
  size = 22,
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color[btnColor] }]}
      onPress={onPressEvent}
    >
      <Text style={styles.text}>{title}</Text>
      <MaterialCommunityIcons
        name={iconName}
        size={size}
        color={color.primary2}
      />
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    minWidth: "40%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
    backgroundColor: color.primary2,
    marginVertical: 10,
    elevation: 50,
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: color.white,
    marginRight: 5,
  },
});
export default AppButton;
