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
        this.vueInstance = null;
    }
    addedHomePageStage() {
        let self = this
        this.vueInstance = Garbage.getGarBage('vueInstance');
        created({
            $this: self,
            $alias: 'bgHome_png'
        });
        created({
            $this: self,
            $alias: "btnEasy_png",
            $x: 500,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
        }).on("pointertap", this.BtnEasyEvent, this);
        created({
            $this: self,
            $alias: "btnHard_png",
            $x: 1200,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
        }).on("pointertap", this.BtnHardEvent, this)

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