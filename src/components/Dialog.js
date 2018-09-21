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
export {
    Dialog,
    DialogTime,
    DialogSummary
}