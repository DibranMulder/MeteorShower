var Player = (function () {
    function Player(stage, x, y) {
        this.amountOfFrames = 8;
        this.msPerFrame = 1000 / 12;
        this.allDirectionsAnimations = [];
        this.health = 100;
        var texture = PIXI.Texture.fromImage("images/zelda_basic_small.png").baseTexture;

        for (var i = 0; i < 2; i++) {
            var animationTextures = [];
            for (var j = 0; j < 8; j++) {
                var tempTexture = new PIXI.Texture(texture, new PIXI.Rectangle(j * 60, i * 60, 60, 60));
                animationTextures.push(tempTexture);
            }
            ;
            var oneWayAnimation = new PIXI.MovieClip(animationTextures);
            oneWayAnimation.visible = false;
            oneWayAnimation.position.x = x;
            oneWayAnimation.position.y = y;
            applyRatio(oneWayAnimation, ratio);
            oneWayAnimation.stop();
            stage.addChild(oneWayAnimation);
            this.allDirectionsAnimations.push(oneWayAnimation);
        }
        ;
        this.updateDirection(0);
    }
    Player.prototype.updateDirection = function (direction) {
        this.currentDirection = direction;
        if (this.currentDirection !== -1) {
            if (this.playerAnimation) {
                this.playerAnimation.stop();
                this.playerAnimation.visible = false;
            }
            this.playerAnimation = this.allDirectionsAnimations[this.currentDirection];
            this.playerAnimation.visible = true;
        }
    };

    Player.prototype.paint = function (animationAgeInMs) {
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
    };

    Player.prototype.colidesWith = function (object) {
        if (!object.disappearing) {
            if (this.playerAnimation.x < object.displayObject.x + object.displayObject.width && this.playerAnimation.x + this.playerAnimation.width > object.displayObject.x && this.playerAnimation.y < object.displayObject.y + object.displayObject.height && this.playerAnimation.height + this.playerAnimation.y > object.displayObject.y) {
                object.collisionOccured();

                this.health -= 10;
                healthBar.width -= 10;
                return true;
            }
        }
        return false;
    };
    return Player;
})();
