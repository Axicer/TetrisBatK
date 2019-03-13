class Game{

	constructor(loader){
		this.loader = loader;

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

		reset(){
			this.voxel.clear();
			this.tetrominos.clearAll();
			this.scoring.reset();
			this.leveling.reset();
		}

    handleArrows(ev){
        if(ev.key == "Escape"){// pause
            this.pause();
        }
        if(this.ended || this.paused)return;
        if(ev.key == "ArrowLeft" ||
				ev.key == "4"){//left shift
            this.tetrominos.move(-1, 0);
        }else if(ev.key == "ArrowUp" ||
				ev.key == "x" ||
				ev.key == "1" ||
				ev.key == "5" ||
				ev.key == "9"){// rotate clockwise
            this.tetrominos.rotateRight();
        }else if(ev.key == "ArrowRight" ||
				ev.key == "6"){// right shift
            this.tetrominos.move(1, 0);
        }else if(ev.key == "ArrowDown" ||
				ev.key == "2"){// soft drop
            this.tetrominos.move(0, 1);
        }else if(ev.code == "Space"){// hard drop
            this.tetrominos.hardDrop();
        }else if(ev.key == "Control"||
				ev.key == "z"){// rotate counterclockwise
            this.tetrominos.rotateLeft();
        }else if(ev.key == "Shift" ||
				ev.key == "c" ||
				ev.key == "0"){// hold
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
