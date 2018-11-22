//这个是选择和介绍页面
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
import EasyGamePlayingPages from './EasyGamePlayingPages.js';
export default class EasySelectAndIntroduce extends PIXI.Container {
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
        this.introduceance = {};
        this.coverLay = null;
        this.coverAnimate = null;
        this.coverRubbishBox = null;
        this.coverRubbishBoxEvent = null;
        this.CoverRubbishBoxAnimateArr = [];
        this.LittleBubble = null;
        this.MiddleBubble = null;
        this.TextBubble = null;
        this.SkipButton = null;
        this.AgainBubble = null;
        this.Hand0 = null;
        this.Hand1 = null;
        this.HandSetInterval = null;
        this.HandControl = false;
        this.ButtonCover = null;
        this.ArrowLittleBubble = null;
        this.CoverTransform = null;
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
            this.CoverRubbishBoxAnimateArr = [];
            this.CoverLayoutSet = null;
        })()
        this.soundBg = PIXI.sound.play("RubbishSecletHome", {
            start: Garbage.getGarBage("SoundProgress"),
            loop: true,
        });
        //获取CoveryLayoutSet 数据
        this.CoverLayoutSet = Garbage.getGarBage("CoverLayoutSet");
        //console.log(this.CoverLayoutSet);
        //改变场景...
        //背景图
        this.bg = createdSprite({
            $this: self,
            $x: -2050,
            $alias: "bgSelectAndIntroduce_png"
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
            $alias: "NormalBack_png",
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
            $alias: "NormalClickBack",
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

            //this.RubbishBoxSpriteItem.visible = false;

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
                });
                // if (this.CoverTransform === "EasyPlayingGame") {
                //     //跳转要清除事件
                //     //发送动画位置数据...
                //     Garbage.clearGarBage("position");
                //     Garbage.setGarBage('position', index);
                //     this.CoverRubbishEvent();
                //     //发送声音的位置
                //     PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
                //     Garbage.clearGarBage("SoundProgress"); //清除声音数据
                //     Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
                //     Garbage.setGarBage("EnterPlayPages", "SelectAgainPages");
                //     this.clearEvent(); //清除事件绑定
                //     this.parent.removeChildren();
                //     SceneManager.run(new EasyGamePlayingPages());
                // }

            });
            this.RubbishBoxAnimateArr.push(this.RubbishBoxSpriteItem); //把动画放到一个数组中
            this.addChild(this.RubbishBoxSpriteItem); //添加到舞台
        });
        this.RubbishBoxAnimateArr[0].state.setAnimation(0, "box1_select", true); //设置默认的选中状态


        //小动物动画
        var a = [450, 920, 1350, 2000];
        this.animateSpineName.forEach((item, index) => {
            this.animateSpineItem = new PIXI.spine.Spine(PIXI.loader.resources[item].spineData);
            this.animateSpineItem.state.setAnimation(0, 'normal', true);
            this.animateSpineItem.x = a[index];
            this.animateSpineItem.interactive = true;
            this.animateSpineItem.buttonMode = true;
            this.animateSpineItem.scale.x = 0.8;
            this.animateSpineItem.scale.y = 0.8;
            this.animateSpineItem.y = 800;
            if (index == 3) {
                //this.animateSpineItem.scale(0.5, 0.5);
                this.animateSpineItem.x = 1700;
                this.animateSpineItem.y = 750;
                this.animateSpineItem.scale.x = 0.5;
                this.animateSpineItem.scale.y = 0.5;
            }
            this.animateSpineItem.visible = false;
            this.animateSpineArr.push(this.animateSpineItem);
            this.addChild(this.animateSpineItem)
        });
        this.animateSpineArr[0].visible = true;
        //添加箭头事件
        for (let i = 0; i < 4; i++) {
            this.Arrow = new PIXI.Graphics();
            this.Arrow.lineStyle(0);
            this.Arrow.beginFill(0xFFFF0B, 0.5);
            //this.Arrow.drawCircle(250 + i * 460, 300, 90);
            this.Arrow.drawRect(50 + i * 460, 250, 400, 650);
            this.Arrow.endFill();
            this.Arrow.interactive = true;
            this.Arrow.buttonMode = true;
            this.Arrow.visible = false;
            this.Arrow.alpha = 0;
            this.Arrow.on("pointertap", this.ArrowEvent = () => {
                PIXI.sound.play("ClickSound") //添加点击效果音效
                this.animateSpineMoveNum = i; //那个动物改变走
                this.loop.start(); //开启循环函数
                this.Arrow.interactive = false //添加了这句话
                this.BtnBackNormal.visible = false //关闭按钮
                this.Arrow.interactive = false; //关闭箭头事件
                this.Arrow.buttonMode = false; //关闭箭头事件的效果
                //动物事件
                //遮罩层动物事件
                switch (i) {
                    case 0:
                        //遮罩层事件影响的事件
                        this.removeChild(this.coverLay);
                        this.CoverEffection(true);
                        this.coverAnimate.state.setAnimation(0, "walking1", true);
                        this.coverAnimate.state.tracks[0].listener = {
                            complete: () => {
                                this.coverAnimate.state.setAnimation(0, "walking2", true)
                            }
                        };
                        //遮罩层事件影响的事件结束
                        this.animateSpineArr[i].state.setAnimation(0, "walking1", true); //改变动物摇手的状态
                        this.animateSpineArr[i].state.tracks[0].listener = { //动作摇手
                            complete: () => {
                                this.animateSpineArr[i].state.setAnimation(0, "walking2", true)
                            }
                        };
                        this.SpineRun(i);
                        break;
                    case 1:
                        this.animateSpineArr[i].state.setAnimation(0, "walking", true);
                        this.SpineRun(i);
                        break;
                    case 2:
                        this.animateSpineArr[i].state.setAnimation(0, "walking", true);
                        this.SpineRun(i);
                        break;
                    case 3:
                        this.animateSpineArr[i].state.setAnimation(0, "walking1", true); //改变动物摇手的状态
                        this.animateSpineArr[i].state.tracks[0].listener = { //动作摇手
                            complete: () => {
                                this.animateSpineArr[i].state.setAnimation(0, "walking2", true)
                            }
                        };
                        this.SpineRun(i);
                        break;
                }

            })
            this.ArrowArr.push(this.Arrow);
            this.addChild(this.Arrow);
        }
        this.ArrowArr[0].visible = true; //设置默认效果
        //遮罩层开始********************************************/
        //遮罩层的影响

        this.CoverEffection(false);
        //开始遮罩层
        //添加容器
        this.coverLay = new PIXI.Container();
        this.addChild(this.coverLay);
        //画整个遮罩层
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0x000000, 0.5);
        //graphics.lineStyle(10, 0xffd900, 1);
        graphics.drawRect(0, 0, 1980, 2000);
        graphics.endFill();
        this.coverLay.addChild(graphics);
        //遮罩层的垃圾箱
        this.coverRubbishBox = new PIXI.spine.Spine(PIXI.loader.resources["Box_spine"].spineData);
        this.coverRubbishBox.state.setAnimation(0, "box1_select", true); //设置状态
        this.coverRubbishBox.skeleton.setSkinByName("blue"); //给动画添加衣服
        this.coverRubbishBox.skeleton.setSlotsToSetupPose(); //给动画穿上衣服
        this.coverRubbishBox.x = 273; //设置动画的位置
        this.coverRubbishBox.y = 650; //设置动画的位置
        this.coverLay.addChild(this.coverRubbishBox);
        //遮罩层小动物
        this.coverAnimate = new PIXI.spine.Spine(PIXI.loader.resources["RecyceleAnimate_spine"].spineData);
        this.coverAnimate.state.setAnimation(0, "normal", true);
        this.coverAnimate.x = 450;
        this.coverAnimate.y = 800;
        this.coverAnimate.scale.x = 0.8;
        this.coverAnimate.scale.y = 0.8;
        this.coverLay.addChild(this.coverAnimate);
        //小冒泡图片
        this.LittleBubble = createdSprite({
            $this: self,
            $alias: "LitterBubble_png",
            $x: 464,
            $y: 478,
            $addChild: false
        });
        this.coverLay.addChild(this.LittleBubble);
        //文字冒泡图片
        this.TextBubble = createdSprite({
            $this: self,
            $alias: "SelectTip_png",
            $x: 537,
            $y: 224,
            $addChild: false
        });
        this.coverLay.addChild(this.TextBubble);
        //AgainBubble
        this.AgainBubble = createdSprite({
            $this: self,
            $alias: "AgainBubble_png",
            $x: 537,
            $y: 224,
            $visible: false,
            $addChild: false
        });
        this.coverLay.addChild(this.AgainBubble);
        //箭头小冒泡遮罩层
        this.ArrowLittleBubble = createdSprite({
            $this: self,
            $alias: "LitterBubble_png",
            $x: 464,
            $y: 478,
            $addChild: false
        });
        this.coverLay.addChild(this.ArrowLittleBubble);
        //箭头中冒泡图片
        this.ArrowMiddleBubble = createdSprite({
            $this: self,
            $alias: "MiddleBubble_png",
            $x: 537,
            $y: 320,
            $addChild: false
        })
        this.coverLay.addChild(this.ArrowMiddleBubble);
        //箭头大冒泡事件
        this.ArrowTestBubble = createdSprite({
            $this: self,
            $alias: "ArrowTextBubble_png",
            $x: 800,
            $y: 150,
            $addChild: false
        });
        this.coverLay.addChild(this.ArrowTestBubble);
        //小手指图片
        this.Hand0 = createdSprite({
            $this: self,
            $alias: "Hand0_png",
            $x: 317,
            $y: 643,
            $pivotY: true,
            $addChild: false
        });
        this.coverLay.addChild(this.Hand0);
        this.Hand1 = createdSprite({
            $this: self,
            $alias: "Hand1_png",
            $x: 311,
            $y: 643,
            $pivotY: true,
            $visible: false,
            $addChild: false
        });
        this.coverLay.addChild(this.Hand1);
        this.HandSetInterval = setInterval(() => {
            if (this.HandControl) {
                this.Hand0.visible = false;
                this.Hand1.visible = true;
                this.HandControl = false;
            } else {
                this.Hand0.visible = true;
                this.Hand1.visible = false;
                this.HandControl = true;
            }
        }, 300);
        //agagin图片

        //遮罩层
        //先关闭箭头指引的方向
        this.CoverRubbishEvent();
        //这个是第一次先点击垃圾箱后的
        this.ButtonCover = new PIXI.Graphics();
        this.ButtonCover.beginFill(0x000000, 0);
        this.ButtonCover.drawRect(90, 400, 400, 530);
        this.ButtonCover.endFill();
        this.ButtonCover.interactive = true;
        this.ButtonCover.buttonMode = true;
        this.ButtonCover.on("pointertap", () => {
            //console.log("遮罩层垃圾事件...");
            // this.Hand0.x = 264;
            // this.Hand0.y = 458;
            // this.Hand1.x = 264;
            // this.Hand1.y = 458;
            //隐藏小图片
            this.LittleBubble.visible = false;
            this.TextBubble.visible = false;
            this.CoverRubbishEvent(true);
            //开启第二次的事件
            this.ButtonCover.interactive = false;
            this.ButtonCover.buttonMode = false;
            this.ButtonCover.visible = false;
            this.ButtonCoverSecond.interactive = true;
            this.ButtonCoverSecond.buttonMode = true;
            this.ButtonCoverSecond.visible = true;
        });
        this.coverLay.addChild(this.ButtonCover);
        //设置第二次点击垃圾箱的效果
        this.ButtonCoverSecond = new PIXI.Graphics();
        this.ButtonCoverSecond.beginFill(0x050505, 0);
        this.ButtonCoverSecond.drawRect(90, 250, 400, 630);
        this.ButtonCoverSecond.endFill();
        this.ButtonCoverSecond.visible = false;
        this.ButtonCoverSecond.interactive = false;
        this.ButtonCoverSecond.buttonMode = false;
        this.ButtonCoverSecond.on("pointertap", () => {
            console.log("第二个事件发生......")
            this.coverButton();
            this.animateSpineMoveNum = 0; //那个动物改变走
            this.loop.start(); //开启循环函数
            this.Arrow.interactive = false //添加了这句话
            this.BtnBackNormal.visible = false //关闭按钮
            this.Arrow.interactive = false; //关闭箭头事件
            this.Arrow.buttonMode = false; //关闭箭头事件的效果
            this.SpineRun(0);
        })
        this.coverLay.addChild(this.ButtonCoverSecond)
            //跳过按钮
        this.SkipButton = createdSprite({
            $this: self,
            $alias: "SkipButton_png",
            $x: 1643,
            $y: 867,
            $interactive: true,
            $buttonMode: true,
            $addChild: false
        }).on("pointertap", () => {
            this.coverButton();
        });
        this.coverLay.addChild(this.SkipButton);
        this.CoverTransform = Garbage.getGarBage("BackSelectPages");
        this.EnterSelectPages = Garbage.getGarBage("EnterSelectPage");
        //console.log(this.EnterSelectPages);
        if (this.CoverTransform === "EasyPlayingGame" || this.EnterSelectPages) {
            //console.log("这个EasyPlayingGame相等事件发生了...");
            //替换问题图片
            //添加垃圾箱
            //this.addChild()
            this.removeChild(this.coverLay);
            this.CoverEffection(true);
            //
            // this.TextBubble.visible = false;
            // this.AgainBubble.visible = true;

            //设置事件发生

        }

        //console.log(this.EnterSelectPages);
        //console.log("...");
        Garbage.clearGarBage("EnterSelectPage");
        Garbage.setGarBage("EnterSelectPage", true);

        //遮罩层设置完毕*******************************************************/
        //循环效果
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.stop();
    }
    CoverRubbishEvent(controle = false) {
        this.ArrowLittleBubble.visible = controle;
        this.ArrowMiddleBubble.visible = controle;
        this.ArrowTestBubble.visible = controle;
        this.ArrowArr[0].interactive = controle;
        this.ArrowArr[0].buttonMode = controle;
    }
    CoverEffection(control = true) {
        //添加垃圾箱
        this.RubbishBoxAnimateArr[0].visible = control;
        //所有垃圾箱事件消除
        this.RubbishBoxAnimateArr.forEach((item) => {
            item.interactive = control;
            item.buttonMode = control;
        });
        //添加 消除对箭头事件的影响
        this.ArrowArr[0].interactive = control;
        this.ArrowArr[0].buttonMode = control;
        //消除back按钮事件
        this.BtnBackNormal.interactive = control;
        this.BtnBackNormal.buttonMode = control;
        //添加小动物
        this.animateSpineArr[0].visible = control;
        //console.log("coverEffection事件发生了...")
    }
    coverButton() {
        //console.log("这个事件发生了...")
        //点击效果声音
        PIXI.sound.play("ClickSound") //添加点击效果音效
            //取消CoverLay遮罩层
        this.removeChild(this.coverLay);
        //对其的影响
        this.CoverEffection(true);

        // this.coverAnimate.visible = false;

        // this.animateSpineMoveNum = 0; //那个动物改变走
        // this.loop.start(); //开启循环函数
        // this.animateSpineArr[0].state.setAnimation(0, "walking1", true); //改变动物摇手的状态
        // this.animateSpineArr[0].state.tracks[0].listener = { //动作摇手
        //     complete: () => {
        //         this.animateSpineArr[0].state.setAnimation(0, "walking2", true)
        //     }
        // };
        // this.SpineRun(0);
    }
    gameloop() {
        this.x += 12;
        if (this.x > 1950) {
            this.introduceance.playButton.visible = true;
            this.introduceance.BtnBack.visible = true;
            this.loop.stop();
        }
        //小动物走事件
        //遮罩层动物事件
        if (this.coverAnimate.x > (-550)) {
            this.coverAnimate.x -= 10
        }
        if (this.coverAnimate.x < (-525) && (this.coverAnimate).x > (-548)) {
            this.coverAnimate.state.setAnimation(0, "showing", true);
        }
        if ((this.animateSpineArr[this.animateSpineMoveNum].x < (-525)) && (this.animateSpineArr[this.animateSpineMoveNum].x > (-548))) {
            this.animateSpineArr[this.animateSpineMoveNum].state.setAnimation(0, "showing", true);
            // this.animateSpineArr[this.animateSpineMoveNum].scale.x = 0.8;
            // this.animateSpineArr[this.animateSpineMoveNum].scale.y = 0.8;
        }
        if (this.animateSpineArr[this.animateSpineMoveNum].x > (-550)) {
            this.animateSpineArr[this.animateSpineMoveNum].x -= 10 + 1.5 * this.animateSpineMoveNum;
        }
        // if (this.animateSpineArr[this.animateSpineMoveNum].x <= -100) {

        //     //if(this.bg.x <=300)
        //     this.loop.stop();
        //     Garbage.clearGarBage("position");
        //     Garbage.setGarBage('position', this.animateSpineMoveNum);
        //     this.clearEvent() //清除事件绑定
        //     this.parent.removeChildren();
        //     //跳转页面效果...
        //     //SceneManager.run(new EasyGameIntroPages());
        // }
    }
    SpineRun(i) {
        //发送动画位置数据...
        Garbage.clearGarBage("position");
        Garbage.setGarBage('position', this.animateSpineMoveNum);
        //发送声音的位置
        PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
        Garbage.clearGarBage("SoundProgress"); //清除声音数据
        Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
        this.clearEvent(); //清除事件绑定
        //this.parent.removeChildren(); //清除容器仓库中内容太早了......
        //添加到介绍页类数
        this.introduceance = new EasyGameIntroPages();
        this.introduceance.x = -1980;

        this.addChild(this.introduceance);
        let b;
        //设置层级 获取层级
        b = this.getChildIndex(this.introduceance);
        let c;
        c = this.getChildIndex(this.animateSpineArr[i]);
        //改变层级
        this.setChildIndex(this.introduceance, c);
        this.setChildIndex(this.animateSpineArr[i], b);
        //设置遮罩层动物的层级
        //this.setChildIndex(this.coverAnimate, b);

        //c = this.this.introduceance()
        this.introduceance.playButton.visible = false;
        this.introduceance.playButtonClick.visible = false;

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