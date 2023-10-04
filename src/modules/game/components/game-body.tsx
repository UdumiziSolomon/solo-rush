import {
  Pressable,
  View,
  Dimensions,
  Animated,
  Easing,
  Modal,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import { ScaledSheet, ms } from "react-native-size-matters";
import { FontAwesome } from "@expo/vector-icons";
import GameOverModal from "./game-over.modal";
import { useNavigation } from "@react-navigation/native";
import { usePointsState, useScoreState } from "../state/score-points";
import { useGameLevelState, useLevelPointState } from "modules/home/state/home-state";

const { height } = Dimensions.get("window");
const loader = require('../../../resources/box.gif');

const GameBody = () => {
  const { navigate } = useNavigation<any>();
  // store
  const score = useScoreState(st => st.value);
  const updateScore = useScoreState(st => st.updateScore);
  const clearScore = useScoreState(st => st.clearScore);
  const updatePoints = usePointsState(st => st.updatePoints);
  const {currentLevel, currentLevelValue} = useGameLevelState(st => st);
  const [gameDuration, setGameDuration] = useState<number>(currentLevelValue);
  

  const updateLevelPoint = useLevelPointState(st => st.updateLevelPoint);

  const ballColors = ["#d85c3c", "#46720c", "#eee53b", "#336699"];
  const [position, setPosition] = useState<number>(45);
  const [balls, setBalls] = useState<Animated.Value[]>([]);
  const [ballColor, setBallColor] = useState<string>("#d85c3c");
  const [presentColor, setPresentColor] = useState("#d85c3c");
  const [cIndex, setCIndex] = useState<number>(0);
  const [animation, setAnimation] = useState<any>(null);
  const [restart, setRestart] = useState<boolean>(false);

  const presentColorRef = useRef(presentColor);
  const durationRef = useRef<number>(gameDuration);
  const intervalRef = useRef(null);
  
  const performInterval = () => {
    if(gameDuration > 800) {
      setGameDuration((prevDuration: any) => prevDuration - 100);
    }else {
      setGameDuration(800);
    }
  }

  setInterval(performInterval, 10000);

   const stopUpdateLevelInterval = () => {
    clearInterval(intervalRef.current);
  };  
  0d1321
  const backwardSwapHandler = () => {
    setPosition((prevPosition: number) => prevPosition - 90);
    let newIndex = cIndex - 1;
    if (newIndex < 0) {
      newIndex = ballColors.length - 1;
    }
    setCIndex(newIndex);
    setPresentColor(ballColors[newIndex]);
    presentColorRef.current = ballColors[newIndex];
  };

  const forwardSwapHandler = () => {
    setPosition((prevPosition: number) => prevPosition + 90);
    let newIndex = cIndex + 1;
    if (newIndex >= ballColors.length) {
      newIndex = 0;
    }
    setCIndex(newIndex);
    setPresentColor(ballColors[newIndex]);
    presentColorRef.current = ballColors[newIndex];
  };

  useEffect(() => {
  const intervalId = setInterval(performInterval, 10000);
    startBallDrop();

    // Cleanup: Stop the fn's when the component unmounts
    return () => {
      clearInterval(intervalId);
      stopAnimation();
      stopUpdateLevelInterval();
      clearScore();
    };
  }, []);

  
  const startBallDrop = () => {
    const newBallPosition = new Animated.Value(0);
    const randomColor =
    ballColors[Math.floor(Math.random() * ballColors.length)];
    setBallColor(randomColor);

    const newAnimation = Animated.timing(newBallPosition, {
      toValue: height / 2.7,
      // duration: durationRef.current, 
      duraion: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    });

    setAnimation(newAnimation);

    newAnimation.start(result => {
      console.log(durationRef.current)
      if (result.finished) {
        if (randomColor === presentColorRef.current) {
          setBalls(prevBalls => prevBalls.slice(1));
          updateScore();
          startBallDrop();
        } else {
          stopUpdateLevelInterval()
          setRestart(true);
        }
      }
    });
    setBalls(prevBalls => [...prevBalls, newBallPosition]);
  };

  const stopAnimation = () => {
    if (animation) {
      animation.stop();
      setAnimation(null);
    }
  };

  const closeModal = (): void => {
    updatePoints(score);
    // updateLevelPoint(currentLevel, score);
    stopUpdateLevelInterval()
    navigate("Home");
    setRestart(false);
    clearScore();
  };

  const restartGame = (): void => {
    updatePoints(score);
    // updateLevelPoint(currentLevel, score);
    stopUpdateLevelInterval()
    setRestart(false);
    clearScore();
    setBalls([]);
    setBallColor("#d85c3c");
    setPresentColor("#d85c3c");
    setCIndex(0);
    setPosition(45);
    setRestart(false);
    // Start the game again
    startBallDrop();
  };

  if(gameDuration === undefined) {
    return null;
  }

  return (
    <View style={styles.wrapper}>
      <View style={{ marginTop: 5 }}>
        <View
          style={[
            styles.display,
            { backgroundColor: ballColor, borderColor: ballColor },
          ]}></View>
        <View
          style={[
            styles.display,
            { backgroundColor: presentColor, borderColor: presentColor },
          ]}></View>
      </View>

      <View style={styles.gameLayer}>
        <View style={styles.gamePlay}>
          <View style={styles.drop}>
            {balls.map((ball, index) => (
              <Animated.View
                key={index}
                style={[
                  styles.ball,
                  {
                    top: ball,
                    backgroundColor: ballColor,
                    borderColor: ballColor,
                  },
                ]}></Animated.View>
            ))}
          </View>
          <View style={styles.decide}>
            <Pressable
              onPress={forwardSwapHandler}
              style={[
                styles.squareLayer,
                {
                  transform: [{ rotate: `${position}deg` }],
                },
              ]}>
              <View style={styles.triangleTopLeft}></View>
              <View style={styles.triangleTopRight}></View>
              <View style={styles.triangleBottomLeft}></View>
              <View style={styles.triangleBottomRight}></View>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.tapFooter}>
        <View style={styles.tapLayer}>
          <Pressable style={styles.tap} onPress={backwardSwapHandler}>
            <FontAwesome name="hand-o-left" style={styles.tapIcon} />
          </Pressable>
        </View>
        <View style={styles.tapLayer}>
          <Pressable style={styles.tap} onPress={forwardSwapHandler}>
            <FontAwesome name="hand-o-right" style={styles.tapIcon} />
          </Pressable>
        </View>
      </View>

      {/* restart modal */}
      <Modal visible={restart} transparent={true} statusBarTranslucent={true}>
        <GameOverModal closeModal={closeModal} restartGame={restartGame} />
      </Modal>
    </View>
  );
};

export default GameBody;

const styles = ScaledSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#0d1321",
  },
  gameLayer: {
    flex: 1,
    backgroundColor: "#0d1321",
  },
  tapLayer: {
    transform: [{ rotate: "50deg" }],
  },
  tap: {
    borderWidth: 2,
    width: ms(70),
    aspectRatio: 1,
    borderRadius: ms(20),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: ms(25),
    backgroundColor: "#2c3e68",
    borderColor: "#5d7099",
  },
  tapIcon: {
    fontSize: ms(30),
    fontFamily: "Jose",
    color: "#ffffff",
    transform: [{ rotate: "-50deg" }],
  },
  tapFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  squareLayer: {
    width: ms(160),
    aspectRatio: 1,
    alignSelf: "center",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  triangleTopLeft: {
    width: "50%",
    height: "50%",
    backgroundColor: "#d85c3c",
    borderWidth: 2,
    borderColor: "white",
    borderTopLeftRadius: ms(20),
  },
  triangleTopRight: {
    width: "50%",
    height: "50%",
    backgroundColor: "#336699",
    borderWidth: 3,
    borderColor: "white",
    borderTopRightRadius: ms(20),
  },
  triangleBottomLeft: {
    width: "50%",
    height: "50%",
    backgroundColor: "#46720c",
    borderWidth: 3,
    borderColor: "white",
    borderBottomLeftRadius: ms(20),
  },
  triangleBottomRight: {
    width: "50%",
    height: "50%",
    backgroundColor: "#eee53b",
    borderWidth: 3,
    borderColor: "white",
    borderBottomRightRadius: ms(20),
  },
  gamePlay: {
    backgroundColor: "#0d1321",
    height: height,
  },
  ball: {
    width: ms(30),
    aspectRatio: 1,
    borderRadius: ms(10),
    borderWidth: 5,
    alignSelf: "center",
    transform: [{ rotate: "45deg" }],
  },
  decide: {
    paddingVertical: ms(30),
  },
  drop: {
    height: height / 2.5,
  },
  display: {
    width: ms(40),
    height: ms(20),
    marginVertical: ms(2),
    marginHorizontal: ms(20),
    borderRadius: ms(5),
    borderWidth: 1,
  },
});
