// 메인 슬라이드
function mainSlide() {
	$('.main_visual_wrap').slick({
		dots: true,
		arrows: false,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
	})
}

function mainBottomBanner() {
	$('.mb_banner').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
	});
}

// 임시 확인용
function smaple() {
	$('.loginBtn').click(function () {
		$('.name_user').text('일이삼사오 님을 위한');
		$('.view_login_wrap').addClass('hide');
		$('.view_login_wrap').siblings('.view_item_wrap').removeClass('hide');
		$('.user_view_wrap').removeClass('logined');
		$('.item_main_content .tab_list_wrap > li:first-child').removeClass('hide').siblings().removeClass('on');
		$('.list_user_menu  > li:first-child > a').text('로그아웃');
		$('.list_user_menu  > li:nth-child(2) > a').text('정보변경');
	});
}

function headerScroll() {
	var $notice = $('.header_notice').innerHeight();
	
	if ($('header').hasClass('main_header')) {
		$('.main_header').css('top', $notice);
	}

	$('.header_notice .btn_close').click(function () {
		$('.header_notice').remove();
		$('.main_header').css('top', 0);
	})

	$(window).scroll(function () {
		var $noticeArea = $('.header_notice').length;
		var $top = $(window).scrollTop();
		if ($top > 0) {
			$('.main_header').css('top',0);
			$('.header_main').addClass('on')
		} else {
			if ($noticeArea == 1) {
				$('.main_header').css('top',$notice);	
			} else {
				$('.main_header').css('top',0);	
			}
			$('.header_main').removeClass('on')
		}
	})
}

$(function () {
	headerScroll();
	mainSlide();
	mainBottomBanner();
});
