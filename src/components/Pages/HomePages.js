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
        this.soundBg;
    }
    addedHomePageStage() {
        let self = this
        this.soundBg = PIXI.sound.play("RubbishSecletHome", {
            start: Garbage.getGarBage("SoundProgress"),
            loop: true,
        })
        this.vueInstance = Garbage.getGarBage('vueInstance');
        //背景图
        created({
            $this: self,
            $alias: 'bgHome_png'
        });
        //按钮easy
        created({
            $this: self,
            $alias: "btnEasy_png",
            $x: 500,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
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
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            SceneManager.run("EasyGameSelectPages");
            //跳转选择页面
        }).on("pointerout", () => {
            this.btnEasyClick.visible = false;
        });
        //按钮hard
        created({
            $this: self,
            $alias: "btnHard_png",
            $x: 1200,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.BtnHardClick.visible = true;
        });
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
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            Garbage.clearGarBage("startPlayHardGame"); //控制hard页面数据
            Garbage.setGarBage("startPlayHardGame", false);
            SceneManager.run("HardGamePlayingPages");
        }).on("pointerout", () => {
            this.BtnHardClick.visible = false;
        })
    }
}