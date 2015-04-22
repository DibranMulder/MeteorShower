var mouseStartGraphics = new PIXI.Graphics();
mouseStartGraphics.lineStyle(5, 0xFF0000);
mouseStartGraphics.drawCircle(0, 0, 30);
mouseStartGraphics.visible = false;
stage.addChild(mouseStartGraphics);

var mouseGraphics = new PIXI.Graphics();

mouseGraphics.lineStyle(2, 0xFF0000);
mouseGraphics.drawCircle(0, 0, 30);
mouseGraphics.visible = false;
stage.addChild(mouseGraphics);

var isMouseDown = false;

document.addEventListener('pointerdown', function (e) {
    mouseStartGraphics.x = e.x;
    mouseStartGraphics.y = e.y;
    mouseStartGraphics.visible = true;

    player.updateDirection(-1);

    mouseGraphics.x = e.x;
    mouseGraphics.y = e.y;
    mouseGraphics.visible = true;
    isMouseDown = true;
}, false);

document.addEventListener('pointermove', function (e) {
    if (isMouseDown) {
        if (e.x < mouseStartGraphics.x) {
            player.updateDirection(0);
        } else {
            player.updateDirection(1);
        }
        mouseGraphics.x = e.x;
        mouseGraphics.y = e.y;
    }
}, false);

document.addEventListener('pointerup', function (e) {
    isMouseDown = false;
    mouseStartGraphics.visible = false;
    mouseGraphics.visible = false;
}, false);
