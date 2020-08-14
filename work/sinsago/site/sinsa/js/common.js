//imgage replace
function imgReplace(obj,flag){
	var imgSrc = obj.attr("src");
	if (flag == "on") {
		if (imgSrc != null) {
			imgSrc = imgSrc.replace("_off.", "_on.");
		}
	} else if (flag == "off") {
		imgSrc = imgSrc.replace("_on.","_off.");
	}
	obj.attr("src",imgSrc);
}

// gnb
// S 190507
$(function () {
	var $maxHeight = -1;
	$(".gnb_inner .list_depth").each(function() {
		var $depthHeight = $(this).innerHeight(); 
		$maxHeight = $depthHeight > $maxHeight ? $depthHeight : $maxHeight;
	});

	$('.gnb >li , .gnb_bg').on('mouseenter focusin',function () {
		$(this).addClass('on').siblings().removeClass('on');
		$('.gnb_bg').removeClass('hide');
		$('.list_depth').css('display', 'block');
	});

	$('.gnb >li , .gnb_bg').on('mouseleave',function () {
		$('.gnb >li').removeClass('on');
		$('.gnb_bg').addClass('hide');
		$('.list_depth').css('display', 'none');
	});
	
	$('.gnb_inner .list_depth').css('height', $maxHeight);
	$('.gnb_bg').css('height', $maxHeight);

	// 익스 IE8렌더링으로 인해 nth-가 먹히지 않아서 클래스로 설정
	$('.list_depth2>li:nth-child(3n)').addClass('depth3x')
	$('.list_depth2>li:nth-child(3n+1)').addClass('depth3x1')

	var gnbMathMenuColor = ['#fce4e5', '#d7eefb', '#daf1d1', '#fce8d1', '#ece4f9']
	function rgb2hex(rgb) {
		if (  rgb.search("rgb") == -1 ) {
			return rgb;
		} else {
			rgb = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+))?\)$/);
			function hex(x) {
				return ("0" + parseInt(x).toString(16)).slice(-2);
			}
			return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
		}
	}
	
	$('.type_seenBlock > li').each(function () {
		var $this = $(this),
			$index = $this.index(),
			$color = gnbMathMenuColor[$index];
		$hexColor = rgb2hex($color);
		
		$this.css('background-color',$hexColor);
	});
	var footerBtn = 0;

	$('.btn_family_site').on('click', function () {
		$(this).find('.list_footer_family').toggleClass('hide');
		if (footerBtn == 1) {
			$(this).find('i.fa').attr('class', 'fa fa-angle-up');
			footerBtn = 0;
		} else {
			$(this).find('i.fa').attr('class', 'fa fa-angle-down');
			footerBtn = 1;
		}
	});
});


// lnb 
$(function () {
    try{
	    var $lnb = $("#lnb .menu")
	    if($lnb.size() != 0){
		    var $lnbDepth1 = $("#lnb .menu h3");
		    var idx1 = lnbDepth1-1
		    var idx2 = lnbDepth2-1
		
		    $lnb.find("h3 a").bind("mouseenter focusin", function(){
			    $(this).find("img").attr("src", $(this).find("img").attr("src" ).replace("_off" ,"_on"));
		    }).bind("mouseleave focusout", function(){
			    $(this).find("img").attr("src", $(this).find("img").attr("src" ).replace("_on" ,"_off"));
			    lngDepth();
		    });

			function lngDepth() { // lnb depth
                try{
			        if(idx1 != -1){
				        $lnbDepth1.eq(idx1).find(">a>img").attr("src", $lnbDepth1.eq(idx1).find(">a>img").attr("src" ).replace("_off" ,"_on"));
			        }
			        if(idx2 != -1){
				        $lnbDepth1.eq(idx1).next("ul").find("li").eq(idx2).find("a").addClass("on");
			        }
                }
				catch (exception) { }
		    }
		    lngDepth();
	    }
    }
    catch (exception) { }

});

//lnb 클릭시 노출 메뉴 (씽라운지)
//$(function(){
//	var clickBox = $(".lnbClick");
//	var clickBtn = clickBox.find("h3 > a");
//	var showMenu = clickBox.find("ul");
//	
//	clickBtn.click(function(){
//		showMenu.toggle();

//		return false;
//	});
//});

//footer 관련사이트
$(function(){
	$(".siteOver").hide();
	$("#footer .site").click(function(){
		$(".siteOver").toggle();

		return false;
	});
});


// 180903 삭제
/* top btn */
// $(function(){
// 	var topBtn = $('#btn_top');
// 	var btn_top = 60;

// 	topBtn.css('top', $(window).height());
// 	topBtn.animate( { "top": $(document).scrollTop() + btn_top +"px" }, 500 ); 
// 		$(window).scroll(function(){
// 		topBtn.stop();
// 		topBtn.animate({ "top": $(document).scrollTop() + btn_top + 200 + "px" }, 500);
// 	});
// });
// 180903 삭제

// 롤링 (리스트형)
$(function(){
	var $roll = $("#roll_inner .roll");
	var distance =  $("#roll_inner .roll").find("ul").width() // 각 롤링 별 css의 width로 px적용
	var isMoving = false;
	var speed = 7000;
	var tId = setInterval(rollstart,speed);
	var $btn = $(".btn_next, .btn_prev");

	$btn.click(function(){
		return false;
	});
	
	// ul의 갯수가 2개 이상일때만 실행
	if ($roll.find("ul").size() != 1){
		$roll.find("ul:last").prependTo($roll);
		$roll.css("margin-left",-distance+"px");
		
		$(".btn_next").click(function(){
			roll("next");
			
			return false;
		});
		
		$(".btn_prev").click(function(){
			roll("prev");
			
			return false;
		});
		
		$btn.mouseenter(function(){
			rollstop();
		}).mouseleave(function(){
			tId = setInterval(rollstart,speed);
		});

		$roll.mouseenter(function(){
			rollstop();
		}).mouseleave(function(){
			tId = setInterval(rollstart,speed);
		});
		
		function roll(dir) {
			if(isMoving == false){
				if (dir == "next"){
					isMoving = true;
					$roll.animate({marginLeft : parseInt($roll.css("margin-left"))-distance+"px"}, 700, function(){
					$roll.css("margin-left",-distance+"px");
					$roll.find("ul:first").appendTo($roll);
					isMoving = false;
					});
				} else if (dir == "prev"){
					isMoving = true;
					$roll.animate({marginLeft : parseInt($roll.css("margin-left"))+distance+"px"}, 700, function(){
					$roll.css("margin-left",-distance+"px");
					$roll.find("ul:last").prependTo($roll);
					isMoving = false;
					});
				}
			}
		}
	} else {
		$(".btn_next").click(function(){ 
			alert('다음 목록이 없습니다.');
		});
		
		$(".btn_prev").click(function(){
			alert('이전 목록이 없습니다.');
		});
	}
	
	function rollstart(){
		roll("next");
	}

	function rollstop() {
		clearInterval(tId);
	}
});

//탭
$(function(){
	var $tabMenu = $("#tabMenu")
	var $reset = $tabMenu.find(".tab a.on").parent().index();
	
	// 로딩 시 
	$tabMenu.find(".detail > li").hide();
	$tabMenu.find(".detail > li").eq($reset).show();
	
	$tabMenu.find(".tab a").click(function(){
		$tabMenu.find(".detail > li").hide();
		$tabMenu.find(".tab a").each(function(){
			$(this).removeClass("on");
			imgReplace($(this).find(">img"),"off");
		});
		imgReplace($(this).find(">img"),"on");
		$(this).addClass("on");
		
		var $item = $(this).parent().index();
		$tabMenu.find(".detail > li").eq($item).show();
		
		return false;
	});
	
});

//탭 (bg변경, 양쪽 보더변경)
$(function(){
	var $tabMenu = $("#tabMenu3");
	var $reset = $tabMenu.find(".tab3 a.on").parent().index();
	
	// 로딩 시 
	$tabMenu.find(".tab3 span, .detail > li").hide();
	$tabMenu.find(".detail > li").eq($reset).show();
	$tabMenu.find(".tab3 li").eq($reset).find("span").show();
	
	$tabMenu.find(".tab3 a").click(function(){
		$tabMenu.find(".tab3 span, .detail > li").hide();
		$tabMenu.find(".tab3 a").each(function(){
			$(this).removeClass("on");
			$(this).removeClass("prev");
			$(this).removeClass("next");
			imgReplace($(this).find(">img"),"off");
		});
		var $item = $(this).parent().index();
		$tabMenu.find(".detail > li").eq($item).show();
		$(this).parent().find("span").show();

		imgReplace($(this).find(">img"),"on");
		$(this).addClass("on");
		$(".tab3 li").eq($item-1).find(">a").addClass("prev");
		$(".tab3 li").eq($item+1).find(">a").addClass("next");
		
		return false;
	});
	
});

//씽라운지tab
$(function(){
	var $tabMenu = $(".mainStore");
	
	/*$tabMenu.find(".tab4 a").click(function(){
		$tabMenu.find(".tab4 a").each(function(){
			$(this).parents("li").removeClass("on").removeClass("prev");
			imgReplace($(this).find(">img"),"off");
		})
		$(this).parents("li").find("a").each(function(){
			imgReplace($(this).find(">img"),"on");
			$(this).parents("li").addClass("on");
			$(this).parents("li").prev("li").addClass("prev");
		})
		

		return false;
	})*/
});

// 펼쳐보기
$(function(){
	$(".btn_view_off").click(function(){
		if ($(".list_off").hasClass("list_on")){
			$(".list_off").removeClass("list_on");
			$(this).removeClass("btn_view_on");
			$(this).find("span").text("목록 펼쳐보기");
		} else {
			$(this).addClass("btn_view_on");
			$(".list_off").addClass("list_on");
			$(this).find("span").text("목록 닫기");
		}

		return false;
	});
});

// 도서상세검색
$(function(){
	var $schBtn = $(".btn_book_search");
	var $schLayer = $(".book_search");
	
	$schLayer.hide();
	$schBtn.click(function(){
		if($schLayer.css("display") == "none"){
			$(".today_book").hide();
			$schLayer.show();
			$(this).addClass("layer_on");
			$(this).find("img").attr("src", $(this).find("img").attr("src" ).replace("_off" ,"_on"));
		} else {
			$(".today_book").show();
			$schLayer.hide();
			$(this).removeClass("layer_on");
			$(this).find("img").attr("src", $(this).find("img").attr("src" ).replace("_on" ,"_off"));
		}
		return false;
	});
	
	$schLayer.find(".btn_close").click(function(){
		$(".today_book").show();
		$schLayer.hide();
		
		$schBtn.each(function(){
			$schBtn.removeClass("layer_on");
			imgReplace($(this).find(">img"),"off");
		});
		imgReplace($(this).find(">img"),"off");
		
		return false;
	});
});

//도서상세검색2 (씽라운지)
$(function(){
	var $schBtn = $(".btn_book_search2");
	var $schLayer = $(".answerSearch2");
	
	$schLayer.hide();
	$schBtn.click(function(){
		if($schLayer.css("display") == "none"){
			$(".today_book").hide();
			$schLayer.show();
			$(this).find("img").attr("src", $(this).find("img").attr("src" ).replace("_off" ,"_on"));
		} else {
			$(".today_book").show();
			$schLayer.hide();
			$(this).find("img").attr("src", $(this).find("img").attr("src" ).replace("_on" ,"_off"));
		}
		
		return false;
	});
	
});


// 레이어 팝업 활성화 시 불투명 배경
function wrapWindowByMask(){        

	var maskHeight = $(document).height();        
	var maskWidth = $(window).width(); 
	
	$('#mask').css({'width':maskWidth,'height':maskHeight});           
	$('#mask').show();        
}

// gnb : join
/*
$(function(){
	var $joinGnb = $(".join_gnbMenu");
	
	if($joinGnb.size() != 0){
		var $gnbDepth = $(".join_gnbMenu li");
		var idx = gnbDepth-1
		
		$joinGnb.find("a").bind("mouseenter focusin", function(){
			$(this).find("img").attr("src", $(this).find("img").attr("src" ).replace("_off" ,"_on"));
		}).bind("mouseleave focusout", function(){
			$(this).find("img").attr("src", $(this).find("img").attr("src" ).replace("_on" ,"_off"));
			joinGnbDepth();
		});
		
		function joinGnbDepth(){
			if(idx != -1){
				$gnbDepth.eq(idx).find(">a>img").attr("src", $gnbDepth.eq(idx).find(">a>img").attr("src" ).replace("_off" ,"_on"));
			}
		}
		
		joinGnbDepth();
	}
});
*/

// popup : ssi
$(function(){
	var $ssi = $(".ssi_percent a")
	
	$ssi.mouseenter(function(){
		$(this).addClass("on");
		$(this).next(".layer").show();
		var i = $(this).parents("li").index();
		$(this).parents("tr").find("ul li a:eq("+i+")").css("color","#fd7100");
	}).mouseleave(function(){
		$(this).removeClass("on");
		$(this).next(".layer").hide();
		$(this).parents("tr").find("td > ul > li > a").css("color","#666");
	});
});

// tab type 2 : 클릭시 하위메뉴가 노출되는 tab, a에 class on
$(function(){
	var $popTab = $(".tab1 > li");
	var $popOn = $(".tab1 > li > .on");

	$popTab.find("ul").hide();
	$popOn.siblings("ul").show().find("li > a").eq(0).addClass("on");

	$popTab.find(">a").bind("click", function(){
		$popTab.find("ul").hide();
		$(this).next("ul").show();
		$popTab.find(">a").each(function(){
			imgReplace($(this).find(">img"),"off");
			$popTab.find(">a").removeClass("on");
		});
		imgReplace($(this).find(">img"),"on");
		$(this).addClass("on");
		$(this).next("ul").find("li > a").eq(0).addClass("on"); 
	});

	$popTab.find(">a").bind("mouseenter", function(){
		$popTab.find("ul").hide();
		$(this).next("ul").show();
		$popTab.find(">a").each(function(){
			imgReplace($(this).find(">img"),"off");
			$popTab.find(">a").removeClass("on");
		});
		imgReplace($(this).find(">img"),"on");
		$(this).addClass("on");
	});
	
	var $popTab2 = $(".tab2 > li");

	$popTab2.find(">a").bind("click", function(){
		$popTab2.find(">a").removeClass("on");
		$(this).addClass("on");
	});
	

});
	
//마우스오버 : 이미지 on-off
$(function(){
	var $it = $(".noteBn li, .mainStudy li");
	var $on = $(".note_tab .tab li a")
	var $it2 = $(".go_nav li");

	$it.find(">a").bind("mouseenter focusin", function(){
		$it.find(">a").each(function(){
		    imgReplace($(this).find(">img"), "off");
		    $(this).removeClass("on");
		});
		imgReplace($(this).find(">img"),"on");
		$(this).addClass("on");
	}).bind("mouseleave focusout",function(){
		$it.find(">a").each(function(){
			imgReplace($(this).find(">img"),"off");
		});
		$(this).removeClass("on");
	});

	$it2.find(">a").bind("mouseenter focusin", function(){
		$it2.find(">a").each(function(){
			imgReplace($(this).prev("img"),"off");
		});
		imgReplace($(this).prev("img"),"on");
	}).bind("mouseleave focusout",function(){
		$it2.find(">a").each(function(){
			imgReplace($(this).prev("img"),"off");
		});
	});
});




//기간조회
$(function(){
	var $inquiry = $(".date_inquiry a");
	
	$inquiry.click(function(){
		$(".date_inquiry a").each(function(){
			imgReplace($(this).find(">img"),"off");
			$(".date_inquiry a").removeClass("active");
		});
	
		$(this).addClass("active");
		if ($(this).hasClass("active"))
		{
			imgReplace($(this).find(">img"),"on");
		}
		
		return false;
	});
});

//달력
$(function(){
	$(".coupon_regi").hide();
	$(".calendar").hide();
	
	$(".cal, .btn_Regi").click(function(){
		$(this).siblings(".calendar, .coupon_regi").toggle();

		return false;
	});
	$(".cal_close, .regi_close").click(function(){
		$(this).parents(".calendar, .coupon_regi").toggle();

		return false;
	});
});

/* 도서상세 좌측메뉴 */
$(function(){
	var leftMenu = $('#sub_leftMenu');

	leftMenu.find("a").removeClass("on");
	leftMenu.find("a").click(function(){
		leftMenu.find("a").each(function(){
			$(this).removeClass("on");
			imgReplace($(this).find(">img"),"off");
		});
		imgReplace($(this).find(">img"),"on");
		$(this).addClass("on");
		
	});
});

$(function(){
	if($("#sub_leftMenu").size() != 0){
		var sub_leftMenuFirst = 0;
		var beforeScrollTop = 0;

			function sub_leftMenuMove(){
			
			//only one action = get scrolling size
			if(sub_leftMenuFirst == 0){
				FirstScrollTop = document.documentElement.scrollTop || document.body.scrollTop;
				sub_leftMenuFirst++;
			}

			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
			bodyHeight = document.documentElement.clientHeight || document.body.clientHeight;
			containerlHeight = document.getElementById("container").offsetHeight;
			hearderHeight = document.getElementById("header").offsetHeight;
			footerHeight = document.getElementById("footer").offsetHeight;
			moveObj = document.getElementById("sub_leftMenu");

			//scroll down
			if(scrollTop > beforeScrollTop){
				var scrollHeight = $(document).height();
				var subBoxHeight = $(moveObj).height();
				var footerHeight = 400;
				var footerTop = scrollHeight - footerHeight;
				
				if( (scrollTop + subBoxHeight ) > footerTop ){ // is bottom
					moveObj.style.position = "static";
					moveObj.style.top = (footerTop - subBoxHeight - 800) + "px";
					moveObj.style.marginTop = 0+"px";
				}
				else if((hearderHeight + moveObjTopFirst) <= (scrollTop)){
					
					// not top
					moveObj.style.position = "fixed";
					moveObj.style.top = 0 + "px";
					moveObj.style.marginTop = 0+"px";

				}
			}
			//scroll up
			else if(scrollTop < beforeScrollTop){
				var scrollHeight = $(document).height();
				var subBoxHeight = $(moveObj).height();
				var footerHeight = 400;
				var footerTop = scrollHeight - footerHeight;

				if( (scrollTop + subBoxHeight ) > footerTop ){ // is bottom
					moveObj.style.position = "static";
					moveObj.style.top = (footerTop - subBoxHeight - 800) + "px";
					moveObj.style.marginLeft = 83 + "px";
					moveObj.style.marginTop = 0 +"px";
				}
				else {
					if((hearderHeight + moveObjTopFirst) >= (scrollTop)){
						moveObj.style.position = "static";
						moveObj.style.marginLeft = 83 + "px";
						moveObj.style.marginTop = 0 +"px";
					}
					else {
						moveObj.style.position = "fixed";
						moveObj.style.top = 0 + "px";
					}
				}
			}

			//limit set
			if(scrollTop > ((hearderHeight + containerlHeight)-(bodyHeight+90))){
				
			}else if(scrollTop < ((hearderHeight + containerlHeight)-(bodyHeight-90))){
				moveObj.style.marginTop = 0+"px";
			}

			beforeScrollTop = scrollTop;
		}

		$(window).bind("load", function(){
			$(window).bind("scroll", sub_leftMenuMove );

			moveObjTop = document.getElementById("leftMenu_wrap").offsetTop;
			moveObjTopFirst = document.getElementById("leftMenu_wrap").offsetTop;
			moveObj = document.getElementById("sub_leftMenu");
			scrollTop = document.documentElement.scrollTop || document.body.scrollTop;

			if(scrollTop != 0){
				moveObj.style.position = "static";
			}
		});
	}
});

//메인
$(function(){
	//임시_베너 하나 빼고 숨김 
	$(".mainBn > ul > li").hide();
	$(".mainBn > ul > li.on").show();
	
	//메인 로그인 시 뜨는 레이어 팝업
	$("#mainCon .close").bind('click',function(){
		$(".mainLogin").hide();
	});

	//메인 로그인 시 뜨는 레이어 팝업의 마이 신사고 도서 탭
	var $tabMenu = $("#tabMenu2")
	var $reset = $tabMenu.find(".tab a.on").parent().index();

	$tabMenu.find(".detail > li").hide();
	$tabMenu.find(".detail > li").eq($reset).show();
	
	$tabMenu.find(".tab a").click(function(){
		$tabMenu.find(".detail > li").hide();
		$tabMenu.find(".tab a").each(function(){
			$(this).removeClass("on");
			imgReplace($(this).find(">img"),"off");
		});
		imgReplace($(this).find(">img"),"on");
		$(this).addClass("on");
		
		var $item = $(this).parent().index();
		$tabMenu.find(".detail > li").eq($item).show();
		
		return false;
	});
});

// 기본 롤링 
$(document).ready(function(){
	jQuery.fn.basicRoll = function(duration){   //jquery에 함수 추가 duration -> 롤링 속도
		$(this).each(function(){
			var $roll 			= $(this);
			var $rollList		= $roll.find("> ul > li");
			var $rollBtnPrev	= $roll.find("a.btnPrev");
			var $rollBtnNext	= $roll.find("a.btnNext");
			var max				= $rollList.size();
			var idx = 0;
			var rollCheck = [ true , true ];   // mouse/keyboard accessibility
			var tid;
			
			//현재 갯수 네비게이션
			if($roll.find('.token')){
				$roll.find('.token em').text(max);
			}
			
			$roll.bind({
				"mouseenter" : function(){	
					rollCheck[0] = false;
					check();
				},
				"mouseleave" : function(){
					rollCheck[0] = true;
					check();
				}
				/*
				,
				"focusin" : function(){
					rollCheck[1] = false;
					check();
				},
				"focusout" : function(){
					rollCheck[1] = true;
					check();	
				}
				*/
			})

			$rollBtnPrev.bind({
				"click" : function(event){
					rollingPrev();
					event.preventDefault();
				}
			});

			$rollBtnNext.bind({
				"click" : function(event){
					rollingNext();
					event.preventDefault();
				}
			});
			
			function Init(){
				$rollList.filter(":not(:first)").hide();
				rollStart();
			}

			function check(){
				if( rollCheck[0] == true && rollCheck[1] == true ){
					rollStart();
				}else{
					rollStop();
				}
			}
			
			function rollStart(){
				rollStop();
				tid = setInterval(function(){
					rollingNext();
				} , duration);
			}

			function token(i){
				i = 1;
			}

			function rollStop(){
				clearInterval(tid);
			}

			function rollingNext(){
				if(idx+1 < max ){
					idx++;
				} else{
					idx = 0;
				}
				$roll.find('.token strong').text(idx + 1);
				showCont();
			}
			
			function rollingPrev(){
				if(idx-1 < 0 ){
					idx = max-1;
				} else{
					idx--;
				}
				$roll.find('.token strong').text(idx + 1);
				showCont();
			}

			function showCont(){
				$rollList.hide().eq(idx).show();
			}
			
			Init();
		});
	}
	
	$(".mainReview").basicRoll(5000); 
	$(".mainMentor").basicRoll(3000);
	$(".mainNbh").basicRoll(3000);
	$(".lmRight").basicRoll(5000);
//멘토링 페이지
	$(".mentBest > li").hide();
	$(".mentBest > li.on").show();
	//롤링실행 
  $(".mentTab > .detail > li").basicRoll(5000);

  //메인
  $(".mainVisual").basicRoll(5000);
});

//씽라운지
$(document).ready(function(){
	$(".ssGame > li").hide();
	$(".ssGame > li.on").show();
})

//고객센터
$(document).ready(function(){
	$(".query03 ul li").find(">a").click(function(){
		$(".query03 ul li").find(">a").removeClass("on");
		$(this).addClass("on");

		return false;
	});
})

//롤링2
$(function(){
var rollAuto,
	liLength = 9,
	liLength = 0,
	viewNum = 0,
	rollType = false,
	ROLLING_TIME = 5000,
	RollMethod = {
		auto : function() {
			liLength = $('#storeRoll > ul li').length;
			if(liLength == 0) liLength = $('#storeRoll .tabBox > ul li').length;
			if( $('#storeRoll #tabMenu').length > 0 ) rollType = true;
			rollAuto = setInterval(function() {
				++viewNum;
				if(viewNum == liLength) viewNum = 0;
				$('#storeRoll .rollBox > ul').eq(viewNum).show().siblings().hide();
				RollMethod.tabInit();
				if( rollType ) {
					$('#storeRoll #tabMenu li').eq(viewNum).find('> a').addClass('on').find('img').each(function() {
					    $(this).imgOn();
					});
				} else {
					$('#storeRoll > ul li').eq(viewNum).find('> a img').each(function() {
						$(this).imgOn();
					});
				}
				
			}, ROLLING_TIME);
		},
		autoStop : function() {
			clearInterval( rollAuto );
			return this;
		},
		tabInit : function() {
			if( rollType ) {
				$('#storeRoll #tabMenu li a').removeClass('on').find('img').each(function() {
					$(this).imgOff();
				});
			} else {
				$('#storeRoll > ul li a').find('img').each(function() {
					$(this).imgOff();
				});
			}
			return this;
		},
		tabClick : function() {
			viewNum = $(this).closest('li').index();
			
			RollMethod.tabInit();
			$(this).parent().addClass('on').siblings().removeClass('on');
			
			if( rollType ) {
			    //$(this).addClass('on').find('img').imgOn();
			    $('#storeRoll #tabMenu li').eq(viewNum).find('> a').addClass('on').find('img').each(function () {
			        $(this).imgOn();
			    });
			} else {
				$(this).find('img').imgOn().parent().siblings().find('img').imgOn();
			}
			$('#storeRoll .rollBox > ul').eq(viewNum).show().siblings().hide();
			return false;
		},
		viewNumFunc : function() {
			$('#storeRoll .rollBox > ul').eq(viewNum).show().siblings().hide();
			RollMethod.tabInit();
			
			if( rollType ) {
				$('#storeRoll #tabMenu li').eq(viewNum).find('> a').addClass('on').find('img').each(function() {
					$(this).imgOn();
				});
			} else {
				$('#storeRoll > ul li').eq(viewNum).find('> a img').each(function() {
					$(this).imgOn();
				});
			}
		},
		btnClick : function() {
			var className = $(this).attr('class');
			
			switch( className ) {
			case 'btn_prev' : 
				--viewNum;
				if(viewNum < 0) viewNum = ( liLength - 1 );
				RollMethod.viewNumFunc();
				
				break;
			case 'btn_next' : 
				++viewNum;
				if(viewNum >= liLength) viewNum = 0;
				RollMethod.viewNumFunc();
				break;
			}
			return false;
		}
	};
	
	
/* Activation */
$(function() {
	RollMethod.auto();
	$('#storeRoll .rollBox').on({ mouseenter : RollMethod.autoStop, mouseleave : RollMethod.auto });
	$('#storeRoll .tab li a').on({ click : RollMethod.tabClick, mouseenter : RollMethod.autoStop, mouseleave : RollMethod.auto });
	$('#storeRoll > ul li a').on({ click : RollMethod.tabClick, mouseenter : RollMethod.autoStop, mouseleave : RollMethod.auto });
	$('#storeRoll > a').on({ click : RollMethod.btnClick, mouseenter : RollMethod.autoStop, mouseleave : RollMethod.auto });
});
});

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

// 레이어팝업
$(function () {
    var layerPop = $("#layer_popup");
    var $btn = $("a.btn_review");
    var closeBtn = $(".layer_close, .btn_close");
   
    layerPop.hide(); //초기화

    $btn.on('click', function (e) {
        e.preventDefault();
        var posTop = ($(window).scrollTop() + ($(window).height() - layerPop.height()) / 2); // 레이어 가운데 정렬
        var posLeft = ($(window).scrollLeft() + ($(window).width() - layerPop.width()) / 2);

        wrapWindowByMask();
        layerPop.hide();
        layerPop.css('top', posTop);
        layerPop.css('left', posLeft);

        $("#layer_popup").show();
    });

    $("a.layer_close, a.btn_close").click(function (e) {
        e.preventDefault();
        layerPop.hide();
        $("#mask").hide();
    });
});

// 레이어팝업
$(function () {
	var layerPop = $("#layer_popup");
	var $btn = $("a.btn_review2");
	var closeBtn = $(".layer_close, .btn_close");

	layerPop.hide(); //초기화

	$btn.on('click', function (e) {
		e.preventDefault();
		var posTop = ($(window).scrollTop() + ($(window).height() - layerPop.height()) / 2); // 레이어 가운데 정렬
		var posLeft = ($(window).scrollLeft() + ($(window).width() - layerPop.width()) / 2);

		wrapWindowByMask();
		layerPop.hide();
		layerPop.css('top', posTop);
		layerPop.css('left', posLeft);

		$("#layer_popup").show();
	});

	$("a.layer_close, a.btn_close").click(function (e) {
		e.preventDefault();
		layerPop.hide();
		$("#mask").hide();
	});
});



//씽몰 학습자료 다운
function fnMallDataDown(price,bulletin_idx,mall_idx){
	if(confirm("파일을 다운로드 받으시면 " + price + "씽이 차감됩니다. \n다운로드하시겠습니까?")){
		location.href="/common/bulletinDown.aspx?bulletin_idx=" + bulletin_idx + "&mall_idx=" + mall_idx;
	}
}

//마이페이지 탭
$(document).ready(function () {
    $('.mypage161024 .tab161024 a').click(function (i) { this.i = i }).click(function () {
        var idx = $(this).index();
        $(this).parent().parent().find('.hiddenarea').removeClass('on');
        $(this).parent().parent().find('.tab161024 a').removeClass('on');
        $(this).addClass('on');
        $(this).parent().parent().find('.hiddenarea:eq(' + idx + ')').addClass('on');
        return false;
    });
});

// S 190701
$(window).load(function () {
    quick();
});
function quick() {
	var contHei = $('#container').offset().top;

	if ($('#header').hasClass('sub')) {
		$('#quickbox').addClass('sub');

		$(window).scroll(function () {
			var wins = $(window).scrollTop();
			if (wins >= contHei) {
				$('#quickbox').css({ 'top': (wins - contHei) + 15 });
			} else {
				$('#quickbox').attr('style', '');
			}
		});
	}
}
// E 190701

/* s : 170424 */
$(function(){
	$('.siteOver170424').hide();
	$('#footer .site').on('click',function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$(".site img").attr("src", $(this).find("img").attr("src" ).replace("_on" ,"_off"));
			$(".siteOver170424").css({'display':'none'});
		}else{
			$(this).addClass('on');
			$(".site img").attr("src", $(this).find("img").attr("src" ).replace("_off" ,"_on"));
			$(".siteOver170424").css({'display':'block'});
		}
		return false;
	});
});
/* e : 170424 */

/* s : 180903 */
$(document).ready(function () {
    // ie8 placeholder 스크립트 : 라벨로 placeholder 대체
    $(".placeholder_input").change(function () {
        if ($(this).val() != "") {
            $(this).addClass("has_val");
        } else {
            $(this).removeClass("has_val");
        }
    });

    /*
    $(".input_confirm_wrap .txt").change(function () {
        if ($(this).val() != "") {
            $(this).parent().addClass("ischecked");
        } else {
            $(this).parent().removeClass("ischecked");
        }
    });
    
    $('.btn_email_confirm').click(function () {
        $('.new_popup, .pop_email').removeClass('hide');
        $('body').addClass('has_popup')
    });

    $('.btn_sms_confirm').click(function () {
        $('.new_popup, .pop_sms').removeClass('hide');
        $('body').addClass('has_popup')
    });

    */

    $('.new_popup .btn_pop_close').click(function () {
        $('.new_popup, .new_popup_wrap').addClass('hide');
        $('body').removeClass('has_popup')
    });

    function quick() {
        var obj = $('#btn_top');
        var btn_top = 399;
        var s_movement = function () {
            var sTop = $(window).scrollTop();
            var foffset = $('#footer').offset();
            var fTop = foffset.top;
            if (sTop >= 60) {
                obj.stop().animate({ 'top': $(document).scrollTop() + btn_top + 'px' }, 1000);
            } else {
                obj.stop().animate({ 'top': 60 }, 1000);
            }
        };
        $(window).scroll(function () {
            s_movement();
        });

        obj.click(function () {
            $('html, body').animate({ scrollTop: 0 });
        });
    }
    quick();
});
