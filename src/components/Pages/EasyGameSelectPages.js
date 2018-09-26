import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";

export default class EasyGameSelectPages extends PIXI.Container {
    constructor() {
        super();
        this.bg;
        this.BtnBackNormal;
        this.RecyclableSelect;
        this.KitchenSelect;
        this.HarmfulSelect;
        this.OtherSelect;
        this.Arrow = 0;
        this.on("added", this.addedStage, this);
    }
    addedStage() {
        //背景图
        this.bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(this.bg);
        //返回按钮
        this.BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        this.BtnBackNormal.position.set(100, 70);

        this.BtnBackNormal.interactive = true;
        this.BtnBackNormal.buttonMode = true;
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(this.BtnBackNormal);
        //可循环的垃圾箱
        this.RecyclableSelect = new PIXI.Sprite(PIXI.loader.resources["RecyclableSelect_png"].texture);
        this.RecyclableSelect.position.set(0, 500);

        this.RecyclableSelect.interactive = true;
        this.RecyclableSelect.buttonMode = true;
        this.RecyclableSelect.on("pointertap", this.RecyclableSelectEvent)

        this.addChild(this.RecyclableSelect);
        //厨房的垃圾箱
        this.KitchenSelect = new PIXI.Sprite(PIXI.loader.resources["KitchenSelect_png"].texture);
        this.KitchenSelect.position.set(500, 500);

        this.KitchenSelect.interactive = true;
        this.KitchenSelect.buttonMode = true;
        this.KitchenSelect.on("pointertap", this.KitchenSelectEvent);

        this.addChild(this.KitchenSelect);
        //有害的垃圾箱
        this.HarmfulSelect = new PIXI.Sprite(PIXI.loader.resources["HarmfulSelect_png"].texture);
        this.HarmfulSelect.position.set(1000, 500);

        this.HarmfulSelect.interactive = true;
        this.HarmfulSelect.buttonMode = true;
        this.HarmfulSelect.on("pointertap", this.HarmfulSelectEveent)
        this.addChild(this.HarmfulSelect);
        //其他的垃圾箱
        this.OtherSelect = new PIXI.Sprite(PIXI.loader.resources["OtherSelect_png"].texture);
        this.OtherSelect.position.set(1500, 500);

        this.OtherSelect.interactive = true;
        this.OtherSelect.buttonMode = true;
        this.OtherSelect.on("pointertap", this.OtherSelectEvent);

        this.addChild(this.OtherSelect);
        //箭头
        this.Arrow = new PIXI.Sprite(PIXI.loader.resources["Arrow_png"].texture);
        this.Arrow.position.set(100, 300)
        this.Arrow.interactive = true;
        this.Arrow.buttonMode = true;
        this.Arrow.on("pointertap", this.ArrowEvent);
        this.addChild(this.Arrow);
    }
    BtnBackNormalEvent() {
        SceneManager.run("HomePages")
    }
    RecyclableSelectEvent = () => {

        this.Arrow.position.set(100, 300);

    }
    KitchenSelectEvent = () => {
        this.Arrow.position.set(600, 300);
    }
    HarmfulSelectEveent = () => {
        this.Arrow.position.set(1100, 300);
    }
    OtherSelectEvent = () => {
        this.Arrow.position.set(1600, 300);
    }
    ArrowEvent = () => {

        Garbage.clearGarBage("position");
        Garbage.setGarBage('position', this.Arrow.position.x);
        SceneManager.run("EasyGameIntroPages");


    }
}