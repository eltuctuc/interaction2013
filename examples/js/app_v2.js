var output, input, video, webcam;
var outputResolution, videoResolution;
var source;
var fg;

$(document).ready(function($) {

	output = document.getElementById('output');
	video = document.getElementById('video');

	fg = new FrameGrabber(video, output);

	$('#page_2').hide();
	$('#page_3').hide();

	$('.btn.next').addClass('disabled');

    $('#videoButton').bind('click', function (event) {
    	if(video.paused === false) {
    		video.pause();
    		video.currentTime = 0;
    		video.src = 'video/big_buck_bunny_480p.ogg';
    	} else {
    		video.play();
    	}
    })

	$('.slider')
		.slider()
		.on('slide', function (event) {
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
						green: 1.0,
						blue: 1.0
					}; break;
				case JSManipulate['saturation']:
					defaultValues = {
						amount : map(value, 0,100, 1,0)
					}; break;
			}

			fg.effect.defaultValues = defaultValues;
		});

	$('.dropdown')
		.bind('click',function (event) {
			$('#interface').slideToggle();
		});

	$('#glaucomaButton')
		.bind('change', function (event) {
			var value = getRangeValue();
			
			fg.setEffect('pinch');
		});
	$('#kataraktButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			fg.setEffect('blur');
			fg.effect.defaultValues = {
				amount : map(value, 0,100, 0,20)
			};
		});
	$('#protanopieButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			fg.setEffect('rgbadjust');
			fg.effect.defaultValues = {
				red: map(value, 0,100, 1,0),
				green: 1.0,
				blue: 1.0
			};
		});
	$('#dyschromatopsieButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			fg.setEffect('saturation');
			fg.effect.defaultValues = {
				amount : map(value, 0,100, 1,0)
			};
		});

	$('#dataWebcamButton').bind('click', function(event) {
		if (!WebGlSupport()) {
			alert('No Support');
			return false;
		};
		showChoosePage();
	});
	$('#dataVideoButton').bind('click', function(event) {
		showChoosePage();
	});


	$('#nodataWebcamButton').bind('click', function(event) {
		if (!WebGlSupport()) {
			alert('No Support');
			return false;
		};
		showMainPage();
	});
	$('#nodataVideoButton').bind('click', function(event) {
		showMainPage();
	});

	$('.btn.back').bind('click', function(event) {
		video.pause();
		video.src='video/big_buck_bunny_480p.ogg';
		showStartPage();
	});

	$('.btn.next').bind('click', function(event) {
		showMainPage();
	});

	$('#upload').bind('change',function(event) {
	    var reader = new FileReader();

        var files = event.target.files;
        var file = files[0];

	    reader.onload = (function(f) {
	        return function(e) {
	            var content = e.target.result;
	            var name = escape(f.name);

	            data = JSON.parse(content);
				$('.btn.next').removeClass('disabled');
	        };
	    })(file);

	    // Read in the image file as a data URL.
	    reader.readAsText(file);
	});
});

function showStartPage() {
	video.pause();
	video.src='video/big_buck_bunny_480p.ogg';
	data = exampleData;

	$('#page_1').show();
	$('#page_2').hide();
	$('#page_3').hide();
}

function showChoosePage() {
	video.pause();
	video.src = 'video/big_buck_bunny_480p.ogg';
	data = null;

    // Check for the various File API support.
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        // Great success! All the File APIs are supported.
        alert('The File APIs are not fully supported in this browser.');
    }

	$('#page_1').hide();
	$('#page_2').show();
	$('#page_3').hide();
}

function showMainPage() {
	$('#page_1').hide();
	$('#page_2').hide();
	$('#page_3').show();

	$('#interface').slideToggle();

	setTimeout(function() {
		video.pause();
		video.play();
	}, 5000);
}

function getRangeValue () {
	return $('.slider [type=range]').val();
}

function WebGlSupport() {
	window.URL = window.URL || window.webkitURL;
	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
	navigator.getUserMedia({video:true,audio:false}, gotStream, gotError);

	if (!Glsl.supported()) {
		alert('WebGL is not supported.');
		return false;
	}
	return true;
}

function gotStream(stream) {
	localMediaStream = stream;
	video.src = window.URL.createObjectURL(stream);
	video.play();
}

function gotError() {
	console.log("error happened");
}

function map (value, start1, stop1, start2, stop2) {
	value = parseFloat(value);
	if(isNaN(value)) {
		return 0;
	}
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}
