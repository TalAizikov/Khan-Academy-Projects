var makeascene = function()
{
    var dirt = getImage("cute/DirtBlock");
    for(var j = -52; j<376; j+=77)
    {
        for(var i = 0; i<400; i+=98)
        {
            image(dirt,i,j);
        }
    }
};

//Common creature object
var Creature = function() {
    this.position = new PVector(random(0,400), random(0,400));
    this.velocity = new PVector(0, 0);
    this.acceleration = new PVector(0.0, 0.0);
};


Creature.prototype.update = function (x, y) {
    this.acceleration.add( new PVector(x, y) );
    
    if (this.position.x > width) {
        this.acceleration.x -= 0.02;
    } else if (this.position.x < 50) {
        this.acceleration.x += 0.02;
    }
    if (this.position.y > height-50) {
        this.acceleration.y -= 0.02;
    } else if (this.position.y < 50) {
        this.acceleration.y += 0.02;
    }
    this.acceleration.limit(10);
    this.velocity.add(this.acceleration);
    this.velocity.limit(10);
    this.position.add(this.velocity);
};

Creature.prototype.display = function () {
    fill(255, 0, 0);
    ellipse(this.position.x, this.position.y, 20, 20);
    // println(this.acceleration.x + " : " + this.acceleration.y);
};

var Mover = function(){
    Creature.call(this);
};
var Ball = function() {
    Creature.call(this);
};

Mover.prototype.update = function() {
    
    
    var mouse = new PVector(mouseX, mouseY);
    var dir = PVector.sub(mouse, this.position);
    dir.normalize();
    dir.mult(0.2);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};

Mover.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(127);
  ellipse(this.position.x, this.position.y, 10, 10);
};

Mover.prototype.checkEdges = function() {

  if (this.position.x > width) {
    this.position.x = 0;
  } 
  else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  } 
  else if (this.position.y < 0) {
    this.position.y = height;
  }
};

var movers = [];

for (var i = 0; i < 20; i++) {
    movers[i] = new Mover(); 
}






Ball.prototype.update = function() {
    var maxDir = new PVector(width,            height);
    var maxMag = maxDir.mag();
    var mouse = new PVector(mouseX, mouseY);
    var dir = PVector.sub(mouse, this.position);
    var closeness = (maxMag-dir.mag())/maxMag;
    
    dir.normalize();
    dir.mult(closeness);
    this.acceleration = dir;
    this.velocity.add(this.acceleration);
    this.velocity.limit(5);
    this.position.add(this.velocity);
};



Ball.prototype.display = function() {
    stroke(0);
    strokeWeight(2);
    fill(127);
    ellipse(this.position.x, this.position.y, 48, 48);
};

Ball.prototype.checkEdges = function() {

  if (this.position.x > width) {
    this.position.x = 0;
  } else if (this.position.x < 0) {
    this.position.x = width;
  }

  if (this.position.y > height) {
    this.position.y = 0;
  } else if (this.position.y < 0) {
    this.position.y = height;
  }
};

var ball = new Ball();

var draw = function() {
    background(255, 255, 255);
    
   
};
//Draws the ball that the robot is trying to get
var target = function(x,y)
{
  var me = this;
  this.pos = new PVector(x,y);
  this.show = function() {
      fill(255, 255, 255);
      ellipse(me.pos.x,me.pos.y,12,12);
  };
};
//Draws the background



draw = function() {
    makeascene();
     ball.update();
    ball.checkEdges();
    ball.display(); 
    for (var i = 0; i < movers.length; i++) {
        movers[i].update();
        movers[i].display(); 
    }

};




