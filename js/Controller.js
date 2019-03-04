var voxel = new Voxel(10, 20);

document.addEventListener("keydown", function(ev){
    voxel.handleArrows(ev);
});

currentSong = getRandomSong();
setVolume(0.5);
currentSong.addEventListener('ended', function() {
    currentSong.currentTime = 0;
    currentSong = getRandomSong();
    currentSong.play().then(function() {
        console.log("music started");
    }).catch(function(error){
        console.log("autoplayed music prevented ! No music will be played");
    });
}, false);
currentSong.play().then(function() {
    console.log("music started");
}).catch(function(error){
    console.log("autoplayed music prevented ! No music will be played");
});

function restart(){
    var restart_btn = document.getElementById("restart_btn");
    restart_btn.style.visibility = "hidden";
    voxel = new Voxel(10, 20);
}

document.getElementById("volume_slider").addEventListener("input", function(){
    setVolume(document.getElementById("volume_slider").value);
});
document.getElementById("volume_slider").addEventListener("mouseup", function(){
    document.getElementById("volume_slider").blur();
});
