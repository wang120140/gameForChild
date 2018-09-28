<template>
    <div class="bigbox">
        <div class="swiper-container" ref="carousel">
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(item,index) in slide" :key="index">
                    <div class="slide" >
                        <div class="swiper-title" >
                            <div class="title">{{item.title}}</div>
                        </div>
                        <pre>
                        <div class="swiper-content">{{item.content}}</div>
                        <div class="swiper-classfiy"><span v-for="(items,index) in item.classfiy" class="text" :key=index>{{items}}</span></div>
                        <div class="swiper-classfiy_yw"><span v-for="(items,index) in item.classfiy_yw" class="text" :key=index>{{items}}</span></div>
                        <div class="skipAtt" @click="skip()"> 点击事件</div>
                        </pre>
                    </div>
                </div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
import { SceneManager, Garbage } from "@/lib/EasyPIXI.js";
export default {
  name: "HelloWorld",
  data() {
    return {
      slide: [
        {
          title: "Recyclable Waste",
          content:
            "再生利用价值较高，能进入废品回收渠道的垃圾。\n Waste that has high recycling value and can \n enter waste recycling channels.",
          classfiy: ["纸品", "布料", "玻璃", "塑料", "金属"],
          classfiy_yw: ["paper", "cloth", "glass", "plastics", "metal"]
        },
        {
          title: "kitchen Waste",
          content:
            "厨房产生的食物类垃圾以及果皮。\n  Food waste and fruit peels from \n the kitchen",
          classfiy: ["果皮", "骨头", "菜叶", "剩饭", "蛋壳"],
          classfiy_yw: ["paper", "cloth", "glass", "plastics", "metal"]
        },
        {
          title: "Callable Waste",
          content:
            "含有有毒有害化学物质的垃圾。\nWaste that contains toxic and harmful \n  chemicals",
          classfiy: ["纸品", "布料", "玻璃", "塑料", "金属"],
          classfiy_yw: ["paper", "cloth", "glass", "plastics", "metal"]
        },
        {
          title: "Harmful Waste",
          content:
            "除上述几类垃圾之外的砖瓦陶瓷、 渣土、 卫生纸等等。\nIn addition to the above types of waste, waste \nlike bricks, ceramics, muck, toilet paper, etc.",
          classfiy: ["纸品", "布料", "玻璃", "塑料", "金属"],
          classfiy_yw: ["paper", "cloth", "glass", "plastics", "metal"]
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
      SceneManager.run("HardGamePlayingPages");
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
.skipAtt {
  width: 1rem;
  height: 1rem;
  border: 1px solid blue;
  text-align: center;
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
  margin-left: 3.46rem;
  margin-right: 3.73rem;
  background: url("../../../public/img/Swiper/TitleBG.png") no-repeat center;
  background-size: contain;
}

.title {
  font-size: 0.45rem;
  padding-top: 0.45rem;
  color: #fff;
}

.text {
  margin-right: 0.1rem;
  text-align: center;
}

.slide {
  font-size: 0.18rem;
  width: 12.44rem;
  height: auto;
  background: url("../../../public/img/Swiper/IntroBoard.png") no-repeat;
  background-size: contain;
  margin-top: 1rem;
}
.swiper-content {
  font-size: 0.48rem;
  color: #766c3d;
  padding: 0.5rem;
}
.swiper-pagination-bullet {
  width: 0.35rem;
  height: 0.35rem;
  border-radius: 50%;
  margin-right: 0.1rem;
  background-color: red;
}
.swiper-pagination-bullet-active {
  background-color: pink;
}
</style>