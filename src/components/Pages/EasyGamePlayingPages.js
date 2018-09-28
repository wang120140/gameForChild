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
        this.TimeLimit = 6000;
        this.BtnBackNormal;
        this.TimeMessage;
        this.Recyclablelitter;
        this.RecyclablelitterName;
        this.RecyclablelitterCap;
        this.RecyclablelitterCapName;
        this.ScoreMessage;
        this.ScoreNum = 0;
        this.TimeNum = 60;
        this.track = [];
        this.wheelSprite = [];
        this.RecyclableSprite = [];
        this.WasterClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'];
        this.Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
            'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
            'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints',
            "toiletPaper", "sands", "ceramics", "bricks", "crocks"
        ];
        this.palyBase = {};
        //弹窗
        this.Dialog;
        this.DialogText;
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
            this.RecyclableSprite = [];
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
        })()
        //背景图
        this.palyBase = new PlayGameBasePage({
            _this: self
        });
        this.palyBase.bg;
        this.palyBase.house;
        //垃圾箱
        created({
                $this: self,
                $alias: self.RecyclablelitterName,
                $x: 100,
                $y: 480,
            })
            //垃圾箱的盖子
        this.RecyclablelitterCap = created({
                $this: self,
                $alias: self.RecyclablelitterCapName,
                $x: 83,
                $y: 400,
                $interactive: true,
                $buttonMode: true,
            })
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
            })
            //轮带
        for (let i = 0; i < 2; i++) {
            this.track.push(created({
                $this: self,
                $alias: 'track_png',
                $x: i * 1920,
                $y: 715
            }));
        }

        //this.track = this.palyBase.track;
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
        //分数背景图片
        this.palyBase.score;
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
            })
            //花的图片
        this.palyBase.flower;
        //时间的图片
        this.palyBase.alarm;
        //返回按钮
        this.palyBase.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
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
            })
            RecyclableItem.pivot.y = RecyclableItem.height;
            RecyclableItem.EventChange = false; //点击事件是否发生
            RecyclableItem.EventChangePickUp = false; //垃圾箱点击事件
            RecyclableItem.EventChangePosition = -200; //模拟点击事件的位置
            RecyclableItem.ClassItem = this.WasterClass[Math.floor(index / 5)]; //定义垃圾属性
            RecyclableItem.on("pointerdown", () => { //点击事件
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
            $text: "Do you really want to quit ? ",
            $x: 600,
            $y: 350,
            $addChild: false,
            $style: createdStyle({
                $fontSize: 60,
                $fill: "#FDFFD0",
            })
        })
        this.Dialog.yesBtn.on('pointertap', this.yesButtonEvent);
        this.Dialog.noBtn.on("pointertap", this.noButtonEvent)
            //第二个弹窗 是时间到的按钮 
            //第三个弹框 总结弹窗
        this.Dialog.fhBtn.on('pointertap', this.fhBtnEvent);
        this.Dialog.againBtn.on("pointertap", this.againBtnEvent)
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
            item.x -= 5;
        });
        //定义时间函数
        this.TimeNum += 1;
        if (this.TimeNum < this.TimeLimit) {
            this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)));
        } else {
            this.addChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop)
            this.BtnBackNormal.interactive = false;
            this.BtnBackNormal.buttonMode = false;
            this.RecyclableSprite.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })
            this.loop.stop();
            setTimeout(() => {
                this.removeChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop);
                this.addChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.fhBtn, this.Dialog.againBtn)
            }, 2000)
        }
        //定义动物的层级
        this.setChildIndex(this.unHappyAnimal, 8); //这句写的不好
        this.setChildIndex(this.HappyAnimal, 9);
        //精灵循环
        let Judgement = this.RecyclableSprite.some((item) => {
            return item.y < 870
        })
        Judgement ? (this.RecyclablelitterCap.interactive = false) : (this.RecyclablelitterCap.interactive = true);
        this.RecyclableSprite.forEach((item, index, arr) => {
            item.EventChange ? item.scale.set(1.2, 1.2) : item.scale.set(0.9, 0.9);
            if (item.EventChange && item.EventChangePickUp) {
                //定义点击事件后发生的事情
                if (item.y <= 450) {
                    if (item.ClassItem == this.WasterClass[this.suitable]) {
                        this.ScoreNum += 5;
                        this.unHappyAnimal.visible = false;
                        this.HappyAnimal.visible = true;
                    } else {
                        this.ScoreNum = this.ScoreNum - 5;
                        this.unHappyAnimal.visible = true;
                        this.HappyAnimal.visible = false;
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
    fhBtnEvent = () => {
        this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.fhBtn, this.Dialog.againBtn)
        SceneManager.run("EasyGameSelectPages");
    }
    againBtnEvent() {
        SceneManager.run("EasyGamePlayingPages")
    }
    BtnBackNormalEvent = () => {
        this.loop.stop();
        this.addChild(this.Dialog.graphics, this.Dialog.pop, this.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn)
        this.RecyclableSprite.forEach((item) => {
            item.interactive = false;
            item.buttonMode = false;
        })

    }
    yesButtonEvent = () => {
        this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.Dialog.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
        SceneManager.run("EasyGameSelectPages");
    }
    noButtonEvent = () => {
        this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
        this.RecyclableSprite.forEach((item) => {
            item.interactive = true;
            item.buttonMode = true;
        })
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