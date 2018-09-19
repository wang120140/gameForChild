import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
let boardPaint, ChineseText, contentText, title;
let bg, BtnBackNormal, RecyclableWaste;
class EasyGameIntroPage extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addStage, this)
    }
    addStage() {
        let contentTextStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 35,
            fill: "#FFECCA",
            stroke: '#D17C2E',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        let TitleStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 60,
            fill: "#FFECCA",
            stroke: '#D17C2E',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        (() => {

            switch (Garbage.getGarBage("position")) {
                case 100:
                    title = new PIXI.Text("Recyclable Waste", TitleStyle);
                    ChineseText = ["纸品\npaper", "布料\ncloth", "玻璃\nglass", "塑料\nplastics", "金属\nmetal"];
                    RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal'];
                    contentText = new PIXI.Text("再生利用价值较高，能进入废品回收渠\n道的垃圾。\nWaste that has high recycling value and can \n enter waste recycling channels", contentTextStyle);

                    break;
                case 600:
                    title = new PIXI.Text("Kitchen Waste", TitleStyle);
                    ChineseText = ["果皮\nfruit peels", "骨头\nbones", "菜叶\nvegetale leaves", "剩饭\nleftovers", "蛋壳\neggshells"]
                    RecyclableWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'];
                    // 厨房产生的食物类垃圾以及果皮
                    //Food waste and fruit peels from the kitchen
                    contentText = new PIXI.Text("厨房产生的食物类垃圾以及果皮。\nFood waste and fruit peels from the kitchen", contentTextStyle);
                    break;
                case 1100:
                    title = new PIXI.Text("Hazardous Waste", TitleStyle);
                    ChineseText = ["药品\nmedicines", "电池\nbatteries", "温度计\nthermometers", "灯泡\nlight bulbs", "油漆\noil paints"];
                    RecyclableWaste = ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'];
                    contentText = new PIXI.Text("含有有毒有害化学物质的垃圾。\nWaste that contains toxic and harmful \nchemicals", contentTextStyle);
                    break;
                case 1600:
                    title = new PIXI.Text("Other Waste", TitleStyle);
                    ChineseText = ["卫生纸\ntoilet paper", "沙土\nsands and soil", "陶瓷碗\nceramics", "砖块\nbricks", "瓦罐\ncrocks"];
                    RecyclableWaste = ["toiletPaper", "sands", "ceramics", "bricks", "crocks"];
                    contentText = new PIXI.Text("除上述几类垃圾之外的砖瓦陶瓷、 渣土、 卫生\n纸等等。\nIn addition to the above types of waste, waste \nlike bricks, ceramics, muck, toilet paper, etc.", contentTextStyle);
                    break;

            }
        })()
        //console.log(Garbage.getGarBage('position'), '----------------');
        //背景图
        bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(bg);
        //画板
        boardPaint = new PIXI.Sprite(PIXI.loader.resources["BoardPaint_png"].texture);
        boardPaint.position.set(300, 40);
        this.addChild(boardPaint);
        //返回按钮
        BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        BtnBackNormal.position.set(100, 70);

        BtnBackNormal.interactive = true;
        BtnBackNormal.buttonMode = true;
        BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(BtnBackNormal);
        //字体

        title.position.set(650, 100);
        this.addChild(title)


        // contentText.width = 1000;
        // contentText.height = 100;
        contentText.position.set(450, 300);
        this.addChild(contentText);
        RecyclableWaste.forEach((item, index) => {
            let RecyclableItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
            RecyclableItem.position.set(index * 200 + 450, 600);
            RecyclableItem.scale.set(0.5, 0.5);
            this.addChild(RecyclableItem);
        })
        let ChineseTextStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 28,
            fill: "#FFECCA",
            stroke: '#D17C2E',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        })
        ChineseText.forEach((item, index) => {
            let ChineseTextItem = new PIXI.Text(item, ChineseTextStyle);
            ChineseTextItem.position.set(index * 200 + 450, 700);
            this.addChild(ChineseTextItem);
        })
        let playButton = new PIXI.Sprite(PIXI.loader.resources["playButton_png"].texture);
        playButton.position.set(1500, 700);
        playButton.interactive = true;
        playButton.buttonMode = true;
        playButton.on("pointertap", this.playButtonEvent);
        this.addChild(playButton);

    }
    BtnBackNormalEvent() {
        SceneManager.run("EasyGameSelectPage")
    }
    playButtonEvent() {
        //console.log(2);
        SceneManager.run("PayGame");
    }
}
export default EasyGameIntroPage;