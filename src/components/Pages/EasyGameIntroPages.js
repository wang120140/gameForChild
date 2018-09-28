import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    created
} from "./Common.js"
export default class EasyGameIntroPages extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addStage, this)
        this.boardPaint;
        this.ChineseText;
        this.contentText;
        this.title;
        this.bg;
        this.BtnBackNormal;
        this.RecyclableWaste;
        this.playButton;
    }
    addStage() {
        let self = this;
        let contentTextStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 35,
            fill: "#84653A",
            // stroke: '#D17C2E',
            // strokeThickness: 4,
        });
        let TitleStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 60,
            fill: "#FFECCA",
            // stroke: '#D17C2E',
            // strokeThickness: 4,
        });
        let ChineseTextStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 28,
            fill: "#84653A",
        });
        (() => {

            //测试使用
            //let a = 100;
            //switch (a) {
            switch (Garbage.getGarBage("position")) {
                case 100:
                    this.title = new PIXI.Text("Recyclable Waste", TitleStyle);
                    this.ChineseText = ["纸品\npaper", "布料\ncloth", "玻璃\nglass", "塑料\nplastics", "金属\nmetal"];
                    this.RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal'];
                    this.contentText = new PIXI.Text("再生利用价值较高，能进入废品回收渠\n道的垃圾。\nWaste that has high recycling value and can \n enter waste recycling channels", contentTextStyle);

                    break;
                case 600:
                    this.title = new PIXI.Text("Kitchen Waste", TitleStyle);
                    this.ChineseText = ["果皮\nfruit peels", "骨头\nbones", "菜叶\nvegetale leaves", "剩饭\nleftovers", "蛋壳\neggshells"]
                    this.RecyclableWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'];
                    this.contentText = new PIXI.Text("厨房产生的食物类垃圾以及果皮。\nFood waste and fruit peels from the kitchen", contentTextStyle);
                    break;
                case 1100:
                    this.title = new PIXI.Text("Hazardous Waste", TitleStyle);
                    this.ChineseText = ["药品\nmedicines", "电池\nbatteries", "温度计\nthermometers", "灯泡\nlight bulbs", "油漆\noil paints"];
                    this.RecyclableWaste = ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'];
                    this.contentText = new PIXI.Text("含有有毒有害化学物质的垃圾。\nWaste that contains toxic and harmful \nchemicals", contentTextStyle);
                    break;
                case 1600:
                    this.title = new PIXI.Text("Other Waste", TitleStyle);
                    this.ChineseText = ["卫生纸\ntoilet paper", "沙土\nsands and soil", "陶瓷碗\nceramics", "砖块\nbricks", "瓦罐\ncrocks"];
                    this.RecyclableWaste = ["toiletPaper", "sands", "ceramics", "bricks", "crocks"];
                    this.contentText = new PIXI.Text("除上述几类垃圾之外的砖瓦陶瓷、 渣土、 卫生\n纸等等。\nIn addition to the above types of waste, waste \nlike bricks, ceramics, muck, toilet paper, etc.", contentTextStyle);
                    break;

            }
        })()
        //背景图
        created({
            $this: self,
            $name: self.bg,
            $alias: "bggame_png"
        })
        created({
                $this: self,
                $name: self.boardPaint,
                $alias: "BoardPaint_png",
                $x: 300,
                $y: 40
            })
            //返回按钮
        this.BtnBackNormal = created({
            $this: self,
            $name: self.BtnBackNormal,
            $alias: "BtnBackNormal_png",
            $x: 100,
            $y: 70,
            $interactive: true,
            $buttonMode: true,
        })
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
            //开始按钮
        this.playButton = created({
            $this: self,
            $name: self.playButton,
            $alias: "playButton_png",
            $x: 1500,
            $y: 700,
            $interactive: true,
            $buttonMode: true,
        })
        this.playButton.on("pointertap", this.playButtonEvent);
        //字体
        this.title.position.set(650, 100);
        this.addChild(this.title)
        this.contentText.position.set(450, 300);
        this.addChild(this.contentText);
        this.RecyclableWaste.forEach((item, index) => {
            let RecyclableItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
            RecyclableItem.position.set(index * 200 + 450, 600);
            RecyclableItem.pivot.y = RecyclableItem.height;
            RecyclableItem.scale.set(0.5, 0.5);
            this.addChild(RecyclableItem);
        })
        this.ChineseText.forEach((item, index) => {
            let ChineseTextItem = new PIXI.Text(item, ChineseTextStyle);
            ChineseTextItem.position.set(index * 200 + 450, 700);
            this.addChild(ChineseTextItem);
        })
    }
    BtnBackNormalEvent() {
        SceneManager.run("EasyGameSelectPages")
    }
    playButtonEvent() {
        SceneManager.run("EasyGamePlayingPages");
    }
}