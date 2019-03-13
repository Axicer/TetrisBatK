class Controller{

    constructor(){
        //the legal notice that will be displayed at least 5 seconds
        this.legal_notice = document.getElementById("legal-notice");
        //get whether the legal notice can be release
        this.canReleaseLegalNotice = false;
        //get whether the 5 seconds has been spent for displaying the legal notice
        this.legalNoticeTimeSpent = false;
        //create and load datas from loader
        this.loader = new Loader(this);
        this.loader.loadAll();
        //after 5 seconds, notice that legal notice has been displayed at least 5 seconds
        setTimeout((function(self){
            return function(){
                self.legalNoticeTimeSpent = true;
            }
        })(this), 5000);

        //create a interval checking for both parameters to hide the legal notice
        this.checkLegalInterval = setInterval((function(self){
            return function(){
                //check for when to hide legal notice
                if(self.legalNoticeTimeSpent && self.canReleaseLegalNotice){
                    //clear this timeout
                    clearInterval(self.checkLegalInterval);

                    //hide legal notice
                    self.legal_notice.style.opacity = 0;
                    setTimeout((function(self){
                        return function(){
                            self.legal_notice.style.zIndex = -1000;
                        }
                    })(self), 1000);

                    //create game
                    self.game = new Game(self.loader);
                    document.addEventListener("keydown", function(ev){
                        self.game.handleArrows(ev);
                    });


                    //load song
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
            }
        })(this), 1000);

        //bind slider movement to the current controller
        document.getElementById("volume_slider").addEventListener("input", (function(self){
            return function(){
                self.loader.setMainVolume(document.getElementById("volume_slider").value);
            }
        })(this));
        //unfocus (blur) when mouse up
        document.getElementById("volume_slider").addEventListener("mouseup", function(){
            document.getElementById("volume_slider").blur();
        });
    }

    //choose a new song and play it
    playCurrentSong(self){
        var choosenSong = self.loader.getRandomSong();
        while(choosenSong == self.currentSong){
            choosenSong = self.loader.getRandomSong();
        }
        self.currentSong = choosenSong;
        self.currentSong.addEventListener('ended', (function(self){
            return function(){
                self.playCurrentSong(self);
            }
        })(self), false);
        self.currentSong.play().then(function(){}).catch(function(error){
            console.log("autoplay rejected, manual audio button is WIP");
        });
    }

    //restart a new game
    restart(){
        var restart_btn = document.getElementById("restart_btn");
        restart_btn.style.visibility = "hidden";
        this.game.reset();
        this.game = new Game(this.loader);
    }
}

function restart(){
    controller.restart();
}

controller = new Controller();
