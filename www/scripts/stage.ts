var socket = io("localhost:3000");
var oppositePlayers: OppositePlayer[] = [];
socket.on("player-joined", (clients: string[]) => {
    for (var i = 0; i < clients.length; i++) {
        if (clients[i] != socket.id && oppositePlayers[clients[i]] == null) {
            oppositePlayers[clients[i]] = new OppositePlayer(clients[i], stage, 400, 265);
        }
    }
});
socket.on("position-changed", (id: string, direction: number, jumping: boolean, moving: boolean, xPosition: number, yPosition: number) => {
    if (id != socket.id && oppositePlayers != null) {
        oppositePlayers[id].updatePlayer(direction, jumping, moving, xPosition, yPosition);
    }
});
socket.on("player-disconnected", (id: string) => {
    if (id != socket.id && oppositePlayers != null) {
        oppositePlayers[id].quit();
        delete oppositePlayers[id];
    }
});



// create an new instance of a pixi stage
var renderer = PIXI.autoDetectRenderer(720, 540, { backgroundColor: 0x66FF99 });
document.body.appendChild(renderer.view);

// create the root of the scene graph
var stage = new PIXI.Container();

stage.interactive = true;

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

createWood(0, 205);
createWood(30, 205);
createWood(60, 205);
createWood(90, 235);
createWood(120, 235);
createWood(150, 265);
createWood(180, 265);

var healthBar = new HealthBar();

function createWood(x: number, y: number) {
    var wood = new PIXI.Graphics();
    wood.beginFill(0x734A02);
    wood.drawRect(x, y, 30, 30);
    applyRatio(wood, ratio);
    stage.addChild(wood);
}

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