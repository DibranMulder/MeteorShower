var Meteor = (function () {
    function Meteor(stage, x, y) {
        this.x = x;
        this.y = y;
        this.disappearing = false;
        this.displayObject = new PIXI.MovieClip(Meteor.meteorTextures);
        this.displayObject.position.x = x;
        this.displayObject.position.y = -100;
        this.displayObject.visible = true;
        this.displayObject.animationSpeed = 0.25;

        applyRatio(this.displayObject, ratio);
        stage.addChild(this.displayObject);
        this.displayObject.play();
    }
    Object.defineProperty(Meteor, "meteorTextures", {
        get: function () {
            if (!Meteor._meteorTextures) {
                var meteor = PIXI.Texture.fromImage("images/meteor_small.png").baseTexture;
                Meteor._meteorTextures = [];
                for (var g = 0; g < 11; g++) {
                    var meteorTexture = new PIXI.Texture(meteor, new PIXI.Rectangle(g * 58, 0, 58, 100));

                    Meteor._meteorTextures.push(meteorTexture);
                }
            }
            return Meteor._meteorTextures;
        },
        enumerable: true,
        configurable: true
    });

    Meteor.prototype.explode = function (stage) {
        var _this = this;
        this.disappearing = true;

        var explosion = PIXI.Texture.fromImage("images/explosion.png").baseTexture;
        var explosionTextures = [];
        for (var i = 0; i < 10; i++) {
            for (var g = 0; g < 10; g++) {
                var explosionTexture = new PIXI.Texture(explosion, new PIXI.Rectangle(g * 96, i * 96, 96, 96));

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
        explosionAnimation.onComplete = function () {
            setTimeout(function () {
                stage.removeChild(_this.displayObject);
                _this.displayObject = null;
            }, 0);
        };

        stage.removeChild(this.displayObject);

        this.displayObject = explosionAnimation;
        stage.addChild(this.displayObject);

        return explosionAnimation;
    };

    Meteor.prototype.paint = function (animationAgeInMs) {
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
    };

    Meteor.prototype.collisionOccured = function () {
        this.explode(stage);
    };
    return Meteor;
})();
