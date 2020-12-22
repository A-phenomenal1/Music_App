import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";

import Listing from "../components/Listing";

function PlayListScreen({ callback1, callback2, callback3 }) {
  const playList = [
    {
      id: 1,
      title: "--Closer-- ",
      artist: "Alan Walker, The Chainsmokers & Halsey",
      imgUrl:
        "https://i.pinimg.com/originals/57/0d/95/570d95e059841aaf53a22bb5dc5f238b.jpg",
      uri: require("../assets/tracks/Closer.mp3"),
    },
    {
      id: 2,
      title: "--Faded-- ",
      artist: "Alan Walker, The Chainsmokers & Halsey",
      imgUrl:
        "https://www.iaatm.de/wp-content/uploads/2016/03/Bildschirmfoto-2016-03-02-um-18.28.51.png",
      uri: require("../assets/tracks/Faded.mp3"),
    },
    {
      id: 3,
      title: "Dance Monkey",
      artist: "Tones & I",
      imgUrl: "https://f4.bcbits.com/img/a4248537126_10.jpg",
      uri: require("../assets/tracks/Dance_monkey.mp3"),
    },
    {
      id: 4,
      title: "Girls Like You ",
      artist: "Maroon 5, Kara's Flowers",
      imgUrl: "https://i1.sndcdn.com/artworks-000364251846-7asyt4-t500x500.jpg",
      uri: require("../assets/tracks/Girls_Like_You.mp3"),
    },
    {
      id: 5,
      title: "--RockStar--",
      artist: "Post Malone",
      imgUrl:
        "https://www.gannett-cdn.com/presto/2018/08/21/USAT/1ebe691d-1883-4036-93e1-54ccd00bf837-01_AP_2018_MTV_Video_Music_Awards_-_Press_Room.JPG?width=2560",
      uri: require("../assets/tracks/Rockstar.mp3"),
    },
    {
      id: 6,
      title: "--Yummy--",
      artist: "Justin Bieber",
      imgUrl: "https://miro.medium.com/max/320/0*jfJeWbzVcwZ06Sok.jpg",
      uri: require("../assets/tracks/yummy.mp3"),
    },
    {
      id: 7,
      title: "--Memories--",
      artist: "Maroon 5",
      imgUrl:
        "https://i.pinimg.com/originals/cd/aa/05/cdaa058c0a461a049231d2e55e3d97a9.jpg",
      uri: require("../assets/tracks/Memories.mp3"),
    },
    {
      id: 8,
      title: "--Señorita--",
      artist: "Shawn Mendes, Camila Cabello",
      imgUrl:
        "https://image.winudf.com/v2/image1/Y29tLmF1dG9xdW90ZS5zZW5vcml0YV9zY3JlZW5fMF8xNTYzNDI2NjE3XzA0Mw/screen-0.jpg?fakeurl=1&type=.jpg",
      uri: require("../assets/tracks/Señorita.mp3"),
    },
    {
      id: 9,
      title: "On My Way",
      artist: "Alan Walker, Sabrina Carpenter & Farruko",
      imgUrl:
        "https://i.pinimg.com/564x/7c/80/99/7c80994ce0f9d0a5a9e25480cbdd1078.jpg",
      uri: require("../assets/tracks/On_My_Way.mp3"),
    },
    {
      id: 10,
      title: "--Alone--",
      artist: "Alan Walker, Ava Max",
      imgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNobdNp3e6tFoUzhlRXiSFXntOdvel7DP_Aw&usqp=CAU",
      uri: require("../assets/tracks/Alone.mp3"),
    },
  ];

  const [favourites, setFavourites] = useState([]);
  const [recents, setRecents] = useState([]);

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
    if (heartType === "heart-plus-outline") {
      setHeartType("heart-minus");
      favourites.push({
        id: id,
        title: title,
        artist: artist,
        imgUrl: img,
        uri: uri,
      });
    } else {
      setHeartType("heart-plus-outline");
      try {
        const updatedFav = favourites.filter((fav) => fav.id !== id);
        setFavourites(updatedFav);
      } catch (error) {
        console.log("not present");
      }
    }
  };

  const handleRecent = (item) => {
    if (!recents.some((r) => r.id === id)) {
      recents.push({
        id: item.id,
        title: item.title,
        artist: item.artist,
        imgUrl: item.imgUrl,
        uri: item.uri,
      });
    }
  };

  useEffect(() => {
    callback1(favourites);
    callback2(recents);
  }, [favourites, recents]);

  return (
    <FlatList
      data={playList}
      keyExtractor={(music) => music.id.toString()}
      renderItem={({ item }) => (
        <Listing
          id={item.id}
          title={item.title}
          artist={item.artist}
          song={item.uri}
          img={item.imgUrl}
          uri={item.uri}
          onPress={() => {
            handleRecent(item);
            callback3(item, playList);
          }}
          callback={handleFav}
        />
      )}
    />
  );
}

export default PlayListScreen;
