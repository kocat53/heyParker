/**
* 이미지명 ON,OFF
* 작성일 : 2013.06.18
* 작성자 : 장호연
*
* 사용법 :
* 1. 기본형: 파일명 형식이 _off, _on 형식 경우
*    $("img").imgOn();
*    $("img").imgOff();
*
* 2. 그외: 예) 파일명 형식이 .png, _on.png 인 경우
*    $("img").imgOn({
*        pattern_off: ".png",
*        pattern_on: "_on.png",
*    });
*    $("img").imgOff({
*        pattern_off: "_on.png",
*        pattern_on: "_off.png",
*    });
*/
(function(){$.fn.imgOn=function(a){var b={pattern_off:"_off.",pattern_on:"_on.",imgSrc:this.attr("src")},a=$.extend(b,a||{});b.imgSrc=b.imgSrc.replace(b.pattern_off,b.pattern_on);this.attr("src",b.imgSrc);return this};$.fn.imgOff=function(a){var b={pattern_off:"_off.",pattern_on:"_on.",imgSrc:this.attr("src")},a=$.extend(b,a||{});b.imgSrc=b.imgSrc.replace(b.pattern_on,b.pattern_off);this.attr("src",b.imgSrc);return this}})();


//메인 슬라이딩
$(function () {
    $("#mainSlide").find("ul.view > li").show();
    var view = $("#mainSlide"); 			//뷰어
    var ctl = view.find(".pagination2"); 		//컨트롤러
    var idx = 0; 						//인덱스
    var max = ctl.find(".slidenav > a").size(); //상품갯수
    var speed = 500; 					//롤링 속도
    var width = 282; 					//li의 가로길이
    var tId; 							//롤링 타이머 변수
    var rollSec = 3000; 					//롤링 시간
    var btnS = $("a.btn_prev , a.btn_next");

    rollStart(); //롤링

    view.on({
        mouseenter: function () {
            rollStop();
        },
        mouseleave: function () {
            rollStart();
        }
    })

    ctl.find(".slidenav >a").mouseenter(function () {
        idx = parseInt($(this).index());
        view.find("ul.view").stop(false, true).animate({ "marginLeft": -(idx * width) + "px" }, 300);
        view.find(".slidenav > a").each(function () {
            imgReplace($(this).find(">img"), "off");
        });
        imgReplace(view.find(".slidenav > a:eq(" + idx + ") > img"), "on");
    });

    btnS.on({
        click: function () {
            var className = $(this).attr('class');
            switch (className) {
                case 'btn_slide_prev':
                    var mNum = max - 1;
                    if (idx > 0) {
                        idx--;
                        view.find("ul.view").stop(false, true).animate({ "marginLeft": -(idx * width) + "px" }, speed);
                        view.find(".slidenav > a").each(function () {
                            imgReplace($(this).find(">img"), "off");
                        });
                        imgReplace(view.find(".slidenav > a:eq(" + idx + ") > img"), "on");
                    } else {
                        view.find("ul.view > li:last-child").clone().prependTo(view.find("ul.view"));
                        view.find("ul.view").css({ "marginLeft": -width + "px" });
                        view.find("ul.view").stop(false, true).animate({ "marginLeft": "0" }, speed, function () {
                            view.find("ul.view > li:first").remove();
                            view.find("ul.view").css("marginLeft", -(mNum * width) + "px");
                            idx = 5;
                        });
                        view.find(".slidenav > a").each(function () {
                            imgReplace($(this).find(">img"), "off");
                        });
                        imgReplace(view.find(".slidenav > a:eq(" + mNum + ") > img"), "on");
                    }
                    break;
                case 'btn_slide_next':
                    if (idx < max - 1) {
                        idx++;
                        view.find("ul.view").stop(false, true).animate({ "marginLeft": -(idx * width) + "px" }, speed);
                        view.find(".slidenav > a").each(function () {
                            imgReplace($(this).find(">img"), "off");
                        });
                        imgReplace(view.find(".slidenav > a:eq(" + idx + ") > img"), "on");
                    } else {
                        idx++;
                        view.find("ul.view").css("width", (max + 1) * width + "px");
                        view.find("ul.view > li:first").clone().appendTo(view.find("ul.view"));
                        view.find("ul.view").stop(false, true).animate({ "marginLeft": -(idx * width) + "px" }, speed, function () {
                            view.find("ul.view").css("marginLeft", "0");
                            view.find("ul.view > li:last").remove();
                            view.find("ul.view").css("width", max * width + "px");
                            idx = 0;
                            view.find(".slidenav > a").each(function () {
                                imgReplace($(this).find(">img"), "off");
                            });
                            imgReplace(view.find(".slidenav > a:eq(0) > img"), "on");
                        });
                    }
                    break;
            }
            return false;
        }
    });

    //메인 롤링시작
    function rollStart() {
        tId = setInterval(function () {
            if (idx < max - 1) {
                idx++;
                view.find("ul.view").stop(false, true).animate({ "marginLeft": -(idx * width) + "px" }, speed);
                view.find(".slidenav > a").each(function () {
                    imgReplace($(this).find(">img"), "off");
                });
                imgReplace(view.find(".slidenav > a:eq(" + idx + ") > img"), "on");
            } else {
                idx++;
                view.find("ul.view").css("width", (max + 1) * width + "px");
                view.find("ul.view > li:first").clone().appendTo(view.find("ul.view"));
                view.find("ul.view").stop(false, true).animate({ "marginLeft": -(idx * width) + "px" }, speed, function () {
                    view.find("ul.view").css("marginLeft", "0");
                    view.find("ul.view > li:last").remove();
                    view.find("ul.view").css("width", max * width + "px");
                    idx = 0;
                    view.find(".slidenav > a").each(function () {
                        imgReplace($(this).find(">img"), "off");
                    });
                    imgReplace(view.find(".slidenav > a:eq(0) > img"), "on");
                });
            }
        }, rollSec);
    }
    //메인 롤링정지
    function rollStop() {
        clearInterval(tId);
    }

});

(function(){
var rollAuto,
	liLength = 0,
	viewNum = 0,
	ROLLING_TIME = 3000,
	RollMethod = {
		auto : function() {
			liLength = $(".mainBook .active .pagination2 > div a img").length;
			rollAuto = setInterval(function() {
				++viewNum;
				if(viewNum == liLength) viewNum = 0;
				$('.mainBook .active .over > ul').eq(viewNum).show().siblings().hide();
				RollMethod.tabInit();
				$('.mainBook .active .pagination2 > div a').eq(viewNum).find('img').each(function() {
					try{
						$(this).imgOn();
					}
					catch(e){}

				});
			}, ROLLING_TIME);
		},
		autoStop : function() {
			clearInterval( rollAuto );
			return this;
		},
		tabInit : function() {
			$('.mainBook .active .pagination2 > div a img').each(function() {
				try{
					$(this).imgOff();
				}
				catch(e){}
			});
			return this;
		},
		tabClick : function() {
			tabIndex = $(this).closest('li').index();
			viewNum = 0;
			
			// S 190701
			$('.mainBook .tab li a').each(function() {
				$(this).removeClass('on')
			});
			$(this).addClass('on')
			// E 190701

			$('.mainBook .mainTab').removeClass('active').eq(tabIndex).addClass('active');
			RollMethod.viewNumFunc();			
			return false;
		},
		viewNumFunc : function() {
			$('.mainBook .active .over > ul').eq(viewNum).show().siblings().hide();
			RollMethod.tabInit();
			$('.mainBook .active .pagination2 > div a').eq(viewNum).find('img').each(function() {
				$(this).imgOn();
			});
		},
		btnClick : function() {
			var className = $(this).attr('class');
			switch( className ) {
			case 'btn_m_prev' : 
				--viewNum;
				if(viewNum < 0) viewNum = ( liLength - 1 );
				RollMethod.viewNumFunc();
				
				break;
			case 'btn_m_next' : 
				++viewNum;
				if(viewNum >= liLength) viewNum = 0;
				RollMethod.viewNumFunc();
				break;
			}
			return false;
		},
		paginationClick : function() {
			viewNum = $(this).index();
			$('.mainBook .pagination2 > div a img').each(function() {
				$(this).imgOff();
			});			
			$(this).find('img').imgOn();
			$('.mainBook .active .over > ul').eq(viewNum).show().siblings().hide();
			return false;
		}
	};
	
	
/* Activation */
$(function() {
	$('.mainBook .tab li a').on({ mouseenter : RollMethod.tabClick});
});
}());

//메인 리뉴얼 2016 메인 이벤트 롤링
// 메인 비주얼
$(document).ready(function () {
    jQuery.fn.mainVisual = function (duration) {   //jquery에 함수 추가 duration -> 롤링 속도
        $(this).each(function () {
            var $roll = $(this);
            var $rollList = $roll.find("> ul > li");
            var $rollNavi = $roll.find(".navi > a");
            var max = $rollList.size();
            var idx = 0;
            var rollCheck = [true, true];   // mouse/keyboard accessibility
            var tid;

            $roll.bind({
                "mouseenter": function () {
                    rollCheck[0] = false;
                    check();
                },
                "mouseleave": function () {
                    rollCheck[0] = true;
                    check();
                }
            })

            $rollNavi.bind({
                "click": function (event) {
                    $rollNavi.removeClass("on");
                    $(this).addClass("on");
                    idx = $(this).index();
                    showCont();
                    event.preventDefault();
                }
            });

            $rollNavi.bind({
                "mouseenter": function (event) {
                    $rollNavi.removeClass("on");
                    $(this).addClass("on");
                    idx = $(this).index();
                    showCont();
                    event.preventDefault();
                }
            });

            function Init() {
                $rollList.filter(":not(:first)").hide();
                rollStart();
            }

            function check() {
                if (rollCheck[0] == true && rollCheck[1] == true) {
                    rollStart();
                } else {
                    rollStop();
                }
            }

            function rollStart() {
                rollStop();
                tid = setInterval(function () {
                    rollingNext();
                }, duration);
            }

            function token(i) {
                i = 1;
            }

            function rollStop() {
                clearInterval(tid);
            }

            function rollingNext() {
                if (idx + 1 < max) {
                    idx++;
                } else {
                    idx = 0;
                }
                $roll.find('.token strong').text(idx + 1);
                showCont();
            }

            function rollingPrev() {
                if (idx - 1 < 0) {
                    idx = max - 1;
                } else {
                    idx--;
                }
                $roll.find('.token strong').text(idx + 1);
                showCont();
            }

            function showCont() {
                $rollList.hide().eq(idx).show();
                $rollNavi.removeClass("on").eq(idx).addClass("on");
            }

            Init();
        });
    }
    $(".mainVisual").mainVisual(5000);
});

// 메인 탭영역
$(document).ready(function () {
    $(".mainTab").each(function () {
        var $mainTab = $(this);
        var $tabList = $mainTab.find("div > ul");
        var $btnPrev = $mainTab.find(".btn_prev");
        var $btnNext = $mainTab.find(".btn_next");
        var max = $tabList.find("li").size();
        var lastBook = max - 4;
        var itemWidth = 178;
        var tabLeft = 0;
        var idx = 1;

        $tabList.width(itemWidth * max);

        $btnNext.click(function () {
            if (idx < lastBook) {
                tabLeft = -idx * 178;
                idx = idx + 1;
                $tabList.css({ "left": tabLeft })
            } else if (idx = lastBook) {
                tabLeft = 0;
                idx = 1;
                $tabList.css({ "left": tabLeft })
            }
        });
        $btnPrev.click(function () {
            if (idx > 1) {
                tabLeft = tabLeft + 178;
                idx = idx - 1;
                $tabList.css({ "left": tabLeft })
            } else if (idx == 1) {
                tabLeft = -(lastBook - 1) * 178;
                idx = lastBook;
                $tabList.css({ "left": tabLeft })
            }
        });
        $(".mainBook > .tab a").mouseenter(function () {
            tabLeft = 0;
            idx = 1;
            $(".mainBook").find(".mainTab ul").css({ "left": tabLeft })
        });
    });
});

// 190701 아래의 스크립트 제거
// 메인 메뉴 온오프
// $(function (){
// 	$(".mainStudy_data").find("a").on("mouseenter", function(){
// 		imgReplace($(this).find(">img"),"on");
// 	});
// 	$(".mainStudy_data").find("a").on("mouseleave", function(){
// 		imgReplace($(this).find(">img"),"off");
// 	});
// 	$(".mainMenu").find("a").on("mouseenter", function(){
// 		imgReplace($(this).find(">img"),"on");
// 	});
// 	$(".mainMenu").find("a").on("mouseleave", function(){
// 		imgReplace($(this).find(">img"),"off");
// 	});
// });

/* 20180921 레이어팝업 */
$(function () {
    jQuery.fn.center = function () {
        this.css("position", "absolute");
        this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) + $(window).scrollTop()) + "px");
        this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) + 9 + $(window).scrollLeft()) + "px");
        return this;
    }

    showPopup = function () {
        $(".list_layer_popup").addClass('on');
        $(".list_layer_popup").center();
        $(".dim").addClass('on').css("height", $(document).height() + "px");
        $("body").css('overflow-y', 'hidden');
    }

    $('.close_popup').click(function () {
        $(this).parent().removeClass('on').next('.dim').removeClass('on');
        $("body").css('overflow-y', 'auto');
    });
});
/* //20180921 레이어팝업 */