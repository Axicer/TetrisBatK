class Loader{

    constructor(){
        //tiles dictionnary
        this.tiles = [];
        this.loadedTileCount = 0;
        //song dictionnary
        this.songs = [];
        this.loadedSongCount = 0;
        //efect dictionnary
        this.effects = [];
        this.loadedEffectCount = 0;
        //background dictionnary
        this.backgrounds = [];
        this.loadedBackgroundCount = 0;
    }

    loadAll(){
        this.loadEffects();
    }

    loadEffects(){
        var status = document.getElementById("progress_status");
        status.innerHTML = "Loading effects...";
        var progress = document.getElementById("bar");
        progress.style.width = "1%";
        for(var name in EFFECTS_PATH){
            var audio = new Audio(EFFECTS_PATH[name].path);
            //when song is loaded and ready to play
            audio.addEventListener("canplaythrough", (function(self, sound){
                return function _incr(){
                    self.incrementLoadedEffect();
                    sound.removeEventListener("canplaythrough", _incr);
                }
            })(this, audio));
            this.effects[name] = audio;
        }
    }

    incrementLoadedEffect(){
        this.loadedEffectCount++;
        var percent = this.loadedEffectCount*100/Object.keys(EFFECTS_PATH).length;
        var progress = document.getElementById("bar");
        progress.style.width = percent+"%";
        if(percent == 100){
            this.loadSongs();
        }
    }

    getEffect(name){
        return this.effects[name];
    }

    loadSongs(){
        var status = document.getElementById("progress_status");
        status.innerHTML = "Loading songs...";
        var progress = document.getElementById("bar");
        progress.style.width = "1%";
        for(var name in SONGS_PATH){
            var audio = new Audio(SONGS_PATH[name].path);
            //when song is loaded and ready to play
            audio.addEventListener("canplaythrough", (function(self, sound){
                return function _incr(){
                    self.incrementLoadedSong();
                    sound.removeEventListener("canplaythrough", _incr)
                }
            })(this, audio));
            this.songs[name] = audio;
        }
    }

    incrementLoadedSong(){
        this.loadedSongCount++;
        var percent = this.loadedSongCount*100/Object.keys(SONGS_PATH).length;
        var progress = document.getElementById("bar");
        progress.style.width = percent+"%";
        if(percent == 100){
            this.loadTiles();
        }
    }

    getSong(name){
        return this.songs[name];
    }

    getRandomSong(){
        return this.songs[Object.keys(this.songs)[Math.floor(Math.random()*Object.keys(this.songs).length)]];
    }

    setMainVolume(volume){
        var songKeyArray = Object.keys(this.songs);
        for(var i = 0 ; i < songKeyArray.length ; i++){
            this.songs[songKeyArray[i]].volume = volume;
        }
        var effectKeyArray = Object.keys(this.effects);
        for(var i = 0 ; i < effectKeyArray.length ; i++){
            this.effects[effectKeyArray[i]].volume = volume;
        }
    }

    loadTiles(){
        var status = document.getElementById("progress_status");
        status.innerHTML = "Loading tiles textures...";
        var progress = document.getElementById("bar");
        progress.style.width = "1%";
        //for each Tiles
        for(var name in TILES_PATHS){
            var img = new Image(TILE_SIZE, TILE_SIZE);
            img.src = TILES_PATHS[name].path;
            //when image is loaded
            img.addEventListener("load", (function(self){
                return function(){
                    self.incrementLoadedTile();
                }
            })(this));
            this.tiles[name] = img;
        }
    }

    incrementLoadedTile(){
        this.loadedTileCount++;
        var percent = this.loadedTileCount*100/Object.keys(TILES_PATHS).length;
        var progress = document.getElementById("bar");
        progress.style.width = percent+"%";
        if(percent == 100){
            this.loadBackgrounds();
        }
    }

    getTile(name){
        return this.tiles[name];
    }

    loadBackgrounds(){
        var status = document.getElementById("progress_status");
        status.innerHTML = "Loading backgrounds...";
        var progress = document.getElementById("bar");
        progress.style.width = "1%";
        //for each Tiles
        for(var name in BACKGROUND_PATHS){
            var img = new Image();
            img.src = BACKGROUND_PATHS[name].path;
            //when image is loaded
            img.addEventListener("load", (function(self){
                return function(){
                    self.incrementLoadedBackground();
                }
            })(this));
            this.backgrounds[name] = img;
        }
    }

    incrementLoadedBackground(){
        this.loadedBackgroundCount++;
        var percent = this.loadedBackgroundCount*100/Object.keys(BACKGROUND_PATHS).length;
        var progress = document.getElementById("bar");
        progress.style.width = percent+"%";
        if(percent == 100){
            var status = document.getElementById("progress_status");
            status.innerHTML = "All loaded.";
        }
    }

    getBackground(name){
        return this.backgrounds[name];
    }
}

const TILE_SIZE = 32;

const SONGS_PATH = {"theme_99_1":{path:"res/sounds/themes/theme_99_1.mp3"},
                    "theme_99_2":{path:"res/sounds/themes/theme_99_2.mp3"},
                    "theme_99_3":{path:"res/sounds/themes/theme_99_3.mp3"},
                    "theme_orchestra":{path:"res/sounds/themes/theme_orchestra.mp3"},
                    "theme_dubstep":{path:"res/sounds/themes/theme_dubstep.mp3"},
                    "theme_epic":{path:"res/sounds/themes/theme_epic.mp3"}};

const TILES_PATHS = {"blue":{path:"res/pieces/blue.png"},
                    "red":{path:"res/pieces/red.png"},
                    "cyan":{path:"res/pieces/cyan.png"},
                    "green":{path:"res/pieces/green.png"},
                    "orange":{path:"res/pieces/orange.png"},
                    "purple":{path:"res/pieces/purple.png"},
                    "yellow":{path:"res/pieces/yellow.png"}};

const EFFECTS_PATH = {"harddrop":{path:"res/sounds/movements/harddrop.mp3"},
                    "movement":{path:"res/sounds/movements/movement.wav"},
                    "place":{path:"res/sounds/movements/place.mp3"}};

const BACKGROUND_PATHS = {"bdd":{path:"res/background/bdd.JPG"},
                    "bellahsene":{path:"res/background/bellahsene.JPG"},
                    "chollet":{path:"res/background/chollet.JPG"},
                    "communication":{path:"res/background/communication.JPG"},
                    "garcia":{path:"res/background/garcia.JPG"},
                    "joannides":{path:"res/background/joannides.JPG"},
                    "joubert":{path:"res/background/joubert.JPG"},
                    "libre-service":{path:"res/background/libre-service.JPG"},
                    "marie-jeanne":{path:"res/background/marie-jeanne.JPG"},
                    "math":{path:"res/background/math.JPG"},
                    "messaoui":{path:"res/background/messaoui.JPG"},
                    "modelisation":{path:"res/background/modelisation.JPG"},
                    "poo":{path:"res/background/poo.JPG"},
                    "proj-molnar":{path:"res/background/proj-molnar.JPG"},
                    "secretariat":{path:"res/background/secretariat.JPG"}};

const BACKGROUND_BDD = "bdd";
const BACKGROUND_BELLAHSENE = "bellahsene";
const BACKGROUND_CHOLLET = "chollet";
const BACKGROUND_COMMUNICATION = "communication";
const BACKGROUND_GARCIA = "garcia";
const BACKGROUND_JOANNIDES = "joannides";
const BACKGROUND_JOUBERT = "joubert";
const BACKGROUND_LIBRE_SERVICE = "libre-service";
const BACKGROUND_MARIE_JEANNE = "marie-jeanne";
const BACKGROUND_MATH = "math";
const BACKGROUND_MESSAOUI = "messaoui";
const BACKGROUND_MODELISATION = "modelisation";
const BACKGROUND_POO = "poo";
const BACKGROUND_PROJ_MOLNAR = "proj-molnar";
const BACKGROUND_SECRETARIAT = "secretariat";

const TILE_BLUE_NAME = "blue";
const TILE_RED_NAME = "red";
const TILE_CYAN_NAME = "cyan";
const TILE_GREEN_NAME = "green";
const TILE_ORANGE_NAME = "orange";
const TILE_PURPLE_NAME = "purple";
const TILE_YELLOW_NAME = "yellow";

const SONG_TETRIS_99_1 = "theme_99_1";
const SONG_TETRIS_99_2 = "theme_99_2";
const SONG_TETRIS_99_3 = "theme_99_3";
const SONG_TETRIS_ORCHESTRA = "theme_orchestra";
const SONG_TETRIS_DUBSTEP = "theme_dubstep";
const SONG_TETRIS_EPIC = "theme_epic";

const EFFECT_HARD_DROP = "harddrop";
const EFFECT_MOVEMENT = "movement";
const EFFECT_PLACE = "place";
