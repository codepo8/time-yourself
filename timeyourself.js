(function(){

var setchallenge = document.querySelector('#setchallenge'),
    doit = document.querySelector('#challenge'),
    log = document.querySelector('#log'),
    info = document.querySelector('#challengeintro'),
    time = 0,
    challengetime = 0,
    itson = false;

setchallenge.innerHTML = '<button id="go">Give me a challenge</button>';
var but = document.querySelector('#go');
but.addEventListener('click', challenge, false);

document.addEventListener('mousedown', down, false);
document.addEventListener('mouseup', up, false);
document.addEventListener('touchstart', down, false);
document.addEventListener('touchend', up, false);
document.addEventListener('keydown', down, false);
document.addEventListener('keyup', up, false);

function down(ev) {
  if (!itson) { return; }
  ev.preventDefault();
  doit.className = 'measuring';
  if (time === 0) { 
    time = ev.timeStamp; 
    log.classList.add('animate');
  }
}
function up(ev) {
  ev.preventDefault();
  doit.className = '';
  if (!itson) { return; }
  if (time !== 0) {
    displayresult(ev.timeStamp - time);
    time = 0;
    log.classList.remove('animate');
  }
}

function displayresult(result) {
  var tomatch = challengetime * 1000,
      difference = Math.floor(tomatch - result),
      msg = '',
      tweet = '';
  if (difference === 0) {
    msg = 'Wow, you nailed it!';
    tweet = 'I measured my sense of time at http://bit.ly/M0BrgC and I got it'+
            ' 100% right! Your turn! #timeyourself';
  }
  if (difference > 0) {
    msg = 'You are <span>' + difference + ' milliseconds</span> short.';
    tweet = 'I measured my sense of time at http://bit.ly/M0BrgC and I was'+
            ' only ' + difference + ' milliseconds short. Your turn! '+
            '#timeyourself';
  }
  if (difference < 0) {
    msg = 'You are <span>' + -difference + '  milliseconds</span> over.';
    tweet = 'I measured my sense of time at http://bit.ly/M0BrgC and I was'+
            ' only ' + -difference + ' milliseconds over. Your turn! '+
            '#timeyourself';
   }
  log.innerHTML = msg + ' <a href="http://twitter.com/home?status='+
                  encodeURIComponent(tweet)+'">Tweet this</a>';
  itson = false;
  log.className = 'done';
  info.className = '';
}

function challenge() {
  log.className = '';
  var timetomatch = Math.random() * 10;
  if (timetomatch === 0) { timetomatch = 0.5; }
  var decimal = (timetomatch - parseInt(timetomatch, 10)); 
  decimal = Math.round(decimal * 10); 
  if (decimal == 5) { 
    timetomatch = (parseInt(timetomatch, 10) + 0.5); 
  } 
  if ( (decimal < 3) || (decimal > 7) ) { 
      timetomatch = Math.round(timetomatch); 
  } else {
      timetomatch = (parseInt(timetomatch, 10) + 0.5); 
  } 
  doit.innerHTML = 'Can you do ' + timetomatch + ' seconds? <span>Measuring&hellip;</span>';
  challengetime = timetomatch;
  itson = true;
  info.className = 'show';
}
})();
