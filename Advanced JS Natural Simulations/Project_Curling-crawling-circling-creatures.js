
angleMode = radians;

var Spider = function(position, focus) {
    
    this.position = position;
    this.velocity = new PVector(random(-1, 1), random(-1, 1));
    this.acceleration = new PVector(0, 0);
    var r = random(255);
    var g = random(255);
    var b = random(255);
    
    this.display = function() {
        pushMatrix();
        translate(width/2, height/2);
        fill(r, g, b);
        stroke(255, 255, 255, 100);
        line(this.position.x, this.position.y, 0, 0);
        noStroke();
        ellipse(this.position.x, this.position.y, 10, 10);
        popMatrix();
    };
    
    this.update = function() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        if (this.position.x > width/2) {
            this.position.x = -width/2;
        } else if (this.position.x < -width/2) {
            this.position.x = width/2;
        } else if (this.position.y > height/2) {
            this.position.y = -height/2;
        } else if (this.position.y < -height/2) {
            this.position.y = height/2;
        }
        this.velocity.limit(5);
        this.acceleration.mult(0);
    };
};
var Leg = function(origin, angle, a) {
    this.origin = origin;
    this.position = new PVector(origin.position.x, origin.position.y);
    this.angle = angle;
    this.amplitude = 25;
    this.aVelocity = 0.05;
    this.a = a;
    var r = random(255);
    var g = random(255);
    var b = random(255);
    
    this.display = function() {
        this.currentOrigin = this.origin.position;
        
        var y = this.amplitude * sin(this.angle);
        pushMatrix();
        translate(width/2, height/2);
        stroke(0, 0, 0);
        fill(0, 0, 0);
        rotate(this.rotAngle);
        
        line(this.currentOrigin.x, this.currentOrigin.y, this.a + this.currentOrigin.x, this.currentOrigin.y + y);
        popMatrix();
    };
    this.oscillate = function() {
        this.currentOrigin = this.origin.position;
        this.angle += this.aVelocity;
        this.position.add(this.currentOrigin);
    };
};

var spider = new Spider(new PVector(0, 0));
var legs = [];

for (var i = 0; i < 100; i += 25) {
    legs.push(new Leg(spider, i/PI, 25));
    legs.push(new Leg(spider, i/PI, -25));
}

var drawWeb = function() {
    strokeWeight(2);
    stroke(255, 255, 255);
    for (var i = 0; i < width; i += 100) {
        for(var j = 0; j < height; j += 100) {
        line(i, height - j, width - i, j);
        }
    }
};

draw = function() {
    background(125, 126, 133);
    drawWeb();
    for (var i = 0; i < legs.length; i++) {
        legs[i].display();
        legs[i].oscillate();
    }
    spider.display();
    spider.update();
};