// opens a separate smaller window when on large screen
function openWindow(){
  var windowWidth = 700;
  var windowHeight = 1000;
  var xPos = (screen.width/2) - (windowWidth/2);
  var yPos = (screen.height/2) - (windowHeight/2);
  if(screen.width > 1000){
    window.open("./draggable.html","POPUP","width=" + windowWidth +",height="+ windowHeight +",left="+ xPos +",top=" + yPos);
  }else{
    location.href='./draggable.html';
  }
}

// counts until puzzle is completed
var count = 1;

// random degree for rotation
function random(){
  var degree = [90, 180, 270];
  return degree[Math.floor(Math.random()*degree.length)];
}

function tolerance(origin, target){
  var ok = false;
  var check1 = origin - target;
  var check2 = target - origin;
  if((check1 >= 0 && check1 <=1) || (check2 >= 0 && check2 <= 1)){
    ok = true
  }
  return ok;
}
// compares position of one piece against target
function compare(id, ui, target){
  if(tolerance(ui.position.top, target.offsetTop) && tolerance(ui.position.left, target.offsetLeft)){
    // adds 1 when puzzle piece is in place
    count++;
    // disables drag when puzzle piece is in place
    $( id ).draggable( "disable" );
    // shows next piece of puzzle
    var img = 'img' + count;
    var fig = '#image' + count;
    var widget = '.ui-widget-image' + count;
    var snaptarget = 'snaptarget' + count;
    var body = document.querySelector('body');
    var rotation = random();
    var figClass = 'start rotate' + rotation;
    if(count < 6){
      let figure = document.createElement('figure');
      figure.setAttribute('id', fig);
      figure.setAttribute('class', figClass);
      let image = document.createElement('img');
      let src = './images/robot-character_drag' + count + '.png';
      image.setAttribute('id', img);
      image.setAttribute('src', src);
      body.appendChild(figure);
      figure.appendChild(image);
      image.addEventListener("touchstart", function(event){
        rotate(fig, img, rotation+90);
      });
      $( figure ).draggable({
        snap: widget,
        snapMode: "inner",
        opacity: 0.35,
        containment: 'body',
        stop: function(event, ui){
          let target = document.getElementById(snaptarget);
          compare(this, ui, target);
        }
      });
    }else{
      let hideImg = document.getElementsByTagName("img");
      for(var i = 0; i < hideImg.length; i++){
        hideImg[i].style.display = "none";
      }
      // shows animation when puzzle is completed
      var animate = document.getElementById("animate");
      animate.style.display = 'block';
      var play = document.getElementById("play");
      play.innerHTML = "Play again?";
    }
  }
}
// rotates the piece of puzzle when clicked until in the right position
function rotate(figId, imgId, amount) {
  var figure = document.getElementById(figId);
  var img = document.getElementById(imgId);
  var imgWidth = img.clientWidth/2;
  var imgHeight = img.clientHeight/2;
  var translateString = 'translate(' + imgWidth + ', ' + imgHeight + ')';
  var figString = 'start ui-draggable ui-draggable-handle rotate' + amount + ' ' + translateString;
  figure.setAttribute("class", figString);
  var rotateString = 'rotate("' + figId + '", "' + imgId + '", ' + amount + ')';
  img.addEventListener("touchstart", function(event){
    rotate(figId, imgId, amount+90);
  });
}
