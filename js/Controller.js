var voxel = new Voxel(10, 20);
var falling = new Tetrominos(TETROMINOS_MATRIX_L, 2, 5);
var checkFixTimeout;

/**
*   Handle the keydown event
*/
function handleArrows(ev){
    if(ev.keyCode == 37){
        //left
        falling.move(-1, 0);
        resetCheckTimeOut();
    }else if(ev.keyCode == 38){
        //up
        falling.rotateRight();
        resetCheckTimeOut();
    }else if(ev.keyCode == 39){
        //right
        falling.move(1, 0);
        resetCheckTimeOut();
    }else if(ev.keyCode == 40){
        //down
        falling.move(0, 1);
        resetCheckTimeOut();
    }else if(ev.keyCode == 32){
        //space
        //TODO hard drop
    }else if(ev.keyCode == 90){
        //Z
        falling.rotateLeft();
        resetCheckTimeOut();
    }else if(ev.keyCode == 90){
        //shift
        //TODO keep touch
    }
}

/**
*   apply gravity
*/
function gravity(){
    if(falling != null){
        falling.move(0,1);
        checkFixTimeout = setTimeout(checkFix, 500);
    }
}

/**
*   Check if the tetrominos need to be locked and sent to the voxel
*/
function checkFix(){
    //TODO
}

/**
*   reset the check fix timeout
*/
function resetCheckTimeOut(){
    clearTimeout(checkFixTimeout);
    checkFixTimeout = setTimeout(checkFix, 500);
}

//start the gravity action evry 800ms
setInterval(gravity, 800);
//nind event keydown with corresponding function
document.addEventListener("keydown", handleArrows);
