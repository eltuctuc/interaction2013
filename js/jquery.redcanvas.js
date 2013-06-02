(function ( $ ) {

	RedCanvas = {
		settings : {},
		canvas : null,
		context : null,
		bgImg : null,
		events : {
			//IMGLOADED: document.createEvent('image_loaded')
		},

		init : function ( options ) {
			this.settings = $.extend({
				width: $(document).width(),
				height: $(document).height(),
				img: new Image(),
			}, options);

			console.log(this.settings);

			this.canvas = this.settings.canvas;
			this.canvas.resize(function () {
				RedCanvas.drawImg();
			});
			/*this.canvas
				.attr('width', $(document).width())
				.attr('height', $(document).height());*/

			this.context = (document.getElementById(this.canvas.attr('id'))).getContext('2d');
			this.bgImg = new Image();
			this.bgImg.src = this.settings.img;

			this.bgImg.onload = function ( event )
			{
				RedCanvas.drawImg()
			}
		},

		drawImg : function ()
		{
			var width = this.context.canvas.width;
			var height = this.context.canvas.height;

			this.context.drawImage(this.bgImg,0,0,width,height);
			this.context.fillStyle = 'rgb(255, 0, 0)';
			this.context.fillRect(20, height-(height*0.2), width/30, height*0.2);
		}
	};
}( jQuery ));