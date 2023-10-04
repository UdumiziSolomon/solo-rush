import { Text, View } from "react-native";
import React from "react";
import { ScaledSheet, ms } from "react-native-size-matters";

import Money from "svgs/money.svg";
import { usePointsState } from "modules/game/state/score-points";

export const Points = () => {
  const points = usePointsState(st => st.value);
  return (
    <View style={styles.wrapper}>
      <Money width={18} height={18} />
      <Text style={styles.pText}>{points}</Text>
    </View>
  );
};

const styles = ScaledSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  pText: {
    fontSize: ms(17),
    fontFamily: "Jose",
    color: "#fff",
    marginLeft: ms(5),
  },
});
