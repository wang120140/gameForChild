<template>
    <div id="app">
        <div ref="gameMain">
        </div>
        <!-- <div>
            <img   :src="`${baseUrl}img/bggame.jpg`"/>
        </div> -->
    </div>
</template>
<script>
import GameBoot from "@/components/GameBoot.js";
import GameMain from "@/components/GameMain.js";
import { SceneManager } from "@/lib/EasyPIXI.js";
//添加
//import HomePage from "@/components/Pages/HomePage.js";
//import EasyGameSelectPage from "@/components/Pages/EasyGameSelectPage.js";
//import EasyGameIntroPage from "@/components/Pages/EasyGameIntroPage.js";
//import PayGame from "@/components/Pages/PayGame.js";
//第一次优化
import {
  HomePages,
  EasyGameSelectPages,
  EasyGameIntroPages,
  EasyGamePlayingPages,
  HardGamePlayingPages
} from "@/components/Game.js";
var CanvasApp;
export default {
  name: "app",
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
      SceneManager.pushScene("main", new GameMain());
      // SceneManager.pushScene("homePage", new HomePage());
      // SceneManager.pushScene("EasyGameSelectPage", new EasyGameSelectPage());
      // SceneManager.pushScene("EasyGameIntroPage", new EasyGameIntroPage());
      // SceneManager.pushScene("PayGame", new PayGame());
      //第二次修改
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

      this.gameStart().then(() => {
        //SceneManager.run("homePage");
        //SceneManager.run("EasyGameSelectPage");
        SceneManager.run("HomePages");
        //SceneManager.run("HardGamePlayingPages");
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