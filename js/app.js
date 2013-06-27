var output, input, video, webcam;
var outputResolution, videoResolution;
var fg;
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

		//window.URL = window.URL || window.webkitURL;
		//navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		//navigator.getUserMedia({video:true,audio:false}, this.gotStream, this.gotError);

		//if (!Glsl.supported()) alert('WebGL is not supported.');

		this.Page.init();
		this.Page.showPage('page_1');

		this.addEvents();

		videoResolution = 854/480;

		//$(window).resize(function() {
		//	App.setOutputDimension();
		//});
		App.setOutputDimension();
	},

	addEvents : function () {
		$('#btn_data_cam').bind('click',function(){
			input = webcam;
			App.showLoadPage();
		});

		$('#btn_data_video').bind('click',function(){
			input = video;
			App.showLoadPage();
		});

		$('#btn_nodata_cam').bind('click',function(){
			input = webcam;
			App.showMainPage();
		});

		$('#btn_nodata_video').bind('click',function(){
			input = video;
			App.showMainPage();
		});

		$('.button.back').bind('click',function (){
			$('.interface_wrapper .container').hide();
			App.showStartPage();
		});

		$('#video').bind('canplay',function () {
			App.setOutputDimension();
		})


	    $('#upload').bind('change',function(evt) {
	        var files = evt.target.files;
	        var file = files[0];

	        var json = App.Data.load(file);

            grid = App.Glaucoma.setGrid(json.diseases.glaucoma);

			App.Page.showPage('page_3');
	    });
	},

	showStartPage : function() {
		input.pause();
		input.currentTime = 0;
		App.Page.showPage('page_1');
	},

	showLoadPage : function() {
		input.pause();
		input.currentTime = 0;
		App.Page.showPage('page_2');
	},

	showMainPage : function() {

		this.Fg.init(input, output);
		this.Fg.setEffect('blur');
		this.Fg.fg.effect.defaultValues.amount = 0

		input.play();

		App.Page.showPage('page_3');
	},

	setOutputDimension : function () {
		res = $(video).width()/$(video).height();
		outputResolution = $(window).innerWidth()/$(window).innerHeight();

		if(!isNaN(res)) {
			videoResolution = res;
		}

		if(outputResolution > videoResolution) {
			$(output).height($(window).innerHeight());
			$(output).width($(window).innerHeight()*videoResolution);
		} else {
			$(output).height($(window).innerWidth()/videoResolution);
			$(output).width($(window).innerWidth());
		}
	},

	gotStream : function (stream) {
		webcam.src = window.URL.createObjectURL(stream);
		localMediaStream = stream;
	},

	gotError : function () {
		console.log("error happened");
	}
};

function createUUID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	    return v.toString(16);
	});
}