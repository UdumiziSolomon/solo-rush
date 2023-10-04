import { Text, View } from "react-native";
import React, { useState } from "react";
import { ScaledSheet, ms } from "react-native-size-matters";
import { GameHeader, GameBody } from "modules/game";

const Game = () => {
  return (
    <View style={styles.wrapper}>
      <GameHeader />
      <GameBody />
    </View>
  );
};

export default Game;

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
