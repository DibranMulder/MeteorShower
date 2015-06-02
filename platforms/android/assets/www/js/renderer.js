function createMeteor() {
    var randomX = Math.floor(Math.random() * 500) + 1;
    var meteor = new Meteor(stage, randomX, -100);
    objects.push(meteor);
}
;

var gameOver = false;
function setGameOver() {
    gameOver = true;
    var anchor = document.createElement("a");
    anchor.href = "index.html";
    anchor.style.textDecoration = "none";
    var div = document.createElement("div");
    div.style.height = renderer.height + "px";
    div.style.width = renderer.width + "px";
    div.style.lineHeight = renderer.height + "px";
    div.style.fontSize = (renderer.height / 7) + "px";
    var p = document.createElement("span");
    p.textContent = "GAME OVER";
    p.style.color = "red";
    div.appendChild(p);
    anchor.appendChild(div);
    document.body.appendChild(anchor);
}
;

var player = new Player(stage, 400, 265);
var objects = [];

createMeteor();

var spear = new Spear(stage, -100, 200);
objects.push(spear);

var fpsmeter = new window.FPSMeter();

requestAnimFrame(animate);
function animate() {
    if (gameOver)
        return;

    renderer.render(stage);

    var animationAgeInMs = new Date().getTime();
    for (var i = 0; i < objects.length; i++) {
        var object = objects[i];
        if (!object.paint(animationAgeInMs) || player.colidesWith(object)) {
            objects.splice(i, 1);
            createMeteor();
        }
    }

    player.paint(animationAgeInMs);

    fpsmeter.tick();

    requestAnimFrame(animate);
}
