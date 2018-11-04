<template>
<keep-alive>
    <div id="app">
        <div ref="gameMain">
        </div>
        <SwiperBoard class="SwiperDialog"  @StartHardGarm="ControlHardGarm" v-if="ControlHardDialog"></SwiperBoard>
    </div>
    </keep-alive>
</template>
<script>
// import { createdSprite } from "../src/components/Pages/Common.js";
import SwiperBoard from "@/components/Pages/SwiperBoard";
import { SceneManager, Garbage } from "@/lib/EasyPIXI.js";
import HomePages from "@/components/Pages/HomePages.js";
import EasyGameSelectPages from "@/components/Pages/EasyGameSelectPages.js";
import EasyGameIntroPages from "@/components/Pages/EasyGameIntroPages.js";
import EasyGamePlayingPages from "@/components/Pages/EasyGamePlayingPages.js";
import HardGamePlayingPages from "@/components/Pages/HardGamePlayingPages.js";
import EasyGameSelectAndIntroduce from "@/components/Pages/EasyGameSelectAndIntroduce.js";
var CanvasApp;
export default {
  name: "app",
  components: {
    SwiperBoard
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      Waster: null,
      HardObject: {},
      ControlHardDialog: false,
      LoadingAgain: true
    };
  },
  beforeCreate() {
    PIXI.utils.skipHello();
    Garbage.setGarBage("startPlayHardGame", false);
  },
  mounted() {
    this.createCanvasApp();
  },
  methods: {
    ControlHardGarm() {
      this.ControlHardDialog = false;
    },
    createCanvasApp() {
      var self = this;
      CanvasApp = new PIXI.Application({
        width: 1920,
        height: 1080
      });
      CanvasApp.view.style.position = "relative";
      CanvasApp.view.style.width = "100%";
      CanvasApp.view.style.height = "100%";
      CanvasApp.renderer.backgroundImage = "url(./img/timg.png)";
      this.$refs.gameMain.appendChild(CanvasApp.view);
      Garbage.setGarBage("vueInstance", self);
      SceneManager.App = CanvasApp;
      SceneManager.stage = CanvasApp.stage;
      this.gameStart().then(() => {
        //单个页面测试
        //SceneManager.run(new HomePages());
        //SceneManager.run(new EasyGameSelectAndIntroduce());
        //SceneManager.run("EasyGameSelectPages");
        //SceneManager.run(new EasyGameIntroPages());
        //SceneManager.run(new EasyGamePlayingPages());
        SceneManager.run(new HardGamePlayingPages());
      });
    },
    async gameStart() {
      await this.getPromise_resource();
      //这是网路缓慢弹窗事件
      document
        .getElementsByClassName("gameLoadingContainer")[0]
        .parentNode.removeChild(
          document.getElementsByClassName("gameLoadingContainer")[0]
        );

      if (document.getElementById("netbadbackground")) {
        document
          .getElementById("netbadbackground")
          .parentNode.removeChild(document.getElementById("netbadbackground"));
      }
      console.log("游戏资源加载完毕");
    },
    //这是网络缓慢时弹窗事件结束
    getPromise_resource() {
      var self = this;

      // if (Garbage.getGarBage("LoadingAgain")) {
      //   this.LoadingAgain = false;
      // }
      return new Promise(resolve => {
        //if (this.LoadingAgain) {
        Garbage.setGarBage("LoadingAgain", true);
        self.axios.get("./gameresource.json").then(response => {
          this.Waster = response.data;
          PIXI.loader
            .add(response.data)
            .on("progress", loader => {
              if (document.getElementById("loadingPosition")) {
                document.getElementById("ProMid").style.width =
                  loader.progress * 0.0495 + 0.3 + "rem";
                document.getElementById("ProLef").style.left =
                  loader.progress * 2.472 + 48.8 + "%";
              }
            })
            .load(() => {
              resolve();
            });
        });
        // } else {
        //   console.log("已经加载了...");
        // }
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
.SwiperDialog {
  position: absolute;
  top: 0rem;
}
</style>