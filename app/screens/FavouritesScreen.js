import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text, Image } from "react-native";
import Listing from "../components/Listing";

function FavouritesScreen({ fav, recent, callback5 }) {
  const [favSong, setFavSong] = useState(fav);
  const [recentSong, setRecentSong] = useState(recent);

  const handleFav = (
    heartType,
    setHeartType,
    initialHeart,
    id,
    title,
    artist,
    img,
    uri
  ) => {
    try {
      setHeartType("heart-plus-outline");
      const updatedFavSong = favSong.filter((song) => song.id !== id);
      setFavSong([...updatedFavSong]);
    } catch (error) {
      console.log("not present");
    }
  };

  const handleRecent = (item) => {
    if (!recentSong.some((r) => r.id === item.id)) {
      recentSong.push({
        id: item.id,
        title: item.title,
        artist: item.artist,
        imgUrl: item.imgUrl,
        uri: item.uri,
      });
    }
  };

  return (
    <>
      {favSong.length !== 0 ? (
        <FlatList
          data={favSong}
          keyExtractor={(music) => music.id.toString()}
          renderItem={({ item }) => (
            <Listing
              artist={item.artist}
              id={item.id}
              onPress={() => {
                handleRecent(item), callback5(item, favSong);
              }}
              title={item.title}
              initialHeart="heart-minus"
              callback={handleFav}
            />
          )}
        />
      ) : (
        <View style={styles.container}>
          <Text>Empty Favourite Screen</Text>
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

export default FavouritesScreen;
