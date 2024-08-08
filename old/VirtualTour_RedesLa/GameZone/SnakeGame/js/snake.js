var config = {
    bodyColor: "rgba(255,255,255,0.7)",
    headColor: "rgba(255,255,255,0.9)",
    appleColor: "rgba(255,255,255,0.9)",
    bodySize: 4,
    headSize: 4,
    w: 800,
    h: 400,
    growAmount: 3,
    initialLength: 4,
    startFull: false,
    speed: 10,
    icons: ["\uf004", "\uf1fd", "\uf005", "\uf135", "\uf0a3", "\uf2dc", "\uf187", "\uf433", "\uf1e2", "\uf436", "\uf188", "\uf46b", "\uf55f", "\uf0f4", "\uf013", "\uf564", "\uf51f", "\uf521", "\uf578", "\uf084", "\uf094"]
};
  
  
var swipeDetect = new Hammer(document);

var canvas;
var ctx;
var snake;
var interval;
  
  
var sounds = {};
sounds.eat = new Howl({src: ['https://cdn.rawgit.com/cheapjoe/filehost/6c5497f4/mp3/bite.mp3']});
sounds.fail = new Howl({src: ['https://cdn.rawgit.com/cheapjoe/filehost/f77a5925/mp3/fail-buzzer-02.mp3'], volume: 0.25});
sounds.fail.rate(4);


var _keyboard = function() {
this.keyPressed = 'down';
this.anyKeyPressed = false;
this.lastUsedKey = this.keyPressed;
var self = this;

this.handleInput = function(e) {
    self.anyKeyPressed = true;
    $("#tutorial").fadeOut();

    var searchFor; 
    if (e.which) {
        searchFor = e.which;
    } else {
        searchFor = e.type;
    }
    
    switch (searchFor) {
        case 37:
        case 65:
        case 'panleft':
        if (self.lastUsedKey != 'right') {
            self.keyPressed = 'left';
        }
        break;
        case 38:
        case 87:
        case 'panup':
        if (self.lastUsedKey != 'down') {
            self.keyPressed = 'up';
        }
        break;
        case 39:
        case 68:
        case 'panright':
        if (self.lastUsedKey != 'left') {
            self.keyPressed = 'right';
        }
        break;
        case 40:
        case 83:
        case 'pandown':
        if (self.lastUsedKey != 'up') {
            self.keyPressed = 'down';
        }
        break;
    }
};

swipeDetect.on("panleft panright panup pandown", self.handleInput); //works bad

$(document).keydown(self.handleInput);
};

var _snake = function(snakeLength) {
this.elements = [];
this.growCount = 0;

if (config.startFull) {
    this.elements = [{"x":20,"y":20},{"x":40,"y":20},{"x":60,"y":20},{"x":80,"y":20},{"x":100,"y":20},{"x":120,"y":20},{"x":140,"y":20},{"x":160,"y":20},{"x":180,"y":20},{"x":200,"y":20},{"x":220,"y":20},{"x":240,"y":20},{"x":260,"y":20},{"x":280,"y":20},{"x":300,"y":20},{"x":320,"y":20},{"x":340,"y":20},{"x":360,"y":20},{"x":380,"y":20},{"x":400,"y":20},{"x":420,"y":20},{"x":440,"y":20},{"x":440,"y":40},{"x":420,"y":40},{"x":400,"y":40},{"x":380,"y":40},{"x":360,"y":40},{"x":340,"y":40},{"x":320,"y":40},{"x":300,"y":40},{"x":280,"y":40},{"x":260,"y":40},{"x":240,"y":40},{"x":220,"y":40},{"x":200,"y":40},{"x":180,"y":40},{"x":160,"y":40},{"x":140,"y":40},{"x":120,"y":40},{"x":100,"y":40},{"x":80,"y":40},{"x":60,"y":40},{"x":40,"y":40},{"x":20,"y":40},{"x":20,"y":60},{"x":40,"y":60},{"x":60,"y":60},{"x":80,"y":60},{"x":100,"y":60},{"x":120,"y":60},{"x":140,"y":60},{"x":160,"y":60},{"x":180,"y":60},{"x":200,"y":60},{"x":220,"y":60},{"x":240,"y":60},{"x":260,"y":60},{"x":280,"y":60},{"x":300,"y":60},{"x":320,"y":60},{"x":340,"y":60},{"x":360,"y":60},{"x":380,"y":60},{"x":400,"y":60},{"x":420,"y":60},{"x":440,"y":60},{"x":440,"y":80},{"x":420,"y":80},{"x":400,"y":80},{"x":380,"y":80},{"x":360,"y":80},{"x":340,"y":80},{"x":320,"y":80},{"x":300,"y":80},{"x":280,"y":80},{"x":260,"y":80},{"x":240,"y":80},{"x":220,"y":80},{"x":200,"y":80},{"x":180,"y":80},{"x":160,"y":80},{"x":140,"y":80},{"x":120,"y":80},{"x":100,"y":80},{"x":80,"y":80},{"x":60,"y":80},{"x":40,"y":80},{"x":20,"y":80},{"x":20,"y":100},{"x":40,"y":100},{"x":60,"y":100},{"x":80,"y":100},{"x":100,"y":100},{"x":120,"y":100},{"x":140,"y":100},{"x":160,"y":100},{"x":180,"y":100},{"x":200,"y":100},{"x":220,"y":100},{"x":240,"y":100},{"x":260,"y":100},{"x":280,"y":100},{"x":300,"y":100},{"x":320,"y":100},{"x":340,"y":100},{"x":340,"y":120},{"x":340,"y":140}];
} else {
    for (var i=0; i<snakeLength; i++) {
    this.elements.push({
        x: Math.floor((config.w)/(2*20))*20,
        y: 20+20*i
    });
    }
}


this.draw = function() {
    ctx.fillStyle=config.bodyColor;
    for(var i=0; i<this.elements.length - 1; i++) {
    ctx.beginPath();
    ctx.globalAlpha = 0.15 + (i)/(this.elements.length*1.15);
    ctx.rect(this.elements[i].x-0.5*config.bodySize,this.elements[i].y-0.5*config.bodySize,config.bodySize,config.bodySize);
    ctx.fill();
    }
    
    ctx.fillStyle=config.headColor;
    ctx.beginPath();
    ctx.arc(this.elements[this.elements.length - 1].x,this.elements[this.elements.length - 1].y,config.headSize,0,2*Math.PI);
    ctx.fill();
};
};

var _apple = function(snakeElements) {
this.icon = config.icons[Math.floor(Math.random()*config.icons.length)];
var collision = false;
do {
    this.x = Math.floor((Math.floor(Math.random() * (config.w - 20)) + 20)/20)*20;
    this.y = Math.floor((Math.floor(Math.random() * (config.h - 20)) + 20)/20)*20;
    collision = true;
    for (var i=0; i<snakeElements.length; i++) {
    if (snakeElements[i].x == this.x && snakeElements[i].y == this.y) {
        collision = false;
    }
    }
} while (collision == false)

this.draw = function() {
    ctx.fillStyle = config.appleColor
    ctx.font='900 18px "Font Awesome 5 Free"';
    ctx.fillText(this.icon ,this.x-8,this.y+5);
};
};

var _game = function() {
this.snake = new _snake(config.initialLength);
this.apple = new _apple(this.snake.elements);

this.update = function() {
    var add = {
    x: 0,
    y: 0
    };  
    
    keyboard.lastUsedKey = keyboard.keyPressed;
    switch (keyboard.keyPressed) {
    case "left":
        add.x = -20;
        break;
    case "up":
        add.y = -20;
        break;
    case "right":
        add.x = 20;
        break;
    case "down":
        add.y = 20;
        break;
    }
    
    if (this.snake.growCount > 0) {
    this.snake.growCount--;
    } else {
    this.snake.elements.shift();
    }
    
    this.snake.elements.push({
    x: this.snake.elements[this.snake.elements.length - 1].x,
    y: this.snake.elements[this.snake.elements.length - 1].y
    });
    this.snake.elements[this.snake.elements.length - 1].x += add.x;
    this.snake.elements[this.snake.elements.length - 1].y += add.y;
};

this.checkCollision = function() {

    if (this.snake.elements[this.snake.elements.length - 1].x <= 0 || this.snake.elements[this.snake.elements.length - 1].x >= config.w || this.snake.elements[this.snake.elements.length - 1].y <= 0 || this.snake.elements[this.snake.elements.length - 1].y >= config.h) {
    fail();
    }
    
    for (var i=0; i < this.snake.elements.length - 1; i++) {
    if (this.snake.elements[this.snake.elements.length - 1].x == this.snake.elements[i].x && this.snake.elements[this.snake.elements.length - 1].y == this.snake.elements[i].y) {
        fail();
    }
    }
    
    if (this.snake.elements[this.snake.elements.length - 1].x == this.apple.x && this.snake.elements[this.snake.elements.length - 1].y == this.apple.y) {
    sounds.eat.play();
    $("#title").addClass("bounceup");
    setTimeout(function() {
        $("#title").removeClass("bounceup");
    }, 500);
    this.snake.growCount += config.growAmount;
    this.apple = new _apple(this.snake.elements);
    $("#snakeCanvas").addClass("highlight");
    setTimeout(function() {
        $("#snakeCanvas").removeClass("highlight");
    },500);
    }
}

this.draw = function() {
    if (keyboard.anyKeyPressed == false) {
    return;
    }

    this.update();
    this.checkCollision();

    ctx.clearRect(0,0,config.w,config.h);

    ctx.fillStyle = "rgba(0,0,0,0.2)";
    ctx.font = "700 30px Montserrat";
    ctx.fillText(("00" + (this.snake.elements.length)).slice(-3), config.w - 90, 55);

    this.snake.draw();
    this.apple.draw();
};
};

function fail() {
sounds.fail.play();
$("#title").addClass("wobble");
$("#snakeCanvas").addClass("bounceup");
setTimeout(function() {
    $("#snakeCanvas").removeClass("bounceup");
    $("#title").removeClass("wobble");
}, 1000);
reset();
}

function reset() {
$("#tutorial").fadeIn();
canvas.width = config.w;
canvas.height = config.h;
clearInterval(interval);
keyboard = new _keyboard();
game = new _game();
interval = setInterval(function() {game.draw();}, 1000/config.speed);
}

(function() {
canvas = document.getElementById("snakeCanvas");
ctx = canvas.getContext("2d");
reset();
})();

(function() {
    // Config-Menu
    var gui = new dat.GUI({closeOnTop: true, width: 300});
    gui.close();
    gui.add(config, 'bodySize').min(4).step(2).max(30);
    gui.add(config, 'headSize').min(4).step(2).max(30);
    gui.add(config, 'growAmount').min(0).step(1).max(20);
    gui.add(config, 'initialLength').min(2).step(1).max(10).onFinishChange(reset);
    gui.add(config, 'startFull').onFinishChange(reset);
    gui.add(config, 'speed').min(3).step(1).max(25).onFinishChange(reset);
    gui.add(config, 'w').name("canvasWidth").min(500).step(20).max(1200).onFinishChange(reset);
    gui.add(config, 'h').name("canvasHeight").min(300).step(20).max(800).onFinishChange(reset);
    gui.addColor(config, 'bodyColor');
    gui.addColor(config, 'headColor');
    gui.addColor(config, 'appleColor');
})();
  