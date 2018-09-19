import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";

let BtnEasy, BtnHard, bg;
class HomePage extends PIXI.Container {
    constructor() {
        super();

        this.BtnEasy = null;
        this.on("added", this.addedHomePageStage, this)
    }
    addedHomePageStage() {
        //背景图
        bg = new PIXI.Sprite(PIXI.loader.resources['bgHome_png'].texture);
        this.addChild(bg);
        //容易按钮
        BtnEasy = new PIXI.Sprite(PIXI.loader.resources['btnEasy_png'].texture);
        BtnEasy.position.set(500, 850);
        BtnEasy.interactive = true;
        BtnEasy.buttonMode = true;
        BtnEasy.on("pointertap", this.BtnEasyEvent);

        this.addChild(BtnEasy);
        BtnHard = new PIXI.Sprite(PIXI.loader.resources["btnHard_png"].texture);
        BtnHard.interactive = true;
        BtnHard.buttonMode = true;
        BtnHard.on("pointertap", this.BtnHardEvent)
        BtnHard.position.set(1200, 850);
        this.addChild(BtnHard);
        //困难按钮
    }
    BtnEasyEvent() {
        console.log("easyBtn按钮")
        SceneManager.run("EasyGameSelectPage")

    }
    BtnHardEvent() {
        console.log("hardBtn按钮")

    }

}
export default HomePage;