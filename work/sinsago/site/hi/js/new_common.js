// 브라우저 체크
function IEbrowser() {
	var agent = navigator.userAgent.toLowerCase();

	if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
		$('body').addClass('ie');
	}
}

// 헤더 슬라이드
function headerSlider() {
	var $length = ($('.header_evt_slider .slider_inner .item_header_slide').length >=3 ) ;
	
	$('.header_evt_slider .slider_inner').bxSlider({
		mode: 'vertical',
		auto: false,
		pager: false,
		autoHover: true,
		controls: ($length),
		nextText: '<span class="blind">다음</span>',
		prevText: '<span class="blind">이전</span>',
		nextSelector: '.evt_slider_next',
		prevSelector:'.evt_slider_prev',
	});

	if (!$length) {
		$('.evt_slider_control').addClass('none');
	}
}

// 실검 영역 슬라이드
function gnbKeywordSlider() {
	$('.gnb_slide .list_gnb_slide').bxSlider({
		mode: 'vertical',
		auto: true,
		pager: false,
		autoHover: true,
		controls: false
	});
}

// gnb 전체보기 높이 및 넓이 지정
function gnbDepthSize() {
	var $gnbItem = $(".list_gnb_detail > li"),
		$gnbHeight = $gnbItem.map(function () {
			return $(this).height();
		});
	var $itemWrap = $('.list_gnb_detail').innerWidth(),
		$itemLength = $gnbItem.length-1;
		$firstItem = $gnbItem.eq(0).innerWidth(),
		$itemWidth = Math.floor(($itemWrap - $firstItem) / $itemLength);
	
	$gnbItem.css({
		"width":$itemWidth+.8,
		"height": Math.max.apply(Math, $gnbHeight)
	});
}

// gnb 전체보기
function gnbAllbtn() {
	// $('.gnb_detail').attr('tabindex', -1);
	$('.gnb_all_menu').on('click ', function () {
		$('.gnb_all_menu').toggleClass('on');
		$('.gnb_detail').toggleClass('none');
		gnbDepthSize();
	});
}

// 인풋 애니메이션 이벤트용
function focunEvent($target,$parent,$class) {
	$($target).focusin(function(){
		$(this).parents($parent).addClass($class);
	});

	$($target).focusout(function(){
		$(this).parents($parent).removeClass($class);
	});
}

$(function () {
	focunEvent('.header_search .search_write', '.search_wrap', 'on');
	IEbrowser();
	headerSlider(); 
	gnbKeywordSlider();
	gnbAllbtn();

	// 샘플용 ↓
	$('.sample_login').click(function () {
		$('.login_wrap').toggleClass('none');
	});

	$('.bannerClick').click(function () {
		$('.banner_area').toggleClass('none');
	});
})