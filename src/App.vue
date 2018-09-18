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
      this.gameStart().then(() => {
        SceneManager.run("main");
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
          // console.log(response.data);
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