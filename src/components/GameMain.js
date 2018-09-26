import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";

//把各个页面进行分开 代码太多了 分块模块化....9/25

class HomePages extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addedHomePageStage, this)
        this.bg;
        this.BtnEasy = null;
        this.BtnHard = null;
    }
    addedHomePageStage() {
        //背景图

        this.bg = new PIXI.Sprite(PIXI.loader.resources['bgHome_png'].texture);
        this.addChild(this.bg);
        //容易按钮
        this.BtnEasy = new PIXI.Sprite(PIXI.loader.resources['btnEasy_png'].texture);
        this.BtnEasy.position.set(500, 850);
        this.BtnEasy.interactive = true;
        this.BtnEasy.buttonMode = true;
        this.BtnEasy.on("pointertap", this.BtnEasyEvent);
        this.addChild(this.BtnEasy);
        this.BtnHard = new PIXI.Sprite(PIXI.loader.resources["btnHard_png"].texture);
        this.BtnHard.interactive = true;
        this.BtnHard.buttonMode = true;
        this.BtnHard.on("pointertap", this.BtnHardEvent)
        this.BtnHard.position.set(1200, 850);
        this.addChild(this.BtnHard);
        //困难按钮
    }
    BtnEasyEvent() {
        console.log("easyBtn按钮第二次优化")
        SceneManager.run("EasyGameSelectPages");

    }
    BtnHardEvent() {
        console.log("hardBtn按钮第二次优化")
        SceneManager.run("HardGamePlayingPages");

    }

}
class EasyGameSelectPages extends PIXI.Container {
    constructor() {
        super();
        this.bg;
        this.BtnBackNormal;
        this.RecyclableSelect;
        this.KitchenSelect;
        this.HarmfulSelect;
        this.OtherSelect;
        this.Arrow = 0;
        this.on("added", this.addedStage, this);
    }
    addedStage() {
        //背景图
        this.bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(this.bg);
        //返回按钮
        this.BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        this.BtnBackNormal.position.set(100, 70);

        this.BtnBackNormal.interactive = true;
        this.BtnBackNormal.buttonMode = true;
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(this.BtnBackNormal);
        //可循环的垃圾箱
        this.RecyclableSelect = new PIXI.Sprite(PIXI.loader.resources["RecyclableSelect_png"].texture);
        this.RecyclableSelect.position.set(0, 500);

        this.RecyclableSelect.interactive = true;
        this.RecyclableSelect.buttonMode = true;
        this.RecyclableSelect.on("pointertap", this.RecyclableSelectEvent)

        this.addChild(this.RecyclableSelect);
        //厨房的垃圾箱
        this.KitchenSelect = new PIXI.Sprite(PIXI.loader.resources["KitchenSelect_png"].texture);
        this.KitchenSelect.position.set(500, 500);

        this.KitchenSelect.interactive = true;
        this.KitchenSelect.buttonMode = true;
        this.KitchenSelect.on("pointertap", this.KitchenSelectEvent);

        this.addChild(this.KitchenSelect);
        //有害的垃圾箱
        this.HarmfulSelect = new PIXI.Sprite(PIXI.loader.resources["HarmfulSelect_png"].texture);
        this.HarmfulSelect.position.set(1000, 500);

        this.HarmfulSelect.interactive = true;
        this.HarmfulSelect.buttonMode = true;
        this.HarmfulSelect.on("pointertap", this.HarmfulSelectEveent)
        this.addChild(this.HarmfulSelect);
        //其他的垃圾箱
        this.OtherSelect = new PIXI.Sprite(PIXI.loader.resources["OtherSelect_png"].texture);
        this.OtherSelect.position.set(1500, 500);

        this.OtherSelect.interactive = true;
        this.OtherSelect.buttonMode = true;
        this.OtherSelect.on("pointertap", this.OtherSelectEvent);

        this.addChild(this.OtherSelect);
        //箭头
        this.Arrow = new PIXI.Sprite(PIXI.loader.resources["Arrow_png"].texture);
        this.Arrow.position.set(100, 300)
        this.Arrow.interactive = true;
        this.Arrow.buttonMode = true;
        this.Arrow.on("pointertap", this.ArrowEvent);
        this.addChild(this.Arrow);
    }
    BtnBackNormalEvent() {
        SceneManager.run("HomePages")
    }
    RecyclableSelectEvent = () => {

        this.Arrow.position.set(100, 300);

    }
    KitchenSelectEvent = () => {
        this.Arrow.position.set(600, 300);
    }
    HarmfulSelectEveent = () => {
        this.Arrow.position.set(1100, 300);
    }
    OtherSelectEvent = () => {
        this.Arrow.position.set(1600, 300);
    }
    ArrowEvent = () => {

        Garbage.clearGarBage("position");
        Garbage.setGarBage('position', this.Arrow.position.x);
        SceneManager.run("EasyGameIntroPages");


    }
}
class EasyGameIntroPages extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addStage, this)
        this.boardPaint;
        this.ChineseText;
        this.contentText;
        this.title;
        this.bg;
        this.BtnBackNormal;
        this.RecyclableWaste
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
                    this.title = new PIXI.Text("Recyclable Waste", TitleStyle);
                    this.ChineseText = ["纸品\npaper", "布料\ncloth", "玻璃\nglass", "塑料\nplastics", "金属\nmetal"];
                    this.RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal'];
                    this.contentText = new PIXI.Text("再生利用价值较高，能进入废品回收渠\n道的垃圾。\nWaste that has high recycling value and can \n enter waste recycling channels", contentTextStyle);

                    break;
                case 600:
                    this.title = new PIXI.Text("Kitchen Waste", TitleStyle);
                    this.ChineseText = ["果皮\nfruit peels", "骨头\nbones", "菜叶\nvegetale leaves", "剩饭\nleftovers", "蛋壳\neggshells"]
                    this.RecyclableWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'];
                    // 厨房产生的食物类垃圾以及果皮
                    //Food waste and fruit peels from the kitchen
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
        //console.log(Garbage.getGarBage('position'), '----------------');
        //背景图
        this.bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(this.bg);
        //画板
        this.boardPaint = new PIXI.Sprite(PIXI.loader.resources["BoardPaint_png"].texture);
        this.boardPaint.position.set(300, 40);
        this.addChild(this.boardPaint);
        //返回按钮
        this.BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        this.BtnBackNormal.position.set(100, 70);
        this.BtnBackNormal.interactive = true;
        this.BtnBackNormal.buttonMode = true;
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(this.BtnBackNormal);
        //字体

        this.title.position.set(650, 100);
        this.addChild(this.title)



        this.contentText.position.set(450, 300);
        this.addChild(this.contentText);
        this.RecyclableWaste.forEach((item, index) => {
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
        this.ChineseText.forEach((item, index) => {
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
        SceneManager.run("EasyGameSelectPages")
    }
    playButtonEvent() {
        //console.log(2);
        SceneManager.run("EasyGamePlayingPages");
    }
}
class EasyGamePlayingPages extends PIXI.Container {
    constructor() {
        super();
        this.on('removed', this.removeFromStage, this);
        this.on('added', this.addedToStage, this);
        this.unHappyAnimal;
        this.HappyAnimal;
        this.suitable;
        this.loop;
        this.bg;
        this.house;
        this.wheel;
        this.Flower;
        this.Alarm; //时间
        this.BtnBackNormal;
        this.TimeMessage;
        this.Recyclablelitter;
        this.RecyclablelitterCap;
        this.Scorebg;
        this.ScoreMessage;
        this.ScoreNum = 0;
        this.TimeNum = 60;
        this.SelectWaste = [];
        this.track = [];
        this.wheelSprite = [];
        this.RecyclableSprite = [];
        this.WasterClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'];
        this.RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal'];
        this.KitchenWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'];
        this.HazardousWaste = ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'];
        this.OthersWaster = ["toiletPaper", "sands", "ceramics", "bricks", "crocks"];
        this.Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
            'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
            'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints',
            "toiletPaper", "sands", "ceramics", "bricks", "crocks"
        ];
        //弹窗
        this.pop;
        this.DialogText;
        this.yesBtn;
        this.noBtn;
        this.graphics;
        //时间到弹窗
        this.timePop;
        this.naoZPop;
        this.graphicsTime;
        //总结弹窗
        this.popSummary;
        this.success;
        this.fhBtn;
        this.againBtn;
        this.graphicsSummary;
    }
    removeFromStage() {
        if (this.loop) {
            this.loop.destroy();
        }
        //this.destroy();
    }
    addedToStage() {
        (() => {
            this.TimeNum = 60;
            this.track = [];
            this.RecyclableSprite = [];
            switch (Garbage.getGarBage("position")) {
                case 100:
                    this.Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["RecyclableLitter"].texture);
                    this.RecyclablelitterCap = new PIXI.Sprite(PIXI.loader.resources["RecyclableLitterCap"].texture);
                    this.SelectWaste = this.RecyclableWaste
                    this.suitable = 0;
                    break;
                case 600:
                    this.Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["KitchenLitter"].texture);
                    this.RecyclablelitterCap = new PIXI.Sprite(PIXI.loader.resources["KitchenLitterCap"].texture);
                    this.suitable = 1;
                    this.SelectWaste = this.KitchenWaste
                    break;
                case 1100:
                    this.Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["HarmfulLitter"].texture);
                    this.RecyclablelitterCap = new PIXI.Sprite(PIXI.loader.resources["HarmfulLitterCap"].texture);
                    this.suitable = 2;
                    this.SelectWaste = this.HazardousWaste
                    break;
                case 1600:
                    this.Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["OtherLitter"].texture);
                    this.RecyclablelitterCap = new PIXI.Sprite(PIXI.loader.resources["OtherLitterCap"].texture);
                    this.suitable = 3;
                    this.SelectWaste = this.OthersWaster
                    break;
            }

        })()
        let ScoreStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 60,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        //背景图
        this.bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(this.bg);
        //房子图片
        this.house = new PIXI.Sprite(PIXI.loader.resources['house_png'].texture);
        this.house.position.set(1450, 100);
        this.addChild(this.house);
        //垃圾箱
        this.Recyclablelitter.position.set(100, 480);
        this.addChild(this.Recyclablelitter);
        //垃圾箱的盖子
        this.RecyclablelitterCap.position.set(83, 400)
        this.addChild(this.RecyclablelitterCap);
        //传送带
        for (let i = 0; i < 2; i++) {
            let track0 = new PIXI.Sprite(PIXI.loader.resources['track_png'].texture);
            track0.position.set(i * (-1920), 700);
            this.track.push(track0);
            this.addChild(track0);
        }
        //轮子背景图
        for (let wheelNum = 0; wheelNum <= 15; wheelNum++) {
            this.wheel = new PIXI.Sprite(PIXI.loader.resources['wheel_png'].texture);
            this.wheel.position.set(wheelNum * 138, 1050);
            this.wheel.anchor.set(0.5);
            this.wheelSprite.push(this.wheel);
            this.addChild(this.wheel);
        }
        //分数背景图片
        this.Scorebg = new PIXI.Sprite(PIXI.loader.resources['score_png'].texture);
        this.Scorebg.position.set(1000, 40);
        this.addChild(this.Scorebg);
        //在分数背景图下写分数
        this.ScoreMessage = new PIXI.Text(this.ScoreNum, ScoreStyle)
        this.ScoreMessage.position.set(1670, 100)
        this.addChild(this.ScoreMessage);
        //时间
        this.TimeMessage = new PIXI.Text("00:60", ScoreStyle);
        this.TimeMessage.position.set(1200, 100);
        this.addChild(this.TimeMessage);
        //花的图片
        this.Flower = new PIXI.Sprite(PIXI.loader.resources["flower_png"].texture);
        this.Flower.position.set(1500, 95);
        this.addChild(this.Flower);
        //时间的图片
        this.Alarm = new PIXI.Sprite(PIXI.loader.resources["alarm_png"].texture);
        this.Alarm.position.set(1050, 95);
        this.addChild(this.Alarm);
        //返回按钮
        this.BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        this.BtnBackNormal.position.set(100, 70);
        this.BtnBackNormal.interactive = true;
        this.BtnBackNormal.buttonMode = true;
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(this.BtnBackNormal);
        //小动物
        this.unHappyAnimal = new PIXI.Sprite(PIXI.loader.resources['unHappy_jpg'].texture);
        this.unHappyAnimal.scale.set(0.1, 0.1);
        this.unHappyAnimal.position.set(90, 100);
        this.HappyAnimal = new PIXI.Sprite(PIXI.loader.resources['Happy_jpg'].texture);
        this.HappyAnimal.scale.set(0.2, 0.2)
        this.HappyAnimal.position.set(90, 50)
        this.addChild(this.HappyAnimal);
        this.HappyAnimal.visible = false;
        this.addChild(this.unHappyAnimal);
        //添加垃圾
        this.SelectWaste.forEach((item, index) => {
            let RecyclableItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
            RecyclableItem.x = index * (-400);
            RecyclableItem.y = 870;
            RecyclableItem.pivot.y = RecyclableItem.height;
            RecyclableItem.EventChange = false; //点击事件是否发生
            RecyclableItem.EventChangePosition = 2000; //模拟点击事件的位置
            RecyclableItem.ClassItem = this.WasterClass[this.suitable]; //定义垃圾属性
            RecyclableItem.scaleV = 0 //定义垃圾在回收的缩放比例有一定的加速效果

            RecyclableItem.buttonMode = true; //定义点击事件
            RecyclableItem.interactive = true;
            RecyclableItem.on("pointerdown", () => { //点击事件
                RecyclableItem.EventChange = true;
                RecyclableItem.EventChangePosition = RecyclableItem.x //点击位置

            });
            this.RecyclableSprite.push(RecyclableItem);
            this.addChild(RecyclableItem);
        })

        //this.addChild(Dialog.graphics, Dialog.pop, Dialog.DialogText, Dialog.yesBtn, Dialog.noBtn)
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.start();
        //第一个弹窗吧关闭按钮的弹窗
        this.pop = new PIXI.Sprite(PIXI.Texture.from('pop_png'));
        this.pop.position.set(400, 100);
        this.pop.visible = true;
        this.pop.alpha = 1;
        this.pop.interactive = true;
        //字体
        this.DialogText = new PIXI.Text("Do you really want to quit ? ", ScoreStyle);
        this.DialogText.position.set(600, 350)
            //yes按钮
        this.yesBtn = new PIXI.Sprite(PIXI.Texture.from('yesBtn_0_png'));
        this.yesBtn.position.set(600, 700);
        this.yesBtn.interactive = true;
        this.yesBtn.buttonMode = true;
        this.yesBtn.on('pointertap', this.yesButtonEvent);
        //no按钮
        this.noBtn = new PIXI.Sprite(PIXI.Texture.from('noBtn_0_png'));
        this.noBtn.interactive = true;
        this.noBtn.buttonMode = true;
        this.noBtn.on("pointertap", this.noButtonEvent)
        this.noBtn.position.set(1200, 700);
        //遮罩层
        this.graphics = new PIXI.Graphics();
        //this.graphics = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture)
        this.graphics.beginFill(0x5500).drawRect(0, 0, 1920, 1080).endFill();
        this.graphics.alpha = 0.1;
        //this.graphics.fillAlpha = 0.1;
        //第二个弹窗 是时间到的按钮
        this.timePop = new PIXI.Sprite(PIXI.Texture.from('Timeout_png'));
        this.timePop.position.set(300, 400);
        this.timePop.visible = false;
        this.timePop.interactive = true;
        //闹钟图
        this.naoZPop = new PIXI.Sprite(PIXI.Texture.from('alarmclock_png'));
        this.naoZPop.position.set(830, 200);
        this.naoZPop.visible = false;
        this.naoZPop.interactive = true;
        //遮罩层
        this.graphicsTime = new PIXI.Graphics();
        this.graphicsTime.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphicsTime.alpha = 0.1;
        this.graphicsTime.visible = false;
        this.addChild(this.graphicsTime, this.timePop, this.naoZPop)
            //第三个弹框 总结弹窗
        this.popSummary = new PIXI.Sprite(PIXI.Texture.from('endPop_png'));
        this.popSummary.position.set(500, 200);
        this.popSummary.visible = false;
        this.popSummary.interactive = true;
        //success图标
        this.success = new PIXI.Sprite(PIXI.Texture.from('success_png'));
        this.success.visible = false;
        this.success.position.set(600, 100);
        //返回按钮
        this.fhBtn = new PIXI.Sprite(PIXI.Texture.from('backBtn_0_png'));
        this.fhBtn.position.set(650, 700);
        this.fhBtn.visible = false;
        this.fhBtn.interactive = true;
        this.fhBtn.buttonMode = true;
        this.fhBtn.on('pointertap', this.fhBtnEvent);
        //再来一次按钮
        this.againBtn = new PIXI.Sprite(PIXI.Texture.from('againBtn_0'));
        this.againBtn.visible = false;
        this.againBtn.interactive = true;
        this.againBtn.buttonMode = true;
        this.againBtn.on("pointertap", this.againBtnEvent)
        this.againBtn.position.set(1100, 700);
        //遮罩层
        this.graphicsSummary = new PIXI.Graphics();
        this.graphicsSummary.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphicsSummary.visible = false;
        this.graphicsSummary.alpha = 0.6;


    }
    fhBtnEvent() {
        console.log(111)
        this.removeChild(this.graphicsSummary, this.popSummary, this.fhBtn, this.againBtn)
        SceneManager.run("EasyGameSelectPages");
    }
    againBtnEvent() {
        //SceneManager.run("EasyGameSelectPage");
        SceneManager.run("EasyGamePlayingPages")
    }
    BtnBackNormalEvent = () => {
        this.loop.stop();
        this.addChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn)
            //SceneManager.run("EasyGameSelectPages");
        SceneManager.destroyScene("EasyGameMainPages");
        this.RecyclableSprite.forEach((item) => {
            item.interactive = false;
            item.buttonMode = false;
        })

    }
    yesButtonEvent = () => {
        this.removeChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn);
        SceneManager.run("EasyGameSelectPages");
        //this.
    }
    noButtonEvent = () => {
        this.removeChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn);
        this.RecyclableSprite.forEach((item) => {
            item.interactive = true;
            item.buttonMode = true;
        })
        this.loop.start();
    }
    gameloop(delta) {
        //传送带
        console.log("检查循环函数是否发生......");
        this.track.forEach((item) => {
            item.x >= 1920 && item.position.set(-1920, 700);
            item.x += 10;
        });
        //轮子
        this.wheelSprite.forEach((item) => {
                item.rotation += 0.1 * delta;
            })
            //定义时间函数
        this.TimeNum += 1;
        if (this.TimeNum < 6660) {
            this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)));
        } else if (this.TimeNum == 6660) {
            // alert("游戏结束")
            this.timePop.visible = true;
            this.naoZPop.visible = true;
            this.graphicsTime.visible = true;
            this.BtnBackNormal.interactive = false;
            this.BtnBackNormal.buttonMode = false;
            this.RecyclableSprite.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })
            this.loop.stop();
            setTimeout(() => {
                this.removeChild(this.graphicsTime, this.timePop, this.naoZPop);
                this.addChild(this.graphicsSummary, this.popSummary, this.fhBtn, this.againBtn)
                this.popSummary.visible = true;
                this.success.visible = true;
                this.fhBtn.visible = true;
                this.againBtn.visible = true;
                console.log("定时器发生......")
                    //SceneManager.run("EasyGameSelectPages")
            }, 2000)


        } else {
            this.TimeMessage.text = (Math.floor(this.TimeNum / 3600) + ":" + Math.floor((this.TimeNum - 3600) / 60))
        }
        //定义动物的层级
        this.setChildIndex(this.unHappyAnimal, 8); //这句写的不好
        this.setChildIndex(this.HappyAnimal, 9);

        //精灵循环
        this.RecyclableSprite.forEach((item, index, arr) => {
            if (item.EventChange) {
                //定义点击事件后发生的事情
                item.scaleV += 1;
                item.anchor.set(0.5, 0.5);
                item.y += -(500 - 100) / 60;
                item.x += -(item.EventChangePosition) / 60;
                item.scale.set(1 - item.scaleV / 60, 1 - item.scaleV / 60);
            } else {
                //定义正常走的事件
                item.x += 10;
            }
            if (item.x >= 400 * 5 || item.y <= 150) {
                if (item.y <= 150) { //精灵到了垃圾箱
                    //改变分数的
                    if (item.ClassItem == this.WasterClass[this.suitable]) {
                        this.ScoreNum += 5;
                        this.unHappyAnimal.visible = false;
                        this.HappyAnimal.visible = true;
                    } else {
                        this.ScoreNum = this.ScoreNum - 5;
                        this.unHappyAnimal.visible = true;
                        this.HappyAnimal.visible = false;
                    }
                    this.ScoreMessage.text = "X" + this.ScoreNum;
                    //改变精灵
                    //this.unHappyAnimal = this.HappyAnimal;
                    this.addChild(this.unHappyAnimal);
                }
                this.removeChild(item); //先移除原有的精灵
                let RandomIndex;
                RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
                item = new PIXI.Sprite(PIXI.loader.resources[this.Waster[RandomIndex]].texture);
                item.EventChangePosition = 2000; //对创建的精灵定义属性
                item.scaleV = 0;
                item.EventChange = false;
                item.buttonMode = true;
                item.interactive = true;
                item.ClassItem = this.WasterClass[Math.floor(RandomIndex / 5)];
                item.on("pointerdown", () => { //定义精灵事件
                    item.EventChange = true;
                    item.EventChangePosition = item.x; //消失的位置
                })
                arr[index] = item //替换原有的精灵
                item.position.set(item.EventChangePosition - 2400, 870); //给精灵添加到位置
                item.pivot.y = item.height;
                this.addChild(item) //把精灵添加到舞台
            }

        });
    }

}
class HardGamePlayingPages extends PIXI.Container {
    constructor() {
        super();
        this.bg;
        this.track = [];
        this.wheel;
        this.wheelSprite = [];
        this.BtnBackNormal;
        this.Flower;
        this.Alarm;
        this.Scorebg;
        this.TimeMessage;
        this.TimeNum = 60;
        this.ScoreMessage;
        this.ScoreNum = 0;
        this.WasterBox = ["RecyclableLitter", "KitchenLitter", "HarmfulLitter", "OtherLitter"];
        this.WasterBoxCap = ["RecyclableLitterCap", "KitchenLitterCap", "HarmfulLitterCap", "OtherLitterCap"];
        this.Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
            'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
            'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints',
            "toiletPaper", "sands", "ceramics", "bricks", "crocks"
        ];
        this.WasterClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'];
        this.WasterBoxCapSprite = [];
        this.WasterGather = [];
        //弹窗
        this.pop;
        this.DialogText;
        this.yesBtn;
        this.noBtn;
        this.graphics;
        //时间到弹窗
        this.timePop;
        this.naoZPop;
        this.graphicsTime;
        //总结弹窗
        this.popSummary;
        this.success;
        this.fhBtn;
        this.againBtn;
        this.graphicsSummary;
        this.on('removed', this.removeFromStage, this);
        this.on("added", this.addedStage, this);

    }
    addedStage() {
        (() => {
            //console.log(this.WasterGather)
            this.TimeNum = 60;
            this.WasterGather = [];
            this.ScoreNum = 0;
            //console.log(this.Waster);
        })()
        let ScoreStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 60,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        this.bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(this.bg);
        //垃圾箱
        this.WasterBox.forEach((item, index) => {
            let WasterBoxItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
            WasterBoxItem.position.set(index * 500, 380);
            this.addChild(WasterBoxItem);
        })

        //传送带
        for (let i = 0; i < 2; i++) {
            let track0 = new PIXI.Sprite(PIXI.loader.resources['track_png'].texture);
            track0.position.set(i * (-1920), 700);
            this.track.push(track0);
            this.addChild(track0);
        }
        //轮子背景图
        for (let wheelNum = 0; wheelNum <= 15; wheelNum++) {
            this.wheel = new PIXI.Sprite(PIXI.loader.resources['wheel_png'].texture);
            this.wheel.position.set(wheelNum * 140, 1050);
            this.wheel.anchor.set(0.5);
            this.wheelSprite.push(this.wheel);
            this.addChild(this.wheel);
        }
        //返回按钮
        this.BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        this.BtnBackNormal.position.set(100, 70);
        this.BtnBackNormal.interactive = true;
        this.BtnBackNormal.buttonMode = true;
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(this.BtnBackNormal);
        //分数背景图片
        this.Scorebg = new PIXI.Sprite(PIXI.loader.resources['score_png'].texture);
        this.Scorebg.position.set(1000, 40);
        this.addChild(this.Scorebg);
        //花的图片
        this.Flower = new PIXI.Sprite(PIXI.loader.resources["flower_png"].texture);
        this.Flower.position.set(1500, 95);
        this.addChild(this.Flower);
        //时间的图片
        this.Alarm = new PIXI.Sprite(PIXI.loader.resources["alarm_png"].texture);
        this.Alarm.position.set(1050, 95);
        this.addChild(this.Alarm);
        //时间数据
        this.TimeMessage = new PIXI.Text("00:00", ScoreStyle);
        this.TimeMessage.position.set(1200, 100);
        this.addChild(this.TimeMessage);
        //在分数背景图下写分数
        this.ScoreMessage = new PIXI.Text(this.ScoreNum, ScoreStyle)
        this.ScoreMessage.position.set(1670, 100)
        this.addChild(this.ScoreMessage);
        //箱子盖
        this.WasterBoxCap.forEach((item, index) => {
            let WasterBoxCapItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
            WasterBoxCapItem.interactive = true;
            WasterBoxCapItem.buttonMode = true;
            WasterBoxCapItem.Class = this.WasterClass[index];
            WasterBoxCapItem.on("pointertap", () => {
                console.log(22)
                console.log(this.WasterGather);
                let a = this.WasterGather.filter((item, index, arr) => {
                    return (item.StartPostion != null)
                })
                console.log(a)
                if (a.length > 0) {
                    console.log(1)
                    a[0].StartPostion = a[0].x
                    a[0].EndPostion = WasterBoxCapItem.x;
                    a[0].CheckClass = this.WasterClass[index];
                }


            })
            WasterBoxCapItem.position.set(index * 500 - 20, 300);
            this.WasterBoxCapSprite.push(WasterBoxCapItem);
            this.addChild(WasterBoxCapItem);
        })

        //创建垃圾物品
        for (let i = 0; i < 5; i++) {
            let index = Math.floor(Math.random() * 20)

            let WasterItem = new PIXI.Sprite(PIXI.loader.resources[this.Waster[index]].texture);
            WasterItem.position.set(400 * i, 730);

            WasterItem.Class = this.WasterClass[Math.floor(index / 5)]; //定义属性
            WasterItem.CheckClass = null; //定义检查属性
            WasterItem.interactive = true; //定义鼠标事件
            WasterItem.buttonMode = true; //改变鼠标按钮的情况
            WasterItem.ButtonClick = false; //是否点击了事件发生
            WasterItem.StartPostion = null; //开始位置 
            WasterItem.EndPostion = null; //结束位置
            WasterItem.on("pointertap", () => {
                WasterItem.ButtonClick = true;
                WasterItem.StartPostion = WasterItem.x;
            })

            this.WasterGather.push(WasterItem);
            this.addChild(WasterItem);
        }
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.start();
        //第一个弹窗吧关闭按钮的弹窗
        this.pop = new PIXI.Sprite(PIXI.Texture.from('pop_png'));
        this.pop.position.set(400, 100);
        this.pop.visible = true;
        this.pop.alpha = 1;
        this.pop.interactive = true;
        //字体
        this.DialogText = new PIXI.Text("Do you really want to quit ? ", ScoreStyle);
        this.DialogText.position.set(600, 350)
            //yes按钮
        this.yesBtn = new PIXI.Sprite(PIXI.Texture.from('yesBtn_0_png'));
        this.yesBtn.position.set(600, 700);
        this.yesBtn.interactive = true;
        this.yesBtn.buttonMode = true;
        this.yesBtn.on('pointertap', this.yesButtonEvent);
        //no按钮
        this.noBtn = new PIXI.Sprite(PIXI.Texture.from('noBtn_0_png'));
        this.noBtn.interactive = true;
        this.noBtn.buttonMode = true;
        this.noBtn.on("pointertap", this.noButtonEvent)
        this.noBtn.position.set(1200, 700);
        //遮罩层
        this.graphics = new PIXI.Graphics();
        //this.graphics = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture)
        this.graphics.beginFill(0x5500).drawRect(0, 0, 1920, 1080).endFill();
        this.graphics.alpha = 0.1;
        //this.graphics.fillAlpha = 0.1;
        //第二个弹窗 是时间到的按钮
        this.timePop = new PIXI.Sprite(PIXI.Texture.from('Timeout_png'));
        this.timePop.position.set(300, 400);
        this.timePop.visible = false;
        this.timePop.interactive = true;
        //闹钟图
        this.naoZPop = new PIXI.Sprite(PIXI.Texture.from('alarmclock_png'));
        this.naoZPop.position.set(830, 200);
        this.naoZPop.visible = false;
        this.naoZPop.interactive = true;
        //遮罩层
        this.graphicsTime = new PIXI.Graphics();
        this.graphicsTime.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphicsTime.alpha = 0.1;
        this.graphicsTime.visible = false;
        this.addChild(this.graphicsTime, this.timePop, this.naoZPop)
            //第三个弹框 总结弹窗
        this.popSummary = new PIXI.Sprite(PIXI.Texture.from('endPop_png'));
        this.popSummary.position.set(500, 200);
        this.popSummary.visible = false;
        this.popSummary.interactive = true;
        //success图标
        this.success = new PIXI.Sprite(PIXI.Texture.from('success_png'));
        this.success.visible = false;
        this.success.position.set(600, 100);
        //返回按钮
        this.fhBtn = new PIXI.Sprite(PIXI.Texture.from('backBtn_0_png'));
        this.fhBtn.position.set(650, 700);
        this.fhBtn.visible = false;
        this.fhBtn.interactive = true;
        this.fhBtn.buttonMode = true;
        this.fhBtn.on('pointertap', this.fhBtnEvent);
        //再来一次按钮
        this.againBtn = new PIXI.Sprite(PIXI.Texture.from('againBtn_0'));
        this.againBtn.visible = false;
        this.againBtn.interactive = true;
        this.againBtn.buttonMode = true;
        this.againBtn.on("pointertap", this.againBtnEvent)
        this.againBtn.position.set(1100, 700);
        //遮罩层
        this.graphicsSummary = new PIXI.Graphics();
        this.graphicsSummary.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphicsSummary.visible = false;
        this.graphicsSummary.alpha = 0.6;

    }
    fhBtnEvent() {
        console.log(111)
        this.removeChild(this.graphicsSummary, this.popSummary, this.fhBtn, this.againBtn)
        SceneManager.run("HomePages");
    }
    againBtnEvent() {
        //SceneManager.run("EasyGameSelectPage");
        SceneManager.run("HardGamePlayingPages")
    }
    BtnBackNormalEvent = () => {
            this.loop.stop();
            this.addChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn)
            this.WasterGather.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })

        }
        //关闭窗口 中的yes按钮事件
    yesButtonEvent = () => {
            this.removeChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn);
            SceneManager.run("HomePages");
        }
        //关闭窗口中的no 按钮事件
    noButtonEvent = () => {
        this.removeChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn);
        this.WasterGather.forEach((item) => {
            item.interactive = true;
            item.buttonMode = true;
        })
        this.loop.start();
    }
    removeFromStage() {
        if (this.loop) {
            this.loop.destroy();
        }
        this.removeChildren(0, this.children.length)
    }
    BtnBackNormalEvent() {
        SceneManager.run("HomePages");
    }
    gameloop(delta) {
        this.TimeNum += 1;
        if (this.TimeNum < 6660) {
            this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)));
        } else if (this.TimeNum == 6660) {
            console.log(1)
            this.timePop.visible = true;
            this.naoZPop.visible = true;
            this.graphicsTime.visible = true;
            this.BtnBackNormal.interactive = false;
            this.BtnBackNormal.buttonMode = false;
            this.WasterGather.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })
            this.loop.stop();
            setTimeout(() => {
                this.removeChild(this.graphicsTime, this.timePop, this.naoZPop);
                this.addChild(this.graphicsSummary, this.popSummary, this.fhBtn, this.againBtn)
                this.popSummary.visible = true;
                this.success.visible = true;
                this.fhBtn.visible = true;
                this.againBtn.visible = true;
                console.log("定时器发生......")
                    //SceneManager.run("EasyGameSelectPages")
            }, 2000)
        } else {
            this.TimeMessage.text = (Math.floor(this.TimeNum / 3600) + ":" + Math.floor((this.TimeNum - 3600) / 60))
        }
        //传送带
        console.log(0);
        this.track.forEach((item) => {
            item.x >= 1920 && item.position.set(-1920, 700);
            item.x += 5;
        });
        //轮子
        this.wheelSprite.forEach((item) => {
            item.rotation += 0.1 * delta;
        })
        this.WasterGather.forEach((item, index, arr) => {
            item.x += 5;
            if (item.ButtonClick) {
                item.anchor.set(0.5, 0.5);
                item.scale.set(1.2, 1.2)
            }
            if ((item.StartPostion != null) && (item.EndPostion != null)) {
                item.y += (300 - 730) / 60
                item.x += (item.EndPostion - item.StartPostion) / 60
            }
            if (item.y < 300 || item.x > 2000) {
                if (item.y < 300) {
                    if (item.CheckClass == item.Class) {
                        this.ScoreNum += 5;
                    } else {
                        this.ScoreNum -= 5;
                    }
                }

                item.visible = false;
                //this.removeChild(item);
                this.removeChild(item); //先移除原有的精灵
                let RandomIndex;
                RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
                item = new PIXI.Sprite(PIXI.loader.resources[this.Waster[RandomIndex]].texture);

                item.Class = this.WasterClass[Math.floor(index / 5)]; //定义属性
                item.CheckClass = null; //定义检查属性

                item.interactive = true; //定义鼠标事件
                item.buttonMode = true; //改变鼠标按钮的情况
                item.ButtonClick = false; //是否点击了事件发生
                item.StartPostion = null; //开始位置 
                item.EndPostion = null; //结束位置

                item.on("pointerdown", () => { //定义精灵事件
                    item.ButtonClick = true;
                    item.StartPostion = item.x; //消失的位置
                })

                arr[index] = item //替换原有的精灵
                item.position.set(-400, 750); //给精灵添加到位置
                this.addChild(item) //把精灵添加到舞台
            }

            this.ScoreMessage.text = this.ScoreNum;
        })
    }
}
export {
    HomePages,
    EasyGameSelectPages,
    EasyGameIntroPages,
    EasyGamePlayingPages,
    HardGamePlayingPages,
}