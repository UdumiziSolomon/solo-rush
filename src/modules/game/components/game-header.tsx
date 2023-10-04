import { Text, View, Dimensions, Pressable } from 'react-native'
import React from 'react'
import { ScaledSheet, ms } from 'react-native-size-matters';
import { Points } from 'components/points';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useScoreState } from '../state/score-points';
import { useGameLevelState } from 'modules/home/state/home-state';

const { width } = Dimensions.get('window');

const GameHeader = () => {
  const { goBack } = useNavigation<any>();
  // store
  const score = useScoreState(st => st.value);
  const clearScore = useScoreState(st => st.clearScore);
  const currentLevel = useGameLevelState(st => st.currentLevel);

  const backHandler = (): void => {
    clearScore();
    goBack();
  }
  return (
    <View style={styles.wrapper}>
      <Pressable>
        <MaterialCommunityIcons name="keyboard-backspace" size={ms(25)} onPress={backHandler} color={"#fff"} />
      </Pressable>
      <Text style={styles.scoreText}>Score: {score}</Text>
      <Text style={styles.scoreText}>Mode: {currentLevel}</Text>
      <Points />
    </View>
  )
}

export default GameHeader

const styles = ScaledSheet.create({
  wrapper: {
    width: width,
    height: ms(50),
    borderBottomWidth: 2,
    borderBottomColor: '#283041',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: ms(15),
    backgroundColor: '#0d1321',
  },
  scoreText: {
    fontSize: ms(15),
    fontFamily: "Jose",
    color: "#fff",
  },
})