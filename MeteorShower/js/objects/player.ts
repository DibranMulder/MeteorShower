class Player implements IDrawable {
    public amountOfFrames: number = 8;
    // 12 is the fps
    public msPerFrame: number = 1000 / 12;

    public playerAnimation: PIXI.MovieClip;
    public allDirectionsAnimations: PIXI.MovieClip[] = [];

    constructor(stage: PIXI.Stage, private x: number, private y: number) {
        var texture = PIXI.Texture.fromImage("../images/zelda_basic_small.png").baseTexture;
        // 2 rows
        for (var i = 0; i < 2; i++) {
            var animationTextures = [];
            for (var j = 0; j < 8; j++) {
                var tempTexture = new PIXI.Texture(texture, new PIXI.Rectangle(j * 60, i * 60, 60, 60));
                animationTextures.push(tempTexture);
            };
            var oneWayAnimation = new PIXI.MovieClip(animationTextures);
            oneWayAnimation.visible = false;
            oneWayAnimation.position.x = x;
            oneWayAnimation.position.y = y;
            applyRatio(oneWayAnimation, ratio);
            oneWayAnimation.stop();
            stage.addChild(oneWayAnimation);
            this.allDirectionsAnimations.push(oneWayAnimation)
        };
        this.updateDirection(0);
    }

    private currentDirection: number;
    public updateDirection(direction: number) {
        this.currentDirection = direction;
        if (this.currentDirection !== -1) {
            if (this.playerAnimation) {
                this.playerAnimation.stop();
                this.playerAnimation.visible = false;
            }
            this.playerAnimation = this.allDirectionsAnimations[this.currentDirection];
            this.playerAnimation.visible = true;
        }
    }

    public paint(animationAgeInMs: number) {
        if (isMouseDown) {
            this.playerAnimation.gotoAndStop((Math.floor(animationAgeInMs / this.msPerFrame) % this.amountOfFrames));
            for (var i = 0; i < this.allDirectionsAnimations.length; i++) {
                var annimation = this.allDirectionsAnimations[i];
                if (this.currentDirection === 0) {
                    annimation.position.x -= 3;
                } else if (this.currentDirection === 1) {
                    annimation.position.x += 3;
                }
            }
        }
        return true;
    }
}