const TILE_SIZE = 32;

const BLUE_TILE = loadPicture("res/pieces/blue.png", TILE_SIZE, TILE_SIZE);
const RED_TILE = loadPicture("res/pieces/red.png", TILE_SIZE, TILE_SIZE);
const CYAN_TILE = loadPicture("res/pieces/cyan.png", TILE_SIZE, TILE_SIZE);
const GREEN_TILE = loadPicture("res/pieces/green.png", TILE_SIZE, TILE_SIZE);
const ORANGE_TILE = loadPicture("res/pieces/orange.png", TILE_SIZE, TILE_SIZE);
const PURPLE_TILE = loadPicture("res/pieces/purple.png", TILE_SIZE, TILE_SIZE);
const YELLOW_TILE = loadPicture("res/pieces/yellow.png", TILE_SIZE, TILE_SIZE);

const TILES = [BLUE_TILE, RED_TILE, CYAN_TILE, GREEN_TILE, ORANGE_TILE, PURPLE_TILE, YELLOW_TILE];

const THEME_SOUND = new Audio("res/sounds/theme.mp3");
const HARD_DROP_SOUND = new Audio("res/sounds/harddrop.mp3");
const MOVEMENT_SOUND = new Audio("res/sounds/movement.wav");
const PLACE_SOUND = new Audio("res/sounds/place.mp3");

const SONGS = [THEME_SOUND, HARD_DROP_SOUND, MOVEMENT_SOUND, PLACE_SOUND];

function areTilesLoaded(){
    return BLUE_TILE.complete &&
            RED_TILE.complete &&
            CYAN_TILE.complete &&
            GREEN_TILE.complete &&
            ORANGE_TILE.complete &&
            PURPLE_TILE.complete &&
            YELLOW_TILE.complete;
}

function loadPicture(src, width = 32, height = 32){
    var img = new Image(width, height);
    img.src = src;
    return img;
}

function setVolume(volume){
    for(var i = 0 ; i < SONGS.length ; i++){
        SONGS[i].volume = volume;
    }
}
function getRandomSong(){
    return THEME_SOUND;
}
