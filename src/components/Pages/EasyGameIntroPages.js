import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage,
} from "@/lib/EasyPIXI.js";
import {
    createdSprite,
    createdText,
    createdStyle,
} from "./Common.js"
import EasyGameSelectPages from './EasyGameSelectPages.js';
import EasyGamePlayingPages from './EasyGamePlayingPages.js';
export default class EasyGameIntroPages extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addStage, this)
        this.ChineseText = null;
        this.EnglishText = null;
        this.contentText = null;
        this.title = null;
        this.RecyclableWaste = null;
        this.RecyclableWasteX = null;
        this.RecyclableWasteTextX = null;
        this.BtnBackClick = null;
        this.playButtonClick = null;
        this.soundBg = null;
        this.animateSpineName = ["RecyceleAnimate_spine", "KitchenAnimate_spine", "HarmfullAnimate_spine", "OtherAnimate_spine"]
        this.animateSpineArr = [];
        this.animateSpine = null;
        this.animateSpineNum = null;
        this.animateSpineNumName = "RecyceleAnimate_spine";
        this.loop = null;
    }
    addStage() {
        let self = this;
        (() => {
            this.ChineseText = null;
            this.EnglishText = null;
            this.contentText = null;
            this.title = null;
            this.RecyclableWaste = null;
            this.RecyclableWasteX = null;
            this.RecyclableWasteTextX = null;
            this.BtnBackClick = null;
            this.playButtonClick = null;
            this.soundBg = null;
            this.animateSpineName = ["RecyceleAnimate_spine", "KitchenAnimate_spine", "HarmfullAnimate_spine", "OtherAnimate_spine"]
            this.animateSpineArr = [];
            this.animateSpine = null;
            this.animateSpineNum = null;
            this.titleX = null;
            this.animateSpineNumName = "RecyceleAnimate_spine";
            this.loop = null;
        })();
        (() => {
            //console.log("跳转页面......")
            //测试使用
            //let a = 0;
            this.animateSpineNum = Garbage.getGarBage("position");
            //switch (a) {
            switch (Garbage.getGarBage("position")) {
                case 0:
                    this.animateSpineNumName = this.animateSpineName[0]
                    this.animateSpine = new PIXI.spine.Spine(PIXI.loader.resources[self.animateSpineNumName].spineData);
                    this.title = "Recyclable Waste"
                    this.titleX = 470;
                    //this.ChineseText = ["纸品\npaper", "布料\ncloth", "玻璃\nglass", "塑料\nplastics", "金属\nmetal"];
                    this.ChineseText = ["纸品", "布料", "玻璃", "塑料", "金属"];
                    this.ChineseTextX = [360, 360, 360, 360, 320];
                    this.ChineseTextY = [688, 688, 688, 688, 688];
                    this.RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal'];
                    this.RecyclableWasteX = [300, 300, 280, 330, 270];
                    this.RecyclableWasteY = [608, 608, 608, 608, 608]
                    this.RecyclableWasteTextX = [320, 320, 320, 300, 275];
                    this.RecyclableWasteTextY = [728, 728, 728, 728, 728];
                    this.contentText = "再生利用价值较高，能进入废品回收渠道的 \n垃圾。"
                    this.contentEnglishText = ["Waste that has high recycling value and \n can  enter waste recycling channels"]
                    this.contentEnglishTextY = 400;
                    break;
                case 1:
                    this.animateSpineNumName = this.animateSpineName[1]
                    this.animateSpine = new PIXI.spine.Spine(PIXI.loader.resources[self.animateSpineNumName].spineData);
                    this.title = "Kitchen Waste"
                    this.titleX = 510;
                    //this.ChineseText = ["果皮\nfruit peels", "骨头\nbones", "菜叶\nvegetale leaves", "剩饭\nleftovers", "蛋壳\neggshells"];
                    this.ChineseText = ["果皮", "骨头", "菜叶", "剩饭", "蛋壳"];
                    this.ChineseTextX = [360, 330, 330, 320, 300];
                    this.ChineseTextY = [648, 648, 648, 648, 648];
                    this.RecyclableWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'];
                    this.RecyclableWasteX = [290, 280, 250, 250, 250]
                    this.RecyclableWasteY = [558, 558, 558, 558, 558]
                    this.RecyclableWasteTextX = [290, 285, 210, 260, 230];
                    this.RecyclableWasteTextY = [688, 688, 688, 688, 688];
                    this.contentText = "厨房产生的食物类垃圾以及果皮。"
                    this.contentEnglishText = ["Food waste and fruit peels from the \n kitchen"];
                    this.contentEnglishTextY = 345;
                    break;
                case 2:
                    this.animateSpineNumName = this.animateSpineName[2]
                    this.animateSpine = new PIXI.spine.Spine(PIXI.loader.resources[self.animateSpineNumName].spineData);
                    this.title = "Hazardous Waste"
                    this.titleX = 470;
                    //this.ChineseText = ["药品\nmedicines", "电池\nbatteries", "温度计\nthermometers", "灯泡\nlight bulbs", "油漆\noil paints"];
                    this.ChineseText = ["药品", "电池", "温度计", "灯泡", "油漆"];
                    this.ChineseTextX = [360, 340, 330, 340, 320];
                    this.ChineseTextY = [628, 628, 628, 628, 628];
                    this.RecyclableWaste = ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'];
                    this.RecyclableWasteX = [300, 280, 280, 280, 280];
                    this.RecyclableWasteY = [548, 548, 548, 548, 548]
                    this.RecyclableWasteTextX = [290, 280, 245, 270, 250];
                    this.RecyclableWasteTextY = [668, 668, 668, 668, 668];
                    this.contentText = "含有有毒有害化学物质的垃圾。"
                    this.contentEnglishText = ["Waste that contains toxic and harmful \n chemicals"];
                    this.contentEnglishTextY = 345;
                    break;
                case 3:

                    this.animateSpineNumName = this.animateSpineName[3]
                    this.animateSpine = new PIXI.spine.Spine(PIXI.loader.resources[self.animateSpineNumName].spineData);
                    this.title = "Other Waste"
                    this.titleX = 540;
                    //this.ChineseText = ["卫生纸\ntoilet paper", "沙土\nsands and soil", "陶瓷碗\nceramics", "砖块\nbricks", "瓦罐\ncrocks"];
                    this.ChineseText = ["卫生纸", "沙土", "陶瓷碗", "砖块", "瓦罐"];
                    this.ChineseTextX = [350, 360, 360, 340, 330];
                    this.ChineseTextY = [698, 698, 698, 698, 698];
                    this.RecyclableWaste = ["toiletPaper", "sands", "ceramics", "bricks", "crocks"];
                    this.RecyclableWasteX = [280, 260, 310, 280, 270];
                    this.RecyclableWasteY = [628, 628, 628, 628, 628]
                    this.RecyclableWasteTextX = [280, 310, 310, 290, 280];
                    this.RecyclableWasteTextY = [738, 738, 738, 738, 738];
                    this.contentText = "除上述几类垃圾之外的砖瓦陶瓷、 渣 \n 土、 卫生纸等等。"
                    this.contentEnglishText = ["In addition to the above types of waste, \n waste like bricks, ceramics, muck, toilet \n paper, etc."]
                    this.contentEnglishTextY = 400;
                    break;
            }
        })()
        //背景音乐
        this.soundBg = PIXI.sound.play("RubbishSecletHome", {
            start: Garbage.getGarBage("SoundProgress"),
            loop: true,
        });
        //背景图
        createdSprite({
            $this: self,
            $scale: 2,
            $alias: "bggame_png"
        });
        createdSprite({
            $this: self,
            $alias: "BoardPaint_png",
            $x: 150,
            $y: 40
        });
        //返回按钮
        createdSprite({
            $this: self,
            $alias: "NormalBack_png",
            $x: 65,
            $y: 50,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.BtnBackClick.visible = true;
        });
        this.BtnBackClick = createdSprite({
            $this: self,
            $alias: "NormalClickBack",
            $x: 65,
            $y: 50,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", () => { //开始跳转页面
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            (() => {
                this.ChineseText = null;
                this.contentText = null;
                this.title = null;
                this.RecyclableWaste = null;
                this.BtnBackClick = null;
                this.playButtonClick = null;
                this.soundBg = null;
                this.animateSpineName = null;
                this.animateSpineArr = null;
                this.animateSpine = null;
                this.animateSpineNum = null;
                this.animateSpineNumName = null;
                this.loop = null;
            })();
            this.parent.removeChildren();
            SceneManager.run(new EasyGameSelectPages())
        }).on("pointerout", () => {
            this.BtnBackClick.visible = false;
        });
        //开始按钮
        createdSprite({
            $this: self,
            $alias: "playButton_png",
            $x: 1600,
            $y: 700,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.playButtonClick.visible = true;
        });
        this.playButtonClick = createdSprite({
            $this: self,
            $alias: "playButtonClick_png",
            $x: 1600,
            $y: 700,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", () => { //开始跳转页面
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            (() => {
                this.ChineseText = null;
                this.contentText = null;
                this.title = null;
                this.RecyclableWaste = null;
                this.BtnBackClick = null;
                this.playButtonClick = null;
                this.soundBg = null;
                this.animateSpineName = null;
                this.animateSpineArr = null;
                this.animateSpine = null;
                this.animateSpineNum = null;
                this.animateSpineNumName = null;
                this.loop = null;

            })();
            this.parent.removeChildren()
            SceneManager.run(new EasyGamePlayingPages());
        }).on("pointerout", () => {
            this.playButtonClick.visible = false;
        });
        // 主题字体
        createdText({
            $this: self,
            $text: self.title,
            $x: self.titleX + 40,
            $y: 108,
            $style: createdStyle({
                $fontSize: 60,
                $fill: "#FFECCA",
            })
        });
        //内容字体
        createdText({
            $this: self,
            $text: self.contentText,
            $x: 327,
            $y: 279,
            $style: createdStyle({
                $fontFamily: "Yuanti SC",
                $fontSize: 45,
                $fill: "#7F6643",
                $lineHeight: 58,
            })
        });
        createdText({
                $this: self,
                $text: self.contentEnglishText,
                $x: 327,
                $y: self.contentEnglishTextY,
                $style: createdStyle({
                    $fontFamily: "Yuanti SC",
                    $fontSize: 45,
                    $fill: "#7F6643",
                    $lineHeight: 45,
                })
            })
            //垃圾物品
        this.RecyclableWaste.forEach((item, index) => {
            createdSprite({
                $this: self,
                $name: {},
                $alias: item,
                $x: index * 190 + self.RecyclableWasteX[index] + 40,
                $y: self.RecyclableWasteY[index],
                $scale: 0.5,
                $pivotY: true
            });
        });
        this.ChineseText.forEach((item, index) => {
            createdText({
                $this: self,
                $text: item,
                $x: index * 190 + self.ChineseTextX[index],
                $y: self.ChineseTextY[index],
                $style: createdStyle({
                    $fontSize: 28
                })
            })
        });
        this.RecyclableWaste.forEach((item, index) => {
            //console.log(item)
            createdText({
                $this: self,
                $text: item,
                $x: index * 190 + self.RecyclableWasteTextX[index] + 40,
                $y: self.RecyclableWasteTextY[index],
                $style: createdStyle({
                    $fontSize: 28
                })
            })
        });

        //添加小动物事件
        //小动物动画
        //console.log(this.animateSpine.state)  为什么会卡？？？？？？？？
        if (this.animateSpineNum == 3) {
            this.animateSpine.scale.x = 0.5;
            this.animateSpine.scale.y = 0.5;
        } else {
            this.animateSpine.scale.x = 0.8;
            this.animateSpine.scale.y = 0.8;
        }

        switch (this.animateSpineNum) {
            case 0:
                this.animateSpine.state.setAnimation(0, "walking2", true);

                break;
            case 1:
                this.animateSpine.state.setAnimation(0, "walking", true);
                break;
            case 2:
                this.animateSpine.state.setAnimation(0, "walking", true);
                break;
            case 3:
                this.animateSpine.state.setAnimation(0, "walking2", true);

                break;
        }
        this.animateSpine.x = 2000; //改了这个位置
        this.animateSpine.y = 800;
        this.addChild(this.animateSpine);
        //循环效果
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.start();

    }
    gameloop() {
        this.animateSpine.x -= 15;
        if (this.animateSpine.x <= 1440) {
            this.loop.stop();
            this.animateSpine.state.setAnimation(0, "showing", true);
        }
    }
}