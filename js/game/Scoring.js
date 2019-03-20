class Scoring{

	constructor(game, score_elem, shout_elem, shout_b2b_elem){
		this.score = 0;
		this.game = game;
		this.score_elem = score_elem;
		this.shout_elem = shout_elem;
		this.shout_b2b_elem = shout_b2b_elem;
	}

	updateScore(lines, hasFullClear = false){
        var score = 0;
        var canB2B = false;
        var beforeAction = this.game.lastAction;
        //if last action is a T-Spin
        if(this.game.tetrominos.lastActionWasTSpin){
            if(this.game.tetrominos.lastRotationHasWallKick){
                //tspin standard
                switch(lines){
                    case 0: //tspin no line
                        score += 400*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_NO_LINES;
                        this.shout("T-Spin !", 800, this.shout_elem);
                        break;
                    case 1:// tspin single
                        score += 800*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_SINGLE;
                        this.shout("T-Spin Single !", 800, this.shout_elem);
                        canB2B = true;
                        break;
                    case 2:// tspin double
                        score += 1200*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_DOUBLE;
                        this.shout("T-Spin Double !", 800, this.shout_elem);
                        canB2B = true;
                        break;
                    case 3://tspin triple
                        score += 1600*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_TRIPLE;
                        this.shout("T-Spin Triple !", 800, this.shout_elem);
                        canB2B = true;
                        break;
                    default:break;
                }
            }else{
                //tspin mini
                switch(lines){
                    case 0: //tspin mini no line
                        score += 100*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_MINI_NO_LINES;
                        this.shout("Mini T-Spin !", 800, this.shout_elem);
                        break;
                    case 1:// tspin mini single
                        score += 200*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_MINI_SINGLE;
                        this.shout("Mini T-Spin Single !", 800, this.shout_elem);
                        break;
                    case 2://tspin mini double
                        score += 400*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_MINI_DOUBLE;
                        this.shout("Mini T-Spin Double !", 800, this.shout_elem);
                        break;
                    default:break;
                }
            }
        }else{
            switch (lines) {
                case 1://single
                    score += 100*this.game.leveling.level;
                    this.game.lastAction = SINGLE;
                    break;
                case 2://double
                    score += 300*this.game.leveling.level;
                    this.game.lastAction = DOUBLE;
                    break;
                case 3://triple
                    score += 500*this.game.leveling.level;
                    this.game.lastAction = TRIPLE;
                    break;
                case 4://tetris
                    score += 800*this.game.leveling.level;
                    this.game.lastAction = TETRIS;
                    this.shout("Tetris !", 800, this.shout_elem);
                    canB2B = true;
                    break;
                default:break;
            }
        }

        if(canB2B &&
            (beforeAction == T_SPIN_SINGLE ||
            beforeAction == T_SPIN_DOUBLE ||
            beforeAction == T_SPIN_TRIPLE ||
            beforeAction == TETRIS)){
            //it's back to back
            this.shout("BACK-TO-BACK !", 800, this.shout_b2b_elem);
            score *= 3.0/2.0;
        }

        //update display
        this.updateDisplay(score);
    }

		fullClear(){
			this.shout("FULL CLEAR", 800, this.shout_elem);
		}

		reset(){
				score_elem.innerHTML = 0;
		}

    updateDisplay(incr){
        var score = parseInt(this.score_elem.innerHTML);
        score += incr;
        this.score_elem.innerHTML = score;
    }

		shout(message, millis, elem){
		    elem.innerHTML = message;
		    elem.style.visibility = "visible";
		    setTimeout((function(elem, self){
		        return function(){
		            elem.style.visibility = "hidden";
		        }
		    })(elem, this), millis);
		}

}
