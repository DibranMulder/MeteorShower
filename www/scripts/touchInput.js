var PointerManager = (function () {
    function PointerManager() {
        this.pointerStartGraphics = new PIXI.Graphics();
        this.pointerStartGraphics.lineStyle(5, 0xFF0000);
        this.pointerStartGraphics.drawCircle(0, 0, 30 * ratio);
        this.pointerStartGraphics.visible = false;
        stage.addChild(this.pointerStartGraphics);
        this.pointerMoveGraphics = new PIXI.Graphics();
        // set the line style to have a width of 5 and set the color to red
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
        this.pointerStartGraphics.visible = false;
        this.pointerMoveGraphics.visible = false;
        this.pointerId = null;
    };
    Object.defineProperty(PointerManager.prototype, "isMoving", {
        get: function () {
            return this.pointerId != null;
        },
        enumerable: true,
        configurable: true
    });
    return PointerManager;
}());
var pointerManager = new PointerManager();
document.addEventListener('pointerdown', function (e) {
    if (e.x < (width / 2)) {
        pointerManager.pointerDown(e.pointerId, e.x, e.y);
    }
    if (e.x > (width / 2)) {
        player.jump();
    }
}, false);
document.addEventListener('pointermove', function (e) {
    if (pointerManager.pointerId == e.pointerId &&
        pointerManager.pointerStartGraphics.x != null &&
        pointerManager.pointerStartGraphics.x != e.x) {
        if (e.x < pointerManager.pointerStartGraphics.x) {
            // left
            player.updateDirection(0);
        }
        else {
            // right
            player.updateDirection(1);
        }
        pointerManager.pointerMove(e.x, e.y);
    }
}, false);
document.addEventListener('pointerup', function (e) {
    if (pointerManager.pointerId == e.pointerId) {
        pointerManager.pointerUp(e.pointerId);
    }
}, false);
//# sourceMappingURL=touchInput.js.map