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
    created
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
        this.TimeLimit = 3600;
        this.BtnBackNormal;
        this.TimeMessage;
        this.Recyclablelitter;
        this.RecyclablelitterName;
        this.RecyclablelitterCap;
        this.RecyclablelitterCapName;
        this.ScoreMessage;
        this.ScoreNum = 0;
        this.TimeNum = 60;
        this.SelectWaste = [];
        this.track = [];
        this.wheelSprite = [];
        this.RecyclableSprite = [];
        this.WasterClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'];
        this.RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal', 'paper', ];
        this.KitchenWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells', 'fruitPeels'];
        this.HazardousWaste = ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints', 'medicines'];
        this.OthersWaster = ["toiletPaper", "sands", "ceramics", "bricks", "crocks", "toiletPaper"];
        this.Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
            'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
            'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints',
            "toiletPaper", "sands", "ceramics", "bricks", "crocks"
        ];
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
        //测试使用
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
            this.TimeNum = 60;
            this.track = [];
            this.RecyclableSprite = [];
            //测试使用
            switch (this.Test) {
                //switch (Garbage.getGarBage("position")) {
                case 100:
                    this.RecyclablelitterName = "RecyclableLitter"
                    this.RecyclablelitterCapName = "RecyclableLitterCap"
                    this.SelectWaste = this.RecyclableWaste
                    this.suitable = 0;
                    break;
                case 600:
                    this.RecyclablelitterName = "KitchenLitter"
                    this.RecyclablelitterCapName = "KitchenLitterCap"
                    this.suitable = 1;
                    this.SelectWaste = this.KitchenWaste
                    break;
                case 1100:
                    this.RecyclablelitterName = "HarmfulLitter"
                    this.RecyclablelitterCapName = "HarmfulLitterCap"
                    this.suitable = 2;
                    this.SelectWaste = this.HazardousWaste
                    break;
                case 1600:
                    this.RecyclablelitterName = "OtherLitter"
                    this.RecyclablelitterCapName = "OtherLitterCap"
                    this.suitable = 3;
                    this.SelectWaste = this.OthersWaster
                    break;
            }
        })()
        let ScoreStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 60,
            fill: "#FDFFD0",
        });
        //背景图
        created({
                $this: self,
                $alias: 'bggame_png'
            })
            //房子图片
        created({
                $this: self,
                $x: 1450,
                $y: 100,
                $alias: 'house_png',
            })
            //垃圾箱
        created({
                $this: self,
                $name: self.Recyclablelitter,
                $alias: self.RecyclablelitterName,
                $x: 100,
                $y: 480,
            })
            //垃圾箱的盖子
        this.RecyclablelitterCap = created({
                $this: self,
                $name: self.RecyclablelitterCap,
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
        this.addChild(this.RecyclablelitterCap);
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

            //this.addChild(this.wheel);
        }
        //分数背景图片
        created({
                $this: self,
                $alias: 'score_png',
                $x: 1000,
                $y: 40,
            })
            //在分数背景图下写分数
        this.ScoreMessage = new PIXI.Text(this.ScoreNum, ScoreStyle)
        this.ScoreMessage.position.set(1670, 100)
        this.addChild(this.ScoreMessage);
        //时间
        this.TimeMessage = new PIXI.Text("00:60", ScoreStyle);
        this.TimeMessage.position.set(1200, 100);
        this.addChild(this.TimeMessage);
        //花的图片
        created({
                $this: self,
                $alias: "flower_png",
                $x: 1500,
                $y: 95
            })
            //时间的图片
        created({
                $this: self,
                $alias: "alarm_png",
                $x: 1050,
                $y: 95
            })
            //返回按钮
        this.BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        this.BtnBackNormal.position.set(100, 70);
        this.BtnBackNormal.interactive = true;
        this.BtnBackNormal.buttonMode = true;
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(this.BtnBackNormal);
        //小动物
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
        this.SelectWaste.forEach((item, index) => {
            let RecyclableItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
            RecyclableItem.x = index * 384 + 1920;
            RecyclableItem.y = 870;
            RecyclableItem.pivot.y = RecyclableItem.height;
            RecyclableItem.EventChange = false; //点击事件是否发生
            RecyclableItem.EventChangePickUp = false; //垃圾箱点击事件
            RecyclableItem.EventChangePosition = -200; //模拟点击事件的位置
            RecyclableItem.ClassItem = this.WasterClass[this.suitable]; //定义垃圾属性
            RecyclableItem.scaleV = 0 //定义垃圾在回收的缩放比例有一定的加速效果
            RecyclableItem.buttonMode = true; //定义点击事件
            RecyclableItem.interactive = true;
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
            this.addChild(RecyclableItem);
        })
        this.loop = new PIXI.ticker.Ticker();
        this.loop.add(delta => this.gameloop(delta));
        this.loop.start();
        ///////////////////弹窗开始//////////////////////////////
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
        } else if (this.TimeNum == this.TimeLimit) {
            // alert("游戏结束")
            this.timePop.visible = true;
            this.naoZPop.visible = true;
            this.graphicsTime.visible = true;
            this.BtnBackNormal.interactive = false;
            this.BtnBackNormal.buttonMode = false;
            this.RecyclableSprite.forEach((item) => {
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

            }, 2000)
        } else {
            this.TimeMessage.text = (Math.floor(this.TimeNum / 3600) + ":" + Math.floor((this.TimeNum - 3600) / 60))
        }
        //定义动物的层级
        this.setChildIndex(this.unHappyAnimal, 8); //这句写的不好
        this.setChildIndex(this.HappyAnimal, 9);
        //精灵循环\
        let Judgement = this.RecyclableSprite.some((item) => {
            return item.y < 870
        })
        if (Judgement) {
            this.RecyclablelitterCap.interactive = false;
        } else {
            this.RecyclablelitterCap.interactive = true;
        }
        this.RecyclableSprite.forEach((item, index, arr) => {
            if (item.EventChange) {
                item.scale.set(1.2, 1.2);
            } else {
                item.scale.set(0.9, 0.9);
            }
            if (item.EventChange && item.EventChangePickUp) {
                //定义点击事件后发生的事情
                // item.scaleV += 1;
                // item.anchor.set(0.5, 0.5);
                // item.y += -(500 - 100) / 120;
                // item.x += -(item.EventChangePosition) / 120;
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
                    //添加垃圾精灵
                    this.removeChild(item); //先移除原有的精灵
                    //随机生成数让均等出现不同的垃圾种类
                    let RandomIndex, NewItem;
                    RandomIndex = Math.floor(Math.random() * 20);
                    //创建新的精灵
                    NewItem = new PIXI.Sprite(PIXI.loader.resources[this.Waster[RandomIndex]].texture);
                    NewItem.EventChangePosition = -200; //对创建的精灵定义属性
                    NewItem.pivot.y = NewItem.height;
                    NewItem.scaleV = 0;
                    NewItem.EventChange = false;
                    NewItem.EventChangePickUp = false;
                    NewItem.buttonMode = true;
                    NewItem.interactive = true;
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
                    NewItem.position.set(this.RecyclableSprite[this.RecyclableSprite.length - 1].x + 384, 870); //给精灵添加到位置
                    arr.push(NewItem);
                    this.addChild(NewItem) //把精灵添加到舞台
                }
            } else {
                //定义正常走的事件
                item.x -= 5;
                if (item.x <= -384) {
                    this.removeChild(item); //先移除原有的精灵
                    let RandomIndex, NewItem;
                    RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
                    NewItem = new PIXI.Sprite(PIXI.loader.resources[this.Waster[RandomIndex]].texture);
                    NewItem.EventChangePosition = -200; //对创建的精灵定义属性
                    NewItem.pivot.y = item.height;
                    NewItem.scaleV = 0;
                    NewItem.EventChange = false;
                    NewItem.EventChangePickUp = false;
                    NewItem.buttonMode = true;
                    NewItem.interactive = true;
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
                        //这句话是个坑啊  ...坑了我一个下午...以后注意
                        //arr[index] = item //替换原有的精灵  坑*****
                    arr.splice(index, 1);
                    NewItem.pivot.y = NewItem.height;
                    NewItem.position.set(this.RecyclableSprite[this.RecyclableSprite.length - 1].x + 384, 870); //给精灵添加到位置
                    arr.push(NewItem);
                    this.addChild(NewItem) //把精灵添加到舞台
                }
            }
        });
    }
    fhBtnEvent() {
        this.removeChild(this.graphicsSummary, this.popSummary, this.fhBtn, this.againBtn)
        SceneManager.run("EasyGameSelectPages");
    }
    againBtnEvent() {
        SceneManager.run("EasyGamePlayingPages")
    }
    BtnBackNormalEvent = () => {
        this.loop.stop();
        this.addChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn)
        SceneManager.destroyScene("EasyGameMainPages");
        this.RecyclableSprite.forEach((item) => {
            item.interactive = false;
            item.buttonMode = false;
        })

    }
    yesButtonEvent = () => {
        this.removeChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn);
        SceneManager.run("EasyGameSelectPages");
        //this.
    }
    noButtonEvent = () => {
        this.removeChild(this.graphics, this.pop, this.DialogText, this.yesBtn, this.noBtn);
        this.RecyclableSprite.forEach((item) => {
            item.interactive = true;
            item.buttonMode = true;
        })
        this.loop.start();
    }
}