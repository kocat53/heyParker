// header_inc.html 파일 기준작업후 적용\
document.write('<header id="header">\
<h1 class="main_logo">\
	<a href="#;" title="쎈닷컴 메인페이지 이동"><img src="../images/common/new_logo.png" alt="쎈닷컴"></a>\
</h1>\
<!-- 상단메뉴 -->\
<div class="top_menu">\
	<strong class="blind">상단 서브메뉴</strong>\
	<div class="inner_cont ovh">\
		<div class="top_menu_class fl">\
			<strong class="blind">학년 선택 메뉴</strong>\
			<ul class="list_top_menu">\
				<li><a href="#;">쎈닷컴 인트로</a></li>\
				<!-- [D]  접속중인 학년은 b태그로 한번 감싸기-->\
				<li><a href="#;"><b>초등</b></a></li>\
				<li><a href="#;">중등</a></li>\
				<li><a href="#;">고등</a></li>\
			</ul>\
		</div>\
		<div class="top_menu_etc fr">\
			<strong class="blind">기타 메뉴</strong>\
			<ul class="list_top_menu">\
				<li><a href="#;">내 공부방</a></li>\
				<li><a href="#;">매일공락</a></li>\
				<li><a href="#;">고객센터</a></li>\
				<li><a href="#;">즐겨찾기</a></li>\
				<li>\
					<a href="https://www.facebook.com/ssenmania" target="_blank" class="ico_new ico_new_sns_faceboox">\
						<span class="blind">페이스북 페이지 바로가기</span>\
					</a>\
				</li>\
				<li>\
					<a href="http://blog.ssen.com" target="_blank" class="ico_new ico_new_sns_blog">\
						<span class="blind">블로그 바로가기</span>\
					</a>\
				</li>\
			</ul>\
		</div>\
	</div>\
	<hr>\
</div>\
<!-- 헤더 중간영 역 -->\
<div class="header_evnt_area">\
	<div class="inner_cont ovh">\
		<!-- 배너 -->\
		<div class="header_evt_slider fl">\
			<strong class="blind">이벤트 롤링 배너</strong>\
			<div class="slider_wrap">\
				<div class="slider_inner">\
					<a href="#;" class=" item_header_slide"><img src="../images/common/190605/tmp_header_banner.png" alt=""></a>\
					<a href="#;" class=" item_header_slide"><img src="../images/common/190605/tmp_header_banner.png" alt=""></a>\
					<a href="#;" class=" item_header_slide"><img src="../images/common/190605/tmp_header_banner.png" alt=""></a>\
				</div>\
			</div>\
			<div class="evt_slider_control">\
				<span class="btn_evt_slide evt_slider_prev" title="이전배너">\
					<i class="ico_new ico_new_arrow_top_small"></i>\
				</span>\
				<span class="btn_evt_slide evt_slider_next" title="다음배너">\
					<i class="ico_new ico_new_arrow_bottom_small"></i>\
				</span>\
			</div>\
		</div>\
		<!-- 검색 -->\
		<div class="header_search fr">\
			<div class="search_wrap">\
				<label for="headerSearch" class="wite_wrap">\
					<span class="blind" >검색어 입력</span>\
					<input type="text" id="headerSearch" class="search_write" title="검색어 입력">\
				</label>\
				<label for="headerSearchBtn" class="submit_wrap">\
					<span class="blind" >검색버튼</span>\
					<input type="submit" id="headerSearchBtn" class="search_btn ico_new ico_new_search" value="검색" title="검색하기 버튼">\
				</label>\
			</div>\
		</div>\
	</div>\
	<hr>\
</div>\
<!-- 주메뉴 -->\
<div id="gnb">\
	<h2 class="blind">주메뉴</h2>\
	<div class="gnb_inner inner_cont claer">\
		<!-- 메뉴 -->\
		<div class="gnb_area fl">\
			<!-- [D] 초등의 gnb는 size_md 추가 -->\
			<ul class="list_gnb size_md">\
				<li>\
					<a href="#;" class="tc">\
						<span class="label_round">15%할인+교재4권</span>\
						<span class="txt_evt_menu">무한수강 프리미엄클래스</span>\
					</a>\
				</li>\
				<li><a href="#;">교재별</a></li>\
				<li><a href="#;">초3</a></li>\
				<li><a href="#;">초4</a></li>\
				<li><a href="#;">초5</a></li>\
				<li><a href="#;">초6</a></li>\
				<li><a href="#;">선생님</a></li>\
			</ul>\
			<!-- [D] 초등의 gnb는 size_md 추가 -->\
			<ul class="list_gnb size_md">\
				<li><a href="#;">열공자료실</a></li>\
				<li><a href="#;">이벤트</a></li>\
				<li><a href="#;">강좌체험관</a></li>\
			</ul>\
		</div>\
		<!-- 키워드 슬라이드 -->\
		<div class="gnb_slide fr">\
			<strong class="blind">추천 메뉴</strong>\
			<ul class="list_gnb_slide">\
				<li><a href="#;">#시험대비 올킬 특강1</a></li>\
				<li><a href="#;">#시험대비 올킬 특강2</a></li>\
			</ul>\
		</div>\
		<!-- 전체메뉴 -->\
		<div class="gnb_all_menu">\
			<button type="button" title="전체메뉴 펼처보기">\
				<span>\
					<i class="all_menu_line" aria-hidden="true"></i>\
					<span class="blind">전체메뉴</span>\
				</span>\
			</button>\
		</div>\
		<div class="gnb_detail none">\
			<strong class="blind">주메뉴 전체 보기</strong>\
			<!-- [D] li의 넓이는 첫번째 배너 영역 제외한 값을 갯수만큼 나눠 가지게 스크립트 처리 -->\
			<ul class="list_gnb_detail">\
				<li class="gnb_event_banner">\
					<a href="#" class="layout_fluid">\
						<span class="column_middle">\
							<img src="../images/common/190605/gnb_banner.png" alt="프리미엄 클래스 자유수강 바로가기">\
						</span>\
					</a>\
				</li>\
				<li>\
					<strong class="title_gnb_depth">내공부방</strong>\
					<ul class="list_gnb_depth">\
						<li><a href="#;">수강강좌</a></li>\
						<li><a href="#;">질문/답변</a></li>\
						<li><a href="#;">오답노트</a></li>\
						<li><a href="#;">학습일정</a></li>\
						<li><a href="#;">학업성취도</a></li>\
						<li><a href="#;">학습패턴</a></li>\
						<li><a href="#;">구매/결제내역</a></li>\
					</ul>\
				</li>\
				<li>\
					<strong class="title_gnb_depth">교재별 강좌</strong>\
					<ul class="list_gnb_depth">\
						<li><a href="#;">쎈수학</a></li>\
						<li><a href="#;">우공비</a></li>\
					</ul>\
				</li>\
				<li>\
					<strong class="title_gnb_depth">학년별 강좌</strong>\
					<ul class="list_gnb_depth">\
						<li><a href="#;">3학년</a></li>	\
						<li><a href="#;">4학년</a></li>\
						<li><a href="#;">5학년</a></li>\
						<li><a href="#;">6학년</a></li>\
						<li><a href="#;">예비중1</a></li>\
					</ul>\
				</li>\
				<li>\
					<strong class="title_gnb_depth">초등 선생님</strong>\
					<ul class="list_gnb_depth">\
						<li><a href="#;">이현진</a></li>\
						<li><a href="#;">하지선</a></li>\
						<li><a href="#;">문선진</a></li>\
						<li><a href="#;">나소은</a></li>\
					</ul>\
				</li>\
				<li>\
					<strong class="title_gnb_depth">열공 자료실</strong>\
					<ul class="list_gnb_depth">\
						<li><a href="#;">수공비</a></li>\
						<li><a href="#;">성적향상후기</a></li>\
						<li><a href="#;">열공수강생 혜택</a></li>\
						<li><a href="#;">나를 바꾸는 힘</a></li>\
						<li><a href="#;">타임캡슐</a></li>\
					</ul>\
				</li>\
			</ul>\
			<div class="gnb_keyword">\
				<h4 class="title_gnb_keword">지금 추천 키워드</h4>\
				<div class="keyword_wrap">\
					<a href="#;" class="label_round">시험대비 올킬 특강</a>\
					<a href="#;" class="label_round">무료 모의고사</a>\
					<a href="#;" class="label_round">야식 응원 이벤트</a>\
					<a href="#;" class="label_round">강좌 무료체험 이벤트</a>\
				</div>\
			</div>\
		</div>\
	</div>\
	<hr>\
</div>\
<!-- 로그인 영역 -->\
<div class="login_area">\
	<h3 class="blind">계졍 관련 영역</h3>\
	<div class="inner_cont ovh">\
		<!-- 로그인전 -->\
		<div class="login_wrap fl none">\
			<h3 class="blind">로그인 정보 입력</h3>\
			<label for="form_id">\
				<span class="blind">아이디를 입력하세요</span>\
				<input type="text" id="form_id" class="input_basic_text"  placeholder="아이디" title="아이디 입력" style="width: 120px">\
			</label>\
			<label for="form_pw">\
				<span class="blind">비밀번호를 입력하세요</span>\
				<input type="password" id="form_pw" class="input_basic_text"  placeholder="비밀번호" title="비밀번호 입력" style="width: 120px">\
			</label>\
			<label for="login_submit">\
				<span class="blind">로그인</span>\
				<input type="submit" id="login_submit" class="main_btn chakol_full sample_login" value="로그인">\
			</label>\
			<label for="remember_info" class="check_login_info" style="margin-left: 5px">\
				<input type="checkbox" class="hide ico_check_login orange"  id="remember_info">\
				<i class="login_check" aria-hidden="true">\
					<span class="ico_new ico_new_check"></span>\
				</i>\
				<span class="text_remeber">아이디 저장</span>\
			</label>\
			<ul class="list_member_option">\
				<li><a href="#;">회원가입</a></li>\
				<li><a href="#;">아이디/비밀번호 찾기</a></li>\
			</ul>\
		</div>\
		<!-- 로그인 후-->\
		<div class="login_wrap fl">\
			<h3 class="blind">내 간단 정보</h3>\
			<strong class="name_member">\
				<span class="blind">회원님 성함</span>\
				<i class="ico_new ico_new_people_round" aria-label="hidden"></i>\
				<span>일이삼사님</span>\
			</strong>\
			<ul class="list_my_btn list_inline_btn">\
				<li><a href="#;" class="main_btn mint_full">내공부방</a></li>\
				<li><a href="#;" class="main_btn mint">최근 수강강좌</a></li>\
				<li><a href="#;" class="main_btn">정보수정</a></li>\
				<li><a href="#;" class="main_btn sample_login">로그아웃</a></li>\
			</ul>\
			<ul class="list_my_benefit list_inline_btn">\
				<li>\
					<a href="#;" class="btnenfit_ssing ico_before">\
						<b>500</b>씽\
					</a>\
				</li>\
				<li>\
					<a href="#;">\
						쿠폰 <b>1</b>개\
					</a>\
				</li>\
				<li>\
					<a href="#;">\
						장바구니 <b>1</b>개\
					</a>\
				</li>\
				<li>\
					<a href="#;">\
						쪽지 <b>0</b>개\
					</a>\
				</li>\
			</ul>\
		</div>\
		<div class="login_side_btn fr">\
			<a href="#;" class="main_btn mint_full">내게 맞는 강좌 찾기</a>\
		</div>\
	</div>\
</div>\
</header>');
