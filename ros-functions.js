
const location_map = new Map();
location_map.set('iqbal', [100,100]);
location_map.set('behl', [200,200]);
location_map.set('bezzo', [300,300]);

// extracts the value of the selection made by user
// sends corresponding move goal
function sendgoal(element) {
    var location = element.value;
    console.log(location);

    lspeed = location_map.get(location)[0];
    rspeed = location_map.get(location)[1];
    console.log("going to " + lspeed + ", " + rspeed);
    Ohmni.move(lspeed, rspeed, 3000);
}

console.log("Ohmni here:", Ohmni)
// Convenience helpers

function wait(cb, ms) {
  setTimeout(function(){ cb(); }, ms);
}

var lhue = 0;

// Set up the beat here
function upbeat() {

  Ohmni.setNeckPosition(550, 140);
  wait(function(){
    downbeat();
  }, 1000);

}

// Set up the beat here
function downbeat() {

  // Change light on every downbeat
  Ohmni.setLightColor(lhue, 230, 100);
  lhue += 20;
  if (lhue > 255) lhue -= 256;

  // Perform upbeat next
  Ohmni.setNeckPosition(350, 80);
  wait(function(){
    upbeat();
  }, 500);

}


function onPlayerStateChange(event) {
  console.log("Player state change.");
}

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

function move() {
  var phases = [
    function(cb) {
      Ohmni.move(-100, 100, 2000);
      wait(cb, 2000);
    },
  ];
  run_phases(phases, 0);
}

function praise() {
  Ohmni.say("Meo is cool!", function(){
    Ohmni.say("Praise Callback");
  });
}

function requestBotInfo() {
  Ohmni.requestBotInfo();
}

function cbRequestBotInfo(data) {
  console.log('cbRequestBotInfo', data)
  showBotInfo(data);
}

function showBotInfo(data) {
  const dataObject = JSON.parse(data);

  document.querySelector("#bot_info").style.display = "block";
  document.getElementById("bot_name").innerHTML = dataObject.name;
  document.getElementById("bot_id").innerHTML = dataObject.botId;
  document.getElementById("bot_version").innerHTML = dataObject.version;
  document.getElementById("wifi_ssid").innerHTML = dataObject.wifi.ssid;
  document.getElementById("wifi_bssid").innerHTML = dataObject.wifi.bssid;
  document.getElementById("wifi_ip").innerHTML = intToIPV4(dataObject.wifi.ip);
  document.getElementById("wifi_frequency").innerHTML = dataObject.wifi.freq + " MHz";
  document.getElementById("wifi_rssi").innerHTML = dataObject.wifi.rssi + " dBm";
  document.getElementById("wifi_speed").innerHTML = dataObject.wifi.speed + " Mbps";
  document.getElementById("serial").innerHTML = dataObject.serial;

  const shareLinksNode = document.querySelector("#share_links");
  // remove all element
  while (shareLinksNode.firstChild) {
    shareLinksNode.removeChild(shareLinksNode.firstChild);
  }
  const shareLinksElements = Object.keys(dataObject.shareLinks).forEach(element => {
    const shareLink = document.createElement("p");
    const shareLinkNode = document.createTextNode(`Share link : app.ohmnilabs.com/share/${element}`);
    shareLink.appendChild(shareLinkNode);
    shareLinksNode.appendChild(shareLink);
  });
}

function hideBotInfo() {
  document.querySelector("#bot_info").style.display = "none";
}

const intToIPV4 = num => {
  const part1 = num & 255;
  const part2 = (num >> 8) & 255;
  const part3 = (num >> 16) & 255;
  const part4 = (num >> 24) & 255;
  return `${part1}.${part2}.${part3}.${part4}`;
};

function nod() {
  var phases = [
    function(cb) {
      Ohmni.say("Nodding.");
      wait(cb, 800);
    },
    function(cb) {
      Ohmni.setNeckTorqueEnabled(1);
      wait(cb, 800);
    },
    function(cb) {
      Ohmni.setNeckPosition(600, 100);
      wait(cb, 2000);
    },
    function(cb) {
      Ohmni.setNeckPosition(250, 100);
      wait(cb, 2000);
    },
    function(cb) {
      Ohmni.setNeckTorqueEnabled(0);
      wait(cb, 1);
    },
  ];
  run_phases(phases, 0);
}