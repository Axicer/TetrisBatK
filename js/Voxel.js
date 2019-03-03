class Voxel{

    constructor(width = 10, height = 20){
        var canvas = document.getElementById("tetris_canvas");
        this.width = width;
        this.height = height;
        this.content = new Array(height);
        for (var i = 0 ; i < height ; i++)this.content[i]=new Array(width);
        this.ctx = canvas.getContext("2d");
        //set color to black
        this.ctx.fillStyle = "#000000";
        //set canvas black
        this.ctx.fillRect(0, 0, canvas.width, canvas.height);

        //spawn a tetrominos
        this.tetrominos = new Tetrominos(this);
    }

    clear(){
        this.content = new Array(height);
        for (var i = 0 ; i < height ; i++)this.content[i]=new Array(width);
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
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
            var coordX = x * TILE_SIZE;
            var coordY = y * TILE_SIZE;
            this.ctx.drawImage(tile, coordX, coordY);
        }
    }

    /**
    *   Handle the keydown event
    */
    handleArrows(ev){
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
            //TODO hard drop
        }else if(ev.keyCode == 90){
            //Z
            this.tetrominos.rotateLeft();
        }else if(ev.keyCode == 90){
            //shift
            //TODO keep touch
        }
    }
}
