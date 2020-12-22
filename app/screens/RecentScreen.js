import React, { useState } from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import color from "../utilities/color";
import Listing from "../components/Listing";

function RecentScreen({ fav, recent, callback4 }) {
  const [favSong, setFavSong] = useState(fav);
  const [recentSong, setRecentSong] = useState(recent);

  const handleFav = (heartType, setHeartType, id, title, artist) => {
    if (heartType === "heart-plus-outline") {
      if (!favSong.some((f) => f.id === id)) {
        setHeartType("heart-minus");
        favSong.push({
          id: id,
          title: title,
          artist: artist,
        });
      }
    } else {
      setHeartType("heart-plus-outline");
      try {
        const updatedFav = favSong.filter((fav) => fav.id !== id);
        setFavSong(updatedFav);
      } catch (error) {
        console.log("not present");
      }
    }
  };

  while (recentSong.length > 10) {
    recentSong.shift();
  }

  return (
    <>
      {recentSong.length !== 0 ? (
        <FlatList
          data={recentSong}
          keyExtractor={(music) => music.id.toString()}
          renderItem={({ item }) => (
            <Listing
              title={item.title}
              artist={item.artist}
              id={item.id}
              onPress={() => {
                callback4(item, recentSong);
              }}
              callback={handleFav}
            />
          )}
        />
      ) : (
        <View style={styles.container}>
          <Text>No Music Played</Text>
          <Image source={require("../assets/emptyFile.png")} />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    height: "98%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default RecentScreen;
