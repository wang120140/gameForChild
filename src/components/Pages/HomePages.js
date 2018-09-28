import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    created
} from "./Common.js"
export default class HomePages extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addedHomePageStage, this)
        this.bg;
        this.BtnEasy = null;
        this.BtnHard = null;
        this.BtnHardControlDialog = false;
        this.vueInstance = null;
    }
    addedHomePageStage() {
        let self = this
        this.vueInstance = Garbage.getGarBage('vueInstance');
        created({
            $this: self,
            $name: self.bg,
            $alias: 'bgHome_png'
        });
        this.BtnEasy = created({
            $this: self,
            $name: self.BtnEasy,
            $alias: "btnEasy_png",
            $x: 500,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
        })
        this.BtnEasy.on("pointertap", this.BtnEasyEvent, this);
        this.BtnHard = created({
            $this: self,
            $name: self.BtnHard,
            $alias: "btnHard_png",
            $x: 1200,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
        })
        this.BtnHard.on("pointertap", this.BtnHardEvent, this)
            //困难按钮
    }
    BtnEasyEvent() {
        SceneManager.run("EasyGameSelectPages");
    }
    BtnHardEvent() {
        this.vueInstance.ControlHardDialog = true;
        Garbage.clearGarBage("startPlayHardGame");
        Garbage.setGarBage("startPlayHardGame", false);
        SceneManager.run("HardGamePlayingPages");
    }

}