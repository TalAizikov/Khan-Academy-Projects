// global vars
var G = 3; 
var magMax = dist(0,0,width,height);

//creates the basic creature
var Creature = function(m,leader,mycolor) {
    this.position = new PVector(random(width), random(height));
    this.velocity = new PVector(0, 10);
    this.acceleration = new PVector(0, 0);
    this.leader = leader;
    this.mycolor = mycolor;
    this.mass = m;
    this.limit = 5;
    
    var hilite = color(random(255),random(255),random(255));
    this.hilite = blendColor(this.mycolor,hilite,SOFT_LIGHT);
};

Creature.prototype.calculateForce = function(p) {
    var force = PVector.sub(this.position, p.position);
    var distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    var strength = (G * this.mass * p.mass) / (distance * distance);
    force.mult(strength);
    return force;
};

Creature.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.mass);
    this.acceleration.add(f);
};
  
Creature.prototype.update = function() {
    var offset = 20;
    if (this.position.x < offset ||
        this.position.y < offset) {
            this.velocity.rotate(random(60,120));
            this.position.x += 2;
            this.position.y += 2;
    } else if (this.position.x > width - offset ||
                this.position.y > height - offset) {
        this.velocity.rotate(random(60,120));
            this.position.x -= 2;
            this.position.y -= 2;
    }
    
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.limit);

    this.position.add(this.velocity);

    this.acceleration.mult(0);
};

Creature.prototype.lead = function() {
    if (random() < 0.05) { 
        this.velocity.rotate(random()*30);
    }
    this.limit = 5;
    
    var dir = PVector.mult(this.velocity, 5);
    var acc = random(-0.1,0.4);
    dir.normalize();
    dir.mult(acc);
    this.acceleration = dir;
};

Creature.prototype.followMouse = function() {
    this.limit = 5;
    var mouse = new PVector(mouseX,mouseY);
    var dir = PVector.sub(mouse, this.position);
    var acc = 1;
    dir.normalize();
    dir.mult(acc);
    this.acceleration = dir;
};

Creature.prototype.follow = function() {
    var dir = PVector.sub(this.leader.position, this.position);
    var acc = random(0.05,0.35);

    dir.normalize();
    dir.mult(acc);
    this.acceleration = dir;
};

Creature.prototype.flee = function(enemy) {
    this.limit = 5;
    this.applyForce(this.calculateForce(enemy));
};

Creature.prototype.display = function() {
    pushMatrix();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());

    stroke(this.mycolor);
    strokeWeight(3);
    fill(this.mycolor);
    ellipse(0, 0, 30, 8);
    noStroke();
    fill(this.mycolor);
    rotate(-50);
    arc(0,0,10,30,270,360);
    rotate(100);
    arc(0,0,10,30,1,90);

    rotate(-50);
    stroke(this.hilite);
    fill(this.hilite);
    noStroke();
    ellipse(0,0,15,3);

    popMatrix();
};

var drawCloud = function(xpos,ypos) {
    var startx = xpos * width;
    var ctry = ypos * height;
    noStroke();
    fill(255,255,255);
    for (var t = xpos+0.0; t < xpos+1.0; t+= 0.05) {
        ellipse(startx+(t*50),ctry, pow(noise(t-0.5) *20,2),pow(noise(t)*17,2));   
    }
};

var critter = [];
var numCritters = 20;

var leader = new Creature(20,null,color(2, 10, 115));
for (var i = 0; i < numCritters; ++i) {
    critter[i] = new Creature(20,leader,color(235, 61, 61));
}

var predator = new Creature(50,leader,color(74, 74, 74));

var cloudPos = random();
var cloudPos2 = random();
var cloudPos3 = random();

var draw = function() {
    background(117, 172, 255);
    drawCloud(cloudPos, cloudPos2);
    if (cloudPos < 0.5) {
        drawCloud(cloudPos + cloudPos*0.5, cloudPos3);
    } else {
        drawCloud(cloudPos - cloudPos*0.5, cloudPos3);
    }

    leader.lead();
    leader.update();
    leader.display();
    for (var i = 0; i < critter.length; ++i) {
        critter[i].follow();
        critter[i].flee(predator);
        critter[i].update();
        critter[i].display();
    }
    predator.followMouse();
    predator.update();
    predator.display();
};