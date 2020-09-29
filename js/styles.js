var container = document.getElementById("container");

var c = document.getElementById("landing");
var ctx = c.getContext("2d");

var circles = [];
var lines = ["In keeping with the spirit of a thirty minute film festival (30MFF), this film was shot and edited in under thirty minutes.", "As students whose plans were deeply affected by COVID-19, we wanted to use this creative opportunity to reflect on how our lives have changed and how they remain the same.", "What People Do is a film that captures the result of our collective reflections. We hope that it uplifts you and encourages you to think about the joy and beauty in life that no crisis can take away.", "Click on a blank part of the screen!"];
var curr_ind = 0;

c.width = document.documentElement.clientWidth; // equals window dimension
c.height = document.documentElement.clientHeight;

class Circle {
    constructor(x, y, r, color) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.sangle = 0;
        this.eangle = 2*Math.PI;
        this.xvel = 0;
        this.yvel = 0; 
        circles.push(this);
    }
}

drawCircle = (circlesArr) => {
    c.width = document.documentElement.clientWidth; // equals window dimension
    c.height = document.documentElement.clientHeight;
    ctx.clearRect(0, 0, c.width, c.height);
    for (var i = 0; i < circlesArr.length; i++) {   
        ctx.fillStyle = circlesArr[i].color;
        ctx.beginPath();
        ctx.arc(circlesArr[i].x, circlesArr[i].y, circlesArr[i].r, circlesArr[i].sangle, circlesArr[i].eangle);
        ctx.fill();
        if (circlesArr[i].x >= c.width || circlesArr[i].x <= 0) {
            circlesArr[i].xvel = -circlesArr[i].xvel;
        }
        else {}
        if (circlesArr[i].y >= c.height || circlesArr[i].y <= 0) {
            circlesArr[i].yvel = -circlesArr[i].yvel;
        }
        circlesArr[i].x += circlesArr[i].xvel;
        circlesArr[i].y += circlesArr[i].yvel;
    }
}

startMovement = (circlesArr) => {
    moving = true;
    for (var i = 0; i < circlesArr.length; i++) {
        circlesArr[i].xvel = Math.random()*5;
        circlesArr[i].yvel = Math.random()*5;
        if (Math.random() < 0.25) {
            circlesArr[i].xvel = -circlesArr[i].xvel
        }
        else if (Math.random() < 0.5) {
            circlesArr[i].yvel = -circlesArr[i].yvel
        }
        else if (Math.random() < 0.75) {
            circlesArr[i].xvel = -circlesArr[i].xvel
            circlesArr[i].yvel = -circlesArr[i].yvel
        }
    }
}

var circle1 = new Circle(480, 600, 500, 'rgba(255, 222, 102, 0.5)');
var circle2 = new Circle(200, 500, 50, 'rgba(255, 222, 102, 0.5)');
var circle3 = new Circle(50, 300, 250, 'rgba(255, 222, 102, 0.5)');
var circle4 = new Circle(1200, 50, 450, 'rgba(255, 222, 102, 0.5)');
var circle5 = new Circle(750, 30, 80, 'rgba(255, 222, 102, 0.5)');
var circle6 = new Circle(50, 750, 100, 'rgba(255, 15, 15, 0.3)');
var circle7 = new Circle(300, 50, 200, 'rgba(255, 15, 15, 0.3)');
var circle8 = new Circle(1250, 750, 450, 'rgba(255, 15, 15, 0.3)');
    
setInterval(function() {
    drawCircle(circles); 
}, 20);

c.onclick = function() {
    startMovement(circles);
    document.getElementById('para').innerHTML = lines[curr_ind];
    if (curr_ind == 3) {
        curr_ind = 0;
    }  
    else {  
        curr_ind++;
    }
}