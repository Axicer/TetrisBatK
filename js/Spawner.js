const TETROMINOSES = {poses:[ {tile: BLUE_TILE, matrix: TETROMINOS_MATRIX_J, name:"J"},
                        {tile: RED_TILE, matrix: TETROMINOS_MATRIX_Z, name:"Z"},
                        {tile: CYAN_TILE, matrix: TETROMINOS_MATRIX_I, name:"I"},
                        {tile: GREEN_TILE, matrix: TETROMINOS_MATRIX_S, name:"S"},
                        {tile: ORANGE_TILE, matrix: TETROMINOS_MATRIX_L, name:"L"},
                        {tile: PURPLE_TILE, matrix: TETROMINOS_MATRIX_T, name:"T"},
                        {tile: YELLOW_TILE, matrix: TETROMINOS_MATRIX_O, name:"O"}]};

class Spawner{

    constructor(){
        this.bag = this.shuffleArray(TETROMINOSES.poses);
        this.count = 0;
    }

    get(){
        if(this.count == 0){
            this.bag = this.shuffleArray(TETROMINOSES.poses);
        }
        var content = this.bag[this.count];
        this.count = (this.count+1)%this.bag.length;
        return content;
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
