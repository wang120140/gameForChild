<template>
    <keep-alive>
    <div class="bigbox">
        <div class="swiper-container" ref="carousel">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in slide" :key="index" :class="{active:index == slide.length-1}">
                    <div class="slide" >
                        <!--标题-->
                        <div class="swiper-title" >
                            <div class="title">{{item.title}}</div>
                        </div>

                        <!--中文介绍-->
                        <div class="swiper-contentE">{{item.contentE}}</div>
                        <!--英文介绍-->
                        <div class="swiper-contentC">{{item.contentC}}</div>

                        <!--分类图片-->
                        <div class="swiper-fiyimg">
                            <div class="figimg">
                                <img v-for="(items,key,index) in item.fiyimg" :key="index" v-bind:src="items.url"   width="100%" height="auto">
                            </div>
                            <!--分类中文和英文-->
                            <div class="swiper-classfiy">
                                <div v-for="(items,key,index) in item.classfiy"  :key="index" class="text" > {{items.split("\n")[0]}} </div>
                                <div v-for="(items,key,index) in item.classfiy"  :key="index" class="text" > {{items.split("\n")[1]}} </div>
                            </div>
                            <!--在最后一页中显示开始按钮-->
                            <div class="skipAtt" v-if ="slide.length-1 == index">
                                <img  src="../../../public/img/playButton.png" alt="" @click="skip()">
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
    </keep-alive>
</template>
<script>
import { SceneManager, Garbage } from "@/lib/EasyPIXI.js";
import HardGamePlayingPages from "./HardGamePlayingPages.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      slide: [
        {
          title: "Recyclable Waste",
          contentE: "再生利用价值较高，能进入废品回收渠道的垃圾。",
          contentC:
            "Waste that has high recycling value and can \n enter waste recycling channels.",
          fiyimg: [
            {
              url: "./img/litter/paper.png"
            },
            {
              url: "./img/litter/cloth.png"
            },
            {
              url: "./img/litter/glass.png"
            },
            {
              url: "./img/litter/plastics.png"
            },
            {
              url: "./img/litter/metal.png"
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
          title: "kitchen Waste",
          contentE: "厨房产生的食物类垃圾以及果皮。",
          contentC: "Food waste and fruit peels from the kitchen",
          fiyimg: [
            {
              url: "./img/litter/fruitPeels.png"
            },
            {
              url: "./img/litter/bones.png"
            },
            {
              url: "./img/litter/vegetableLeaves.png"
            },
            {
              url: "./img/litter/leftovers.png"
            },
            {
              url: "./img/litter/eggshells.png"
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
          fiyimg: [
            {
              url: "./img/litter/medicines.png"
            },
            {
              url: "./img/litter/batteries.png"
            },
            {
              url: "./img/litter/thermometers.png"
            },
            {
              url: "./img/litter/lightBulbs.png"
            },
            {
              url: "./img/litter/oilPaints.png"
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
              url: "./img/litter/toiletPaper.png"
            },
            {
              url: "./img/litter/sands.png"
            },
            {
              url: "./img/litter/ceramics.png"
            },
            {
              url: "./img/litter/bricks.png"
            },
            {
              url: "./img/litter/crocks.png"
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
      ]
    };
  },
  mounted() {
    var swiper = new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      }
    });
  },
  methods: {
    skip() {
      console.log(41);
      this.$emit("StartHardGarm");
      Garbage.clearGarBage("startPlayHardGame");
      Garbage.setGarBage("startPlayHardGame", true);
      // SceneManager.run("HardGamePlayingPages");
      SceneManager.run(new HardGamePlayingPages());
    }
  }
};
</script>

<style>
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

.bigbox {
  width: 100%;
  height: 10.8rem;
  background-color: rgba(0, 0, 0, 0.6);
  margin: 0 auto;
}

.swiper-container {
  width: 12.44rem;
  height: auto;
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
  font-size: 0.63rem;
  padding-top: 0.35rem;
  text-align: center;
  color: #ffecce;
}

.slide {
  font-size: 0.18rem;
  width: 12.44rem;
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
  display: flex;
  width: 10rem;
  height: 1.5rem;
  flex-direction: column;
  position: relative;
  top: 4.5rem;
}

.swiper-fiyimg .figimg {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  position: absolute;
  top: 0rem;
  left: 5.7rem;
}

.swiper-fiyimg .figimg img {
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-left: 0.4rem;
  margin-right: 0.7rem;
  text-align: center;
}

.swiper-classfiy {
  width: 10rem;
  position: absolute;
  top: 1.5rem;
  left: 1.1rem;
  font-family: STYuanti-SC-Regular;
  font-size: 0.29rem;
  color: #766c3d;
}

.text {
  width: 2rem;
  float: left;
  text-align: center;
}

.skipAtt img {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  position: absolute;
  bottom: -2rem;
  right: -2.5rem;
  z-index: 999999;
}

.swiper-pagination-bullet {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  margin-right: 0.1rem;
  background-color: #c69071;
  background: rgba(198, 144, 113, 1);
  z-index: 999999;
}

.swiper-pagination-bullet-active {
  background-color: pink;
}
</style>