var stage = new PIXI.Stage(0x66FF99);
stage.interactive = true;

var renderer = PIXI.autoDetectRenderer(720, 540);

var ratio = Math.min(window.innerWidth / 720, window.innerHeight / 540);
var width = 720 * ratio;
var height = 540 * ratio;
renderer.resize(width, height);

document.body.appendChild(renderer.view);

var midTexture = PIXI.Texture.fromImage("images/level1.png");
var mid = new PIXI.Sprite(midTexture);
mid.position.x = 0;
mid.position.y = 0;
mid.interactive = true;
applyRatio(mid, ratio);
stage.addChild(mid);

createWood(0, 205);
createWood(30, 205);
createWood(60, 205);
createWood(90, 235);
createWood(120, 235);
createWood(150, 265);
createWood(180, 265);

var healthBar = new HealthBar();

function createWood(x, y) {
    var wood = new PIXI.Graphics();
    wood.beginFill(0x734A02);
    wood.drawRect(x, y, 30, 30);
    applyRatio(wood, ratio);
    stage.addChild(wood);
}

function applyRatio(displayObj, ratio) {
    if (ratio == 1)
        return;
    var object = displayObj;
    object.position.x = object.position.x * ratio;
    object.position.y = object.position.y * ratio;
    object.scale.x = object.scale.x * ratio;
    object.scale.y = object.scale.y * ratio;

    for (var i = 0; i < object.children.length; i++) {
        applyRatio(object.children[i], ratio);
    }
}
