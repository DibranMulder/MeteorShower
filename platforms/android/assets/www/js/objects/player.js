var Player = (function () {
    function Player(stage, x, y) {
        this.amountOfFrames = 2;
        this.msPerFrame = 1000 / 12;
        this.allDirectionsAnimations = [];
        this.speed = 3 * ratio;
        this.jumpDistance = 15 * ratio;
        this.health = 100;
        var texture = PIXI.Texture.fromImage("images/soldier_atease.png").baseTexture;

        for (var i = 0; i < 2; i++) {
            var animationTextures = [];
            for (var j = 0; j < 2; j++) {
                var tempTexture = new PIXI.Texture(texture, new PIXI.Rectangle(j * 30, i * 30, 30, 30));
                animationTextures.push(tempTexture);
            }
            ;
            var oneWayAnimation = new PIXI.MovieClip(animationTextures);
            oneWayAnimation.visible = false;
            oneWayAnimation.position.x = x;
            oneWayAnimation.position.y = y;
            applyRatio(oneWayAnimation, ratio);
            oneWayAnimation.scale.x = oneWayAnimation.scale.x * 2;
            oneWayAnimation.scale.y = oneWayAnimation.scale.y * 2;
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
    };

    Player.prototype.jump = function () {
        if (!this.jumping) {
            this.jumping = true;
            this.jumpingIteration = 0;
        }
    };

    Player.prototype.paint = function (animationAgeInMs) {
        if (moveMouseDown) {
            this.playerAnimation.gotoAndStop((Math.floor(animationAgeInMs / this.msPerFrame) % this.amountOfFrames));
            if (this.currentDirection === 0) {
                this.playerAnimation.position.x -= this.speed;
            } else if (this.currentDirection === 1) {
                this.playerAnimation.position.x += this.speed;
            }
        }
        if (this.jumping) {
            if (this.jumpingIteration == 31) {
                this.jumping = false;
            } else {
                var yDelta = this.jumpDistance - (ratio * this.jumpingIteration);
                this.playerAnimation.position.y -= yDelta;
                this.jumpingIteration++;
            }
        }
        return true;
    };

    Player.prototype.colidesWith = function (object) {
        if (!object.disappearing) {
            if (this.playerAnimation.x < object.displayObject.x + object.displayObject.width && this.playerAnimation.x + this.playerAnimation.width > object.displayObject.x && this.playerAnimation.y < object.displayObject.y + object.displayObject.height && this.playerAnimation.height + this.playerAnimation.y > object.displayObject.y) {
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
    };
    return Player;
})();
