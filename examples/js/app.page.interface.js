App.Page.Interface = {

	buttons : [{
		id : 'slide1',
		name : 'Glaukom',
		effect : 'blur'
	},{
		id : 'slide2',
		name : 'Katarakt',
		effect : 'blur'
	},{
		id : 'slide3',
		name : 'Protanopie',
		effect : 'saturation'
	},{
		id : 'slide4',
		name : 'Dyschromatopsie',
		effect : 'redgreen'
	}],

	init: function() {

		this.createColumn1();
		this.createColumn2();

		$('#interface').hide();

		$('.interface_wrapper .dropdown a').bind('click', function () {
			$('#interface').slideToggle();
		});

		$('.slider').slider();
	},

	createColumn1 : function () {
		var back = this.createBackButton();
		var slider = this.createRangeSlider();

		jQuery('<div/>', {
			class : 'column'
		})
		.append(back,slider)
		.appendTo($('#interface'));
	},

	createColumn2 : function () {
		var filters = this.createFilterGroup();

		jQuery('<div/>', {
			class : 'column'
		})
		.append(filters)
		.appendTo($('#interface'));
	},

	createBackButton : function () {
		return jQuery('<button/>', {
			id : 'backBtn',
			text : 'Zurück zum Start',
			class : 'btn btn-dark'
		})
		.bind('click', function() {
			$('.interface_wrapper .container').hide();
			App.Page.showPage('page_1');
		})
		.prepend('<i class="icon-home"></i> ');
	},

	createRangeSlider : function () {
		var p = jQuery('<p>', {
			text : 'Regeln Sie hier die Intensität Ihrer Beeinträchtigung.'
		});

		var range = jQuery('<input/>', {
			id : 'rangeSlider',
			type : 'range',
			class : 'slider'
		})
		.data('sliderMax', 100)
		.data('sliderStep', 1)
		.on('slide', function () {
			var value = $(this).slider('getValue')[0].value;
			var effect = App.Fg.fg.effect;

			amount = value * effect.valueRanges.amount.max / 100;

			effect.defaultValues.amount = amount;
			
			/*if(App.Fg.hasEffect && value != '') {
				App.Fg.setValue(effect.defaultValues);
			}*/
		});

		return jQuery('<div/>', {
			class : 'range'
		})
		.append(p, range);
	},

	createFilterGroup : function () {
		var p = jQuery('<p>', {
			text : 'Wählen Sie die Beeinträchtigung/en für Ihre Simulation aus:'
		});

		var div = jQuery('<div/>', {
			class : 'filters'
		});

		for (var i = 0; i < this.buttons.length; i++) {
			var button = this.createFilterButton(this.buttons[i]);

			div.append(button);
		};
		
		return jQuery('<div/>', {
			class : 'filter_group'
		})
		.append(p,div);
	},

	createFilterButton : function ( btn ) {
		var uuid = createUUID();

		var label = jQuery('<label/>', {
			for : btn.id,
			text : btn.name
		})

		var input = jQuery('<input/>', {
			id : btn.id,
			type : 'checkbox',
		});

		return jQuery('<div/>', {
			class : 'slideThree'
		})
		.data('effect', btn.effect)
		.bind('change', function (evt) {
			console.log($(this).data('effect'));
		})
		.append(input,label);
	}
}