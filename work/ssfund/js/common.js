var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
if (varUA.match('android') != null) { 
	if (document.querySelector('.fixed_layer_area') !== null) {
		document.querySelector('.fixed_layer_area').classList.add( 'android');
	}
} else if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1) { 
	if (document.querySelector('.fixed_layer_area') !== null) {
		document.querySelector('.fixed_layer_area').classList.add( 'ios');
	}
} else {
    //아이폰, 안드로이드 외 처리
}

// 탭메뉴 아이템 첫번째것 빼고 다 숨기기
var tabItem = document.querySelectorAll('.tab_item_wrap'),
	tabItemList = 'classList' in tabItem;
var tabList = document.querySelectorAll('.tab_list_wrap'),
	tabListClass = 'classList' in tabList;

//  [공통 ★★]탭메뉴 박스영역 숨김 처리
Array.prototype.forEach.call(tabItem, function (el) {
	for (var i = 1; i < el.children.length; i++) {
		var child = el.children[i];
		if (tabItemList) {
			child.classList.add(' hide');
        } else {
            child.className += ' hide'
        }
	}
});

// [공통 ★★] 탭메뉴 리스트의 자식요소에 클래스 추가 (제어 용도)
Array.prototype.forEach.call(tabList, function (el) {
	for (var i = 0; i < el.children.length; i++) {
		var child = el.children[i];
		if (tabListClass) {
			child.classList.add('tab_item_btn');
        } else {
            child.className += 'tab_item_btn'
        }
	}
	el.children[0].classList.add('on');
});

// [공통 ★★] 탭메뉴
function tabMenu() {
	$('.tab_item_btn').each(function () {
		// 탭메뉴 아이템 클릭
		$(this).click(function () {
			var $this = $(this),
			$tabName = $this.parents('.tab_list_wrap').data('tb'),
			$index = $this.index(),
			$tabBox = $('.tab_item_wrap[data-tc=' + $tabName+']');
			
			$this.addClass('on').siblings().removeClass('on');
			$tabBox.find('>.tab_item_box').eq($index).removeClass('hide').siblings('.tab_item_box').addClass('hide');
		})
	});
}

// [공통] 단순 on 클래스 토글
function toggleOnClass() {
	$('.basic_toggle_on > li').click(function () {
		var $this = $(this);

		if ($this.hasClass('on')) {
			$(this).removeClass('on');
		} else {
			$(this).addClass('on').siblings().removeClass('on');
		}
	});
}

//  [공통 ] select 값 변경 
function basicSelect() {
	$('.basic_select').each(function () {
		var $this = $(this);

		$this.on('change', function () {
			$this.siblings('.name_select').text($this.val());
		})
	})
}

// 레이어 열림 트리거 설정
function layerBtn() {
	$('.layer_btn').click(function () {
		$('.fixed_layer_area').toggleClass('on');
		$('body').toggleClass('no_scroll');
	});
}

// 인풋의 텍스트 입력시 보여지는 삭제버튼 토글
function inputToggleDel() {
	$('.del_toggle').on('change paste keyup', function () {
		if ($(this).val()) {
			$(this).siblings('.btn_input_delete').removeClass('hide');
		} else {
			$(this).siblings('.btn_input_delete').addClass('hide');
		}
	});

	$('.btn_input_delete').click(function () {
		$(this).siblings('.del_toggle').val('').focus();
		$(this).addClass('hide');
	})
}

// 메뉴 열림 닫힘 버튼
function headerBtn() {
	$('.header_all_meun').click(function () {
		$('.gnb_wrap').addClass('on');
		$('body').addClass('no_scroll');
		$('#header').addClass('top_zindex');
	});

	$('.user_menu_btn .btn_close').click(function () {
		$('.gnb_wrap').removeClass('on');
		$('#header').removeClass('top_zindex');
		$('body').removeClass('no_scroll');
	});
}

// gnb 메뉴 클릭
function gnbMenu() {
	$('.gub_list .inner_depth.on').find('.gnb_depth').stop().slideDown();
	$('.gub_list > li.inner_depth > a').click(function () {
		var $this = $(this),
			$pars = $this.parent(),
			$parSibling = $pars.siblings('.inner_depth');
		if ($pars.hasClass('inner_depth')) {
			if ($pars.hasClass('on')) {
				$pars.removeClass('on').find('.gnb_depth').stop().slideUp();
			} else {
				$parSibling.removeClass('on');
				$parSibling.find('.gnb_depth').stop().slideUp();
				$pars.addClass('on').find('.gnb_depth').stop().slideDown();
			}
		}
	})
}

// 상단 바로가기 버튼
function goTop() {
	$('.btn_top').click(function () {
		$('html,body').animate({ scrollTop: 0 }, 500);
	})
}

// 헤더와 컨텐츠 간격 설정
function headerMargin() {
	if ($('#header').hasClass('sub') && $('#header') ) {
		var $height = $('#header').innerHeight();
		
		$('#container').css('margin-top', $height); //은 보더값!
	} 
}

// 헤더 검색
function headerSearch() {
	// 검색 열림
	$('.btn_open_form').click(function () {
		$('.header_btn_wrap').addClass('on');
		$('#header .logo').addClass('hide');
	})

	// 검색 닫힘
	$('.header_search_close').click(function () {
		$('.header_btn_wrap').removeClass('on');
		$('#header .logo').removeClass('hide');
		$('.header_search_form').addClass('hide').find('>input').val('');
	});
}

// 아이콘 토글
function iconToggle() {
	$('.icon_btn_default').each(function () {
		$(this).click(function () {
			$(this).toggleClass('on');
		})
	})
}

function commonSearch() {
	$('.common_search_input').each(function () {
		var $this = $(this);
		var $delBtn = $this.siblings('.btn_wrap').find('.gnb_search_del')
		
		$this.on('change paste keyup', function () {
			if ($this.val()) {
				$this.addClass('on');
				$delBtn.removeClass('hide');
			} else {
				$this.removeClass('on');
				$delBtn.addClass('hide');
			}
		});

		$delBtn.click(function () {
			$this.removeClass('on');
			$(this).parent().siblings('.common_search_input').val('').focus();
			$(this).addClass('hide');
		})
	})
}

// 좌우 스크롤 펀드는 1개일 경우 넓이가 가득차게.
function scrollOneItem() {
	$('.inline_list_wrap').each(function () {
		var $fundLength = $(this).find('.box_fund').length
		if ($fundLength == 1) {
			$(this).addClass('one');
		}
	});
}

// 펀드리스트 뎁스펀드 더보기
function fundMoreDepth() {
	$('.btn_more_depth').each(function () {
		var $this = $(this)

		$this.click(function () {
			$this.parent('.box_depth_wrap').toggleClass('on');
		});
	})
}

function fullLayerHeight() {
	$('.fixed_layer_area ').each(function () {
		var $this = $(this);

		if ($this.hasClass('full')) {
			$('.fixed_layer_area .fixed_layer_wrap').css('height', window.innerHeight);
			$(window).scroll(function () {
				$('.fixed_layer_area .fixed_layer_wrap').css('height', window.innerHeight);
			})
		}
	})
}

// 안드로이드 레이어에서 인풋이 포커스 될 경우 vh 높이값 재 계산으로 인해
// 높이를 유동적인 vh 가 아닌 고정적인 값으로 변경!
function androidLayerFormFocus() {
	$('.fixed_layer_area.android ').each(function () {
		if ($(this).hasClass('full') == false) {
			//alert(22);
			$(this).find('input[type="text"],textarea').each(function () {
				var $this = $(this);
				$this.focusin(function () {
					var $parHeight = $this.parents('.fixed_layer_wrap').innerHeight();
					$this.parents('.fixed_layer_wrap').css({
						'height': $parHeight,
						'max-height':'none'
					});
				});
	
				$this.focusout(function () {
					$this.parents('.fixed_layer_wrap').removeAttr('style');
				});
			})
		}
	});

	// var $AllHeight = window.innerHeight,
	// 	$percent =($AllHeight*70 )/100;
	
	// $('.fixed_layer_area').each(function () {
	// 	if ($(this).hasClass('full') == false) {
	// 		$(this).find('.fixed_layer_wrap').css('height', $percent);
	// 	}
	// });
}

$(function () {
	headerMargin();
	headerBtn();
	fullLayerHeight();
	androidLayerFormFocus();
	headerSearch();
	commonSearch();
	gnbMenu();
	scrollOneItem();
	fundMoreDepth();
	inputToggleDel();
	layerBtn();
	toggleOnClass();
	basicSelect();
	iconToggle();
	goTop();
});

$(window).load(function () {
	tabMenu();

	var $winh = $(this).height(),
		$bodyHeight = $('body').innerHeight(),
		$showBtn = $bodyHeight / 10;
		if ($('#footer').length >0) {
			$footer = $('#footer').position().top;
			var $position = $footer - $winh
		};	
	
	$(window).scroll(function () {
		var $wins = $(window).scrollTop();

		if ($wins >= $showBtn) {
			$('.btn_top').addClass('visiable');
			$('.diff_btn_wrap').addClass('with_top');
		} else {
			$('.btn_top').removeClass('visiable')
			$('.diff_btn_wrap').removeClass('with_top');
		}

		if ($wins >= ($position + 67)) {
			$('.btn_top ').removeClass('fixed')
		} else {
			$('.btn_top ').addClass('fixed')
		}
	});
});