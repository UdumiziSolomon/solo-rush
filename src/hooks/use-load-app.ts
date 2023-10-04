import React, { useState, useEffect } from "react";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import {
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
  FontAwesome,
  Fontisto,
} from "@expo/vector-icons";

const useLoadApp = (): boolean => {
  const [isAppReady, setIsAppReady] = useState<boolean>(false);

  const loadResources = async (): Promise<void> => {
    try {
      // holds splash screen until hideAsync is called
      SplashScreen.preventAutoHideAsync();
      // load resources (fonts,icons,...)
      await Font.loadAsync({
        Sofia: require("../resources/fonts/Sofia.otf"),
        Jose: require("../resources/fonts/Jose.ttf"),
        Young: require("../resources/fonts/Young.ttf"),
        ...Ionicons.font,
        ...MaterialCommunityIcons.font,
        ...Entypo.font,
        ...FontAwesome.font,
        ...Fontisto.font,
      });

      await new Promise(resolve => setTimeout(resolve, 5000));
      setIsAppReady(true);
      SplashScreen.hideAsync() // hide the splash screen
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  return isAppReady;
};

export default useLoadApp;
