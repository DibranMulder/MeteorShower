// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x66FF99);
stage.interactive = true;

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(720, 540);

// add the renderer view element to the DOM
document.body.appendChild(renderer.view);

var midTexture = PIXI.Texture.fromImage("images/level1.png");
var mid = new PIXI.Sprite(midTexture);
mid.position.x = 0;
mid.position.y = 0;
mid.interactive = true;

stage.addChild(mid);

var isMouseDown = false;

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

document.addEventListener('pointerdown', function (e) {
    mouseStartGraphics.x = e.x;
    mouseStartGraphics.y = e.y;
    mouseStartGraphics.visible = true;
    currentDirection = -1;

    mouseGraphics.x = e.x;
    mouseGraphics.y = e.y;
    mouseGraphics.visible = true;
    isMouseDown = true;
}, false);

document.addEventListener('pointermove', function (e) {
    if (isMouseDown) {
        if (e.x < mouseStartGraphics.x) {
            // left
            updateDirection(0);
        } else {
            // right
            updateDirection(1);
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

var texture = PIXI.Texture.fromImage("images/zelda_basic_small.png").baseTexture;
var size = 60;
var allDirections = [];
var currentAnimation;
var currentDirection = -1;

for (var i = 0; i < 2; i++) {
    var animationTextures = [];
    for (var j = 0; j < 8; j++) {
        var tempTexture = new PIXI.Texture(texture, { x: j * size, y: i * size, width: size, height: size });
        PIXI.TextureCache[(i * 8) + j] = tempTexture;
        animationTextures.push(tempTexture);
    }
    ;
    var oneWayAnimation = new PIXI.MovieClip(animationTextures);
    oneWayAnimation.stop();
    oneWayAnimation.visible = false;
    if (i == 1) {
        oneWayAnimation.stop();
        oneWayAnimation.visible = true;
        currentAnimation = oneWayAnimation;
    }
    oneWayAnimation.position.x = 400;
    oneWayAnimation.position.y = 265;
    stage.addChild(oneWayAnimation);
    allDirections.push(oneWayAnimation);
}
;

function updateDirection(direction) {
    currentDirection = direction;
    currentAnimation.stop();
    currentAnimation.visible = false;
    currentAnimation = allDirections[currentDirection];
    currentAnimation.visible = true;
}

function createMeteor() {
    var meteor = PIXI.Texture.fromImage("images/meteor_small.png").baseTexture;
    var meteorTextures = [];
    for (var g = 0; g < 11; g++) {
        var meteorTexture = new PIXI.Texture(meteor, { x: g * 58, y: 0, width: 58, height: 100 });
        PIXI.TextureCache[16 + g] = meteorTexture;
        meteorTextures.push(meteorTexture);
    }
    var meteorAnimation = new PIXI.MovieClip(meteorTextures);
    meteorAnimation.position.x = Math.floor(Math.random() * 490) + 1;
    meteorAnimation.position.y = -100;
    meteorAnimation.visible = true;
    stage.addChild(meteorAnimation);
    return meteorAnimation;
}

var meteorAnimation = createMeteor();

var framesPerSecond = 12;
var msPerFrame = 1000 / framesPerSecond;
var walkCycleFrameCount = 8;

requestAnimFrame(animate);
function animate() {
    var animationAgeInMs = new Date().getTime();
    if (isMouseDown) {
        currentAnimation.gotoAndStop((Math.floor(animationAgeInMs / msPerFrame) % walkCycleFrameCount));
        for (var i = 0; i < allDirections.length; i++) {
            var annimation = allDirections[i];
            if (currentDirection === 0) {
                annimation.position.x -= 3;
            } else if (currentDirection === 1) {
                annimation.position.x += 3;
            }
        }
    }

    meteorAnimation.gotoAndStop((Math.floor(animationAgeInMs / msPerFrame) % 11));
    if (meteorAnimation.position.y <= 225) {
        meteorAnimation.position.y += 2;
    } else {
        meteorAnimation.position.y = 0;
        stage.removeChild(meteorAnimation);
        meteorAnimation = createMeteor();
    }

    // render the stage
    renderer.render(stage);
    requestAnimFrame(animate);
}
//# sourceMappingURL=renderer.js.map
