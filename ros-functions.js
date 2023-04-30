// Run a phase sequence
function run_phases(phasearr, idx) {

    // Check if we have something to do
    if (idx >= phasearr.length) return;

    // Get and run the function with a callback to trigger next phase
    var self = this;
    var fn = phasearr[idx];
    fn(function(){
    setTimeout(function(){
        self.run_phases(phasearr, idx+1);
    }, 1);
    });

};

// Wait and then trigger callback
function wait(cb, time) {
  setTimeout(function() {
    cb();
  }, time);
}
function turnright(deg){
    //sets the turn to be either 45 degrees or 90 degrees
    var ms = 6000;
    if (deg === 45) {
        ms = 3000;
    }

    return function(cb) {
        console.log("turning right")
        Ohmni.move(100, 100, ms);
        wait(cb, ms+500);      
    }
}

function turnleft(is45){    
    //sets the turn to be either 45 degrees or 90 degrees
    var ms = 6000;
    if (deg === 45) {
        ms = 3000;
    }

    return function(cb) {
        console.log("turning left");
        Ohmni.move(-100, -100, ms);
        wait(cb, ms+500);      
    }

}

function goforward(sec) {
    ms = sec * 1000;
    return function(cb) {
        console.log("going forward");
        Ohmni.move(200, -200, ms);
        wait(cb, ms+500);      
    }
}

function gobackward(sec) {
    ms = sec * 1000;
    return function(cb) {
        console.log("going backward");
        Ohmni.move(-200, 200, ms);
        wait(cb, ms+500);      
    }    
    
}
