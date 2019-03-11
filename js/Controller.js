class Controller{

    constructor(loader){
        this.legal_notice = document.getElementById("legal-notice");
        this.loader = loader;
        this.loader.loadAll();
        setTimeout((function(self){
            return function(){
                self.legal_notice.style.opacity = 0;
                self.game = new Game(self.loader);
                document.addEventListener("keydown", function(ev){
                    self.game.handleArrows(ev);
                });

                setTimeout((function(self){
                    return function(){
                        self.legal_notice.style.zIndex = -1000;
                    }
                })(self), 1000);

                self.currentSong = self.loader.getRandomSong();
                self.loader.setMainVolume(0.1);
                self.currentSong.play().then(function(){}).catch(function(error){
                    console.log("autoplay rejected, manual audio button is WIP");
                });
                self.currentSong.addEventListener('ended', (function(self){
                    return function(){
                        self.playCurrentSong(self);
                    }
                })(self), false);
            }
        })(this), 5000);

        document.getElementById("volume_slider").addEventListener("input", (function(self){
            return function(){
                self.loader.setMainVolume(document.getElementById("volume_slider").value);
            }
        })(this));
        document.getElementById("volume_slider").addEventListener("mouseup", function(){
            document.getElementById("volume_slider").blur();
        });
    }

    playCurrentSong(self){
        var choosenSong = self.loader.getRandomSong();
        while(choosenSong == self.currentSong){
            choosenSong = self.loader.getRandomSong();
        }
        self.currentSong = choosenSong;
        self.currentSong.addEventListener('ended', self.playCurrentSong, false);
        self.currentSong.play().then(function(){}).catch(function(error){
            console.log("autoplay rejected, manual audio button is WIP");
        });
    }

    restart(){
        var restart_btn = document.getElementById("restart_btn");
        restart_btn.style.visibility = "hidden";
        this.game = new Game(this.loader);
    }
}

function restart(){
    controller.restart();
}

controller = new Controller(new Loader());
