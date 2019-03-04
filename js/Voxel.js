const SPEED_INCREASE_FACTOR = 1.1;
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

        //add lines completed count to the GUI
        var line_elem = document.getElementById("tetris_line_cleared");
        var lines = parseInt(line_elem.innerHTML)+linesCompleted.length;
        if(linesCompleted.length > 0)this.updateScore(linesCompleted.length);
        lines = this.checkLevel(lines);
        line_elem.innerHTML = lines;

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
        var score_elem = document.getElementById("tetris_score");
        var score = parseInt(score_elem.innerHTML);
        score += lines*1000;
        if(this.lastLineCompleted == lines){
            //back to back bonus (x1.5 instead of x1)
            score += lines*500;
        }
        this.lastLineCompleted = lines;
        score_elem.innerHTML = score;
    }

    getLevelName(level){
        if(this.level-1 < LEVELS_NAME.length){
            return LEVELS_NAME[this.level-1]
        }else{
            return LEVELS_NAME[LEVELS_NAME.length-1];
        }
    }

    checkLevel(lines){
        var tmp = lines/10;
        if(tmp >= 1.0){
            this.level++;
            var level_elem = document.getElementById("tetris_level");
            level_elem.innerHTML = this.level+ " (" + this.getLevelName() + ")";
            //give 10 lines to score as a level upgrade bonus
            this.updateScore(10);
            this.tetrominos.setGravityInterval(this.tetrominos.gravityTimeout/SPEED_INCREASE_FACTOR);
            return lines%10;
        }
        return lines;
    }
    /**
    *   Handle the keydown event
    */
    handleArrows(ev){
        if(this.ended)return;
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
        }else if(ev.keyCode == 90){
            //shift
            //TODO keep touch
        }
    }

    end(){
        if(!this.ended){
            console.log("fin du jeu !");
            this.ended = true;
        }
    }
}
