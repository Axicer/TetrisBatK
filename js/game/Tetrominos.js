class Tetrominos{

    constructor(game, falling_canvas, next_canvas, hold_canvas){
        this.loader = game.loader;
        this.game = game;

        this.falling_canvas = falling_canvas;
        this.next_canvas = next_canvas;
        this.hold_canvas = hold_canvas;

        //the spawner of tetrominos
        this.spawner = new Spawner(game.loader);
        //the next tetrominos wich will spawn
        this.next = this.spawner.get();
        //the swap tetrominos (null at initialisation)
        this.swap = null;

        this.checkTimeout = -1;
        //set matrix, tile, and position from this.next
        this.reset(this);
        //start gravity
        this.setGravityInterval(1000, this);
    }

    setGravityInterval(millis, self){
        //set the timeout
        self.gravityTimeout = millis
        //if the timeout is already running, clear the interval
        if(self.gravityInterval != null)clearInterval(self.gravityInterval);
        //set the interval
        self.gravityInterval = setInterval((function(self){
            return function(){
                //apply gravity
                self.gravity(self);
            }
        })(self), this.gravityTimeout);
    }

    swapTetrominos(self){
        //if swap has already occurs then return
        if(self.hasSwapped)return;
        if(self.swap == null){
            //swap slot is empty
            //set swap to current tetrominos
            self.swap = {matrix:self.matrix, tile:self.tile, name:self.name, rotationState:self.rotationState};
            //spawn the next tetrominos
            self.reset(self);
        }else{
            //swap the current tetrominos and the swap slot
            var tmp = self.swap;
            self.swap = {matrix:self.matrix, tile:self.tile, name:self.name, rotationState:self.rotationState};
            self.matrix = self.matrix;
            self.tile = self.tile;
            self.name = self.name;
            self.rotationState = tmp.rotationState;
            //reset the location
            self.location = [parseInt(self.game.voxel.width/2)-2, -1];
        }
        this.hasSwapped = true;
        this.draw(self);
    }

    reset(self){
        self.matrix = self.next.matrix;
        self.tile = self.next.tile;
        self.name = self.next.name;
        self.rotationState = 0;
        self.next = self.spawner.get();
        self.location = [parseInt(self.game.voxel.width/2)-2, -1];
    }

    gravity(self){
        //move 1 down
        self.move(0, 1, false, self);

        if(self.checkLock(false, self)){
            self.resetLockTimeout(self);
        }
    }

    cancelLockTimeout(self){
        if(self.checkTimeout != -1){
            clearTimeout(self.checkTimeout);
            self.checkTimeout = -1;
        }
    }

    resetLockTimeout(self){
        if(self.checkTimeout != -1)return;

        self.checkTimeout = setTimeout((function(self){
            return function(){
                self.checkLock(true, self);
                self.checkTimeout = -1;
            }
        })(self), 500);
    }

    checkLock(action = true, self){
        for(var y = 0 ; y < self.matrix.tab.length ; y++){
            for(var x = 0 ; x < self.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
<<<<<<< HEAD
                    var coordX = self.location[0]+x;
                    var coordY = self.location[1]+y;
                    if(self.game.voxel.isOutsideTop(coordX, coordY+1) ||
                        self.game.voxel.isOutsideBottom(coordX, coordY+1) ||
                        self.game.voxel.get(coordX, coordY+1) != null){
=======
                    var coordX = this.location[0]+x;
                    var coordY = this.location[1]+y;
                    if(this.game.voxel.isOutsideBottom(coordX, coordY+1) ||
                        this.game.voxel.get(coordX, coordY+1) != null){
>>>>>>> b6e585910c5ac4bd38e00d78bf42aa8547ecd0ac
                        if(action){
                            //lock the tetrominos to the voxel
                            self.lock(self);
                            self.game.voxel.checkLines();
                            //reset tetrominos
                            self.hasSwapped = false;
                            self.reset(self);
                            self.draw(self);
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

    clearAll(self){
      var main_ctx = self.falling_canvas.getContext("2d");
      var next_ctx = self.next_canvas.getContext("2d");
      var hold_ctx = self.hold_canvas.getContext("2d");

      main_ctx.clearRect(0,0,self.falling_canvas.width, self.falling_canvas.height);
      next_ctx.clearRect(0,0,self.next_canvas.width, self.next_canvas.height);
      hold_ctx.clearRect(0,0,self.hold_canvas.width, self.hold_canvas.height);
    }

    draw(self){
        //clear the canvas
        var ctx = self.falling_canvas.getContext("2d");
        ctx.clearRect(0, 0, self.falling_canvas.width, self.falling_canvas.height);

        //draw the piece
        for(var y = 0 ; y < self.matrix.tab.length ; y++){
            for(var x = 0 ; x < self.matrix.tab[y].length ; x++){
                if(this.matrix.tab[y][x] == 1){
                    var coordX = (self.location[0] + x) * TILE_SIZE;
                    var coordY = (self.location[1] + y) * TILE_SIZE;
                    ctx.drawImage(self.tile, coordX, coordY);
                }
            }
        }

        //get preview position
        var previewCoordX = this.location[0];
        var previewCoordY = this.location[1];
        var canFall = true;
        while(canFall){
            for(var y = 0 ; y < self.matrix.tab.length ; y++){
                for(var x = 0 ; x < self.matrix.tab[y].length ; x++){
                    if(this.matrix.tab[y][x] == 1){
                        var coordX = previewCoordX + x;
                        var coordY = previewCoordY + y + 1;
                        if(self.game.voxel.get(coordX, coordY) != null ||
                            !self.game.voxel.isInside(coordX, coordY)){
                            canFall = false;
                        }
                    }
                }
            }
            if(canFall)previewCoordY++;
        }


        //draw preview
        ctx.globalAlpha = 0.5;
        for(var y = 0 ; y < self.matrix.tab.length ; y++){
            for(var x = 0 ; x < self.matrix.tab[y].length ; x++){
                if(self.matrix.tab[y][x] == 1){
                    var coordX = (previewCoordX + x) * TILE_SIZE;
                    var coordY = (previewCoordY + y) * TILE_SIZE;
                    ctx.drawImage(self.tile, coordX, coordY);
                }
            }
        }
        ctx.globalAlpha = 1.0;

        //draw next preview
        var next_ctx = self.next_canvas.getContext("2d");
        next_ctx.clearRect(0, 0, self.next_canvas.width, self.next_canvas.height);
        for(var y = 0 ; y < self.next.matrix.tab.length ; y++){
            for(var x = 0 ; x < self.next.matrix.tab[y].length ; x++){
                if(self.next.matrix.tab[y][x] == 1){
                    var nextCoordX = (x+(4-self.next.matrix.tab.length)/2)*TILE_SIZE;
                    var nextCoordY = (y+(4-self.next.matrix.tab[y].length)/2)*TILE_SIZE;
                    next_ctx.drawImage(self.next.tile, nextCoordX, nextCoordY);
                }
            }
        }

        //draw stored preview
        if(this.swap != null){
            var stored_ctx = self.hold_canvas.getContext("2d");
            stored_ctx.clearRect(0, 0, self.hold_canvas.width, self.hold_canvas.height);
            for(var y = 0 ; y < self.swap.matrix.tab.length ; y++){
                for(var x = 0 ; x < self.swap.matrix.tab[y].length ; x++){
                    if(self.swap.matrix.tab[y][x] == 1){
                        var swapCoordX = (x+(4-self.swap.matrix.tab.length)/2)*TILE_SIZE;
                        var swapCoordY = (y+(4-self.swap.matrix.tab[y].length)/2)*TILE_SIZE;
                        stored_ctx.drawImage(self.swap.tile, swapCoordX, swapCoordY);
                    }
                }
            }
        }

    }

    lock(self){
        self.loader.getEffect(EFFECT_PLACE).play();
        var corner_count = 0;
        for(var y = 0 ; y < self.matrix.tab.length ; y++){
            for(var x = 0 ; x < self.matrix.tab[y].length ; x++){
                if(self.matrix.tab[y][x] == 1){
                    var coordX = self.location[0] + x;
                    var coordY = self.location[1] + y;
                    //if there is already a piece
                    if(self.game.voxel.get(coordX, coordY) != null){
                        //stop the gravity & check loop
                        clearInterval(self.gravityInterval);
                        clearTimeout(self.checkTimeout);
                        //end the game
                        self.game.end();
                        return;
                    }else{
                        //put the piece
                        self.game.voxel.set(self.location[0]+x, self.location[1]+y, self.tile);
                    }
                }else if(self.name == "T" && x != 1 && y != 1){ //if the piece is a T and only if it's a corner
                    var coordX = self.location[0] + x;
                    var coordY = self.location[1] + y;
                    if(self.game.voxel.get(coordX, coordY) != null || !self.game.voxel.isInside(coordX, coordY)){
                        corner_count++;
                    }
                }
            }
        }
        self.lastActionWasTSpin = corner_count >= 3 && self.hasRotated;
    }

    rotateLeft(self){
        var res = findRotation(self, mod(this.rotationState-1, 4), false);
        if(res == null)return;
        self.hasRotated = true;
        self.loader.getEffect(EFFECT_MOVEMENT).play();
        self.lastRotationHasWallKick = res[1] != 0 || res[2] != 0;
        self.cancelLockTimeout(self);
        self.resetLockTimeout(self);
        self.rotationState = mod(this.rotationState-1, 4);
        self.matrix = res[0];
        self.location[0] += res[1];
        self.location[1] += res[2];
        self.draw(self);
    }

    rotateRight(self){
        var res = findRotation(self, mod(this.rotationState+1, 4), true);
        if(res == null)return;
        self.hasRotated = true;
        self.loader.getEffect(EFFECT_MOVEMENT).play();
        self.lastRotationHasWallKick = res[1] != 0 || res[2] != 0;
        self.cancelLockTimeout(self);
        self.resetLockTimeout(self);
        self.rotationState = mod(this.rotationState+1, 4);
        self.matrix = res[0];
        self.location[0] += res[1];
        self.location[1] += res[2];
        self.draw(self);
    }

    move(dx = 0 , dy = 0, sound = true, self){
        if(!self.isOOB(dx, dy, null, self) && !self.alreadyContainsData(dx, dy, null, self)){
            if(sound){
                self.loader.getEffect(EFFECT_MOVEMENT).play();
                self.cancelLockTimeout(self);
                self.resetLockTimeout(self);
            }
            self.hasRotated = false;
            self.location[0] += dx;
            self.location[1] += dy;
            self.draw(self);
            return true;
        }
        return false;
    }

    isOOB(dx, dy, mat = null, self){
        if(mat == null)mat = self.matrix;
        for(var y = 0 ; y < mat.tab.length ; y++){
            for(var x = 0 ; x < mat.tab[y].length ; x++){
                if(mat.tab[y][x] == 1){
<<<<<<< HEAD
                    var coordX = self.location[0] + x + dx;
                    var coordY = self.location[1] + y + dy;
                    if(!self.game.voxel.isInside(coordX, coordY) && !self.game.voxel.isOutsideTop(coordX, coordY)){
=======
                    var coordX = this.location[0] + x + dx;
                    var coordY = this.location[1] + y + dy;

                    var oobBot = this.game.voxel.isOutsideBottom(coordX, coordY);
                    var oobLeft = this.game.voxel.isOutsideLeft(coordX, coordY);
                    var oobRight = this.game.voxel.isOutsideRight(coordX, coordY);

                    if(oobBot || oobLeft || oobRight){
>>>>>>> b6e585910c5ac4bd38e00d78bf42aa8547ecd0ac
                        return true;
                    }
                }
            }
        }
        return false;
    }

    alreadyContainsData(dx, dy, mat = null, self){
        if(mat == null)mat = self.matrix;
        for(var y = 0 ; y < mat.tab.length ; y++){
            for(var x = 0 ; x < mat.tab[y].length ; x++){
                if(mat.tab[y][x] == 1){
                    var coordX = self.location[0] + x + dx;
                    var coordY = self.location[1] + y + dy;
                    if(self.game.voxel.get(coordX, coordY) != null){
                        return true;
                    }
                }
            }
        }
        return false;
    }



    hardDrop(self){
        self.loader.getEffect(EFFECT_HARD_DROP).play();
        while(self.move(0, 1, false, self)){}
        self.checkLock(true, self);
    }
}
