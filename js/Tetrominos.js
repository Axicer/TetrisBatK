class Tetrominos{

    constructor(matrix, x = 0, y = 0){
        this.matrix = matrix
        this.location = [x, y];
    }

    draw(){
        if(!areTilesLoaded())return;
        var canvas = document.getElementById("tetris_falling");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = (this.location[0] + x) * TILE_SIZE;
                    var coordY = (this.location[1] + y) * TILE_SIZE;
                    ctx.drawImage(RED_TILE, coordX, coordY);
                }
            }
        }
    }

    rotateLeft(){
        //TODO check for enough space from the voxel
        this.matrix.rotateCounterClockwise();
        this.draw();
    }

    rotateRight(){
        //TODO check for enough space from the voxel
        this.matrix.rotateClockwise();
        this.draw();
    }

    move(dx = 0 , dy = 0){
        this.location[0] += dx;
        this.location[1] += dy;
        this.draw();
    }
}
