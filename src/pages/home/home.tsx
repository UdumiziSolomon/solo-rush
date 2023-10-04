import {
  Text,
  View,
  Dimensions,
  ScrollView,
  Pressable,
  BackHandler,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { ScaledSheet, ms } from "react-native-size-matters";
import { Button, Points } from "../../components";

import Money from "svgs/game.svg";
import { ListItems } from "modules/home/data/home-options";
import PlaySound from "components/play-sound";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSoundState } from "modules/home/state/home-state";
import GameLevel from "modules/home/components/game-level";

const { width, height } = Dimensions.get("window");

const Home = () => {
  const { navigate } = useNavigation<any>();
  const updateSound = useSoundState(st => st.updateSound);
  const useSound = useSoundState(st => st.sound);

  const [gLevel, setGLevel] = useState<boolean>(false);

  const OptionHandler = (label: string): void => {
    if (label === "Best Scores") {
      navigate("BestScores");
    } else if (label === "Game Level") {
      setGLevel(true);
    } else {
      exitApp();
    }
  };

  const StartGameHandler = (): void => {
    navigate("Game");
  };

  const exitApp = (): void => {
    BackHandler.exitApp();
  };

  const closeModal = (): void => {
    setGLevel(false);
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.points}>
        <PlaySound
          file={require("../../resources/sounds/gameplay.wav")}
          infinite={true}
        />
        {!useSound ? (
          <Fontisto
            name="volume-off"
            onPress={updateSound}
            style={styles.muteIcon}
          />
        ) : (
          <Fontisto
            name="volume-up"
            onPress={updateSound}
            style={styles.muteIcon}
          />
        )}
        <Points />
      </View>
      <View style={styles.introLayer}>
        <Money width={250} height={250} />
      </View>
      <Text style={styles.headerText}> SOLO RUSH</Text>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.flexWrapper}>
          {ListItems.map((item: any, index: number) => {
            const { icon, label, onPress } = item;
            return (
              <Pressable
                key={String(index)}
                onPress={() => OptionHandler(label)}
                style={styles.list}>
                <View>{icon}</View>
                <Text style={styles.label}>{label}</Text>
              </Pressable>
            );
          })}
        </View>
        <Button buttonText="Start Game" onPress={StartGameHandler} />
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: ms(10), justifyContent: 'center'}}>
          <Text style={styles.on}>Powered by</Text>
          <Text style={styles.onn}>Solonode @2023</Text>
        </View>
      </ScrollView>
      <Modal visible={gLevel} transparent={true} statusBarTranslucent={true}>
        <GameLevel closeModal={closeModal} />
      </Modal>
    </View>
  );
};

export default Home;

const styles = ScaledSheet.create({
  wrapper: {
    backgroundColor: "#0d1321",
    height: height,
    width: width,
    alignItems: "center",
    paddingTop: ms(30),
  },
  headerText: {
    fontSize: ms(32),
    textAlign: "center",
    marginTop: ms(20),
    fontFamily: "Young",
    color: "#adb4c4",
  },
  label: {
    fontSize: ms(13),
    marginVertical: ms(5),
    fontFamily: "Sofia",
    color: "#adb4c4",
  },
  flexWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: width,
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: ms(30),
  },
  list: {
    borderWidth: 1,
    borderColor: "#192032",
    alignItems: "center",
    justifyContent: "center",
    margin: ms(5),
    borderRadius: ms(10),
    width: ms(100),
    aspectRatio: 1,
  },
  points: {
    width: width,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: ms(40),
  },
  muteIcon: {
    fontSize: ms(20),
    color: "#fff",
  },
  introLayer: {
    backgroundColor: "#ccd3e3",
    borderRadius: ms(250),
    marginTop: ms(20),
    borderStyle: "dashed",
    borderWidth: 3,
    borderColor: "#90a1c9",
  },
  on: {
    fontFamily: "Jose",
    color: "#adb4c4",
    fontSize: ms(15),
  },
  onn: {
    fontFamily: "Young",
    color: "#7694bbcc",
    marginLeft: ms(3),
    fontSize: ms(14),
  }
});
