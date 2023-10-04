import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Game from "pages/game/game";
import BestScores from "pages/best-scores";
import Home from "pages/home/home";

const GameNavigation  = createNativeStackNavigator();

const GameStack = () => {
  const { Navigator, Screen } = GameNavigation;
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Screen name="Home" component={Home} />
      <Screen name="Game" component={Game} />
      <Screen name="BestScores" component={BestScores} />
    </Navigator>
  );
};
export default GameStack;
