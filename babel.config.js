module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          root: ["."],
          extensions: [
            ".ios.js",
            ".android.js",
            ".js",
            ".ts",
            ".tsx",
            ".json",
            ".png",
            ".jpg",
            ".jsx",
          ],
          alias: {
            // This needs to be mirrored in tsconfig.json
            "assets": "./assets",
            "components": "./src/components",
            "hooks": "./src/hooks",
            "modules": "./src/modules",
            "navigations": "./src/navigations",
            "pages": "./src/pages",
            "svgs": "./src/svgs",
            "types": "./src/types",
            "utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
