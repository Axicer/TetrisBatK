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
    }

    loadAll(){
        this.loadEffects();
    }

    loadEffects(){
        var status = document.getElementById("progress_status");
        status.innerHTML = "Loading effects...";
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
        status.innerHTML = "Loading textures...";
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
            var status = document.getElementById("progress_status");
            status.innerHTML = "All loaded.";
        }
    }

    getTile(name){
        return this.tiles[name];
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
