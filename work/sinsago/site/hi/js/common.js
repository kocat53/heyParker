$(function(){
	$(window).scroll(function(){
		scrollOffset();
		var posLeft = $(document).scrollLeft();
		$('.fx #header').css('margin-left',-posLeft);
	});

	$('.siteOver').hide();
	$('#footer .site').on('click',function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$('.site img').attr('src', $(this).find('img').attr('src').replace('_on','_off'));
			$('.siteOver').css({'display':'none'});
		}else{
			$(this).addClass('on');
			$('.site img').attr('src', $(this).find('img').attr('src').replace('_off','_on'));
			$('.siteOver').css({'display':'block'});
		}
		return false;
	});

	$('#lnb ul ul').parent().parent().addClass('act')
	$('#lnb ul ul').parent().addClass('actLi')

	$('#lnb .act > li ul').hide();
	$('#lnb .act > li.on ul').show();
	$('#lnb .act > li > a').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).next().slideUp();
		}
		else{
			$('#lnb .act > li ul').slideUp();
			$('#lnb .act > li').removeClass('on');
			$(this).parent().addClass('on');
			$(this).next().slideDown();
		}
	});

	$('.latestSt1 .hash a').on('click',function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
		}else{
			$(this).addClass('on');
		}
	});

	// 20180612
	$('.lecture .bookList .thumb a').on('mouseover', function () {
		var $title = $(this).parents('.bookList').siblings('.bookSjb').find('.title_book_sjb'),
			  $bookTitle = $(this).parent().siblings('.sbj').text();
		$title.text($bookTitle);
		$(this).parent().parent().addClass('on');
		$(this).parent().parent().siblings().removeClass('on');
		return false;
	});
	// 20180612

	$('#lnb .tab a').click(function(i){this.i=i}).click(function(){
		var idx = $(this).index();
		$(this).parent().parent().find('.hiddenArea').removeClass('on');
		$(this).parent().parent().find('.tab a').removeClass('on');
		$(this).addClass('on');
		$(this).parent().parent().find('.hiddenArea:eq('+idx+')').addClass('on');
		return false;
	});

	$('.myStudy .btnAct').on('click',function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
		}else{
			$(this).parent().addClass('on');
		}
	});

	$('#popLogin .btnClose').on('click',function(){
		$('#popLogin').remove();
		$('.trpLayer').remove();
		$('body').removeClass('ovh');
	});

	// [D 190429] 탭 제작용 함수 선언
	tabPannel($('.promo_tab  > li'));
});

// [D 190429] 탭 제작용 함수
function tabPannel($target) {
	$target.each(function () {
		var $this = $(this),
			$parent = $this.parent();

		$this.click(function () {
			var $index = $this.index();
			$this.addClass('on').siblings().removeClass('on');
			$parent.siblings('.promo_tab_cont').find('>div').eq($index).removeClass('hide').siblings().addClass('hide');
		});
	})
}

scrollOffset();
function scrollOffset(){
	if($('#topBanner').hasClass('on')){scrTy1()}
	else{scrTy2()}
}

function scrTy1(){
	if($(window).scrollTop() > 197){
		$('body').addClass('fx');
	}else{
		$('body').removeClass('fx');
		$('#header').removeAttr('style');
	}
}

function scrTy2(){
	if($(window).scrollTop() > 122){
		$('body').addClass('fx');
	}else{
		$('body').removeClass('fx');
		$('#header').removeAttr('style');
	}
}

topBn();
function topBn(){
	tBn = $('#topBanner');
	cs = $('#topBanner .btnClose');
	td = $('#topBanner .btnToday');
	sts1 = true;
	cs.bind('click',function(e){tBn.slideUp(300, function(){tBn.removeAttr('style').removeClass('on')})});
	td.bind('click',function(e){
		if(sts1){
			td.addClass('on');
			sts1 = false;
		}else {
			td.removeClass('on');
			sts1 = true;
		}
	});
}

bxslider();
function bxslider(){
	var mySlider = $('#hdSlider .slider').bxSlider({
		auto:true,
		pager:false,
		touchEnabled:false,
		pause:4000,
		speed:500
	});
	var mySlider2 = $('.lecture .slider').bxSlider({
		auto:true,
		controls:false,
		autoHover:true,
		pager:true,
		responsive:false,
		touchEnabled:false,
		mode:'fade',
		pause:4000,
		speed:100
	});
	var mySlider3 = $('#sfSlider .slider').bxSlider({
		auto:true,
		controls:false,
		pager:true,
		touchEnabled:false,
		pause:4000,
		speed:500
	});
	var mySlider4 = $('#tcSlider .slider').bxSlider({
		auto:true,
		controls:false,
		pager:true,
		touchEnabled:false,
		minSlides:3,
		maxSlides:3,
		moveSlides:1,
		slideWidth:245,
		slideMargin:12,
		pause:4000,
		speed:500
	});
	var mySlider5 = $('.latest .review ul').bxSlider({
		auto:true,
		controls:false,
		pager:false,
		touchEnabled:false,
		mode:'vertical',
		pause:4000,
		speed:500
	});
	var mySlider6 = $('.latest .notice ul').bxSlider({
		auto:true,
		controls:false,
		pager:false,
		touchEnabled:false,
		mode:'vertical',
		pause:4000,
		speed:500
	});
	var mySlider7 = $('.best ul').bxSlider({
		auto:true,
		controls:false,
		pager:false,
		touchEnabled:false,
		mode:'vertical',
		pause:4000,
		speed:500
	});
	var mySlider8 = $('#tcSlider2 .slider').bxSlider({
		auto:true,
		controls:false,
		pager:true,
		touchEnabled:false,
		minSlides:3,
		maxSlides:3,
		moveSlides:1,
		slideWidth:260,
		slideMargin:12,
		pause:4000,
		speed:500
	});
	var mySlider9 = $('.loginWrap .slider').bxSlider({
		auto:true,
		controls:false,
		pager:true,
		touchEnabled:false,
		pause:4000,
		speed:500
	});
	// 20180612
	var mySlider10 = $('.banner_top_slide').bxSlider({
		auto:true,
		controls:false,
		pager: true,
		touchEnabled: false,
		pagerSelector: '.banner_top_pager',
		pause:4000,
		speed:500
	});
	// 20180612


	$('.lecture .bx-pager a').on('mouseenter',function(){
		  idx = $(this).attr('data-slide-index');
		  mySlider2.goToSlide(idx);
	});
	$(document).on('click','.bx-next, .bx-prev',function(){
		mySlider.stopAuto();
		mySlider.startAuto();
	});
}
$(window).load(function(){
	pager=1;
	$('.lecture .bx-pager-item').each(function(){
		$(this).addClass('nav' + pager);
		pager++;
	});

	// 20190221
	var teacherWidth = $('.teacherRoll .photo').innerWidth();
	$('.teacherRoll .photo').css('height', teacherWidth);
});

cnt = 0;
rollTm = 800;
sldTm = 3000;
sld = $('.slideWrap');
obWr = $('.objWrap');
obCr = $('.objWrap').children();
objLt = $('.objWrap').children().length-1;
objTt = $('.objWrap').children().length;
nav = $('.nav');
navCr = $('.nav span');
navTt = navCr.length;
rollAt = setInterval(actNext,sldTm);

obj1 = 0;
obj2 = 0;
nav1 = 0;
nav2 = 0;
navP1 = 0;
navP2 = 0;
hCs = 0;

$(sld).hover(function(){
	clearInterval(rollAt);
	cnt = 1;
},function(){
	rollAt = setInterval(actNext,sldTm);
});

o=1;
$(obCr).each(function(){
	$(this).addClass('act' + o);
	o++;
});
n=1;
$(navCr).each(function(){
	$(this).addClass('act' + n);
	n ++;
});

navSet();
txtAt();
function prev(){if(!$(obCr).eq(obj1).is(':animated')){actPrev();}}
function next(){if(!$(obCr).eq(obj1).is(':animated')){actNext();}}
function txtAt(){$('.sldChk').html('<b>' + (obj1+1) + '</b>/' + objTt)}
function navSet(){
	if(navTt>3){	for(var i=0; i<2; i++){$(navCr).clone(true,true).removeClass('on').appendTo(nav)}}
	sp = $('.nav span');
	for(var i = 0; i < sp.length; i+=3){sp.slice(i, i+3).wrapAll('<p></p>')}
	$('.nav p').eq(0).addClass('on');
	navTt = sp.length-1;
}

function actPrev(){
	obj1--;
	nav1--;
	if(obj1 == -1){obj1 = objLt; obj2 = 0}
	if(nav1 == -1){nav1 = navTt; nav2 = 0}
	$(obCr).eq(obj1).css('z-index','3');
	$(obCr).eq(obj1).fadeIn(rollTm, function(){
		$(obCr).removeClass('on');
		$(obCr).eq(obj1).addClass('on').removeAttr('style');
	});
	naCkP();
}

function actNext(){
	if(obj1 == objLt){obj1 = -1; obj2 = 0}
	if(nav1 == navTt){nav1 = -1; nav2 = 0}
	$(obCr).eq(obj1 + 1).css('z-index','3');
	$(obCr).eq(obj1+1).fadeIn(rollTm, function(){
		$(obCr).eq(obj1).addClass('on').removeAttr('style')
		$(obCr).eq(obj1-1).removeClass('on')
	});
	obj1++;
	nav1++;
	naCkN();
}

function napN(){
	navP = $('.nav p');
	if(navP1 == objLt){navP1 = -1; navP2 = 0}
	$(navP).eq(navP1 + 1).css('z-index','3');
	$(navP).eq(navP1+1).fadeIn(rollTm, function(){
		$(navP).eq(navP1).addClass('on').removeAttr('style')
		$(navP).eq(navP1-1).removeAttr('style').removeClass('on')
	});
	navP1++;
}

function napP(){
	navP1--;
	navP = $('.nav p');
	if(navP1 == -1){navP1 = objLt; navP2 = 0}
	$(navP).eq(navP1).css('z-index','3');
	$(navP).eq(navP1).fadeIn(rollTm, function(){
		$(navP).eq(navP1).addClass('on').removeAttr('style');
		$(this).siblings().find('span').removeClass('on');
		$(this).siblings().removeAttr('style').removeClass('on');
	});
}

function rIdx(){
	$(obWr).children('.'+hCs).css('z-index','3').fadeIn(rollTm, function(){
		$(this).addClass('on').removeAttr('style').siblings().removeClass('on');
	});
	obj1 = obj2;
	nav1 = nav2;
	txtAt();
}

function naCkP(){
	$('.nav span').removeClass('on').eq(nav1).addClass('on');
	$('.nav p span.on:last-child').each(function(){
		var ths = $(this);
		napP();
	});
	txtAt();
}

function naCkN(){
	$('.nav span').removeClass('on').eq(nav1).addClass('on');
	$('.nav p span.on:first-child').each(function(){
		var ths = $(this);
		napN();
	});
	txtAt();
}

var navCr = $('.nav span');
function navChk(){
	nav1 = $('.nav span').index($('.nav span.on')[0]);
	a = nav1+1;
	b = objTt;
	if(a<=b){c=0}
	else if(a<=(b*2)){c=b}
	else if(a<=(b*3)){c=b*2}
	obj2= Math.abs((a- c)-1);
	obj1 = obj2;
	txtAt();
}

$(navCr).each(function(i){
	$(this).on('mouseover',function(){
		if(i == nav1){return} nav2 = i;
		hCs = $(this).attr('class');
		$(navCr).removeClass('on');
		$(this).addClass('on');
		navChk();
		rIdx();
		return hCs;
	});
});

cnt2 = 0;
rollTm2 = 800;
sldTm2 = 3000;
tchLeg = $('.teacherRoll').children().length-1;
tch = $('.teacherRoll').children();
tch1 = 0;
tch2 = 0;
rollAt2 = setInterval(actNext2,sldTm2);

$(tch).hover(function(){
	clearInterval(rollAt2);
	cnt2 = 1;
},function(){
	rollAt2 = setInterval(actNext2,sldTm2);
});

function actNext2(){
	if(tch1 == tchLeg){tch1 = -1; tch2 = 0;}
	tch1++;
	tchChk();
}
function tchChk() {
	var teacherItem = $('.teacherRoll').children('li')
	teacherItem.removeClass('on');
	teacherItem.eq(tch1).addClass('on');
}

$(tch).each(function(i){
	$(this).on('mouseover',function(){
		if( i == tch1){return} tch2 = i;
		tch1 = tch2;
		tchChk();
	});
});

$('#gnb a img').on('mouseenter',function(){
	$(this).each(function(){var sSrc = $(this).attr('src').replace('_off.png', '_on.png');$(this).attr('src', sSrc)});
});
$('#gnb a img').on('mouseout',function(){
	$(this).each(function(){var sSrc = $(this).attr('src').replace('_on.png', '_off.png');$(this).attr('src', sSrc)});
});

/* 레이어 팝업 20181207 */
$(function(){
	$('.pop_wrap').css({
		top : ($(window).scrollTop() + ( $(window).height() - $('.pop_wrap').height())/2 - 60) + 'px',
		left : ($(window).scrollLeft() + ( $(window).width() - $('.pop_wrap').width())/2) + 'px'
	});
	
	$(".btn_layer_open").click(function(){
		$('.pop_wrap, .deemed').fadeIn(300);
		$('body').css({overflow:'hidden'});
	});
	
	$('.btn_close').on('click',function(){
		$('.pop_wrap, .deemed').fadeOut(300);
		$('body').css({overflow:'auto'});
	});
});

/* 레이어 팝업 20190405 */
$(function(){
	$('.mgc_pop_close').click(function(){
		$('.mgc_dimmed,.mgc_popup').hide();
		$('body').removeClass('of_y');
	});
	
	popupCenter();
	
	$(window).resize(function(){
		popupCenter();
	});
	
	function popupCenter(){
		var width = $('.mgc_popup').width();
		var height = $('.mgc_popup').height();
		
		$('.mgc_popup').css({
			'left' : ($(window).width() - width) / 2,
			'top' : ($(window).height() - height) / 2,
		});
	}
});