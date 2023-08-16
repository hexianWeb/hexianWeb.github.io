import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "读后记",
    icon: "pen-to-square",
    link: "/posts/",
  },
  {
    text: "TypeScript 系列",
    icon: "fa-solid fa-t",
    link: "typeScript/",
  },
  {
    text: "JavaScript 系列",
    icon: "fa-brands fa-js",
    link: "javaScript/",
  },
  {
    text: "CSS 技巧系列",
    icon: "fa-brands fa-css3",
    link: "css/",
  },
  {
    text: "Vue系列",
    icon: "fa-brands fa-vuejs",
    link: "vuejs/",
  },
  {
    text: "Linux 常用指令备忘",
    icon: "fa-brands fa-vuejs",
    link: "linux/",
  },
]);
