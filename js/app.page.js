App.Page = {
	pages : [],
	init : function () {
		$('.page').each(function() {
			App.Page.pages.push($(this));
		});

		this.Interface.init();
	},

	showPage : function (name) {
		for (var i = 0; i < this.pages.length; i++) {
			if($(this.pages[i]).attr('id') == name) {
				$(this.pages[i]).fadeIn();
				continue;
			}
			$(this.pages[i]).hide();
		};
	}
}