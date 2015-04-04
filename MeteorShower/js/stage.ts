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

var healthBar = new PIXI.Graphics();
healthBar.beginFill(0xFF0000);
healthBar.drawRect(580, 20, 120, 20);
stage.addChild(healthBar);

var healthBarBounds = new PIXI.Graphics();
healthBarBounds.lineStyle(2, 0x9C9C9C);
healthBarBounds.drawRect(580, 20, 120, 20);
stage.addChild(healthBarBounds);