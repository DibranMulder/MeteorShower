class Meteor implements IDrawable {
    private static _meteorTextures: PIXI.Texture[];
    public static get meteorTextures(): PIXI.Texture[] {
        if (!Meteor._meteorTextures) {
            var meteor = PIXI.Texture.fromImage("images/meteor_small.png").baseTexture;
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
        this.currentAnimation.animationSpeed = 0.25;
              
        applyRatio(this.currentAnimation, ratio);
        stage.addChild(this.currentAnimation);
        this.currentAnimation.play();
    }

    private exploding: boolean = false;
    public explode(stage): PIXI.MovieClip {
        var explosion = PIXI.Texture.fromImage("images/explosion.png").baseTexture;
        var explosionTextures: PIXI.Texture[] = [];
        for (var i = 0; i < 10; i++) {
            for (var g = 0; g < 10; g++) {
                var explosionTexture = new PIXI.Texture(explosion, new PIXI.Rectangle(g * 96, i * 96, 96, 96));
                // TODO: add to texture cache.
                explosionTextures.push(explosionTexture);
            }
        }
        var explosionAnimation = new PIXI.MovieClip(explosionTextures);
        applyRatio(explosionAnimation, ratio);
        explosionAnimation.loop = false;
        explosionAnimation.animationSpeed = 2;
        explosionAnimation.position.x = this.currentAnimation.position.x - ((explosionAnimation.width - this.currentAnimation.width) / 2);
        explosionAnimation.position.y = this.currentAnimation.position.y + (this.currentAnimation.height - explosionAnimation.height);
        explosionAnimation.play();
        explosionAnimation.onComplete = () => {
            // After the stack is completed
            setTimeout(() => {
                stage.removeChild(this.currentAnimation);
                this.currentAnimation = null;
            }, 0);
        };
        
        stage.removeChild(this.currentAnimation);

        this.currentAnimation = explosionAnimation;
        stage.addChild(this.currentAnimation);
               
        return explosionAnimation;
    }

    public paint(animationAgeInMs: number): boolean {
        if (!this.exploding) {
            if (this.currentAnimation.position.y <= (225 * ratio)) {
                this.currentAnimation.position.y += (2 * ratio);
            } else {
                this.exploding = true;
                this.explode(stage);
            }
        } 
        if (this.currentAnimation == null) {
            return false;
        }

        return true;
    }
}