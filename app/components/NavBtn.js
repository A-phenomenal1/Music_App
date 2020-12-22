import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function NavBtn({ iconName, iconTitle, onPress, iconColor }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <MaterialCommunityIcons name={iconName} size={25} color={iconColor} />
        <Text style={styles.navText}>{iconTitle}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navText: {
    fontSize: 12,
    fontFamily: "Roboto",
    fontWeight: "100",
  },
});

export default NavBtn;
