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
        this.btnEasyClick;
        this.BtnHardClick;
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
        }).on("pointerdown", () => {
            this.btnEasyClick.visible = true;
        });
        this.btnEasyClick = created({
            $this: self,
            $alias: "btnEasyClick_png",
            $x: 500,
            $y: 850,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", () => {
            SceneManager.run("EasyGameSelectPages");
        }).on("pointerout", () => {
            this.btnEasyClick.visible = false;
        })
        created({
            $this: self,
            $alias: "btnHard_png",
            $x: 1200,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            this.BtnHardClick.visible = true;
        })
        this.BtnHardClick = created({
            $this: self,
            $alias: "btnHardClick_png",
            $x: 1200,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
            $visible: false,
        }).on("pointerup", () => {
            this.vueInstance.ControlHardDialog = true;
            Garbage.clearGarBage("startPlayHardGame");
            Garbage.setGarBage("startPlayHardGame", false);
            SceneManager.run("HardGamePlayingPages");
        }).on("pointerout", () => {
            this.BtnHardClick.visible = false;
        })
    }
}