const TETROMINOSES = {poses:[ {tile: TILE_BLUE_NAME, matrix: TETROMINOS_MATRIX_J, name:"J"},
                        {tile: TILE_RED_NAME, matrix: TETROMINOS_MATRIX_Z, name:"Z"},
                        {tile: TILE_CYAN_NAME, matrix: TETROMINOS_MATRIX_I, name:"I"},
                        {tile: TILE_GREEN_NAME, matrix: TETROMINOS_MATRIX_S, name:"S"},
                        {tile: TILE_ORANGE_NAME, matrix: TETROMINOS_MATRIX_L, name:"L"},
                        {tile: TILE_PURPLE_NAME, matrix: TETROMINOS_MATRIX_T, name:"T"},
                        {tile: TILE_YELLOW_NAME, matrix: TETROMINOS_MATRIX_O, name:"O"}]};

class Spawner{

    constructor(loader){
        this.bag = this.shuffleArray(TETROMINOSES.poses);
        this.count = 0;
        this.loader = loader;
    }

    get(){
        if(this.count == 0){
            this.bag = this.shuffleArray(TETROMINOSES.poses);
        }
        var content = this.bag[this.count];
        this.count = (this.count+1)%this.bag.length;
        return {tile:this.loader.getTile(content.tile), matrix:content.matrix, name: content.name};
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}
