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
    created,
    BackDialog,
    createdText,
    createdStyle,
    PlayGameBasePage,
} from "./Common.js"
export default class EasyGamePlayingPages extends PIXI.Container {
    constructor() {
        super();
        this.on('removed', this.removeFromStage, this);
        this.on('added', this.addedToStage, this);
        this.unHappyAnimal;
        this.HappyAnimal;
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
        this.TimeLimit = 6600;
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
            text: "High Score",
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
        this.Test = 100;
    }
    removeFromStage() {
        if (this.loop) {
            this.loop.destroy();
        }
    }
    addedToStage() {
        let self = this;
        (() => {
            this.Dialog = null;
            this.TimeNum = 60;
            this.track = [];
            this.ScoreMessage = null;
            this.ScoreNum = 0;
            this.RecyclableSprite = [];
            this.DialogSummarySpriteArr = [];
            this.DialogDetail = {
                    correct: 0,
                    incorrect: 0,
                    highScore: 0
                }
                //测试使用
            switch (this.Test) {
                //switch (Garbage.getGarBage("position")) {
                case 100:
                    this.RecyclablelitterName = "RecyclableLitter"
                    this.RecyclablelitterCapName = "RecyclableLitterCap"
                    this.suitable = 0;
                    break;
                case 600:
                    this.RecyclablelitterName = "KitchenLitter"
                    this.RecyclablelitterCapName = "KitchenLitterCap"
                    this.suitable = 1;
                    break;
                case 1100:
                    this.RecyclablelitterName = "HarmfulLitter"
                    this.RecyclablelitterCapName = "HarmfulLitterCap"
                    this.suitable = 2;
                    break;
                case 1600:
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
        //垃圾箱
        created({
            $this: self,
            $alias: self.RecyclablelitterName,
            $x: 100,
            $y: 480,
        });
        //垃圾箱的盖子
        this.RecyclablelitterCap = created({
            $this: self,
            $alias: self.RecyclablelitterCapName,
            $x: 83,
            $y: 400,
            $interactive: true,
            $buttonMode: true,
        });
        //垃圾箱事件
        this.RecyclablelitterCap.on("pointertap", () => {
            this.RecyclableSprite.forEach((item) => {
                if (item.EventChange) {
                    item.EventChangePickUp = true;
                }
            })
            this.RecyclableSprite.forEach((item) => {
                if (item.EventChange && item.EventChangePickUp) {
                    TweenMax.to(item, 1, {
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
        });
        //轮带
        for (let i = 0; i < 2; i++) {
            this.track.push(created({
                $this: self,
                $alias: 'track_png',
                $x: i * 1920,
                $y: 715
            }));
        }
        //轮子背景图
        for (let wheelNum = 0; wheelNum <= 15; wheelNum++) {
            this.wheelSprite.push(created({
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
        this.palyBase.BtnBackClick.on("pointerup", this.BtnBackNormalEvent) //返回按钮事件
            .on("pointerout", () => {
                this.palyBase.BtnBackClick.visible = false;
            });
        //小动物  这个预留给动画效果
        this.unHappyAnimal = new PIXI.Sprite(PIXI.loader.resources['unHappy_jpg'].texture);
        this.unHappyAnimal.scale.set(0.1, 0.1);
        this.unHappyAnimal.position.set(90, 100);
        this.HappyAnimal = new PIXI.Sprite(PIXI.loader.resources['Happy_jpg'].texture);
        this.HappyAnimal.scale.set(0.2, 0.2)
        this.HappyAnimal.position.set(90, 50)
        this.addChild(this.HappyAnimal);
        this.HappyAnimal.visible = false;
        this.addChild(this.unHappyAnimal);
        //添加垃圾
        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * 20)
            let RecyclableItem = created({
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
                PIXI.sound.play(self.Waster[index] + "_mp3"); //播放单词音频
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
            SceneManager.run("EasyGameSelectPages");
        });
        this.Dialog.noBtn.on("pointertap", this.noButtonEvent);

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
            SceneManager.run("EasyGameSelectPages");
        });
        this.Dialog.againBtn.on("pointertap", () => { //再来一次事件
            PIXI.sound.play("ClickSound") //添加点击效果音效
            PIXI.sound.pause("RubbishSuccess"); //声音音效结束
            this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.success,
                this.Dialog.fhBtn, this.Dialog.againBtn)
            this.DialogSummarySpriteArr.forEach((item) => {
                this.removeChild(item)
            })
            clearTimeout(this.setTimeoutNum); //清除定时器
            SceneManager.run("EasyGamePlayingPages")
        });

        ///////////////////弹窗结束/////////////////////////////
    }
    gameloop(delta) {
        let self = this;
        //轮子
        this.wheelSprite.forEach((item) => {
                item.rotation -= 0.075 * delta;
            })
            //传送带
        this.track.forEach((item) => {
            item.x <= -1920 && item.position.set(1920, 715);
            item.x -= 5;
        });
        //定义时间函数
        this.TimeNum += 1;
        if (this.TimeNum < this.TimeLimit) {
            this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)));
        } else if (this.TimeNum == this.TimeLimit) { //时间到事件......
            this.addChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop)
            this.palyBase.BtnBackNormal.interactive = false;
            this.palyBase.BtnBackNormal.buttonMode = false;
            this.RecyclableSprite.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })
            this.RecyclablelitterCap.interactive = false;
            PIXI.sound.pause("RubbishPlaying") //暂停游戏背景事件
            this.loop.stop(); //游戏循环结束事件
            this.setTimeoutNum = setTimeout(() => { //两秒后的弹窗事件发生......
                PIXI.sound.play("RubbishSuccess")
                this.removeChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop);
                this.DialogSummarySpriteArr[5].text = this.DialogDetail.correct;
                this.DialogSummarySpriteArr[4].text = this.DialogDetail.incorrect;
                this.DialogSummarySpriteArr[3].text = this.DialogDetail.highScore;
                this.addChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.success,
                    this.Dialog.fhBtn, this.Dialog.againBtn)
                this.DialogSummarySpriteArr.forEach((item) => {
                    this.addChild(item)
                })

            }, 2000)
        }
        //定义动物的层级
        this.setChildIndex(this.unHappyAnimal, 8); //这句写的不好
        this.setChildIndex(this.HappyAnimal, 9);
        //精灵循环
        //在飞行中的垃圾 不能有垃圾筐事件发生...
        let Judgement = this.RecyclableSprite.some((item) => {
            return item.y < 870
        });
        Judgement ? (this.RecyclablelitterCap.interactive = false) : (this.RecyclablelitterCap.interactive = true);
        this.RecyclableSprite.forEach((item, index, arr) => {
            item.EventChange ? item.scale.set(1.2, 1.2) : item.scale.set(0.9, 0.9);
            if (item.EventChange && item.EventChangePickUp) {
                //定义点击事件后发生的事情
                if (item.y <= 450) {
                    if (item.ClassItem == this.WasterClass[this.suitable]) { //选对的加分事件
                        this.ScoreNum += 5;
                        PIXI.sound.pause("RubbishPlaying");
                        PIXI.sound.play("RubbishRight", {
                            complete: () => {
                                self.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                                    loop: true,
                                    start: self.RubbishPlaying._duration * self.RubbishPlaying.progress
                                })
                            }
                        });
                        (this.DialogDetail.highScore < this.ScoreNum) && (this.DialogDetail.highScore = this.ScoreNum)
                        this.DialogDetail.correct++;
                        this.unHappyAnimal.visible = false;
                        this.HappyAnimal.visible = true;
                    } else { //选错的减分事件
                        this.ScoreNum = this.ScoreNum - 5;
                        PIXI.sound.pause("RubbishPlaying");
                        PIXI.sound.play("RubbishWrong", {
                            complete: () => {
                                self.RubbishPlaying = PIXI.sound.play("RubbishPlaying", {
                                    loop: true,
                                    start: self.RubbishPlaying._duration * self.RubbishPlaying.progress
                                })
                            }
                        });
                        this.unHappyAnimal.visible = true;
                        this.HappyAnimal.visible = false;
                        this.DialogDetail.incorrect++;
                    }
                    this.ScoreMessage.text = this.ScoreNum;
                    this.addChild(this.unHappyAnimal);
                    this.BornSprite(item, index, arr);
                }
            } else {
                //定义正常走的事件
                item.x -= 5;
                (item.x <= -384) && this.BornSprite(item, index, arr)
            }
        });
    }
    BtnBackNormalEvent = () => { //返回按钮事件
        //this.RubbishPlaying.stop();
        PIXI.sound.pause("RubbishPlaying") //游戏音乐背景
        this.loop.stop();
        this.addChild(this.Dialog.graphics, this.Dialog.pop, this.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn)
        this.RecyclableSprite.forEach((item) => {
            item.interactive = false;
            item.buttonMode = false;
        })
        this.palyBase.BtnBackNormal.interactive = false;
        this.RecyclablelitterCap.interactive = false;
    }
    noButtonEvent = () => { //不返回按钮事件
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
        PIXI.sound.play("ClickSound") //添加点击效果音效
        this.loop.start();
    }
    BornSprite = (item, index, arr) => {
        this.removeChild(item); //先移除原有的精灵
        let RandomIndex, NewItem, self = this;
        RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
        NewItem = created({
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
        NewItem.on("pointerdown", () => { //定义精灵事件
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
}