import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    createdSprite,
} from "./Common.js";
import 'pixi-spine';
import EasyGameSelectPages from './EasyGameSelectPages.js';
import HardGamePlayingPages from './HardGamePlayingPages.js';
export default class HomePages extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addedHomePageStage, this);
        this.vueInstance = null;
        this.btnEasyClickNormal = null;
        this.btnEasyClick = null;
        this.BtnHardClickNormal = null;
        this.BtnHardClick = null;
        this.soundBg = null;
        this.closeButtonClick = null;
        this.Leaf_spine = null;
    }
    destroy() {
        if (this.mainContainer) {
            this.mainContainer.destroy();
            this.mainContainer = null;
        }
    }
    addedHomePageStage() {
        (() => {
            this.vueInstance = null;
            this.btnEasyClick = null;
            this.BtnHardClick = null;
            this.soundBg = null;
            this.closeButtonClick = null;
            this.Leaf_spine = null;
        })();
        let self = this;
        this.mainContainer = new PIXI.Container();
        this.addChild(this.mainContainer)
            //消除背景音乐
        this.soundBg = PIXI.sound.play("RubbishSecletHome", {
            start: Garbage.getGarBage("SoundProgress"),
            loop: true,
        })
        this.vueInstance = Garbage.getGarBage('vueInstance');
        //背景图
        this.HomeBg = createdSprite({
            $this: self,
            $alias: "HomeBg_png",
            $scale: 2,
        });
        //风车动画
        this.windmill_spine = new PIXI.spine.Spine(PIXI.loader.resources['windmill_spine'].spineData);
        this.windmill_spine.y = 480;
        this.windmill_spine.x = 1700;
        this.windmill_spine.state.setAnimation(0, 'animation', true);
        this.addChild(this.windmill_spine);
        //叶子位置
        this.Leaf_spine = new PIXI.spine.Spine(PIXI.loader.resources["Leaf_spine"].spineData);
        this.Leaf_spine.x = 1910;
        this.Leaf_spine.y = 20;
        this.Leaf_spine.state.setAnimation(0, "animation", true);
        this.addChild(this.Leaf_spine);
        // 动画房子以及小动物
        this.startScreen_spine = new PIXI.spine.Spine(PIXI.loader.resources['StartScreen_spine'].spineData);
        this.startScreen_spine.y = 510;
        this.startScreen_spine.x = 1000;
        this.startScreen_spine.state.setAnimation(0, 'animation', true);
        this.addChild(this.startScreen_spine);
        //关闭按钮    有一个事件（关闭按钮切换关闭按钮图片...）A01
        createdSprite({
            $this: self,
            $alias: "CloseButtonNormal_png",
            $x: 1666,
            $y: 47,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.closeButtonClick.visible = true;
        });
        // 有一个事件（关闭按钮切换至垃圾收集页面...）A02
        this.closeButtonClick = createdSprite({
            $this: self,
            $alias: "CloseButtonLight_png",
            $x: 1666,
            $y: 47,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", () => {}).on("pointerout", () => {
            this.closeButtonClick.visible = false;
        });
        //按钮easy（Easy按钮事件切换至图片转换...）A03
        this.btnEasyClickNormal = createdSprite({
            $this: self,
            $alias: "btnEasy_png",
            $x: 444,
            $y: 848,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", this.btnEasyClickNormalEvent = () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.btnEasyClick.visible = true;
        });
        //按钮Easy (Easy按钮事件转换屏幕事件...) A04
        this.btnEasyClick = createdSprite({
            $this: self,
            $alias: "btnEasyClick_png",
            $x: 444,
            $y: 848,
            $visible: false,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerup", this.btnEasyClickEventPointerup = () => {
            //跳转之前要干的事情：
            //1.声音暂停
            //2.清除声音
            //3.发送声音播放进度
            //4.清除所有的事件绑定
            //5.清除所有变量
            //6.清除所有精灵舞台
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            (() => {
                this.clearEvent();
                this.BtnHardClick = null;
                this.soundBg = null;
                this.closeButtonClick = null;
                this.Leaf_spine = null;
                this.visible = false; //可以解决问题1    
                this.parent.removeChildren();
            })();
            SceneManager.run(new EasyGameSelectPages());
            //跳转选择页面
        }).on("pointerout", this.btnEasyClickEventPointerout = () => {
            this.btnEasyClick.visible = false;
        });
        //按钮hard （Hard按钮事件切换图片...）A05
        this.BtnHardClickNormal = createdSprite({
            $this: self,
            $alias: "btnHard_png",
            $x: 1070,
            $y: 848,
            $interactive: true,
            $buttonMode: true,
        }).on("pointerdown", this.BtnHardClickNormalEvent = () => {
            PIXI.sound.play("ClickSound") //添加点击效果音效
            this.BtnHardClick.visible = true;
        });
        //按钮Hard （Hard按钮事件装Hard场景...）A06

        this.BtnHardClick = createdSprite({
            $this: self,
            $alias: "btnHardClick_png",
            $x: 1070,
            $y: 848,
            $interactive: true,
            $buttonMode: true,
            $visible: false,
        }).on("pointerup", this.BtnHardClickEventPointerup = () => {
            this.vueInstance.ControlHardDialog = true;
            PIXI.sound.pause("RubbishSecletHome"); //声音暂停...
            Garbage.clearGarBage("SoundProgress"); //清除声音数据
            Garbage.setGarBage("SoundProgress", this.soundBg._duration * this.soundBg.progress); //发送声音数据
            Garbage.clearGarBage("startPlayHardGame"); //控制hard页面数据
            Garbage.setGarBage("startPlayHardGame", false);
            this.clearEvent(); //移除所有事件关联的对象
            (() => { //清除变量...
                this.btnEasyClick = null;
                this.soundBg = null;
                this.closeButtonClick = null;
                this.Leaf_spine = null;
            })();
            this.parent.removeChildren(); //清除所有物品的事件
            SceneManager.run(new HardGamePlayingPages());
        }).on("pointerout", this.BtnHardClickEventPointerout = () => {
            this.BtnHardClick.visible = false;
        })
    }
    clearEvent() {
        this.btnEasyClickNormal.off("pointerdown", this.btnEasyClickNormalEvent); //移除容易按钮事件
        this.btnEasyClick.off("pointerup", this.btnEasyClickEventPointerup);
        this.btnEasyClick.off("pointerout", this.btnEasyClickEventPointerout);

        this.BtnHardClickNormal.off("pointerdown", this.BtnHardClickNormalEvent); //移除困难按钮事件
        this.BtnHardClick.off("pointerup", this.BtnHardClickEventPointerup);
        this.BtnHardClick.off("pointerout", this.btnEasyClickEventPointerout);
        this.off("added", this.addedHomePageStage, this); //移除整体对象的事件
    }
}