/**
*   The falling tetrominos class
*/
class Tetrominos{

    /**
    *   Create the Tetrominos with his patter and a position
    */
    constructor(voxel){
        this.voxel = voxel;
        this.reset();
        this.gravityInterval = setInterval((function(self){
            return function(){
                //apply gravity
                self.gravity();
                //check for fix later
                setTimeout((function(self){
                    return function(){
                        self.checkFix();
                    }
                })(self), 500);
            }
        })(this), 800);
    }

    reset(){
        this.matrix = TETROMINOS_MATRICES[parseInt(Math.random()*TETROMINOS_MATRICES.length)];
        this.tile = RED_TILE;
        this.location = [parseInt(this.voxel.width/2)-2, 0];
    }

    gravity(){
        this.move(0, 1);
    }

    checkFix(){
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    if(this.location[1]+y+1 >= this.voxel.height ||
                        this.voxel.get(this.location[0]+x, this.location[1]+y+1) != null){
                        //attach the tetrominos to the voxel
                        this.attach();
                        this.voxel.checkLines();
                        //reset tetrominos
                        this.reset();
                        this.draw();
                        break;
                    }
                }
            }
        }
    }

    /**
    *   draw the tetrominos at his actual place
    */
    draw(){
        //only draw if the tiles are loaded
        if(!areTilesLoaded())return;

        //clear the canvas
        var canvas = document.getElementById("tetris_falling");
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        //draw the piece
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = (this.location[0] + x) * TILE_SIZE;
                    var coordY = (this.location[1] + y) * TILE_SIZE;
                    ctx.drawImage(this.tile, coordX, coordY);
                }
            }
        }
    }

    attach(){
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = this.location[0] + x;
                    var coordY = this.location[1] + y;
                    //if there is already a piece
                    if(this.voxel.get(coordX, coordY) != null){
                        //stop the gravity & check loop
                        clearInterval(this.gravityInterval);
                        //end the game
                        this.voxel.end();
                    }else{
                        //put the piece
                        this.voxel.set(this.location[0]+x, this.location[1]+y, this.tile);
                    }
                }
            }
        }
    }

    /**
    *   Rotate the tetrominos to the left
    */
    rotateLeft(){
        //TODO check for enough space from the voxel
        this.matrix.rotateCounterClockwise();
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = this.location[0] + x;
                    var coordY = this.location[1] + y;
                    if(!this.voxel.isInside(coordX, coordY) ||
                        this.voxel.get(coordX, coordY) != null){
                        this.matrix.rotateClockwise();
                        break;
                    }
                }
            }
        }
        this.draw();
    }

    /**
    *   Rotate the tetrominos to the right
    */
    rotateRight(){
        //TODO check for enough space from the voxel
        this.matrix.rotateClockwise();
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = this.location[0] + x;
                    var coordY = this.location[1] + y;
                    if(!this.voxel.isInside(coordX, coordY) ||
                        this.voxel.get(coordX, coordY) != null){
                        this.matrix.rotateCounterClockwise();
                        break;
                    }
                }
            }
        }
        this.draw();
    }

    /**
    *   Move the tetrominos
    */
    move(dx = 0 , dy = 0){
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = this.location[0] + x + dx;
                    var coordY = this.location[1] + y + dy;
                    if(this.voxel.get(coordX, coordY) != null ||
                        !this.voxel.isInside(coordX, coordY)){
                        return false;
                    }
                }
            }
        }
        this.location[0] += dx;
        this.location[1] += dy;
        this.draw();
        return true;
    }

    hardDrop(){
        while(this.move(0, 1)){}
        this.checkFix();
    }
}
