mainMenu();

function mainMenu(){
	eraseAllChilds(document.body);

	let mainBalise = document.body.appendChild(document.createElement("div"));
	mainBalise.id="legal-notice";
	

	let image = mainBalise.appendChild(document.createElement("img"));
	image.src="res/icons/logo.png";
	


	let text = mainBalise.appendChild(document.createElement("p"));
	text.innerHTML="Choose a number of player :";
	text.id="intro";

	let buttons_players = mainBalise.appendChild(document.createElement("div"));
	buttons_players.id="gamemodes";

	
	let one_player = buttons_players.appendChild(document.createElement("button"));
	one_player.classList.add("players");
	one_player.innerHTML="Solo";

	let two_player = buttons_players.appendChild(document.createElement("button"));
	two_player.classList.add("players");
	two_player.innerHTML="Multiplayer";
	
	

	let retour = mainBalise.appendChild(document.createElement("button"));
	retour.innerHTML="Return to player selection";
	retour.classList.add("retour");
	retour.onclick=function(){
		mainMenu();
	};


	one_player.onclick=function(){
		retour.style.display="inline";
		selectPlayer(1);
	};
	

	two_player.onclick=function(){
		selectPlayer(2);
	};


}

function selectPlayer(nbPlayers){

		//Récupération de la balise mère et supression des boutons déjà présents
		let motherNode = document.getElementById("gamemodes")
		eraseAllChilds(motherNode);

		if(nbPlayers == 1){
			let paragraphe = document.getElementById("intro");
			paragraphe.innerHTML = "Select game mode :";

			//Création des deux boutons permettant de choisir le mode de jeu
			let buttonMarathon = document.createElement("button");
			buttonMarathon.classList.add("players");
			buttonMarathon.innerHTML="Marathon";
			motherNode.appendChild(buttonMarathon);
			
			buttonMarathon.onclick=function(){
				eraseAllChilds(document.getElementById("legal-notice"));
				launch("marathon");
			};



			let buttonLines = document.createElement("button");
			buttonLines.classList.add("players");
			buttonLines.innerHTML="40 Lines";
			motherNode.appendChild(buttonLines);
			
			buttonLines.onclick=function(){
				eraseAllChilds(document.getElementById("legal-notice"));
				launch("lines")
			};

		}
		if(nbPlayers==2){
			eraseAllChilds(document.getElementById("legal-notice"));
			launch("duel");

		}
	}

function eraseAllChilds(balise){
	if(balise==null){}
	else{
		while (balise.firstChild) {
			balise.removeChild(balise.firstChild);
		}
	}
}

/* Placeholder en attendant l'implémentation de la vraie fonction launch */
function launch(coucou){
	console.log("coucou");
}