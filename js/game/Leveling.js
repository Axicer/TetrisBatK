class Leveling{

	constructor(game){
		this.game = game;
		this.level = 1;
	}

	getLevelName(level){
        if(this.level-1 < LEVELS_NAME.length){
            return LEVELS_NAME[this.level-1]
        }else{
            return LEVELS_NAME[LEVELS_NAME.length-1];
        }
    }

    //update the level depending on the current amount of line given
    //return lines % 10
    updateLevel(lines){
        if(lines >= 10){
            this.level++;
            var level_elem = document.getElementById("tetris_level");
            level_elem.innerHTML = this.level+ " (" + this.getLevelName() + ")";
            this.game.tetrominos.setGravityInterval(this.game.tetrominos.gravityTimeout/SPEED_INCREASE_FACTOR);
            return lines%10;
        }
        return lines;
    }

    updateLines(lines){
    	var line_elem = document.getElementById("tetris_line_cleared");
        var old_lines = parseInt(line_elem.innerHTML);
        old_lines += lines;
        old_lines = this.updateLevel(old_lines);
        line_elem.innerHTML = old_lines;
    }
}

const LEVELS_NAME = ["Cafeteria",
                    "Bureau de Mr MARIE-JEANNE",
                    "Bureau de Mr GARCIA",
                    "Amphi",
                    "Cour de POO",
                    "Cour de Math",
                    "Cour de Communication",
                    "Bureau de Mme MESSAOUI",
                    "Cour de BDD",
                    "Cour de Modelisation",
                    "Bureau de Mr JOANNIDES",
                    "Bureau de Mme BELLAHSENE",
                    "Projets S3 de Mr Molnar"];
