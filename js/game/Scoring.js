class Scoring{

	constructor(game){
		this.score = 0;
		this.game = game;
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
                        shout("T-Spin !", 800);
                        break;
                    case 1:// tspin single
                        score += 800*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_SINGLE;
                        shout("T-Spin Single !", 800);
                        canB2B = true;
                        break;
                    case 2:// tspin double
                        score += 1200*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_DOUBLE;
                        shout("T-Spin Double !", 800);
                        canB2B = true;
                        break;
                    case 3://tspin triple
                        score += 1600*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_TRIPLE;
                        shout("T-Spin Triple !", 800);
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
                        shout("Mini T-Spin !", 800);
                        break;
                    case 1:// tspin mini single
                        score += 200*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_MINI_SINGLE;
                        shout("Mini T-Spin Single !", 800);
                        break;
                    case 2://tspin mini double
                        score += 400*this.game.leveling.level;
                        this.game.lastAction = T_SPIN_MINI_DOUBLE;
                        shout("Mini T-Spin Double !", 800);
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
                    shout("Tetris !", 800);
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
            shout("BACK-TO-BACK !", 800, "b2b");
            score *= 3.0/2.0;
        }

        //update display
        this.updateDisplay(score);
    }

	fullClear(){
		shout("FULL CLEAR", 800);
	}

    updateDisplay(incr){
    	var score_elem = document.getElementById("tetris_score");
        var score = parseInt(score_elem.innerHTML);
        score += incr;
        score_elem.innerHTML = score;
    }

}
