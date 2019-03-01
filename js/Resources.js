const TILE_SIZE = 32;
const RED_TILE = loadPicture("res/pieces/red.png", TILE_SIZE, TILE_SIZE);

function areTilesLoaded(){
    return RED_TILE.complete;
}

function loadPicture(src, width = 32, height = 32){
    var img = new Image(width, height);
    img.src = src;
    return img;
}
