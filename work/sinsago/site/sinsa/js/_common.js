var isIE = (navigator.appName.indexOf("Microsoft") != -1) ? 1 : 0;
var isIE6 = (navigator.appVersion.indexOf("MSIE 6") != -1) ? 1 : 0;
var isIE7 = (navigator.appVersion.indexOf("MSIE 7") != -1) ? 1 : 0;
var isIE8 = (navigator.appVersion.indexOf("MSIE 8") != -1) ? 1 : 0;

function SetCookie(name, value, expires, path, domain, secure) { //expires => 초
	var date = new Date();
	date.setSeconds(date.getSeconds() + expires);

	document.cookie= name + "=" + escape(value) + "; path=" + ((path) ? path : "/") +
	((expires) ? "; expires=" + date.toGMTString() : "") +
	((domain) ? "; domain=" + domain : "") +
	((secure) ? "; secure" : "");
}

	function Popup_setCookie(name, value, expiredays) {
		   var todayDate = new Date();
		   todayDate.setDate( todayDate.getDate() + expiredays );
		   document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + todayDate.toGMTString() + ";"
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

function DelCookie(name, path, domain)
{
    if (GetCookie(name)) {
        document.cookie = name + "=" + 
            ((path) ? "; path=" + path : "") +
            ((domain) ? "; domain=" + domain : "") +
            "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
}

function OpenDialog(nLink, nWin, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;
	var qResult = window.showModalDialog( url, nWin, "dialogwidth:"+nWidth+"px;dialogheight:"+nHeight+"px;toolbar:no;location:no;help:no;directories:no;status:no;menubar:no;scroll:no;resizable:no");
}

function OpenWindow(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,status=yes,scrollbars=no,resizable=no");
	//return qResult;
}

function OpenWindows(nLink, nTarget, nWidth, nHeight, xPos, yPos) {
	if(typeof nLink == "object") url = nLink.href;
	else url = nLink;

	adjX = xPos ? xPos : (window.screen.width/2 - nWidth/2);
	adjY = yPos ? yPos : (window.screen.height/2 - nHeight/2 - 50);
	var qResult = window.open( url, nTarget, "width="+nWidth+", height="+nHeight+",left="+adjX+",top="+adjY+",toolbar=no,status=yes,scrollbars=yes,resizable=no");
	//return qResult;
}

function ConfirmAction(obj) {
	if(confirm(obj.name + "하시겠습니까?")) {
		location.href = obj.href;
	}
}

function BtnConfirmGo(obj, url) {
	var msg;
	if(typeof obj == "object") msg = obj.value;
	else msg = obj;
	if(confirm(msg + "하시겠습니까?")) {
		location.href = url;
	}
}

function Go(url) {
	location.href = url;
}

function IfGo(msg, url, url2) {
	if(confirm(msg)) Go(url);
	else {
		if(!url2) return false;
		else Go(url2);
	}
	return true;
}

function ConfirmCheckGo(f, n, url, msg) {
    var idx = GetFormValue(f, n);
    if(idx == "") {
        alert("선택 항목이 없습니다.");
    } else {
        if(confirm(msg)) {
            location.href = url + idx;
        }
    }
}

function ResizeImage(el, w, h) {
	var img = new Image();
	img.src = el.src;

	if(el.width > img.width) el.width = img.width;
	if(el.height > img.height) el.height = img.height;

	var sheight = el.width * img.height / img.width;
	var swidth = el.height * img.width / img.height;

	if(swidth < el.width) el.width = swidth;
	if(sheight < el.height) el.height = sheight;
}

function ShowLayer(n) {
	var el = document.getElementById(n);
	if(el) {
		el.style.display = 'block';
	}
}

function HideLayer(n) {
	var el = document.getElementById(n);
	if(el) {
		el.style.display = 'none';
	}
}

function AutoLayer(n) {
	var el = document.getElementById(n);
	if(!el) return;
	if(el.style.display == 'none') {
		el.style.display = 'block'
	} else {
		el.style.display = 'none'
	}
}

function validate(el) {
	return true;
}

function SetElementValue(element, v, sep) {
	if(!element) return false;
	switch(element.type) {
		case 'text':
		case 'password':
		case 'hidden':
			element.value = v;
			break;
		case 'textarea':
			element.text = v;
			break;
		case 'checkbox':
			if(element.value == v) element.checked = true;
			break;
		case 'select-one':
			for(var i=0; i<element.options.length; i++) if(element.options[i].value == v) element.options[i].selected = true;
			break;
		default:
			if(sep) {
				var val = v.split(sep);
				for(var i=0; i<element.length; i++) {
					for(var j=0; j<val.length; j++) {
						if(element[i].value == val[j])  element[i].checked = true;
					}
				}
			}
			else {
				for(var i=0; i<element.length; i++) {
					if(element[i].value == v) element[i].checked = true;			
				}
			}
			break;
	}
}
function SetFormValue(f, n, v, sep) {
	var f = document.forms[f];
	if(!f || !f[n]) return false;
	switch(f[n].type) {
		case 'text':
		case 'password':
		case 'hidden':
			f[n].value = v;
			break;
		case 'textarea':
			f[n].text = v;
			break;
		case 'checkbox':
			if(f[n].value == v) f[n].checked = true;
			break;
		case 'select-one':
			for(var i=0; i<f[n].options.length; i++) if(f[n].options[i].value == v) f[n].options[i].selected = true;
			break;
		default:
			if(sep) {
				var val = v.split(sep);
				for(var i=0; i<f[n].length; i++) {
					for(var j=0; j<val.length; j++) {
						if(f[n][i].value == val[j])  f[n][i].checked = true;
					}
				}
			}
			else {
				for(var i=0; i<f[n].length; i++) if(f[n][i].value == v) f[n][i].checked = true;			
			}
			break;
	}
}

function GetFormValue(f, n) {
	var f = document.forms[f];
	if(!f || !f[n]) return false;
	switch(f[n].type) {
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
			if(f[n].checked == true) return f[n].value;
			break;
		case 'select-one':
			for(var i=0; i<f[n].options.length; i++) {
				if(f[n].options[i].selected == true) {
					return f[n].options[i].value;
				}
			}
			break;
		default:
			var arr = new Array();
			var j = 0;
			for(var i=0; i<f[n].length; i++) {
				if(f[n][i].checked == true) {
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

function AutoCheck(f, n) {
	var f = document.forms[f];
	if(!f || !f[n]) return;
	if(typeof(f[n]) == "object") {
		if(f[n].length > 0) {
			for(var i=0; i<f[n].length; i++) {
				f[n][i].checked = AUTO_CHECK_STATUS;
			}
		} else {
			f[n].checked = AUTO_CHECK_STATUS;
		}
		if(AUTO_CHECK_STATUS == true) {
			AUTO_CHECK_STATUS = false;
		} else {
			AUTO_CHECK_STATUS = true;
		}
	}
}

function CheckGo(f, n, url, msg, confMsg) {
	var idx = GetFormValue(f, n);
	if(idx == "") {
		alert(msg);
	} else {
		if(confMsg && !confirm(confMsg)) return;
		if(url.indexOf("javascript:") != -1) {
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
	if(el = parent.document.getElementById(n)) {
		
		//el.height = 0;
		if(isIE) h = document.body.scrollHeight;
		else h = document.documentElement.scrollHeight;

		if(isIE8) h=h+30;
		if(isIE7) h=h+30;

		if(h > 10) el.height = h;
		else el.height = 0;
	}

}
function parentResizeIframe(n) {
	var h;
	if(el = parent.parent.document.getElementById(n)) {
		//el.height = 0;
		if(isIE) h = parent.document.body.scrollHeight;
		else h = parent.document.documentElement.scrollHeight;

		if(isIE8) h=h+30;

		if(h > 10) el.height = h;
		else el.height = 0;
	}
}

function GoNext(fm,pos,size) {

	if(fm.elements[0].name == "PHPSESSID") {
		pos++;
	}

	next_pos = pos + 1;
	value = fm.elements[pos].value;
	len = value.length;
	is_num = Number(value);

	if(!is_num) {
		if((len > 0) && (value != '0') && (value != '00') && (value != '000')) {
			alert('숫자를 넣어주세요');
			fm.elements[pos].select();
			fm.elements[pos].focus();
			return false;
		}
	}
	
	if(len == size) {
		fm.elements[next_pos].focus();
		return true;
	}
}

function MoveNext(el, next, size) {
	var len = el.value.length;
	if(len == size) {
		next.focus();
		return true;
	}
}

function IsNumeric(sText)
{
   var ValidChars = "0123456789.";
   var IsNumber=true;
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
	if(!IsNumeric(el.value)) {
		alert("숫자만 입력 가능합니다.");
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
	if(!width) width = 400;
	if(max > 0) {
		percent = Math.floor((cnt / max) * 100);
	} else {
		percent = 0;
	}
	var other = 100 - percent;
	document.write("<table align='left' width='" + width + "' cellpadding=0 cellspacing=0 height=10><tr><td width='"+percent+"%' background='../html/images/stat/s_bg_"+color+".gif'></td><td width='"+ other +"%'></td></tr></table>");
}

/*
function initTinyMCE(theme, mode, els, toolbaroff) {
	if(!theme) theme = "advanced";
	if(!mode) mode = "textareas";
	if(!els) els = "content";

	tinyMCE.init({
		// General options
		mode : mode,
		elements : els,
		theme : theme,
		language : "ko",
		skin : "o2k7",
		skin_variant : "silver",
		theme_advanced_fonts : "굴림=굴림;궁서=궁서;돋움=돋움;바탕=바탕;Arial=Arial; Comic Sans MS='Comic Sans MS';Courier New='Courier New';Tahoma=Tahoma;Verdana=Verdana",
		plugins : "pagebreak,style,layer,table,save,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,fullscreen,noneditable,visualchars,nonbreaking,xhtmlxtras,template,inlinepopups,autosave",

		// Theme options
	//	theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,sub,sup,|,forecolor,backcolor,|,fontselect,fontsizeselect",
	//	theme_advanced_buttons2 : "undo,redo,|,charmap,emotions,media,image,|,link,unlink,cleanup,|,tablecontrols,|,insertlayer,|,fullscreen,code,preview",
//		theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,bullist,numlist,|,forecolor,backcolor,|,fontselect,fontsizeselect",
//		theme_advanced_buttons2 : "undo,redo,|,charmap,emotions,media,image,|,link,unlink,|,tablecontrols,|,code,preview",
		theme_advanced_buttons1 : toolbaroff ? "" : "fontselect,fontsizeselect,|,bold,italic,underline,strikethrough,|,forecolor,backcolor,|,justifyleft,justifycenter,justifyright,justifyfull,|,charmap,emotions,media,image",
		theme_advanced_buttons2 : "",
		theme_advanced_buttons3 : "",
		theme_advanced_toolbar_location : toolbaroff ? false : "top",
		theme_advanced_toolbar_align : "left",
		theme_advanced_statusbar : false,
		theme_advanced_resizing : false,
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
    if(!theme) theme = "advanced";
    if(!mode) mode = "textareas";
    if(!els) els = "content";

    tinyMCE.init({
        mode : mode,
        theme : theme,
        elements : els,
        plugins : "table,emotions,media,layer,preview",
        theme_advanced_fonts : "굴림=굴림,arial;돋움=돋움,arial;바탕=바탕,arial;궁서=궁서,arial;Arial=arial,helvetica,sans-serif;Courier New=courier new,courier;Tahoma=tahoma,arial,helvetica,sans-serif;Verdana=verdana,geneva",
      //  theme_advanced_buttons1 : "fontselect,fontsizeselect,separator,bold,italic,underline,strikethrough,separator,forecolor,backcolor,separator,justifyleft,justifycenter,justifyright",
     //   theme_advanced_buttons2 : "undo,redo,separator,bullist,numlist,outdent,indent,separator,link,unlink,anchor,image,emotions,media,table,insertlayer,separator,hr,removeformat,separator,preview,code",
    //    theme_advanced_buttons3 : "",
		theme_advanced_buttons1 : toolbaroff ? "" : "fontselect,fontsizeselect,|,bold,italic,underline,strikethrough,|,forecolor,backcolor,|,justifyleft,justifycenter,justifyright,justifyfull,|,charmap,emotions,media,image",
		theme_advanced_buttons2 : "",
		theme_advanced_buttons3 : "",
        theme_advanced_toolbar_location : toolbaroff ? false : "top",
        theme_advanced_toolbar_align : "left",
        //theme_advanced_statusbar_location : "bottom",
        //content_css : "../../html/css/style.css",
        //file_browser_callback : "fileBrowserCallBack",
		theme_advanced_statusbar : false,
        theme_advanced_resizing : false,
        theme_advanced_resize_horizontal : false,
		theme_advanced_path : false,
        relative_urls : false,
        remove_script_host : false,
        convert_urls : false,
        extended_valid_elements : "embed[quality|type|pluginspage|width|height|src|align],object[classid|codebase|width|height|align],param[name|value]",
        verify_html : false,
        button_tile_map : true,
        entity_encoding : "raw",
        language : "kr"
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
			content = '<img src='+ url +' onclick="'+click_photo+'" style="cursor:pointer;width:400px;">';
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
	tinyMCE.execCommand('mceFocus',false, !name ? 'content' : name); 
	tinyMCE.execCommand('mceInsertContent',false, content);
}

function getEmbedTag(url, cls, cb, mt, d) {
	var h = '', n;
	h = '<embed type="' + mt + '" src="'+ url +'" alt="multiupload" wmode="transparent"></embed>';
	return h;
}

function call(url, id, callback) {

	if(!id) id = "AJAX_DIV";
	var client = false;

	if(window.ActiveXObject) {
		try {
			client = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
				client = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {}
		}
	} else {
		client = new XMLHttpRequest();
	}
	if(client) {
		client.onreadystatechange = function() {
			if(client.readyState == 4) {

				//출력레이어가 없을 경우 생성
				var el = document.getElementById(id);
				if(!el) {
					el = document.createElement("div");
					el.style.display = 'none';
					document.body.appendChild(el);
				}
				
				//IE의 경우 버그가 존재함. 그래서 &nbsp를 추가
				if(isIE && client.responseText.indexOf("<script") == 0) {
					el.innerHTML = "<span style='display:none;'>&nbsp;</span>" + client.responseText;
				} else {
					el.innerHTML = client.responseText;
				}

				if(callback) {
					try {
						eval(callback + "(client.responseText)");
					} catch(e) { alert(callback + " 함수가 없습니다."); }
				}

				//자바스크립트 실행 (defer는 IE 에서 실행되어 안씀)
				var scripts = el.getElementsByTagName("script");
				for(var i=0; i<scripts.length; i++) {
					eval(scripts[i].innerHTML.replace("<!--", "").replace("-->", ""));
				}
			}
		}
		var f;
		if(f = document.forms[url]) {
			var parameters = "";
			for(var i=0; i<f.elements.length; i++) {
				if(f.elements[i].name == "") continue; 
				if(f.elements[i].type == "radio" || f.elements[i].type == "checkbox") {
					if(f.elements[i].checked == false) continue;
				}
				parameters += f.elements[i].name + "=" + encodeURI( f.elements[i].value ) + "&";
			}
			if(!f.action) f.action = location.href;
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
    document.write('<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" width="'+width+'" height="'+height+'" id="'+id+'" align="middle"><param name="allowScriptAccess" value="always" /><param name="movie" value="'+filename+'" /><param name="menu" value="false" /><param name="quality" value="high" /><param name="bgcolor" value="#ffffff" /><param name="wmode" value="'+trans+'" />' + (params ? '<param name="FlashVars" value="' + params + '" />' : "") + '<embed src="'+filename + (params ? '?' + params : "") +'" menu="false" quality="high" bgcolor="#ffffff" wmode="' + trans + '" width="'+width+'" height="'+height+'" name="'+id+'" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" /></object>');
}

function FlashChart(id, width, height, xmlurl, ftype) {
	var filename = "FlashChart.swf";
	if(ftype == "mini") filename = "FlashChartMini.swf";
	playFlash("/Web/lib/js/" + filename, width, height, id, "transparent", "xmlurl=" + escape(xmlurl));
}

function ToggleLayer(objName, tarName, addX, addY) {
	var obj = document.getElementById(objName);
	if(!obj) {
		alert(objName + ' 레이어가 존재하지 않습니다.');
		return;
	}

	var tar = tarName ? document.getElementById(tarName) : null;
	if(tar) {
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
	if(obj.style.display == "none") {
		obj.style.display = "";
	} else {
		obj.style.display = "none";
	}
}

function ImageError(el, url) {
	if(url && url.toUpperCase() == "TEXTMODE") {
		if(el) el.parentNode.innerHTML = "<span><table width='" + (el.width * 1) + "' height='" + (el.height * 1)+ "' cellpadding='0' cellspacing='0' style='border:1px solid #f2f2f2;'><tr><td style='font-family:arial;color:#d0d0d0'>No Image.</td></tr></table></span>";
	} else {
		var noimg = new Image();
		noimg.src = url ? url : "/_god/html/images/viewer/img_no_photo2.gif";
		noimg.onerror = function() {
			alert("[개발 Debug] common.js - function ImageError() 오류 : \n" + noimg.src + ' 파일이 존재 하지 않습니다.');
			return false;
		}
		if(el) el.src = noimg.src;
	}
}


//관리자 페이지 버튼 스타일을 일괄 지정
function ToggleButton() {
	var buttons = document.getElementsByTagName("INPUT");
	for(var i=0; i<buttons.length; i++) {
		if(buttons[i].type.toLowerCase() == "button" || buttons[i].type.toLowerCase() == "submit") {
			buttons[i].onmouseover = function() { this.style.backgroundPosition = "bottom"; }
			buttons[i].onmouseout = function() { this.style.backgroundPosition = "top"; }
		}
		if(buttons[i].type.toLowerCase() == "button" && buttons[i].className == "btn_simp") {
			buttons[i].onmouseover = function() { this.style.border = "1px solid black"; }
			buttons[i].onmouseout = function() { this.style.border = "1px solid #9EB4CA"; }
		}
	}
}

//관리자 페이지 리스트 테이블 마지막 경계선 제거 --> 타이틀테이블 꾸밈 넣기
function PatchListTableLine() {
	var tables = document.getElementsByTagName("TABLE");
	for(var i=0; i<tables.length; i++) {
		/*
		if(tables[i].className == "l_tb01") {
			var childNodes = tables[i].getElementsByTagName("TR")[0].getElementsByTagName("TD");
			childNodes[childNodes.length - 1].style.backgroundImage = "none";
		}
		*/
		if(tables[i].className == "c_tb01") {
			var caption = tables[i].getElementsByTagName("TR")[0].getElementsByTagName("TD")[0];
			caption.innerHTML = '<div style="float:left;width:6px;height:13px;background:silver"></div>&nbsp;&nbsp;' + caption.innerHTML;
		}
	}
}
//타이틀 네비게이션 폰트 설정
function setTitleStyle() {
	var title = document.getElementById("_ttl_").getElementsByTagName("div")[1];
	var tmp = title.innerHTML.split("&gt;");
	var str = "";
	for(var i=0; i<tmp.length; i++) {
		str += i == 0 ? tmp[i] : ' <span style="font-weight:normal;font-size:15px;"> > ' + tmp[i] + '</span>';
	}
	title.innerHTML = str;
}
function p(el, type) {
	var attributes = new Array(); var i = 0;
	for(e in el) {
		if(!type && !el[e]) continue;
		attributes[i] = e + "=" + el[e];
		i++;
	}
	if(document.body) {
		document.body.innerHTML = "<div style='position:absolute;top:10;left:10;overflow:auto;width:95%;height:95%;background:#f7f7f7;z-index:100'>" + attributes.join("<br>") + "</div>";
	} else {
		alert(attributes.join("\n"));
	}
}

function pngfilter(el) {

	if (/MSIE (5\.5|6\.0)/.test(navigator.userAgent)) {
		// 쓸데 없어 보이지만 중요함
		if(el.width != 0) {
			el.width = el.width;
			el.height = el.height;
		}

		var img = new Image();
		img.src = el.src;
		el.src = "../html/css/blank.gif";
		el.style.filter = 'progid:DXImageTransform.Microsoft.AlphaImageLoader(src="'+ img.src +'",sizingMethod="scale")';
	}
}

function iepngfix(element) {

	if (/MSIE (5\.5|6\.0)/.test(navigator.userAgent)) {
		if(element) var imgs = element.getElementsByTagName("IMG");
		else var imgs = document.getElementsByTagName("IMG");
		for(var i=0; i<imgs.length; i++) {
			if(imgs[i].src.substring(imgs[i].src.length - 4).toLowerCase() == ".png") {
				pngfilter(imgs[i]);
			}
		}
	}
}

function changeYear(element, d, num) {
	if(!element) return;
	if(!num) num = 10;
	var year = parseInt(element.value * 1);
	if(!year) year = !d ? new Date().getFullYear() : d;
	year = parseInt(year * 1);
	var pattern = /[^0-9]/;
	var add = "";
	var head = "";
	if(element.options.length > 0) {
		add = pattern.test(element.options[element.selectedIndex].text);
		head = element.options[0].value == "" ? element.options[0].text : "";
		}
	element.options.length = 0; var j = 0;
	if(head) {
		element.options[0] = new Option(head, "", false);
		j++;
	}
	for (var i=year-num; i<=year+num; i++, j++) {
		element.options[j] = new Option(i + (add ? "년" : ""), i, false);
		if (i == year) element.options[j].selected = true;
	}
}

Offset = function(element) {
	this.obj = element;
	this.left;
	this.top;
	this.height;
	this.width;
	this.centerLeft;
	this.getOffset();
}       
Offset.prototype.getOffset = function() {
	var obj = this.obj;
	var top = left = 0;
	if (obj.offsetParent) {
		do {
			top += obj.offsetTop;
			left +=
			obj.offsetLeft;
		} while(obj = obj.offsetParent);
	}
	this.left = left;
	this.top = top;
	this.width = this.obj.offsetWidth;
	this.height = this.obj.offsetHeight;
	this.centerLeft = this.left + Math.round(this.width/2);
}

function number_format( number, decimals, dec_point, thousands_sep ) {
	// +   original by: Jonas Raoni Soares Silva (http://www.jsfromhell.com)
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// *     example 1: number_format(1234.5678, 2, '.', '');
	// *     returns 1: 1234.57

	var i, j, kw, kd, km;

	// input sanitation & defaults
	if( isNaN(decimals = Math.abs(decimals)) ){
		decimals = 0;
	}
	if( dec_point == undefined ){
		dec_point = ".";
	}
	if( thousands_sep == undefined ){
		thousands_sep = ",";
	}

	i = parseInt(number = (+number || 0).toFixed(decimals)) + "";

	if( (j = i.length) > 3 ){
		j = j % 3;
	} else{
		j = 0;
	}

	km = (j ? i.substr(0, j) + thousands_sep : "");
	kw = i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands_sep);
	kd = (decimals ? dec_point + Math.abs(number - i).toFixed(decimals).slice(2) : "");

	return km + kw + kd;
}

function addslashes( str ) {
    return str.replace('/(["\'\])/g', "\\$1").replace('/\0/g', "\\0");
}

function strip_tags(input,allowed){allowed=(((allowed||"")+"").toLowerCase().match(/<[a-z][a-z0-9]*>/g)||[]).join('');var tags=/<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,commentsAndPhpTags=/<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;return input.replace(commentsAndPhpTags,'').replace(tags,function($0,$1){return allowed.indexOf('<'+$1.toLowerCase()+'>')>-1?$0:'';});}

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

function ListSort(element, ord) {
	if(element) {
		document.forms['form1']['ord'].value = element.getAttribute("id").replace("CL_", "") + " " + (ord.indexOf(" ASC") != -1 ? "DESC" : "ASC");
		document.forms['form1'].submit();
	} else {
		var arr = ord.split(" ");
		var element = document.getElementById("CL_" + arr[0])
		if(element && arr.length == 2) {
			var arrow = arr[1] == "ASC" ? ' <img src="../html/images/s_asc.gif">' : ' <img src="../html/images/s_desc.gif">';
			element.innerHTML = element.innerHTML + arrow;
		}
	}
}

function removeAttr(formName, keys, type) {
	var f = document.forms[formName];
	if(!f) return;
	type = !type ? "required" : type;
	var arr = keys.replace(/ +/g, "").split(",");

	for(var i=0; i<arr.length; i++) {	
		if(f[arr[i]]) {
			var el = f[arr[i]];
			if (el.type != "select-one" && el.length > 1) el = el[0];
			el.removeAttribute(type);
		}
	}
}
function setAttr(formName, keys, type, value) {
	var f = document.forms[formName];
	if(!f) return;
	var arr = keys.replace(/ +/g, "").split(",");
	for(var i=0; i<arr.length; i++) {
		if(f[arr[i]]) {
			var el = f[arr[i]];
			if (el.type != "select-one" && el.length > 1) el = el[0];
			el.setAttribute(type, value);
			//alert(el.name + ":::" + type + ":::" + el.getAttribute(type));
		}
	}
}
/* ex)
removeAttr("form1", "aa, ba, ca");
removeAttr("form1", "aa, ba, ca", "optino");
setAttr("form1", "aa, ba, ca", "required", "Y");
*/


//신사고 전용
function loginCheck(nTarget) {
	switch(nTarget) {
		case 'parent': parent.showLoginLayer(); break;
		case 'parent.parent': 	parent.parent.showLoginLayer(); break;
		case 'opener': 
			opener.showLoginLayer(); 
			window.close();
			break;
		default : showLoginLayer(); break;
	}
	return;
}

function showLoginLayer() {

	try { 
		var container = document.getElementById("LoginContainer");
		container.style.backgroundColor = "black";
		container.style.filter = "alpha(opacity=30)";
		container.style.opacity = 0.3;
//		container.style.background = "url(/html/css/_blank_.gif)";
		var layer = document.getElementById("loginLayer");
		layer.style.width = "360px";
		layer.style.height = "270px";
		setPosition();
		ifr_login.src = "../member/login.aspx";
		
		document.forms['login_chk']['user_id'].focus();

		if(GetCookie("SAVEID")) {
			document.forms['login_chk']['user_id'].value = GetCookie("SAVEID");
			document.forms['login_chk']['saveid'].checked = true;
		} else {
			document.forms['login_chk']['user_id'].value = ""; 
		}
		document.forms['login_chk']['passwd'].value = ""; 
	
	} catch(e) {}
}
function hideLoginLayer() {

	try { 
			
		var container = document.getElementById("LoginContainer");
		container.style.width = "0px";
		container.style.height = "0px";
		document.getElementById("loginLayer").style.height = "0px";
		
	} catch(e) {}
}
function setPosition() {
	var layer = document.getElementById("loginLayer");
	if(layer && parseInt(layer.style.height) > 0) {
		layer.style.top = (Math.max(document.body.scrollTop, document.documentElement.scrollTop) + 190) + "px";
		layer.style.left = (document.documentElement.scrollWidth / 2 - layer.offsetWidth / 2 - 35) + "px";
		var container = document.getElementById("LoginContainer");
		container.style.width = (document.documentElement.scrollWidth) + "px";
		container.style.height = document.documentElement.scrollHeight+"px";//(document.documentElement.scrollHeight > 2000 ? 2000 : document.documentElement.scrollHeight) + "px";
	}
}

function showCourseLayer(type, course_cd, query){
	try{
		var container = document.getElementById("LoginContainer");
		container.style.backgroundColor = "black";
		container.style.filter = "alpha(opacity=30)";
		container.style.opacity = 0.3;

		var layer = document.getElementById("courseLayer");

		layer.style.top = (Math.max(document.body.scrollTop, document.documentElement.scrollTop) + 190) + "px";
		layer.style.left = (document.documentElement.scrollWidth / 2 - 100) + "px";
		layer.style.display = "block";
		container.style.width = (document.documentElement.scrollWidth) + "px";
		container.style.height = document.documentElement.scrollHeight+"px";

		var objYes= document.getElementById("course_yes");
		var objGo = document.getElementById("course_go");

		if(type == "pay"){
			objYes.href = "javascript:goPayment('" + course_cd + "', '"+ query +"');";
		}
		else if(type == "cart"){
			objYes.href = "javascript:goCart('" + course_cd + "', '"+ query +"');";
		}

		objGo.href = "javascript:courseGo('" + course_cd + "', '"+ query +"');";

	}
	catch(e){}
}

function courseGo(course_cd, query){
	call("/course/call_course_go.aspx?course_cd=" + course_cd + "&" + query);
}


function hideCourseLayer(){
	try{
		var container = document.getElementById("LoginContainer");
		container.style.width = "0px";
		container.style.height = "0px";
		document.getElementById("courseLayer").style.display = "none";
	}
	catch(e){}
}

function captureKey(e) { if(e.keyCode == 27) hideLoginLayer(); }
if(window.addEventListener) {
	window.addEventListener("resize", setPosition, false);
	window.addEventListener("keydown", captureKey, false);
}
if(window.attachEvent) {
	window.attachEvent("onresize", setPosition);
	document.documentElement.attachEvent("onkeydown", captureKey);
}

function appendIframe(name) {
	if(!document.getElementById(name)) {
		var ifrm = document.createElement("iframe");
		ifrm.name = name;
		ifrm.id = name;
		ifrm.width = 0;
		ifrm.height = 0;
		document.body.appendChild(ifrm);
	}
}

//동영상창관리
function openContent(contentCd, type) {
	OpenWindow("/player/player.aspx?content_cd=" + contentCd + "&type=" + type, "", 1000, 480);
}
//인트로포함
function openContent2(contentCd, type) {
	var width="";
	var height="";

	if(type=="f"){
		width="1280";
		height="760";
	}else if(type=="h"){
		width="715";
		height="480";
	}else{
		width="563";
		height="368";	
	}
	OpenWindow("/html/aquaplayer/player2.aspx?content_cd=" + contentCd + "&qualitie=" + type, "__MOVIE__", width, height);
}
//인트로없음
function openContent4(contentCd, type) {
	var width="";
	var height="";

	if(type=="f"){
		width="1280";
		height="770";
	}else if(type=="h"){
		width="715";
		height="459";
	}else{
		width="563";
		height="368";	
	}
	OpenWindow("/html/aquaplayer/player4.aspx?content_cd=" + contentCd + "&qualitie=" + type, "__MOVIE__", width, height);
}
//관리자-동영상 프로모션관리
function openContent5(contentCd,introCd, type) {
	var width="";
	var height="";

	if(type=="f"){
		width="1280";
		height="760";
		type="h";
	}else if(type=="h"){
		width="715";
		height="480";
	}else{
		width="563";
		height="368";	
	}
	OpenWindow("/html/aquaplayer/player5.aspx?content_cd=" + contentCd + "&intro_cd=" + introCd + "&qualitie=" + type, "__MOVIE__", width, height);
}

//동영상플레이어
function player(keystr, type, width) {

	if(type == "ot" || type == "pot")
	{
	    type = "f";
	}
	var nWidth = 0;
	var nHeight = 0;
	if(type == "n") {
		nWidth = width ? width : 782;
		nHeight = 379;
	}if(type == "f") {
		var nWidth = screen.width;
		var nHeight = screen.height;
		
		if( 645 < nHeight )
			nHeight = 645;
			
		if( 1280 < nWidth )
			nWidth = 1280;
	} else {
		nWidth = width ? width : 1000;
		nHeight = 480;
	}
	
	//alert( "nWidth : " + nWidth + "    nHeight : " + nHeight );
	OpenWindow(
		"http://www.ssen.com/player/player.aspx"
		+ "?keystr=" + keystr
		+ "&tp=" + type
		+ "&pv=Y"
		+ "&ssg=y"
		, "___________pl45___________"
		, nWidth
		, nHeight
	);
	
}
function picklePlayer(keystr, type) {
	var width = screen.width;
	var height = screen.height;
	
	if(type == "ot" || type == "pot")
	{
	    type = "f";
	}
	
	if( 645 < height )
		height = 645;
		
	if( 1280 < width )
		width = 1280;
	//alert( "width : " + width + "    height : " + height );
	OpenWindow(
		"../player/player.aspx"
		+ "?keystr=" + keystr
		+ "&tp=" + type
		+ "&pv=N"
		, "___________pl45___________"
		, width
		, height
	);
}

//완강예정일 경고창
function goCheckComplete(courseCd, query,date,type) {
	var dateOK="";
	
	if(date!=""){
		if(date.length=="8") {
			dateOK=date.substring(0,4)+"년 "+date.substring(4,6)+"월 "+date.substring(6,8)+"일 ";
		}else{ 
			dateOK=date+" ";
		}
	}

	if(confirm("이 강좌는 "+dateOK+"완강예정으로 현재 촬영중이며 강의는 매주 업로드 됩니다.")){						
		if(type=="pay"){
			goPayment(courseCd, query);
		}else if(type=="cart"){
			goCart(courseCd, query);
		}else if(type=="present"){
			goPresent(courseCd, query);
		}
	}else{
		if(type==""){
			return false;
		}
	}
}

function goPaymentFrm(frm,query,ing,ing2){
	goPaymentFrm(frm,query,ing,ing2,"","");
}

function goPaymentFrm(frm,query,ing,ing2,complete,date){
	var f=document.getElementById(frm);
	
	if(f.course_cd.checked==false && f.book_cd.checked==false){
		alert("구매하고자 하는 강좌와 교재를 선택하세요");
		return;
	}

	if(ing=="True" && f.course_cd.checked==true){
		alert("현재 수강중인 강좌입니다.");
		return;
	}
	
	if(f.book_cd.checked==true){
		if(ing=="True"){
			if(confirm("교재만 구매하시겠습니까?")){
				
			}else{
				return;
			}
		}else{
			if(f.course_cd.checked==false && ing2!="True"){
				alert("강좌와 교재를 함께 구매하시거나 해당 강좌를 수강중일 경우에만 교재를 구매하실 수 있습니다.");
				return;
			}
		}
	}

	if(complete=="False"){
		var complate_flag = goCheckComplete("","",date,"");

		if(complate_flag==false)
			return;
	}		

	if(f.book_cd.checked==false) 
		f.book_cd.value="";

	if(f.book_cd.checked==false) {
		f.book_cd.value="";	
		f.kind.value="C";
	}else{
		if(f.course_cd.checked==false)	{				
			f.kind.value="B";
		}else{
			f.kind.value="";
		}
	}

	f.course_cd2.value=f.course_cd.value;

	appendIframe("public_ifrm");
	f.target = "public_ifrm";
	f.action = "/order/payment.aspx?"+query;
	f.submit();
}

function goCartFrm(frm,query,ing,ing2){
	goCartFrm(frm,query,ing,ing2,"","");
}

function goCartFrm(frm,query,ing,ing2,complete,date){
	var f=document.getElementById(frm);
	
	if(f.course_cd.checked==false && f.book_cd.checked==false){
		alert("장바구니에 담을려는 강좌와 교재를 선택하세요");
		return;
	}

	if(ing=="True" && f.course_cd.checked==true){
		alert("현재 수강중인 강좌입니다.");
		return;
	}
	
	if(f.book_cd.checked==true){
		if(ing=="True"){
			if(confirm("교재만 담으시겠습니까?")){
				
			}else{
				return;
			}	
		}else{
			if(f.course_cd.checked==false && ing2!="True"){
				alert("강좌와 교재를 함께 담으시거나 해당 강좌를 수강중일 경우에만 교재를 담으실 수 있습니다.");
				return;
			}
		}
	}
	
	if(complete=="False"){
		var complate_flag = goCheckComplete("","",date,"");

		if(complate_flag==false)
			return;
	}

	if(f.book_cd.checked==false) {
		f.book_cd.value="";	
		f.kind.value="C";
	}else{
		if(f.course_cd.checked==false)	{				
			f.kind.value="B";
		}else{
			f.kind.value="";
		}
	}

	f.course_cd2.value = f.course_cd.value;		

	appendIframe("public_ifrm");
	f.target = "public_ifrm";
	f.action = "/order/cart.aspx?"+query;
	f.submit();
}


function goPresentFrm(frm,query){
	var f=document.getElementById(frm);
	
	if(f.course_cd.checked==false && f.book_cd.checked==false){
		alert("선물하려는 강좌와 교재를 선택하세요");
		return;
	}
	
	if(f.book_cd.checked==false || f.course_cd.checked==false){
		alert("해당 상품은 강좌+교재로만 선물이 가능합니다.");
		return;
	}		

	f.course_cd2.value = f.course_cd.value;	
	
	var aa = null;
	var aa = OpenWindow("/order/present.aspx?course_cd=" + f.course_cd.value + "&" + query, "present", "450", "450");
}


//결제관리
function goPayment(courseCd, query) {	
	appendIframe("public_ifrm");
	public_ifrm.location.href = "/order/payment.aspx?course_cd=" + courseCd + "&" + query;
}
//장바구니관리
function goCart(courseCd, query) {
	appendIframe("public_ifrm");
	public_ifrm.location.href = "/order/cart.aspx?course_cd2=" + courseCd + "&kind=C&" + query;
}
//선물하기관리
function goPresent2(extendDays,courseCd, query, tar) {
	OpenWindow("/order/present.aspx?extend_days="+extendDays+"&course_cd=" + courseCd + (tar ? "&tar=" + tar : "") + "&" + query, "", 450, 450);
}
//선물하기관리
function goPresent(courseCd, query, tar) {
	OpenWindow("/order/present.aspx?course_cd=" + courseCd + (tar ? "&tar=" + tar : "") + "&" + query, "", 450, 450);
}
//선물하기관리-패키지
function goPresentPackage(courseCd, packageCd,query, tar) {
	OpenWindow("/order/present.aspx?packageCd="+packageCd+"&course_cd=" + courseCd + (tar ? "&tar=" + tar : "") + "&" + query, "", 450, 450);
}
//신청하기관리
function courseApply(courseCd, query) {
	//if(confirm("신청하시겠습니까?")){
		appendIframe("public_ifrm");
		public_ifrm.location.href = "/order/course_apply.aspx?course_cd=" + courseCd + "&" + query;
	//}
}
function isLearning(){
	alert("현재 수강중인 강좌입니다.");
	return;
}
function autoResize(i) {

    var iframeHeight =
			(i).contentWindow.document.body.scrollHeight;
			(i).height = iframeHeight + 10;
}

function autoResize2(i) {

    var iframeHeight =
			(i).contentWindow.document.body.scrollHeight;
			(i).height = iframeHeight + 40;
}

function isNum(obj){
	if(isNaN(obj.value)){
		alert('숫자만 입력 할 수 있습니다.'); obj.value='';
	}
}


	function showMovie(content_cd,qualitie){//아쿠아플레이어
		OpenWindow("/html/aquaplayer/player2.aspx?content_cd="+content_cd+"&qualitie="+qualitie,"player","800","450");
	}

	function showMovie2(content_cd){//플래시플레이어
		window.open('/event/201112Course_buy/course_movie.aspx?content_cd='+content_cd,'movie',"width=447,height=312, scrollbars=no,resizable=no");		
	}

	function showMovieOt(content_cd){//플래시플레이어OT

		window.open('/course/course_movie.aspx?content_cd='+content_cd,'movie',"width=1247,height=720, scrollbars=no,resizable=no");		
	}
	

	function autoResize3(i) {

    var iframeHeight =
			(i).contentWindow.document.body.scrollHeight;
			(i).height = iframeHeight + 70;
}

	function limitText( sender,max ){
					if(sender.value==max+"자 이내로 작성해 주세요."){
						sender.value="";
					}
					if( sender.value.length >= max ){
						alert( max+"자 까지 입력 가능합니다." );
						sender.value = sender.value.substr(0, max); 
						return;
					}
	}

	function menu_over(element,mode){
		if(mode=="on")	element.src=element.src.replace('off','on');
		else element.src=element.src.replace('on','off');
	}

	function menu_over2(element,mode){
		if(mode=="on") element.className="on";
		else element.className="off";
	}

	function popup_ebook(url){
	  strop = "width=" + 1024 + ",height=" + 768 + ",scrollbars=no,toolbar=0,resizable=0";
	  w=open("http://ebook.sinsago.co.kr//ecatalog.asp?Dir="+url, "popup_ebook", strop);
	  w.focus();

	}

	//수능 결제하기에 마우스 오버시 교재있음 알려주는 레이어
	function open_year_noti( year, book_img ){

		if( book_img == '' ) return;
		//year값 수능은 true,false 그 외는 책 년도
		var obj = document.getElementById('year_noti');
		
		obj.style.pixelLeft =  190;
		obj.style.pixelTop = event.y + document.body.scrollTop ;
		
		var objImg = document.getElementById('book_img');	
		objImg.src = book_img;
		
		if(!isNaN(year))
		{		
			var objYear = document.getElementById('course_year');
			objYear.innerHTML = year;		
		}
		
		if(year == "False")
			obj.style.display = 'none';
		else
			obj.style.display = 'block';
	}
	 
	function close_year_noti(){
	 
	 var gId = document.getElementById( 'year_noti' );
	 gId.style.display = "none";
	}
	
	function goTeacherUrl(tid,ch){
			location.href="/teacher/teacher_info.aspx?ch="+ch+"&tid="+tid;
	}

	function goCourseUrl(code,ch){
			location.href="/main/course_main.aspx?ch="+ch+"&kind=b&code="+code;
	}
	
	function goCourseDetailUrl(bcd,ccd,ch){
			location.href="/course/course_detail.aspx?book_cd=" + bcd + "&course_cd=" + ccd + "&ch="+ch;
	}
