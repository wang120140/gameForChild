import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    createdSprite,
} from "./Common.js";
import 'pixi-spine';
export default class HomePages extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addedHomePageStage, this)
        this.vueInstance = null;
        this.btnEasyClick = null;
        this.BtnHardClick = null;
        this.soundBg = null;
        this.closeButtonClick = null;
        this.Leaf_spine = null;
        console.log("首页类数据")
    }
    addedHomePageStage() {
        (() => {
            this.btnEasyClick = null;
            this.BtnHardClick = null;
            this.soundBg = null;
            this.closeButtonClick = null;
            this.Leaf_spine = null;
            console.log("home页面进入事件...")
        })();
        console.log("首页页面......")
        let self = this;
        //消除背景音乐
        this.soundBg = PIXI.sound.play("RubbishSecletHome", {
            start: Garbage.getGarBage("SoundProgress"),
            loop: true,
        })
        this.vueInstance = Garbage.getGarBage('vueInstance');
        //背景图
        createdSprite({
            $this: self,
            $x: -522,
            $alias: 'bggame_png'
        });
        //风车动画
        this.windmill_spine = new PIXI.spine.Spine(PIXI.loader.resources['windmill_spine'].spineData);
        this.windmill_spine.y = 480;
        this.windmill_spine.x = 1700;
        this.windmill_spine.state.setAnimation(0, 'animation', true);
        this.addChild(this.windmill_spine);
        //叶子位置
        this.Leaf_spine = new PIXI.spine.Spine(PIXI.loader.resources["Leaf_spine"].spineData);
        this.Leaf_spine.x = 2000;
        this.Leaf_spine.y = 20;
        this.Leaf_spine.state.setAnimation(0, "animation", true);
        this.addChild(this.Leaf_spine);
        // 动画房子以及小动物
        this.startScreen_spine = new PIXI.spine.Spine(PIXI.loader.resources['StartScreen_spine'].spineData);
        this.startScreen_spine.y = 500;
        this.startScreen_spine.x = 950;
        this.startScreen_spine.state.setAnimation(0, 'animation', true);
        this.addChild(this.startScreen_spine);
        //关闭按钮
        createdSprite({
            $this: self,
            $alias: "CloseButtonNormal_png",
            $x: 1670,
            $y: 50,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.closeButtonClick.visible = true;
        });
        this.closeButtonClick = createdSprite({
            $this: self,
            $alias: "CloseButtonLight_png",
            $x: 1670,
            $y: 50,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", () => {}).on("pointerout", () => {
            this.closeButtonClick.visible = false;
        });
        //按钮easy
        createdSprite({
            $this: self,
            $alias: "btnEasy_png",
            $x: 300,
            $y: 850,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.btnEasyClick.visible = true;
        });
        this.btnEasyClick = createdSprite({
            $this: self,
            $alias: "btnEasyClick_png",
            $x: 300,
            $y: 850,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", () => {
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            (() => { //清除变量...
                this.btnEasyClick = null;
                this.BtnHardClick = null;
                this.soundBg = null;
                this.closeButtonClick = null;
                this.Leaf_spine = null;
                console.log("home发生页面跳转到简单事件.....")
            })();
            SceneManager.run("EasyGameSelectPages");
            //跳转选择页面
        }).on("pointerout", () => {
            this.btnEasyClick.visible = false;
        });
        //按钮hard
        createdSprite({
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
        this.BtnHardClick = createdSprite({
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
            (() => { //清除变量...
                this.btnEasyClick = null;
                this.BtnHardClick = null;
                this.soundBg = null;
                this.closeButtonClick = null;
                this.Leaf_spine = null;
                console.log("home发生页面跳转到困难事件.....")
            })();
            SceneManager.run("HardGamePlayingPages");
        }).on("pointerout", () => {
            this.BtnHardClick.visible = false;
        })
    }
}