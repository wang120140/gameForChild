import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";

let unHappyAnimal, HappyAnimal, suitable,
    SelectWaste = [],
    RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal'],
    KitchenWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'],
    HazardousWaste = ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'],
    OthersWaster = ["toiletPaper", "sands", "ceramics", "bricks", "crocks"],
    Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
        'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
        'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints',
        "toiletPaper", "sands", "ceramics", "bricks", "crocks"
    ],
    WasterClass = ['Recyclable', 'Kitchen', 'Hazardous', 'Others'],
    RecyclableSprite = [],
    loop;
let bg, house, wheel, wheelSprite = [],
    track = [],
    Flower, Scorebg, ScoreMessage, ScoreNum = 0,
    Alarm, BtnBackNormal, TimeMessage, TimeNum = 0,
    Recyclablelitter, RecyclablelitterCap;
class GameMain extends PIXI.Container {
    constructor() {
        super();
        this.on('added', this.addedToStage, this);
    }
    addedToStage() {
        (() => {
            switch (Garbage.getGarBage("position")) {
                case 100:
                    console.log(100);
                    Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["RecyclableLitter"].texture);
                    RecyclablelitterCap = new PIXI.Sprite(PIXI.loader.resources["RecyclableLitterCap"].texture);
                    SelectWaste = RecyclableWaste
                    suitable = 0;
                    break;
                case 600:
                    console.log(600);
                    Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["KitchenLitter"].texture);
                    RecyclablelitterCap = new PIXI.Sprite(PIXI.loader.resources["KitchenLitterCap"].texture);
                    suitable = 1;
                    SelectWaste = KitchenWaste
                    break;
                case 1100:
                    console.log(1100);
                    Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["HarmfulLitter"].texture);
                    RecyclablelitterCap = new PIXI.Sprite(PIXI.loader.resources["HarmfulLitterCap"].texture);
                    suitable = 2;
                    SelectWaste = HazardousWaste
                    break;
                case 1600:
                    console.log(1600);
                    Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["OtherLitter"].texture);
                    RecyclablelitterCap = new PIXI.Sprite(PIXI.loader.resources["OtherLitterCap"].texture);
                    suitable = 3;
                    SelectWaste = OthersWaster
                    break;
            }
        })()
        let ScoreStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 60,
            fill: "white",
            stroke: '#ff3300',
            strokeThickness: 4,
            dropShadow: true,
            dropShadowColor: "#000000",
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
        });
        //背景图
        bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(bg);
        //房子图片
        house = new PIXI.Sprite(PIXI.loader.resources['house_png'].texture);
        house.position.set(1450, 100);
        this.addChild(house);
        //垃圾箱

        Recyclablelitter.position.set(100, 480);
        Recyclablelitter.buttonMode = true;
        Recyclablelitter.interactive = true;
        Recyclablelitter.on("pointerover", onButtonOver);

        function onButtonOver() {
            console.log("垃圾箱的事件触发")
        }
        this.addChild(Recyclablelitter);
        //垃圾箱的盖子

        RecyclablelitterCap.position.set(83, 400)
        this.addChild(RecyclablelitterCap);
        //传送带
        for (let i = 0; i < 2; i++) {
            let track0 = new PIXI.Sprite(PIXI.loader.resources['track_png'].texture);
            track0.position.set(i * (-1920), 700);
            //track0.scale.set(8, 3);
            track.push(track0);
            this.addChild(track0);
        }
        //轮子背景图
        for (let wheelNum = 0; wheelNum <= 15; wheelNum++) {
            wheel = new PIXI.Sprite(PIXI.loader.resources['wheel_png'].texture);
            wheel.position.set(wheelNum * 140, 1050);
            wheel.anchor.set(0.5);
            wheelSprite.push(wheel);
            this.addChild(wheel);
        }
        //分数背景图片
        Scorebg = new PIXI.Sprite(PIXI.loader.resources['score_png'].texture);
        Scorebg.position.set(1000, 40);
        this.addChild(Scorebg);
        //在分数背景图下写分数
        ScoreMessage = new PIXI.Text(ScoreNum, ScoreStyle)
        ScoreMessage.position.set(1670, 100)
        this.addChild(ScoreMessage);
        //时间
        TimeMessage = new PIXI.Text("00:00", ScoreStyle);
        TimeMessage.position.set(1200, 100);
        this.addChild(TimeMessage);
        //花的图片
        Flower = new PIXI.Sprite(PIXI.loader.resources["flower_png"].texture);
        Flower.position.set(1500, 95);
        this.addChild(Flower);
        //时间的图片
        Alarm = new PIXI.Sprite(PIXI.loader.resources["alarm_png"].texture);
        Alarm.position.set(1050, 95);
        this.addChild(Alarm);
        //返回按钮
        BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        BtnBackNormal.position.set(100, 70);
        BtnBackNormal.interactive = true;
        BtnBackNormal.buttonMode = true;
        BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(BtnBackNormal);
        //小动物
        unHappyAnimal = new PIXI.Sprite(PIXI.loader.resources['unHappy_jpg'].texture);
        unHappyAnimal.scale.set(0.1, 0.1);
        unHappyAnimal.position.set(90, 100);
        HappyAnimal = new PIXI.Sprite(PIXI.loader.resources['Happy_jpg'].texture);
        HappyAnimal.scale.set(0.2, 0.2)
        HappyAnimal.position.set(90, 50)
        this.addChild(HappyAnimal);
        HappyAnimal.visible = false;
        this.addChild(unHappyAnimal);
        //添加垃圾
        SelectWaste.forEach((item, index) => {
            let RecyclableItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
            RecyclableItem.x = index * (-400);
            RecyclableItem.y = 750;

            RecyclableItem.EventChange = false; //点击事件是否发生
            RecyclableItem.EventChangePosition = 2000; //模拟点击事件的位置
            RecyclableItem.ClassItem = WasterClass[suitable]; //定义垃圾属性
            RecyclableItem.scaleV = 0 //定义垃圾在回收的缩放比例有一定的加速效果

            RecyclableItem.buttonMode = true; //定义点击事件
            RecyclableItem.interactive = true;
            RecyclableItem.on("pointerdown", () => { //点击事件
                RecyclableItem.EventChange = true;
                RecyclableItem.EventChangePosition = RecyclableItem.x //点击位置

            });
            RecyclableSprite.push(RecyclableItem);
            this.addChild(RecyclableItem);

        })
        loop = new PIXI.Application();
        loop.ticker.add(delta => this.gameloop(delta))

    }

    gameloop(delta) {
        //传送带
        track.forEach((item) => {
            item.x >= 1920 && item.position.set(-1920, 700);
            item.x += 10;
        });
        //轮子
        wheelSprite.forEach((item) => {
                item.rotation += 0.1 * delta;
            })
            //定义时间函数
        TimeNum += 1;
        if (TimeNum < 3600) {
            TimeMessage.text = ("00:" + Math.floor(TimeNum / 60));
        } else if (TimeNum == 3600) {
            // alert("游戏结束")
        } else {
            TimeMessage.text = (Math.floor(TimeNum / 3600) + ":" + Math.floor((TimeNum - 3600) / 60))
        }
        //定义动物的层级
        this.setChildIndex(unHappyAnimal, 8); //这句写的不好
        this.setChildIndex(HappyAnimal, 9);

        //精灵循环
        RecyclableSprite.forEach((item, index, arr) => {
            if (item.EventChange) {
                //定义点击事件后发生的事情
                item.scaleV += 1;
                item.anchor.set(0.5, 0.5);
                item.y += -(500 - 100) / 60;
                item.x += -(item.EventChangePosition) / 60;
                item.scale.set(1 - item.scaleV / 60, 1 - item.scaleV / 60);
            } else {
                //定义正常走的事件
                item.x += 10;
            }
            if (item.x >= 400 * 5 || item.y <= 150) {
                if (item.y <= 150) { //精灵到了垃圾箱
                    //改变分数的
                    if (item.ClassItem == WasterClass[suitable]) {
                        ScoreNum += 5;
                        unHappyAnimal.visible = false;
                        HappyAnimal.visible = true;
                    } else {
                        ScoreNum = ScoreNum - 5;
                        unHappyAnimal.visible = true;
                        HappyAnimal.visible = false;
                    }
                    ScoreMessage.text = "X" + ScoreNum;
                    //改变精灵

                    //unHappyAnimal = HappyAnimal;
                    this.addChild(unHappyAnimal);

                }

                this.removeChild(item); //先移除原有的精灵
                let RandomIndex;
                RandomIndex = Math.floor(Math.random() * 20); //创建新的精灵
                item = new PIXI.Sprite(PIXI.loader.resources[Waster[RandomIndex]].texture);

                item.EventChangePosition = 2000; //对创建的精灵定义属性
                item.scaleV = 0;
                item.EventChange = false;
                item.buttonMode = true;
                item.interactive = true;
                item.ClassItem = WasterClass[Math.floor(RandomIndex / 5)];
                item.on("pointerdown", () => { //定义精灵事件
                    item.EventChange = true;
                    item.EventChangePosition = item.x; //消失的位置
                })

                arr[index] = item //替换原有的精灵
                item.position.set(item.EventChangePosition - 2400, 750); //给精灵添加到位置
                this.addChild(item) //把精灵添加到舞台
            }

        });
    }
    BtnBackNormalEvent() {
        this.gameloop = null;
        SceneManager.run("EasyGameSelectPage");

        // SelectWaste = null;

        // RecyclableSprite = null;
        // loop = null;
        // wheel = null;
        // wheelSprite = null;
        // track = null;

        // Alarm = null;
        // TimeMessage = null;
        // TimeNum = 0,
        //     Recyclablelitter = null;
        // RecyclablelitterCap = null;

    }
}
export default GameMain