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
} from "./Common.js";
export default class HardGamePlayingPages extends PIXI.Container {
    constructor() {
        super();
        this.track = [];
        this.wheelSprite = [];
        this.BtnBackNormal;
        this.TimeMessage;
        this.TimeNum = 60;
        this.TimeOver = 600
        this.ScoreMessage;
        this.ScoreNum = 0;
        this.WasterBox = ["RecyclableLitter", "KitchenLitter", "HarmfulLitter", "OtherLitter"];
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
        this.on('removed', this.removeFromStage, this);
        this.on("added", this.addedStage, this);

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
        })()
        //背景
        this.palyBase.bg;
        this.palyBase.house;
        //垃圾箱
        this.WasterBox.forEach((item, index) => {
                created({
                    $this: self,
                    $alias: item,
                    $x: index * 500,
                    $y: 380,
                })
            })
            //传送带

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
        //返回按钮
        this.palyBase.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
            //分数背景图片
        this.palyBase.score;
        //花的图片
        this.palyBase.flower;
        //时间的图片
        this.palyBase.alarm;
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
                let WasterBoxCapItem = created({
                    $this: self,
                    $alias: item,
                    $x: index * 500 - 20,
                    $y: 300,
                    $interactive: true,
                    $buttonMode: true
                })
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
                            let MoveTime;
                            (Math.abs(item.StartPostion - item.EndPostion) >= 800) ? MoveTime = 1: MoveTime = 0.8
                            TweenMax.to(item, MoveTime, {
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
                this.WasterBoxCapSprite.push(WasterBoxCapItem);
            })
            //创建垃圾物品
        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * 20)
            let WasterItem = created({
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
            WasterItem.on("pointertap", () => {
                this.WasterGather.forEach((item) => {
                    (item.y == 870) && (item.ButtonClick = false);
                })
                WasterItem.ButtonClick = true;
            })
            this.WasterGather.push(WasterItem);
        }
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        if (Garbage.getGarBage("startPlayHardGame")) {
            this.loop.start();
        } else {
            this.loop.stop();
        }
        /////////////弹窗开始/////////////////////////
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
                })
            })
            //this.addChild(this.DialogText);
        this.Dialog.yesBtn.on('pointertap', this.yesButtonEvent);
        this.Dialog.noBtn.on("pointertap", this.noButtonEvent)
        this.Dialog.fhBtn.on('pointertap', this.fhBtnEvent);
        this.Dialog.againBtn.on("pointertap", this.againBtnEvent)
            ///////////////////弹窗结束/////////////////////////////
    }
    gameloop(delta) {
        //关于时间的方法
        let self = this;
        this.TimeNum += 1;
        if (this.TimeNum < this.TimeOver) {
            this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)));
        } else if (this.TimeNum == this.TimeOver) {
            this.addChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop)
            this.BtnBackNormal.interactive = false;
            this.BtnBackNormal.buttonMode = false;
            this.WasterGather.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })
            this.loop.stop();
            setTimeout(() => {
                this.removeChild(this.Dialog.graphics, this.Dialog.timePop, this.Dialog.naoZPop);
                this.addChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.fhBtn, this.Dialog.againBtn)
            }, 2000)
        } else {
            this.TimeMessage.text = (Math.floor(this.TimeNum / 3600) + ":" + Math.floor((this.TimeNum - 3600) / 60))
        }
        //传送带
        this.track.forEach((item) => {
            item.x <= -1920 && item.position.set(1920, 715);
            item.x -= 5;
        });
        //轮子
        this.wheelSprite.forEach((item) => {
                item.rotation -= 0.075 * delta;
            })
            //关于垃圾盖效果
        this.WasterBoxCapJumpment = this.WasterGather.some((item) => {
            return item.y < 870
        })
        this.WasterBoxCapSprite.forEach((item) => {
                item.interactive = (!this.WasterBoxCapJumpment);
            })
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
            (!((item.ButtonClick) && (item.StartPostion != null) && (item.EndPostion != null))) && (item.x -= 5);
            //消失和生成效果
            if (item.y < 500 || item.x < -200) {
                //定义成绩
                (item.y < 500) && ((item.CheckClass == item.Class) ? this.ScoreNum += 5 : this.ScoreNum -= 5)
                this.ScoreMessage.text = this.ScoreNum; //成绩多少
                this.removeChild(item); //先移除原有的精灵
                let RandomIndex;
                RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
                item = created({
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
    fhBtnEvent = () => {
        this.removeChild(this.Dialog.graphics, this.Dialog.popSummary, this.Dialog.fhBtn, this.Dialog.againBtn)
        SceneManager.run("HomePages");
    }
    againBtnEvent() {
        SceneManager.run("HardGamePlayingPages")
    }
    BtnBackNormalEvent = () => {
        this.loop.stop();
        this.addChild(this.Dialog.graphics, this.Dialog.pop, this.Dialog.yesBtn, this.Dialog.noBtn)
        this.addChild(this.DialogText)
        this.WasterGather.forEach((item) => {
            item.interactive = false;
            item.buttonMode = false;
        })
    }
    yesButtonEvent = () => {
        this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.Dialog.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
        SceneManager.run("HomePages");
    }
    noButtonEvent = () => {
        this.removeChild(this.Dialog.graphics, this.Dialog.pop, this.DialogText, this.Dialog.yesBtn, this.Dialog.noBtn);
        this.WasterGather.forEach((item) => {
            item.interactive = true;
            item.buttonMode = true;
        })
        this.loop.start();
    }
    removeFromStage() {
        if (this.loop) {
            this.loop.destroy();
        }
        this.removeChildren(0, this.children.length)
    }
    BtnBackNormalEvent() {
        SceneManager.run("HomePages");
    }

}