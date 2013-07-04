App.Data = {

	load : function (file) {


	    if (!file.type.match('text/*')) {
	        alert('Eine Textdatei aussuchen.');
	        return false;
	    };
	    var reader = new FileReader();

	    reader.onload = (function(f) {
	        return function(e) {
	            var content = e.target.result;
	            var name = escape(f.name);

	            var json = JSON.parse(content);

	            return json;
	        };
	    })(file);

	    // Read in the image file as a data URL.
	    reader.readAsText(file);

	},
};