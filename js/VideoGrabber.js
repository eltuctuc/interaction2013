function VideoGrabber (video,canvas) {

	this.stackEffect = function (effect) {
		console.log(effect)	
	}
}

VideoGrabber.prototype = new frameGrabber();