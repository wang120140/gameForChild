import * as PIXI from 'pixi.js'

function created({
    $this = self,
    $name = {},
    $alias,
    $x = 0,
    $y = 0,
    $anchor = 0,
    $scale = 1,
    $pivotY = false,
    $visible = true,
    $interactive = false,
    $buttonMode = false,
    $addChild = true

} = {}) {
    $name = new PIXI.Sprite(PIXI.loader.resources[$alias].texture); //创建精灵
    $name.position.set($x, $y);
    $name.visible = $visible;
    $name.interactive = $interactive;
    $name.buttonMode = $buttonMode;
    $name.scale.set($scale);
    $name.anchor.set($anchor);
    $pivotY && ($name.pivot.y = $name.height);
    $addChild && $this.addChild($name)
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
    $fill = "#84653A"
} = {}) {
    $name = new PIXI.TextStyle({
        fontFamily: $fontFamily,
        fontSize: $fontSize,
        fill: $fill,
    })
    return $name
}
class BackDialog {
    constructor(_this) {
        //返回按钮弹窗
        this.pop = created({
            $this: _this,
            $alias: 'pop_png',
            $x: 400,
            $y: 100,
            //$interactive: true,
            $addChild: false,
        })
        this.yesBtn = created({
            $this: _this,
            $alias: 'yesBtn_0_png',
            $x: 600,
            $y: 700,
            $interactive: true,
            $buttonMode: true,
            $addChild: false,
        })
        this.noBtn = created({
                $this: _this,
                $alias: 'noBtn_0_png',
                $x: 1200,
                $y: 700,
                $interactive: true,
                $buttonMode: true,
                $addChild: false
            })
            //时间到弹窗
        this.timePop = created({
            $this: _this,
            $alias: 'Timeout_png',
            $x: 300,
            $y: 400,
            $addChild: false
        })
        this.naoZPop = created({
                $this: _this,
                $alias: 'alarmclock_png',
                $x: 830,
                $y: 200,
                $addChild: false
            })
            //总结弹窗
        this.popSummary = created({
            $this: _this,
            $alias: 'endPop_png',
            $x: 500,
            $y: 200,
            $addChild: false
        })
        this.success = created({
            $this: _this,
            $alias: 'success_png',
            $x: 600,
            $y: 100,
            $addChild: false
        })
        this.fhBtn = created({
            $this: _this,
            $alias: 'backBtn_0_png',
            $x: 650,
            $y: 700,
            $interactive: true,
            $buttonMode: true,
            $addChild: false
        })
        this.againBtn = created({
            $this: _this,
            $alias: 'againBtn_0',
            $x: 1100,
            $y: 700,
            $interactive: true,
            $buttonMode: true,
            $addChild: false
        })
        this.graphics = new PIXI.Graphics()
        this.graphics.beginFill(0x0000).drawRect(0, 0, 1920, 1080).endFill()
        this.graphics.alpha = 0.2;
    }
}
class PlayGameBasePage {
    constructor({
        _this = self,
    }) {
        this.bg = created({
            $this: _this,
            $alias: 'bggame_png'
        })
        this.house = created({
            $this: _this,
            $x: 1450,
            $y: 100,
            $alias: 'house_png',
        })
        this.score = created({
            $this: _this,
            $alias: 'score_png',
            $x: 1000,
            $y: 40,
        })
        this.flower = created({
            $this: _this,
            $alias: "flower_png",
            $x: 1500,
            $y: 95
        })
        this.alarm = created({
            $this: _this,
            $alias: "alarm_png",
            $x: 1050,
            $y: 95
        })
        this.BtnBackNormal = created({
            $this: _this,
            $alias: "BtnBackNormal_png",
            $x: 100,
            $y: 70,
            $interactive: true,
            $buttonMode: true
        })
        this.BtnBackClick = created({
            $this: _this,
            $alias: "BtnBackClick_png",
            $x: 100,
            $y: 70,
            $visible: false,
            $interactive: true,
            $buttonMode: true
        })

    }
    trackBorn() {

    }
}
export {
    created,
    createdText,
    createdStyle,
    BackDialog,
    PlayGameBasePage,
}
//总体说明
//垃圾：Rubbish
//箱子 Box
//盖子 Cap
//名字 Name
//总和数组 SumArr