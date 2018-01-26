var drops = [];
var generator = new Random(1);

var splatter = function(x,y){
    stroke(random(0,365), random(0,365), random(0,365), 32);
    for(var i=0; i<100; i++){
        drops.push(new PVector(generator.nextGaussian()*15+x, generator.nextGaussian()*30+y, 
                               generator.nextGaussian()*15+9));//PVector.z = color
    }
};

var drawPaint = function(){
    for(var i=0; i<drops.length; i++){
        strokeWeight(10);
        point(drops[i].x, drops[i].y);
    }  
};

var draw = function() {
    background(255, 255, 255);
    drawPaint();
    fill(255, 0, 0);
    textSize(15);
    text("Click to splatter paint", 137,370);
};

var mouseClicked = function(){
    splatter(mouseX,mouseY);
};