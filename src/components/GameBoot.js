import * as PIXI from 'pixi.js'
class GameBoot extends PIXI.Container {

    constructor() {
        super();
        this.on('added', this.addedToStage, this)
    }
    addedToStage() {
        console.log('boot !!')

    }
}
export default GameBoot;