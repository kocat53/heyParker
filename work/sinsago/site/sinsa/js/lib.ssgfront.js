var isIE = (navigator.appName.indexOf("Microsoft") != -1) ? 1 : 0;
var isIE6 = (navigator.appVersion.indexOf("MSIE 6") != -1) ? 1 : 0;
var isIE7 = (navigator.appVersion.indexOf("MSIE 7") != -1) ? 1 : 0;
var isIE8 = (navigator.appVersion.indexOf("MSIE 8") != -1) ? 1 : 0;
//SetCookie(이름, 값,만료시점0:브라우져 닫힐시/초단위,(/)절대 경로,도매인에서만,보안관련)
function SetCookie(name, value, expires, path, domain, secure) { //expires => 초
	var date = new Date();
	date.setSeconds(date.getSeconds() + expires);

	document.cookie = name + "=" + escape(value) + "; path=" + ((path) ? path : "/") +
	((expires) ? "; expires=" + date.toGMTString() : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
}

function GetCookie(name) {
	var dc = document.cookie;
	var prefix = name + "=";
	var begin = dc.indexOf("; " + prefix);
	if (begin == -1) {
		begin = dc.indexOf(prefix);
		if (begin != 0) return null;
	} else {
		begin += 2;
	}
	var end = document.cookie.indexOf(";", begin);
	if (end == -1) {
		end = dc.length;
	}
	return unescape(dc.substring(begin + prefix.length, end));
}

function DelCookie(name, path, domain) {
	if (GetCookie(name)) {
		document.cookie = name + "=" +
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
	}
}

function OpenDialog(nLink, nWin, nWidth, nHeight, xPos, yPos) {
	if (typeof nLink == "object") url = nLink.href;
	else url = nLink;
	var qResult = window.showModalDialog(url, nWin, "dialogwidth:" + nWidth + "px;dialogheight:" + nHeight + "px;toolbar:no;location:no;help:no;directories:no;status:no;menubar:no;scroll:no;resizable:no");
}

function OpenWindow(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if (typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width / 2 - nWidth / 2);
	adjY = yPos ? yPos : (window.screen.height / 2 - nHeight / 2 - 50);
	var qResult = window.open(url, nTarget, "width=" + nWidth + ", height=" + nHeight + ",left=" + adjX + ",top=" + adjY + ",toolbar=no,status=yes,scrollbars=no,resizable=no");
	//return qResult;
}

function OpenWindows(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if (typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width / 2 - nWidth / 2);
	adjY = yPos ? yPos : (window.screen.height / 2 - nHeight / 2 - 50);
	var qResult = window.open(url, nTarget, "width=" + nWidth + ", height=" + nHeight + ",left=" + adjX + ",top=" + adjY + ",toolbar=no,status=yes,scrollbars=1,resizable=no");
	//return qResult;
}

function ConfirmAction(obj) {
	if (confirm(obj.name + "하시겠습니까?")) {
		location.href = obj.href;
	}
}

function BtnConfirmGo(obj, url) {
	var msg;
	if (typeof obj == "object") msg = obj.value;
	else msg = obj;
	if (confirm(msg + "하시겠습니까?")) {
		location.href = url;
	}
}

function BtnConfirmGo2(obj, url) {
	if (isLogin) {
		var msg;
		if (typeof obj == "object") msg = obj.value;
		else msg = obj;
		if (confirm(msg + "하시겠습니까?")) {
			location.href = url;
		}
	} else {
		showLayer('login_pop');
	}
}

function Go(url) {
	location.href = url;
}

function IfGo(msg, url, url2) {
	if (confirm(msg)) Go(url);
	else {
		if (!url2) return false;
		else Go(url2);
	}
	return true;
}

function ConfirmCheckGo(f, n, url, msg) {
	var idx = GetFormValue(f, n);
	if (idx == "") {
		alert("선택 항목이 없습니다.");
	} else {
		if (confirm(msg)) {
			location.href = url + idx;
		}
	}
}

function ResizeImage(el, w, h) {
	var img = new Image();
	img.src = el.src;

	if (el.width > img.width) el.width = img.width;
	if (el.height > img.height) el.height = img.height;

	var sheight = el.width * img.height / img.width;
	var swidth = el.height * img.width / img.height;

	if (swidth < el.width) el.width = swidth;
	if (sheight < el.height) el.height = sheight;
}

/*function ShowLayer(n) {
	var el = document.getElementById(n);
	if (el) {
		el.style.display = 'block';
	}
}*/

function HideLayer(n) {
	var el = document.getElementById(n);
	if (el) {
		el.style.display = 'none';
	}
}

function AutoLayer(n) {
	var el = document.getElementById(n);
	if (!el) return;
	if (el.style.display == 'none') {
		el.style.display = 'block'
	} else {
		el.style.display = 'none'
	}
}

function validate(el) {
	return true;
}

function SetElementValue(element, v, sep) {
	if (!element) return false;
	switch (element.type) {
		case 'text':
		case 'password':
		case 'hidden':
			element.value = v;
			break;
		case 'textarea':
			element.text = v;
			break;
		case 'checkbox':
			if (element.value == v) element.checked = true;
			break;
		case 'select-one':
			for (var i = 0; i < element.options.length; i++) if (element.options[i].value == v) element.options[i].selected = true;
			break;
		default:
			if (sep) {
				var val = v.split(sep);
				for (var i = 0; i < element.length; i++) {
					for (var j = 0; j < val.length; j++) {
						if (element[i].value == val[j]) element[i].checked = true;
					}
				}
			}
			else {
				for (var i = 0; i < element.length; i++) {
					if (element[i].value == v) element[i].checked = true;
				}
			}
			break;
	}
}

function SetFormValue(f, n, v, sep) {
	var f = document.forms[f];
	if (!f || !f[n]) return false;
	switch (f[n].type) {
		case 'text':
		case 'password':
		case 'hidden':
			f[n].value = v;
			break;
		case 'textarea':
			f[n].text = v;
			break;
		case 'checkbox':
			if (f[n].value == v) f[n].checked = true;
			break;
		case 'select-one':
			for (var i = 0; i < f[n].options.length; i++) if (f[n].options[i].value == v) f[n].options[i].selected = true;
			break;
		default:
			if (sep) {
				var val = v.split(sep);
				for (var i = 0; i < f[n].length; i++) {
					for (var j = 0; j < val.length; j++) {
						if (f[n][i].value == val[j]) f[n][i].checked = true;
					}
				}
			}
			else {
				for (var i = 0; i < f[n].length; i++) if (f[n][i].value == v) f[n][i].checked = true;
			}
			break;
	}
}

function GetFormValue(f, n) {
	var f = document.forms[f];
	if (!f || !f[n]) return false;
	switch (f[n].type) {
		case 'text':
		case 'file':
		case 'password':
		case 'hidden':
			return f[n].value;
			break;
		case 'textarea':
			return f[n].text;
			break;
		case 'checkbox':
			if (f[n].checked == true) return f[n].value;
			break;
		case 'select-one':
			for (var i = 0; i < f[n].options.length; i++) {
				if (f[n].options[i].selected == true) {
					return f[n].options[i].value;
				}
			}
			break;
		default:
			var arr = new Array();
			var j = 0;
			for (var i = 0; i < f[n].length; i++) {
				if (f[n][i].checked == true) {
					arr[j] = f[n][i].value;
					j++;
				}
			}
			return arr.join(",");
			break;
	}
	return false;
}

var AUTO_CHECK_STATUS = true;

function AutoCheck(f, n, el) {
	var f = document.forms[f];
	if (!f || !f[n]) return;
	if (el) AUTO_CHECK_STATUS = el.checked;
	if (typeof (f[n]) == "object") {
		if (f[n].length > 0) {
			for (var i = 0; i < f[n].length; i++) {
				f[n][i].checked = AUTO_CHECK_STATUS;
			}
		} else {
			f[n].checked = AUTO_CHECK_STATUS;
		}
		if (AUTO_CHECK_STATUS == true) {
			AUTO_CHECK_STATUS = false;
		} else {
			AUTO_CHECK_STATUS = true;
		}
	}
}

function CheckGo(f, n, url, msg, confMsg) {
	var idx = GetFormValue(f, n);
	if (idx == "") {
		alert(msg);
	} else {
		if (confMsg && !confirm(confMsg)) return;
		if (url.indexOf("javascript:") != -1) {
			eval(url.replace("javascript:", ""));
		} else {
			location.href = url + idx;
		}
	}
}

/*
function CheckGo(f, n, url, msg) {
var idx = GetFormValue(f, n);
if(idx == "") {
alert(msg);
} else {
location.href = url + idx;
}
}
*/

function ResizeIframe(n) {
	var h;
	if (el = parent.document.getElementById(n)) {
		el.height = 0;
		if (isIE) h = document.body.scrollHeight;
		else h = document.documentElement.scrollHeight;
		if (h > 10) el.height = h;
		else el.height = 0;
	}
}
function parentResizeIframe(n) {
	var h;
	if (el = parent.parent.document.getElementById(n)) {
		el.height = 0;
		if (isIE) h = parent.document.body.scrollHeight;
		else h = parent.document.documentElement.scrollHeight;
		if (h > 10) el.height = h;
		else el.height = 0;
	}
}

function GoNext(fm, pos, size) {

	if (fm.elements[0].name == "PHPSESSID") {
		pos++;
	}

	next_pos = pos + 1;
	value = fm.elements[pos].value;
	len = value.length;
	is_num = Number(value);

	if (!is_num) {
		if ((len > 0) && (value != '0') && (value != '00') && (value != '000')) {
			alert('숫자를 넣어주세요');
			fm.elements[pos].select();
			fm.elements[pos].focus();
			return false;
		}
	}

	if (len == size) {
		fm.elements[next_pos].focus();
		return true;
	}
}

function MoveNext(el, next, size) {
	var len = el.value.length;
	if (len == size) {
		next.focus();
		return true;
	}
}

function IsNumeric(sText) {
	var ValidChars = "0123456789.";
	var IsNumber = true;
	var Char;

	for (i = 0; i < sText.length && IsNumber == true; i++) {
		Char = sText.charAt(i);
		if (ValidChars.indexOf(Char) == -1) {
			IsNumber = false;
		}
	}

	return IsNumber;
}

function OnlyNumber(el) {
	if (!IsNumeric(el.value)) {
		el.value = "";
		el.focus();
	}
}

function PhotoViewer(el) {
	var photo = new PhotoLayer();
	photo.Initialized();
	photo.doPhotoClick(el);
}

function DrawBar(cnt, max, color, width) {
	var percent;
	if (!width) width = 400;
	if (max > 0) {
		percent = Math.floor((cnt / max) * 100);
	} else {
		percent = 0;
	}
	var other = 100 - percent;
	document.write("<table align='left' width='" + width + "' cellpadding=0 cellspacing=0 height=10><tr><td width='" + percent + "%' background='../html/images/stat/s_bg_" + color + ".gif'></td><td width='" + other + "%'></td></tr></table>");
}

/* example : <script>getBarchart(230, 103, "red", "orange", "100%", 20, 2, true);</script> */
function getBarchart(max, value, color, bgcolor, width, height, point, displayValue, displayAll) {
	if (!width) width = "100%";
	if (!height) height = 20;
	if (!color) color = "#ff0000";
	if (!bgcolor) bgcolor = "orange";
	if (!point) point = 0;
	if (!displayValue) displayValue = false;
	if (!displayAll) displayAll = false;

	var rate = max > 0 ? (parseInt(value) / max) * 100 : 0;

	var bar = '<table width="' + width + '" cellpadding="0" cellspacing="0" style="table-layout:fixed;">';
	bar += '<tr>';
	if (rate > 0) bar += '<td width="' + Math.ceil(rate) + '%"><div style="height:' + (height / 2 - 1) + 'px;background:' + color + ';filter:alpha(opacity=50);opacity:0.5;"><!--ie--></div></td>';
	bar += '<td height="' + (height / 2 - 1) + '" bgcolor="' + bgcolor + '"><!--ie--></td>';
	bar += '</tr>';
	bar += '<tr>';
	if (rate > 0) bar += '<td width="' + Math.ceil(rate) + '%"><div style="height:' + (height / 2 + 1) + 'px;background:' + color + ';filter:alpha(opacity=100);opacity:1;"><!--ie--></div></td>';
	bar += '<td height="' + (height / 2 + 1) + '" bgcolor="' + bgcolor + '"><!--ie--></td>';
	bar += '</tr>';
	bar += '<tr>';
	if (rate > 0) bar += '<td></td>';
	bar += '<td align="left" class="_grp_container_">'
        + ' <div style="position:relative;">'
        + '     <div class="_grp_tip_" style="position:absolute;top:-' + (height > 10 ? Math.round(height / 2) + 5 : height) + 'px;left:1px;font-size:10px;font-family:굴림;">'
        + '<nobr>' + (displayAll ? (displayValue ? value + '(' + number_format(rate, point) + '%)' : number_format(rate, point) + '%') : "") + '</nobr>'
        + '     </div>'
        + ' </div>'
        + '</td>'
        + '</tr>'
        + '</table>';
	document.write(bar);
}

var _patchBarchart = function () {
	var tds = document.getElementsByTagName("td");
	for (var i = 0; i < tds.length; i++) {
		if (tds[i].className == "_grp_container_") {
			var ptip = tds[i];
			var tip = ptip.getElementsByTagName("div")[1];
			if (tip.offsetLeft + tip.offsetWidth > ptip.offsetWidth) {
				tip.style.left = (ptip.offsetWidth - tip.offsetWidth) + "px";
			}
		}
	}
}
function patchBarchart() {
	if (window.attachEvent) window.attachEvent("onload", _patchBarchart);
	if (window.addEventListener) window.addEventListener("load", _patchBarchart, false);
}



/*
function initTinyMCE(theme, mode, els, toolbar) {
if(!theme) theme = "advanced";
if(!mode) mode = "textareas";
if(!els) els = "content";

tinyMCE.init({
// General options
mode : mode,
elements : els, 
editor_deselector : /(noEditor)/,
theme : theme,
language : "ko",
skin : "o2k7",
skin_variant : "silver",
theme_advanced_fonts : "굴림=굴림;궁서=궁서;돋움=돋움;바탕=바탕;Arial=Arial; Comic Sans MS='Comic Sans MS';Courier New='Courier New';Tahoma=Tahoma;Verdana=Verdana",
plugins : "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,inlinepopups,autosave",

//		theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,forecolor,backcolor,|,fontselect,fontsizeselect",
//		theme_advanced_buttons2 : "undo,redo,|,charmap,emotions,media,image,|,link,unlink,|,tablecontrols,|,code,preview",
// Theme options
theme_advanced_buttons1 : (!toolbar ? "fontselect,fontsizeselect,|,bold,italic,underline,strikethrough,|,forecolor,backcolor,|,justifyleft,justifycenter,justifyright,justifyfull,|,charmap,emotions,media,image,|,link,unlink":""),
theme_advanced_buttons2 : "",
theme_advanced_buttons3 : "",
theme_advanced_buttons4 : "",
theme_advanced_toolbar_location : !toolbar ? "top" : false,
theme_advanced_toolbar_align : "left",
theme_advanced_statusbar : false,
theme_advanced_resizing : true,
theme_advanced_resize_horizontal : false,
theme_advanced_path : false,
relative_urls : false,
remove_script_host : false,
convert_urls : false,
//extended_valid_elements : "object[classid|codebase|width|height|align],param[name|value],embed[quality|type|pluginspage|width|height|src|align]",
verify_html : false,
button_tile_map : true,
entity_encoding : "raw",
forced_root_block : false, 
autosave_ask_before_unload:false,//textarea 글쓴후 창 이동 시 페이지 이동 경고 옵션 설정 
// Example content CSS (should be your site CSS)
content_css : "css/content.css"

});
}
*/
function initTinyMCE(theme, mode, els, toolbaroff) {
	if (!theme) theme = "advanced";
	if (!mode) mode = "textareas";
	if (!els) els = "content";

	tinyMCE.init({
		mode: mode,
		theme: theme,
		elements: els,
		plugins: "table,emotions,media,layer,preview",
		theme_advanced_fonts: "굴림=굴림,arial;돋움=돋움,arial;바탕=바탕,arial;궁서=궁서,arial;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier;Tahoma=tahoma,arial,helvetica,sans-serif;Verdana=verdana,geneva",
		//  theme_advanced_buttons1 : "fontselect,fontsizeselect,separator,bold,italic,underline,strikethrough,separator,forecolor,backcolor,separator,justifyleft,justifycenter,justifyright",
		//   theme_advanced_buttons2 : "undo,redo,separator,bullist,numlist,outdent,indent,separator,link,unlink,anchor,image,emotions,media,table,insertlayer,separator,hr,removeformat,separator,preview,code",
		//    theme_advanced_buttons3 : "",
		theme_advanced_buttons1: toolbaroff ? "" : "fontselect,fontsizeselect,|,bold,italic,underline,strikethrough,|,forecolor,backcolor,|,justifyleft,justifycenter,justifyright,justifyfull,|,charmap,emotions,media,image,link,unlink,|,table",
		theme_advanced_buttons2: "",
		theme_advanced_buttons3: "",
		theme_advanced_toolbar_location: toolbaroff ? false : "top",
		theme_advanced_toolbar_align: "left",
		//theme_advanced_statusbar_location : "bottom",
		//content_css : "../../html/css/style.css",
		//file_browser_callback : "fileBrowserCallBack",
		theme_advanced_statusbar: false,
		theme_advanced_resizing: false,
		theme_advanced_resize_horizontal: false,
		theme_advanced_path: false,
		relative_urls: false,
		remove_script_host: false,
		convert_urls: false,
		extended_valid_elements: "embed[quality|type|pluginspage|width|height|src|align],object[classid|codebase|width|height|align],param[name|value]",
		verify_html: false,
		button_tile_map: true,
		entity_encoding: "raw",
		language: "kr"
	});
}


function fileBrowserCallBack(field_name, url, type, win) {
	// This is where you insert your custom filebrowser logic
	OpenWindows("/board/fileman.php", '', 700, 600);

	// Insert new URL, this would normaly be done in a popup
	win.document.forms[0].elements[field_name].value = "someurl.htm";
}

function InsertContent(url, name) {
	var arr = url.split(".");
	var ext = arr[arr.length - 1];
	var content = "";
	var click_photo = ""

	click_photo = "photo.doPhotoClick(this)";

	switch (ext.toLowerCase()) {
		case "gif":
		case "jpg":
		case "png":
		case "bmp":
			content = '<img src=' + url + ' onclick="' + click_photo + '" style="cursor:pointer;width:400px;">';
			break;
		case "swf":
			var width = 200;
			var height = 200;
			content += ''
			+ '<img src="' + (tinyMCE.getParam("theme_href") + "/images/spacer.gif") + '" mce_src="' + (tinyMCE.getParam("theme_href") + "/images/spacer.gif") + '" '
			+ 'width="' + width + '" height="' + height + '" '
			+ 'border="0" alt="' + url + '" title="' + url + '" class="mceItemFlash" />';
			break;
		case "mov":
			content = getEmbedTag(url, '02BF25D5-8C17-4B23-BC80-D3488ABDDC6B', 'http://www.apple.com/qtactivex/qtplugin.cab#version=6,0,2,0', 'video/quicktime');
			break;
		case "ra":
			content = getEmbedTag(url, 'CFCDAA03-8BE4-11cf-B84B-0020AFBBCCFA', 'http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0', 'audio/x-pn-realaudio-plugin');
			break;
		case "wmv":
		case "wma":
		case "asf":
		case "mp3":
		case "avi":
			content = getEmbedTag(url, '6BF52A52-394A-11D3-B153-00C04F79FAA6', 'http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=5,1,52,701', 'application/x-mplayer2');
			break;
		default:
			return;
	}
	tinyMCE.execCommand('mceFocus', false, !name ? 'content' : name);
	tinyMCE.execCommand('mceInsertContent', false, content);
}

function getEmbedTag(url, cls, cb, mt, d) {
	var h = '', n;
	h = '<embed type="' + mt + '" src="' + url + '" alt="multiupload" wmode="transparent"></embed>';
	return h;
}

function call(url, id, callback) {

	if (!id) id = "AJAX_DIV";
	var client = false;

	if (window.ActiveXObject) {
		try {
			client = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try {
				client = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e) { }
		}
	} else {
		client = new XMLHttpRequest();
	}
	if (client) {
		client.onreadystatechange = function () {
			if (client.readyState == 4) {

				//출력레이어가 없을 경우 생성
				var el = document.getElementById(id);
				if (!el) {
					el = document.createElement("div");
					el.style.display = 'none';
					document.body.appendChild(el);
				}

				//IE의 경우 버그가 존재함. 그래서 &nbsp를 추가
				if (isIE && client.responseText.indexOf("<script") == 0) {
					el.innerHTML = "<span style='display:none;'>&nbsp;</span>" + client.responseText;
				} else {
					el.innerHTML = client.responseText;
				}

				if (callback) {
					try {
						eval(callback + "(client.responseText)");
					} catch (e) { alert(callback + " 함수가 없습니다."); }
				}

				//자바스크립트 실행 (defer는 IE 에서 실행되어 안씀)
				var scripts = el.getElementsByTagName("script");
				for (var i = 0; i < scripts.length; i++) {
					eval(scripts[i].innerHTML.replace("<!--", "").replace("-->", ""));
				}
			}
		}
		var f;
		if (f = document.forms[url]) {
			var parameters = "";
			for (var i = 0; i < f.elements.length; i++) {
				if (f.elements[i].name == "") continue;
				if (f.elements[i].type == "radio" || f.elements[i].type == "checkbox") {
					if (f.elements[i].checked == false) continue;
				}
				parameters += f.elements[i].name + "=" + encodeURI(f.elements[i].value) + "&";
			}
			if (!f.action) f.action = location.href;
			client.open('POST', f.action, true);
			client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			client.setRequestHeader("Content-Length", parameters.length);
			client.setRequestHeader("Connection", "close");
			client.send(parameters);
		} else {
			client.open("GET", url, true);
			client.send(null);
		}
	}


}

function docWrite(str) {
	document.write(str);
}

function playFlash(filename, width, height, id, trans, params, lock) {
	id = id ? id : "";
	document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="' + width + '" height="' + height + '" id="' + id + '" align="middle"><param name="allowScriptAccess" value="always" /><param name="movie" value="' + filename + '" /><param name="menu" value="false" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="wmode" value="' + trans + '" />' + (params ? '<param name="FlashVars" value="' + params + '" />' : "") + '<embed src="' + filename + (params ? '?' + params : "") + '" menu="false" quality="high" bgcolor="#ffffff" wmode="' + trans + '" width="' + width + '" height="' + height + '" name="' + id + '" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
}

function FlashChart(id, width, height, xmlurl, ftype) {
	var filename = "FlashChart.swf";
	if (ftype == "mini") filename = "FlashChartMini.swf";
	playFlash("/Web/lib/js/" + filename, width, height, id, "transparent", "xmlurl=" + escape(xmlurl));
}

function ToggleLayer(objName, tarName, addX, addY) {
	var obj = document.getElementById(objName);
	if (!obj) {
		alert(objName + ' 레이어가 존재하지 않습니다.');
		return;
	}

	var tar = tarName ? document.getElementById(tarName) : null;
	if (tar) {
		var curleft = curtop = 0;
		if (tar.offsetParent) {
			do {
				curleft += tar.offsetLeft;
				curtop += tar.offsetTop;
			} while (tar = tar.offsetParent);
		}
		obj.style.position = "absolute";
		obj.style.left = curleft + (addX ? parseInt(addX) : 0);
		obj.style.top = curtop + (addY ? parseInt(addY) : 0);
	}
	if (obj.style.display == "none") {
		obj.style.display = "block";
	} else {
		obj.style.display = "none";
	}
}

function ImageError(el, url) {

	if (url && url.toUpperCase() == "TEXTMODE") {
		if (el) el.parentNode.innerHTML = "<span><table width='" + (el.width * 1) + "' height='" + (el.height * 1) + "' cellpadding='0' cellspacing='0' style='border:1px solid #f2f2f2;'><tr><td style='font-family:arial;color:#d0d0d0'>No Image.</td></tr></table></span>";
	} else {
		var noimg = new Image();
		noimg.src = url ? url : "../html/images/viewer/img_no_photo2.gif";
		noimg.onerror = function () {
			alert("[개발 Debug] common.js - function ImageError() 오류 : \n" + noimg.src + ' 파일이 존재 하지 않습니다.');
			return false;
		}
		if (el) el.src = noimg.src;
	}
}

function addSelectOption(element, val, txt) {
	var opt = element.ownerDocument.createElement("option");
	opt.setAttribute("value", val);
	opt.appendChild(element.ownerDocument.createTextNode(txt));
	element.appendChild(opt);
}
function removeSelectOption(element, idx) {
	var opts = element.getElementsByTagName("option");
	if (idx < 0 || idx > (opts.length - 1)) return;
	element.removeChild(opts[idx]);
}



//관리자 페이지 버튼 스타일을 일괄 지정
function ToggleButton() {
	var buttons = document.getElementsByTagName("INPUT");
	for (var i = 0; i < buttons.length; i++) {
		var type = buttons[i].type.toLowerCase();
		if (type == "button" || type == "submit") {
			buttons[i].onmouseover = function () { this.style.backgroundPosition = "bottom"; }
			buttons[i].onmouseout = function () { this.style.backgroundPosition = "top"; }
		}
		if (buttons[i].className == "btn_simp" && (type == "button" || type == "submit")) {
			buttons[i].onmouseover = function () { this.style.backgroundColor = "#E8E8E8"; }
			buttons[i].onmouseout = function () { this.style.backgroundColor = "#F8F8F8"; }
			/*
			buttons[i].onmouseover = function() { this.style.border = "1px solid black"; }
			buttons[i].onmouseout = function() { this.style.border = "1px solid #9EB4CA"; }
			*/
		}
	}
}

//관리자 페이지 리스트 테이블 마지막 경계선 제거 --> 타이틀테이블 꾸밈 넣기
function PatchListTableLine() {
	var tables = document.getElementsByTagName("TABLE");
	for (var i = 0; i < tables.length; i++) {
		/*
		if(tables[i].className == "l_tb01") {
		var childNodes = tables[i].getElementsByTagName("TR")[0].getElementsByTagName("TD");
		childNodes[childNodes.length - 1].style.backgroundImage = "none";
		}
		*/
		if (tables[i].className == "c_tb01") {
			var caption = tables[i].getElementsByTagName("TR")[0].getElementsByTagName("TD")[0];
			caption.innerHTML = '<div style="float:left;width:6px;height:13px;background:silver"><!----></div>&nbsp;&nbsp;' + caption.innerHTML;
		}
	}
}
//타이틀 네비게이션 폰트 설정
function setTitleStyle() {
	var title = document.getElementById("_ttl_").getElementsByTagName("div")[1];
	var tmp = title.innerHTML.split("&gt;");
	var str = "";
	for (var i = 0; i < tmp.length; i++) {
		str += i == 0 ? tmp[i] : ' <span style="font-weight:normal;font-size:15px;"> > ' + tmp[i] + '</span>';
	}
	title.innerHTML = str;
}
function p(el, type) {
	var attributes = new Array(); var i = 0;
	for (e in el) {
		if (!type && !el[e]) continue;
		attributes[i] = e + "=" + el[e];
		i++;
	}
	if (document.body) {
		document.body.innerHTML = "<div style='position:absolute;top:10px;left:10px;overflow:auto;width:95%;height:95%;background:#f7f7f7;z-index:100'>" + attributes.join("<br>") + "</div>";
	} else {
		alert(attributes.join("\n"));
	}
}

function pngfilter(el) {

	if (/MSIE (5\.5|6\.0)/.test(navigator.userAgent)) {
		// 쓸데 없어 보이지만 중요함
		if (el.width != 0) {
			el.width = el.width;
			el.height = el.height;
		}

		var img = new Image();
		img.src = el.src;
		el.src = "../html/css/blank.gif";
		el.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="' + img.src + '",sizingMethod="scale")';
	}
}

function iepngfix(element) {

	if (/MSIE (5\.5|6\.0)/.test(navigator.userAgent)) {
		if (element) var imgs = element.getElementsByTagName("IMG");
		else var imgs = document.getElementsByTagName("IMG");
		for (var i = 0; i < imgs.length; i++) {
			if (imgs[i].src.substring(imgs[i].src.length - 4).toLowerCase() == ".png") {
				pngfilter(imgs[i]);
			}
		}
	}
}

function changeYear(element, d, num) {
	if (!element) return;
	if (!num) num = 10;
	var year = parseInt(element.value * 1);
	if (!year) year = !d ? new Date().getFullYear() : d;
	year = parseInt(year * 1);
	var pattern = /[^0-9]/;
	var add = "";
	var head = "";
	if (element.options.length > 0) {
		add = pattern.test(element.options[element.selectedIndex].text);
		head = element.options[0].value == "" ? element.options[0].text : "";
	}
	element.options.length = 0; var j = 0;
	if (head) {
		element.options[0] = new Option(head, "", false);
		j++;
	}
	for (var i = year - num; i <= year + num; i++, j++) {
		element.options[j] = new Option(i + (add ? "년" : ""), i, false);
		if (i == year) element.options[j].selected = true;
	}
}

Offset = function (element) {
	this.obj = element;
	this.left;
	this.top;
	this.height;
	this.width;
	this.centerLeft;
	this.getOffset();
}
Offset.prototype.getOffset = function () {
	var obj = this.obj;
	var top = left = 0;
	if (obj.offsetParent) {
		do {
			top += obj.offsetTop;
			left +=
			obj.offsetLeft;
		} while (obj = obj.offsetParent);
	}
	this.left = left;
	this.top = top;
	this.width = this.obj.offsetWidth;
	this.height = this.obj.offsetHeight;
	this.centerLeft = this.left + Math.round(this.width / 2);
}

function number_format(number, decimals, dec_point, thousands_sep) {
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// *     example 1: number_format(1234.5678, 2, '.', '');
	// *     returns 1: 1234.57

	var i, j, kw, kd, km;

	// input sanitation & defaults
	if (isNaN(decimals = Math.abs(decimals))) {
		decimals = 0;
	}
	if (dec_point == undefined) {
		dec_point = ".";
	}
	if (thousands_sep == undefined) {
		thousands_sep = ",";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if ((j = i.length) > 3) {
		j = j % 3;
	} else {
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");

	return km + kw + kd;
}

function addslashes(str) {
	return str.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0");
}

function strip_tags(input, allowed) { allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join(''); var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi, commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi; return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) { return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : ''; }); }


function in_array(needle, haystack, strict) {
	var found = false, key, strict = !!strict;
	for (key in haystack) {
		if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
			found = true;
			break;
		}
	}
	return found;
}


//var descpreload = new Image(); descpreload.src = "../html/images/s_desc.gif";
//var ascpreload = new Image(); ascpreload.src = "../html/images/s_asc.gif";
function ListSort(element, ord) {
	if (element) {
		document.forms['form1']['ord'].value = element.getAttribute("id").replace("CL_", "") + " " + (ord.indexOf(" ASC") != -1 ? "DESC" : "ASC");
		document.forms['form1'].submit();
	} else {
		var arr = ord.split(" ");
		var element = document.getElementById("CL_" + arr[0])
		if (element && arr.length == 2) {
			var arrow = arr[1] == "ASC" ? ' <img src="../html/images/s_asc.gif">' : ' <img src="../html/images/s_desc.gif">';
			element.innerHTML = element.innerHTML + arrow;
		}
	}
}

function removeAttr(formName, keys, type) {
	var f = document.forms[formName];
	if (!f) return;
	type = !type ? "required" : type;
	var arr = keys.replace(/ +/g, "").split(",");

	for (var i = 0; i < arr.length; i++) {
		if (f[arr[i]]) {
			var el = f[arr[i]];
			if (el.type != "select-one" && el.length > 1) el = el[0];
			el.removeAttribute(type);
		}
	}
}
function setAttr(formName, keys, type, value) {
	var f = document.forms[formName];
	if (!f) return;
	var arr = keys.replace(/ +/g, "").split(",");
	for (var i = 0; i < arr.length; i++) {
		if (f[arr[i]]) {
			var el = f[arr[i]];
			if (el.type != "select-one" && el.length > 1) el = el[0];
			el.setAttribute(type, value);
		}
	}
}

/* 레이어 팝업 닫기 */
$(function () {
    $("#login_pop").hide();
    $(".layer_close").click(function () {
        isMainPage = false;
        $("#mask").attr("style", "");
        $("#login_pop").hide();
        $("#pop_wrap").hide();
        $("#study_level").hide();
        $("#study_book").hide();
        $("#ssing_save").hide();
        $(".mentor_interview").hide();
        $("#study_data").hide();
        $("#study_high").hide();
        $("#book_search2").hide();
        $("#styleInsert").html('');
        $("#book_detail_search2").hide(); /* 20181122 */
        return false;
    });

});

/* 레이어 팝업 열기 */
function showLayer(id) {
	var low_height = 0;

	if (id.substring(0, 9) == "interview") {
		low_height = 150;
	} else if (id == "ssing_save") {
		low_height = 50;
	}

    $("#styleInsert").append('<link rel="stylesheet" type="text/css" href="http://truebook.sinsago.co.kr/css/popup.css?v=190312" />');
	var loginPop = $("#" + id);
	var posTop = ($(window).scrollTop() + ($(window).height() - loginPop.height()) / 4 + low_height)  // 레이어 가운데 정렬
	var posLeft = ($(window).scrollLeft() + 300 + ($(window).width() - loginPop.width()) / 2)
	wrapWindowByMask();
	loginPop.css('top', posTop);
	loginPop.css('left', '50%');
	loginPop.css('margin-left', -(loginPop.width() / 2));
	$("#" + id).show();
}

/* 메인 2016헤더 레이어 팝업 열기 */
function showLayerMain(id) {
    var low_height = 0;
    var popup_size = 0;

    if ($(window).width() >= 1600) {
        popup_size = 450;
    } else {
        popup_size = 250;
    }

    var left = (($(window).width() / 2) - popup_size);

    var loginPop = $("#" + id);
    var posTop = ($(window).scrollTop() - 350)  // 레이어 가운데 정렬
    var posLeft = left;

    wrapWindowByMask();
    loginPop.css('top', posTop);
    loginPop.css('left', posLeft);

    $("#" + id).show();
}

/* 신사고 도서 상세검색, 헤더, 도서상세. 씽라운지 */
function showLayerBookDetail(id) {
    var low_height = 0;

    if (id.substring(0, 9) == "interview") {
        low_height = 100;
    } else if (id == "ssing_save") {
        low_height = -250;
    }

    var loginPop = $("#" + id);
    var posTop = ($(window).scrollTop() + 100 + ($(window).height() - loginPop.height()) / 4 + low_height)  // 레이어 가운데 정렬
    //var posLeft = ($(window).scrollLeft() + ($(window).width() - loginPop.width()) / 10)
    wrapWindowByMask();
    $("#" + id).show();
}

var isMainPage = false;

/*신사고 도서 BookSearch*/
function fnSearch(page) {
    if (isMainPage) {
        fnSearchMain(page);
    } else {
        var target_div = $("input:radio[name=target_div]:checked").val();
        var grade = "";
        var subject_div = "";
        var brand_name = "";


        $("input:checkbox[name='grade']").each(function () {

            if (this.checked) {
                grade += this.value + ",";
            }
        });

        $("input:checkbox[name='subject_div']").each(function () {
            if (this.checked) {
                subject_div += this.value + ",";
            }
        });

        $("input:checkbox[name='brand_name']").each(function () {
            if (this.checked) {
                brand_name += this.value + ",";
            }
        });

        if (grade.length != 0)
            grade = grade.substring(0, grade.length - 1);
        if (subject_div.length != 0)
            subject_div = subject_div.substring(0, subject_div.length - 1);
        if (brand_name.length != 0)
            brand_name = brand_name.substring(0, brand_name.length - 1);


        if (target_div == undefined) {
            alert("구분을 선택하세요.");
        } else {
            $('.s_result_view').empty();
            call("/book/bookResult.aspx?target_div=" + target_div + "&grade=" + grade + "&subject_div=" + subject_div + "&brand_name=" + brand_name + "&page=" + page, "bookResult");
        }
    }
}

/*신사고 도서 BookSearch_main*/
function fnSearchMain(page) {
    isMainPage = true;
    var target_div = $("input:radio[name=target_div_main]:checked").val();
    var grade = "";
    var subject_div = "";
    var brand_name = "";


    $("input:checkbox[name='grade_main']").each(function () {

        if (this.checked) {
            grade += this.value + ",";
        }
    });

    $("input:checkbox[name='subject_div_main']").each(function () {
        if (this.checked) {
            subject_div += this.value + ",";
        }
    });

    $("input:checkbox[name='brand_name_main']").each(function () {
        if (this.checked) {
            brand_name += this.value + ",";
        }
    });

    if (grade.length != 0)
        grade = grade.substring(0, grade.length - 1);
    if (subject_div.length != 0)
        subject_div = subject_div.substring(0, subject_div.length - 1);
    if (brand_name.length != 0)
        brand_name = brand_name.substring(0, brand_name.length - 1);


    if (target_div == undefined) {
        alert("구분을 선택하세요.");
    } else {
        call("/book/bookResult.aspx?target_div=" + target_div + "&grade=" + grade + "&subject_div=" + subject_div + "&brand_name=" + brand_name + "&page=" + page, "bookResult2");
    }
}

function fnRecommend() {
	alert("이미 추천하신 글입니다.");
}


/* ex)
removeAttr("form1", "aa, ba, ca");
removeAttr("form1", "aa, ba, ca", "optino");
setAttr("form1", "aa, ba, ca", "required", "Y");
*/

function file_down(div, bull, user_id, ssing, ssing_menu_idx) {
    file_down(div, bull, user_id, ssing, ssing_menu_idx, "");
}

function file_down(div, bull, user_id, ssing,ssing_menu_idx, return_url) {
	if (isLogin) {
		if (div == "study_note") {
			if (user_id == "B") {
				location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing;
			}
			else {
				location.href = "http://sinsago.co.kr/up_files/study_note/개념정리노트.pdf";
			}
		}
		else if (div == "su_neung") {
			if (confirm("씽이 차감됩니다.\n다운로드하시겠습니까?")) {
				location.href = "/common/bulletinDown.aspx?z=" + bull + "&price=" + ssing;
				if (bull = 1) {
					//call("/SSG_COMMON/DAO/ShSsingDao.aspx?user_id=" + user_id + "&ssing_point=" + ssing + "&ssing_menu_idx=1", "");
					location.href = "http://sinsago.co.kr/up_files/bulletin/lastexam/special/2013수능전과목.zip";
				}
				else if (bull = 2) {
					location.href = "http://sinsago.co.kr/up_files/bulletin/lastexam/special/2011-2013언어영역.zip";
				}
				else if (bull = 3) {
					location.href = "http://sinsago.co.kr/up_files/bulletin/lastexam/special/2011-2013외국어영역.zip";
				}
				else if (bull = 4) {
					location.href = "http://sinsago.co.kr/up_files/bulletin/lastexam/special/2011-2013수리영역.zip";
				}
				else {
					alert("잘못된 접근입니다.");
				}
			}
		}
		else if (div == "textbook") {
			location.href = "http://textbook.sinsago.co.kr/bbs/bbsDownload.aspx?bbs_seq=" + bull;
		}

		else if (div == "book_pds") {
			call("/study/book_pds_down_cnt_update.aspx?bulletin_idx=" + bull, "");
			location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing;
		}
		else if (div == "study_step_board") {
			location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing;

        }
        else if (div == "su_neung_question") {
            if (confirm("해당 자료는 무료입니다. 다운하시겠습니까?")) {
                location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&type=question";
            }

        }
        else {       
		    if (ssing != '') {
		        if (ssing == 0) {
		            if (confirm("해당 자료는 무료입니다. 다운하시겠습니까?")) {
		                //location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx="+ ssing_menu_idx;
		                location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx=" + ssing_menu_idx + "&downUrl=" + return_url;
		            }
		        }
		        else {
		            if (confirm("해당 자료를 다운받으면 " + ssing + "씽이 차감됩니다. 다운하시겠습니까?\r\n(이미 다운로드 받은 자료일 경우, 별도 씽 차감 없이 무료 이용 가능)")) {
		                //location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx=" + ssing_menu_idx;
		                location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx=" + ssing_menu_idx + "&downUrl=" + return_url;
		            }
		        }
		    } 
            else {
		        //location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx=" + ssing_menu_idx;
                location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx=" + ssing_menu_idx + "&downUrl=" + return_url;
		    }
		}
	}
	else {
		showLayer('login_pop');
	}
}

function file_downNoLogin(div, bull, user_id, ssing, ssing_menu_idx) {
	if (div == "study_note") {
		if (user_id == "B") {
			location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing;
		}
		else {
			location.href = "http://sinsago.co.kr/up_files/study_note/개념정리노트.pdf";
		}
	}
	else if (div == "su_neung") {
		if (confirm("씽이 차감됩니다.\n다운로드하시겠습니까?")) {
			location.href = "/common/bulletinDown.aspx?z=" + bull + "&price=" + ssing;
			if (bull = 1) {
				//call("/SSG_COMMON/DAO/ShSsingDao.aspx?user_id=" + user_id + "&ssing_point=" + ssing + "&ssing_menu_idx=1", "");
				location.href = "http://sinsago.co.kr/up_files/bulletin/lastexam/special/2013수능전과목.zip";
			}
			else if (bull = 2) {
				location.href = "http://sinsago.co.kr/up_files/bulletin/lastexam/special/2011-2013언어영역.zip";
			}
			else if (bull = 3) {
				location.href = "http://sinsago.co.kr/up_files/bulletin/lastexam/special/2011-2013외국어영역.zip";
			}
			else if (bull = 4) {
				location.href = "http://sinsago.co.kr/up_files/bulletin/lastexam/special/2011-2013수리영역.zip";
			}
			else {
				alert("잘못된 접근입니다.");
			}
		}
	}
	else if (div == "textbook") {
		location.href = "http://textbook.sinsago.co.kr/bbs/bbsDownload.aspx?bbs_seq=" + bull;
	}

	else if (div == "book_pds") {
		call("/study/book_pds_down_cnt_update.aspx?bulletin_idx=" + bull, "");
		location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing;
	}
	else if (div == "study_step_board") {
		location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing;
	}
	else {
		if (ssing != '') {
			if (ssing == 0) {
				if (confirm("해당 자료는 무료입니다. 다운하시겠습니까?")) {
					location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx=" + ssing_menu_idx;
				}
			}
			else {
				if (confirm("해당 자료를 다운받으면 " + ssing + "씽이 차감됩니다. 다운하시겠습니까?")) {
					location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx=" + ssing_menu_idx;
				}
			}
		} else {
			location.href = "/common/bulletinDown.aspx?bulletin_idx=" + bull + "&price=" + ssing + "&ssing_menu_idx=" + ssing_menu_idx;
		}
	}
}

function bottom_send() {
	var findForm = document.forms['find_form'];
	if ($("#p_keyword").val().length == 0 || $("#p_keyword").val() == null) {
		alert("검색어를 입력해주세요.");
	}
	else {
		findForm.submit();
	}
}

/* 신사고 학습자료전 지난 수상작 리스트박스 이동*/
function before_gallery(val) {
	if (val == 1) {
		location.href = "gallery_1.aspx";
	}
	else if (val == "" || val == null) {
		return;
	}
	else {
		location.href = "gallery_10.aspx?cate_idx1=" + val;
	}
}
/* 신사고 학습자료전 상단 10 , 9 , 8 회 버튼 */
function select(num) {
	$("#tab3").removeClass("on");

	if (num == 10) {
		$("#ten").attr("class", "on");
		$("#nine").attr("class", "khTab02");
		$("#eight").attr("class", "khTab03");
		location.href = "gallery_10.aspx?cate_idx1=" + num;
	}
	else if (num == 9) {
		$("#ten").attr("class", "khTab02");
		$("#nine").attr("class", "on");
		$("#eight").attr("class", "khTab03");
		location.href = "gallery_10.aspx?cate_idx1=" + num;
	}
	else if (num == 8) {
		$("#ten").attr("class", "khTab02");
		$("#nine").attr("class", "on");
		$("#eight").attr("class", "khTab03");
		location.href = "gallery_10.aspx?cate_idx1=" + num;
	}
	else {
		alert("다시 선택해주세요.");
	}
}
/* 일단 주석 
function let_detail(medal, bulletin, cate_idx1) {
	var f = document.forms['detail_form'];
	alert(cate_idx1);
	//location.href = "gallery_detail.aspx?cate_idx1=" + cate_idx + "&medal=" + medal + "&bulletin_idx=" + bulletin;
}
*/

function note() {
	location.href = "http://sinsago.co.kr/up_files/study_note/개념정리노트.pdf";
}

/* 마이신사고 버튼 */
function go_mysinsago() {
	var returnURL = "/myPage/mySinsagoBook.aspx";
	if (isLogin) {
		location.href = "/myPage/mySinsagoBook.aspx";
	}
	else {
		showLayer('login_pop');
	}
}

// 글자제한 함수
function ismaxlength(obj) {
	var mlength = obj.getAttribute ? parseInt(obj.getAttribute("maxlength")) : ""
	if (obj.getAttribute && obj.value.length > mlength)
		obj.value = obj.value.substring(0, mlength)
}
function fnCheck(val, content) {
	if (isLogin) {
		if (content.length > val) {
			alert(val + "자 이내로 입력하세요");
			$("#comment_input").val($("#comment_input").val().substr(0, val));
		}
	}
}
/* 로그인체크 레이어 */
function checkLogin() {
	if (isLogin) {return true; }
	else {
		eventClass.login();
	}
}

/* 로그인체크 레이어 */
function checkLoginFront() {
	if (isLogin) { return true; }
	else {
		alert("로그인을 해주세요.");
		showLayer('login_pop');
		return false;
	}
}

/* 학습자료전 AJAX */
function let_detail(medal, bulletin,cate_idx1) {
	var f = document.forms['detail_form'];
	if (cate_idx1 == "15") {
		location.href = "gallery11_detail.aspx?medal=" + medal + "&bulletin_idx=" + bulletin + "&cate_idx1=" + cate_idx1;
	} else {
		location.href = "gallery_detail.aspx?medal=" + medal + "&bulletin_idx=" + bulletin + "&cate_idx1="+ cate_idx1;
	}

}
function submit_to(div) {
	$("#serach_form").submit();
}
function gallery_search_check() {
	if ($("#book_select").val() == "x") {
		alert("해당자료는 존재하지 않습니다.");
	}
	else {
		var f = document.forms['serach_form'];
		f.submit();
	}
}

/* 도서 롤링 */
var book = {
	tabDiv: "recomm",
	targetDiv: "h",
	index: 1,
	bookSize: 4,

	// 도서 이동
	move: function (type) {
		var selector = "#recomm"
		var bookLength = $(selector).find("span").length;
		var html1 = "";

		if (type == "next") {
			html1 = $(selector).find(".book_rolling:first").html();
			$(selector).find(".book_rolling:first").remove();
			$(selector).append("<span class='book_rolling'>" + html1 + "</span>");
		} else {
			html1 = $(selector).find(".book_rolling:last").html();
			$(selector).find(".book_rolling:last").remove();
			$(selector).prepend("<span class='book_rolling'>" + html1 + "</span>");
		}
	},

	start: function () {
		bookAnimate = window.setInterval("book.move('next')", 4000);
	},

	stop: function () {
		window.clearInterval(bookAnimate);
	}
}

function fnReviewCheck() {
	if ($("#review_title").val() == "") {
		alert("제목을 입력하세요");
		return false;
	} else if ($("#review_content").val() == "") {
		alert("내용을 입력하세요");
		return false;
	} else {
		return true;
	}
}

/* 나를 바꾸는 힘 List 출력 nabahimList.aspx */
$(function () {
	var $tabMenu = $("#tabMenu3, .mainStore")
	$tabMenu.find(".tab3 a").click(function () {
		var $item = $(this).parent().index();
		if ($item == 0) {
			call("ajaxNabahimList.aspx?cate_idx=4", "nbhCon");
		} else if ($item == 1) {
			call("ajaxNabahimList.aspx?cate_idx=0", "nbhCon");
		} else if ($item == 2) {
			call("ajaxNabahimList.aspx?cate_idx=9", "nbhCon");
		} else if ($item == 3) {
			call("ajaxNabahimList.aspx?cate_idx=10", "nbhCon");
		} else {
			call("ajaxNabahimList.aspx?cate_idx=11", "nbhCon");
		}
	});
});


function fnNabaHimSetting(idx) {
    var $tabMenu = $(".nbhTab, .mainStore")
    var $reset = $tabMenu.find(".tab3 a.on").parent().index();
    $tabMenu.find(".tab3 span").hide();
    $tabMenu.find(".tab3 a").each(function () {
        $(".tab_" + idx).removeClass("on");
        $(".tab_" + idx).removeClass("prev");
        $(".tab_" + idx).removeClass("next");
        imgReplace($(".tab_" + idx).find(">img"), "off");
    });
    var $item = $(".tab_" + idx).parent().index();
    $tabMenu.find(".detail > li").eq($item).show();
    $(".tab_" + idx).parent().find("span").show();

    imgReplace($(".tab_" + idx).find(">img"), "on");
    $(".tab_" + idx).addClass("on");
    $(".tab3 li").eq($item - 1).find(">a").addClass("prev");
    $(".tab3 li").eq($item + 1).find(">a").addClass("next");

    return false;
}

function fnLoginAlert() {
	alert("로그인 후 이용가능합니다.");
	$("#user_id").val("").focus();
}

/* 
* 날짜 계산 함수.
* iYear : 연도 계산, 음수를 넣을 경우 마이너스 계산.
* iDay : 월 계산, 음수를 넣을 경우 마이너스 계산.
* iDay : 일 계산, 음수를 넣을 경우 마이너스 계산.
* seperator : 연도를 표시할 구분자
*/
function getCalculatedDate(iYear, iMonth, iDay, seperator) {
	//현재 날짜 객체를 얻어옴.
	var gdCurDate = new Date();

	//현재 날짜에 날짜 게산.
	gdCurDate.setYear(gdCurDate.getFullYear() + iYear);
	gdCurDate.setMonth(gdCurDate.getMonth() + iMonth);
	gdCurDate.setDate(gdCurDate.getDate() + iDay);

	//실제 사용할 연, 월, 일 변수 받기.
	var giYear = gdCurDate.getFullYear();
	var giMonth = gdCurDate.getMonth() + 1;
	var giDay = gdCurDate.getDate();


	//월, 일의 자릿수를 2자리로 맞춘다.
	giMonth = "0" + giMonth;
	giMonth = giMonth.substring(giMonth.length - 2, giMonth.length);
	giDay = "0" + giDay;
	giDay = giDay.substring(giDay.length - 2, giDay.length);

	//display 형태 맞추기.
	return giYear + seperator + giMonth + seperator + giDay;
}


/* 타임캡슐 */

//기간조회
$(function () {
	var $inquiry = $(".date_inquiry a");

	$inquiry.click(function () {
		$("#send_date").val(getCalculatedDate(0, parseInt($(this).attr("data-value")), 0, "-"));
	});
});


/*

//씽라운지 슬라이딩
$(function () {
	$("#loungeSlide").find("ul > li").show();
	var view = $("#loungeSlide"); 			//뷰어
	var ctl = view.find(".pagination3"); 		//컨트롤러
	var idx = 0; 						//인덱스
	var max = ctl.find(".slidenav > a").size(); //상품갯수
	var speed = 500; 					//롤링 속도
	var width = 282; 					//li의 가로길이
	var tId; 							//롤링 타이머
	var rollSec = 5000; 					//롤링 시간
	var btnS = $("a.btn_slide_prev2 , a.btn_slide_next2");	

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
				case 'btn_slide_prev2':
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
							idx = mNum;
						});
						view.find(".slidenav > a").each(function () {
							imgReplace($(this).find(">img"), "off");
						});
						imgReplace(view.find(".slidenav > a:eq(" + mNum + ") > img"), "on");
					}
					break;
				case 'btn_slide_next2':
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

	//롤링시작
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
	//롤링정지
	function rollStop() {
		clearInterval(tId);
	}

});

*/

function ShowDeliveryInfo(pInvoiceNo) {
	window.open("http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1=" + pInvoiceNo, "ShowDeliveryInfo", 'width=500,height=700,scrollbars=yes');
}

// 택배사 코드에 따라 배송 조회 링크 분기
function showDeliveryInfo(invoiceNo, deliveryCustCd) {

	// 우체국 기존 로직
	if (deliveryCustCd == "10") {
		window.open("http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1=" + invoiceNo, "ShowDeliveryInfo", 'width=500,height=700,scrollbars=yes');
	}
	// CJ
	else if (deliveryCustCd == "20") {
		window.open("http://nexs.cjgls.com/web/info.jsp?slipno=" + invoiceNo, "ShowDeliveryInfo", 'width=600,height=700,scrollbars=yes');
	}
	// 롯데
	else if (deliveryCustCd == "30") {
		window.open(" https://www.lotteglogis.com/open/tracking?invno=" + invoiceNo, "ShowDeliveryInfo", 'width=600,height=700,scrollbars=yes');
	} else {
		window.open("http://service.epost.go.kr/trace.RetrieveRegiPrclDeliv.postal?sid1=" + invoiceNo, "ShowDeliveryInfo", 'width=500,height=700,scrollbars=yes');
	}
}

function fnViewImgOverflowResize() {
    $(".grayTable tr td img").each(function (i) {
        if ($(this).width() >= 571) {
            $(this).css("width", "570px");
        }
    });
}



// 13-09-25 SNS 공유
var snsClass = {
    share: function (sns, name) {
        var pageURL = document.location.href;
        var shortURL = "";

        if (sns == "facebook") {
            var url = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(pageURL) + "&t=" + encodeURIComponent(name);
			var a = window.open(url, "facebook", "width=600px,height=300px");
			if (a) {
				a.focus();
			}
            

        } else {
            $.post("/common/shortURL.aspx", { url: pageURL, title: name }, function (data) {
                if (data != "ERROR") {

                    shortURL = "http://sinsago.kr/" + data;
                  
                    var href = "https://twitter.com/intent/tweet?original_referer=&text=" + encodeURIComponent(name) + "&url=" + encodeURIComponent(shortURL);
                    var a = window.open(href, 'twitter', '');
                    if (a) {
                        a.focus();
                    }                   

                } else {
                    alert("트위터 공유하기 실패하였습니다.");
                    return;
                }
            });
        }
    },
    copyURL: function () {
        var url = document.location.href;
        if (navigator.appName.indexOf("Microsoft") > -1) {
            alert("주소가 복사되었습니다.");
            window.clipboardData.setData('Text', url);
        }
        else {
            temp = prompt("Ctrl+C를 눌러 클립보드로 복사하세요", url);
        }
    },
    share2: function (sns, name) {
        var pageURL = document.location.href;
        var shortURL = "";

        if (sns == "facebook") {
            var url = "http://www.facebook.com/sharer.php?u=" + encodeURIComponent(pageURL) + "&t=" + encodeURIComponent(name);
			var a = window.open(url, "facebook", "width=600px,height=300px");
			if (a) {
				a.focus();
			}
        } else {
            $.post("/common/shortURL.aspx", { url: pageURL, title: name }, function (data) {
                if (data != "ERROR") {

                    shortURL = "http://sinsago.kr/" + data;

                    var href = "https://twitter.com/intent/tweet?original_referer=&text=" + encodeURIComponent(name) + "&url=" + encodeURIComponent(shortURL);
                    var a = window.open(href, 'twitter', 'width=500px, height=300px, top=200px');
                    if (a) {
                        a.focus();
                    }

                } else {
                    alert("트위터 공유하기 실패하였습니다.");
                    return;
                }
            });
        }
    }
}






	/* 숫자만 입력 가능하게 한 펑션 */
      function checkNo(obj) {
      	e = window.event; //윈도우의 event 잡기
      	//입력 허용 키
      	if ((e.keyCode >= 48 && e.keyCode <= 57) ||   //숫자열 0 ~ 9 : 48 ~ 57
		(e.keyCode >= 96 && e.keyCode <= 105) ||   //키패드 0 ~ 9 : 96 ~ 105
		e.keyCode == 8 ||    //BackSpace
		e.keyCode == 46 ||    //Delete
      	//e.keyCode == 110 ||    //소수점(.) : 문자키배열
      	//e.keyCode == 190 ||    //소수점(.) : 키패드
		e.keyCode == 37 ||    //좌 화살표
		e.keyCode == 39 ||    //우 화살표
		e.keyCode == 35 ||    //End 키
		e.keyCode == 36 ||    //Home 키
		e.keyCode == 9       //Tab 키
		) {
      		if (e.keyCode == 48 || e.keyCode == 96) { //0을 눌렀을경우     
      			return; //-->입력시킨다.
      		}
      		else //0이 아닌숫자
      			return; //-->입력시킨다.
      	}
      	else //숫자가 아니면 넣을수 없다.
      	{
      		alert('숫자만 입력 가능합니다.');
      		e.returnValue = false;
      	}
}


// 도서 상세검색 레이어 초기화
function fnFormReset() {
    $('input:checkbox:not([id=xxxx])').attr('checked', false);
    $('input:radio:not([id=xxxx])').attr('checked', false);    
    $('.s_result_view').empty();
    $('.s_result_view').html("");
    $('.s_result_view').html("<img src='../../images/popup/book_result_empty.gif' style='margin-top:136px;'/>");
    $('#bookSearchBookCount').html("0");

    $('input:checkbox:not([id=xxxx])').each(function () {
        $(this).closest('span').find("label").removeClass("opt_chk");
    });
    $('input:checkbox:not([id=xxxx])').each(function () {
        $(this).closest('li').find("label").removeClass("opt_chk");
    });
    $('input:radio:not([id=xxxx])').each(function () {
        $(this).closest('span').find("label").removeClass("opt_chk");
    });
}