
/*
$(function(){
	$('img[usemap]').rwdImageMaps();
});
*/
// Url추가
$(function(){
	var urlwrap = $('.lst_addinput');
	var urllength = 1;
	var urlnode = '<li>';
	urlnode += '<input type="text" placeholder="스크랩 URL을 입력해주세요." name="sns_url" style="width:751px">';
		urlnode += '<li>';
	$('.loc_btn_add').on('click',function(){
		if(urllength == 3){return;}
		urlwrap.append(urlnode);
		urllength++;
	});
});

//TOP
$(function () {
	var winH = $(window).height()
	$('.event_main').css('height', winH);

	setTimeout(function () {
		$('.event_main').addClass('start');
	}, 1000);

	setTimeout(function () { 
		$('.event_main').addClass('end_game');
	},2700);

	$('.tab_ranking >li').click(function () { 
		var $index = $(this).index();

		$(this).addClass('on').siblings().removeClass('on');
		$('.list_ranking_wrap').find('.tab_content').eq($index).removeClass('hide').siblings().addClass('hide');
	});

	// top버튼 스크립트
	$(window).scroll(function () {
		var contentsHeight = $("#wrap").height(),
			winscrolltop = $(window).scrollTop(),
			winscrollbtm = contentsHeight - $(window).height();
		if (winscrolltop > winscrollbtm - 100) {
			$('#top').css('bottom', '385px');
		} else {
			$('#top').css('bottom', '20px');
		}

		if (winscrolltop > 200) {
			$('#top').fadeIn();
		} else {
			$('#top').fadeOut();
		}
	});

	$('#top').click(function () {
		$('html, body').animate({ scrollTop: 0 });
	});
});
