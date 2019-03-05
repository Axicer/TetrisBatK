var voxel = new Voxel(10, 20);

document.addEventListener("keydown", function(ev){
    voxel.handleArrows(ev);
});

currentSong = getRandomSong();
setVolume(0.1);
playCurrentSong();

function playCurrentSong(){
    currentSong.currentTime = 0;
    var choosenSong = getRandomSong();
    while(choosenSong == currentSong){
        choosenSong = getRandomSong();
    }
    currentSong = choosenSong;
    currentSong.addEventListener('ended', playCurrentSong, false);
    currentSong.play().then(function() {
        console.log("music started");
    }).catch(function(error){
        console.log("autoplayed music prevented ! No music will be played");
    });
}

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
