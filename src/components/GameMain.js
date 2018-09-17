import * as PIXI from 'pixi.js'
//import * as Tink from '../lib/tink.js'
let bg, Scorebg, ScoreMessage, ScoreNum = 0,
    Timebg, TimeMessage, TimeNum = 0,
    unHappyAnimal, HappyAnimal,
    track = [],
    RecyclableWaste = ['paper', 'cloth', 'glass', 'plastics', 'metal'],
    KitchenWaste = ['fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells'],
    HazardousWaste = ['medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'],
    Waster = ['paper', 'cloth', 'glass', 'plastics', 'metal',
        'fruitPeels', 'bones', 'vegetableLeaves', 'leftovers', 'eggshells',
        'medicines', 'batteries', 'thermometers', 'lightBulbs', 'oilPaints'
    ],
    WasterClass = ['Recyclable', 'Kitchen', 'Hazardous'],
    RecyclableSprite = [],
    loop;

let wheel;
class GameMain extends PIXI.Container {
    constructor() {
        super();
        this.on('added', this.addedToStage, this);
    }
    addedToStage() {
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
        //轮子背景图

        for (let wheelNum = 0; wheelNum <= 50; wheelNum++) {
            wheel = new PIXI.Sprite(PIXI.loader.resources['wheel_png'].texture);
            wheel.position.set(wheelNum * 46, 700);
            this.addChild(wheel);
        }

        //时间背景图片
        Timebg = new PIXI.Sprite(PIXI.loader.resources['time_png'].texture);
        Timebg.position.set(1300, 0);
        Timebg.scale.set(0.5, 0.5);
        this.addChild(Timebg);
        //时间
        TimeMessage = new PIXI.Text("00:00", ScoreStyle);
        TimeMessage.position.set(1330, 50);
        this.addChild(TimeMessage);



        //分数背景图片
        Scorebg = new PIXI.Sprite(PIXI.loader.resources['score_png'].texture);
        Scorebg.position.set(1500, 0);
        Scorebg.scale.set(0.5, 0.5);
        this.addChild(Scorebg);
        //在分数背景图下写分数
        ScoreMessage = new PIXI.Text("X" + ScoreNum, ScoreStyle)
        ScoreMessage.position.set(1530, 50)
        this.addChild(ScoreMessage);
        //小动物
        unHappyAnimal = new PIXI.Sprite(PIXI.loader.resources['unHappy_jpg'].texture);
        unHappyAnimal.scale.set(0.1, 0.1);
        unHappyAnimal.position.set(90, 100);
        HappyAnimal = new PIXI.Sprite(PIXI.loader.resources['Happy_jpg'].texture);
        HappyAnimal.scale.set(0.2, 0.2)
        HappyAnimal.position.set(90, 100)
        this.addChild(HappyAnimal);
        HappyAnimal.visible = false;
        this.addChild(unHappyAnimal);
        //传送带
        for (let i = 0; i < 2; i++) {
            let track0 = new PIXI.Sprite(PIXI.loader.resources['track_png'].texture);
            track0.position.set(0 + i * (-2000), 780);
            track0.scale.set(8, 3);
            track.push(track0);
            this.addChild(track0);
        }
        //垃圾箱
        let Recyclablelitter = new PIXI.Sprite(PIXI.loader.resources["RecyclableLitter"].texture);
        Recyclablelitter.y = 100;
        Recyclablelitter.buttonMode = true;
        Recyclablelitter.interactive = true;
        Recyclablelitter.on("pointerover", onButtonOver);

        function onButtonOver() {

        }
        this.addChild(Recyclablelitter);

        //添加垃圾
        RecyclableWaste.forEach((item, index) => {
            let RecyclableItem = new PIXI.Sprite(PIXI.loader.resources[item].texture);
            RecyclableItem.x = index * (-400);
            RecyclableItem.y = 780;

            console.log(RecyclableItem.x);

            RecyclableItem.EventChange = false; //点击事件是否发生
            RecyclableItem.EventChangePosition = 2000; //模拟点击事件的位置
            RecyclableItem.ClassItem = WasterClass[0]; //定义垃圾属性
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
        track.forEach((item) => {
            item.x >= 2000 && item.position.set(-2000, 780);
            item.x += 10;
        });
        //精灵循环
        RecyclableSprite.forEach((item, index, arr) => {
            if (item.EventChange) {
                //定义点击事件后发生的事情
                item.scaleV += 1;
                item.y += -(780 - 100) / 60;
                item.x += -(item.EventChangePosition) / 60;
                item.scale.set(1 - item.scaleV / 60, 1 - item.scaleV / 60);
            } else {
                //定义正常走的事件
                item.x += 10;
            }
            if (item.x >= 400 * 5 || item.y <= 150) {
                if (item.y <= 150) { //精灵到了垃圾箱
                    //改变分数的
                    if (item.ClassItem == WasterClass[0]) {
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
                RandomIndex = Math.floor(Math.random() * 15); //创建新的精灵
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
                item.position.set(item.EventChangePosition - 2400, 780); //给精灵添加到位置

                this.addChild(item) //把精灵添加到舞台
            }

        });
    }
    InputSprite(item, index, arr) { //先不要封装  有点太早了

        this.removeChild(item); //这有个变量
        let RandomIndex;
        RandomIndex = Math.floor(Math.random() * 5);
        item = new PIXI.Sprite(PIXI.loader.resources[RecyclableWaste[RandomIndex]].texture);
        item.EventChangePosition = 2000;
        item.EventChange = false;
        item.buttonMode = true;
        item.interactive = true;

        item.on("pointerdown", () => {
            item.EventChange = true;
            item.EventChangePosition = item.x; //消失的位置
        })

        arr[index] = item //这有两个变量
        item.position.set(item.EventChangePosition - 2400, 780);

        this.addChild(item)
    }

}
export default GameMain;