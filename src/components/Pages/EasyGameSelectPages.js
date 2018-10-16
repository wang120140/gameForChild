import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    createdSprite,
} from "./Common.js"
import HomePages from './HomePages.js';
import EasyGameIntroPages from './EasyGameIntroPages.js';
export default class EasyGameSelectPages extends PIXI.Container {
    constructor() {
        super();
        this.RubbishBoxNameSumArr = ["RecyclableSelect_png", "KitchenSelect_png", "HarmfulSelect_png", "OtherSelect_png"]
        this.Arrow = null;
        this.ArrowArr = [];
        this.BtnBackNormal = null;
        this.BtnBackClick = null;
        this.on("added", this.addedStage, this);
        this.soundBg = null;
        this.loop = null;
        this.animateSpineName = ["RecyceleAnimate_spine", "KitchenAnimate_spine", "HarmfullAnimate_spine", "OtherAnimate_spine"]
        this.animateSpineArr = [];
        this.animateSpineMoveNum = null;
        this.bg = null;
        this.RubbishBoxSkin = ["blue", "green", "red", "orange"];
        this.RubbishBoxAnimateArr = [];
    }
    addedStage() {
        let self = this;
        (() => {
            this.RubbishBoxNameSumArr = ["RecyclableSelect_png", "KitchenSelect_png", "HarmfulSelect_png", "OtherSelect_png"]
            this.Arrow = null;
            this.ArrowArr = [];
            this.BtnBackNormal = null;
            this.BtnBackClick = null;
            this.on("added", this.addedStage, this);
            this.soundBg = null;
            this.loop = null;
            this.animateSpineName = ["RecyceleAnimate_spine", "KitchenAnimate_spine", "HarmfullAnimate_spine", "OtherAnimate_spine"]
            this.animateSpineArr = [];
            this.animateSpineMoveNum = null;
            this.bg = null;
            this.RubbishBoxSkin = ["blue", "green", "red", "orange"];
            this.RubbishBoxAnimateArr = [];
        })()
        this.soundBg = PIXI.sound.play("RubbishSecletHome", {
            start: Garbage.getGarBage("SoundProgress"),
            loop: true,
        });
        //背景图
        this.bg = createdSprite({
            $this: self,
            $scale: 2,
            $alias: "bggame_png"
        });
        //叶子位置
        this.Leaf_spine = new PIXI.spine.Spine(PIXI.loader.resources["Leaf_spine"].spineData);
        this.Leaf_spine.x = 1910;
        this.Leaf_spine.y = 20;
        this.Leaf_spine.state.setAnimation(0, "animation", true);
        this.addChild(this.Leaf_spine);
        //返回按钮 
        this.BtnBackNormal = createdSprite({
            $this: self,
            $alias: "BtnBackNormal_png",
            $x: 64,
            $y: 46,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", this.BtnBackNormalEvent = () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.BtnBackClick.visible = true;
        });
        //返回按钮事件
        this.BtnBackClick = createdSprite({
            $this: self,
            $alias: "BtnBackClick_png",
            $x: 64,
            $y: 46,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", this.BtnBackClickEventPointerup = () => {
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            self.clearEvent(); //清除事件绑定
            self.parent.removeChildren();
            SceneManager.run(new HomePages())
        }).on("pointerout", this.BtnBackClickEventPointerout = () => {
            this.BtnBackClick.visible = false;
        });
        //垃圾箱动画Box_spine
        this.RubbishBoxSkin.forEach((item, index) => {
            this.RubbishBoxSpriteItem = new PIXI.spine.Spine(PIXI.loader.resources["Box_spine"].spineData);
            this.RubbishBoxSpriteItem.state.setAnimation(0, "box1_normal", true); //设置状态
            this.RubbishBoxSpriteItem.skeleton.setSkinByName(item); //给动画添加衣服
            this.RubbishBoxSpriteItem.skeleton.setSlotsToSetupPose(); //给动画穿上衣服
            this.RubbishBoxSpriteItem.x = 450 * index + 273; //设置动画的位置
            this.RubbishBoxSpriteItem.y = 650; //设置动画的位置
            this.RubbishBoxSpriteItem.interactive = true; //设置动画的鼠标事件
            this.RubbishBoxSpriteItem.buttonMode = true;
            this.RubbishBoxSpriteItem.on("pointertap", this.RubbishBoxSpriteItemEvent = () => {
                //添加点击声音
                PIXI.sound.play("ClickSound") //添加点击效果音效
                    //设置箭头效果改变
                this.ArrowArr.forEach((item, index0) => {
                    (index == index0) ?
                    (item.visible = true) :
                    (item.visible = false);
                });
                //设置垃圾箱动画改变
                this.RubbishBoxAnimateArr.forEach((item, index0) => {
                    (index == index0) ?
                    (this.RubbishBoxAnimateArr[index].state.setAnimation(0, "box1_select", true)) :
                    (item.state.setAnimation(0, "box1_normal", true));
                });
                //设置动物效果改变
                this.animateSpineArr.forEach((item, index0) => {
                    if (index == index0) {
                        item.visible = true;
                        item.state.setAnimation(0, 'normal', true);
                    } else {
                        item.visible = false;
                    }
                })

            })
            this.RubbishBoxAnimateArr.push(this.RubbishBoxSpriteItem); //把动画放到一个数组中
            this.addChild(this.RubbishBoxSpriteItem); //添加到舞台
        });
        this.RubbishBoxAnimateArr[0].state.setAnimation(0, "box1_select", true); //设置默认的选中状态
        //添加箭头事件
        for (let i = 0; i < 4; i++) {
            this.Arrow = new PIXI.Graphics();
            this.Arrow.lineStyle(0);
            this.Arrow.beginFill(0xFFFF0B, 0.5);
            this.Arrow.drawCircle(250 + i * 460, 300, 90);
            this.Arrow.endFill();
            this.Arrow.interactive = true;
            this.Arrow.buttonMode = true;
            this.Arrow.visible = false;
            this.Arrow.alpha = 0.1
            this.Arrow.on("pointertap", this.ArrowEvent = () => {
                PIXI.sound.play("ClickSound") //添加点击效果音效
                this.animateSpineMoveNum = i; //那个动物改变走
                //动物事件
                switch (i) {
                    case 0:
                        this.animateSpineArr[i].state.setAnimation(0, "walking1", true); //改变动物摇手的状态
                        this.animateSpineArr[i].state.tracks[0].listener = { //动作摇手
                            complete: () => {
                                this.animateSpineArr[i].state.setAnimation(1, "walking2", true)
                            }
                        };
                        break;
                    case 1:
                        this.animateSpineArr[i].state.setAnimation(0, "walking", true);
                        break;
                    case 2:
                        this.animateSpineArr[i].state.setAnimation(0, "walking", true);
                        break;
                    case 3:
                        this.animateSpineArr[i].state.setAnimation(0, "walking1", true); //改变动物摇手的状态
                        break;
                }
                this.loop.start(); //开启循环函数
                this.Arrow.interactive = false //添加了这句话
            })
            this.ArrowArr.push(this.Arrow);
            this.addChild(this.Arrow);
        }
        this.ArrowArr[0].visible = true; //设置默认效果
        //小动物动画
        var a = [450, 920, 1350, 2000];
        this.animateSpineName.forEach((item, index) => {
            this.animateSpineItem = new PIXI.spine.Spine(PIXI.loader.resources[item].spineData);
            this.animateSpineItem.state.setAnimation(0, 'normal', true);
            this.animateSpineItem.x = a[index];
            this.animateSpineItem.interactive = true;
            this.animateSpineItem.buttonMode = true;
            this.animateSpineItem.scale.x = 0.6;
            this.animateSpineItem.scale.y = 0.6;
            this.animateSpineItem.y = 800;
            if (index == 3) {
                //this.animateSpineItem.scale(0.5, 0.5);
                this.animateSpineItem.scale.x = 0.4;
                this.animateSpineItem.scale.y = 0.4;
                this.animateSpineItem.x = 1760;
            }
            this.animateSpineItem.visible = false;
            this.animateSpineArr.push(this.animateSpineItem);
            this.addChild(this.animateSpineItem)
        });
        this.animateSpineArr[0].visible = true;
        //循环效果
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.stop();
    }
    gameloop() {
        this.animateSpineArr[this.animateSpineMoveNum].x -= 15 + 2.5 * this.animateSpineMoveNum;
        if (this.animateSpineArr[this.animateSpineMoveNum].x <= -100) {
            //if(this.bg.x <=300)
            this.loop.stop();
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            Garbage.clearGarBage("position");
            Garbage.setGarBage('position', this.animateSpineMoveNum);
            this.clearEvent() //清除事件绑定
            this.parent.removeChildren();
            SceneManager.run(new EasyGameIntroPages());
        }
    }
    clearEvent() {
        //返回按钮事件
        this.BtnBackNormal.off("pointerdown", this.BtnBackNormalEvent);
        this.BtnBackClick.off("pointerup", this.BtnBackClickEventPointerup);
        this.BtnBackClick.off("pointerout", this.BtnBackClickEventPointerout);
        //垃圾箱按钮事件清除
        this.RubbishBoxAnimateArr.forEach((item) => {
            item.off("pointertap", this.RubbishBoxSpriteItemEvent);
        });
        //箭头事件清除
        this.ArrowArr.forEach((item) => {
            item.off("pontertap", this.ArrowEvent);
        })

    }

}