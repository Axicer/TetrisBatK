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
        this.setGravityInterval(1000);
    }

    setGravityInterval(millis){
        //set the timeout
        this.gravityTimeout = millis
        //if the timeout is already running, clear the interval
        if(this.gravityInterval != null)clearInterval(this.gravityInterval);
        //set the interval
        this.gravityInterval = setInterval((function(self){
            return function(){
                //apply gravity
                self.gravity();
                //check for fix later
                setTimeout((function(self){
                    return function(){
                        self.checkFix();
                    }
                })(self), 1000);
            }
        })(this), this.gravityTimeout);
    }

    reset(){
        var pair = TETROMINOSES.poses[parseInt(Math.random()*TETROMINOSES.poses.length)];
        this.matrix = pair.matrix;
        this.tile = pair.tile;
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

        //get preview position
        var previewCoordX = this.location[0];
        var previewCoordY = this.location[1];
        var canFall = true;
        while(canFall){
            for(var y = 0 ; y < this.matrix.tab.length ; y++){
                for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                    if(this.matrix.tab[y][x] == 1){
                        var coordX = previewCoordX + x;
                        var coordY = previewCoordY + y + 2;
                        if(this.voxel.get(coordX, coordY) != null ||
                            !this.voxel.isInside(coordX, coordY)){
                            canFall = false;
                        }
                    }
                }
            }
            previewCoordY++;
        }
        //draw preview
        ctx.globalAlpha = 0.5;
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = (previewCoordX + x) * TILE_SIZE;
                    var coordY = (previewCoordY + y) * TILE_SIZE;
                    ctx.drawImage(this.tile, coordX, coordY);
                }
            }
        }
        ctx.globalAlpha = 1.0;
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
                        break;
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
