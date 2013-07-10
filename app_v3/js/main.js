var video, output;
var outputResolution, videoResolution;
var videoWidth, videoHeight;
var source;
var sourceFlag;
var diseaseFlag = true;
var currentEffect = '', currentValue = 0;
var currentOverlay;
var fg;
var localMediaStream;

$(document).ready(function() {

	output = document.getElementById('output');
	video = document.getElementById('video');

	videoWidth = 1920;
	videoHeight = 1080;
	videoResolution = videoWidth/videoHeight;

	resizeCanvas();
	$(window).resize(function() {
		resizeCanvas();
	})

	var hash = window.location.hash;

	if(hash == '#patient') {
		$('#overlay').attr('src','img/patientdata.png');
	}
	if(hash == 'example') {
		$('#overlay').attr('src','img/exampledata.png');
	}

	fg = new FrameGrabber(video, output);
});

function getRangeValue () {
	return $('.slider').val();
}

function sliderClick () {
	var value = getRangeValue();
}


function resizeCanvas() {
	//console.log('window',$(window).width() , $(window).height());

	if($(window).width() >= $(window).height()*videoResolution) {

		var dif = $(window).height() * videoWidth / videoHeight;
		$('.content').width(dif);
		$('.content').height($(window).height());

		$('#output').width(dif);
		$('#output').height($(window).height());

		$('#overlay').width(dif);
		$('#overlay').height($(window).height());

		//console.log('content width',$('.content').width() , $('.content').height());
	} else {
		var dif = $(window).width() * videoHeight / videoWidth;
		$('.content').height(dif);
		$('.content').width($(window).width());


		$('#output').height(dif);
		$('#output').width($(window).width());

		$('#overlay').height(dif);
		$('#overlay').width($(window).width());

		//console.log('content height',$('.content').width() , $('.content').height());
	}
}

function drawBlack () {
	var ctx = output.getContext("2d");

	ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
}

function map (value, start1, stop1, start2, stop2) {
	value = parseFloat(value);
	if(isNaN(value)) {
		return 0;
	}
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

function sliderClick () {
	var value = getRangeValue();
	var effect = fg.getEffect();
	var defaultValues = {};

	//console.log(value, effect);

	if(!effect) {
		console.log('kein Effect');
		return false;
	}
	if (isNaN(value)) {
		console.log('keine Value');
		return false;
	};

	currentValue = value;

	var _map = map(value, 0,100, 0,20);

	switch (effect) {
		case JSManipulate['blur']:
			defaultValues = {
				amount : map(value, 0,100, 0,20)
			}; break;
		case  JSManipulate['pinch']:
			defaultValues = {
				amount : map(value, 0,100, 0,1),
				radius : map(value, 0,100, 0,500),
				angle : 0,
				centerX : 0.5,
				centerY : 0.5
			}; break;
		case  JSManipulate['rgbadjust']:
			defaultValues = {
				red: map(value, 0,100, 1,0),
				green: map(value, 0,100, 1,0.5),
				blue: 1.0
			}; break;
		case JSManipulate['sepia']:
			defaultValues = {
				amount : map(value, 0,100, 0,30)
			}; break;
		case JSManipulate['redgreen']:
			defaultValues = {
				r : map(value, 0,100, 0,10),
				g : map(value, 0,100, 0,10),
				b : map(value, 0,100, 0,10),
			}; break;
	}

	fg.effect.defaultValues = defaultValues;
}