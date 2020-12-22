import React, { useState } from "react";
import { View, StyleSheet, StatusBar } from "react-native";
import color from "../utilities/color";
import NavBtn from "./NavBtn";

function HeadBar({ callback }) {
  const btns = ["Playlist", "Recent", "Favourites"];
  const [btnColor, setBtnColor] = useState({
    playlist: color.primary1,
    recent: "lightgrey",
    fav: "lightgrey",
  });
  return (
    <View style={styles.stackContainer}>
      <StatusBar backgroundColor={color.primary3} barStyle="light-content" />
      <NavBtn
        iconName="book-music"
        iconTitle="PlayList"
        iconColor={btnColor.playlist}
        onPress={() => callback(btns[0], setBtnColor)}
      />
      <NavBtn
        iconName="clock-time-five"
        iconTitle="Recent"
        iconColor={btnColor.recent}
        onPress={() => callback(btns[1], setBtnColor)}
      />
      <NavBtn
        iconName="heart-multiple"
        iconTitle="Favourites"
        iconColor={btnColor.fav}
        onPress={() => callback(btns[2], setBtnColor)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  stackContainer: {
    marginBottom: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    height: 60,
    paddingLeft: 12,
    position: "relative",
    width: "100%",
    top: 0,
    borderWidth: 5,
    borderColor: color.light2,
    backgroundColor: color.tertiary1,
    borderRadius: 10,
    elevation: 50,
    zIndex: 1,
  },
});

export default HeadBar;
