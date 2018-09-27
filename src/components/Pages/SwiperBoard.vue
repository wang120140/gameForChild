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
                        </pre>
                    </div>

                </div>
            </div>

            <div class="swiper-pagination"></div>
        </div>
    </div>
</template>
<script>
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
            "厨房产生的食物类垃圾以及果皮。\n  Food waste and fruit peels from the kitchen",
          classfiy: ["果皮", "骨头", "菜叶", "剩饭", "蛋壳"],
          classfiy_yw: ["paper", "cloth", "glass", "plastics", "metal"]
        },
        {
          title: "Callable Waste",
          content:
            "含有有毒有害化学物质的垃圾。\nWaste that contains toxic and harmful chemicals",
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
  width: 1920px;
  height: 1080px;
  background-color: rgba(0, 0, 0, 0.6);

  margin: 0 auto;
}
.swiper-container {
  width: 1244px;
  height: 790px;
}
.swiper-title {
  width: 525px;
  height: 152px;
  margin-left: 346px;
  margin-right: 373px;
  background: url("../../../public/img/Swiper/TitleBG.png") no-repeat center;
  background-size: contain;
}

.title {
  font-size: 45px;
  padding-top: 45px;
  color: #fff;
}

.text {
  margin-right: 10%;
  text-align: center;
}

.slide {
  font-size: 18px;
  width: 1244px;
  height: 790px;
  background: url("../../../public/img/Swiper/IntroBoard.png") no-repeat;
  background-size: contain;
}

.swiper-content {
  font-size: 48px;
  color: #766c3d;
  padding: 50px;
}

.swiper-pagination-bullet {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 10px;
  background-color: red;
}
.swiper-pagination-bullet-active {
  background-color: pink;
}
</style>