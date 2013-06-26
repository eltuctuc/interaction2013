var canvas, video, webcam;
var App = {
	init : function () {

		output = document.getElementById('output');
		video = document.getElementById('video');
		webcam = document.getElementById('webcam');

        // Check for the various File API support.
        if (!(window.File && window.FileReader && window.FileList && window.Blob)) {
            // Great success! All the File APIs are supported.
            alert('The File APIs are not fully supported in this browser.');
        }

		window.URL = window.URL || window.webkitURL;
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		//navigator.getUserMedia({video:true,audio:false}, this.gotStream, this.gotError);

		if (!Glsl.supported()) alert('WebGL is not supported.');

		this.Page.init();
		this.Glaucoma.init(25,22);
	},

	addEvents : function () {
		$('#btn_data_cam').bind('click',function(){
			App.Page.showPage('page_2');
		});

		$('#btn_data_video').bind('click',function(){
			App.Page.showPage('page_2');
		});

		$('#btn_nodata_cam').bind('click',function(){
			App.Page.showPage('page_3');
		});

		$('#btn_nodata_video').bind('click',function(){
			App.Page.showPage('page_3');
		});

		$('.button.back').bind('click',function(){
			$('.interface_wrapper .container').hide();
			App.Page.showPage('page_1');
		});

		$('#slideThree1').bind('click', function() {
			
		});


	    $('#upload').bind('change',function(evt) {
	        var files = evt.target.files;
	        var file = files[0];

	        var json = App.Data.load(file);

            grid = App.Glaucoma.setGrid(json.diseases.glaucoma);

            App.Glaucoma.drawCanvas(output, grid);

			App.Page.showPage('page_3');
	    });
	},


	gotStream : function (stream) {
		webcam.src = window.URL.createObjectURL(stream);
		localMediaStream = stream;
	},

	gotError : function () {
		console.log("error happened");
	}
};