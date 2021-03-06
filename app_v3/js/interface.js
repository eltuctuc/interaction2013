
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

				if(hash == '#example') {
					$('.slider').addClass('disabled');
					$('.slider').attr('disabled', true);
				}

				if(currentEffect == 'pinch') {
					$('#overlay').hide();
				}
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

				if(hash == '#example') {
					$('.slider').removeClass('disabled');
					$('.slider').attr('disabled', false);
				}
				if(currentEffect == 'pinch') {
					$('#overlay').show();
				}
			}
		});

	$('#glaucomaButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			fg.setEffect('pinch');

			currentEffect = 'pinch';

			$('#overlay').show();
		});
	$('#kataraktButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			fg.setEffect('blur');
			fg.effect.defaultValues = {
				amount : map(value, 0,100, 0,20)
			};

			currentEffect = 'blur';

			$('#overlay').hide();
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
			
			$('#overlay').hide();
		});
	$('#dyschromatopsieButton')
		.bind('change', function (event) {
			var value = getRangeValue();

			fg.setEffect('saturation');
			fg.effect.defaultValues = {
				amount : map(value, 0,100, 1,0)
			};

			/*fg.setEffect('redgreen');
			fg.effect.defaultValues = {
				r : map(value, 0,100, 0,1),
				g : map(value, 0,100, 0,1),
				b : map(value, 0,100, 0,1),
			};*/

			//currentEffect = 'redgreen';
			currentEffect = 'saturation';
			
			$('#overlay').hide();
		});
});