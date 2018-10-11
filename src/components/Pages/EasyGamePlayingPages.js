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
import EasyGameSelectPages from './EasyGameSelectPages.js';
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
        this.Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
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
        this.Test = 0;
        //动画
        this.animalNum = 0;
        this.animateSpineName = ["RecyceleAnimate_spine", "KitchenAnimate_spine", "HarmfullAnimate_spine", "OtherAnimate_spine"]
        this.animateSpineNameItem;
        this.RubbishBoxSpriteItem;
        this.RubbishBoxSkin = ["blue", "green", "red", "orange"];
        this.Timeout;
        this.EndScreen;

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
            //switch (this.Test) {
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
            _this: self
        });
        //小动物动画
        this.animateSpineNameItem = new PIXI.spine.Spine(PIXI.loader.resources[this.animateSpineName[this.animalNum]].spineData);
        this.animateSpineNameItem.state.setAnimation(0, "normal", true);
        this.animateSpineNameItem.x = 1000;
        this.animateSpineNameItem.y = 580;
        this.addChild(this.animateSpineNameItem);
        //风车动画开始
        this.windmill_spine = new PIXI.spine.Spine(PIXI.loader.resources['windmill_spine'].spineData);
        this.windmill_spine.y = 480;
        this.windmill_spine.x = 1700;
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
        this.addChild(this.RubbishBoxSpriteItem);
        //垃圾箱动画结束
        //垃圾箱的盖子开始
        this.RecyclablelitterCap = new PIXI.Graphics();
        this.RecyclablelitterCap.lineStyle(2, 0x0000FF, 1);
        this.RecyclablelitterCap.beginFill(0xFF700B, 1);
        this.RecyclablelitterCap.drawRect(90, 350, 680, 280);
        this.RecyclablelitterCap.interactive = true;
        this.RecyclablelitterCap.buttonMode = true;
        this.RecyclablelitterCap.alpha = 0;
        this.addChild(this.RecyclablelitterCap);
        //垃圾箱盖事件
        this.RecyclablelitterCap.on("pointertap", () => {
            this.RecyclableSprite.forEach((item) => {
                    if (item.EventChange) {
                        item.EventChangePickUp = true;
                    }
                })
                //垃圾移动
            this.RecyclableSprite.forEach((item) => {
                if (item.EventChange && item.EventChangePickUp) {
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
                                x: 0,
                                y: 450
                            }],
                        },
                        ease: Power1.easeInOut
                    })
                }
            })

            this.RubbishBoxSpriteItem.state.setAnimation(0, "box2_open", false)
            this.RubbishBoxSpriteItem.state.tracks[0].listener = {
                complete: () => {
                    this.RubbishBoxSpriteItem.state.setAnimation(0, "box2_normal", true);
                }
            }
        });
        //轮带
        for (let i = 0; i < 2; i++) {
            this.track.push(createdSprite({
                $this: self,
                $alias: 'track_png',
                $x: i * 1920,
                $y: 715
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
            $x: 1670,
            $y: 100,
            $style: createdStyle({
                $fontSize: 60,
                $fill: "#FDFFD0",
            })
        });
        //时间
        this.TimeMessage = createdText({
            $this: self,
            $text: "00:60",
            $x: 1200,
            $y: 100,
            $style: createdStyle({
                $fontSize: 60,
                $fill: "#FDFFD0",
            })
        });
        //返回按钮
        this.palyBase.BtnBackNormal.on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.palyBase.BtnBackClick.visible = true;
        })
        this.palyBase.BtnBackClick.on("pointerup", () => {
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
        }).on("pointerout", () => {
            this.palyBase.BtnBackClick.visible = false;
        });
        //添加垃圾
        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * 20)
            let RecyclableItem = createdSprite({
                $this: self,
                $alias: self.Waster[index],
                $x: i * 384 + 1920,
                $y: 870,
                $interactive: true,
                $buttonMode: true,
            });
            RecyclableItem.pivot.y = RecyclableItem.height;
            RecyclableItem.EventChange = false; //点击事件是否发生
            RecyclableItem.EventChangePickUp = false; //垃圾箱点击事件
            RecyclableItem.EventChangePosition = -200; //模拟点击事件的位置
            RecyclableItem.ClassItem = this.WasterClass[Math.floor(index / 5)]; //定义垃圾属性
            RecyclableItem.on("pointerdown", () => { //垃圾点击事件
                //PIXI.sound.pause("RubbishPlaying"); 暂停背景音乐
                PIXI.sound.play(self.Waster[index] + "_mp3", {
                    // complete: () => {
                    //     if (self.RubbishPlayingControl) {
                    //         self.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                    //             loop: true,
                    //             start: self.RubbishPlaying._duration * self.RubbishPlaying.progress
                    //         })
                    //     }
                    // }  取消垃圾背景音乐
                }); //播放单词音频

                this.RecyclableSprite.forEach((item) => {
                    if (item.y == 870) {
                        item.EventChange = false;
                    }
                })
                RecyclableItem.EventChange = true;
                RecyclableItem.EventChangePosition = RecyclableItem.x //点击位置
            });
            this.RecyclableSprite.push(RecyclableItem);
        }
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.start();
        ///////////////////弹窗开始//////////////////////////////
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
        });
        this.Dialog.yesBtn.on('pointertap', () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.Dialog.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
            clearTimeout(this.setTimeoutNum); //清除定时器
            this.removeChildren(0, this.children.length);
            SceneManager.run(new EasyGameSelectPages());
        });
        this.Dialog.noBtn.on("pointertap", () => {
            this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
            this.RecyclableSprite.forEach((item) => {
                item.interactive = true;
                item.buttonMode = true;
            })
            this.RecyclablelitterCap.interactive = true;
            this.palyBase.BtnBackNormal.interactive = true;
            PIXI.sound.play("RubbishPlaying", {
                    loop: true
                }) //游戏音乐背景
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
                    $fontFamily: "Times New Roman"
                })
            }))
        });
        this.Dialog.fhBtn.on('pointertap', () => { //返回按钮事件
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.fhBtn, this.Dialog.againBtn)
            clearTimeout(this.setTimeoutNum); //清除定时器
            PIXI.sound.pause("RubbishSuccess"); //胜利音效结束
            SceneManager.run(new EasyGameSelectPages());
        });
        this.Dialog.againBtn.on("pointertap", () => { //再来一次事件
            this.RubbishPlayingControl = true;
            PIXI.sound.play("ClickSound") //添加点击效果音效
            PIXI.sound.pause("RubbishSuccess"); //声音音效结束
            this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.success,
                this.Dialog.fhBtn, this.Dialog.againBtn)
            this.DialogSummarySpriteArr.forEach((item) => {
                this.removeChild(item)
            })
            clearTimeout(this.setTimeoutNum); //清除定时器
            SceneManager.run(new EasyGamePlayingPages());
        });

        ///////////////////弹窗结束/////////////////////////////
    }
    gameloop(delta) {
        //轮子
        this.wheelSprite.forEach((item) => {
                item.rotation -= 0.075 * delta;
            })
            //传送带
        this.track.forEach((item) => {
            item.x <= -1920 && item.position.set(1920, 715);
            item.x -= 3;
        });
        //定义时间函数
        this.TimeNum += 1;
        if (this.TimeNum < this.TimeLimit) {
            this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)));
        } else if (this.TimeNum == this.TimeLimit) { //时间到事件......
            //this.addChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop)
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
                PIXI.sound.play("RubbishSuccess")
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
                //this.addChild(this.EndScreen);
                //这个是结束页结束....
                this.DialogSummarySpriteArr[5].text = this.DialogDetail.correct;
                this.DialogSummarySpriteArr[4].text = this.DialogDetail.incorrect;
                //this.DialogSummarySpriteArr[3].text = this.DialogDetail.highScore; //改成本次得分
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
            item.EventChange ? item.scale.set(1.2, 1.2) : item.scale.set(0.9, 0.9);
            if (item.EventChange && item.EventChangePickUp) {
                //定义点击事件后发生的事情
                if (item.y <= 450) {
                    //选对加分
                    if (item.ClassItem == this.WasterClass[this.suitable]) { //选对的加分事件
                        this.ScoreNum += 5;
                        //动物高兴
                        this.animateSpineNameItem.state.tracks[0].listener = {
                                complete: () => {
                                    this.animateSpineNameItem.state.setAnimation(0, "normal", true);
                                }
                            }
                            //动物高兴结束
                            //取消暂停音乐播放
                            //PIXI.sound.pause("RubbishPlaying");
                        PIXI.sound.play("RubbishRight", {
                            // complete: () => {
                            //     if (self.RubbishPlayingControl) {
                            //         self.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                            //             loop: true,
                            //             start: self.RubbishPlaying._duration * self.RubbishPlaying.progress
                            //         })
                            //     }
                            // }
                        });
                        //取消本次最高分效果
                        //(this.DialogDetail.highScore < this.ScoreNum) && (this.DialogDetail.highScore = this.ScoreNum)
                        this.DialogDetail.correct++;
                        //选错减分
                    } else { //选错的减分事件
                        (this.ScoreNum >= 5) && (this.ScoreNum = this.ScoreNum - 5);
                        //动物不高兴
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
                        //动物不高兴结束
                        //取消暂停背景音乐播放
                        //PIXI.sound.pause("RubbishPlaying");
                        PIXI.sound.play("RubbishWrong", {
                            //取消暂停播放音乐
                            // complete: () => {
                            //     self.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                            //         loop: true,
                            //         start: self.RubbishPlaying._duration * self.RubbishPlaying.progress
                            //     })
                            // }
                        });

                        this.DialogDetail.incorrect++;
                    }
                    this.ScoreMessage.text = this.ScoreNum;

                    this.BornSprite(item, index, arr);
                }
            } else {
                //定义正常走的事件
                item.x -= 3;
                (item.x <= -384) && this.BornSprite(item, index, arr)
            }
        });
    }
    BornSprite = (item, index, arr) => {
        this.removeChild(item); //先移除原有的精灵
        let RandomIndex, NewItem, self = this;
        RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
        NewItem = createdSprite({
            $this: self,
            $alias: self.Waster[RandomIndex],
            $x: self.RecyclableSprite[self.RecyclableSprite.length - 1].x + 384,
            $y: 870,
            $interactive: true,
            $buttonMode: true,
            $pivotY: true,
        })
        NewItem.EventChangePosition = -200; //对创建的精灵定义属性
        NewItem.EventChange = false;
        NewItem.EventChangePickUp = false;
        NewItem.ClassItem = this.WasterClass[Math.floor(RandomIndex / 5)];
        NewItem.on("pointerdown", () => { //定义精灵 事件
            //PIXI.sound.pause("RubbishPlaying"); 取消暂停背景音乐
            PIXI.sound.play(self.Waster[RandomIndex] + "_mp3", {
                complete: () => {
                    // self.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                    //     loop: true,
                    //     start: self.RubbishPlaying._duration * self.RubbishPlaying.progress
                    // }) //背景音乐的播放
                }
            }); //播放单词音频
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
}