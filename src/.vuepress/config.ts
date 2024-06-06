import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "",
    //   description: "veeooo's blog",
    // },
    "/": {
      lang: "zh-CN",
      title: "",
      description: "veeooo 的博客",
    },
    // "/en/": {
    //   lang: "en-US",
    //   title: "",
    //   description: "veeooo's blog",
    // },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
