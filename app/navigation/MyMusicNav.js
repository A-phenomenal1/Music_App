import React, { useState } from "react";
import { View, StyleSheet, Modal } from "react-native";
import Constants from "expo-constants";
import HeadBar from "../components/HeadBar";
import PlayListScreen from "../screens/PlayListScreen";
import RecentScreen from "../screens/RecentScreen";
import FavouritesScreen from "../screens/FavouritesScreen";
import color from "../utilities/color";
import PlayScreen from "../screens/PlayScreen";

function MyMusicNav() {
  const [presentScr, setPresentScr] = useState("Playlist");
  const [favSongs, setFavSongs] = useState([]);
  const [recentSongs, setRecentSongs] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [song, setSong] = useState({
    id: "",
    title: "",
    artist: "",
    img: "",
    list: [],
  });

  let screen;

  const handleScr = (btn, setBtnColor) => {
    if (btn === "Playlist") {
      setPresentScr("Playlist");
      setBtnColor({
        playlist: color.primary1,
        recent: "lightgrey",
        fav: "lightgrey",
      });
    } else if (btn === "Recent") {
      setPresentScr("Recent");
      setBtnColor({
        playlist: "lightgrey",
        recent: color.primary1,
        fav: "lightgrey",
      });
    } else {
      setPresentScr("Favourite");
      setBtnColor({
        playlist: "lightgrey",
        recent: "lightgrey",
        fav: color.primary1,
      });
    }
  };

  const handleFav = (fav) => {
    setFavSongs(fav);
  };

  const handleRecent = (recent) => {
    setRecentSongs(recent);
  };

  const handlePlay = (item, playlist) => {
    setModalVisible(true);
    setSong({
      id: item.id,
      title: item.title,
      artist: item.artist,
      img: item.imgUrl,
      list: playlist,
    });
  };

  if (presentScr === "Playlist") {
    screen = (
      <PlayListScreen
        callback1={handleFav}
        callback2={handleRecent}
        callback3={handlePlay}
      />
    );
  } else if (presentScr === "Recent") {
    screen = (
      <RecentScreen
        fav={favSongs}
        recent={recentSongs}
        callback4={handlePlay}
      />
    );
  } else {
    screen = (
      <FavouritesScreen
        fav={favSongs}
        recent={recentSongs}
        callback5={handlePlay}
      />
    );
  }
  return (
    <>
      <View style={styles.container}>
        <HeadBar callback={handleScr} />
        {screen}
      </View>
      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <PlayScreen
          id={song.id}
          title={song.title}
          artist={song.artist}
          img={song.img}
          list={song.list}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Constants.statusBarHeight + 60,
  },
});

export default MyMusicNav;
