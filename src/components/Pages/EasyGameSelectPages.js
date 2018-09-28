import * as PIXI from 'pixi.js'
import {
    SceneManager,
    Garbage
} from "@/lib/EasyPIXI.js";
import {
    created
} from "./Common.js"
export default class EasyGameSelectPages extends PIXI.Container {
    constructor() {
        super();
        this.bg;
        this.BtnBackNormal;
        this.RubbishBoxNameSumArr = ["RecyclableSelect_png", "KitchenSelect_png", "HarmfulSelect_png", "OtherSelect_png"]
        this.RubbishBoxSpriteSumArr = [];
        this.name = "Rubbish";
        this.Arrow;
        this.on("added", this.addedStage, this);
    }
    addedStage() {
        let self = this;
        (() => {
            this.RubbishBoxSpriteSumArr = [];
        })()
        //背景图
        created({
                $this: self,
                $name: self.bg,
                $alias: "bggame_png"
            })
            //返回按钮
        this.BtnBackNormal = created({
            $this: self,
            $name: self.BtnBackNormal,
            $alias: "BtnBackNormal_png",
            $x: 100,
            $y: 70,
            $interactive: true,
            $buttonMode: true,
        })
        this.BtnBackNormal.on("pointertap", this.BtnBackNormalEvent)
        this.RubbishBoxNameSumArr.forEach((item, index) => {
            let RubbishBoxItem = created({
                $this: self,
                $name: self.name,
                $alias: item,
                $x: 500 * index,
                $y: 500,
                $interactive: true,
                $buttonMode: true,
            })
            this.RubbishBoxSpriteSumArr.push(RubbishBoxItem);
        })
        this.RubbishBoxSpriteSumArr.forEach((item, index) => {
                item.on("pointertap", () => {
                    self.Arrow.position.set(100 + 500 * index, 300);
                })
            })
            //箭头
        this.Arrow = created({
            $this: self,
            $name: self.Arrow,
            $alias: "Arrow_png",
            $x: 100,
            $y: 300,
            $interactive: true,
            $buttonMode: true,
        })
        this.Arrow.on("pointertap", this.ArrowEvent);
    }
    BtnBackNormalEvent() {
        SceneManager.run("HomePages")
    }
    ArrowEvent = () => {
        Garbage.clearGarBage("position");
        Garbage.setGarBage('position', this.Arrow.position.x);
        SceneManager.run("EasyGameIntroPages");
    }
}