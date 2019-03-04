var voxel = new Voxel(10, 20);

document.addEventListener("keydown", function(ev){
    voxel.handleArrows(ev);
});

THEME_SOUND.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
THEME_SOUND.play();

function restart(){
    var restart_btn = document.getElementById("restart_btn");
    restart_btn.style.visibility = "hidden";
    voxel = new Voxel(10, 20);
}
