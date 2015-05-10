function createMeteor() {
    var randomX = Math.floor(Math.random() * 500) + 1;
    var meteor = new Meteor(stage, randomX, -100);
    objects.push(meteor);
};

var gameOver: boolean = false;
function setGameOver() {
    gameOver = true;
    var div = document.createElement("div");
    div.style.margin = "auto";
    div.style.height = "50px";
    div.style.position = "absolute";
    div.style.top = "0px";
    div.style.textAlign = "center";
    div.style.height = renderer.height + "px";
    div.style.width = renderer.width + "px";
    div.style.lineHeight = renderer.height + "px";
    div.style.fontSize = (renderer.height / 7) + "px";
    div.style.backgroundColor = "black";
    var p = document.createElement("span");
    p.textContent = "GAME OVER";
    p.style.color = "red";
    div.appendChild(p);
    document.body.appendChild(div);
};

var player = new Player(stage, 400, 265);
var objects: IDrawable[] = [];

createMeteor();

var spear = new Spear(stage, -100, 200);
objects.push(spear);

var fpsmeter = new (<any>window).FPSMeter();

requestAnimFrame(animate);
function animate() {
    // render the stage   
    renderer.render(stage);
    if (!gameOver) {
        var animationAgeInMs = new Date().getTime();
        for (var i = 0; i < objects.length; i++) {
            var object = objects[i];
            if (!object.paint(animationAgeInMs) || player.colidesWith(object)) {
                objects.splice(i, 1);
                createMeteor();
            }
        }

        player.paint(animationAgeInMs);
    }
    fpsmeter.tick();
    
    requestAnimFrame(animate);
}