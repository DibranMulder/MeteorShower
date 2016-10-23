var OppositePlayer = (function () {
    function OppositePlayer(stage, x, y) {
        this.amountOfFrames = 2;
        // 12 is the fps
        this.msPerFrame = 1000 / 12;
        this.allDirectionsAnimations = [];
        var texture = PIXI.Texture.fromImage("images/opposite_player.png").baseTexture;
        // 2 rows
        for (var i = 0; i < 2; i++) {
            var animationTextures = [];
            for (var j = 0; j < 2; j++) {
                var tempTexture = new PIXI.Texture(texture, new PIXI.Rectangle(j * 30, i * 30, 30, 30));
                animationTextures.push(tempTexture);
            }
            ;
            var oneWayAnimation = new PIXI.extras.MovieClip(animationTextures);
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
    }
    OppositePlayer.prototype.updatePlayer = function (direction, jumping, moving, xPosition, yPosition) {
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
        this.moving = moving;
        this.jumping = jumping;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
    };
    OppositePlayer.prototype.paint = function (animationAgeInMs) {
        if (this.moving) {
            this.playerAnimation.gotoAndStop((Math.floor(animationAgeInMs / this.msPerFrame) % this.amountOfFrames));
            this.playerAnimation.position.x = this.xPosition;
        }
        if (this.jumping) {
            this.playerAnimation.position.y = this.yPosition;
        }
        return true;
    };
    return OppositePlayer;
}());
//# sourceMappingURL=oppositePlayer.js.map