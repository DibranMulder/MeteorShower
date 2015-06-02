var PointerManager = (function () {
    function PointerManager() {
        this.pointerStartGraphics = new PIXI.Graphics();
        this.pointerStartGraphics.lineStyle(5, 0xFF0000);
        this.pointerStartGraphics.drawCircle(0, 0, 30 * ratio);
        this.pointerStartGraphics.visible = false;
        stage.addChild(this.pointerStartGraphics);

        this.pointerMoveGraphics = new PIXI.Graphics();

        this.pointerMoveGraphics.lineStyle(2, 0xFF0000);
        this.pointerMoveGraphics.drawCircle(0, 0, 30 * ratio);
        this.pointerMoveGraphics.visible = false;
        stage.addChild(this.pointerMoveGraphics);
    }
    PointerManager.prototype.pointerDown = function (pointerId, x, y) {
        this.pointerId = pointerId;
        this.pointerStartGraphics.x = x;
        this.pointerStartGraphics.y = y;
        this.pointerMove(x, y);
        this.pointerStartGraphics.visible = true;
        this.pointerMoveGraphics.visible = true;
    };

    PointerManager.prototype.pointerMove = function (x, y) {
        this.pointerMoveGraphics.x = x;
        this.pointerMoveGraphics.y = y;
    };

    PointerManager.prototype.pointerUp = function (pointerId) {
        if (this.pointerId == pointerId) {
            this.pointerStartGraphics.visible = false;
            this.pointerMoveGraphics.visible = false;
        }
    };
    return PointerManager;
})();

var pointerManager = new PointerManager();
var moveMouseDown = false;

document.addEventListener('pointerdown', function (e) {
    if (e.x < (width / 2)) {
        pointerManager.pointerDown(e.pointerId, e.x, e.y);
        moveMouseDown = true;
    }
    if (e.x > (width / 2)) {
        player.jump();
    }
}, false);

document.addEventListener('pointermove', function (e) {
    if (moveMouseDown && pointerManager.pointerStartGraphics.x != null && pointerManager.pointerStartGraphics.x != e.x) {
        if (e.x < pointerManager.pointerStartGraphics.x) {
            player.updateDirection(0);
        } else {
            player.updateDirection(1);
        }
        pointerManager.pointerMove(e.x, e.y);
    }
}, false);

document.addEventListener('pointerup', function (e) {
    moveMouseDown = false;
    pointerManager.pointerUp(e.pointerId);
}, false);
