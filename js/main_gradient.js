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
  if(canvas.getContext){
  context = canvas.getContext('2d');

  drawImg ( img );
  //context.fillStyle = "rgb(255, 0, 255)";
  //context.fillRect(0, 0, $(document).width(),$(document).height());
}
 });

 $('#canvas')
  .attr('width', $(document).width())
  .attr('height', $(document).height());
}

function drawImg( img ) {

var width = context.canvas.width;
var height = context.canvas.height;

 context.drawImage(img,0,0,$('#canvas').width(),$('#canvas').height());
 context.fillStyle = 'rgb(255, 0, 0)';
 context.fillRect(20, height-(height*0.2), width/30, height*0.2);
}