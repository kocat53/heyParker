// [상품 view] 공지사항 표 열림 영역
function noticeInfo() {
	$('.toggle_notice').each(function () {
		var $this = $(this);

		$this.click(function () {
			$this.toggleClass('on')
		})
	})
}

// [상품 view] 다운로드 영역
function downProductFile() {
	$('.list_drpdown_item .btn_down_item').click(function () {
		$this = $(this).parent()
		$this.toggleClass('on');
	})
}

// 함수 옵션 선택
function fundOptionSelect() {
	$('.list_select_option > li').click(function () {
		$(this).addClass('on').siblings().removeClass('on');
	})
}

// 펀드 비교 - 더보기 버튼
function fundDiffPage() {
	if ($('.list_diff_item > li').length >= 3) {
		$('.diff_item_wrap').addClass('multiple');
	}
	
	var $width = window.innerWidth*1.6;
	// 수익률 보기 버튼
	$('.diff_info_wrap .btn_detail_info').click(function(){
		$(this).parents('li').toggleClass('on');
	});
}

// 펀드 스크롤
function fundDiffScroll() {
	if ($('.list_diff_item > li').length >= 3) {
		$('.diff_item_wrap').addClass('multiple').mCustomScrollbar({
			scrollInertia:1000,
			axis: "x",
			contentTouchScroll: 60,
			advanced : {
				autoExpandHorizontalScroll:true
			}
		});
	}
}

$(function () {
	fundOptionSelect();
	downProductFile();
	noticeInfo();
	fundDiffPage();
});