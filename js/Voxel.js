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

        this.ended = false;

        //spawn a tetrominos
        this.tetrominos = new Tetrominos(this);
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



        for(var i = 0 ; i < linesCompleted.length ; i++){
            //shift all above lines by one
            var currentLine = linesCompleted[i];
            //for each line after, if they are above, decrement by 1
            for(var l = i+1 ; l < linesCompleted.length ; l++){
                if(linesCompleted[l] < currentLine){
                    linesCompleted[l]++;
                }
            }
            console.log("found line "+currentLine+" completed");
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
        console.log("fin du jeu !");
        this.ended = true;
    }
}
