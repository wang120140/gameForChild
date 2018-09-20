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
export {
    Dialog
}