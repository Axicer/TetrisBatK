const TILE_SIZE = 32;

const BLUE_TILE = loadPicture("res/pieces/blue.png", TILE_SIZE, TILE_SIZE);
const RED_TILE = loadPicture("res/pieces/red.png", TILE_SIZE, TILE_SIZE);
const CYAN_TILE = loadPicture("res/pieces/cyan.png", TILE_SIZE, TILE_SIZE);
const GREEN_TILE = loadPicture("res/pieces/green.png", TILE_SIZE, TILE_SIZE);
const ORANGE_TILE = loadPicture("res/pieces/orange.png", TILE_SIZE, TILE_SIZE);
const PURPLE_TILE = loadPicture("res/pieces/purple.png", TILE_SIZE, TILE_SIZE);
const YELLOW_TILE = loadPicture("res/pieces/yellow.png", TILE_SIZE, TILE_SIZE);

const TILES = [BLUE_TILE, RED_TILE, CYAN_TILE, GREEN_TILE, ORANGE_TILE, PURPLE_TILE, YELLOW_TILE];

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

function imgCopy(src) {
  var copy = new Image(src.width, src.height);
  copy.src = src.src;
  return copy;
}

function matrixCopy(src){
    return new Matrix(src.tab);
}
