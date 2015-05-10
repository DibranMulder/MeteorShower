class Player {
    public amountOfFrames: number = 8;
    // 12 is the fps
    public msPerFrame: number = 1000 / 12;

    public playerAnimation: PIXI.MovieClip;
    public allDirectionsAnimations: PIXI.MovieClip[] = [];

    public health: number = 100;

    constructor(stage: PIXI.Stage, x: number, y: number) {
        var texture = PIXI.Texture.fromImage("images/zelda_basic_small.png").baseTexture;
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
            var tmpX, tmpY;
            if (this.playerAnimation) {
                this.playerAnimation.stop();
                this.playerAnimation.visible = false;
                tmpX = this.playerAnimation.position.x;
                tmpY = this.playerAnimation.position.y;
            }
            this.playerAnimation = this.allDirectionsAnimations[this.currentDirection];
            this.playerAnimation.visible = true;
            if (tmpX != undefined && tmpY != undefined) {
                this.playerAnimation.position.x = tmpX;
                this.playerAnimation.position.y = tmpY;
            }
        }
    }

    private jumping: boolean;
    private jumpingIteration: number;
    public jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.jumpingIteration = 0;
        }
    }

    public paint(animationAgeInMs: number) {
        if (moveMouseDown) {
            this.playerAnimation.gotoAndStop((Math.floor(animationAgeInMs / this.msPerFrame) % this.amountOfFrames));
            if (this.currentDirection === 0) {
                this.playerAnimation.position.x -= 3;
            } else if (this.currentDirection === 1) {
                this.playerAnimation.position.x += 3;
            }
        }
        if (this.jumping) {
            if (this.jumpingIteration == 31) {
                this.jumping = false;
            } else {
                var yDelta = 15 - this.jumpingIteration;
                this.playerAnimation.position.y -= yDelta;
                this.jumpingIteration++;
            }
        }
        return true;
    }

    public colidesWith(object: IDrawable): boolean {
        if (!object.disappearing) {
            if (this.playerAnimation.x < object.displayObject.x + object.displayObject.width &&
                this.playerAnimation.x + this.playerAnimation.width > object.displayObject.x &&
                this.playerAnimation.y < object.displayObject.y + object.displayObject.height &&
                this.playerAnimation.height + this.playerAnimation.y > object.displayObject.y) {

                object.collisionOccured();

                this.health -= 50;
                healthBar.update(this.health);

                if (this.health <= 0) {
                    setGameOver();
                }

                return true;
            }
        }
        return false;
    }
}