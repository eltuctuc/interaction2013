$(document).ready(function($) {

	$('.slider').slider({
		width: 600,
	});

	App.init();

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

	var status = 0;
	$('.interface_wrapper .container').hide();
	$('.interface_wrapper .dropdown a').bind('click',function(){
		$('.interface_wrapper .container').slideToggle();
	});
});