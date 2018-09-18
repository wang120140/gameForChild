import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
let bg, BtnBackNormal;
let RecyclableSelect, KitchenSelect, HarmfulSelect, OtherSelect, Arrow;
class EasyGameSelectPage extends PIXI.Container {
    constructor() {
        super();
        this.on("added", this.addedStage, this);
    }
    addedStage() {
        //背景图
        bg = new PIXI.Sprite(PIXI.loader.resources['bggame_png'].texture);
        this.addChild(bg);
        //返回按钮
        BtnBackNormal = new PIXI.Sprite(PIXI.loader.resources["BtnBackNormal_png"].texture);
        BtnBackNormal.position.set(100, 70);

        BtnBackNormal.interactive = true;
        BtnBackNormal.buttonMode = true;
        BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.addChild(BtnBackNormal);
        //可循环的垃圾箱
        RecyclableSelect = new PIXI.Sprite(PIXI.loader.resources["RecyclableSelect_png"].texture);
        RecyclableSelect.position.set(0, 500);

        RecyclableSelect.interactive = true;
        RecyclableSelect.buttonMode = true;
        RecyclableSelect.on("pointertap", this.RecyclableSelectEvent)

        this.addChild(RecyclableSelect);
        //厨房的垃圾箱
        KitchenSelect = new PIXI.Sprite(PIXI.loader.resources["KitchenSelect_png"].texture);
        KitchenSelect.position.set(500, 500);

        KitchenSelect.interactive = true;
        KitchenSelect.buttonMode = true;
        KitchenSelect.on("pointertap", this.KitchenSelectEvent);

        this.addChild(KitchenSelect);
        //有害的垃圾箱
        HarmfulSelect = new PIXI.Sprite(PIXI.loader.resources["HarmfulSelect_png"].texture);
        HarmfulSelect.position.set(1000, 500);

        HarmfulSelect.interactive = true;
        HarmfulSelect.buttonMode = true;
        HarmfulSelect.on("pointertap", this.HarmfulSelectEveent)
        this.addChild(HarmfulSelect);
        //其他的垃圾箱
        OtherSelect = new PIXI.Sprite(PIXI.loader.resources["OtherSelect_png"].texture);
        OtherSelect.position.set(1500, 500);

        OtherSelect.interactive = true;
        OtherSelect.buttonMode = true;
        OtherSelect.on("pointertap", this.OtherSelectEvent);

        this.addChild(OtherSelect);
        //箭头
        Arrow = new PIXI.Sprite(PIXI.loader.resources["Arrow_png"].texture);
        Arrow.position.set(100, 300)
        Arrow.interactive = true;
        Arrow.buttonMode = true;
        Arrow.on("pointertap", this.ArrowEvent);
        this.addChild(Arrow);
    }
    BtnBackNormalEvent() {
        SceneManager.run("homePage")
    }
    RecyclableSelectEvent() {
        Arrow.position.set(100, 300);

    }
    KitchenSelectEvent() {
        Arrow.position.set(600, 300);
    }
    HarmfulSelectEveent() {
        Arrow.position.set(1100, 300);
    }
    OtherSelectEvent() {
        Arrow.position.set(1600, 300);
    }
    ArrowEvent() {
        console.log(22)
        console.log(Arrow.position.x);
        Garbage.clearGarBage("position");
        Garbage.setGarBage('position', Arrow.position.x);
        SceneManager.run("EasyGameIntroPage");


    }
}
export default EasyGameSelectPage;