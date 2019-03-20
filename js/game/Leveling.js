class Leveling{

	constructor(game, level_elem, line_elem){
		this.game = game;
		this.level = 1;
		this.level_elem = level_elem;
		this.line_elem = line_elem;
	}

	getLevel(level){
        if(this.level-1 < LEVELS.length){
            return LEVELS[this.level-1]
        }else{
            return LEVELS[LEVELS.length-1];
        }
    }

		reset(){
				this.level = 1;
				this.level_elem.innerHTML = this.level+ " (" + this.getLevel().name + ")";

				//TODO
				var background_container = document.getElementById("background_div");
				background_container.removeChild(background_container.firstChild);
				background_div.appendChild(this.game.loader.getBackground(this.getLevel().imgId));

				this.line_elem.innerHTML = 0;
		}

    //update the level depending on the current amount of line given
    //return lines % 10
    updateLevel(lines){
        if(lines >= 10){
            this.level++;
            this.level_elem.innerHTML = this.level+ " (" + this.getLevel().name + ")";

						//TODO
						var background_container = document.getElementById("background_div");
						background_container.removeChild(background_container.firstChild);
						background_div.appendChild(this.game.loader.getBackground(this.getLevel().imgId));

						//set good gravity timeout from guideline (0.8-((Level-1)*0.007))^(Level-1)
						this.game.tetrominos.gravityTimeout = Math.pow(0.8-((this.level-1)*0.007), (this.level-1))*1000;// *1000 is for millis
						this.game.tetrominos.setGravityInterval(this.game.tetrominos.gravityTimeout, this.game.tetrominos);
            return lines%10;
        }
        return lines;
    }

    updateLines(lines){
        var old_lines = parseInt(this.line_elem.innerHTML);
        old_lines += lines;
        old_lines = this.updateLevel(old_lines);
        this.line_elem.innerHTML = old_lines;
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
