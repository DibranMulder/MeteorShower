function createMeteor() {
    var randomX = Math.floor(Math.random() * 500) + 1;
    var meteor = new Meteor(stage, randomX, -100);
    drawables.push(meteor);
};

var player = new Player(stage, 400, 265);
var drawables: IDrawable[] = [];
drawables.push(player);

createMeteor();

var spear = new Spear(stage, -100, 200);
drawables.push(spear);

var fpsmeter = new (<any>window).FPSMeter();

requestAnimFrame(animate);
function animate() {
    // render the stage   
    renderer.render(stage);

    var animationAgeInMs = new Date().getTime();
    for (var i = 0; i < drawables.length; i++) {
        if (!drawables[i].paint(animationAgeInMs)) {
            drawables.splice(i, 1);
            createMeteor();
        }
    }
    fpsmeter.tick();
    
    requestAnimFrame(animate);
}