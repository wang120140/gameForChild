<template>
<!-- <keep-alive> -->
    <div id="app">
        <div ref="gameMain">
        </div>
        <SwiperBoard class="SwiperDialog"  @StartHardGarm="ControlHardGarm" v-if="ControlHardDialog"></SwiperBoard>
        <div v-show="showTimeOut">
          <div class = "timeOut"></div>
          <div class="exitBar">
            <div class="backBtn"
                  @mousedown="exitGameDown_mousedown($event)" 
                  @mouseup="exitGameUp_mouseup($event)" 
                  @touchstart.stop ="exitGameDown_touch($event)" 
                  @touchend.stop ="exitGameUp_touch($event)">
            </div>
          </div>
        </div>
    </div>
    <!-- </keep-alive> -->
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
      LoadingAgain: true,
      showTimeOut: false,
      Timeout0: null,
      Timeout1: null
    };
  },
  beforeCreate() {
    PIXI.utils.skipHello();
    Garbage.setGarBage("startPlayHardGame", false);
  },
  mounted() {
    this.get_restTime();
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
        SceneManager.run(new HomePages());
        //SceneManager.run(new EasyGameSelectAndIntroduce());
        //SceneManager.run("EasyGameSelectPages");
        //SceneManager.run(new EasyGameIntroPages());
        //SceneManager.run(new EasyGamePlayingPages());
        //SceneManager.run(new HardGamePlayingPages());
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
      //console.log("游戏资源加载完毕");
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
                  loader.progress * 2.456 + 48 + "%";
              }
            })
            .load(() => {
              resolve();
            });
        });
        // } else {
        //   //console.log("已经加载了...");
        // }
      });
    },
    //获取剩余时间
    get_restTime() {
      let self = this;
      window.parent.postMessage(
        {
          type: "getPrepGameTime",
          game: 5
        },
        "*"
      );
      //接受信息
      window.addEventListener("message", changeBarStatus);
      function changeBarStatus(event) {
        if (event.data.type == "getPrepGameTime") {
          var restTime = event.data.data.remain * 1000; //这个要改
          self.Timeout0 = setTimeout(() => {
            self.showTimeOut = true;
            //window.removeEventListener("message", changeBarStatus);
          }, restTime);
          window.removeEventListener("message", changeBarStatus);
        }
      }
      // self.Timeout1 = setTimeout(() => {
      //   self.get_curClass();
      // }, 1000);
    },
    //弹窗按钮......
    exitGameDown_touch($event) {
      if (Browser.versions.mobile && $event.type == "mousedown") {
        return false;
      }
      $event.target.style.backgroundImage = 'url("./img/dialog/yesBtn_1.png")';
    },
    exitGameDown_mousedown($event) {
      $event.target.style.backgroundImage = 'url("./img/dialog/yesBtn_1.png")';
      window.parent.postMessage(
        {
          type: "exitGame",
          game: 5
        },
        "*"
      );
    },
    exitGameUp_touch($event) {
      if (Browser.versions.mobile && $event.type == "mousedown") {
        return false;
      }
      $event.target.style.backgroundImage = 'url("./img/dialog/yesBtn_1.png")';
    },
    exitGameUp_mouseup($event) {
      $event.target.style.backgroundImage = 'url("./img/dialog/yesBtn_1.png")';
      window.parent.postMessage(
        {
          type: "exitGame",
          game: 5
        },
        "*"
      );
    }
  },
  beforeDestroy() {
    clearTimeout(this.Timeout0);
    clearTimeout(this.Timeout1);
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
  background: black;
}
.SwiperDialog {
  position: absolute;
  top: 0rem;
}
.timeOut {
  width: 19.2rem;
  height: 10.8rem;
  background-color: black;
  opacity: 0.6;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.exitBar {
  width: 8.72rem;
  height: 5.56rem;
  position: absolute;
  z-index: 3;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  background-image: url("../public/img/dialog/DialogFoucePause.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.backBtn {
  width: 2.88rem;
  height: 1.41rem;
  position: absolute;
  left: 3.07rem;
  top: 3.65rem;
  cursor: pointer;
  background-image: url("../public/img/dialog/yesBtn_0.png");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>