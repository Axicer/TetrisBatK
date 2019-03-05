class Matrix{

    constructor(tab){
        this.tab = tab;
    }

    rotateCounterClockwise(){
        var mat = new Array(this.tab.length);
        for (var i = 0 ; i < this.tab.length ; i++){
            mat[i]=new Array(this.tab[i].length);
            for(var j = 0 ; j < this.tab[i].length ; j++){
                mat[i][j] = this.tab[i][j];
            }
        }
        var n=mat.length;
        for (var i=0; i<n/2; i++) {
            for (var j=i; j<n-i-1; j++) {
                var tmp=this.tab[i][j];
                mat[i][j]=this.tab[j][n-i-1];
                mat[j][n-i-1]=this.tab[n-i-1][n-j-1];
                mat[n-i-1][n-j-1]=this.tab[n-j-1][i];
                mat[n-j-1][i]=tmp;
           }
       }
       return new Matrix(mat);
   }

   rotateClockwise() {
       var mat = new Array(this.tab.length);
       for (var i = 0 ; i < this.tab.length ; i++){
           mat[i]=new Array(this.tab[i].length);
           for(var j = 0 ; j < this.tab[i].length ; j++){
               mat[i][j] = this.tab[i][j];
           }
       }
       var n=mat.length;
       for (var i=0; i<n/2; i++) {
           for (var j=i; j<n-i-1; j++) {
               var tmp=this.tab[i][j];
               mat[i][j]=this.tab[n-j-1][i];
               mat[n-j-1][i]=this.tab[n-i-1][n-j-1];
               mat[n-i-1][n-j-1]=this.tab[j][n-i-1];
               mat[j][n-i-1]=tmp;
            }
        }
        return new Matrix(mat);
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

const TETROMINOSES = {poses:[ {tile: BLUE_TILE, matrix: TETROMINOS_MATRIX_J, name:"J"},
                        {tile: RED_TILE, matrix: TETROMINOS_MATRIX_Z, name:"Z"},
                        {tile: CYAN_TILE, matrix: TETROMINOS_MATRIX_I, name:"I"},
                        {tile: GREEN_TILE, matrix: TETROMINOS_MATRIX_S, name:"S"},
                        {tile: ORANGE_TILE, matrix: TETROMINOS_MATRIX_L, name:"L"},
                        {tile: PURPLE_TILE, matrix: TETROMINOS_MATRIX_T, name:"T"},
                        {tile: YELLOW_TILE, matrix: TETROMINOS_MATRIX_O, name:"O"}]};
