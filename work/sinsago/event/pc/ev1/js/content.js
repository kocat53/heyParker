
//TOP
$(function () {
	// 창 높이 구함
	var $windowHeight = $(window).innerHeight();
	// 노트북과 같이 작은 화면은 작동 안되게 if처리
	if ($windowHeight >850) {
		$('.main_title_area > .evt_cont').css('height', $windowHeight);
		$('.card_area').css('bottom', $windowHeight/100*5);
	}
	
	// 
	// setTimeout(function() {
	// 	// $('.main_title_area > .evt_cont').addClass('on');
	// }, 500);

	setTimeout(function() {
		$('.card_area').addClass('on')
	}, 2200)

	// top버튼 스크립트
	$(window).scroll(function () {
		// 스크롤 되면 css를 적용한 것들 다 제거
		$('.main_title_area > .evt_cont , .card_area').removeAttr('style');
		var contentsHeight = $("#wrap").height(),
			winscrolltop = $(window).scrollTop(),
			winscrollbtm = contentsHeight - $(window).height();
		if (winscrolltop > winscrollbtm - 100) {
			$('#top').css('bottom', '370px');
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
