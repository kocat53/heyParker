// 메인 비쥬얼
function main_spot() {
	if ($($('.spot_name_wrap').length > 0)){
		var thumb = $('.spot_name_wrap').find('.spot_pager');
		var visibleThumbs = 4;

		console.log(visibleThumbs);

		var gallerySlider = $('.main_spot').bxSlider({
			mode:'fade',
			controls: false,
			pager: false,
			infiniteLoop: true,
			autoHover: true,
			speed: 350,
			auto: true,
			onSlideAfter: function (currentSlideNumber) {
				var currentSlideNumber = gallerySlider.getCurrentSlide();
				thumb.removeClass('active');
				thumb.eq(currentSlideNumber).addClass('active');
			},
	
			onSlideNext: function () {
				var currentSlideNumber = gallerySlider.getCurrentSlide();
				slideThumbs(currentSlideNumber, visibleThumbs);
			},
	
			onSlidePrev: function () {
				var currentSlideNumber = gallerySlider.getCurrentSlide();
				slideThumbs(currentSlideNumber, visibleThumbs);
			}
		});

		var thumbsSlider = $('.spot_name_wrap').bxSlider({
			controls: true,
			pager: false,
			infiniteLoop: false,
			minSlides: 4,
			// moveSlides: 1,
			maxSlides: 2,
			prevSelector: '.spot_prev',
			nextSelector: '.spot_next',
			slideWidth: 743,
			autoHover: true,
			slideMargin: 1
		});


		function slideThumbs(currentSlideNumber, visibleThumbs) {
			// if (visibleThumbs <= 3) {
			// 	visibleThumbs = visibleThumbs + 1;
			// 	console.log(`비지다 ${visibleThumbs}`)
			// }
			var m = Math.floor(currentSlideNumber / visibleThumbs);
			var slideTo = m * visibleThumbs;
			// if (currentSlideNumber > visibleThumbs) {
			// 	visibleThumbs = visibleThumbs + 1;
			// 	m = m + 1;
			// } else {
			// 	visibleThumbs = visibleThumbs;
			// 	m = m;
			// }
			//console.log(`엠의 현재${currentSlideNumber}/ 엠의 보여짐${visibleThumbs} 엠${m} / 슬투 ${slideTo}`);
			thumbsSlider.goToSlide(m);
		}

		$('.spot_name_wrap').find('.spot_pager').mouseenter(function () {
			gallerySlider.goToSlide($(this).closest('.name_spot').index());
			(thumbsSlider,gallerySlider).stopAuto();								
			$('.spot_name_wrap').find('.spot_pager').removeClass('active');
			$(this).addClass('active');
		});
		$('.spot_name_wrap').find('.spot_pager').mouseleave(function () {
			(thumbsSlider,gallerySlider).startAuto();
		});
	}
}

// 자동넓이 계산
function itemAutoWidth($parent, $item) {
	$($parent).find('>' + $item).each(function () {
		var $this = $(this),
			$parentWidth = $this.parent().innerWidth(),
			$itemLength = $this.parent().children().length,
			$itemWidth = $parentWidth / $itemLength;
		
		$this.css({
			'width': $itemWidth
		});
	});
}

// 메인 -형재요소 bg의 컬러를 내 text 컬러로
function labelColor($text,$color) {
	$($text).each(function () {
		var $this = $(this),
			$bgColor = $this.siblings($color).find($color).css('background-color');
		
		$(this).css('color', $bgColor);
	});
}

//  메인 - 토글 클래스
function ToggleClassClick() {
	$('.list_side_menu .btn_open').click(function () {
		$(this).parent().toggleClass('on');
	});
}

// 메인  - 책 겹침
function mainBookList() {
	$('.list_main_book').each(function () {
		var $length = $(this).find('>li').length,
			$width = $(this).innerWidth()
		
		//$(this).parents('.book_table ').css('width', $width);

		$(this).find('>li').each(function () {
			var $this = $(this),
				$index = $this.index(),
				$value = -$index
			
			$this.css('z-index', $value + $length);
		});
	});
}

// 메인 - 북 탭
function mainBookTab() {
	var tabSlider = $('.tab_book_content > .inner').bxSlider({
		mode: 'fade',
		speed:1,
		auto: true,
		pager: true,
		controls: false,
		adaptiveHeight: true,
		autoHover: true,
		adaptiveHeightSpeed:1,
		pagerCustom: '.tab_book_list',
		onSlideBefore: function ($slideElement, oldIndex, newIndex) {
			$('.tab_book_content').find('.book_list_wrap').find('.reviewer_wrap').removeClass('on');
			$('.tab_book_content').find('.book_list_wrap').eq(newIndex).find('.reviewer_wrap').addClass('on');
		}
	});

	$('.tab_book_list .tab_item').each(function () {
		var $this = $(this),
			$index = $this.index();
		
		$this.attr('data-slide-index', $index);
		$this.mouseenter(function () {
			if ($index != tabSlider.getCurrentSlide()) {
				tabSlider.goToSlide($index);
				tabSlider.redrawSlider();
				
				tabSlider.stopAuto();								
				tabSlider.startAuto();
			}
		});
	});
}

// 메인 -리뷰 슬라이더
function mainReviewSlider() {
	var speed = 500;
	var reviewSlider = function () {
		textrolling = setInterval(function () {

			$('.list_review').each(function () {
				$(this).append($(this).find('>li:first-child').clone());

				var $this = $(this);
				var $item = $this.find('>li');
				var $firstItem = $this.find('>li:first-child');
				var $lastItem = $this.find('>li:last-child');
				var $length = $item.length+1;
				var cloneItem = $firstItem.clone();

				$item.animate({ 'top': '-25px' }, speed ,function () {
					$this.append(cloneItem);
					$item.removeAttr('style');
					$firstItem.remove();
					$lastItem.remove();
				});
			});
		},2500);
	}
	
	$('.reviewer_slide_btn').each(function () {
		var click = true;
		function clickClear() {
			setTimeout(function () {
				click = true;
			}, speed+100)
		}

		$(this).find('.reviewer_next').on('click', function () {
			if (click) {
				click = false;
				var $slideWrap = $(this).parent().siblings('.list_review');

				$slideWrap.append($slideWrap.find('>li:first-child').clone());

				var $firstItems = $slideWrap.find('>li:first-child');
					$lastItems = $slideWrap.find('>li:last-child'),
					$items = $slideWrap.find('>li'),
					prevItem = $firstItems.clone();

				$items.animate({ 'top': '-25px' }, speed ,function () {
					$slideWrap.append(prevItem);
					$items.removeAttr('style');
					$firstItems.remove();
					$lastItems.remove();
				});
				clickClear();
			}
		});

		$(this).find('.reviewer_prev').on('click', function (e) {
			if (click) {
				click = false;

				var $slideWrap = $(this).parent().siblings('.list_review');
				$slideWrap.prepend($slideWrap.find('>li:last-child').clone());

				var $firstItems = $slideWrap.find('>li:first-child');
					$lastItems = $slideWrap.find('>li:last-child'),
					$items = $slideWrap.find('>li'),
					nextItem = $lastItems.clone();
				
				$items.css('top', '-25px');
				$items.animate({ 'top': '0' }, speed, function () {
					$slideWrap.prepend(nextItem);
					$items.removeAttr('style');
					$firstItems.remove();
					$lastItems.remove();
				});
				clickClear();
			}
		});
	});

	$('.reviewer_wrap').mouseenter(function () {
		clearInterval(textrolling);
	});

	$('.reviewer_wrap').mouseleave(function () {
		reviewSlider();
	});

	reviewSlider();
}

// 메인 - 스팟영역 라벨 슬라이더
function SpotLabelSlider() {
	var $length = ($('.spot_label_wrap > a').length >=2 ) ;
	
	$('.spot_label_wrap').bxSlider({
		mode: 'fade',
		speed: 100,
		auto: true,
		autoHover: true,
		controls: false,
		pager: false,
	});
}

// 메인 - 탭메뉴 넓이 지정용 클래스 추가
function classTabClass() {
	var elemMenu = $('.tab_book_list > a').length;

	if (elemMenu <=2) {
		$('.tab_book_list').addClass('lowLength');
	}
}

// 높이 계산
function calculaterHeight($item) {
	var $itemTarget = $($item),
		$itemHeight = $itemTarget.map(function () {
			return $(this).height();
		});
	
		$itemTarget.css({
			"height": Math.max.apply(Math, $itemHeight)
		});
}

function teacherRolling() {
	var sliderCount = -1;
	var itemlength = $('.list_teacher >li').length - 1;
	var teacherSlider = function() {
		repeatClass = setInterval(function () {
			sliderCount++;
	
			if (sliderCount > itemlength) {
				sliderCount = 0;
			}
			
			$('.list_teacher > li').eq(sliderCount).addClass('on').siblings().removeClass('on');
		}, 2500);
	}

	$('.list_teacher > li').eq(0).addClass('on');
	$('.list_teacher > li').each(function () {
		var $this = $(this),
			$index = $this.index();
		
		$this.mouseenter(function () {
			clearInterval(repeatClass);
			sliderCount = $index;
			$('.list_teacher > li').eq(sliderCount).addClass('on').siblings().removeClass('on');
		});

		$this.mouseleave(function () {
			teacherSlider();
		});
	});

	teacherSlider();
}

$(function () {
	main_spot();
	itemAutoWidth('.list_teacher','li');
	labelColor('.name_teacher', '.label');
	ToggleClassClick();
	mainBookList();
	SpotLabelSlider();
	classTabClass();
	calculaterHeight('.list_book_class.type_under > li');
	teacherRolling();
});

// 좌우측 스크롤 이벤트
function scrollEvent() {
	var $contnet = $('#container').offset().top-50;

	$(window).scroll(function () {
		var $winTop = $(window).scrollTop();
		if ($contnet <= $winTop) {
			$('.content_side_area.type_scroll').addClass('fix');
		} else {
			$('.content_side_area.type_scroll').removeClass('fix');
		}
	});
}

$(window).load(function () {
	mainBookTab();
	mainReviewSlider();
	scrollEvent();
});