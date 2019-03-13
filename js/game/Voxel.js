class Voxel{

    constructor(game, width = 10, height = 20){
        this.game = game;

        this.canvas = document.getElementById("tetris_canvas");
        this.width = width;
        this.height = height;
        this.content = new Array(height);
        for (var i = 0 ; i < height ; i++)this.content[i]=new Array(width);
        this.ctx = this.canvas.getContext("2d");
        this.clear();
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
        this.ctx.fillStyle = "#00000099";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "#000000";
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
        this.game.scoring.updateScore(lines);

        //add lines completed count to the GUI and check level
        this.game.leveling.updateLines(lines);

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
		var emptyLines = [];
		for(var y = this.content.length-1 ; y >= 0 ; y--){
			var empty = true;
			for(var x = 0 ; x < this.content[y].length ; x++){
                empty = this.content[y][x] == null;
				if(!empty)break;
            }
			if(empty){
				emptyLines.push(y);
			}
        }
		if(emptyLines.length == this.height){
			this.game.scoring.fullClear();
		}
    }
}
