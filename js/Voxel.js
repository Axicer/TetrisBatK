const SPEED_INCREASE_FACTOR = 1.25;

const SINGLE = "single";
const DOUBLE = "double";
const TRIPLE = "triple";
const TETRIS = "tetris";
const T_SPIN_MINI_NO_LINES = "tspinmininolines";
const T_SPIN_NO_LINES = "tspinnolines";
const T_SPIN_MINI_SINGLE = "tspinminisingle";
const T_SPIN_SINGLE = "tspinsingle";
const T_SPIN_MINI_DOUBLE = "tspinminidouble";
const T_SPIN_DOUBLE = "tspindouble";
const T_SPIN_TRIPLE = "tspintriple";

const LEVELS_NAME = ["Cafeteria",
                    "Bureau de Mr MARIE-JEANNE",
                    "Bureau de Mr GARCIA",
                    "Amphi",
                    "Cour de POO",
                    "Cour de Math",
                    "Cour de Communication",
                    "Bureau de Mme MESSAOUI",
                    "Cour de BDD",
                    "Cour de Modelisation",
                    "Bureau de Mr JOANNIDES",
                    "Bureau de Mme BELLAHSENE",
                    "Projets S3 de Mr Molnar"];


class Voxel{

    constructor(width = 10, height = 20){
        this.canvas = document.getElementById("tetris_canvas");
        this.width = width;
        this.height = height;
        this.content = new Array(height);
        for (var i = 0 ; i < height ; i++)this.content[i]=new Array(width);
        this.ctx = this.canvas.getContext("2d");
        //set color to black
        this.ctx.fillStyle = "#000000";
        //set canvas black
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.level = 1;
        this.lastLineCompleted = -1;
        this.paused = false;
        this.ended = false;

        //spawn a tetrominos
        this.tetrominos = new Tetrominos(this);
        this.tetrominos.draw();
    }

    draw(){
        this.clear();
        for(var y = this.content.length-1 ; y >= 0 ; y--){
            for(var x = 0 ; x < this.content[y].length ; x++){
                var tile = this.content[y][x];
                if(tile != null){
                    var coordX = x * TILE_SIZE;
                    var coordY = y * TILE_SIZE;
                    this.ctx.drawImage(tile, coordX, coordY);
                }
            }
        }
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    isInside(x, y){
        return !(x < 0 || x >= this.width || y < 0 || y >= this.height);
    }
    isOutsideTop(x, y){
        return y < 0;
    }
    isOutsideBottom(x, y){
        return y >= this.height;
    }

    get(x, y){
        return this.isInside(x, y) ? this.content[y][x] : null;
    }

    set(x, y, tile){
        if(this.isInside(x, y)){
            this.content[y][x] = tile;
        }
        this.draw();
    }

    checkLines(){
        //get all lines completed as an array of line's number
        var linesCompleted = [];
        for(var y = this.content.length-1 ; y >= 0 ; y--){
            var completed = true;
            for(var x = 0 ; x < this.content[y].length ; x++){
                completed = this.content[y][x] != null;
                if(!completed)break;
            }
            if(completed){
                linesCompleted.push(y);
            }
        }
        var lines = linesCompleted.length;
        this.updateScore(lines);


        //add lines completed count to the GUI
        var line_elem = document.getElementById("tetris_line_cleared");
        var old_lines = parseInt(line_elem.innerHTML);
        old_lines += lines;
        old_lines = this.checkLevel(old_lines);
        line_elem.innerHTML = old_lines;

        //clear full lines
        for(var i = 0 ; i < linesCompleted.length ; i++){
            //shift all above lines by one
            var currentLine = linesCompleted[i];
            //for each line after, if they are above, decrement by 1
            for(var l = i+1 ; l < linesCompleted.length ; l++){
                if(linesCompleted[l] < currentLine){
                    linesCompleted[l]++;
                }
            }
            for(var line = currentLine ; line >= 0 ; line--){
                if(line == 0){
                    this.content[line] = new Array(this.width);
                }else{
                    this.content[line] = this.content[line-1];
                }
            }
            this.draw();
        }
    }

    updateScore(lines){
        var score = 0;
        var canB2B = false;
        var beforeAction = this.lastAction;
        //if last action is a T-Spin
        if(this.tetrominos.lastActionWasTSpin){
            if(this.tetrominos.lastRotationHasWallKick){
                //tspin standard
                switch(lines){
                    case 0: //tspin no line
                        score += 400*this.level;
                        this.lastAction = T_SPIN_NO_LINES;
                        this.shout("T-Spin !", 800);
                        break;
                    case 1:// tspin single
                        score += 800*this.level;
                        this.lastAction = T_SPIN_SINGLE;
                        this.shout("T-Spin Single !", 800);
                        canB2B = true;
                        break;
                    case 2:// tspin double
                        score += 1200*this.level;
                        this.lastAction = T_SPIN_DOUBLE;
                        this.shout("T-Spin Double !", 800);
                        canB2B = true;
                        break;
                    case 3://tspin triple
                        score += 1600*this.level;
                        this.lastAction = T_SPIN_TRIPLE;
                        this.shout("T-Spin Triple !", 800);
                        canB2B = true;
                        break;
                    default:break;
                }
            }else{
                //tspin mini
                switch(lines){
                    case 0: //tspin mini no line
                        score += 100*this.level;
                        this.lastAction = T_SPIN_MINI_NO_LINES;
                        this.shout("Mini T-Spin !", 800);
                        break;
                    case 1:// tspin mini single
                        score += 200*this.level;
                        this.lastAction = T_SPIN_MINI_SINGLE;
                        this.shout("Mini T-Spin Single !", 800);
                        break;
                    case 2://tspin mini double
                        score += 400*this.level;
                        this.lastAction = T_SPIN_MINI_DOUBLE;
                        this.shout("Mini T-Spin Double !", 800);
                        break;
                    default:break;
                }
            }
        }else{
            switch (lines) {
                case 1://single
                    score += 100*this.level;
                    this.lastAction = SINGLE;
                    break;
                case 2://double
                    score += 300*this.level;
                    this.lastAction = DOUBLE;
                    break;
                case 3://triple
                    score += 500*this.level;
                    this.lastAction = TRIPLE;
                    break;
                case 4://tetris
                    score += 800*this.level;
                    this.lastAction = TETRIS;
                    this.shout("Tetris !", 800);
                    canB2B = true;
                    break;
                default:break;
            }
        }
        if(canB2B &&
            (beforeAction == T_SPIN_SINGLE ||
            beforeAction == T_SPIN_DOUBLE ||
            beforeAction == T_SPIN_TRIPLE ||
            beforeAction == TETRIS)){
            //it's back to back
            this.shout("BACK-TO-BACK !", 800, "b2b");
            score *= 3.0/2.0;
        }

        //update display
        var score_elem = document.getElementById("tetris_score");
        var old_score = parseInt(score_elem.innerHTML);
        old_score += score;
        score_elem.innerHTML = old_score;
    }

    shout(message, millis, divId = "shout"){
        var shout_elem = document.getElementById(divId);
        shout_elem.innerHTML = message;
        shout_elem.style.visibility = "visible";
        setTimeout((function(elem, self){
            return function(){
                elem.style.visibility = "hidden";
            }
        })(shout_elem, this), millis);
    }

    getLevelName(level){
        if(this.level-1 < LEVELS_NAME.length){
            return LEVELS_NAME[this.level-1]
        }else{
            return LEVELS_NAME[LEVELS_NAME.length-1];
        }
    }

    checkLevel(lines){
        if(lines >= 10){
            this.level++;
            var level_elem = document.getElementById("tetris_level");
            level_elem.innerHTML = this.level+ " (" + this.getLevelName() + ")";
            this.tetrominos.setGravityInterval(this.tetrominos.gravityTimeout/SPEED_INCREASE_FACTOR);
            return lines%10;
        }
        return lines;
    }


    handleArrows(ev){
        if(ev.keyCode == 27){
            //escape
            this.pause();
        }
        if(this.ended || this.paused)return;
        if(ev.keyCode == 37){
            //left
            this.tetrominos.move(-1, 0);
        }else if(ev.keyCode == 38){
            //up
            this.tetrominos.rotateRight();
        }else if(ev.keyCode == 39){
            //right
            this.tetrominos.move(1, 0);
        }else if(ev.keyCode == 40){
            //down
            this.tetrominos.move(0, 1);
        }else if(ev.keyCode == 32){
            //space
            this.tetrominos.hardDrop();
        }else if(ev.keyCode == 90){
            //Z
            this.tetrominos.rotateLeft();
        }else if(ev.keyCode == 16){
            //shift
            this.tetrominos.swapTetrominos();
        }
    }

    pause(){
        if(this.ended)return;
        if(this.paused){
            this.tetrominos.setGravityInterval(this.tetrominos.gravityTimeout);
            document.getElementById("pause").style.visibility = "hidden";
        }else{
            clearInterval(this.tetrominos.gravityInterval);
            this.tetrominos.cancelLockTimeout();
            document.getElementById("pause").style.visibility = "visible";
        }
        this.paused = !this.paused;
    }

    end(){
        if(!this.ended){
            console.log("fin du jeu !");
            this.ended = true;
            var restart_btn = document.getElementById("restart_btn");
            restart_btn.style.visibility = "visible";
        }
    }
}
