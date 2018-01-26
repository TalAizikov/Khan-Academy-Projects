var RecursiveArt = function (x, y, size, colorR, colorG, colorB){
    noFill();
    stroke(colorR, colorG, colorB);
    var rand = random(0,10);
    //Draw Circle
    if (rand < 5){
        rect(x, y, size, size);
    //Draw Ellipse
    } else {
    ellipse(x + size/2, y+size/2, size, size);
    }
    //Creating variables for new call of RecursiveArt();
    var newSize = size/1.08;
    if (newSize >= 2) {
        var scalerX = newSize / 12;
        var scalerY = newSize / 22;
        var newColorR = colorR * colorG;
        if (newColorR > 255){
            newColorR = random(0, 255);
        }
        var newColorG = colorG * colorB;
        if (newColorG > 255){
            newColorG = random(0, 255);
        }
        var newColorB = colorB * colorR;
            if (newColorB > 255){
        newColorB = random(0, 255);
        }
        RecursiveArt(x + scalerX, y + scalerY, newSize, newColorR, newColorG, newColorB);
    }
};

RecursiveArt(20, 20, 360, 10, 90, 10);
