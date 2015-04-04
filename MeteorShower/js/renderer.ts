var player = new Player(stage, 400, 265);
var meteor = new Meteor(stage, 100, -100);

var drawables: IDrawable[] = [];
drawables.push(player);
drawables.push(meteor);

requestAnimFrame(animate);
function animate() {
    var animationAgeInMs = new Date().getTime();
    for (var i = 0; i < drawables.length; i++) {
        drawables[i].paint(animationAgeInMs);
    }
    // render the stage   
    renderer.render(stage);
    requestAnimFrame(animate);
}