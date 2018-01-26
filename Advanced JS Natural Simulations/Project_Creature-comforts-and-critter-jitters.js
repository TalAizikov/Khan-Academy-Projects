var timeStart = millis();

var Creature = function(x, y) {
    this.position = new PVector(x, y);
    this.conc = random(0.01, 0.1);
    this.sat = 150;
    this.size = 1 / (this.conc * 2);
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
};
var Organism = function(x, y, sizeX, sizeY, sat) {
	Creature.call(this);
};
Organism.prototype.calculateForce = function(m, i) {
	var force = PVector.sub(m.position, this.position);
	var distance = force.mag();
	distance = constrain(distance, 1.0, 100.0);       
	force.normalize();
	var strength = (this.size.x * 2.5 * i * m.conc) / (distance);
	force.mult(-strength);
	return force;
};
Organism.prototype.applyForce = function(force) {
    var f = PVector.div(force, this.size.x);
	this.acceleration.add(f);
};
Organism.prototype.update = function(vary, lim) { 
	this.xStep = random(-vary, vary);
    this.yStep = random(-vary, vary);
	this.varyAcceleration = new PVector (this.xStep, this.yStep);
	this.acceleration.add(this.varyAcceleration);
	this.velocity.add(this.acceleration);
	this.acceleration.mult(0);
	this.velocity.limit(lim);
	this.position.add(this.velocity);
	if(this.position.x < 0 || this.position.x > width || this.position.y < 0 || this.position.y > height) {
		this.velocity.mult(-1);
	}
};
Organism.prototype.display = function(r, g, b) { // Be visible (most of the time, anyway)
	pushMatrix();
	translate(this.position.x, this.position.y);
	strokeWeight(1);
	stroke(r, g, b, this.sat * 2);
	fill(r, g, b, this.sat);
	ellipse(0, 0, this.size.x, this.size.y);
	popMatrix();
};
Organism.prototype.procreate = function(mature, xInc, yInc, juvX, juvY){ // Reproduction via binary fission
	this.grow = new PVector(xInc, yInc);
	this.die = new PVector(0.5, 0.5);
	if(this.survive === 2) {
	    this.size.add(this.grow);
	}
	if(this.size.x >= mature) {
		this.survive = round(random(0,1));
	} if(this.survive === 1) {
		this.survive = 2;
		this.size = new PVector( juvX, juvY);
		this.angle = random(-2,2) * Math.PI;
		this.repTrue = 1;
	}
};
var Algae = function(x, y, sizeX, sizeY, sat) {
	this.acceleration = new PVector(0, 0);
	this.velocity = new PVector(random(-0.1, 0.1), random(-0.1, 0.1));
	this.position = new PVector(x, y);
	this.size = new PVector(sizeX, sizeY);
	this.sat = sat;
	this.survive = 2;
};
Algae.prototype = Object.create(Organism.prototype);
var algae = [];
for(var i = 0; i < 10; i++) {
	algae[i] = new Algae(random(0, width), random(0, height), 5, 5, 100);
}
var Isolates = function(x, y) { 
    this.position = new PVector(x, y);
    this.conc = random(0.01, 0.1);
    this.sat = 150;
    this.size = 1 / (this.conc * 2);
};
Isolates.prototype.update = function() { 
	this.conc /= 1.001;
	this.size = 1 / (this.conc * 2);
	this.sat -= this.size / 400;
};
Isolates.prototype.display = function(r, g, b) { 
	pushMatrix();
	translate(this.position.x, this.position.y);
	noStroke();
	fill(r, g, b, this.sat);
	ellipse(0, 0, this.size, this.size);
	popMatrix();
};
var predator = [];
var nutrient = [];
draw = function() {
    var bgColor = map(algae.length, 0, 35, 0, 255);
	background(255 - bgColor, 255 - bgColor / 2, 255 - bgColor, 255); //Effects of population levels on water color
	for(var i = 0; i < algae.length; i++) {
		if(algae[i].sat < 50) {
			algae.splice(i, 1);
		} 
		if(algae[i].repTrue === 1) {
			algae[i].repTrue = 0;
			var newAlgae = new Algae(algae[i].position.x, algae[i].position.y, 5, 5, 150);
			algae.push(newAlgae);	
		} //These are the ones that reproduce
		if(algae.length > 35) {
			algae.splice(i, 1); //if something is not right restarts
			var crash = round(random(0, 1));
			if(crash === 1) {
                Program.restart();
            } //restarts if the population gets to 0
		} else if(algae.length < 35 && algae[i].survive !== 0) {
			algae[i].procreate(15, 0.01, 0.01, 5, 5); //Can't reproduce if conditions aren't right
		}
		if(algae[i].survive === 0) {
            algae[i].size.sub(algae[i].die);
            algae[i].sat--;
	    }
		algae[i].update(0.1, 0.5);
		algae[i].display(50, 160, 50);
		for(var j = 0; j < predator.length; j++) {
            predator[j].update();
            predator[j].display(200, 100, 100);
                var force = algae[i].calculateForce(predator[j], 1);
                algae[i].applyForce(force);
		}
		for(var k = 0; k < nutrient.length; k++) {
            nutrient[k].update();
            nutrient[k].display(100, 200, 200);
                var force = algae[i].calculateForce(nutrient[k], -1);
                algae[i].applyForce(force);
		}
	}
	if(mouseIsPressed && keyIsPressed && keyCode === 38) {
	    algae.push(new Algae(mouseX, mouseY, 5, 5, 150));
	} else if(mouseIsPressed && mouseButton === LEFT) {
	    predator.push(new Isolates(mouseX, mouseY)); 
	} else if(mouseIsPressed && mouseButton === RIGHT) {
	    nutrient.push(new Isolates(mouseX, mouseY)); 
	}
	var time = millis();
	if(algae.length <= 1 || (time - timeStart) / 1000 >= 90) {
        Program.restart();
    } 
};