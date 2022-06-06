import "dotenv/config";

export default {
  expo: {
    name: "parkr",
    slug: "parkr",
    version: "1.0.0",
    orientation: "portrait",
    scheme: "parkr",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/Logo_BIG.png",
      // resizeMode: "contain",
      // backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
      databaseURL: process.env.DATABASE_URL,
      s3AccessKey: process.env.S3_ACCESS_KEY,
      s3SecretKey: process.env.S3_SECRET_KEY,
    },
    packagerOpts: {
      sourceExts: ["js", "json", "ts", "tsx", "jsx", "vue"],
      config: "metro.config.js",
    },
  },
};
