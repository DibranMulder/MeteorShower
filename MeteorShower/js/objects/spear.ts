class Spear implements IDrawable {
    public displayObject: PIXI.Sprite;
    public disappearing: boolean = false;

    constructor(stage: PIXI.Stage, private x: number, private y: number) {
        var spearTexture = PIXI.Texture.fromImage("../images/spear_small.png");
        this.displayObject = new PIXI.Sprite(spearTexture);
        this.displayObject.position.x = x;
        this.displayObject.position.y = y;
        applyRatio(this.displayObject, ratio);
        stage.addChild(this.displayObject);
    }

    public paint(animationAgeInMs: number): boolean {
        if (this.displayObject.position.x > 820) {
            stage.removeChild(this.displayObject);
            return false;
        } else {
            this.displayObject.position.x += 4;
        }

        return true;
    }

    public collisionOccured() {
        stage.removeChild(this.displayObject);
    }
}