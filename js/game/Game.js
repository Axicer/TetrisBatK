class Game{

	constructor(loader){
		this.loader = loader;

		this.lastAction = null;
		this.ended = false;
		this.paused = false;

		this.keyboardHandler = new KeyboardHandler();
		this.voxel = new Voxel(this);
		this.tetrominos = new Tetrominos(this);
		this.scoring = new Scoring(this);
		this.leveling = new Leveling(this);

		var self = this;
		this.checkControlInterval = setInterval(function(){
			self.checkDASControl(self);
		}, DAS_SPEED);
		window.addEventListener("keydown", function(ev){
			self.checkKeys(self, ev);
		})
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
			clearInterval(this.checkControlInterval);
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

	/**
	*	DAS key check
	*/
	checkDASControl(self){
		if(self.ended || self.paused)return;
		if(self.keyboardHandler.dasKeys["ArrowLeft"] ||
				self.keyboardHandler.dasKeys["4"]){//left shift
            self.tetrominos.move(-1, 0);
        }else if(self.keyboardHandler.dasKeys["ArrowRight"] ||
				self.keyboardHandler.dasKeys["6"]){// right shift
            self.tetrominos.move(1, 0);
        }
	}

	/**
	*	check for keys in keydown event (not affected by DAS)
	*/
    checkKeys(self, ev){
		if(ev.key == "Escape" && self.keyboardHandler.keysOnce["Escape"]){// pause
		   self.pause();
	   }
	   if(self.ended || self.paused)return;
	   //SHIFT
	   if(self.keyboardHandler.keysOnce["ArrowLeft"] ||
			   self.keyboardHandler.keysOnce["4"]){//left shift
		   self.tetrominos.move(-1, 0);
	   }else if(self.keyboardHandler.keysOnce["ArrowRight"] ||
			   self.keyboardHandler.keysOnce["6"]){// right shift
		   self.tetrominos.move(1, 0);
	   }
	   if(ev.key == "ArrowDown" ||
	   		ev.key == "2"){// soft drop
		   self.tetrominos.move(0, 1);
	   }

	   //ROTATIONS
	   if(ev.key == "ArrowUp" ||
		   ev.key == "x" ||
		   ev.key == "1" ||
		   ev.key == "5" ||
		   ev.key == "9"){// rotate clockwise
		   self.tetrominos.rotateRight();
	   }else if(ev.key == "Control" ||
			   ev.key == "z"){// rotate counterclockwise
		   self.tetrominos.rotateLeft();
	   }

	   //OTHERS
	   if(ev.code == "Space"){// hard drop
		   self.tetrominos.hardDrop();
	   }else if(ev.key == "Shift" ||
			   ev.key == "c" ||
			   ev.key == "0"){// hold
		   self.tetrominos.swapTetrominos();
	   }
    }
}

//10Hz DAS
const DAS_SPEED = 1000/10;

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
