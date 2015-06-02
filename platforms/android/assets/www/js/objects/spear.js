var Spear = (function () {
    function Spear(stage, x, y) {
        this.x = x;
        this.y = y;
        this.disappearing = false;
        var spearTexture = PIXI.Texture.fromImage("images/spear_small.png");
        this.displayObject = new PIXI.Sprite(spearTexture);
        this.displayObject.position.x = x;
        this.displayObject.position.y = y;
        applyRatio(this.displayObject, ratio);
        stage.addChild(this.displayObject);
    }
    Spear.prototype.paint = function (animationAgeInMs) {
        if (this.displayObject.position.x > (820 * ratio)) {
            stage.removeChild(this.displayObject);
            return false;
        } else {
            this.displayObject.position.x += (4 * ratio);
        }

        return true;
    };

    Spear.prototype.collisionOccured = function () {
        stage.removeChild(this.displayObject);
    };
    return Spear;
})();
