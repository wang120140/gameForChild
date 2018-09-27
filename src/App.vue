<template>
    <div id="app">
        <div ref="gameMain">
        </div>
        <!-- <div>
            <img   :src="`${baseUrl}img/bggame.jpg`"/>
        </div> -->
       <!-- <SwiperBoard></SwiperBoard> -->
    </div>
</template>
<script>
import SwiperBoard from "@/components/Pages/SwiperBoard";
import GameBoot from "@/components/GameBoot.js";
import { SceneManager } from "@/lib/EasyPIXI.js";
import HomePages from "@/components/Pages/HomePages.js";
import EasyGameSelectPages from "@/components/Pages/EasyGameSelectPages.js";
import EasyGameIntroPages from "@/components/Pages/EasyGameIntroPages.js";
import EasyGamePlayingPages from "@/components/Pages/EasyGamePlayingPages.js";
import HardGamePlayingPages from "@/components/Pages/HardGamePlayingPages.js";
//测试GSAP
import TestGSAP from "@/components/Pages/TestGSAP.js";
// import {
//   HomePages,
//   EasyGameSelectPages,
//   EasyGameIntroPages,
//   EasyGamePlayingPages,
//   HardGamePlayingPages
// } from "@/components/GameMain.js";

import {
  Dialog,
  DialogTime,
  DialogSummary,
  DialogSwiper
} from "@/components/Pages/Dialog.js";
var CanvasApp;
export default {
  name: "app",
  components: {
    SwiperBoard
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      Waster: []
    };
  },
  beforeCreate() {
    PIXI.utils.skipHello();
  },
  mounted() {
    this.createCanvasApp();
    console.log("url>>>", this.baseUrl);
  },
  methods: {
    createCanvasApp() {
      CanvasApp = new PIXI.Application({
        width: 1920,
        height: 1080
      });
      CanvasApp.view.style.position = "relative";
      CanvasApp.view.style.width = "100%";
      CanvasApp.view.style.height = "100%";
      CanvasApp.renderer.backgroundImage = "url(./img/timg.png)";
      this.$refs.gameMain.appendChild(CanvasApp.view);
      SceneManager.App = CanvasApp;
      SceneManager.stage = CanvasApp.stage;
      SceneManager.pushScene("boot", new GameBoot());
      SceneManager.pushScene("HomePages", new HomePages());
      SceneManager.pushScene("EasyGameSelectPages", new EasyGameSelectPages());
      SceneManager.pushScene("EasyGameIntroPages", new EasyGameIntroPages());
      SceneManager.pushScene(
        "EasyGamePlayingPages",
        new EasyGamePlayingPages()
      );
      SceneManager.pushScene(
        "HardGamePlayingPages",
        new HardGamePlayingPages()
      );
      //测试弹出框使用
      SceneManager.pushScene("TestGSAP", new TestGSAP());
      SceneManager.pushScene("Dialog", new Dialog());
      SceneManager.pushScene("DialogTime", new DialogTime());
      SceneManager.pushScene("DialogSummary", new DialogSummary());
      SceneManager.pushScene("DialogSwiper", new DialogSwiper());
      this.gameStart().then(() => {
        //单个页面测试
        //SceneManager.run("HomePages");
        //SceneManager.run("EasyGameSelectPage");
        //SceneManager.run("EasyGameIntroPages");
        //SceneManager.run("EasyGamePlayingPages");
        SceneManager.run("HardGamePlayingPages");
        //SceneManager.run("TestGSAP");
        //SceneManager.run("Dialog");
        //SceneManager.run("DialogTime");
        //SceneManager.run("DialogSummary");
        //SceneManager.run("DialogSwiper");
      });
    },
    async gameStart() {
      await this.getPromise_resource();
      console.log("游戏资源加载完毕");
    },
    getPromise_resource() {
      var self = this;
      return new Promise(resolve => {
        self.axios.get("./gameresource.json").then(response => {
          this.Waster = response.data;
          PIXI.loader.add(response.data).load(() => {
            resolve();
          });
        });
      });
    }
  }
};
</script>
<style>
#app {
  position: absolute;
  width: 19.2rem;
  height: 10.8rem;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background: green;
}
</style>