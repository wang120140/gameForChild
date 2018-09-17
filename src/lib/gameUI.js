import SingleAlpha from "./SingleAlpha.js";
import PIXIScroll from '../lib/PIXIScroll.js'


var PIXIButton = {
  TAP: 'tap'
}

class CardBand extends PIXI.Container {
  m_percentNum = 0;
  m_fontColor = 0x000000;

  constructor($options) {
    super();
    let $cardname = $options.cardName || "cardselect1_png";
    let $progressbg = $options.progressBg || "cardprogressbg1_png";
    let $progresslight= $options.progresslight || "cardprogresslight2_png";
    this.m_fontColor = $options.fontColor ||  0x000000;
    this.m_percentText = new PIXI.Text();

    this.m_band = new PIXI.Sprite(PIXI.loader.resources[$cardname].texture);
    this.m_progressbg = new PIXI.Sprite(PIXI.loader.resources[$progressbg].texture);
    this.m_progresslight = new PIXI.Sprite(PIXI.loader.resources[$progresslight].texture);
    this.m_progressmask = new PIXI.Sprite(PIXI.loader.resources[$progresslight].texture);
    this.on('added', this.addedToStage, this);
    this.on('removed',this.destroyed,this);

  }
  destroyed(){
    if(this.m_band){
      this.m_band.destroy();
      this.m_band = null;
    }
    if(this.m_progressbg){
      this.m_progressbg.destroy();
      this.m_progressbg = null;
    }
    if(this.m_progresslight){
      this.m_progresslight.destroy();
      this.m_progresslight = null;
    }
    if(this.m_progressmask){
      this.m_progressmask.destroy();
      this.m_progressmask = null;
    }
    this.destroy();
  }
  addedToStage() {
    this.m_percentText.text = this.m_percentText+" %";
    this.m_percentText.style.fill = this.m_fontColor;
    this.m_percentText.style.fontSize = 50;
    this.m_percentText.x = 310;
    this.m_percentText.y = 600;

    this.m_progressbg.y = 624+this.m_progressbg.height;
    this.m_progressbg.x = 105;

    this.m_progresslight.y = 624+this.m_progressbg.height+4;
    this.m_progresslight.x = this.m_progressbg.x+4;

    this.m_progressmask.x = 0;
    this.m_progressmask.y = this.m_progressbg.y+4.8;
    this.addChild(this.m_band);
    this.addChild(this.m_progressbg);
    this.addChild(this.m_progresslight);
    this.addChild(this.m_progressmask);
    this.addChild(this.m_percentText)


    this.m_progresslight.mask = this.m_progressmask;

    this.setProgress(this.m_percentNum);
  }
  setProgress($num=0.1){
    this.m_percentNum = $num;
    this.m_percentText.text = $num+"%";
    this.m_progressmask.x = -0.72*this.m_progressmask.width+($num*this.m_progressmask.width);

  }

}


class LoadingBar extends PIXI.Container {
  m_progress = 0;
  constructor($loadinglight, $loadingbg, $maskerRectangle = { x: 0, y: 0, width: 200, height: 40 }) {
    super();



    this.loadingMasker = new PIXI.Graphics();
    this.loadingMasker.beginFill(0xFF0000).drawRect($maskerRectangle.x, $maskerRectangle.y, $maskerRectangle.width, $maskerRectangle.height).endFill();

    this.loadingBg = new PIXI.Sprite(PIXI.loader.resources[$loadingbg].texture);
    this.loadingBar = new PIXI.Sprite(PIXI.loader.resources[$loadinglight].texture);


    this.addChild(this.loadingBg);
    this.addChild(this.loadingBar);
    this.addChild(this.loadingMasker);
    this.loadingBar.mask = this.loadingMasker;

    this.on('removed', this.destroyed, this);
  }
  destroyed() {
    this.loadingBar.destroy();
    this.loadingBg.destroy();

  }
  set progress($percent) {
    if (this.loadingMasker) {
      this.m_progress = $percent;
      this.loadingMasker.width = $percent * this.loadingBg.width;
    }
  }
  get progress() {
    return this.m_progress;
  }


}

class ButtonUI extends PIXI.Container {
  static useAtlas = false;
  static getTextureAtlas() {
    ButtonUI.atlasJson = PIXI.loader.resources[$atlasJson].textures;
  };
  constructor($options) {
    super();
    this.skinName = $options.skinName || null;
    this.atlasUrl = $options.atlasUrl || null;
    this.buttonDownStatSkinName = null;
    // this.buttonBody = null;
    this._toggleStat = 'status1';

    console.log(PIXI.loader.resources)


    if (this.atlasUrl) {
       console.log('loaderres:',PIXI.loader.resources)
       this.buttonBody = new PIXI.Sprite(PIXI.loader.resources[this.atlasUrl].textures[this.skinName]);
      
    } else {
      console.log('loaderres:',PIXI.loader.resources)
       this.buttonBody = new PIXI.Sprite(PIXI.loader.resources[this.skinName].texture);

    }

    this.addChild(this.buttonBody);
  }


  addedToStage() {





  }
  set toggleStatus($status) {
    this._toggleStat = $status;

  }
  get toggleStatus() {
    return this._toggleStat;

  }
  set cursor($b) {
    if (this.buttonBody) {
      this.buttonBody.buttonMode = $b;
    }
  }

  set touchEnabled($b) {
    if (this.buttonBody) {
      this.buttonBody.interactive = $b;
    }
  }
  get touchEnabled() {
    if (this.buttonBody) {
      return this.buttonBody.interactive;
    }
  }

  addClickButton($options) {
    var $handlers = $options.handlers;
    var $downSkin = $options.skinName;
    var atlasUrl = $options.atlasUrl || null;
    if (this.buttonBody) {
      this.buttonBody.on('pointerdown', ($event) => {
        if (atlasUrl) {
          this.buttonBody.texture = PIXI.loader.resources[atlasUrl].textures[$downSkin];
        } else {
          this.buttonBody.texture = PIXI.Texture.from($downSkin);
          console.log('???')
        }
        if ($handlers.down) {
          $handlers.down.call(this, $event);
        }
      });
      this.buttonBody.on('pointerup', ($event) => {
           if (this.atlasUrl) {
          this.buttonBody.texture = PIXI.loader.resources[this.atlasUrl].textures[this.skinName];
        } else {
          this.buttonBody.texture = PIXI.Texture.from(this.skinName);
        }

        if ($handlers.up) {
          $handlers.up.call(this, $event);

        }
      });
      this.buttonBody.on('pointerupoutside', ($event) => {
        if (this.atlasUrl) {
          this.buttonBody.texture = PIXI.loader.resources[this.atlasUrl].textures[this.skinName];
        } else {
          this.buttonBody.texture = PIXI.Texture.from(this.skinName);
        }
        if ($handlers.up) {
          $handlers.up.call(this, $event);

        }
      });
      this.buttonBody.on('pointertap', ($event) => {
        if ($handlers.tap) {
          $handlers.tap.call(this, $event);

        }
      });
    }
  }




  addToggleButton() {}
  addEventListner($eventType, $listner) {

    if (this.buttonBody) {
      this.buttonBody.on($eventType, $listner);
    }


  }
  removeEventListener($eventType, $listner) {
    if (this.buttonBody) {
      this.buttonBody.off($eventType, $listner);
    }
  }
  removeAllEventListener() {
    if (this.buttonBody) {
      this.buttonBody.removeAllListeners();
    }
  }
}



// class ButtonUI extends PIXI.Container {
//   constructor($skin) {
//     super();
//     this.skinName = $skin;
//     this.buttonBody = null;
//     this.buttonStat = "stoping";
//     this._touchEnabled = true;

//     this.status = 'status1';
//     this._buttonEnabled = true;

//     this.toggleClick = false;
//     this._tapHandler = function() {};
//     this._toggleTapHandler1 = function() {};
//     this._toggleTapHandler2 = function() {}
//     this.on('added', this.addedToStage, this);
//   }
//   set touchEnabled(_b) {
//     this._touchEnabled = _b;
//   }
//   get touchEnabled() {
//     return this._touchEnabled;
//   }
//   set tapHandler(handler) {
//     this._tapHandler = handler;

//   }
//   get tapHandler() {
//     return this._tapHandler;

//   }
//   set toggleTapHandler1(handler) {
//     this._toggleTapHandler1 = handler;

//   }
//   get toggleTapHandler1() {
//     return this._toggleTapHandler1;

//   }
//   set toggleTapHandler2(handler) {
//     this._toggleTapHandler2 = handler;
//   }

//   get toggleTapHandler2() {
//     return this._toggleTapHandler2;
//   }
//   addedToStage() {
//     var self = this;

//     this.buttonBody = new PIXI.Sprite(PIXI.Texture.from(this.skinName));
//     this.buttonBody.buttonMode = true;

//     this.addChild(this.buttonBody);

//     this.buttonBody.interactive = true;
//     this.buttonBody.on('pointerdown', this.buttonSkinDown_handler, this);
//     this.buttonBody.on('pointerup', this.buttonSkinUp_handler, this);
//     this.buttonBody.on('pointerupoutside', this.buttonSkinUp_handler, this);

//     if (this.toggleClick === false) {
//       this.buttonBody.on('pointertap', function() {
//         if (self._touchEnabled === true) {
//          // PIXI.sound.play('audioButton_mp3');
//           self._tapHandler();
//         }

//       }.bind(this));
//     } else {


//       this.buttonBody.on('pointertap', this.tapHandlerToggles, this);
//     }

//   }

//   set buttonEnabled($bool) {
//     if ($bool === false) {

//       let newname = this.skinName.replace(/_png/g, '');
//       this.buttonBody.texture = PIXI.Texture.from(newname + 'black_png');

//       // this.buttonBody.setEffectGrey();
//       this.buttonBody.buttonMode = false;
//     } else {

//       this.buttonBody.texture = PIXI.Texture.from(this.skinName);
//       this.buttonBody.buttonMode = true;
//     }
//     this._buttonEnabled = $bool;
//   }
//   get buttonEnabled() {
//     return this._buttonEnabled;

//   }

//   setEnabled($bool) {
//     if ($bool === false) {

//       let newname = this.skinName.replace(/_png/g, '');
//       this.buttonBody.texture = PIXI.Texture.from(newname + 'black_png');
//       this.buttonBody.buttonMode = false;
//     } else {
//       this.buttonBody.texture = PIXI.Texture.from(this.skinName);
//       this.buttonBody.buttonMode = true;
//     }

//   }
//   tapHandlerToggles() {

//     if (this._touchEnabled === false) {
//       return;
//     }
//    // PIXI.sound.play('audioButton_mp3');
//     if (this.status === 'status1') {
//       this.status = 'status2';
//       this._toggleTapHandler1();

//     } else if (this.status === 'status2') {
//       this.status = 'status1';
//       this._toggleTapHandler2();
//     }
//   }

//   buttonSkinDown_handler() {
//     if (this._touchEnabled === false) {
//       return;
//     }

//     let newname = this.skinName.replace(/_png/g, '');
//     this.buttonBody.texture = PIXI.Texture.from(newname + 'black_png');

//   }
//   buttonSkinUp_handler() {
//     if (this._touchEnabled === false) {
//       return;
//     }
//     //this.buttonBody.setEffectNone();
//     this.buttonBody.texture = PIXI.Texture.from(this.skinName);
//   }

//   destroyed() {

//     this.buttonBody.destroy();
//     this.buttonBody = null;
//     this.buttonStat = null;
//     this.tapHandler = null;
//     this.destroy();
//   }
// }

class FlyStar extends PIXI.Container {

  constructor() {
    super();
    this.an = null;
    this.on('added', this.addedToStage, this);
  }
  addedToStage() {
    this.initial();
  }
  destroyed() {

    if (this.an != null) {
      this.an.destroy();
      this.an = null;
    }
    this.destroy();
  }
  initial() {
    this.an = new PIXI.spine.Spine(PIXI.loader.resources['animeStar_json'].spineData);
    this.addChild(this.an);

  }
  play($onStart = function() {}, $onComplete = function() {}) {

    this.an.state.setAnimation(0, "animation", false);
    this.an.state.addListener({
      start: $onStart,
      complete: $onComplete
    })

  }
}

class AnimeAqu extends PIXI.Container {
  constructor() {
    super();
    this.anime = null;
    this.clickHandler = null;
    this.on('added', this.addedToStage, this);
  }
  addedToStage() {
    this.anime = new PIXI.spine.Spine(PIXI.loader.resources['aqiu_json'].spineData);

    this.addChild(this.anime);


    this.anime.interactive = true;
    this.anime.on('pointertap', this.animePointerTap_handler, this);



  }
  animePointerTap_handler(event) {
    if (this.clickHandler) {
      this.clickHandler.call(this, event)
    }
  }
  setClap() {
    if (this.anime) {
      this.anime.state.setAnimation(0, 'clap', true);

    }

  };
  setNext() {
    if (this.anime) {
      this.anime.state.setAnimation(0, 'next', true);
    }
  }
  destroyed() {
    if (this.anime) {
      this.anime.destroy();
      this.anime = null;
    }

    this.destroy();
  }
}






export { AnimeAqu, ButtonUI, CardBand, LoadingBar };
