import * as PIXI from 'pixi.js'
//函数说明
//$this: 指向 运行的this环境
//$name : 精灵的名字 也是上一级的this.bianliang
//$alias : 加载资源的别名
//$x: x的位置
//$y: y的位置
//$interactive :是否触发事件
//$buttonMode : 是否显示小手爪
//$addChild :是否添加到舞台
function created({
    $this = self,
    $name = "SpriteName",
    $alias,
    $x = 0,
    $y = 0,
    $anchor = 0,
    $interactive = false,
    $buttonMode = false,
    $addChild = true
} = {}) {
    // console.log(123456789 + '..引入公共函数');
    $name = new PIXI.Sprite(PIXI.loader.resources[$alias].texture); //创建精灵
    $name.position.set($x, $y); //给精灵显示位置
    $name.interactive = $interactive;
    $name.buttonMode = $buttonMode;
    $name.anchor.set($anchor)
    $addChild && $this.addChild($name) //精灵添加到舞台
    return $name; //查找底层运作情况
}
export {
    created
}
//总体说明
//垃圾：Rubbish
//箱子 Box
//盖子 Cap
//名字 Name
//总和数组 SumArr