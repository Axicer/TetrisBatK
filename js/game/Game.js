class Game{

	constructor(loader){
		this.loader = loader;

		this.createContainers();

		this.lastAction = null;
		this.ended = false;
		this.paused = false;

		this.voxel = new Voxel(this, this.tetris_voxel);
		this.tetrominos = new Tetrominos(this, this.tetris_falling, this.nextCanvas, this.holdCanvas);
		this.scoring = new Scoring(this, this.scoreText, this.showText, this.b2bText);
		this.leveling = new Leveling(this, this.levelText, this.lineText);
	}

	createContainers(){
		//-----------------------GAME----------------------------

		//create game container
		this.gameContainer = document.createElement("div");
		this.gameContainer.classList.add("tetris");

		//------------------------DUMMY LEFT------------------

		//create dummy left div for grid
		this.dummyContainerLeft = document.createElement("div");
		//append dummy left div
		this.gameContainer.appendChild(this.dummyContainerLeft);

		//------------------LEFT---------------------------------

		//create left info panel
		this.infoContainerLeft = document.createElement("div");
		this.infoContainerLeft.classList.add("info_left");

			//create left up container
			this.infoContainerLeftUp = document.createElement("div");
			this.infoContainerLeftUp.classList.add("info_left_up");

				//create HOLD text
				this.holdContainerP = document.createElement("p");
				this.holdContainerP.innerHTML = "HOLD";
				this.holdContainerP.classList.add("font-tetris");

				this.holdCanvas = document.createElement("canvas");
				this.holdCanvas.width = "128";
				this.holdCanvas.height = "128";
				this.holdCanvas.classList.add("tetris_hold_canvas");

				//append hold text and canvas
				this.infoContainerLeftUp.appendChild(this.holdContainerP);
				this.infoContainerLeftUp.appendChild(this.holdCanvas);

			//create left down container
			this.infoContainerLeftDown = document.createElement("div");
			this.infoContainerLeftDown.classList.add("info_left_down");

				//create line container div
				this.lineContainer = document.createElement("div");
				this.lineContainer.classList.add("info_lines");

					//create LINES text
					this.lineContainerP = document.createElement("p");
					this.lineContainerP.innerHTML = "LINES";
					this.lineContainerP.classList.add("font-tetris");

					//create current line text
					this.lineText = document.createElement("p");
					this.lineText.innerHTML = "0";
					this.lineText.classList.add("font-tetris");
					this.lineText.classList.add("tetris_line");

					//append line P and text
					this.lineContainer.appendChild(this.lineContainerP);
					this.lineContainer.appendChild(this.lineText);

				//create level container div
				this.levelContainer = document.createElement("div");
				this.levelContainer.classList.add("info_level");

					//create LEVEL text
					this.levelContainerP = document.createElement("p");
					this.levelContainerP.innerHTML = "LEVEL";
					this.levelContainerP.classList.add("font-tetris");

					//create current level text
					this.levelText = document.createElement("p");
					this.levelText.innerHTML = "1 (Salle libre-service)";
					this.levelText.classList.add("font-tetris");
					this.levelText.classList.add("tetris_level");

					//append level P and text
					this.levelContainer.appendChild(this.levelContainerP);
					this.levelContainer.appendChild(this.levelText);

				//append line and level div to left down container
				this.infoContainerLeftDown.appendChild(this.lineContainer);
				this.infoContainerLeftDown.appendChild(this.levelContainer);

			//append left up and down container to left container
			this.infoContainerLeft.appendChild(this.infoContainerLeftUp);
			this.infoContainerLeft.appendChild(this.infoContainerLeftDown);

		//append left div to game container
		this.gameContainer.appendChild(this.infoContainerLeft);

		//---------------------CENTER--------------------------------------

		//create center div
		this.infoContainerCenter = document.createElement("div");
		this.infoContainerCenter.classList.add("info_center");

			//create falling tetrominos canvas
			this.tetris_falling = document.createElement("canvas");
			this.tetris_falling.width = "320";
			this.tetris_falling.height = "640";
			this.tetris_falling.classList.add("tetris_falling");

			//create voxel canvas
			this.tetris_voxel = document.createElement("canvas");
			this.tetris_voxel.width = "320";
			this.tetris_voxel.height = "640";
			this.tetris_voxel.classList.add("tetris_voxel");

			//create pause text
			this.pauseText = document.createElement("p");
			this.pauseText.innerHTML = "PAUSE";
			this.pauseText.classList.add("font-tetris");

			//create restart button
			this.restartButton = document.createElement("button");
			this.restartButton.innerHTML = "RESTART";
			this.restartButton.onClick = restart;

			//create show text
			this.showText = document.createElement("p");
			this.showText.classList.add("font-tetris");
			this.showText.classList.add("showText");

			//create b2b text
			this.b2bText = document.createElement("p");
			this.b2bText.classList.add("font-tetris");
			this.b2bText.classList.add("b2bText");

			//append elements
			this.infoContainerCenter.appendChild(this.tetris_falling);
			this.infoContainerCenter.appendChild(this.tetris_voxel);
			this.infoContainerCenter.appendChild(this.pauseText);
			this.infoContainerCenter.appendChild(this.restartButton);
			this.infoContainerCenter.appendChild(this.showText);
			this.infoContainerCenter.appendChild(this.b2bText);

		//append center div to game container
		this.gameContainer.appendChild(this.infoContainerCenter);
		//--------------------RIGHT--------------------------------------

		//create right info panel
		this.infoContainerRight = document.createElement("div");
		this.infoContainerRight.classList.add("info_right");

			//create right up container
			this.infoContainerRightUp = document.createElement("div");

				//create NEXT text
				this.nextContainerP = document.createElement("p");
				this.nextContainerP.innerHTML = "NEXT";
				this.nextContainerP.classList.add("font-tetris");

				//create current level text
				this.nextCanvas = document.createElement("canvas");
				this.nextCanvas.width = "128";
				this.nextCanvas.height = "128";
				this.nextCanvas.classList.add("tetris_next_canvas");

				//append next text and canvas
				this.infoContainerRightUp.appendChild(this.nextContainerP);
				this.infoContainerRightUp.appendChild(this.nextCanvas);

			//create container right down
			this.infoContainerRightDown = document.createElement("div");

				//create SCORE text
				this.scoreContainerP = document.createElement("p");
				this.scoreContainerP.innerHTML = "SCORE";
				this.scoreContainerP.classList.add("font-tetris");

				//create current score text
				this.scoreText = document.createElement("p");
				this.scoreText.innerHTML = "0";
				this.scoreText.classList.add("font-tetris");
				this.scoreText.classList.add("tetris_score");

				//append next text and canvas
				this.infoContainerRightDown.appendChild(this.scoreContainerP);
				this.infoContainerRightDown.appendChild(this.scoreText);

			//append left up container
			this.infoContainerRight.appendChild(this.infoContainerRightUp);
			this.infoContainerRight.appendChild(this.infoContainerRightDown);

		//append left div to game container
		this.gameContainer.appendChild(this.infoContainerRight);

		//----------------------DUMMY RIGHT--------------------------

		//create dummy right div for grid
		this.dummyContainerRight = document.createElement("div");
		//append dummy right div
		this.gameContainer.appendChild(this.dummyContainerRight);

		//-----------------------------------------------------------

		//append game container
		document.body.appendChild(this.gameContainer);
	}

	pause(){
        if(this.ended)return;
        if(this.paused){
            this.tetrominos.setGravityInterval(this.tetrominos.gravityTimeout, this.tetrominos);
            this.pauseText.style.visibility = "hidden";
        }else{
            clearInterval(this.tetrominos.gravityInterval);
            this.tetrominos.cancelLockTimeout(this.tetrominos);
            this.pauseText.style.visibility = "visible";
        }
        this.paused = !this.paused;
    }

    end(){
        if(!this.ended){
            console.log("fin du jeu !");
            this.ended = true;
            this.restartButton.style.visibility = "visible";
        }
    }

		reset(){
			this.voxel.clear();
			this.tetrominos.clearAll(this.tetrominos);
			this.scoring.reset();
			this.leveling.reset();
		}

    handleArrows(ev){
        if(ev.keyCode == 27){
            //escape
            this.pause();
        }
        if(this.ended || this.paused)return;
        if(ev.keyCode == 37){
            //left
            this.tetrominos.move(-1, 0, true, this.tetrominos);
        }else if(ev.keyCode == 38){
            //up
            this.tetrominos.rotateRight(this.tetrominos);
        }else if(ev.keyCode == 39){
            //right
            this.tetrominos.move(1, 0, true, this.tetrominos);
        }else if(ev.keyCode == 40){
            //down
            this.tetrominos.move(0, 1, true, this.tetrominos);
        }else if(ev.keyCode == 32){
            //space
            this.tetrominos.hardDrop(this.tetrominos);
        }else if(ev.keyCode == 90){
            //Z
            this.tetrominos.rotateLeft(this.tetrominos);
        }else if(ev.keyCode == 16){
            //shift
            this.tetrominos.swapTetrominos(this.tetrominos);
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
