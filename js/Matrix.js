class Matrix{

    constructor(tab){
        this.tab = tab;
    }

    rotate(sens){
        if(sens == LEFT_ROTATION_ANGLE){
            this.rotateCounterClockwise();
        }else if (sens == RIGHT_ROTATION_ANGLE) {
            this.rotateClockwise();
        }else{
            console.log("error while trying to rotate")
        }
    }

    rotateCounterClockwise(){
       var n=this.tab.length;
       for (var i=0; i<n/2; i++) {
           for (var j=i; j<n-i-1; j++) {
               var tmp=this.tab[i][j];
               this.tab[i][j]=this.tab[j][n-i-1];
               this.tab[j][n-i-1]=this.tab[n-i-1][n-j-1];
               this.tab[n-i-1][n-j-1]=this.tab[n-j-1][i];
               this.tab[n-j-1][i]=tmp;
           }
       }
       return this.tab;
   }

   rotateClockwise() {
        var n=this.tab.length;
        for (var i=0; i<n/2; i++) {
            for (var j=i; j<n-i-1; j++) {
                var tmp=this.tab[i][j];
                this.tab[i][j]=this.tab[n-j-1][i];
                this.tab[n-j-1][i]=this.tab[n-i-1][n-j-1];
                this.tab[n-i-1][n-j-1]=this.tab[j][n-i-1];
                this.tab[j][n-i-1]=tmp;
            }
        }
        return this.tab;
    }
}

const LEFT_ROTATION_ANGLE = "left";
const RIGHT_ROTATION_ANGLE = "right";
