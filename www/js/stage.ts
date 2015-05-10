// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);
stage.interactive = true;

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(720, 540);

var ratio = Math.min(window.innerWidth / 720, window.innerHeight / 540);
var width = 720 * ratio;
var height = 540 * ratio;
renderer.resize(width, height);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

var midTexture = PIXI.Texture.fromImage("images/level1.png");
var mid = new PIXI.Sprite(midTexture);
mid.position.x = 0;
mid.position.y = 0;
mid.interactive = true;
applyRatio(mid, ratio);
stage.addChild(mid);

var healthBar = new HealthBar();

function applyRatio(displayObj: PIXI.DisplayObject, ratio: number) {
    if (ratio == 1) return;
    var object: any = displayObj;
    object.position.x = object.position.x * ratio;
    object.position.y = object.position.y * ratio;
    object.scale.x = object.scale.x * ratio;
    object.scale.y = object.scale.y * ratio;

    for (var i = 0; i < object.children.length; i++) {
        applyRatio(object.children[i], ratio);
    }
}