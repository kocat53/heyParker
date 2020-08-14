/*
개발자 : htsim@sinsago.co.kr
개발일 : 2013-12-12

##예약 속성

data-login-yn="Y"											// 로그인 검사 여부
data-submit="form1"									// submit 이 아닐경우 자동으로 해당 폼 유효성 검사
data-submit-confirm="등록하시겠습니까?"		// 유효성 검사 완료 후 확인창 출력 여부
data-access="P"											// 해당 회원구분만 참여가능
data-access-alert="학부모만 참여 가능!"			// 해당 회원구분이 아닐때 경고문자

## 로그인타입
1(기본값) : eventLoginXHTML
2(구형 html dtd) : eventLogin
*/

$(document).ready(function(){
	eventClass.init();
});

var eventClass = {
	// 이벤트 초기화(로그인 레이어 배치)
	init: function () {
		var $body = $("body");
		var loginHTML = "eventLoginXHTML";

		if (loginType == 2) {
			loginHTML = "eventLogin";
		}
		$.get("/html/event/" + loginHTML + ".html", function (h) {
			$body.append(h);
		});

		eventClass.pageDefaultValidation();
	}

	// 페이지 기본 유효성 검사
	, pageDefaultValidation: function () {
	    $("body *[data-login-yn=Y]").bind("click", function () {
        //2017.01.26 추가
	        var top = $(this).attr("login-layer-top");

	        return eventClass.login(top);
		});

		$("body *[data-submit*=Form]").bind("click", function () {
			var formName = $(this).attr("data-submit");
			var confirmMessage = $(this).attr("data-submit-confirm");
			var isLoginCheck = $(this).attr("data-login-yn") == "Y" ? true : false;
			var f = document.forms[formName];

			// 로그인 체크 속성까지 있다면 로그인 먼저
			if (!isLogin && isLoginCheck) {
				return eventClass.login();
			}
			else {
				if (validate(f)) {
					if (confirmMessage != "" && confirmMessage != undefined) {
						if (confirm(confirmMessage)) {
							f.submit();
							return false;
						}
						else {
							return false;
						}
					}
					else {
						f.submit();
						return false;
					}
				}
				else {
					return false;
				}
			}
		});

		$("a,input,img,button,area").each(function () {
			var dataAccess = $(this).attr("data-access");

			if (dataAccess != undefined && dataAccess != "") {
				//console.log($(this).attr("href"));
				$(this).bind("click", function () {
					if (eventClass.login()) {
						var arrowUserDiv = dataAccess.split(',');
						var dataAccessAlert = $(this).attr("data-access-alert");
						var myAuth = userDiv;
						var isValid = false;

						if (myAuth == "H" || myAuth == "M" || myAuth == "S") {
							myAuth = myAuth + "" + grade;
						}

						for (var i = 0; i < arrowUserDiv.length; i++) {
							if (arrowUserDiv[i] == myAuth) {
								isValid = true;
							}
						}

						if (!isValid) {
							alert(dataAccessAlert);
							return false;
						}
						else {
							return true;
						}

					}
					else {
						return false;
					}
				});
			}
		});
	}

	// 로그인
	, login: function (top) {
		if (!isLogin) {
		    alert("로그인을 해주세요.");
		    //2017.01.26 추가
		    if ($.isNumeric(top)) {
		        $("#login_pop").css('top', top + 'px');
		    }
		    else {
		        $("#login_pop").css('top', '300px');
		    }

			$("#login_pop").show().focus();
			$("#login_pop input[name=user_id]").focus();
			return false;
		}
		else {
			return true;
		}
	}

	// 스크랩(태그)
	, scrap: function(tag1,tag2,tag3) {
        var scrapTag = "<a href='" + tag1 + "' target='_blank'><img src='" + tag2 + "' alt='" + tag3 + "' /></a>";
        var IE = (document.all) ? true : false;
        if (IE) {
            if (confirm("클립보드에 복사하시겠습니까?"))
                window.clipboardData.setData("Text", scrapTag);
        } else {
            temp = prompt("아래 주소를 복사하여 블로그나 게시판에 html 형식을 선택한 후 붙여넣기 해주세요.", scrapTag);
        }
    }

	// 페이스북 공유(제목, 내용)
	, facebook: function (title, summary) {
		url = "http://www.facebook.com/sharer/sharer.php?u=" + eventUrl;
		url = url.split("#").join("%23");
		url = encodeURI(url);
		window.open(url, "", "width=500px, height=300px, top=0px");
	}

	// 페이스북 공유(제목, 내용)
	, facebook2: function (url) {		
		url2 = "http://www.facebook.com/sharer/sharer.php?u=" + url;
		url2 = url2.split("#").join("%23");
		url2 = encodeURI(url2);
		window.open(url2, "", "width=500px, height=300px, top=0px");
	}

	// 네이버 공유(제목, 내용)
	, naver: function (title, url) {
		var link = "http://share.naver.com/web/shareView.nhn?url=" + encodeURI(url) + "&title="+encodeURI(title);
		window.open(link, "", "width=500px, height=500px, top=0px");
	}

	// 트위터 공유(트윗)
	, twitter: function (twit, eventUrl) {
		var url = "https://twitter.com/intent/tweet?original_referer=&text=" + encodeURI(twit) + "&url=" + eventUrl;
		window.open(url, "", "width=500px, height=300px, top=0px");
	}

	// 미투데이
	, me2day: function (title) {
		var href = "http://me2day.net/posts/new?new_post[body]=" + encodeURI(title) + " : " + eventUrl + "&new_post[tags]=" + encodeURI("좋은책신사고");
		var a = window.open(href, 'me2Day', '');
		if (a) {
			a.focus();
		}
	}

	// 카카오스토리
	, kakaostory : function(title, eventUrl){
		// 사용할 앱의 JavaScript 키를 설정해 주세요.
		Kakao.init('c46656cc9cf3afb5a29e4fae3fbc3a5c');		 
		Kakao.Story.share({
		  url: eventUrl,
		  text: title
		});	    	
	}

	// 경고창 후 창 닫기
	, alertClose: function (msg) {
		alert(msg);
		window.close();
	}

	// 확인 창 후 창 닫기
	, confirmClose: function (msg) {
		if (confirm(msg)) {
			window.close();
		}
	}
}