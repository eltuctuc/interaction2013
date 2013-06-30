var output, input, video, webcam;
var outputResolution, videoResolution;
var fg;

$(document).ready(function($) {

	output = document.getElementById('output');
	video = document.getElementById('video');
	webcam = document.getElementById('webcam');


	fg = new FrameGrabber(video, output);

    // Check for the various File API support.
    if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
        // Great success! All the File APIs are supported.
        alert('The File APIs are not fully supported in this browser.');
    }

    $('#videoButton').bind('click', function (event) {
    	if(video.paused === false) {
    		video.pause();
    		video.currentTime = 0;
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
			fg.effect.defaultValues = {
				amount : map(value, 0,100, 0,1),
				radius : map(value, 0,100, 0,500),
				angle : 0,
				centerX : 0.5,
				centerY : 0.5
			};
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
});

function getRangeValue () {
	return $('.slider [type=range]').val();
}

function map (value, start1, stop1, start2, stop2) {
	value = parseFloat(value);
	if(isNaN(value)) {
		return 0;
	}
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}