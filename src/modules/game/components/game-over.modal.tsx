import { Pressable, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
import { ScaledSheet, ms } from 'react-native-size-matters';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useScoreState } from '../state/score-points';

const { width } = Dimensions.get('window');

type GameOverProps = {
  closeModal?: () => void;
  restartGame?: () => void;
}

const GameOverModal = ({ closeModal, restartGame }: GameOverProps) => {
  const score = useScoreState(st => st.value);
  return (
    <View style={styles.wrapper}>
      <View style={styles.modal}>
        <Image source={require('svgs/gp.png')} style={styles.image} resizeMode="contain" />
        <Text style={styles.over}>Game Over</Text>
        <Text style={styles.scoreText}>Score: {score}</Text>
        
        <View style={styles.button}>
          <Pressable onPress={restartGame} style={styles.layer}>
            <MaterialCommunityIcons name="refresh" style={styles.btnIcons} />
            <Text style={styles.btnText}>Restart</Text>
          </Pressable>
          <Pressable onPress={closeModal} style={styles.layer}>
            <MaterialCommunityIcons name="home-lightning-bolt-outline" style={styles.btnIcons} />
            <Text style={styles.btnText}>Home</Text>
          </Pressable>
        </View>

      </View>
    </View>
  )
}

export default GameOverModal

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(38, 51, 79, 0.7)',
  },
  modal: {
    width: width - 30,
    backgroundColor: '#0d1321',
    paddingVertical: ms(20),
    borderRadius: ms(20),
    paddingHorizontal: ms(10),
  },
  over: {
    fontSize: ms(22),
    textAlign: "center",
    marginVertical: ms(2),
    fontFamily: "Young",
    color: '#fff',
  },
  scoreText: {
    fontSize: ms(19),
    textAlign: "center",
    fontFamily: "Jose",
    color: "#fff",
  },
  layer: {
    borderRadius: ms(10),
    backgroundColor: '#2c3e68',
    paddingHorizontal: ms(30),
    paddingVertical: ms(10),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: ms(20),
  },
  btnIcons: {
    fontSize: ms(30),
    textAlign: 'center',
    color: '#fff',

  },
  btnText: {
    fontSize: ms(13),
    textAlign: "center",
    fontFamily: "Sofia",
    color: '#fff',
  },
  image: {
    width: ms(120),
    height: ms(120),
    alignSelf: 'center',
  }
})