class Tetrominos{

    constructor(game){
        this.loader = game.loader;
        this.game = game;
        //the spawner of tetrominos
        this.spawner = new Spawner(game.loader);
        //the next tetrominos wich will spawn
        this.next = this.spawner.get();
        //the swap tetrominos (null at initialisation)
        this.swap = null;

        this.checkTimeout = -1;
        //set matrix, tile, and position from this.next
        this.reset();
        //start gravity
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
            }
        })(this), this.gravityTimeout);
    }

    swapTetrominos(){
        //if swap has already occurs then return
        if(this.hasSwapped)return;
        if(this.swap == null){
            //swap slot is empty
            //set swap to current tetrominos
            this.swap = {matrix:this.matrix, tile:this.tile, name:this.name, rotationState:this.rotationState};
            //spawn the next tetrominos
            this.reset();
        }else{
            //swap the current tetrominos and the swap slot
            var tmp = this.swap;
            this.swap = {matrix:this.matrix, tile:this.tile, name:this.name, rotationState:this.rotationState};
            this.matrix = tmp.matrix;
            this.tile = tmp.tile;
            this.name = tmp.name;
            this.rotationState = tmp.rotationState;
            //reset the location
            this.location = [parseInt(this.game.voxel.width/2)-2, -1];
        }
        this.hasSwapped = true;
        this.draw();
    }

    reset(){
        this.matrix = this.next.matrix;
        this.tile = this.next.tile;
        this.name = this.next.name;
        this.rotationState = 0;
        this.next = this.spawner.get();
        this.location = [parseInt(this.game.voxel.width/2)-2, -1];
    }

    gravity(){
        //move 1 down
        this.move(0, 1, false);

        if(this.checkLock(0,0, false)){
            this.resetLockTimeout();
        }
    }

    cancelLockTimeout(){
        if(this.checkTimeout != -1){
            clearTimeout(this.checkTimeout);
            this.checkTimeout = -1;
        }
    }

    resetLockTimeout(){
        if(this.checkTimeout != -1)return;

        this.checkTimeout = setTimeout((function(self){
            return function(){
                self.checkLock();
                self.checkTimeout = -1;
            }
        })(this), 500);
    }

    checkLock(action = true){
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = this.location[0]+x;
                    var coordY = this.location[1]+y;
                    if(this.game.voxel.isOutsideTop(coordX, coordY+1) ||
                        this.game.voxel.isOutsideBottom(coordX, coordY+1) ||
                        this.game.voxel.get(coordX, coordY+1) != null){
                        if(action){
                            //lock the tetrominos to the voxel
                            this.lock();
                            this.game.voxel.checkLines();
                            //reset tetrominos
                            this.hasSwapped = false;
                            this.reset();
                            this.draw();
                            return;
                        }else{
                            return true;
                        }
                    }
                }
            }
        }
        if(!action)return false;
    }

    clearAll(){
      var main_canvas = document.getElementById("tetris_falling");
      var main_ctx = main_canvas.getContext("2d");
      var next_canvas = document.getElementById("tetris_next_tetrominos");
      var next_ctx = next_canvas.getContext("2d");
      var stored_canvas = document.getElementById("tetris_stored_tetrominos");
      var stored_ctx = stored_canvas.getContext("2d");

      main_ctx.clearRect(0,0,main_canvas.width, main_canvas.height);
      next_ctx.clearRect(0,0,next_canvas.width, next_canvas.height);
      stored_ctx.clearRect(0,0,stored_canvas.width, stored_canvas.height);
    }

    draw(){
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
                        var coordY = previewCoordY + y + 1;
                        if(this.game.voxel.get(coordX, coordY) != null ||
                            !this.game.voxel.isInside(coordX, coordY)){
                            canFall = false;
                        }
                    }
                }
            }
            if(canFall)previewCoordY++;
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

        //draw next preview
        var next_elem = document.getElementById("tetris_next_tetrominos");
        var next_ctx = next_elem.getContext("2d");
        next_ctx.clearRect(0, 0, next_elem.width, next_elem.height);
        for(var y = 0 ; y < this.next.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.next.matrix.tab[y].length ; x++){
                if(this.next.matrix.tab[y][x] == 1){
                    var nextCoordX = (x+(4-this.next.matrix.tab.length)/2)*TILE_SIZE;
                    var nextCoordY = (y+(4-this.next.matrix.tab[y].length)/2)*TILE_SIZE;
                    next_ctx.drawImage(this.next.tile, nextCoordX, nextCoordY);
                }
            }
        }

        //draw stored preview
        if(this.swap != null){
            var stored_elem = document.getElementById("tetris_stored_tetrominos");
            var stored_ctx = stored_elem.getContext("2d");
            stored_ctx.clearRect(0, 0, stored_elem.width, stored_elem.height);
            for(var y = 0 ; y < this.swap.matrix.tab.length ; y++){
                for(var x = 0 ; x < this.swap.matrix.tab[y].length ; x++){
                    if(this.swap.matrix.tab[y][x] == 1){
                        var swapCoordX = (x+(4-this.swap.matrix.tab.length)/2)*TILE_SIZE;
                        var swapCoordY = (y+(4-this.swap.matrix.tab[y].length)/2)*TILE_SIZE;
                        stored_ctx.drawImage(this.swap.tile, swapCoordX, swapCoordY);
                    }
                }
            }
        }

    }

    lock(){
        this.loader.getEffect(EFFECT_PLACE).play();
        var corner_count = 0;
        for(var y = 0 ; y < this.matrix.tab.length ; y++){
            for(var x = 0 ; x < this.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = this.location[0] + x;
                    var coordY = this.location[1] + y;
                    //if there is already a piece
                    if(this.game.voxel.get(coordX, coordY) != null){
                        //stop the gravity & check loop
                        clearInterval(this.gravityInterval);
                        clearTimeout(this.checkTimeout);
                        //end the game
                        this.game.end();
                        return;
                    }else{
                        //put the piece
                        this.game.voxel.set(this.location[0]+x, this.location[1]+y, this.tile);
                    }
                }else if(this.name == "T" && x != 1 && y != 1){ //if the piece is a T and only if it's a corner
                    var coordX = this.location[0] + x;
                    var coordY = this.location[1] + y;
                    if(this.game.voxel.get(coordX, coordY) != null || !this.game.voxel.isInside(coordX, coordY)){
                        corner_count++;
                    }
                }
            }
        }
        this.lastActionWasTSpin = corner_count >= 3 && this.hasRotated;
    }

    rotateLeft(){
        var res = findRotation(this, mod(this.rotationState-1, 4), false);
        if(res == null)return;
        this.hasRotated = true;
        this.loader.getEffect(EFFECT_MOVEMENT).play();
        this.lastRotationHasWallKick = res[1] != 0 || res[2] != 0;
        this.cancelLockTimeout();
        this.resetLockTimeout();
        this.rotationState = mod(this.rotationState-1, 4);
        this.matrix = res[0];
        this.location[0] += res[1];
        this.location[1] += res[2];
        this.draw();
    }

    rotateRight(){
        var res = findRotation(this, mod(this.rotationState+1, 4), true);
        if(res == null)return;
        this.hasRotated = true;
        this.loader.getEffect(EFFECT_MOVEMENT).play();
        this.lastRotationHasWallKick = res[1] != 0 || res[2] != 0;
        this.cancelLockTimeout();
        this.resetLockTimeout();
        this.rotationState = mod(this.rotationState+1, 4);
        this.matrix = res[0];
        this.location[0] += res[1];
        this.location[1] += res[2];
        this.draw();
    }

    move(dx = 0 , dy = 0, sound = true){
        if(!this.isOOB(dx, dy) && !this.alreadyContainsData(dx, dy)){
            if(sound){
                this.loader.getEffect(EFFECT_MOVEMENT).play();
                this.cancelLockTimeout();
                this.resetLockTimeout();
            }
            this.hasRotated = false;
            this.location[0] += dx;
            this.location[1] += dy;
            this.draw();
            return true;
        }
        return false;
    }

    isOOB(dx, dy, mat = null){
        if(mat == null)mat = this.matrix;
        for(var y = 0 ; y < mat.tab.length ; y++){
            for(var x = 0 ; x < mat.tab[y].length ; x++){
                if(mat.tab[y][x] == 1){
                    var coordX = this.location[0] + x + dx;
                    var coordY = this.location[1] + y + dy;
                    if(!this.game.voxel.isInside(coordX, coordY) && !this.game.voxel.isOutsideTop(coordX, coordY)){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    alreadyContainsData(dx, dy, mat = null){
        if(mat == null)mat = this.matrix;
        for(var y = 0 ; y < mat.tab.length ; y++){
            for(var x = 0 ; x < mat.tab[y].length ; x++){
                if(mat.tab[y][x] == 1){
                    var coordX = this.location[0] + x + dx;
                    var coordY = this.location[1] + y + dy;
                    if(this.game.voxel.get(coordX, coordY) != null){
                        return true;
                    }
                }
            }
        }
        return false;
    }



    hardDrop(){
        this.loader.getEffect(EFFECT_HARD_DROP).play();
        while(this.move(0, 1, false)){}
        this.checkLock();
    }
}
