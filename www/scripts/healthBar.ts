class HealthBar {
    private healthBar: PIXI.Graphics;
    private percent: number;

    constructor() {
        this.percent = 100;

        this.draw();

        var healthBarBounds = new PIXI.Graphics();
        healthBarBounds.lineStyle(2, 0x9C9C9C);
        healthBarBounds.drawRect(580, 20, 120, 20);
        applyRatio(healthBarBounds, ratio);
        stage.addChild(healthBarBounds);
    }

    public update(percent: number) {
        this.percent = percent;
        // Remove the healthbar since basic objects are not adjustable.
        stage.removeChild(this.healthBar);
        this.draw();
    }

    private draw() {
        this.healthBar = new PIXI.Graphics();
        this.healthBar.beginFill(0xFF0000);
        var width = (120 / 100) * this.percent;
        this.healthBar.drawRect(580, 20, width, 20);
        applyRatio(this.healthBar, ratio);
        stage.addChild(this.healthBar);
    }
} 