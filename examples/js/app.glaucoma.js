/**
* Unterobjekt Glaucoma
*/
App.Glaucoma = {

	grid : [],

	init : function() {

	},

	initGrid : function (x,y) {
		if (!x) { x = 25};
		if (!y) { y = 22};

        for (var y = 0; y < 25; y++) {
            this.grid[y] = [];
            for (var x = 0; x < 22; x++) {
                this.grid[y][x] = 0
            };
        };

        return this.grid;
	},

	setGrid : function (gridArray) {

        for (var y = 0; y < 25; y++) {
            this.grid[y] = [];
            for (var x = 0, v = 0; x < 22; x++, v++) {
                this.grid[y][x] = gridArray[v];
            }
        };

        return this.grid;
	},

	drawCanvas : function(canvas, grid) {
		if (!canvas.getContext) {
			console.log('No canvas context found!');
			return false
		};

		var ctx = canvas.getContext('2d');
        var width = ctx.canvas.width;
        var height = ctx.canvas.height;
        console.log(width, height);

        console.log(grid.length, grid[0].length);
        var stepX = 40;
        var stepY = 40;

        console.log(stepX, stepY);

        for (var y = 0; y < 25; y++) {
            for (var x = 0; x < 22; x++) {

				//ctx.translate(x*stepX, y*stepY);

            	var r = grid[y][x];
            	r *= 4;

            	var posY = Math.round(x*stepX)+20;
            	var posX = Math.round(y*stepY)+20;
            	//console.log(posX+(x*stepX), posY+(y*stepY), r);
            	console.log(posX, posX, r);

            	var gradient = ctx.createRadialGradient( posX , posY ,0, posX , posY , r);
	            gradient.addColorStop(0, 'rgba(0,0,0,0.5)');
	            gradient.addColorStop(1, 'rgba(0,0,0,0)');
           
            	ctx.fillStyle = gradient;
            	ctx.fillRect( 0, 0, 1400 ,920 );

            	ctx.fillStyle = '#0f0';
            	ctx.fillText(x+':'+y+':'+r, posX, posY);

				//ctx.translate(x*stepX*-1, y*stepY*-1);
            };
        };
	},

	/**
	  * Allgemeine Funktionen
	  */
	initGlaucomaGrid : function (x, y) {
		return this.glaucoma.initGrid(x,y);
	},
};