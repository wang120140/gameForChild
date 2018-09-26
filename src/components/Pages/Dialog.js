import * as PIXI from 'pixi.js';

class Dialog extends PIXI.Container {
    constructor() {
        super()
        this.pop;
        this.DialogText;
        this.yesBtn;
        this.noBtn;
        this.graphics;
        this.on("added", this.addStage, this)
    }
    addStage() {
        //第一个弹窗
        this.pop = new PIXI.Sprite(PIXI.Texture.from('pop_png'));
        this.pop.position.set(400, 100);
        this.pop.visible = true;
        this.pop.interactive = true;
        //字体
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
        this.graphics.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphics.alpha = 0.1;
        //graphics.fillAlpha = 0.1;
        this.addChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn)
    }
    yesButtonEvent() {
        console.log("yes button")
    }
    noButtonEvent() {
        console.log("no button")
    }
}

class DialogTime extends PIXI.Container {
    constructor() {
        super();
        this.timePop;
        this.naoZPop;
        this.graphics;

        this.on("added", this.addStage, this)
    }
    addStage() {
        //第三个弹窗
        this.timePop = new PIXI.Sprite(PIXI.Texture.from('Timeout_png'));
        this.timePop.position.set(300, 400);
        this.timePop.visible = true;
        this.timePop.interactive = true;
        //闹钟图
        this.naoZPop = new PIXI.Sprite(PIXI.Texture.from('alarmclock_png'));
        this.naoZPop.position.set(830, 200);
        this.naoZPop.visible = true;
        this.naoZPop.interactive = true;
        //遮罩层
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphics.alpha = 0.1;
        this.addChild(this.graphics, this.timePop, this.naoZPop)
    }
}

class DialogSummary extends PIXI.Container {
    constructor() {
        super();
        this.popSummary;
        this.success;
        this.fhBtn;
        this.againBtn;
        this.graphicsSummary;
        this.on("added", this.addStage, this)
    }
    addStage() {
        //第二个弹窗
        this.popSummary = new PIXI.Sprite(PIXI.Texture.from('endPop_png'));
        this.popSummary.position.set(500, 200);
        this.popSummary.visible = true;
        this.popSummary.interactive = true;
        //success图标
        this.success = new PIXI.Sprite(PIXI.Texture.from('success_png'));
        this.success.position.set(600, 100);
        //返回按钮
        this.fhBtn = new PIXI.Sprite(PIXI.Texture.from('backBtn_0_png'));
        this.fhBtn.position.set(650, 700);
        this.fhBtn.interactive = true;
        this.fhBtn.buttonMode = true;
        this.fhBtn.on('pointerdown', this.onBtn, this);
        //再来一次按钮
        this.againBtn = new PIXI.Sprite(PIXI.Texture.from('againBtn_0'));
        this.againBtn.position.set(1100, 700);
        //遮罩层
        this.graphicsSummary = new PIXI.Graphics();
        this.graphicsSummary.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphicsSummary.alpha = 0.6;
        this.addChild(this.graphicsSummary, this.popSummary, this.fhBtn, this.againBtn)
    }
}
class DialogSwiper extends PIXI.Container {
    constructor() {
        super();
        //假设的数组结合
        this.ContentArr = [];
        //画板
        this.IntroBoard;
        //主题背景
        this.TitleBg;
        //主题信息
        this.TitleMsg;
        this.TitleMsgArr = [];
        this.TitleClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'];
        //内容文本信息
        this.Reference;
        this.ReferenceText = ["再生利用价值较高，能进入废品回收渠\n道的垃圾。\nWaste that has high recycling value and can \n enter waste recycling channels",
                "厨房产生的食物类垃圾以及果皮。\nFood waste and fruit peels from the kitchen",
                "含有有毒有害化学物质的垃圾。\nWaste that contains toxic and harmful \nchemicals",
                "除上述几类垃圾之外的砖瓦陶瓷、 渣土、 卫生\n纸等等。\nIn addition to the above types of waste, waste \nlike bricks, ceramics, muck, toilet paper, etc."
            ]
            //垃圾图片信息
        this.LitterPicture;
        this.LitterPictureArr = [
            ['paper', 'cloth', 'glass', 'plastics', 'metal'],
            ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'],
            ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'],
            ["toiletPaper", "sands", "ceramics", "bricks", "crocks"],
        ];
        //放垃圾具体信息文本
        this.LitterText;
        this.LitterTextArr = [
                ["纸品\npaper", "布料\ncloth", "玻璃\nglass", "塑料\nplastics", "金属\nmetal"],
                ["果皮\nfruit peels", "骨头\nbones", "菜叶\nvegetale leaves", "剩饭\nleftovers", "蛋壳\neggshells"],
                ["药品\nmedicines", "电池\nbatteries", "温度计\nthermometers", "灯泡\nlight bulbs", "油漆\noil paints"],
                ["卫生纸\ntoilet paper", "沙土\nsands and soil", "陶瓷碗\nceramics", "砖块\nbricks", "瓦罐\ncrocks"]
            ]
            //放小滑块按钮
        this.DotNormal;
        this.DotCheck;
        this.DotCheckArr = [];
        //开始按钮
        this.StartBtn;
        //鼠标事件
        this.mouseStartPosition;
        this.mouseEndPosition;

        this.graphics;
        this.boardPaint;
        this.ChineseText;
        this.contentText;
        this.title;
        this.bg;
        this.BtnBackNormal;
        this.RecyclableWaste

        this.on("added", this.addStage, this);
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
        //放蒙层
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0x0000).drawRect(0, 0, 1920 * 4, 1080).endFill();
        this.graphics.alpha = 0.01;
        this.graphics.interactive = true;
        this.graphics.buttonMode = true;
        this.graphics.on("pointerdown", this.onDragStart)
            .on("pointerup", this.onDragEnd)
            .on("pointerout", this.onDragOut)
            .on("pointermove", this.onDragMove)
            //放画板
        for (let i = 0; i < 4; i++) {
            //放画板
            this.IntroBoard = new PIXI.Sprite(PIXI.loader.resources["IntroBoard_png"].texture);
            this.IntroBoard.position.set(1920 * i + 200, 200);
            this.ContentArr.push(this.IntroBoard);
            this.addChild(this.IntroBoard);
            //放主题背景图
            this.TitleBg = new PIXI.Sprite(PIXI.loader.resources["TitleBG_png"].texture);
            this.TitleBg.position.set(1920 * i + 550, 200);
            this.ContentArr.push(this.TitleBg);
            this.addChild(this.TitleBg);
            //放主题信息
            this.TitleMsg = new PIXI.Text(this.TitleClass[i], TitleStyle);
            this.TitleMsg.position.set(1920 * i + 650, 200);
            this.TitleMsgArr.push(this.TitleMsg);
            this.addChild(this.TitleMsg);
            //放内容文本
            this.Reference = new PIXI.Text(this.ReferenceText[i], contentTextStyle);
            this.Reference.position.set(1920 * i + 300, 350);
            this.TitleMsgArr.push(this.Reference);
            this.addChild(this.Reference);
            //放垃圾图片信息
            this.LitterPictureArr[i].forEach((PicItem, PicIndex) => {
                    this.LitterPicture = new PIXI.Sprite(PIXI.loader.resources[PicItem].texture)
                    this.LitterPicture.position.set(1920 * i + 200 * PicIndex + 300, 600);
                    this.LitterPicture.scale.set(0.5, 0.5);
                    this.ContentArr.push(this.LitterPicture);
                    this.addChild(this.LitterPicture);
                })
                //放文本信息介绍
            this.LitterTextArr[i].forEach((LitItem, LitIndex) => {
                    this.LitterText = new PIXI.Text(LitItem, contentTextStyle);
                    this.LitterText.position.set(1920 * i + 200 * LitIndex + 300, 700);
                    this.TitleMsgArr.push(this.LitterText);
                    this.addChild(this.LitterText);
                })
                //小滑块
            for (let m = 0; m < 4; m++) {
                this.DotNormal = new PIXI.Sprite(PIXI.loader.resources["CarouselDotNomal"].texture);
                this.DotNormal.position.set(1920 * i + 100 * m + 700, 850);
                this.ContentArr.push(this.DotNormal);
                this.DotCheck = new PIXI.Sprite(PIXI.loader.resources["CarouselDotCheck"].texture);
                this.DotCheck.position.set(1920 * i + 100 * m + 700, 850);
                this.DotCheck.visible = false;
                this.DotCheckArr.push(this.DotCheck);
                this.ContentArr.push(this.DotCheck);
                this.addChild(this.DotNormal, this.DotCheck);
            }

        }
        //小按钮控制
        let indexNum;
        indexNum = -Math.round((this.DotCheckArr[0].position.x - 700) / 1920)
        console.log(indexNum);
        console.log(this.DotCheckArr);
        for (let m = 0; m < 4; m++) {
            this.DotCheckArr[m * 4 + indexNum].visible = true;
        }
        //放开始按钮

        this.StartBtn = new PIXI.Sprite(PIXI.loader.resources["StartBtn_png"].texture);
        this.StartBtn.position.set(1300 + 1920 * 3, 800);
        this.addChild(this.StartBtn);
        this.addChild(this.graphics);
    }
    onDragStart = (event) => {

        this.dragging = true;
        this.mouseStartPosition = event.data.global.x;

    }
    onDragMove = (event) => {

        if (this.dragging) {
            this.ContentArr.forEach((item) => {
                item.x += (event.data.global.x - this.mouseStartPosition) / 10;
            })
            this.TitleMsgArr.forEach((item) => {
                item.x += (event.data.global.x - this.mouseStartPosition) / 10;
            })
            this.StartBtn.x += (event.data.global.x - this.mouseStartPosition) / 10;
        }
    }
    onDragEnd = (event) => {
        this.dragging = false;
    }
    onDragOut = (event) => {
        this.dragging = false;

    }
}
export {
    Dialog,
    DialogTime,
    DialogSummary,
    DialogSwiper
}