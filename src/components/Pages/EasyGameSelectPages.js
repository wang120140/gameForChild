import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    createdSprite,
} from "./Common.js"
export default class EasyGameSelectPages extends PIXI.Container {
    constructor() {
        super();
        this.RubbishBoxNameSumArr = ["RecyclableSelect_png", "KitchenSelect_png", "HarmfulSelect_png", "OtherSelect_png"]
        this.Arrow;
        this.BtnBackClick;
        this.on("added", this.addedStage, this);
        this.soundBg;
    }
    addedStage() {
        let self = this;
        this.soundBg = PIXI.sound.play("RubbishSecletHome", {
            start: Garbage.getGarBage("SoundProgress"),
            loop: true,
        });
        //背景图
        createdSprite({
            $this: self,
            $alias: "bggame_png"
        });
        //返回按钮
        createdSprite({
            $this: self,
            $alias: "BtnBackNormal_png",
            $x: 100,
            $y: 70,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.BtnBackClick.visible = true;
        });
        //返回按钮事件
        this.BtnBackClick = createdSprite({
            $this: self,
            $alias: "BtnBackClick_png",
            $x: 100,
            $y: 70,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", () => {
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            SceneManager.run("HomePages")
        }).on("pointerout", () => {
            this.BtnBackClick.visible = false;
        });
        //垃圾箱
        this.RubbishBoxNameSumArr.forEach((item, index) => {
            createdSprite({
                $this: self,
                $alias: item,
                $x: 500 * index,
                $y: 500,
                $interactive: true,
                $buttonMode: true,
            }).on("pointertap", () => {
                PIXI.sound.play("ClickSound") //添加点击效果音效
                self.Arrow.position.set(100 + 500 * index, 300);
            })
        });
        //箭头
        this.Arrow = createdSprite({
            $this: self,
            $alias: "Arrow_png",
            $x: 100,
            $y: 300,
            $interactive: true,
            $buttonMode: true,
        }).on("pointertap", () => { //跳转介绍页面事件
            PIXI.sound.play("ClickSound") //添加点击效果音效
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            Garbage.clearGarBage("position");
            Garbage.setGarBage('position', this.Arrow.position.x);
            SceneManager.run("EasyGameIntroPages");
        });
    }

}