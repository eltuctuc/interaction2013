
$(document).ready(function() {
	$('#back').bind('click',function() {
		$(location).attr('href','index.html');
	});


	$("#settingOpen").bind('click',function() {
		$('#interface_wrapper').show();
	});

	$("#settingClose").bind('click',function() {
		$('#interface_wrapper').hide();
	});


	$('.slider').slider().bind('change', sliderClick);


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
				$('.slider').attr('disabled', true);
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
				$('.slider').attr('disabled', false);
			}
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
});