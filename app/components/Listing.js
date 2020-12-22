import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import color from "../utilities/color";
import AppText from "./AppText";

function Listing({
  id,
  title,
  artist,
  img,
  uri,
  onPress,
  callback,
  initialHeart = "heart-plus-outline",
  image,
}) {
  const [heartType, setHeartType] = useState(initialHeart);

  return (
    <TouchableOpacity underlay={color.light} onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.icon}>
          {image ? (
            <Image source={image} />
          ) : (
            <MaterialCommunityIcons name="music" size={25} />
          )}
        </View>
        <View style={styles.detailContainer}>
          <AppText style={styles.title} numberOfLines={1}>
            {title}
          </AppText>
          <AppText style={styles.artist} numberOfLines={1}>
            {artist}
          </AppText>
        </View>
        <View style={{ flex: 1 }} />
        <TouchableOpacity
          onPress={() =>
            callback(
              heartType,
              setHeartType,
              initialHeart,
              id,
              title,
              artist,
              img,
              uri
            )
          }
        >
          <MaterialCommunityIcons
            name={heartType}
            size={30}
            color={color.primary3}
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: color.light2,
    alignItems: "center",
  },
  detailContainer: {
    width: "65%",
    marginLeft: 15,
  },
  icon: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: color.secondary1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: color.light,
  },
  title: {
    fontSize: 20,
    fontWeight: "900",
    opacity: 0.9,
  },
  artist: {
    fontSize: 15,
    opacity: 0.7,
  },
});

export default Listing;
