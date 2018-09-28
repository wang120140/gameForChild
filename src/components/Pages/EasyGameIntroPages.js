import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage,
} from "@/lib/EasyPIXI.js";
import {
    created,
    createdText,
    createdStyle,
} from "./Common.js"
export default class EasyGameIntroPages extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addStage, this)
        this.ChineseText;
        this.contentText;
        this.title;
        this.RecyclableWaste;
    }
    addStage() {
        let self = this;
        (() => {
            //测试使用
            //let a = 100;
            //switch (a) {
            switch (Garbage.getGarBage("position")) {
                case 100:
                    this.title = "Recyclable Waste"
                    this.ChineseText = ["纸品\npaper", "布料\ncloth", "玻璃\nglass", "塑料\nplastics", "金属\nmetal"];
                    this.RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal'];
                    this.contentText = "再生利用价值较高，能进入废品回收渠\n道的垃圾。\nWaste that has high recycling value and can \n enter waste recycling channels"
                    break;
                case 600:
                    this.title = "Kitchen Waste"
                    this.ChineseText = ["果皮\nfruit peels", "骨头\nbones", "菜叶\nvegetale leaves", "剩饭\nleftovers", "蛋壳\neggshells"]
                    this.RecyclableWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'];
                    this.contentText = "厨房产生的食物类垃圾以及果皮。\nFood waste and fruit peels from the kitchen"
                    break;
                case 1100:
                    this.title = "Hazardous Waste"
                    this.ChineseText = ["药品\nmedicines", "电池\nbatteries", "温度计\nthermometers", "灯泡\nlight bulbs", "油漆\noil paints"];
                    this.RecyclableWaste = ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'];
                    this.contentText = "含有有毒有害化学物质的垃圾。\nWaste that contains toxic and harmful \nchemicals"
                    break;
                case 1600:
                    this.title = "Other Waste"
                    this.ChineseText = ["卫生纸\ntoilet paper", "沙土\nsands and soil", "陶瓷碗\nceramics", "砖块\nbricks", "瓦罐\ncrocks"];
                    this.RecyclableWaste = ["toiletPaper", "sands", "ceramics", "bricks", "crocks"];
                    this.contentText = "除上述几类垃圾之外的砖瓦陶瓷、 渣土、 卫生\n纸等等。\nIn addition to the above types of waste, waste \nlike bricks, ceramics, muck, toilet paper, etc."
                    break;
            }
        })()
        //背景图
        created({
            $this: self,
            $alias: "bggame_png"
        })
        created({
                $this: self,
                $alias: "BoardPaint_png",
                $x: 300,
                $y: 40
            })
            //返回按钮
        created({
                $this: self,
                $alias: "BtnBackNormal_png",
                $x: 100,
                $y: 70,
                $interactive: true,
                $buttonMode: true,
            }).on("pointertap", this.BtnBackNormalEvent)
            //开始按钮
        created({
            $this: self,
            $alias: "playButton_png",
            $x: 1500,
            $y: 700,
            $interactive: true,
            $buttonMode: true,
        }).on("pointertap", this.playButtonEvent);
        // 主题字体
        createdText({
                $this: self,
                $text: self.title,
                $x: 650,
                $y: 100,
                $style: createdStyle({
                    $fontSize: 60,
                    $fill: "#FFECCA",
                })
            })
            //内容字体
        createdText({
                $this: self,
                $text: self.contentText,
                $x: 450,
                $y: 300,
                $style: createdStyle({

                })
            })
            //垃圾物品
        this.RecyclableWaste.forEach((item, index) => {
            created({
                $this: self,
                $name: {},
                $alias: item,
                $x: index * 200 + 450,
                $y: 600,
                $scale: 0.5,
                $pivotY: true
            });

        })
        this.ChineseText.forEach((item, index) => {
            createdText({
                $this: self,
                $text: item,
                $x: index * 200 + 450,
                $y: 700,
                $style: createdStyle({
                    $fontSize: 28
                })
            })
        })

    }
    BtnBackNormalEvent() {
        SceneManager.run("EasyGameSelectPages")
    }
    playButtonEvent() {
        SceneManager.run("EasyGamePlayingPages");
    }
}