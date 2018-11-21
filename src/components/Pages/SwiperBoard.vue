<template>
    <div class="bigbox"  >
        <div class="swiper-container" ref="carousel" >
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in slide" :key="index" :class="{active:index == slide.length-1}">
                    <audio id="questionSound" src='./sound/bg/hardfanye.mp3'></audio>
                    <div class="slide">
                        <!--标题 -->
                        <div class="swiper-title" >
                            <div class="title">{{item.title}}</div>
                        </div>

                        <!--中文介绍-->
                        <div class="swiper-contentE">{{item.contentE}}</div>

                        <!--英文介绍-->
                        <div class="swiper-contentC" :style="{'position':'absolute',top:item.Top/100+'rem',}">{{item.contentC}}</div>

                        <!--分类图片-->
                        <div class="swiper-fiyimg">
                            <div class="FiyImg">
                                <div class="figimg" v-for="(items,index) in item.fiyimg" :key="index" >
                                    <img :src="items.url"
                                         :style="{
                                            width:items.x/100+'rem',
                                            height:items.y/100+'rem',
                                            'position':'absolute',
                                            top:items.Tops/100+'rem',
                                            left:items.Lefts/100+'rem',
                                        }"
                                    >
                                </div>
                            </div>
                            <!--分类中文和英文-->
                            <div v-if = "slide.length-3 == index"  class="kitchen">
                                <div v-for="(items) in item.classfiy" class="text" > {{items.split("\n")[0]}} </div>
                                <div v-for="(items) in item.classfiy" class="text textE"> {{items.split("\n")[1]}} </div>
                            </div>
                            <div v-if = "slide.length-2 == index"  class="Hazardous">
                                <div v-for="(items) in item.classfiy" class="text" > {{items.split("\n")[0]}} </div>
                                <div v-for="(items) in item.classfiy" class="text textE"> {{items.split("\n")[1]}} </div>
                            </div>

                            <div v-if = "slide.length-3 != index && slide.length-2 != index" class="swiper-classfiy">
                                <div v-for="(items) in item.classfiy" class="text" > {{items.split("\n")[0]}} </div>
                                <div v-for="(items) in item.classfiy" class="text textE"> {{items.split("\n")[1]}} </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <div class="swiper-pagination" ></div>

        </div>

        <!--最后一页出现开始按钮-->
        <div class="skipAtt" v-show="lastIndex"
             @mousedown="skip_start($event)"  @mouseup="skip_end"
             @touchstart='skip_start($event)' @touchend="skip_end"
        >
            <img  src="../../../public/img/playButton.png"  alt=""  v-if = "isBoo">
            <img  src="../../../public/img/playButtonClick.png" alt="" v-if = "!isBoo">
        </div>
        <div v-show="coverlayControlShowOnce" id="Coverlay" ref="coverlay" @click="coverLayoutShow" >
          <img src="../../../public/img/LeftArrow.png" alt="">
          <img src="../../../public/img/RightArrow.png" alt="">
          <img ref="hand0" src="../../../public/img/LeftHand.png" alt="">
          <img ref="hand1" src="../../../public/img/RightHand.png" alt="">
          <img src="../../../public/img/HardCoverLay.png" alt="">
          <img src="../../../public/img/SkipButton.png" alt="">
        </div>

    </div>
</template>
<script>
import { SceneManager, Garbage, Browser } from "@/lib/EasyPIXI.js";
import HardGamePlayingPages from "./HardGamePlayingPages.js";

export default {
  name: "HelloWorld",
  data() {
    return {
      isBoo: true,
      lastIndex: false,
      coverlayControlShowOnce: true,
      slide: [
        {
          title: "Recyclable Waste",
          contentE: "再生利用价值较高，能进入废品回收渠道的垃圾。",
          contentC:
            "Waste that has high recycling value and can \n enter waste recycling channels.",
          fiyimg: [
            {
              url: "./img/small/paper.png",
              x: 116,
              y: 67,
              Tops: 20,
              Lefts: 20
            },
            {
              url: "./img/small/cloth.png",
              x: 118,
              y: 61,
              Tops: 20,
              Lefts: 210
            },
            {
              url: "./img/small/glass.png",
              x: 169,
              y: 66,
              Tops: 20,
              Lefts: 380
            },
            {
              url: "./img/small/plastics.png",
              x: 50,
              y: 162,
              Tops: -40,
              Lefts: 620
            },
            {
              url: "./img/small/metal.png",
              x: 89,
              y: 84,
              Tops: 20,
              Lefts: 820
            }
          ],
          classfiy: [
            "纸品 \n paper",
            "布料 \n cloth",
            "玻璃 \n glass",
            "塑料 \n plastics",
            "金属 \n metal"
          ]
        },
        {
          title: "Kitchen Waste",
          contentE: "厨房产生的食物类垃圾以及果皮。",
          contentC: "Food waste and fruit peels from the kitchen",
          Top: 200,
          fiyimg: [
            {
              url: "./img/small/fruitPeels.png",
              x: 130,
              y: 116,
              Tops: -100,
              Lefts: 20
            },
            {
              url: "./img/small/bones.png",
              x: 91,
              y: 66,
              Tops: -80,
              Lefts: 210
            },
            {
              url: "./img/small/vegetableLeaves.png",
              x: 112,
              y: 85,
              Tops: -80,
              Lefts: 380
            },
            {
              url: "./img/small/leftovers.png",
              x: 125,
              y: 67,
              Tops: -80,
              Lefts: 600
            },
            {
              url: "./img/small/eggshells.png",
              x: 96,
              y: 56,
              Tops: -80,
              Lefts: 810
            }
          ],
          classfiy: [
            "果皮 \n paper",
            "骨头 \n cloth",
            "菜叶 \n glass",
            "剩饭 \n plastics",
            "蛋壳 \n metal"
          ]
        },
        {
          title: "Hazardous Waste",
          contentE: "含有有毒有害化学物质的垃圾。",
          contentC: " Waste that contains toxic and harmful like \n chemicals,",
          Top: 200,
          fiyimg: [
            {
              url: "./img/small/medicines.png",
              x: 78,
              y: 90,
              Tops: -20,
              Lefts: 20
            },
            {
              url: "./img/small/batteries.png",
              x: 86,
              y: 85,
              Tops: -20,
              Lefts: 210
            },
            {
              url: "./img/small/thermometers.png",
              x: 93,
              y: 92,
              Tops: -20,
              Lefts: 400
            },
            {
              url: "./img/small/lightBulbs.png",
              x: 102,
              y: 80,
              Tops: -20,
              Lefts: 600
            },
            {
              url: "./img/small/oilPaints.png",
              x: 74,
              y: 86,
              Tops: -20,
              Lefts: 810
            }
          ],
          classfiy: [
            "药品 \n medicines",
            "电池 \n batteries",
            "温度计 \n thermometers",
            "灯泡 \n light bulbs",
            "油漆 \n oil paints"
          ]
        },
        {
          title: "Other Waste",
          contentE: "除上述几类垃圾之外的砖瓦陶瓷、 渣土、 卫生纸 \n 等等。",
          contentC:
            "In addition to the above types of waste, waste \n like bricks, ceramics, muck, toilet paper, etc.",
          fiyimg: [
            {
              url: "./img/small/toiletPaper.png",
              x: 123,
              y: 94,
              Tops: 30,
              Lefts: 0
            },
            {
              url: "./img/small/sands.png",
              x: 211,
              y: 106,
              Tops: 30,
              Lefts: 160
            },
            {
              url: "./img/small/ceramics.png",
              x: 86,
              y: 64,
              Tops: 30,
              Lefts: 420
            },
            {
              url: "./img/small/bricks.png",
              x: 115,
              y: 86,
              Tops: 30,
              Lefts: 600
            },
            {
              url: "./img/small/crocks.png",
              x: 92,
              y: 88,
              Tops: 30,
              Lefts: 810
            }
          ],
          classfiy: [
            "卫生纸 \n toilet paper",
            "沙土 \n sands soil",
            "陶瓷碗 \n ceramics",
            "砖块 \n bricks",
            "瓦罐 \n crocks"
          ]
        }
      ],
      timeControl: null
    };
  },
  mounted() {
    let _this = this;
    //console.log("vs1.1");
    let swiper = new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      on: {
        slideChange: function() {
          var questionSound = document.getElementById("questionSound");
          questionSound.play();
          //console.log(_this.slide[0].title);
          if (swiper.activeIndex == _this.slide.length - 1) {
            setTimeout(function() {
              _this.lastIndex = true;
            }, 200);
          } else {
            _this.lastIndex = false;
          }
        }
      }
    });
    //Garbage.getGarBage("EnterHardSwiperPage");
    //console.log(Garbage.getGarBage("EnterHardSwiperPage"));
    if (Garbage.getGarBage("EnterHardSwiperPage")) {
      //console.log("...有值");
      this.coverlayControlShowOnce = false;
    } else {
      //le.log("为 null");
      this.coverlayControlShowOnce = true;
      this.controlHand();
    }
  },

  methods: {
    skip_start($event) {
      if (Browser.versions.mobile && $event.type == "mousedown") {
        return false;
      }
      //console.log("触发了鼠标按下效果");
      if (this.isBoo) {
        this.isBoo = false;
      } else {
        this.isBoo = true;
      }
    },

    skip_end($event) {
      if (Browser.versions.mobile && $event.type == "mouseup") {
        // console.info("1111");
        return false;
      }
      // console.log("触发了鼠标抬起效果", $event);
      // console.log("开始进入事件发生...");
      this.isBoo = false;
      this.changePage();
    },
    changePage() {
      //console.log("changePage事件发生...");
      this.$emit("StartHardGarm");
      Garbage.clearGarBage("startPlayHardGame");
      Garbage.setGarBage("startPlayHardGame", true);
      SceneManager.run(new HardGamePlayingPages());
    },
    controlHand() {
      let control = true;
      this.timeControl = setInterval(() => {
        if (control) {
          this.$refs.hand0.style.opacity = 0;
          this.$refs.hand1.style.opacity = 1;
          control = false;
        } else {
          this.$refs.hand0.style.opacity = 1;
          this.$refs.hand1.style.opacity = 0;
          control = true;
        }
      }, 300);
    },
    coverLayoutShow() {
      clearInterval(this.timeControl);
      Garbage.clearGarBage("EnterHardSwiperPage");
      Garbage.setGarBage("EnterHardSwiperPage", true);
      this.$refs.coverlay.style.display = "none";
    },
    beforeDestroy() {
      // console.log(timeControl);
      // console.log("timeControl...");
      // clearInterval(timeControl);
    }
  }
};
</script>

<style >
html,
body {
  position: relative;
}
body {
  background: #eee;
  font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
  font-size: 0.14px;
  color: #000;
  margin: 0;
  padding: 0;
}
#Coverlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
#Coverlay img {
  position: absolute;
}
#Coverlay img:nth-child(1) {
  top: 6.78rem;
  left: 4.22rem;
  width: 2.92rem;
  height: 2.14rem;
}
#Coverlay img:nth-child(2) {
  top: 6.78rem;
  left: 12.44rem;
  width: 2.92rem;
  height: 2.14rem;
}
#Coverlay img:nth-child(3) {
  top: 8.15rem;
  left: 9.35rem;
  width: 1.38rem;
  height: 1.6rem;
}
#Coverlay img:nth-child(4) {
  top: 8.15rem;
  left: 9.35rem;
  opacity: 0;
  width: 1.74rem;
  height: 1.77rem;
}
#Coverlay img:nth-child(5) {
  top: 2.1rem;
  left: 9.39rem;
  width: 6.83rem;
  height: 4.08rem;
}
#Coverlay img:last-child {
  top: 8.67rem;
  left: 16.43rem;
  width: 1.76rem;
  height: 1.33rem;
}
.bigbox {
  width: 100%;
  height: 10.8rem;
  background-color: rgba(0, 0, 0, 0.6);
}

.swiper-container {
  width: 19.2rem;
  height: 10.8rem;
}

.swiper-title {
  width: 5.25rem;
  height: 1.52rem;
  position: absolute;
  top: -0.8rem;
  left: 3.5rem;
  background: url("../../../public/img/Swiper/TitleBG.png") no-repeat center;
  background-size: contain;
}

.title {
  font-size: 0.55rem;
  padding-top: 0.35rem;
  text-align: center;
  color: #ffecce;
}

.slide {
  font-size: 0.18rem;
  width: 12.44rem;
  margin: 0 auto;
  height: 9.9rem;
  background: url("../../../public/img/dialog/pop.png") no-repeat;
  background-size: contain;
  position: relative;
  top: 1.4rem;
}
.swiper-contentE {
  width: 10.55rem;
  height: 1.06rem;
  position: absolute;
  top: 1.2rem;
  left: 1rem;
  font-family: Yuanti SC;
  font-size: 0.48rem;
  color: #766c3d;
}

.swiper-contentC {
  width: 10.55rem;
  font-size: 0.48rem;
  color: #766c3d;
  position: absolute;
  top: 2.5rem;
  left: 1rem;
  font-family: Yuanti SC;
}

.swiper-fiyimg {
  position: relative;
  top: 4.5rem;
}

.swiper-fiyimg .FiyImg {
  position: absolute;
  left: 1.2rem;
}

.swiper-fiyimg .figimg {
  float: left;
}

.swiper-fiyimg .figimg img {
  margin-right: 0.5rem;
  margin-left: 0.4rem;
}

.swiper-classfiy {
  width: 10rem;
  position: absolute;
  top: 1.5rem;
  left: 1.1rem;
  font-family: STYuanti-SC-Regular;
  font-size: 0.3rem;
  color: #766c3d;
}

.kitchen {
  width: 10rem;
  position: absolute;
  top: 0.5rem;
  left: 1.1rem;
  font-family: STYuanti-SC-Regular;
  font-size: 0.3rem;
  color: #766c3d;
}

.Hazardous {
  width: 10rem;
  position: absolute;
  top: 1.1rem;
  left: 1.1rem;
  font-family: STYuanti-SC-Regular;
  font-size: 0.3rem;
  color: #766c3d;
}

.text {
  width: 2rem;
  float: left;
  text-align: center;
  font-size: "华文圆体";
}

.textE {
  font-size: "方正舒体";
}

.skipAtt {
  width: 2.3rem;
  height: 2.3rem;
  cursor: pointer;
  position: absolute;
  bottom: 1rem;
  right: 1.8rem;
}

.skipAtt img {
  width: 2.3rem;
  height: 2.3rem;
  cursor: pointer;
  position: absolute;
  bottom: 0rem;
  right: 0rem;
  z-index: 99999999999999;
}

.swiper-pagination-bullet {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  margin-right: 0.1rem;
  margin-top: -0.5rem;
  background-color: #c69071;
  background: rgba(198, 144, 113, 1);
}

.swiper-pagination-bullet-active {
  background-color: #fdfeaa;
}
</style>