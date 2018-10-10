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
} from "./Common.js";
export default class HardGamePlayingPages extends PIXI.Container {
    constructor() {
        super();
        this.track = [];
        this.wheelSprite = [];
        this.BtnBackNormal;
        this.TimeMessage;
        this.TimeNum = 60;
        this.TimeOver = 3660;
        this.ScoreMessage;
        this.ScoreNum = 0;
        //this.WasterBox = ["RecyclableLitter", "KitchenLitter", "HarmfulLitter", "OtherLitter"];
        this.WasterBoxSkin = ["blue", "green", "red", "orange"];
        this.WasterBoxSkinAnimateArr = [];
        this.WasterBoxCap = ["RecyclableLitterCap", "KitchenLitterCap", "HarmfulLitterCap", "OtherLitterCap"];
        this.WasterBoxCapJumpment = false;
        this.Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
            'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
            'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints',
            "toiletPaper", "sands", "ceramics", "bricks", "crocks"
        ];
        this.WasterClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'];
        this.WasterBoxCapSprite = [];
        this.WasterGather = [];
        this.palyBase = {};
        //弹窗
        this.Dialog;
        this.DialogText;
        this.DialogDetail = {
            correct: 0,
            incorrect: 0,
            highScore: 0
        };
        this.DialogSummaryArr = [{
            text: "Correct",
            x: 800,
            y: 320
        }, {
            text: 'Incorrect',
            x: 760,
            y: 420
        }, {
            text: " Total Score",
            x: 700,
            y: 550
        }, {
            text: "00",
            x: 1200,
            y: 550,
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
        this.on('removed', this.removeFromStage, this);
        this.on("added", this.addedStage, this);
        //小动物动画效果
        this.AnimateName = ["RecyceleAnimate_spine", "KitchenAnimate_spine", "HarmfullAnimate_spine", "OtherAnimate_spine"];
        this.AnimateArr = [];
        this.Timeout;
        this.EndScreen;
    }
    addedStage() {
        let self = this;
        this.palyBase = new PlayGameBasePage({
            _this: self
        });
        (() => {
            this.TimeNum = 60;
            this.WasterGather = [];
            this.ScoreNum = 0;
            this.track = [];
            this.ScoreMessage = null;
            this.RecyclableSprite = [];
            this.WasterBoxCapSprite = [];
            this.DialogSummarySpriteArr = [];
            this.WasterBoxSkinAnimateArr = [];
            this.wheelSprite = [];
            this.AnimateArr = [];
            this.RubbishPlayingControl = true;
            this.DialogDetail = {
                correct: 0,
                incorrect: 0,
                highScore: 0
            }
        })()
        //垃圾箱动画
        this.WasterBoxSkin.forEach((item, index) => {
            let WasterBoxAnimateItem = new PIXI.spine.Spine(PIXI.loader.resources["Box_spine"].spineData);
            WasterBoxAnimateItem.state.setAnimation(0, "box2_normal", true);
            WasterBoxAnimateItem.skeleton.setSkinByName(item); //给动画添加衣服
            WasterBoxAnimateItem.skeleton.setSlotsToSetupPose(); //给动画穿上衣服
            WasterBoxAnimateItem.x = index * 500 + 210;
            WasterBoxAnimateItem.y = 380;
            WasterBoxAnimateItem.scale.x = 0.65;
            WasterBoxAnimateItem.scale.y = 0.65;
            this.WasterBoxSkinAnimateArr.push(WasterBoxAnimateItem); //清空
            this.addChild(WasterBoxAnimateItem);
        });
        //小动物动画
        this.AnimateName.forEach((item, index) => {
            let Animate = new PIXI.spine.Spine(PIXI.loader.resources[item].spineData);
            Animate.state.setAnimation(0, "normal", true);
            Animate.x = 200 + index * 500;
            Animate.y = 620;
            if (index == 3) {
                Animate.scale.x = 0.4;
                Animate.scale.y = 0.4;
            } else {
                Animate.scale.x = 0.8;
                Animate.scale.y = 0.8;
            }
            Animate.visible = false;
            this.AnimateArr.push(Animate); //清空
            this.addChild(Animate);
        });
        this.AnimateArr[0].visible = true;
        //传送带
        for (let i = 0; i < 2; i++) {
            this.track.push(createdSprite({ //清空
                $this: self,
                $alias: 'track_png',
                $x: i * 1920,
                $y: 715
            }));
        }
        //轮子背景图
        for (let wheelNum = 0; wheelNum <= 15; wheelNum++) {
            this.wheelSprite.push(createdSprite({ //清空
                $this: self,
                $alias: 'wheel_png',
                $x: wheelNum * 138,
                $y: 1080,
                $anchor: 0.5,
            }));
        }
        //返回按钮
        this.palyBase.BtnBackNormal.on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.palyBase.BtnBackClick.visible = true;
        });
        this.palyBase.BtnBackClick.on("pointerup", this.BtnBackNormalEvent) //返回按钮事件
            .on("pointerout", () => {
                this.palyBase.BtnBackClick.visible = false;
            });
        //时间数据
        this.TimeMessage = createdText({
                $this: self,
                $text: "00:60",
                $x: 1200,
                $y: 100,
                $style: createdStyle({
                    $fontSize: 60,
                    $fill: "#FDFFD0",
                })
            })
            //在分数背景图下写分数
        this.ScoreMessage = createdText({
                $this: self,
                $text: self.ScoreNum,
                $x: 1670,
                $y: 100,
                $style: createdStyle({
                    $fontSize: 60,
                    $fill: "#FDFFD0",
                })
            })
            //箱子盖
        this.WasterBoxCap.forEach((item, index) => {
                // let WasterBoxCapItem = createdSprite({
                //     $this: self,
                //     $alias: item,
                //     $x: index * 500 - 20,
                //     $y: 300,
                //     $interactive: true,
                //     $buttonMode: true
                // })
                let WasterBoxCapItem = new PIXI.Graphics();
                WasterBoxCapItem.lineStyle(2, 0x0000FF, 1);
                WasterBoxCapItem.beginFill(0xFF700B, 1);
                WasterBoxCapItem.drawRect(40, 350, 400, 280);
                WasterBoxCapItem.x = index * 500 - 20;
                WasterBoxCapItem.y = -40;
                WasterBoxCapItem.interactive = true;
                WasterBoxCapItem.buttonMode = true;
                WasterBoxCapItem.alpha = 0;
                this.addChild(WasterBoxCapItem);
                WasterBoxCapItem.Class = this.WasterClass[index];
                WasterBoxCapItem.on("pointertap", () => {
                    let a = this.WasterGather.filter((item) => {
                        return item.ButtonClick
                    })
                    if (a.length > 0) {
                        a[a.length - 1].StartPostion = a[0].x

                        a[a.length - 1].EndPostion = WasterBoxCapItem.x + 20;
                        a[a.length - 1].CheckClass = this.WasterClass[index];

                    }
                    this.WasterGather.forEach((item) => {
                        if ((item.ButtonClick) && (item.StartPostion != null) && (item.EndPostion != null)) {
                            //改变垃圾箱开启和闭合
                            this.WasterBoxSkinAnimateArr[index].state.setAnimation(0, "box2_open", false);
                            this.WasterBoxSkinAnimateArr[index].state.tracks[0].listener = {
                                complete: () => {
                                    this.WasterBoxSkinAnimateArr[index].state.setAnimation(0, "box2_normal", true);
                                }
                            };
                            //垃圾箱开启和闭合结束
                            //改变小动物的显示和不显示
                            this.AnimateArr.forEach((item, index0) => {
                                if (index == index0) {
                                    item.visible = true;
                                } else {
                                    item.visible = false;
                                }
                            });
                            //改变小动物的不显示和显示结束
                            //let MoveTime;
                            //(Math.abs(item.StartPostion - item.EndPostion) >= 800) ? MoveTime = 1: MoveTime = 0.8
                            TweenMax.to(item, 1.1, {
                                bezier: {
                                    type: "cubic",
                                    values: [{
                                        x: item.StartPostion,
                                        y: 870
                                    }, {
                                        x: item.StartPostion + 250,
                                        y: 570
                                    }, {
                                        x: item.EndPostion + 150,
                                        y: 600
                                    }, {
                                        x: item.EndPostion,
                                        y: 450
                                    }],
                                },
                                ease: Power1.easeInOut
                            })
                        }
                    })
                })
                this.WasterBoxCapSprite.push(WasterBoxCapItem); //清空
            })
            //创建垃圾物品
        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * 20)
            let WasterItem = createdSprite({
                $this: self,
                $alias: this.Waster[index],
                $x: i * 384,
                $y: 870,
                $interactive: true,
                $buttonMode: true,
                $pivotY: true,
            })
            WasterItem.Class = this.WasterClass[Math.floor(index / 5)]; //定义属性
            WasterItem.CheckClass = null; //定义检查属性
            WasterItem.ButtonClick = false; //是否点击了事件发生
            WasterItem.StartPostion = null; //开始位置 
            WasterItem.EndPostion = null; //结束位置
            WasterItem.on("pointertap", () => { //垃圾点击事件
                PIXI.sound.play(self.Waster[index] + "_mp3"); //播放单词音频
                this.WasterGather.forEach((item) => {
                    (item.y == 870) && (item.ButtonClick = false);
                })
                WasterItem.ButtonClick = true;
            })
            this.WasterGather.push(WasterItem); //清空
        }
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        //开始游戏界面判断
        if (Garbage.getGarBage("startPlayHardGame")) { //开始游戏界面
            this.loop.start();
            //背景音乐
            this.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                    loop: true
                }) //游戏音乐背景
        } else {
            this.loop.stop();
        }
        /////////////弹窗开始/////////////////////////
        //第一个弹窗吧关闭按钮的弹窗
        this.Dialog = new BackDialog(self);
        this.DialogText = createdText({
            $this: self,
            $text: "Do you really want  \n          to quit ? ", //这几个空格保留...
            $x: 600,
            $y: 320,
            $addChild: false,
            $style: createdStyle({
                $fontSize: 100,
                $fontFamily: "Times New Roman"
            })
        })
        this.Dialog.yesBtn.on('pointertap', () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.Dialog.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
            SceneManager.run("HomePages");
        });
        this.Dialog.noBtn.on("pointertap", this.noButtonEvent)

        //第三个弹框 总结弹窗
        this.DialogSummaryArr.forEach((item) => {
            this.DialogSummarySpriteArr.push(createdText({ //清空
                $this: self,
                $text: item.text,
                $x: item.x,
                $y: item.y,
                $addChild: false,
                $style: createdStyle({
                    $fontSize: 80,
                    $fontFamily: "Times New Roman"
                })
            }))
        })
        this.Dialog.yesBtn.on('pointertap', () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.Dialog.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
            SceneManager.run("HomePages");
        });
        this.Dialog.noBtn.on("pointertap", this.noButtonEvent)
        this.Dialog.fhBtn.on('pointertap', () => { //返回事件
            PIXI.sound.pause("RubbishSuccess");
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.fhBtn, this.Dialog.againBtn)
            SceneManager.run("HomePages");
        });
        this.Dialog.againBtn.on("pointertap", () => { //再来一次事件
                PIXI.sound.pause("RubbishSuccess")
                PIXI.sound.play("ClickSound") //添加点击效果音效
                this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.success,
                    this.Dialog.fhBtn, this.Dialog.againBtn)
                this.DialogSummarySpriteArr.forEach((item) => {
                    this.removeChild(item)
                })
                SceneManager.run("HardGamePlayingPages")
            })
            ///////////////////弹窗结束/////////////////////////////
    }
    gameloop(delta) {
        //关于时间的方法
        let self = this;
        this.TimeNum += 1;
        if (this.TimeNum < this.TimeOver) {
            this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)));
        } else if (this.TimeNum == this.TimeOver) { //时间到事件......
            //this.addChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop);
            //添加时间弹窗
            this.addChild(this.Dialog.graphics);
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
            this.palyBase.BtnBackNormal.interactive = false;
            this.palyBase.BtnBackNormal.buttonMode = false;
            this.WasterGather.forEach((item) => { //暂停所有的垃圾点击事件
                item.interactive = false;
            });
            this.WasterBoxCapSprite.forEach((item) => {
                item.interactive = false;
            });
            PIXI.sound.pause("RubbishPlaying") //暂停游戏背景事件
            this.loop.stop(); //暂停游戏循环事件
            setTimeout(() => { //2秒后弹窗出来事件
                PIXI.sound.play("RubbishSuccess")
                this.removeChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop);
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
                //this.addChild(this.EndScreen);
                //这个是结束页结束....
                this.DialogSummarySpriteArr[5].text = this.DialogDetail.correct;
                this.DialogSummarySpriteArr[4].text = this.DialogDetail.incorrect;
                //this.DialogSummarySpriteArr[3].text = this.DialogDetail.highScore;//取消最高分及记录
                this.DialogSummarySpriteArr[3].text = this.ScoreNum;
                this.addChild(this.Dialog.graphics, this.EndScreen, this.Dialog.fhBtn, this.Dialog.againBtn)
                this.DialogSummarySpriteArr.forEach((item) => {
                    this.addChild(item)
                })
            }, 2000)
        } else {
            this.TimeMessage.text = (Math.floor(this.TimeNum / 3600) + ":" + Math.floor((this.TimeNum - 3600) / 60))
        }
        //传送带
        this.track.forEach((item) => {
            item.x <= -1920 && item.position.set(1920, 715);
            item.x -= 3;
        });
        //轮子
        this.wheelSprite.forEach((item) => {
            item.rotation -= 0.075 * delta;
        });
        //关于垃圾盖效果
        if (this.TimeNum != this.TimeOver) {
            this.WasterBoxCapJumpment = this.WasterGather.some((item) => {
                return item.y < 870
            });
            this.WasterBoxCapSprite.forEach((item) => {
                item.interactive = (!this.WasterBoxCapJumpment);
            });
        }
        //关于垃圾
        this.WasterGather.forEach((item, index, arr) => {
            //放大垃圾效果
            if (item.ButtonClick) {
                item.anchor.set(0.5, 0.5);
                item.scale.set(1.2, 1.2)
            } else {
                item.anchor.set(0);
                item.scale.set(1, 1);
            }
            (!((item.ButtonClick) && (item.StartPostion != null) && (item.EndPostion != null))) && (item.x -= 3);
            //消失和生成效果
            if (item.y < 500 || item.x < -200) {
                //定义成绩
                if (item.y < 500) {
                    //选对的情况下
                    if (item.CheckClass == item.Class) { //选对得分事件
                        this.ScoreNum += 5;
                        //小动物高兴开始
                        this.AnimateArr.forEach((item) => {
                                if (item.visible) {
                                    item.state.setAnimation(0, "happy", false);
                                    item.state.tracks[0].listener = {
                                        complete: () => {
                                            item.state.setAnimation(0, "normal", true);
                                        }
                                    }
                                }
                            })
                            //小动物高兴结束
                            //取消暂停背景音乐
                            //PIXI.sound.pause("RubbishPlaying");
                        PIXI.sound.play("RubbishRight", {
                            //取消暂停背景音乐播放
                            // complete: () => {
                            //     self.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                            //         loop: true,
                            //         start: self.RubbishPlaying._duration * self.RubbishPlaying.progress
                            //     })
                            // }
                        });
                        //取消本次最高分记录
                        //(this.DialogDetail.highScore < this.ScoreNum) && (this.DialogDetail.highScore = this.ScoreNum)
                        this.DialogDetail.correct++;
                    } else { //选错减分事件
                        //选错的情况下
                        (this.ScoreNum >= 5) && (this.ScoreNum -= 5);
                        //小动物悲伤开始
                        this.AnimateArr.forEach((item, index) => {
                            if (item.visible) {
                                if (index == 0) {
                                    item.state.setAnimation(0, "sad2", false);
                                } else {
                                    item.state.setAnimation(0, "sad", false);
                                }
                                item.state.tracks[0].listener = {
                                    complete: () => {
                                        item.state.setAnimation(0, "normal", true);
                                    }
                                }
                            }
                        });
                        //小动物悲伤结束
                        //取消背景声音暂停
                        //PIXI.sound.pause("RubbishPlaying");
                        PIXI.sound.play("RubbishWrong", {
                            //取消背景音乐暂停
                            // complete: () => {
                            //     self.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                            //         loop: true,
                            //         start: self.RubbishPlaying._duration * self.RubbishPlaying.progress
                            //     })
                            // }
                        });
                        this.DialogDetail.incorrect++;
                    }
                }
                this.ScoreMessage.text = this.ScoreNum; //成绩多少
                this.removeChild(item); //先移除原有的精灵
                let RandomIndex;
                RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
                item = createdSprite({
                    $this: self,
                    $alias: self.Waster[RandomIndex],
                    $x: arr[arr.length - 1].x + 387,
                    $y: 870,
                    $pivotY: true,
                    $interactive: true,
                    $buttonMode: true
                })
                item.Class = this.WasterClass[Math.floor(RandomIndex / 5)]; //定义属性
                item.CheckClass = null; //定义检查属性
                item.ButtonClick = false; //是否点击了事件发生
                item.StartPostion = null; //开始位置 
                item.EndPostion = null; //结束位置
                item.on("pointerdown", () => { //定义精灵事件
                    PIXI.sound.play(self.Waster[RandomIndex] + "_mp3"); //播放单词音频
                    this.WasterGather.forEach((item) => {
                        (item.y == 870) && (item.ButtonClick = false);
                    })
                    item.ButtonClick = true;
                })
                arr.splice(index, 1);
                arr.push(item)
            }
        })
    }
    BtnBackNormalEvent = () => { //返回事件
        //箱子盖事件关闭
        this.WasterBoxCapSprite.forEach((item) => {
            item.interactive = false;
        })
        PIXI.sound.pause("RubbishPlaying") //暂停背景音乐
        this.loop.stop();
        this.addChild(this.Dialog.graphics, this.Dialog.pop, this.Dialog.yesBtn, this.Dialog.noBtn)
        this.addChild(this.DialogText)
        this.WasterGather.forEach((item) => {
            item.interactive = false;
            item.buttonMode = false;
        })
        this.palyBase.BtnBackNormal.interactive = false;
    }
    noButtonEvent = () => { //不返回事件  回到游戏中事件......
        PIXI.sound.play("ClickSound") //添加点击效果音效
        PIXI.sound.play("RubbishPlaying", {
            loop: true
        }); //开始播放音乐背景事件
        this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
        this.WasterGather.forEach((item) => {
            item.interactive = true;
            item.buttonMode = true;
        })
        this.palyBase.BtnBackNormal.interactive = true;
        this.loop.start();
    }
    removeFromStage() {
        if (this.loop) {
            this.loop.destroy();
        }
        this.removeChildren(0, this.children.length)
    }

}