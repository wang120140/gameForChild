import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    TweenMax,
    Power1
} from "gsap";
export default class HardGamePlayingPages extends PIXI.Container {
    constructor() {
        super();
        this.bg;
        this.track = [];
        this.wheel;
        this.wheelSprite = [];
        this.BtnBackNormal;
        this.Flower;
        this.Alarm;
        this.Scorebg;
        this.TimeMessage;
        this.TimeNum = 60;
        this.ScoreMessage;
        this.ScoreNum = 0;
        this.WasterBox = ["RecyclableLitter", "KitchenLitter", "HarmfulLitter", "OtherLitter"];
        this.WasterBoxCap = ["RecyclableLitterCap", "KitchenLitterCap", "HarmfulLitterCap", "OtherLitterCap"];
        //this.WasterBoxCapItem
        this.WasterBoxCapJumpment = false;
        this.Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
            'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
            'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints',
            "toiletPaper", "sands", "ceramics", "bricks", "crocks"
        ];
        this.WasterClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'];
        this.WasterBoxCapSprite = [];
        this.WasterGather = [];
        //弹窗
        this.pop;
        this.DialogText;
        this.yesBtn;
        this.noBtn;
        this.graphics;
        //时间到弹窗
        this.timePop;
        this.naoZPop;
        this.graphicsTime;
        //总结弹窗
        this.popSummary;
        this.success;
        this.fhBtn;
        this.againBtn;
        this.graphicsSummary;
        this.on('removed', this.removeFromStage, this);
        this.on("added", this.addedStage, this);

    }
    addedStage() {
        //第一个弹窗吧关闭按钮的弹窗
        this.pop = new PIXI.Sprite(PIXI.Texture.from('pop_png'));
        this.pop.position.set(400, 100);
        this.pop.visible = true;
        this.pop.alpha = 1;
        this.pop.interactive = true;
        //字体
        this.DialogText = new PIXI.Text("Do you really want to quit ? ", ScoreStyle);
        this.DialogText.position.set(600, 350)
            //yes按钮
        this.yesBtn = new PIXI.Sprite(PIXI.Texture.from('yesBtn_0_png'));
        this.yesBtn.position.set(600, 700);
        this.yesBtn.interactive = true;
        this.yesBtn.buttonMode = true;
        this.yesBtn.on('pointertap', this.yesButtonEvent);
        //no按钮
        this.noBtn = new PIXI.Sprite(PIXI.Texture.from('noBtn_0_png'));
        this.noBtn.interactive = true;
        this.noBtn.buttonMode = true;
        this.noBtn.on("pointertap", this.noButtonEvent)
        this.noBtn.position.set(1200, 700);
        //遮罩层
        this.graphics = new PIXI.Graphics();
        //this.graphics = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture)
        this.graphics.beginFill(0x5500).drawRect(0, 0, 1920, 1080).endFill();
        this.graphics.alpha = 0.1;
        //第二个弹窗 是时间到的按钮
        this.timePop = new PIXI.Sprite(PIXI.Texture.from('Timeout_png'));
        this.timePop.position.set(300, 400);
        this.timePop.visible = false;
        this.timePop.interactive = true;
        //闹钟图
        this.naoZPop = new PIXI.Sprite(PIXI.Texture.from('alarmclock_png'));
        this.naoZPop.position.set(830, 200);
        this.naoZPop.visible = false;
        this.naoZPop.interactive = true;
        //遮罩层
        this.graphicsTime = new PIXI.Graphics();
        this.graphicsTime.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphicsTime.alpha = 0.1;
        this.graphicsTime.visible = false;
        this.addChild(this.graphicsTime, this.timePop, this.naoZPop)
            //第三个弹框 总结弹窗
        this.popSummary = new PIXI.Sprite(PIXI.Texture.from('endPop_png'));
        this.popSummary.position.set(500, 200);
        this.popSummary.visible = false;
        this.popSummary.interactive = true;
        //success图标
        this.success = new PIXI.Sprite(PIXI.Texture.from('success_png'));
        this.success.visible = false;
        this.success.position.set(600, 100);
        //返回按钮
        this.fhBtn = new PIXI.Sprite(PIXI.Texture.from('backBtn_0_png'));
        this.fhBtn.position.set(650, 700);
        this.fhBtn.visible = false;
        this.fhBtn.interactive = true;
        this.fhBtn.buttonMode = true;
        this.fhBtn.on('pointertap', this.fhBtnEvent);
        //再来一次按钮
        this.againBtn = new PIXI.Sprite(PIXI.Texture.from('againBtn_0'));
        this.againBtn.visible = false;
        this.againBtn.interactive = true;
        this.againBtn.buttonMode = true;
        this.againBtn.on("pointertap", this.againBtnEvent)
        this.againBtn.position.set(1100, 700);
        //遮罩层
        this.graphicsSummary = new PIXI.Graphics();
        this.graphicsSummary.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill();
        this.graphicsSummary.visible = false;
        this.graphicsSummary.alpha = 0.6;
        (() => {
            this.TimeNum = 60;
            this.WasterGather = [];
            this.ScoreNum = 0;
        })()
        let ScoreStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 60,
            fill: "#FDFFD0",
        });
        this.bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(this.bg);
        //垃圾箱
        this.WasterBox.forEach((item, index) => {
                let WasterBoxItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
                WasterBoxItem.position.set(index * 500, 380);
                this.addChild(WasterBoxItem);
            })
            //传送带
        for (let i = 0; i < 2; i++) {
            let track0 = new PIXI.Sprite(PIXI.loader.resources['track_png'].texture);
            track0.position.set(i * 1920, 715);
            this.track.push(track0);
            this.addChild(track0);
        }
        //轮子背景图
        for (let wheelNum = 0; wheelNum <= 15; wheelNum++) {
            this.wheel = new PIXI.Sprite(PIXI.loader.resources['wheel_png'].texture);
            this.wheel.position.set(wheelNum * 138, 1080);
            this.wheel.anchor.set(0.5);
            this.wheelSprite.push(this.wheel);
            this.addChild(this.wheel);
        }
        //返回按钮
        this.BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        this.BtnBackNormal.position.set(100, 70);
        this.BtnBackNormal.interactive = true;
        this.BtnBackNormal.buttonMode = true;
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(this.BtnBackNormal);
        //分数背景图片
        this.Scorebg = new PIXI.Sprite(PIXI.loader.resources['score_png'].texture);
        this.Scorebg.position.set(1000, 40);
        this.addChild(this.Scorebg);
        //花的图片
        this.Flower = new PIXI.Sprite(PIXI.loader.resources["flower_png"].texture);
        this.Flower.position.set(1500, 95);
        this.addChild(this.Flower);
        //时间的图片
        this.Alarm = new PIXI.Sprite(PIXI.loader.resources["alarm_png"].texture);
        this.Alarm.position.set(1050, 95);
        this.addChild(this.Alarm);
        //时间数据
        this.TimeMessage = new PIXI.Text("00:00", ScoreStyle);
        this.TimeMessage.position.set(1200, 100);
        this.addChild(this.TimeMessage);
        //在分数背景图下写分数
        this.ScoreMessage = new PIXI.Text(this.ScoreNum, ScoreStyle)
        this.ScoreMessage.position.set(1670, 100)
        this.addChild(this.ScoreMessage);
        //箱子盖
        this.WasterBoxCap.forEach((item, index) => {
                let WasterBoxCapItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
                WasterBoxCapItem.interactive = true;
                WasterBoxCapItem.buttonMode = true;
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
                WasterBoxCapItem.position.set(index * 500 - 20, 300);
                this.WasterBoxCapSprite.push(WasterBoxCapItem);
                this.addChild(WasterBoxCapItem);
            })
            //创建垃圾物品
        for (let i = 0; i < 6; i++) {
            let index = Math.floor(Math.random() * 20)
            let WasterItem = new PIXI.Sprite(PIXI.loader.resources[this.Waster[index]].texture);
            WasterItem.pivot.y = WasterItem.height;
            WasterItem.position.set(i * 384 + 1920, 870);
            WasterItem.Class = this.WasterClass[Math.floor(index / 5)]; //定义属性
            WasterItem.CheckClass = null; //定义检查属性
            WasterItem.interactive = true; //定义鼠标事件
            WasterItem.buttonMode = true; //改变鼠标按钮的情况
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
            this.addChild(WasterItem);
        }
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.start();
    }
    gameloop(delta) {
        //关于时间的方法
        this.TimeNum += 1;
        if (this.TimeNum < 6660) {
            this.TimeMessage.text = ("00:" + (60 - Math.floor(this.TimeNum / 60)));
        } else if (this.TimeNum == 6660) {
            this.timePop.visible = true;
            this.naoZPop.visible = true;
            this.graphicsTime.visible = true;
            this.BtnBackNormal.interactive = false;
            this.BtnBackNormal.buttonMode = false;
            this.WasterGather.forEach((item) => {
                item.interactive = false;
                item.buttonMode = false;
            })
            this.loop.stop();
            setTimeout(() => {
                this.removeChild(this.graphicsTime, this.timePop, this.naoZPop);
                this.addChild(this.graphicsSummary, this.popSummary, this.fhBtn, this.againBtn)
                this.popSummary.visible = true;
                this.success.visible = true;
                this.fhBtn.visible = true;
                this.againBtn.visible = true;
                console.log("定时器发生......")
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
            //this.WasterBoxCapJumpment ?
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
            //控制运动效果
            if ((item.ButtonClick) && (item.StartPostion != null) && (item.EndPostion != null)) {
                // item.y += (300 - 670) / 160
                // item.x += ((item.EndPostion - item.StartPostion) / 160)
            } else {
                item.x -= 5;
            }
            this.ScoreMessage.text = this.ScoreNum;
            //消失和生成效果
            if (item.y < 500 || item.x < -200) {
                if (item.y < 500) {
                    if (item.CheckClass == item.Class) {
                        this.ScoreNum += 5;
                    } else {
                        this.ScoreNum -= 5;
                    }
                }
                item.visible = false;
                this.removeChild(item); //先移除原有的精灵
                let RandomIndex;
                RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
                item = new PIXI.Sprite(PIXI.loader.resources[this.Waster[RandomIndex]].texture);


                item.Class = this.WasterClass[Math.floor(index / 5)]; //定义属性
                item.CheckClass = null; //定义检查属性

                item.interactive = true; //定义鼠标事件
                item.buttonMode = true; //改变鼠标按钮的情况
                item.ButtonClick = false; //是否点击了事件发生
                item.StartPostion = null; //开始位置 
                item.EndPostion = null; //结束位置
                item.on("pointerdown", () => { //定义精灵事件
                    this.WasterGather.forEach((item) => {
                        (item.y == 870) && (item.ButtonClick = false);
                    })
                    item.ButtonClick = true;
                })

                item.pivot.y = item.height;

                arr.splice(index, 1);
                item.position.set(arr[arr.length - 1].x + 387, 870); //给精灵添加到位置
                arr.push(item)
                this.addChild(item) //把精灵添加到舞台
            }
        })
    }
    fhBtnEvent() {

        this.removeChild(this.graphicsSummary, this.popSummary, this.fhBtn, this.againBtn)
        SceneManager.run("HomePages");
    }
    againBtnEvent() {
        SceneManager.run("HardGamePlayingPages")
    }
    BtnBackNormalEvent = () => {
        this.loop.stop();
        this.addChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn)
        this.WasterGather.forEach((item) => {
            item.interactive = false;
            item.buttonMode = false;
        })
    }
    yesButtonEvent = () => {
        this.removeChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn);
        SceneManager.run("HomePages");
    }
    noButtonEvent = () => {
        this.removeChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn);
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