<template>
    <div id="app">
       
        <div ref="gameMain">
        </div>
        <SwiperBoard class="SwiperDialog"  @StartHardGarm="ControlHardGarm" v-if="ControlHardDialog"></SwiperBoard>
        <!-- <div>
            <img   :src="`${baseUrl}img/bggame.jpg`"/>
        </div> -->
    </div>
</template>
<script>
import { createdSprite } from "../src/components/Pages/Common.js";
import SwiperBoard from "@/components/Pages/SwiperBoard";
import GameBoot from "@/components/GameBoot.js";
import { SceneManager, Garbage } from "@/lib/EasyPIXI.js";
import HomePages from "@/components/Pages/HomePages.js";
import EasyGameSelectPages from "@/components/Pages/EasyGameSelectPages.js";
import EasyGameIntroPages from "@/components/Pages/EasyGameIntroPages.js";
import EasyGamePlayingPages from "@/components/Pages/EasyGamePlayingPages.js";
import HardGamePlayingPages from "@/components/Pages/HardGamePlayingPages.js";
var CanvasApp;
export default {
  name: "app",
  components: {
    SwiperBoard
  },
  data() {
    return {
      baseUrl: process.env.BASE_URL,
      Waster: [],
      HardObject: {},
      ControlHardDialog: false
    };
  },
  beforeCreate() {
    PIXI.utils.skipHello();
    Garbage.setGarBage("startPlayHardGame", false);
  },
  //就是对弹窗进行说明事件
  created() {
    //   (function shown() {
    //     setTimeout(() => {
    //       if (document.getElementById("netbadbackground")) {
    //         document.getElementById("netbadbackground").style.visibility =
    //           "visible";
    //         document.getElementById(
    //           "gobackbutton"
    //         ).onmousedown = gobackbuttonMouseDown_handler;
    //         document.getElementById(
    //           "gobackbutton"
    //         ).onmouseup = gobackbuttonMouseDown_Up;
    //         document.getElementById(
    //           "gobackbutton"
    //         ).ontouchstart = gobackbuttonMouseDown_handler;
    //         document.getElementById(
    //           "gobackbutton"
    //         ).ontouchend = gobackbuttonMouseDown_Up;
    //         document.getElementById(
    //           "gobackbutton"
    //         ).onclick = gobackbuttonMouseClick_handler;
    //         return;
    //       }
    //       console.log("没有东西啦");
    //     }, 6000);
    //   })();
    //   //shown();
    //   function gobackbuttonMouseDown_handler() {
    //     document.getElementById("gobackbutton").style.opacity = 0;
    //     document.getElementById("gobackbuttonblack").style.opacity = 1;
    //   }
    //   function gobackbuttonMouseDown_Up() {
    //     document.getElementById("gobackbutton").style.opacity = 1;
    //     document.getElementById("gobackbuttonblack").style.opacity = 0;
    //   }
    //   function gobackbuttonMouseClick_handler() {
    //     document.getElementById("netbadbackground").style.visibility = "hidden";
    //     document.getElementById("gobackbutton").onmousedown = null;
    //     document.getElementById("gobackbutton").onmouseup = null;
    //     document.getElementById("gobackbutton").ontouchstart = null;
    //     document.getElementById("gobackbutton").ontouchend = null;
    //     document.getElementById("gobackbutton").onclick = null;
    //   }
    //   PIXI.utils.skipHello();
  },
  //弹窗事件说明事件结束
  mounted() {
    this.createCanvasApp();
    console.log("url>>>", this.baseUrl);
  },
  methods: {
    ControlHardGarm() {
      this.ControlHardDialog = false;
    },
    createCanvasApp() {
      var self = this;
      var a = this;
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
      this.gameStart().then(() => {
        //单个页面测试
        //SceneManager.run("HomePages");
        SceneManager.run("EasyGameSelectPages");
        //SceneManager.run("EasyGameIntroPages");
        //SceneManager.run("EasyGamePlayingPages");
        //SceneManager.run("HardGamePlayingPages");
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
      return new Promise(resolve => {
        self.axios.get("./gameresource.json").then(response => {
          this.Waster = response.data;
          PIXI.loader
            .add(response.data)
            .on("progress", loader => {
              loader.progress;
              if (document.getElementById("loading")) {
                document.getElementById("loading").style.width =
                  loader.progress * 0.054 + "rem";
              }
            })
            .load(() => {
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
.SwiperDialog {
  position: absolute;
  top: 0rem;
}
</style>