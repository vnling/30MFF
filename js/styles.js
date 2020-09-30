//accessing container, canvas, and context in order to be able to draw on canvas
var container = document.getElementById("container");
var c = document.getElementById("landing");
var ctx = c.getContext("2d");

//arrays to store circle objects and homepage text; curr_ind stores the index of the currently displayed text
var circles = [];
var lines = ["In keeping with the spirit of a thirty minute film festival (30MFF), this film was shot and edited in under thirty minutes.", "As students whose plans were deeply affected by COVID-19, we wanted to use this creative opportunity to reflect on how our lives have changed and how they remain the same.", "What People Do is a film that captures the result of our collective reflections. We hope that it uplifts you and encourages you to think about the joy and beauty in life that no crisis can take away.", "Click around on blank parts of the screen to learn more!"];
var curr_ind = 0;

//setting canvas width and height
c.width = document.documentElement.clientWidth; // equals window dimension
c.height = document.documentElement.clientHeight; //equals window height

class Circle {
    constructor(x, y, r, color) {
        this.x = x; //x position
        this.y = y; //y position
        this.r = r; //radius
        this.color = color;
        this.sangle = 0; //start angle (for arc drawing)
        this.eangle = 2*Math.PI; //end angle
        this.xvel = 0; //x velocity controls movement, initally set to zero so circles are static
        this.yvel = 0; //y velocity
        circles.push(this); //add it to the circles array
    }
}

drawCircle = (circlesArr) => { //draws all the circles

    c.width = document.documentElement.clientWidth; //resets canvas dimensions (in case of resizing)
    c.height = document.documentElement.clientHeight;
    ctx.clearRect(0, 0, c.width, c.height); //clear background so circles look like they're moving

    for (var i = 0; i < circlesArr.length; i++) {  
        //set color and draw the circles
        ctx.fillStyle = circlesArr[i].color;
        ctx.beginPath();
        ctx.arc(circlesArr[i].x, circlesArr[i].y, circlesArr[i].r, circlesArr[i].sangle, circlesArr[i].eangle);
        ctx.fill();

        //if the circle hits the edge of the viewport, reverse its velocity
        if (circlesArr[i].x >= c.width || circlesArr[i].x <= 0) {
            circlesArr[i].xvel = -circlesArr[i].xvel;
        }
        if (circlesArr[i].y >= c.height || circlesArr[i].y <= 0) {
            circlesArr[i].yvel = -circlesArr[i].yvel;
        }
        //otherwise just keep moving the circles along their path
        circlesArr[i].x += circlesArr[i].xvel;
        circlesArr[i].y += circlesArr[i].yvel;
    }
}

startMovement = (circlesArr) => { //trigggered on click

    for (var i = 0; i < circlesArr.length; i++) {
        //set each circle's velocity randomly
        circlesArr[i].xvel = Math.random()*5;
        circlesArr[i].yvel = Math.random()*5;

        //Math.random always comes out positive
        // so negate velocities based on chance to create initial velocities in all directions
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

//instantiate all the circles
var circle1 = new Circle(480, 600, 500, 'rgba(255, 222, 102, 0.5)');
var circle2 = new Circle(200, 500, 50, 'rgba(255, 222, 102, 0.5)');
var circle3 = new Circle(50, 300, 250, 'rgba(255, 222, 102, 0.5)');
var circle4 = new Circle(1200, 50, 450, 'rgba(255, 222, 102, 0.5)');
var circle5 = new Circle(750, 30, 80, 'rgba(255, 222, 102, 0.5)');
var circle6 = new Circle(50, 750, 100, 'rgba(255, 15, 15, 0.3)');
var circle7 = new Circle(300, 50, 200, 'rgba(255, 15, 15, 0.3)');
var circle8 = new Circle(1250, 750, 450, 'rgba(255, 15, 15, 0.3)');

//every 20 milliseconds, draw the circles
setInterval(function() {
    drawCircle(circles); 
}, 20);


c.onclick = function() {
    //upon click, set velocities to non-zero with startMovement()
    startMovement(circles);
    //change the text displayed on the homepage
    document.getElementById('para').innerHTML = lines[curr_ind%4];
    curr_ind++;
}