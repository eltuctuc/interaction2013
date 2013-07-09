var output, input, video, webcam;
var outputResolution, videoResolution;
var source;
var sourceFlag;
var diseaseFlag = true;
var currentEffect = '', currentValue = 0;
var fg;
var localMediaStream;

$(document).ready(function($) {
	console.log('ready');

	output = document.getElementById('output');
	//video = document.createElement('VIDEO');
	//$(video).attr('id', 'video');
	//$(video).prop('muted', true);
	video = document.getElementById('video');

	/*setInterval(function() {
		location.reload();
	}, 1000*60*5);*/

	fg = new FrameGrabber(video, output);

	$('#page_2').hide();
	$('#page_3').hide();

    /*$('#videoButton').bind('click', function (event) {
    	if(video.paused === false) {
    		video.pause();
    		video.currentTime = 0;
    		video.src = 'video/big_buck_bunny_480p.ogg';
    	} else {
    		video.play();
    	}
    })*/

	$('#interface').slideToggle();

	$('.slider')
		.slider()
		.on('slide', sliderClick);

	$('.dropdown')
		.bind('click',function (event) {
			$('#interface').slideToggle();
		});

	$('#glaucomaButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			fg.setEffect('pinch');

			currentEffect = 'pinch';
		});
	$('#kataraktButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			fg.setEffect('blur');
			fg.effect.defaultValues = {
				amount : map(value, 0,100, 0,20)
			};

			currentEffect = 'blur';
		});
	$('#protanopieButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			if(isNaN(value) || value == '' || value == null) {
				value = map(100, 0,100, 1,0);
			}
			console.log(typeof value);

			fg.setEffect('rgbadjust');
			fg.effect.defaultValues = {
				red: map(value, 0,100, 1,0),
				green: 1.0,
				blue: 1.0
			};

			currentEffect = 'rgbadjust';
		});
	$('#dyschromatopsieButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			/*fg.setEffect('sepia');
			fg.effect.defaultValues = {
				amount : map(value, 0,100, 0,30)
			};*/

			fg.setEffect('redgreen');
			fg.effect.defaultValues = {
				r : map(value, 0,100, 0,1),
				g : map(value, 0,100, 0,1),
				b : map(value, 0,100, 0,1),
			};

			currentEffect = 'redgreen';
		});

	$('#disease')
		.bind('click', function(event) {
			if(diseaseFlag) {
				diseaseFlag = false;

				fg.effect = '';

				$('#glaucoma').addClass('disabled');
				$('#glaucomaButton').attr('disabled', true);
				$('#katarakt').addClass('disabled');
				$('#kataraktButton').attr('disabled', true);
				$('#protanopie').addClass('disabled');
				$('#protanopieButton').attr('disabled', true);
				$('#dyschromatopsie').addClass('disabled');
				$('#dyschromatopsieButton').attr('disabled', true);


				$('.slider').addClass('disabled');

				$('.slider').off('slide', sliderClick);
			} else {
				diseaseFlag = true;

				fg.setEffect(currentEffect);

				$('#glaucoma').removeClass('disabled');
				$('#glaucomaButton').attr('disabled', false);
				$('#katarakt').removeClass('disabled');
				$('#kataraktButton').attr('disabled', false);
				$('#protanopie').removeClass('disabled');
				$('#protanopieButton').attr('disabled', false);
				$('#dyschromatopsie').removeClass('disabled');
				$('#dyschromatopsieButton').attr('disabled', false);


				$('.slider').removeClass('disabled');

				$('.slider').on('slide', sliderClick);
				sliderClick();
			}
		});

	$('#dataWebcamButton')
		.bind('click', function(event) {
			sourceFlag = 'webcam';
			showChoosePage();
		});

	$('#dataVideoButton')
		.bind('click', function(event) {
			sourceFlag = 'video';
			showChoosePage();
		});


	$('#nodataWebcamButton')
		.bind('click', function(event) {
			sourceFlag = 'webcam';
			showMainPage();
		});

	$('#nodataVideoButton')
		.bind('click', function(event) {
			sourceFlag = 'video';
			showMainPage();
		});


	$('.btn.back')
		.bind('click', function(event) {
			if(sourceFlag == 'webcam') {
				localMediaStream.stop();
			}
			video.pause();

			drawBlack();

			showStartPage();
		});

	$('.btn.next')
		.bind('click', function(event) {
			showMainPage();
		});


	$('#upload')
		.bind('change',function(event) {
		    var reader = new FileReader();

	        var files = event.target.files;
	        var file = files[0];

		    reader.onload = (function(f) {
		        return function(e) {
		            var content = e.target.result;
		            var name = escape(f.name);

		            data = JSON.parse(content);
					$('.btn.next').attr('disabled',false);
		        };
		    })(file);

		    // Read in the image file as a data URL.
		    reader.readAsText(file);
		});
});

function showStartPage() {
	data = exampleData;

	$('#page_1').show();
	$('#page_2').hide();
	$('#page_3').hide();
}

function showChoosePage() {
	data = null;
	$('.btn.next').attr('disabled',true);

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

	if(sourceFlag == 'video') {
		$(video).html('');

		video.src = 'video/vid1.mp4';
		video.play();

		fg.video = video;
	}

	if(sourceFlag == 'webcam') {
		window.URL = window.URL || window.webkitURL;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		navigator.getUserMedia(
			{audio: false, video:true},
			function (stream) {
				localMediaStream = stream;
				//video = document.querySelector('video');
				video.src = window.URL.createObjectURL(stream);
				video.onloadedmetadata = function(e) {
					e.target.play();

					fg.video = video;
				};
			},
			function (err) {
				console.log("The following error occured: " + err);
			});

		if (!Glsl.supported()) {
			alert('WebGL is not supported.');
			return false;
		}
	}

	if(currentEffect) {
		fg.setEffect(currentEffect);
	}
}

function getRangeValue () {
	return $('.slider [type=range]').val();
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