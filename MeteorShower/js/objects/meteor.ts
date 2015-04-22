class Meteor implements IDrawable {
    public disappearing: boolean = false;

    private static _meteorTextures: PIXI.Texture[];
    public static get meteorTextures(): PIXI.Texture[] {
        if (!Meteor._meteorTextures) {
            var meteor = PIXI.Texture.fromImage("../images/meteor_small.png").baseTexture;
            Meteor._meteorTextures = [];
            for (var g = 0; g < 11; g++) {
                var meteorTexture = new PIXI.Texture(meteor, new PIXI.Rectangle(g * 58, 0, 58, 100));
                // TODO: add to texture cache.
                Meteor._meteorTextures.push(meteorTexture);
            }
        }
        return Meteor._meteorTextures;
    }

    public displayObject: PIXI.MovieClip;

    constructor(stage: PIXI.Stage, private x: number, private y: number) {
        this.displayObject = new PIXI.MovieClip(Meteor.meteorTextures);
        this.displayObject.position.x = x;
        this.displayObject.position.y = -100;
        this.displayObject.visible = true;
        this.displayObject.animationSpeed = 0.25;
              
        applyRatio(this.displayObject, ratio);
        stage.addChild(this.displayObject);
        this.displayObject.play();
    }

    public explode(stage): PIXI.MovieClip {
        this.disappearing = true;

        var explosion = PIXI.Texture.fromImage("../images/explosion.png").baseTexture;
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
        explosionAnimation.position.x = this.displayObject.position.x - ((explosionAnimation.width - this.displayObject.width) / 2);
        explosionAnimation.position.y = this.displayObject.position.y + (this.displayObject.height - explosionAnimation.height);
        explosionAnimation.play();
        explosionAnimation.onComplete = () => {
            // After the stack is completed
            setTimeout(() => {
                stage.removeChild(this.displayObject);
                this.displayObject = null;
            }, 0);
        };
        
        stage.removeChild(this.displayObject);

        this.displayObject = explosionAnimation;
        stage.addChild(this.displayObject);
               
        return explosionAnimation;
    }

    public paint(animationAgeInMs: number): boolean {
        if (!this.disappearing) {
            if (this.displayObject.position.y <= (225 * ratio)) {
                this.displayObject.position.y += (2 * ratio);
            } else {
                this.explode(stage);
            }
        } 
        if (this.displayObject == null) {
            return false;
        }

        return true;
    }

    public collisionOccured() {
        this.explode(stage);
    }
}