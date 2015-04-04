class Meteor implements IDrawable {
    public amountOfFrames: number;
    // 24 is the fps
    public msPerFrame: number;

    private static _meteorTextures: PIXI.Texture[];
    public static get meteorTextures(): PIXI.Texture[] {
        if (!Meteor._meteorTextures) {
            var meteor = PIXI.Texture.fromImage("../../images/meteor_small.png").baseTexture;
            Meteor._meteorTextures = [];
            for (var g = 0; g < 11; g++) {
                var meteorTexture = new PIXI.Texture(meteor, new PIXI.Rectangle(g * 58, 0, 58, 100));
                // TODO: add to texture cache.
                Meteor._meteorTextures.push(meteorTexture);
            }
        }
        return Meteor._meteorTextures;
    }

    public currentAnimation: PIXI.MovieClip;

    constructor(stage: PIXI.Stage, private x: number, private y: number) {
        this.currentAnimation = new PIXI.MovieClip(Meteor.meteorTextures);
        this.currentAnimation.position.x = x;
        this.currentAnimation.position.y = -100;
        this.currentAnimation.visible = true;
        this.amountOfFrames = 11;
        this.msPerFrame = 1000 / 12;
        stage.addChild(this.currentAnimation);
    }

    private exploding: boolean = false;
    public explode(stage): PIXI.MovieClip {
        var explosion = PIXI.Texture.fromImage("../../images/explosion.png").baseTexture;
        var explosionTextures: PIXI.Texture[] = [];
        for (var i = 0; i < 10; i++) {
            for (var g = 0; g < 10; g++) {
                var explosionTexture = new PIXI.Texture(explosion, new PIXI.Rectangle(g * 128, i * 128, 128, 128));
                // TODO: add to texture cache.
                explosionTextures.push(explosionTexture);
            }
        }
        var explosionAnimation = new PIXI.MovieClip(explosionTextures);
        explosionAnimation.visible = true;
        explosionAnimation.position.x = this.currentAnimation.position.x;
        explosionAnimation.position.y = this.currentAnimation.position.y;
        stage.removeChild(this.currentAnimation);

        this.currentAnimation = explosionAnimation;
        this.amountOfFrames = 100;
        this.msPerFrame = 1000 / 120;

        stage.addChild(explosionAnimation);
        
        explosionAnimation.onComplete = () => {
            debugger;
            stage.removeChild(explosionAnimation);
            drawables.slice(1);
        };
        return explosionAnimation;
    }

    public paint(animationAgeInMs: number): boolean {
        this.currentAnimation.gotoAndStop((Math.floor(animationAgeInMs / this.msPerFrame) % this.amountOfFrames));
        if (!this.exploding) {
            if (this.currentAnimation.position.y <= 225) {
                this.currentAnimation.position.y += 2;
                return true;
            } else {
                this.exploding = true;
                this.explode(stage);
            }
        }
    }
}