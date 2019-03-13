//shout message for millis time in the divId element
function shout(message, millis, divId = "shout"){
    var shout_elem = document.getElementById(divId);
    shout_elem.innerHTML = message;
    shout_elem.style.visibility = "visible";
    setTimeout((function(elem, self){
        return function(){
            elem.style.visibility = "hidden";
        }
    })(shout_elem, this), millis);
}
