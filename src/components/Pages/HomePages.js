import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";

export default class HomePages extends PIXI.Container {
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