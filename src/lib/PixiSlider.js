import { TweenMax } from 'gsap'
class PixiSlider extends PIXI.Container {
  constructor() {
    super();
    this.slides = 5;
    this.slidesArr = [];
    this.slideWidth = 200;
    this.slideHeight = 100;
    this.slideOffset = 10;
    this.slideOffsetWidth = null; //所有间隙总宽度;
    this.swiperWidth = 200;
    this.swiperHeight = 400;
    this.slideColorAlpha = 1;

    this.wrapper = null; //滑动区域;
    this.dragMoving = false;
    this.movedOffset = NaN; //移动的偏差值，往左移则负数，往右移则正值，垂直往下为正，反之为负

    this.realIndex = 0; //当前滑动的索引

    this._dragMovedDist = 0; //当前向左或者向右拖动移动的距离
    this._movedPosArr = []; //移动过程中产生的坐标位置;
    this._clickPosition = 0; //点击初次早wrapper上的相对的位置
    this._clickWrapperPosition = 0; //初次点击时wrapper的坐标位置;
    this._wrapperPos_gl = null; //滑动块基于舞台的坐标

    this.slideIsEnd = true;

    this._wrapperTween = null; //动画gsap for wrapper
    this._slideToTween = null; //slideTo的Tween动画
    this._minimalPos = 0;
    this._maxiumPos = 0;

    this.smoothingTween = null; //松开鼠标展现流畅滑动效果时候的TweenMax;
    this.dragTimeDelta = 0; //每次滑动的时候为0，滑动
    this.smoothingMode = true; //为true开启Smoothing模式

    this.gameTicker = new PIXI.ticker.Ticker();


    //回调方法;
    this.callback_pointerUp = function() {

    };
    this.callback_pointerdown = function() {

    }
    this.callback_pointerMove = function() {

    }

    this.swiperDirection = 'horizontal';

    // this.on('added',this.initialGame,this);
  }

  setCallBackPointerUp($callback) {
    this.callback_pointerUp = $callback;
  }
  setCallBackPointerDown($callback) {
    this.callback_pointerdown = $callback;
  }
  callback_pointerMove($callback) {
    this.callback_pointerMove = $callback;
  }
  init() {
    const self = this;
    if (this.swiperDirection == 'horizontal') {
      this.initialHorizontal();
    } else {
      this.initialVertical();
    };
    self.gameTicker.add(() => {
      self.dragTimeDelta++;
    });

  }

  updateAll() {
    if (this.wrapper) {
      this.wrapper.removeListener('pointerdown', this.ver_pointerdown, this);
      this.wrapper.removeListener('pointermove', this.ver_pointermove, this);
      this.wrapper.removeListener('pointerup', this.ver_pointerup, this);
      this.wrapper.removeListener('pointerupoutside', this.ver_pointerup, this);

      this.wrapper.removeListener('pointerdown', this.hor_pointerdown, this);
      this.wrapper.removeListener('pointermove', this.hor_pointermove, this);
      this.wrapper.removeListener('pointerup', this.hor_pointerup, this);
      this.wrapper.removeListener('pointerupoutside', this.hor_pointerup, this);
      this.wrapper.removeChildren();
      this.wrapper.destroy()
      // this.wrapper.removeChildren();
      this.removeChildren();
    }
    this.slides = 5;
    this.slidesArr = [];
    this.slideWidth = 200;
    this.slideHeight = 100;
    this.slideOffset = 10;
    this.slideOffsetWidth = null; //所有间隙总宽度;
    this.swiperWidth = 200;
    this.swiperHeight = 400;
    this.slideColorAlpha = 0;

    this.wrapper = null; //滑动区域;
    this.dragMoving = false;
    this.movedOffset = NaN; //移动的偏差值，往左移则负数，往右移则正值，垂直往下为正，反之为负

    this.realIndex = 0; //当前滑动的索引

    this._dragMovedDist = 0; //当前向左或者向右拖动移动的距离
    this._movedPosArr = []; //移动过程中产生的坐标位置;
    this._clickPosition = 0; //点击初次早wrapper上的相对的位置
    this._clickWrapperPosition = 0; //初次点击时wrapper的坐标位置;
    this._wrapperPos_gl = null; //滑动块基于舞台的坐标

    this.slideIsEnd = true;

    this._wrapperTween = null; //动画gsap for wrapper
    this._slideToTween = null; //slideTo的Tween动画
    this._minimalPos = 0;
    this._maxiumPos = 0;

    this.smoothingTween = null; //松开鼠标展现流畅滑动效果时候的TweenMax;
    this.dragTimeDelta = 0; //每次滑动的时候为0，滑动
    this.smoothingMode = true; //为true开启Smoothing模式
    if (this.gameTicker) {
      this.gameTicker.stop();
      this.gameTicker.destroy();
      this.gameTicker = new PIXI.ticker.Ticker();
    }


  }




  initialVertical() {
    const self = this;
    //设置滑动区域
    self.wrapper = new PIXI.Container();
    self.wrapper.buttonMode = true;
    self.wrapper.interactive = true;
    for (let i = 0; i < this.slides; i++) {
      let slideBar = new PIXI.Container();
      self.slidesArr.push(slideBar);

      let slideContainer = new PIXI.Graphics();
      slideContainer.beginFill(0xff0000, self.slideColorAlpha);
      slideContainer.drawRect(0, 0, self.slideWidth, self.slideHeight);
      slideContainer.endFill();
      slideBar.addChild(slideContainer);


      slideBar.y = i * (self.slideHeight + self.slideOffset);

      self.wrapper.addChild(slideBar);
      self.slideOffsetWidth += self.slideOffset;


    }
    self.slideOffsetWidth -= self.slideOffset; //要减去一个得到间隔距离总数


    let wrapperMask = new PIXI.Graphics();
    wrapperMask.beginFill(0x00ff00);
    wrapperMask.drawRect(0, 0, self.swiperWidth, self.swiperHeight);
    wrapperMask.endFill();

    this._minimalPos = -1 * (self.wrapper.height - self.swiperHeight);
    this._maxiumPos = 0;

    self.wrapper.mask = wrapperMask;
    self.addChild(wrapperMask)
    self.addChild(self.wrapper);


    self.wrapper.on('pointerdown', this.ver_pointerdown, this);
    self.wrapper.on('pointermove', this.ver_pointermove, this);
    self.wrapper.on('pointerup', this.ver_pointerup, this);
    self.wrapper.on('pointerupoutside', this.ver_pointerup, this);

  }
  //设置横屏;
  initialHorizontal() {
    const self = this;
    //设置滑动区域
    self.wrapper = new PIXI.Container();
    self.wrapper.buttonMode = true;
    self.wrapper.interactive = true;
    for (let i = 0; i < this.slides; i++) {
      let slideBar = new PIXI.Container();
      self.slidesArr.push(slideBar);
      let slideContainer = new PIXI.Graphics();
      slideContainer.beginFill(0xff0000, self.slideColorAlpha);
      slideContainer.drawRect(0, 0, self.slideWidth, self.slideHeight);
      slideContainer.endFill();
      slideBar.addChild(slideContainer);
      slideBar.x = i * (self.slideWidth + self.slideOffset);
      self.wrapper.addChild(slideBar);
      self.slideOffsetWidth += self.slideOffset;


    }
    self.slideOffsetWidth -= self.slideOffset; //要减去一个得到间隔距离总数

    this._minimalPos = -1 * (self.wrapper.width - self.swiperWidth);
    this._maxiumPos = 0;


    let wrapperMask = new PIXI.Graphics();
    wrapperMask.beginFill(0x00ff00);
    wrapperMask.drawRect(0, 0, self.swiperWidth, self.swiperHeight);
    wrapperMask.endFill();

    self.wrapper.mask = wrapperMask;
    self.addChild(wrapperMask)
    self.addChild(self.wrapper);

    self.wrapper.on('pointerdown', this.hor_pointerdown, this);
    self.wrapper.on('pointermove', this.hor_pointermove, this);
    self.wrapper.on('pointerup', this.hor_pointerup, this);
    self.wrapper.on('pointerupoutside', this.hor_pointerup, this);
  }
  hor_pointerdown(event) {
    const self = this;
    self.dragMoving = true;
    if (self.smoothingTween) {
      self.smoothingTween.pause();
    }

    //关闭TweenMax;
    if (self._wrapperTween) {
      //TweenMax.killTweensOf(self._wrapperTween)
      self._wrapperTween.pause();
      // console.log( self._wrapperTween.pause)
    }
    if (self._slideToTween) {
      self._slideToTween.pause();
    }


    self._wrapperPos_gl = event.currentTarget.getGlobalPosition({ x: event.currentTarget.x, y: event.currentTarget.y });
    self._dragMovedDist = 0;
    //记录点击初次的位置;
    self._clickPosition = event.data.global.x - self._wrapperPos_gl.x;
    //设置初次wrapper的坐标;
    self._clickWrapperPosition = event.currentTarget.x;
    //触发外部事件;
    self.callback_pointerdown.call(self, {
      movedOffset: self.movedOffset
    });


    self.gameTicker.start();

  }
  hor_pointermove(event) {
    const self = this;
    const currentTarget = event.currentTarget;
    if (self.dragMoving) {

      if (self._movedPosArr.length > 3) {
        self._movedPosArr.shift();
      }
      self._movedPosArr.push(event.data.global.x - self._wrapperPos_gl.x);
      //更新移动的过程距离;
      self._dragMovedDist = self._movedPosArr[self._movedPosArr.length - 1] - self._clickPosition;
      //设置当前wrapper移动
      //let movedX = self._dragMovedDist+self._clickWrapperPosition;
      currentTarget.x = self._dragMovedDist + self._clickWrapperPosition;

      if (currentTarget.x < self._minimalPos) {
        currentTarget.x = self._minimalPos;
      }
      if (currentTarget.x >= 0) {
        currentTarget.x = 0;
      };


      self.dragTimeDelta = 0;


    }
  }
  hor_pointerup(event) {
    const self = this;
    var currentTarget = event.currentTarget;
    var Evt = event;
    self.dragMoving = false;

    self.movedOffset = self._movedPosArr[self._movedPosArr.length - 1] - self._movedPosArr[0];
    let lostPowerX = self.wrapper.x + self._movedPosArr[self._movedPosArr.length - 1] - self._movedPosArr[0] || self.wrapper.x;

    self.callback_pointerUp.call(self, {
      movedOffset: self.movedOffset
    })

    if (self._movedPosArr.length > 0) {
      self._movedPosArr = [];
    };

    self.gameTicker.stop();
    if (self.smoothingMode == true) {
      self.smoothSliding.call(self)
    }


    self.dragTimeDelta = 0;


  }
  slideTo($slideNum = 0, $times = .3) {

    const self = this;
    this.realIndex = $slideNum;

    if (self.swiperDirection == 'horizontal') {
      self._slideToTween = TweenMax.to(self.wrapper, $times, {
        x: -1 * ($slideNum * this.slideWidth),
        onStart: function() {
          self.slideIsEnd = false;
        },
        onComplete: function() {
          self.slideIsEnd = true;
          //  self.movedOffset = NaN;
        }
      });
    } else if (self.swiperDirection == 'vertical') {

    }

  }
  //竖向;
  ver_pointerdown(event) {
    const self = this;
    self.dragMoving = true;

    if (self.smoothingTween) {
      self.smoothingTween.pause();
    }
    //关闭TweenMax;
    if (self._wrapperTween) {
      //TweenMax.killTweensOf(self._wrapperTween)
      self._wrapperTween.pause();

    }
    if (self._slideToTween) {
      self._slideToTween.pause();
    }


    self._wrapperPos_gl = event.currentTarget.getGlobalPosition({ x: event.currentTarget.x, y: event.currentTarget.y });
    self._dragMovedDist = 0;
    //记录点击初次的位置;
    self._clickPosition = event.data.global.y - self._wrapperPos_gl.y;
    //设置初次wrapper的坐标;
    self._clickWrapperPosition = event.currentTarget.y;
    //触发外部事件;
    self.callback_pointerdown.call(self, {
      movedOffset: self.movedOffset
    });

    self.gameTicker.start();

  }
  ver_pointermove(event) {
    const self = this;
    const currentTarget = event.currentTarget;
    if (self.dragMoving) {

      if (self._movedPosArr.length > 3) {
        self._movedPosArr.shift();
      }
      self._movedPosArr.push(event.data.global.y - self._wrapperPos_gl.y);
      //更新移动的过程距离;
      self._dragMovedDist = self._movedPosArr[self._movedPosArr.length - 1] - self._clickPosition;
      //设置当前wrapper移动
      //let movedX = self._dragMovedDist+self._clickWrapperPosition;
      currentTarget.y = self._dragMovedDist + self._clickWrapperPosition;

      if (currentTarget.y < self._minimalPos) {
        currentTarget.y = self._minimalPos;
      }
      if (currentTarget.y >= 0) {
        currentTarget.y = 0;
      }
      self.dragTimeDelta = 0;
    }
  }
  ver_pointerup(event) {
    const self = this;
    var currentTarget = event.currentTarget;
    var Evt = event;
    self.dragMoving = false;

    self.movedOffset = self._movedPosArr[self._movedPosArr.length - 1] - self._movedPosArr[0];
    let lostPowerX = self.wrapper.y + self._movedPosArr[self._movedPosArr.length - 1] - self._movedPosArr[0] || self.wrapper.y;

    self.callback_pointerUp.call(self, {
      movedOffset: self.movedOffset
    })

    if (self._movedPosArr.length > 0) {
      self._movedPosArr = [];
    };
    self.gameTicker.stop();
    if (self.smoothingMode == true) {
      self.smoothSliding.call(self)
    }
    self.dragTimeDelta = 0;

  }


  smoothSliding() {
    const self = this;


    if (self.swiperDirection == 'horizontal' && self.movedOffset) {
      let vec = self.movedOffset > 0 ? '+=' + Math.abs(self.movedOffset) : '-=' + Math.abs(self.movedOffset);
      if (self.dragTimeDelta >= 10) {
        vec = '+=0';
      }
      self.smoothingTween = TweenMax.to(self.wrapper, 1, {
        x: vec,
        onUpdate: function() {
          if (self.wrapper.x < self._minimalPos) {
            self.wrapper.x = self._minimalPos;
            self.smoothingTween.pause();
          }
          if (self.wrapper.x >= 0) {
            self.wrapper.x = 0;
            self.smoothingTween.pause();
          }

        }

      })


    } else if (self.swiperDirection == 'vertical' && self.movedOffset) {
      let vec = self.movedOffset > 0 ? '+=' + Math.abs(self.movedOffset) : '-=' + Math.abs(self.movedOffset);
      if (self.dragTimeDelta >= 10) {
        vec = '+=0';
      }
      self.smoothingTween = TweenMax.to(self.wrapper, 1, {
        y: vec,
        onUpdate: function() {
          if (self.wrapper.y < self._minimalPos) {
            self.wrapper.y = self._minimalPos;
            self.smoothingTween.pause();
          }
          if (self.wrapper.y >= 0) {
            self.wrapper.y = 0;
            self.smoothingTween.pause();
          }
        }

      })
      // console.log('movedOff:',self.movedOffset);
    }
  }

}

export default PixiSlider;
