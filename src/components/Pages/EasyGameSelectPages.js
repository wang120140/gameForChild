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
        this.loop;
        this.animateSpineName = ["RecyceleAnimate_spine", "KitchenAnimate_spine", "HarmfullAnimate_spine", "OtherAnimate_spine"]
        this.animateSpine = [];
        this.RubbishBoxSpriteName = [0, 1, 2, 3];
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
            $x: -1900,
            $alias: "bg_Select_Introduce_png"
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
                $y: 350,
                $interactive: true,
                $buttonMode: true,

            }).on("pointertap", () => {
                PIXI.sound.play("ClickSound") //添加点击效果音效
                self.Arrow.position.set(100 + 500 * index, 150);
                this.animateSpine.forEach((item, index0) => {
                    if (index == index0) {
                        item.visible = true;
                    } else {
                        item.visible = false;
                    }
                })
            })
        });
        //箭头
        this.Arrow = createdSprite({
            $this: self,
            $alias: "Arrow_png",
            $x: 100,
            $y: 150,
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
        //垃圾箱动画Box_spine
        // this.RubbishBoxSpriteName.forEach((item, index) => {
        //     this.RubbishBoxSpriteItem = new PIXI.spine.Spine(PIXI.loader.resources["Box_spine"].spineData);
        //     this.RubbishBoxSpriteItem.x = 500 * index;
        //     this.RubbishBoxSpriteItem.y = 350;
        //     //this.RubbishBoxSpriteItem.state.setAnimation(0, "box1_normal", true)
        //     this.addChild(this.RubbishBoxSpriteItem);
        // });
        //小动物动画
        this.animateSpineName.forEach((item, index) => {
            this.animateSpineItem = new PIXI.spine.Spine(PIXI.loader.resources[item].spineData);
            this.animateSpineItem.x = 450 + index * 500;
            this.animateSpineItem.interactive = true;
            this.animateSpineItem.buttonMode = true;
            this.animateSpineItem.on("pointertap", () => {
                console.log(index)
            })

            this.animateSpineItem.y = 800;
            this.animateSpineItem.state.setAnimation(0, 'normal', true);
            this.animateSpine.push(this.animateSpineItem);
            this.animateSpineItem.visible = false;
            this.addChild(this.animateSpineItem)
        });
        this.animateSpine[0].visible = true;
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.stop();
    }
    gameloop(){
        console.log(1)
        
    }

}