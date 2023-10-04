import { GestureHandlerRootView } from "react-native-gesture-handler";

import { StyleSheet, Platform, StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import useLoadApp from "hooks/use-load-app";
import GameStack from "navigations/game-stack";

const App = () => {
  const isAppReady = useLoadApp();
  if (!isAppReady) return null;

  return (
    <View style={styles.container}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor={"#0d1321"}
          />
          <GameStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 40,
    backgroundColor: '#0d1321',
  },
});

export default App;
