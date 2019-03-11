class Leveling{

	constructor(game){
		this.game = game;
		this.level = 1;
	}

	getLevel(level){
        if(this.level-1 < LEVELS.length){
            return LEVELS[this.level-1]
        }else{
            return LEVELS[LEVELS.length-1];
        }
    }

    //update the level depending on the current amount of line given
    //return lines % 10
    updateLevel(lines){
        if(lines >= 10){
            this.level++;
            var level_elem = document.getElementById("tetris_level");
            level_elem.innerHTML = this.level+ " (" + this.getLevel().name + ")";
			document.body.style.backgroundImage = "url(" + this.game.loader.getBackground(this.getLevel().imgId).src + ")";

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

const LEVELS = [{name:"Salle libre-service", imgId:BACKGROUND_LIBRE_SERVICE},
					{name:"Antre de Mr CHOLLET", imgId:BACKGROUND_CHOLLET},
                    {name:"Bureau de Mr MARIE-JEANNE", imgId:BACKGROUND_MARIE_JEANNE},
                    {name:"Musée de Mr GARCIA", imgId:BACKGROUND_GARCIA},
                    {name:"Salon de Mr JOUBERT", imgId:BACKGROUND_JOUBERT},
					{name:"Secrétariat", imgId:BACKGROUND_SECRETARIAT},
                    {name:"Cours de POO", imgId:BACKGROUND_POO},
					{name:"Cours de Communication", imgId:BACKGROUND_COMMUNICATION},
                    {name:"Cours de Math", imgId:BACKGROUND_MATH},
                    {name:"Cabinet de Mme MESSAOUI", imgId:BACKGROUND_MESSAOUI},
                    {name:"Cours de BDD", imgId:BACKGROUND_BDD},
                    {name:"Cours de Modelisation", imgId:BACKGROUND_MODELISATION},
                    {name:"Grotte de Mr JOANNIDES", imgId:BACKGROUND_JOANNIDES},
                    {name:"Caverne de Mme BELLAHSENE", imgId:BACKGROUND_BELLAHSENE},
                    {name:"Projets S3 de Mr MOLNAR", imgId:BACKGROUND_PROJ_MOLNAR}];
