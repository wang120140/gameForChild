import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    TweenMax,
    Power1
} from "gsap";
import {
    createdSprite,
    BackDialog,
    createdText,
    createdStyle,
    PlayGameBasePage,
} from "./Common.js"
//import EasyGameSelectPages from './EasyGameSelectPages.js';
import EasyGameSelectAndIntroduce from './EasyGameSelectAndIntroduce.js'
export default class EasyGamePlayingPages extends PIXI.Container {
    constructor() {
        super();
        this.on('removed', this.removeFromStage, this);
        this.on('added', this.addedToStage, this);
        this.suitable;
        this.loop;
        this.BtnBackNormal;
        this.TimeMessage;
        this.Recyclablelitter;
        this.RecyclablelitterName;
        this.RecyclablelitterCap;
        this.RecyclablelitterCapName;
        this.ScoreMessage;
        this.ScoreNum = 0;
        this.TimeNum = 60;
        this.TimeLimit = 3660;
        this.track = [];
        this.wheelSprite = [];
        this.RecyclableSprite = [];
        this.WasterClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'];
        this.Waster = ['paper', 'plastics', 'cloth', 'glass', 'metal',
            'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
            'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints',
            "toiletPaper", "sands", "ceramics", "bricks", "crocks"
        ];
        this.setTimeoutNum; //清除一次性周期定时器
        this.palyBase = {};
        //弹窗
        this.Dialog;
        this.DialogText;
        this.DialogDetail = {
            correct: 0,
            incorrect: 0,
            highScore: 0
        };
        //第三个弹窗文字
        this.DialogSummaryArr = [{
            text: "Correct",
            x: 800,
            y: 320
        }, {
            text: 'Incorrect',
            x: 760,
            y: 420
        }, {
            text: "Total Score",
            x: 700,
            y: 560
        }, {
            text: "00",
            x: 1200,
            y: 560,
        }, {
            text: "00",
            x: 1200,
            y: 420,
        }, {
            text: "00",
            x: 1200,
            y: 320
        }]
        this.DialogSummarySpriteArr = [];
        //音效
        this.RubbishPlaying;
        this.RubbishPlayingControl = true;
        this.Test = 0;
        //动画
        this.animalNum = 0;
        this.animateSpineName = ["RecyceleAnimate_spine", "KitchenAnimate_spine", "HarmfullAnimate_spine", "OtherAnimate_spine"]
        this.animateSpineNameItem = null;
        this.RubbishBoxSpriteItem = null;
        this.RubbishBoxSkin = ["blue", "green", "red", "orange"];
        this.Timeout;
        this.EndScreen;
        this.TimeSprite = null;
        this.HandInterval = null;
        this.Hand0 = null;
        this.Hand1 = null;
        this.HandControl = false;
        this.LittleBubble = null;

    }
    removeFromStage() {
        if (this.loop) {
            this.loop.destroy();
        }
    }
    addedToStage() {
        let self = this;
        (() => {
            //测试使用
            //this.animalNum = 0;
            //正式使用
            this.animalNum = Garbage.getGarBage("position");
            this.Dialog = null;
            this.TimeNum = 60;
            this.track = [];
            this.ScoreMessage = null;
            this.ScoreNum = 0;
            this.wheelSprite = [];
            this.RecyclableSprite = [];
            this.DialogSummarySpriteArr = [];
            this.RubbishPlayingControl = true;
            this.DialogDetail = {
                correct: 0,
                incorrect: 0,
                highScore: 0
            };
            //测试使用
            //var Test = 0;
            //switch (Test) {
            //console.log(Garbage.getGarBage("position") + "position位置")
            switch (Garbage.getGarBage("position")) {
                case 0:
                    this.RecyclablelitterName = "RecyclableLitter"
                    this.RecyclablelitterCapName = "RecyclableLitterCap"
                    this.suitable = 0;
                    break;
                case 1:
                    this.RecyclablelitterName = "KitchenLitter"
                    this.RecyclablelitterCapName = "KitchenLitterCap"
                    this.suitable = 1;
                    break;
                case 2:
                    this.RecyclablelitterName = "HarmfulLitter"
                    this.RecyclablelitterCapName = "HarmfulLitterCap"
                    this.suitable = 2;
                    break;
                case 3:
                    this.RecyclablelitterName = "OtherLitter"
                    this.RecyclablelitterCapName = "OtherLitterCap"
                    this.suitable = 3;
                    break;
            }
        })();
        //背景音乐
        this.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
            loop: true,
        });
        //背景图
        this.palyBase = new PlayGameBasePage({
            _this: self,
        });
        //叶子动画
        this.Leaf_spine = new PIXI.spine.Spine(PIXI.loader.resources["Leaf_spine"].spineData);
        this.Leaf_spine.x = 1910;
        this.Leaf_spine.y = 20;
        this.Leaf_spine.state.setAnimation(0, "animation", true);
        this.addChild(this.Leaf_spine);
        //时间背景
        this.TimeSprite = createdSprite({
            $this: self,
            $alias: 'score_png',
            $x: 1000,
            $y: 0,
        });
        //时间闹铃图片
        this.TimeAlarmSprite = createdSprite({
            $this: self,
            $alias: "alarm_png",
            $x: 1050,
            $y: 45,
        });
        //花背景图片
        createdSprite({
            $this: self,
            $alias: "flower_png",
            $x: 1500,
            $y: 45,
        });
        //小动物动画
        this.animateSpineNameItem = new PIXI.spine.Spine(PIXI.loader.resources[this.animateSpineName[this.animalNum]].spineData);
        if (this.animalNum == 3) {
            this.animateSpineNameItem.scale.x = 0.55;
            this.animateSpineNameItem.scale.y = 0.55;
        } else {
            this.animateSpineNameItem.scale.x = 1;
            this.animateSpineNameItem.scale.y = 1;
        }
        this.animateSpineNameItem.state.setAnimation(0, "normal", true);
        // this.animateSpineNameItem.visible = false //遮罩层影响的事件...
        this.animateSpineNameItem.x = 900;
        if (this.animalNum == 3) {
            this.animateSpineNameItem.y = 560;
        } else {
            this.animateSpineNameItem.y = 630;
        }
        this.addChild(this.animateSpineNameItem);
        //风车动画开始
        this.windmill_spine = new PIXI.spine.Spine(PIXI.loader.resources['windmill_spine'].spineData);
        this.windmill_spine.y = 610;
        this.windmill_spine.x = 1900;
        this.windmill_spine.state.setAnimation(0, 'animation', true);
        this.addChild(this.windmill_spine);
        //风车动画结束
        //垃圾箱
        this.RubbishBoxSpriteItem = new PIXI.spine.Spine(PIXI.loader.resources["Box_spine"].spineData);
        this.RubbishBoxSpriteItem.state.setAnimation(0, "box2_normal", true); //设置状态
        this.RubbishBoxSpriteItem.skeleton.setSkinByName(this.RubbishBoxSkin[this.animalNum]); //给动画添加衣服
        this.RubbishBoxSpriteItem.skeleton.setSlotsToSetupPose(); //给动画穿上衣服
        this.RubbishBoxSpriteItem.x = 400;
        this.RubbishBoxSpriteItem.y = 480;
        //this.RubbishBoxSpriteItem.visible = false; //遮罩层事件影响
        this.addChild(this.RubbishBoxSpriteItem);
        //垃圾箱动画结束
        //垃圾箱的盖子开始
        this.RecyclablelitterCap = new PIXI.Graphics();
        this.RecyclablelitterCap.lineStyle(2, 0x0000FF, 1);
        this.RecyclablelitterCap.beginFill(0xFF700B, 1);
        this.RecyclablelitterCap.drawRect(75, 300, 660, 400);
        this.RecyclablelitterCap.interactive = true;
        this.RecyclablelitterCap.buttonMode = true;
        this.RecyclablelitterCap.alpha = 0;
        this.addChild(this.RecyclablelitterCap);
        //垃圾箱盖事件
        this.RecyclablelitterCap.on("pointertap", this.RecyclablelitterCapEvent = () => {
            this.CoverGameBegain();
            //垃圾移动
            this.RecyclableSprite.forEach((item) => {
                if (item.EventChange && item.EventChangePickUp) {
                    //垃圾移动事件
                    //选对的情况下事件
                    if (item.ClassItem == self.WasterClass[self.suitable]) {
                        TweenMax.to(item, 0.9, {
                            bezier: {
                                type: "cubic",
                                values: [{
                                    x: item.EventChangePosition,
                                    y: 870
                                }, {
                                    x: item.EventChangePosition + 250,
                                    y: 570
                                }, {
                                    x: 150,
                                    y: 600
                                }, {
                                    x: 330,
                                    y: 450
                                }],
                            },
                            ease: Power1.easeInOut
                        });
                        this.RubbishBoxSpriteItem.state.setAnimation(0, "box2_open", false)
                        this.RubbishBoxSpriteItem.state.tracks[0].listener = {
                            complete: () => {
                                this.RubbishBoxSpriteItem.state.setAnimation(0, "box2_normal", true);
                            }
                        }
                    } else {
                        //选择错的情况下，改变垃圾飞出路径，分出屏幕外
                        //首先垃圾箱摇一摇
                        this.RubbishBoxSpriteItem.state.setAnimation(0, "box2_normal", true);
                        //垃圾飞向正常路径
                        TweenMax.to(item, 0.9, {
                            bezier: {
                                type: "cubic",
                                values: [{
                                    x: item.EventChangePosition,
                                    y: 870
                                }, {
                                    x: item.EventChangePosition + 250,
                                    y: 570
                                }, {
                                    x: 150,
                                    y: 600
                                }, {
                                    x: 330,
                                    y: 460
                                }],
                            },
                            ease: Power1.easeInOut
                        });
                        //垃圾飞出屏幕
                        this.setTimeOutNum = setTimeout(() => {
                            if (this.animalNum == 0) {
                                this.animateSpineNameItem.state.setAnimation(0, "sad2", false);
                            } else {
                                this.animateSpineNameItem.state.setAnimation(0, "sad", false);
                            }

                            this.animateSpineNameItem.state.tracks[0].listener = {
                                complete: () => {
                                    this.animateSpineNameItem.state.setAnimation(0, "normal", true);
                                }
                            };
                            PIXI.sound.play("RubbishWrong");
                            TweenMax.to(item, 0.9, {
                                bezier: {
                                    type: "cubic",
                                    values: [{
                                        x: 330,
                                        y: 460
                                    }, {
                                        x: -100,
                                        y: 400,
                                    }, {
                                        x: -270,
                                        y: 700
                                    }, {
                                        x: -310,
                                        y: 870
                                    }],
                                },
                                ease: Power1.easeInOut
                            });
                        }, 900)


                    }
                }
            });
        });
        //轮带
        for (let i = 0; i < 2; i++) {
            this.track.push(createdSprite({
                $this: self,
                $alias: 'track_png',
                $x: i * 1920,
                $y: 715,
            }));
        }
        //轮子背景图
        for (let wheelNum = 0; wheelNum <= 15; wheelNum++) {
            this.wheelSprite.push(createdSprite({
                $this: self,
                $alias: 'wheel_png',
                $x: wheelNum * 138,
                $y: 1080,
                $anchor: 0.5,
            }));
        }
        //在分数背景图下写分数
        this.ScoreMessage = createdText({
            $this: self,
            $text: self.ScoreNum,
            $x: 1700,
            $y: 65,
            $style: createdStyle({
                $fontSize: 60,
                $fill: "#FDFFD0",
            })
        });
        this.AddScore = createdText({
            $this: self,
            $text: "+5",
            $x: 1680,
            $y: 200,
            $visible: false,
            $style: createdStyle({
                $fontSize: 60,
                $fill: "#56E158"
            })
        });
        this.AddScore.visible = false;
        this.minScore = createdText({
            $this: self,
            $text: "-5",
            $x: 1680,
            $y: 85,
            $visible: false,
            $style: createdStyle({
                $fontSize: 60,
                $fill: "#CF5D40"
            })
        });
        this.minScore.visible = false;
        //时间
        this.TimeMessage = createdText({
            $this: self,
            $text: "00:60",
            $x: 1200,
            $y: 65,
            $style: createdStyle({
                $fontSize: 60,
                $fill: "#FDFFD0",
            })
        });
        //返回按钮
        this.palyBase.BtnBackNormal.on("pointerdown", this.palyBase.BtnBackNormalEvent = () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.palyBase.BtnBackClick.visible = true;
        })
        this.palyBase.BtnBackClick.on("pointerup", this.palyBase.BtnBackClickEvent = () => {
            this.RubbishPlayingControl = false;
            PIXI.sound.pause("RubbishPlaying") //游戏音乐背景
            this.loop.stop();
            this.addChild(this.Dialog.graphics, this.Dialog.pop, this.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn)
            this.RecyclableSprite.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })
            this.palyBase.BtnBackNormal.interactive = false;
            this.RecyclablelitterCap.interactive = false;
        }).on("pointerout", this.palyBase.BtnBackClickEventOut = () => {
            this.palyBase.BtnBackClick.visible = false;
        });
        //添加垃圾
        for (let i = 0; i < 6; i++) {
            //把随机变成正常
            let index = i;
            //let index = Math.floor(Math.random() * 20);
            let RecyclableItem = createdSprite({
                $this: self,
                $alias: self.Waster[index],
                $x: i * 434,
                $y: 870,
                $interactive: true,
                $buttonMode: true,
                $pivotX: true,
                $scale: 1.2
            });
            RecyclableItem.pivot.y = RecyclableItem.height - 50;
            RecyclableItem.EventChange = false; //点击事件是否发生
            RecyclableItem.EventChangePickUp = false; //垃圾箱点击事件
            RecyclableItem.EventChangePosition = -200; //模拟点击事件的位置
            RecyclableItem.ClassItem = this.WasterClass[Math.floor(index / 5)]; //定义垃圾属性
            RecyclableItem.on("pointerdown", this.RecyclableItemEvent = () => { //垃圾点击事件
                PIXI.sound.play(self.Waster[index] + "_mp3"); //播放单词音频
                this.RecyclableSprite.forEach((item) => {
                    if (item.y == 870) {
                        item.EventChange = false;
                    }
                })
                RecyclableItem.EventChange = true;
                RecyclableItem.scale.set(1.5);
                RecyclableItem.EventChangePosition = RecyclableItem.x //点击位置
            });

            this.RecyclableSprite.push(RecyclableItem);
        }
        //添加遮罩层开始.......................
        this.coverLay = new PIXI.Container();
        this.addChild(this.coverLay);
        this.coverLayout = new PIXI.Graphics();
        this.coverLayout.beginFill(0x000000, 0.5);
        this.coverLayout.drawRect(0, 0, 1980, 2000);
        this.coverLayout.endFill();
        this.coverLay.addChild(this.coverLayout);
        //添加遮罩层对其的影响（关闭退出按钮和垃圾按钮）
        this.palyBase.BtnBackNormal.interactive = false;
        this.RecyclableSprite.forEach((item) => {
            item.interactive = false;
        });
        //垃圾箱
        this.coverLay.addChild(this.RubbishBoxSpriteItem);
        //对垃圾箱做遮罩层
        let RubbishBoxSpriteItem0rectMask = new PIXI.Graphics();
        RubbishBoxSpriteItem0rectMask.beginFill(0xff0000, 0.5).drawRect(70, 0, 660, 720).endFill();
        this.RubbishBoxSpriteItem.mask = RubbishBoxSpriteItem0rectMask;

        //小动物
        this.coverLay.addChild(this.animateSpineNameItem);
        //对小动物做遮罩层
        let animateSpineNameItem0ReactMask = new PIXI.Graphics();
        animateSpineNameItem0ReactMask.beginFill(0xff0000, 0.5).drawRect(660, 310, 700, 410).endFill();
        this.animateSpineNameItem.mask = animateSpineNameItem0ReactMask;
        //添加瓶子
        this.RecyclableSprite[1].interactive = true;
        this.coverLay.addChild(this.RecyclableSprite[1]);
        //小手指图片
        // console.log(this)
        // console.log(this.mask);
        //this.mask = this.track[0];
        this.Hand0 = createdSprite({
            $this: self,
            $alias: "Hand0_png",
            $x: 417,
            $y: 773,
            $pivotY: true,
            $addChild: false
        });
        this.coverLay.addChild(this.Hand0);
        this.Hand1 = createdSprite({
            $this: self,
            $alias: "Hand1_png",
            $x: 411,
            $y: 773,
            $pivotY: true,
            $visible: false,
            $addChild: false
        });
        this.coverLay.addChild(this.Hand1);
        this.HandInterval = setInterval(() => {
            if (this.HandControl) {
                this.Hand0.visible = false;
                this.Hand1.visible = true;
                this.HandControl = false;
            } else {
                this.Hand0.visible = true;
                this.Hand1.visible = false;
                this.HandControl = true;
            }
        }, 500);
        //小冒泡图片
        this.LittleBubble = createdSprite({
            $this: self,
            $alias: "LitterBubble_png",
            $x: 704,
            $y: 718,
            $addChild: false
        });
        this.coverLay.addChild(this.LittleBubble);
        //中冒泡图片
        this.MilldleBubble = createdSprite({
            $this: self,
            $alias: "MiddleBubble_png",
            $x: 750,
            $y: 600,
            $addChild: false
        });
        this.coverLay.addChild(this.MilldleBubble);
        //大冒泡图片
        this.TextBubble = createdSprite({
            $this: self,
            $alias: "EasyPlayTip_png",
            $x: 1000,
            $y: 300,
            $addChild: false
        });
        this.coverLay.addChild(this.TextBubble);
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
            this.CoverGameBegain();
        });
        this.coverLay.addChild(this.SkipButton);
        //添加遮罩层结束.......................
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        //this.loop.start();
        ///////////////////弹窗开始//////////////////////////////
        //第一个弹窗吧关闭按钮的弹窗
        this.Dialog = new BackDialog(self);
        this.DialogText = createdText({
            $this: self,
            $text: "Do you really want  \n         to quit ? ", //这几个空格保留...
            $x: 640,
            $y: 280,
            $addChild: false,
            $style: createdStyle({
                $fontSize: 100,
                $fontWeight: 400,
                $lineHeight: 128,
                $fontFamily: "方正舒体",
            })
        });
        this.Dialog.yesBtn.on('pointertap', this.Dialog.yesBtnEvent = () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.Dialog.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
            clearTimeout(this.setTimeoutNum); //清除定时器
            this.parent.removeChildren();
            this.clearEvent();
            Garbage.setGarBage("BackSelectPages", "EasyPlayingGame");
            SceneManager.run(new EasyGameSelectAndIntroduce());
        });
        this.Dialog.noBtn.on("pointertap", this.Dialog.noBtnEvent = () => {
            this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
            this.RecyclableSprite.forEach((item) => {
                item.interactive = true;
                item.buttonMode = true;
            });
            this.RecyclablelitterCap.interactive = true;
            this.palyBase.BtnBackNormal.interactive = true;
            PIXI.sound.play("RubbishPlaying", {
                loop: true
            }); //游戏音乐背景
            this.RubbishPlayingControl = true;
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.loop.start();
        });

        //第三个弹框 总结弹窗
        this.DialogSummaryArr.forEach((item) => {
            this.DialogSummarySpriteArr.push(createdText({
                $this: self,
                $text: item.text,
                $x: item.x,
                $y: item.y,
                $addChild: false,
                $style: createdStyle({
                    $fontSize: 80,
                    $fontFamily: "方正舒体",
                    $fontWeight: 400,
                })
            }))
        });
        this.Dialog.fhBtn.on('pointertap', this.Dialog.fhBtnEvent = () => { //返回按钮事件
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.fhBtn, this.Dialog.againBtn)
            clearTimeout(this.setTimeoutNum); //清除定时器
            PIXI.sound.pause("RubbishSuccess"); //胜利音效结束
            this.parent.removeChildren();
            this.clearEvent();
            Garbage.setGarBage("BackSelectPages", "EasyPlayingGame");
            SceneManager.run(new EasyGameSelectAndIntroduce());
        });
        this.Dialog.againBtn.on("pointertap", this.Dialog.againBtnEvent = () => { //再来一次事件
            this.RubbishPlayingControl = true;
            PIXI.sound.play("ClickSound") //添加点击效果音效
            PIXI.sound.pause("RubbishSuccess"); //声音音效结束
            this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.success,
                this.Dialog.fhBtn, this.Dialog.againBtn)
            this.DialogSummarySpriteArr.forEach((item) => {
                this.removeChild(item)
            })
            clearTimeout(this.setTimeoutNum); //清除定时器
            this.parent.removeChildren();
            this.clearEvent();
            SceneManager.run(new EasyGamePlayingPages());
        });
        if (Garbage.getGarBage("EnterPlayPages") === "SelectAgainPages") {
            //console.log("这件事情发生了....")
            this.CoverGameBegain();
        }

        if (Garbage.getGarBage("BackSelectPages") === "EasyPlayingGame") {
            this.CoverGameBegain();
        }
        ///////////////////弹窗结束/////////////////////////////
    }
    gameloop(delta) {
        //轮子
        this.wheelSprite.forEach((item) => {
            item.rotation -= 0.075 * delta;
        });
        //传送带
        this.track.forEach((item) => {
            item.x <= -1920 && item.position.set(1920, 715);
            item.x -= 3;
        });
        //定义时间函数
        this.TimeNum += 1;
        if (this.TimeNum < this.TimeLimit) {
            (this.TimeNum < 3060) ?
            (this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)))) :
            (this.TimeMessage.text = ("00:0" + (60 - Math.floor(this.TimeNum / 60))));

        } else if (this.TimeNum == this.TimeLimit) { //时间到事件......
            //添加时间弹窗
            this.addChild(this.Dialog.graphics);
            PIXI.sound.play("Alarm_mp3");
            this.Timeout = new PIXI.spine.Spine(PIXI.loader.resources["Timeout_spine"].spineData)
            this.Timeout.state.setAnimation(0, "start", false);
            this.Timeout.x = 930;
            this.Timeout.y = 500;
            this.addChild(this.Timeout);
            this.Timeout.state.tracks[0].listener = {
                complete: () => {
                    this.Timeout.state.setAnimation(0, "time", true);
                }
            };
            //时间弹窗结束
            //控制其他按钮结束
            this.palyBase.BtnBackNormal.interactive = false;
            this.palyBase.BtnBackNormal.buttonMode = false;
            this.RecyclableSprite.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })
            this.RecyclablelitterCap.interactive = false;
            //this.RubbishPlaying.stop();
            this.RubbishPlayingControl = false;
            PIXI.sound.pause("RubbishPlaying") //暂停游戏背景事件
            this.loop.stop(); //游戏循环结束事件
            //两秒后的弹窗事件发生......
            this.setTimeoutNum = setTimeout(() => { //两秒后的弹窗事件发生......
                PIXI.sound.play("RubbishSuccess");
                this.removeChild(this.Dialog.graphics, this.Timeout);
                //这个是结束页面弹窗
                this.EndScreen = new PIXI.spine.Spine(PIXI.loader.resources["EndScreen_spine"].spineData);
                this.EndScreen.state.setAnimation(0, "start", false);
                this.EndScreen.state.tracks[0].listener = {
                    complete: () => {
                        this.EndScreen.state.setAnimation(0, "normal", true);
                    }
                };
                this.EndScreen.x = 1000;
                this.EndScreen.y = 550;
                //这个是结束页结束....
                this.DialogSummarySpriteArr[5].text = this.DialogDetail.correct;
                this.DialogSummarySpriteArr[4].text = this.DialogDetail.incorrect;
                this.DialogSummarySpriteArr[3].text = this.ScoreNum;
                this.addChild(this.Dialog.graphics, this.EndScreen, this.Dialog.fhBtn, this.Dialog.againBtn);
                //文字放置位置
                this.DialogSummarySpriteArr.forEach((item) => {
                    this.addChild(item)
                })

            }, 2500);
        }
        //精灵循环
        //在飞行中的垃圾 不能有垃圾筐事件发生...
        let Judgement = this.RecyclableSprite.some((item) => {
            return item.y < 870
        });
        if (this.TimeNum != this.TimeLimit) {
            (Judgement) ? (this.RecyclablelitterCap.interactive = false) : (this.RecyclablelitterCap.interactive = true);
        }
        this.RecyclableSprite.forEach((item, index, arr) => {
            item.EventChange ? item.scale.set(1.5, 1.5) : item.scale.set(1.2, 1.2);
            if (item.EventChange && item.EventChangePickUp) {
                //定义点击事件后发生的事情
                if (item.ClassItem == this.WasterClass[this.suitable]) { //正确的
                    if (this.AddScore.y < 85) { // +5分飞出效果.......
                        this.AddScore.visible = false;
                    } else {
                        this.AddScore.visible = true;
                        this.AddScore.y -= 5;
                    }
                } else {
                    //console.log("错误的事件...")
                    if (this.minScore.y > 200) {
                        this.minScore.visible = false;
                    } else {
                        this.minScore.visible = true;
                        this.minScore.y += 5;
                    }
                }
                //选择对的话
                if (item.y <= 450) {
                    //选对加分
                    if (item.ClassItem == this.WasterClass[this.suitable]) { //选对的加分事件
                        this.ScoreNum += 5;
                        this.AddScore.y = 200;
                        // this.AddScore.visible = true;
                        // this.AddScore.y -= 5;
                        // if (this.AddScore.y < 85) {
                        //     console.log("000")
                        //     this.AddScore.visible = false;
                        //     this.ScoreNum += 5;
                        // } else {
                        //     this.AddScore.visible = true;
                        //     this.AddScore.y -= 5;
                        // }
                        //动物高兴 怎么会少这句话呢？？？
                        this.animateSpineNameItem.state.setAnimation(0, "happy", false);
                        this.animateSpineNameItem.state.tracks[0].listener = {
                            complete: () => {
                                this.animateSpineNameItem.state.setAnimation(0, "normal", true);
                            }
                        }
                        PIXI.sound.play("RubbishRight");
                        this.DialogDetail.correct++;
                    }
                    this.ScoreMessage.text = this.ScoreNum;

                    this.BornSprite(item, index, arr);
                }
                //选择错误的话
                if (item.x <= -300) {
                    //选择错误的话
                    this.minScore.y = 85;
                    (this.ScoreNum >= 5) && (this.ScoreNum = this.ScoreNum - 5);
                    //动物不高兴
                    // if (this.animalNum == 0) {
                    //     this.animateSpineNameItem.state.setAnimation(0, "sad2", false);
                    // } else {
                    //     this.animateSpineNameItem.state.setAnimation(0, "sad", false);
                    // }

                    // this.animateSpineNameItem.state.tracks[0].listener = {
                    //     complete: () => {
                    //         this.animateSpineNameItem.state.setAnimation(0, "normal", true);
                    //     }
                    // };
                    // PIXI.sound.play("RubbishWrong");

                    this.DialogDetail.incorrect++;
                    this.ScoreMessage.text = this.ScoreNum;
                    clearTimeout(this.setTimeoutNum);
                    this.BornSprite(item, index, arr);
                }
            } else {
                //定义正常走的事件
                item.x -= 3;
                (item.x <= -384) && this.BornSprite(item, index, arr)
            }
        });
    }
    CoverGameBegain() {
        //开始游戏
        let self = this;
        self.loop.start();
        //先移除遮罩层
        this.coverLay.removeChild(this.RubbishBoxSpriteItem);
        this.coverLay.removeChild(this.RecyclableSprite[1]);
        this.removeChild(this.coverLay);
        //移除遮罩层对其的影响（关闭退出按钮和垃圾按钮）
        this.palyBase.BtnBackNormal.interactive = true;
        this.RecyclableSprite.forEach((item) => {
            item.interactive = true;
        });
        //添加垃圾箱
        //this.RubbishBoxSpriteItem.mask = null;
        this.addChild(this.RubbishBoxSpriteItem);
        this.setChildIndex(this.RubbishBoxSpriteItem, 10);
        //添加塑料瓶
        this.addChild(this.RecyclableSprite[1]);
        this.RecyclableSprite.forEach((item) => {
            if (item.EventChange) {
                item.EventChangePickUp = true;
            }
        });
        //添加小动物
        this.addChild(this.animateSpineNameItem);
        this.setChildIndex(this.animateSpineNameItem, 11);
    }
    BornSprite = (item, index, arr) => {
        //item.off(e.type, arguments.callee, false);
        //item.off(event.type, arguements.callee);
        this.removeChild(item); //先移除原有的精灵
        let RandomIndex, NewItem, self = this;
        RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
        NewItem = createdSprite({
            $this: self,
            $alias: self.Waster[RandomIndex],
            $x: self.RecyclableSprite[self.RecyclableSprite.length - 1].x + 434,
            $y: 870,
            $interactive: true,
            $buttonMode: true,
            $pivotY: true,
            $pivotX: true,
            $scale: 1.2
        });
        NewItem.pivot.y = NewItem.height - 50;
        (RandomIndex == 16) && (NewItem.scale.x = 0.6);
        NewItem.EventChangePosition = -200; //对创建的精灵定义属性
        NewItem.EventChange = false;
        NewItem.EventChangePickUp = false;
        NewItem.ClassItem = this.WasterClass[Math.floor(RandomIndex / 5)];
        NewItem.on("pointerdown", this.RecyclableItemEvent = () => { //定义精灵 事件
            //PIXI.sound.pause("RubbishPlaying"); 取消暂停背景音乐
            PIXI.sound.play(self.Waster[RandomIndex] + "_mp3"); //播放单词音频
            this.RecyclableSprite.forEach((item) => {
                if (item.y == 870) {
                    item.EventChange = false;
                }
            })
            NewItem.EventChange = true;
            NewItem.EventChangePosition = NewItem.x;
        })
        arr.splice(index, 1);
        arr.push(NewItem);
    }
    clearEvent() {
        //清除垃圾事件
        this.RecyclableSprite.forEach((item) => {
            item.off("pointerdown", this.RecyclableItemEvent);
        });
        //清除垃圾箱事件
        this.RecyclablelitterCap.off("pointertap", this.RecyclablelitterCapEvent);
        //清除返回按钮事件
        this.palyBase.BtnBackNormal.off("pointerdown", this.palyBase.BtnBackNormalEvent);
        this.palyBase.BtnBackClick.off("pointerup", this.palyBase.BtnBackClickEvent);
        this.palyBase.BtnBackClick.off("pointerout", this.palyBase.BtnBackClickEventOut);
        //清除第一个弹窗事件
        this.Dialog.yesBtn.off("pointertap", this.Dialog.yesBtnEvent);
        this.Dialog.noBtn.off("pointertap", this.noBtnEvent);
        //清除第第三个弹窗事件
        this.Dialog.fhBtn.off("pointertap", this.Dialog.fhBtnEvent);
        this.Dialog.againBtn.off("pointertap", this.Dialog.againBtnEvent);
        //清除本屏幕事件
        this.off('added', this.addedToStage);

    }

}