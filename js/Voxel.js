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
        //clear canvas
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);

        this.ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    clear(){
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

}
