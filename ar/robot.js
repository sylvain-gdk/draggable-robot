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

window.addEventListener("load", function(){
  rotate('image1', 'img1', random());
  rotate('image2', 'img2', random());
  rotate('image3', 'img3', random());
  rotate('image4', 'img4', random());
  rotate('image5', 'img5', random());
});
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
    if(count < 6){
      var imgId = document.getElementById(img);
      imgId.style.display = "block";
    }else{
      let hide = document.getElementsByTagName("img");
      for(var i = 0; i < hide.length; i++){
        hide[i].style.display = "none";
      }
      // shows animation when puzzle is completed
      var animate = document.getElementById("animate");
      animate.style.display = 'block';
      var again = document.getElementById("again");
      again.innerHTML = "Play again?";
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
  img.addEventListener("click", function(event){
    rotate(figId, imgId, amount+90);
    event.preventDefault();
  });
}