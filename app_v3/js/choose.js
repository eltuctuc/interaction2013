var video, output;
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

	video.play();

	fg = new FrameGrabber(video, output);
});

function getRangeValue () {
	return $('.slider [type=range]').val();
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