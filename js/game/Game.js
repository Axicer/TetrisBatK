class Game{
	
	constructor(){
		this.lastAction = null;
		this.ended = false;
		this.paused = false;

		this.voxel = new Voxel(this);
		this.tetrominos = new Tetrominos(this);
		this.scoring = new Scoring(this);
		this.leveling = new Leveling(this);
	}

	pause(){
        if(this.ended)return;
        if(this.paused){
            this.tetrominos.setGravityInterval(this.tetrominos.gravityTimeout);
            document.getElementById("pause").style.visibility = "hidden";
        }else{
            clearInterval(this.tetrominos.gravityInterval);
            this.tetrominos.cancelLockTimeout();
            document.getElementById("pause").style.visibility = "visible";
        }
        this.paused = !this.paused;
    }

    end(){
        if(!this.ended){
            console.log("fin du jeu !");
            this.ended = true;
            var restart_btn = document.getElementById("restart_btn");
            restart_btn.style.visibility = "visible";
        }
    }

    handleArrows(ev){
        if(ev.keyCode == 27){
            //escape
            this.pause();
        }
        if(this.ended || this.paused)return;
        if(ev.keyCode == 37){
            //left
            this.tetrominos.move(-1, 0);
        }else if(ev.keyCode == 38){
            //up
            this.tetrominos.rotateRight();
        }else if(ev.keyCode == 39){
            //right
            this.tetrominos.move(1, 0);
        }else if(ev.keyCode == 40){
            //down
            this.tetrominos.move(0, 1);
        }else if(ev.keyCode == 32){
            //space
            this.tetrominos.hardDrop();
        }else if(ev.keyCode == 90){
            //Z
            this.tetrominos.rotateLeft();
        }else if(ev.keyCode == 16){
            //shift
            this.tetrominos.swapTetrominos();
        }
    }
}

const SINGLE = "single";
const DOUBLE = "double";
const TRIPLE = "triple";
const TETRIS = "tetris";
const T_SPIN_MINI_NO_LINES = "tspinmininolines";
const T_SPIN_NO_LINES = "tspinnolines";
const T_SPIN_MINI_SINGLE = "tspinminisingle";
const T_SPIN_SINGLE = "tspinsingle";
const T_SPIN_MINI_DOUBLE = "tspinminidouble";
const T_SPIN_DOUBLE = "tspindouble";
const T_SPIN_TRIPLE = "tspintriple";
