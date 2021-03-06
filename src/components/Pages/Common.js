import * as PIXI from 'pixi.js'

function createdSprite({
    $this = self,
    $name = {},
    $alias,
    $x = 0,
    $y = 0,
    $anchor = 0,
    $scale = 1,
    $pivotY = false,
    $pivotX = false,
    $visible = true,
    $interactive = false,
    $buttonMode = false,
    $alpha = 1,
    $addChild = true

} = {}) {
    $name = new PIXI.Sprite(PIXI.loader.resources[$alias].texture); //创建精灵
    $name.position.set($x, $y);
    $name.visible = $visible;
    $name.interactive = $interactive;
    $name.buttonMode = $buttonMode;
    $name.scale.set($scale);
    $name.anchor.set($anchor);
    $name.alpha = $alpha;
    $pivotX && ($name.pivot.x = ($name.width) / 2);
    $pivotY && ($name.pivot.y = $name.height);
    $addChild && $this.addChild($name);
    return $name;
}

function createdText({
    $this = self,
    $name = {},
    $text = "测试使用",
    $x = 0,
    $y = 0,
    $style = {},
    $addChild = true,
} = {}) {
    $name = new PIXI.Text($text, $style);
    $name.x = $x;
    $name.y = $y;
    $addChild && $this.addChild($name);
    return $name
}

function createdStyle({
    $name = {},
    $fontFamily = "Arial",
    $fontSize = 35,
    $fill = "#84653A",
    $lineHeight = 58,
    $fontWeight = "normal"
} = {}) {
    $name = new PIXI.TextStyle({
        fontFamily: $fontFamily,
        fontSize: $fontSize,
        fill: $fill,
        lineHeight: $lineHeight,
        fontWeight: $fontWeight,
    })
    return $name
}

class BackDialog {
    constructor(_this) {
        //返回按钮弹窗
        this.pop = createdSprite({
            $this: _this,
            $alias: 'DialogPause_png',
            $x: 459,
            $y: 260,
            //$interactive: true,
            $addChild: false,
        })
        this.yesBtn = createdSprite({
            $this: _this,
            $alias: 'yesBtn_0_png',
            $x: 975,
            $y: 680,
            $interactive: true,
            $buttonMode: true,
            $addChild: false,
        })
        this.noBtn = createdSprite({
            $this: _this,
            $alias: 'noBtn_0_png',
            $x: 594,
            $y: 680,
            $interactive: true,
            $buttonMode: true,
            $addChild: false
        });
        //时间到弹窗

        //总结弹窗
        this.popSummary = createdSprite({
            $this: _this,
            $alias: 'endPop_png',
            $x: 500,
            $y: 200,
            $addChild: false
        })
        this.fhBtn = createdSprite({
            $this: _this,
            $alias: 'BtnBackNormal_png',
            $x: 550,
            $y: 700,
            $interactive: true,
            $buttonMode: true,
            $addChild: false
        })
        this.againBtn = createdSprite({
            $this: _this,
            $alias: 'againBtn_0',
            $x: 1050,
            $y: 700,
            $interactive: true,
            $buttonMode: true,
            $addChild: false
        })
        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill()
        this.graphics.alpha = 0.7;
    }
}
class PlayGameBasePage {
    constructor({
        _this = self,
        _alpha = 1,
    }) {
        this.bg = createdSprite({
            $this: _this,
            $scale: 2,
            $alpha: _alpha,
            $alias: 'bggame_png'

        })
        this.score = createdSprite({
                $this: _this,
                $alias: 'score_png',
                $alpha: _alpha,
                $x: 1000,
                $y: 0,
            })
            // this.flower = createdSprite({
            //     $this: _this,
            //     $alias: "flower_png",
            //     $x: 1500,
            //     $y: 95
            // })
            // this.alarm = createdSprite({
            //     $this: _this,
            //     $alias: "alarm_png",
            //     $x: 1050,
            //     $y: 95
            // })
        this.BtnBackNormal = createdSprite({
            $this: _this,
            $alias: "NormalBack_png",
            $x: 65,
            $y: 46,
            $alpha: _alpha,
            $interactive: true,
            $buttonMode: true
        })
        this.BtnBackClick = createdSprite({
            $this: _this,
            $alias: "NormalClickBack",
            $x: 65,
            $y: 46,
            $alpha: _alpha,
            $visible: false,
            $interactive: true,
            $buttonMode: true
        })

    }
}


export {
    createdSprite,
    createdText,
    createdStyle,
    BackDialog,
    PlayGameBasePage,
}