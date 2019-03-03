const LEFT_ROTATION_ANGLE = "left";
const RIGHT_ROTATION_ANGLE = "right";

class Matrix{

    constructor(tab){
        this.tab = tab;
    }

    rotate(sens){
        if(sens == LEFT_ROTATION_ANGLE){
            this.rotateCounterClockwise();
        }else if (sens == RIGHT_ROTATION_ANGLE) {
            this.rotateClockwise();
        }else{
            console.log("error while trying to rotate")
        }
    }

    rotateCounterClockwise(){
       var n=this.tab.length;
       for (var i=0; i<n/2; i++) {
           for (var j=i; j<n-i-1; j++) {
               var tmp=this.tab[i][j];
               this.tab[i][j]=this.tab[j][n-i-1];
               this.tab[j][n-i-1]=this.tab[n-i-1][n-j-1];
               this.tab[n-i-1][n-j-1]=this.tab[n-j-1][i];
               this.tab[n-j-1][i]=tmp;
           }
       }
       return this.tab;
   }

   rotateClockwise() {
        var n=this.tab.length;
        for (var i=0; i<n/2; i++) {
            for (var j=i; j<n-i-1; j++) {
                var tmp=this.tab[i][j];
                this.tab[i][j]=this.tab[n-j-1][i];
                this.tab[n-j-1][i]=this.tab[n-i-1][n-j-1];
                this.tab[n-i-1][n-j-1]=this.tab[j][n-i-1];
                this.tab[j][n-i-1]=tmp;
            }
        }
        return this.tab;
    }
}

const TETROMINOS_MATRIX_I = new Matrix([    [0, 0, 1, 0],
                                            [0, 0, 1, 0],
                                            [0, 0, 1, 0],
                                            [0, 0, 1, 0]]);
const TETROMINOS_MATRIX_J = new Matrix([    [0, 1, 0],
                                            [0, 1, 0],
                                            [1, 1, 0]]);
const TETROMINOS_MATRIX_L = new Matrix([    [0, 1, 0],
                                            [0, 1, 0],
                                            [0, 1, 1]]);
const TETROMINOS_MATRIX_S = new Matrix([    [0, 0, 0],
                                            [0, 1, 1],
                                            [1, 1, 0]]);
const TETROMINOS_MATRIX_Z = new Matrix([    [0, 0, 0],
                                            [1, 1, 0],
                                            [0, 1, 1]]);
const TETROMINOS_MATRIX_T = new Matrix([    [0, 0, 0],
                                            [1, 1, 1],
                                            [0, 1, 0]]);
const TETROMINOS_MATRIX_O = new Matrix([    [1, 1],
                                            [1, 1]]);

const TETROMINOSES = {poses:[ {tile: BLUE_TILE, matrix: TETROMINOS_MATRIX_J},
                        {tile: RED_TILE, matrix: TETROMINOS_MATRIX_Z},
                        {tile: CYAN_TILE, matrix: TETROMINOS_MATRIX_I},
                        {tile: GREEN_TILE, matrix: TETROMINOS_MATRIX_S},
                        {tile: ORANGE_TILE, matrix: TETROMINOS_MATRIX_L},
                        {tile: PURPLE_TILE, matrix: TETROMINOS_MATRIX_T},
                        {tile: YELLOW_TILE, matrix: TETROMINOS_MATRIX_O}]};
