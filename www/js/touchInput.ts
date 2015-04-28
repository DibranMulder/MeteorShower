var mouseStartGraphics = new PIXI.Graphics();
mouseStartGraphics.lineStyle(5, 0xFF0000);
mouseStartGraphics.drawCircle(0, 0, 30);
mouseStartGraphics.visible = false;
stage.addChild(mouseStartGraphics);

var mouseGraphics = new PIXI.Graphics();
// set the line style to have a width of 5 and set the color to red
mouseGraphics.lineStyle(2, 0xFF0000);
mouseGraphics.drawCircle(0, 0, 30);
mouseGraphics.visible = false;
stage.addChild(mouseGraphics);

var moveMouseDown = false;

document.addEventListener('pointerdown', function (e) {
    if (e.x < (width / 2)) {
        mouseStartGraphics.x = e.x;
        mouseStartGraphics.y = e.y;
        mouseStartGraphics.visible = true;

        player.updateDirection(-1);

        mouseGraphics.x = e.x;
        mouseGraphics.y = e.y;
        mouseGraphics.visible = true;
        moveMouseDown = true;
    }
    if (e.x > (width / 2)) {
        player.jump();
    }
}, false);

document.addEventListener('pointermove', function (e) {
    if (moveMouseDown) {
        if (e.x < mouseStartGraphics.x) {
            // left
            player.updateDirection(0);
        } else {
            // right
            player.updateDirection(1);
        }
        mouseGraphics.x = e.x;
        mouseGraphics.y = e.y;
    }

}, false);

document.addEventListener('pointerup', function (e) {
    moveMouseDown = false;
    mouseStartGraphics.visible = false;
    mouseGraphics.visible = false;
}, false);