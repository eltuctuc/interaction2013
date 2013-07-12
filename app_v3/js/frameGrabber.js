// frameGrabber.js
// Copyright David Corvoysier 2012
// http://www.kaizou.org

function FrameGrabber(video,canvas) {

    this.video = video;
    this.viewport = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
    this.framebuffer = document.createElement("canvas");
    this.framebuffer.width = this.width;
    this.framebuffer.height = this.height;
    this.ctx = this.framebuffer.getContext("2d");
    //this.effect = JSManipulate.blur;
    this.effect = "";
    var self = this;
    this.video.addEventListener("play", function() {
        self.timerCallback();
      }, false);
      
    this.setEffect = function(effect){
      if(effect in JSManipulate){
          this.effect = JSManipulate[effect];
      }
    }

    this.getEffect = function(){
        return this.effect;
    }

    this.timerCallback = function() {
        if (this.video.paused || this.video.ended) {
          return;
        }
        this.computeFrame();
        var self = this;
        setTimeout(function () {
            self.timerCallback();
          }, 20);
    };

    this.acquireFrame = function() {
        if(!this.video.videoWidth) return null;
        this.ctx.drawImage(this.video, 0, 0, this.video.videoWidth,this.video.videoHeight,0,0,this.width, this.height);
        return this.ctx.getImageData(0, 0, this.width, this.height);
    };

    this.computeFrame = function() {
        var data = this.acquireFrame();
        if(!data) return;
        if(this.effect != ""){
		  this.effect.filter(data,this.effect.defaultValues);
		}
        this.viewport.putImageData(data, 0, 0);
        return;
    };
    
    this.timerCallback();
};