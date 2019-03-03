var voxel = new Voxel(10, 20);

document.addEventListener("keydown", function(ev){
    voxel.handleArrows(ev);
});
