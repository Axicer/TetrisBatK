//https://tetris.fandom.com/wiki/SRS

function findRotation(tetrominos, askedState, right = true){
    if(tetrominos.name == "O")return;
    //get needed tests
    var line = tetrominos.rotationState+">>"+askedState;
    var rotations;
    if(tetrominos.name == "I"){
        rotations = ROTATIONS.bar[line];
    }else{
        rotations = ROTATIONS.standard[line];
    }
    var m = right ? tetrominos.matrix.rotateClockwise() : tetrominos.matrix.rotateCounterClockwise();
    //testing all possibilities
    for(var i = 0 ; i < rotations.length ; i++){
        //get whether the piece is OOB
        var oob = tetrominos.isOOB(rotations[i][0], -rotations[i][1], m);
        //get whether the piece is at an impossible place (there's already a tile somewhere)
        var data = tetrominos.alreadyContainsData(rotations[i][0], -rotations[i][1], m);
        if(!oob && !data){
            //return the rotated matrix, and the valid wall kicks
            return [m, rotations[i][0], -rotations[i][1]];
        }
    }
    return null;
}

var ROTATIONS = JSON.parse('{"standard":{"0>>1":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"1>>0":[[0,0],[1,0],[1,-1],[0,2],[1,2]],"1>>2":[[0,0],[1,0],[1,-1],[0,2],[1,2]],"2>>1":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"2>>3":[[0,0],[1,0],[1,-1],[0,2],[1,2]],"3>>2":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"3>>0":[[0,0],[-1,0],[-1,1],[0,-2],[-1,-2]],"0>>3":[[0,0],[1,0],[1,-1],[0,2],[1,2]]},"bar":{"0>>1":[[0,0],[-2,0],[1,0],[-2,-1],[1,2]],"1>>0":[[0,0],[2,0],[-1,0],[2,1],[-1,-2]],"1>>2":[[0,0],[-1,0],[2,0],[-1,2],[2,-1]],"2>>1":[[0,0],[1,0],[-2,0],[1,-2],[-2,1]],"2>>3":[[0,0],[2,0],[-1,0],[2,1],[-1,-2]],"3>>2":[[0,0],[-2,0],[1,0],[-2,-1],[1,2]],"3>>0":[[0,0],[1,0],[-2,0],[1,-2],[-2,1]],"0>>3":[[0,0],[-1,0],[2,0],[-1,2],[1,-1]]}}');

function mod(n, m) {
  return ((n % m) + m) % m;
}
