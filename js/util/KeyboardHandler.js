class KeyboardHandler{

    constructor(){
        this.keys = [];
        this.keysOnce = [];
        this.onceTreated = [];

        this.dasKeys = [];
        this.dasTreated = [];
        this.bindEvents();
    }

    bindEvents(){
        var self = this;
        var set = function(key, val){
            self.keys[key] = val;
        };
        var setOnce = function(key, val){
            self.keysOnce[key] = val;
        };
        var setTreated = function(key, val){
            self.onceTreated[key] = val;
        };
        window.addEventListener("keyup", function(ev){
            //set key up
            self.keys[ev.key] = false;
            //set key not down once
            self.keysOnce[ev.key] = false;
            self.onceTreated[ev.key] = false;

            //remove DAS validity
            self.dasKeys[ev.key] = false;
            self.dasTreated[ev.key] = false;
        });
        window.addEventListener("keydown", function(ev){
            //set key down
            self.keys[ev.key] = true;
            //if key isn't in key once and not treated
            if(!self.keysOnce[ev.key] && !self.onceTreated[ev.key]){
                self.keysOnce[ev.key] = true;
                self.onceTreated[ev.key] = true;
            }else{
                self.keysOnce[ev.key] = false;
            }
            // if key is not in DAS keys
            if(!self.dasKeys[ev.key] && ! self.dasTreated[ev.key]){
                self.dasTreated[ev.key] = true;
                setTimeout(function(){
                    if(self.dasTreated[ev.key]){
                        self.dasKeys[ev.key] = true;
                    }
                }, DAS_RECOGNITION_TIMEOUT);
            }
        });
    }
}

//250 ms
const DAS_RECOGNITION_TIMEOUT = 200;
