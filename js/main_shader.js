var canvas, context, img;

$(document).ready(function () {
 canvas = document.getElementById('canvas');

 /*$(window).resize(function () {
  drawImg(img);
 });*/

 $('#canvas').resize(function () {
  drawImg(img);
 });

 init();
});

function init () {

 img = new Image();
 img.src = 'img/testbild.jpg';
 img.addEventListener('load', function () {
  console.log(42);
 });

 $('#canvas')
  .attr('width', $(document).width())
  .attr('height', $(document).height());
 
 if(canvas.getContext){
  context = canvas.getContext('2d');

  drawImg ( img );
  //context.fillStyle = "rgb(255, 0, 255)";
  //context.fillRect(0, 0, $(document).width(),$(document).height());
 }
}

function drawImg( img ) {
 context.drawImage(img,0,0,$('#canvas').width(),$('#canvas').height());
}