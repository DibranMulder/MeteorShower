var HealthBar = (function () {
    function HealthBar() {
        this.percent = 100;
        this.draw();
        var healthBarBounds = new PIXI.Graphics();
        healthBarBounds.lineStyle(2, 0x9C9C9C);
        healthBarBounds.drawRect(580, 20, 120, 20);
        applyRatio(healthBarBounds, ratio);
        stage.addChild(healthBarBounds);
    }
    HealthBar.prototype.update = function (percent) {
        this.percent = percent;
        // Remove the healthbar since basic objects are not adjustable.
        stage.removeChild(this.healthBar);
        this.draw();
    };
    HealthBar.prototype.draw = function () {
        this.healthBar = new PIXI.Graphics();
        this.healthBar.beginFill(0xFF0000);
        var width = (120 / 100) * this.percent;
        this.healthBar.drawRect(580, 20, width, 20);
        applyRatio(this.healthBar, ratio);
        stage.addChild(this.healthBar);
    };
    return HealthBar;
}());
//# sourceMappingURL=healthBar.js.map