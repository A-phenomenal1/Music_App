import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ImageBackground,
  StatusBar,
} from "react-native";
import { Audio } from "expo-av";
import Slider from "@react-native-community/slider";

import AppText from "../components/AppText";
import IconBtn from "../components/IconBtn";
import color from "../utilities/color";

function PlayScreen({ id, title, artist, img, list }) {
  const [effect, setEffect] = useState({
    isButtonPress: "rep", //initially repeat is on
    repClr: color.primary1,
    isPlayPress: false,
    playIcon: "pause-circle",
    playClr: color.primary1,
    shuffleClr: color.light1,
  });
  const [volume, setVolume] = useState({
    isVolPress: "on", // initially volume is high
    off: color.light1,
    on: color.primary3,
  });
  const [state, setState] = useState({
    isPlaying: true,
    playbackInstance: null,
    currentIndex: id,
    volume: 1.0,
    isBuffering: true,
  });
  const [songStatus, setSongStatus] = useState({
    sliderValue: 0,
    duration: 0,
    currentTime: 0,
    songTime: 0,
  });
  const [reLoading, setReLoading] = useState(); // it takes current time of music and pass to loading

  const handleRepeatShuffle = () => {
    effect.isButtonPress === "rep"
      ? setEffect((prevState) => {
          return {
            ...prevState,
            isButtonPress: "shuffle",
            repClr: color.light1,
            shuffleClr: color.primary1,
          };
        })
      : setEffect((prevState) => {
          return {
            ...prevState,
            isButtonPress: "rep",
            repClr: color.primary1,
            shuffleClr: color.light1,
          };
        });
  };
  const handleBackward = async () => {
    let { playbackInstance, currentIndex } = state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      list !== undefined
        ? currentIndex <= list.length
          ? (currentIndex -= 1)
          : (currentIndex = 1)
        : loadAudio();
      currentIndex <= 0 ? (currentIndex = list.length + currentIndex) : null;
      await setSongStatus((currState) => ({
        ...currState,
        currentTime: 0,
      }));
      setState((currState) => ({
        ...currState,
        currentIndex,
      }));
    }
  };

  const handlePlayPause = async () => {
    const { isPlaying, playbackInstance } = state;
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();
    isPlaying === false
      ? setEffect((prevState) => {
          return {
            ...prevState,
            playIcon: "pause-circle",
          };
        })
      : setEffect((prevState) => {
          return {
            ...prevState,
            playIcon: "play-circle",
          };
        });
    setState((currState) => ({
      ...currState,
      isPlaying: !isPlaying,
    }));
  };

  const handleForward = async () => {
    let { playbackInstance, currentIndex } = state;
    if (playbackInstance) {
      await playbackInstance.unloadAsync();
      list !== undefined
        ? currentIndex < list.length
          ? (currentIndex += 1)
          : (currentIndex = 1)
        : loadAudio();
      await setSongStatus((currState) => ({
        ...currState,
        currentTime: 0,
      }));
      setState((currState) => ({
        ...currState,
        currentIndex,
      }));
    }
  };

  const handleVolume = async () => {
    let { playbackInstance } = state;
    await playbackInstance.unloadAsync();
    volume.isVolPress === "on"
      ? setVolume({ isVolPress: "off", off: color.primary3, on: color.light1 })
      : setVolume({ isVolPress: "on", off: color.light1, on: color.primary3 });
    volume.isVolPress === "off" // isVolPressed is still on
      ? setState((currState) => ({ ...currState, volume: 1.0 }))
      : setState((currState) => ({ ...currState, volume: 0.0 }));
    setReLoading(songStatus.currentTime);
  };

  const timeStructure = (e) => {
    let ms = parseInt((e % 1000) / 100),
      ss = Math.floor((e / 1000) % 60),
      mm = Math.floor((e / (1000 * 60)) % 60),
      hh = Math.floor((e / (1000 * 60 * 60)) % 24);

    hh = hh < 10 ? "0" + hh : hh;
    mm = mm < 10 ? "0" + mm : mm;
    ss = ss < 10 ? "0" + ss : ss;
    if (hh === "00") return mm + ":" + ss;
    else return hh + ":" + mm + ":" + ss;
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
          playsInSilentModeIOS: true,
          interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
          shouldDuckAndroid: false,
          staysActiveInBackground: true,
          playThroughEarpieceAndroid: false,
        });
        loadAudio();
      } catch (e) {
        console.log(e);
      }
    };
    loadData();
  }, [state.currentIndex, reLoading]);

  const loadAudio = async () => {
    const { isPlaying, volume, playbackInstance } = state;
    if (playbackInstance != null) {
      await playbackInstance.unloadAsync();
      playbackInstance.setOnPlaybackStatusUpdate(null);
      setState((currState) => ({ ...currState, playbackInstance: null }));
    }
    try {
      const playbackInstance = new Audio.Sound();
      let currSong = 0;
      list === undefined
        ? (currSong = require("../assets/tracks/Hold_me_Close.mp3"))
        : (currSong = list[state.currentIndex - 1].uri);
      const source = currSong;
      const status = {
        positionMillis: songStatus.currentTime,
        shouldPlay: isPlaying,
        volume: volume,
      };
      await playbackInstance.unloadAsync();
      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      const track = await playbackInstance.loadAsync(source, status, false);
      const endTime = timeStructure(track.durationMillis);
      setSongStatus((currState) => ({
        ...currState,
        duration: endTime,
        songTime: track.durationMillis,
      }));
      setState((curState) => ({
        ...curState,
        playbackInstance,
      }));
    } catch (e) {
      console.log(e);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setState((curState) => ({
      ...curState,
      isBuffering: status.isBuffering,
    }));
    status.durationMillis !== undefined
      ? setSongStatus((currState) => ({
          ...currState,
          sliderValue: status.positionMillis / status.durationMillis,
          currentTime: status.positionMillis,
        }))
      : null;
    if (status.didJustFinish) {
      state.playbackInstance.unloadAsync();
    }
  };

  const handleProgressBar = async (e) => {
    let { playbackInstance } = state;
    await playbackInstance.unloadAsync();
    setSongStatus((currState) => ({
      ...currState,
      currentTime: e * songStatus.songTime,
    }));
    setReLoading(e);
  };
  if (state.playbackInstance !== null)
    effect.isButtonPress === "shuffle"
      ? songStatus.currentTime === songStatus.songTime
        ? handleForward()
        : null
      : songStatus.currentTime === songStatus.songTime
      ? state.playbackInstance.replayAsync()
      : null;

  if (title !== undefined) {
    let { currentIndex } = state;
    id = list[currentIndex - 1].id;
    title = list[currentIndex - 1].title;
    artist = list[currentIndex - 1].artist;
    img = list[currentIndex - 1].imgUrl;
  }

  img === undefined
    ? (img =
        "https://s3.amazonaws.com/libapps/accounts/42231/images/cover_blue_2014.jpg")
    : null;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: img,
        }}
        resizeMode="cover"
        blurRadius={8}
        style={styles.bgImg}
      >
        <View style={styles.child}>
          <StatusBar
            backgroundColor={color.primary3}
            barStyle="light-content"
          />
          <View style={styles.songCover}>
            <Image
              source={{ uri: img }}
              resizeMode="cover"
              style={styles.coverImg}
            />
          </View>
          <View style={styles.detailCont}>
            <AppText style={styles.songName} numberOfLines={1}>
              {title ? title : "Hold me Close"}
            </AppText>
            <View style={styles.artistCont}>
              <AppText style={styles.artist} numberOfLines={1}>
                {artist ? artist : "Ella Henderson, Sam Feldt"}
              </AppText>
            </View>
          </View>
          <View style={styles.btnsCont}>
            <IconBtn
              iconName="twitter-retweet"
              iconColor={effect.repClr}
              size={30}
              onPress={handleRepeatShuffle}
            />
            <IconBtn
              iconName="skip-backward"
              size={35}
              onPress={handleBackward}
            />
            <IconBtn
              iconName={effect.playIcon}
              iconColor={effect.playClr}
              size={70}
              onPress={handlePlayPause}
            />
            <IconBtn
              iconName="skip-forward"
              size={35}
              onPress={handleForward}
            />
            <IconBtn
              iconName="shuffle"
              iconColor={effect.shuffleClr}
              size={30}
              onPress={handleRepeatShuffle}
            />
          </View>
          <View style={styles.songStatus}>
            <IconBtn
              iconName="volume-low"
              iconColor={volume.off}
              onPress={handleVolume}
            />
            <View style={styles.status}>
              <View style={styles.time}>
                <AppText style={styles.txt}>
                  {timeStructure(songStatus.currentTime)}
                </AppText>
                <View style={{ flex: 1 }} />
                <AppText style={styles.txt}>{songStatus.duration}</AppText>
              </View>
              <Slider
                minimumTrackTintColor={color.primary1}
                maximumTrackTintColor={color.secondary2}
                minimumValue={0}
                maximumValue={1}
                value={songStatus.sliderValue}
                thumbTintColor={color.white}
                onSlidingComplete={(val) => {
                  handleProgressBar(val);
                }}
              />
            </View>
            <IconBtn
              iconName="volume-high"
              iconColor={volume.on}
              onPress={handleVolume}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  artist: {
    fontSize: 17,
    fontFamily: "Roboto",
    fontWeight: "500",
    color: color.light,
    width: "90%",
  },
  artistCont: {
    alignItems: "center",
  },
  bgImg: {
    width: "100%",
    height: "100%",
  },
  btnsCont: {
    height: "10%",
    backgroundColor: "rgba(0,0,0,0.2)",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  container: {
    display: "flex",
    flexDirection: "column",
  },
  coverImg: {
    width: 250,
    height: 250,
    marginTop: 20,
    overflow: "hidden",
    borderRadius: 125,
    borderColor: color.primary1,
    borderWidth: 2,
  },
  child: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  detailCont: {
    height: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  songName: {
    fontSize: 25,
    fontFamily: "Roboto",
    fontWeight: "bold",
    color: color.secondary3,
  },
  songCover: {
    height: "55%",
    justifyContent: "center",
    alignItems: "center",
  },
  songStatus: {
    bottom: 10,
    paddingHorizontal: 10,
    height: "20%",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  status: {
    justifyContent: "flex-end",
    flex: 1,
    height: "20%",
    borderRadius: 30,
    flexDirection: "column",
  },
  txt: {
    marginHorizontal: 10,
    fontFamily: "Roboto",
    fontSize: 15,
    fontWeight: "600",
    color: color.secondary4,
  },
  time: {
    flexDirection: "row",
  },
});

export default PlayScreen;
