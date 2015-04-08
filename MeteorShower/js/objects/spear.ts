class Spear implements IDrawable {
    private spearSprite: PIXI.Sprite;

    constructor(stage: PIXI.Stage, private x: number, private y: number) {
        var spearTexture = PIXI.Texture.fromImage("../../images/spear_small.png");
        this.spearSprite = new PIXI.Sprite(spearTexture);
        this.spearSprite.position.x = x;
        this.spearSprite.position.y = y;
        stage.addChild(this.spearSprite);
    }

    public paint(animationAgeInMs: number): boolean {
        if (this.spearSprite.position.x > 820) {
            stage.removeChild(this.spearSprite);
            return false;
        } else {
            this.spearSprite.position.x += 4;
        }

        return true;
    }
}