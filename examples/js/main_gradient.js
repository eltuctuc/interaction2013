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

var grad_size = 100; //äußere Größe des Grad und Rect bestimmen
var x_pos = 200-grad_size; //x-position des Grad-Mittelpunktes bestimmen
var y_pos = 300-grad_size; //y-position des Grad-Mittelpunktes bestimmen

context.drawImage(img,0,0,$('#canvas').width(),$('#canvas').height());
var gradient = context.createRadialGradient(x_pos+grad_size,y_pos+grad_size,5,x_pos+grad_size,y_pos+grad_size,grad_size);
	gradient.addColorStop(0, '#000000');
	gradient.addColorStop(1, '#FFFFFF');
	
	context.fillStyle = gradient;
	context.fillRect(x_pos,y_pos,grad_size*2,grad_size*2);
}