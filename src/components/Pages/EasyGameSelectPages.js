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
        this.RubbishBoxNameSumArr = ["RecyclableSelect_png", "KitchenSelect_png", "HarmfulSelect_png", "OtherSelect_png"]
        this.Arrow;
        this.BtnBackClick;
        this.on("added", this.addedStage, this);
    }
    addedStage() {
        let self = this;

        PIXI.sound.play("RubbishSecletHome")
            //PIXI.sound.init("RubbishSecletHome");
            //背景图
        created({
                $this: self,
                $alias: "bggame_png"
            })
            //返回按钮
        created({
                $this: self,
                $alias: "BtnBackNormal_png",
                $x: 100,
                $y: 70,
                $interactive: true,
                $buttonMode: true,
            }).on("pointerdown", () => {
                this.BtnBackClick.visible = true;
            })
            //返回按钮事件
        this.BtnBackClick = created({
                $this: self,
                $alias: "BtnBackClick_png",
                $x: 100,
                $y: 70,
                $visible: false,
                $interactive: true,
                $buttonMode: true,
            }).on("pointerup", () => {
                PIXI.sound.remove("RubbishSecletHome")
                    //PIXI.sound.close()
                SceneManager.run("HomePages")
            }).on("pointerout", () => {
                this.BtnBackClick.visible = false;
            })
            //垃圾箱
        this.RubbishBoxNameSumArr.forEach((item, index) => {
                created({
                    $this: self,
                    $alias: item,
                    $x: 500 * index,
                    $y: 500,
                    $interactive: true,
                    $buttonMode: true,
                }).on("pointertap", () => {
                    self.Arrow.position.set(100 + 500 * index, 300);
                })
            })
            //箭头
        this.Arrow = created({
            $this: self,
            $alias: "Arrow_png",
            $x: 100,
            $y: 300,
            $interactive: true,
            $buttonMode: true,
        }).on("pointertap", () => {
            Garbage.clearGarBage("position");
            Garbage.setGarBage('position', this.Arrow.position.x);
            SceneManager.run("EasyGameIntroPages");
        });
    }
}