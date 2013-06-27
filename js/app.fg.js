var video, canvas
App.Fg = {
	fg : null,

	init : function (input, output) {
		this.fg = new FrameGrabber(input, output);
	},

	setEffect : function (effect) {
		this.fg.setEffect(effect);

		this.hasEffect = true;
	},

	setValue : function (value) {
		if(this.fg.effect) {
			this.fg.effect.defaultValue = value;
		}
	}
}