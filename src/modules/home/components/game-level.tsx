import { Pressable, Text, View, Dimensions } from "react-native";
import React, { useState } from "react";
import { ScaledSheet, ms } from "react-native-size-matters";
import { GameLevelEnum, useGameLevelState } from "../state/home-state";

const { width } = Dimensions.get("window");

type LevelsProp = {
  level: string;
  value: number;
}

const Levels: LevelsProp[] = [
  {
    level: 'Easy',
    value: 4000
  },
  {
    level: 'Medium',
    value: 3000
  },
  {
    level: 'Hard',
    value: 2000
  },
];

type GameProps = {
  closeModal?: () => void;
};

const GameLevel = ({ closeModal }: GameProps) => {
  const currentLevel = useGameLevelState(st => st.currentLevel);
  const updateLevelGameLevel = useGameLevelState(st => st.updateLevel);

  return (
    <View style={styles.wrapper}>
      <View style={styles.modal}>
        <Text style={styles.topText}>Game Mode</Text>
        <Text style={styles.subText}>Select your Difficulty</Text>
        <View style={styles.levelWrapper}>
          {Levels.map((item, index: number)=> {
            const { level, value} = item;
            return (
              <Pressable
                onPress={() => updateLevelGameLevel(level, value)}
                key={String(index)}
                style={styles.level}>
                <Text style={styles.levelText}>{level}</Text>
                <Pressable
                  onPress={() => updateLevelGameLevel(level, value)}
                  style={[
                    styles.radBtn,
                    {
                      backgroundColor:
                        level === currentLevel ? "#36ac" : "#fff",
                    },
                  ]}
                />
              </Pressable>
            )
          })}
        </View>

        <Pressable onPress={closeModal} style={styles.close}>
          <Text style={styles.closeText}>Continue </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default GameLevel;

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(38, 51, 79, 0.7)",
  },
  modal: {
    width: width - 30,
    backgroundColor: "#0d1321",
    paddingVertical: ms(20),
    borderRadius: ms(20),
    paddingHorizontal: ms(10),
    justifyContent: "center",
    alignItems: "center",
  },
  topText: {
    fontSize: ms(23),
    marginTop: ms(5),
    fontFamily: "Young",
    color: "#adb4c4",
  },
  subText: {
    fontSize: ms(15),
    fontFamily: "Sofia",
    color: "#adb4c4",
  },
  close: {
    paddingVertical: ms(14),
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: ms(20),
    marginVertical: ms(20),
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#ccd3e3",
    width: width / 3,
  },
  closeText: {
    fontSize: ms(16),
    fontFamily: "Sofia",
    color: "#0d1321",
  },
  levelWrapper: {
    marginTop: ms(20),
  },
  level: {
    width: width / 2,
    marginVertical: ms(10),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  levelText: {
    fontSize: ms(16),
    fontFamily: "Young",
    color: "#ccd3e3",
  },
  radBtn: {
    width: ms(20),
    height: ms(20),
    borderRadius: ms(20),
  },
});
