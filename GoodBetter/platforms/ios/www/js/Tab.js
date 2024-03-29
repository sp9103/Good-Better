

/*document.addEventListener("deviceready", init, false);
 function init() {
 $("#Setting").css('display','block');
 }*/

function QRClick() {
	window.localStorage.setItem("TabHistory", "QR"); 
	
	var dirPath = dirname(location.href);
	fullPath = dirPath + "/QR_Scan.html";
	window.location = fullPath;
}

function INFOClick() {
	window.localStorage.setItem("TabHistory", "INFO");
	var t = window.localStorage.getItem("TabHistory");
	
	document.getElementById("INFOPage").style.display = "block";
	document.getElementById("RecordPage").style.display = "none";
	document.getElementById("TalkPage").style.display = "none";
	document.getElementById("SettingPage").style.display = "none";
}

function RecordClick() {
	window.localStorage.setItem("TabHistory", "Record");
	
	document.getElementById("INFOPage").style.display = "none";
	document.getElementById("RecordPage").style.display = "block";
	document.getElementById("TalkPage").style.display = "none";
	document.getElementById("SettingPage").style.display = "none";
	var cur_plant = window.localStorage.getItem("cur_plant");
	var plant = JSON.parse(cur_plant);
	var tDay = new Date();
	var tMonth = tDay.getMonth()+1;
	
	RecordListLoad(plant.PLA_Code, tDay.getFullYear(), tMonth);
}

function TalkClick() {
	window.localStorage.setItem("TabHistory", "Talk");
	
	document.getElementById("INFOPage").style.display = "none";
	document.getElementById("RecordPage").style.display = "none";
	document.getElementById("TalkPage").style.display = "block";
	document.getElementById("SettingPage").style.display = "none";
	
	var cur_plant = window.localStorage.getItem("cur_plant");
	var plant = JSON.parse(cur_plant);
	
	var talkUrl = 'http://goodandbetter.cafe24.com/appGetTalk?plantCode='+plant.PLA_Code;
	$.ajax({
		dataType: 'Json',
		url: talkUrl,
		success: function (data) {
			if(data.error == 0){
				document.getElementById("TalkPage").innerHTML=makeTalk(data.result);
			}
			else {
				document.getElementById("TalkPage").innerHTML=makeTalk(data.result);
			}
		},
		error: function (xhr, type) {
			//alert('server error occurred');
		}
	});
}

function SetClick() {
	window.localStorage.setItem("TabHistory", "Setting");
	
	document.getElementById("INFOPage").style.display = "none";
	document.getElementById("RecordPage").style.display = "none";
	document.getElementById("TalkPage").style.display = "none";
	document.getElementById("SettingPage").style.display = "block";
}

function AddClick() {
	var idx = -1;
	window.localStorage.setItem("CheckID", idx);
	window.localStorage.setItem("isImageUpdated", 1);
	
	var dirPath = dirname(location.href);
	fullPath = dirPath + "/RecordAddPage.html";
	window.location = fullPath;
}

function QuestionClick() {
	var dirPath = dirname(location.href);
	fullPath = dirPath + "/AddQuestion.html";
	window.location = fullPath;
}

function dirname(path) {
	return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}

function makeRecordList(data)
{
	var html="";
   
   html="<ul class=\"list\">";
   list = JSON.parse(data);
   window.localStorage.setItem("CheckList", data);
   
   for(i = 0; i < list.length; i++){
	   var time = list[i].indate;
	   
	   //스트링 자르기
		var date = cutStr(10, time);
		var tid = "check"+i;
	   
	   html+="<li class=\"list__item list__item--chevron\" id="+tid+" onclick=RecordView(this.id)"+">";
	   
	   html+=date;
	   html+="</li>";
   }
   
   html += "</ul>";
   
    return html;
}

function cutStr(len, str){
	var l = 0;
	for (var i=0; i<str.length; i++) {
       l += (str.charCodeAt(i) > 128) ? 2 : 1;
       if (l > len) return str.substring(0,i);
	}
	return str;
}

function RecordListLoad(PlantCode, year, month){
	var RecordURL = 'http://goodandbetter.cafe24.com/appGetChecklist?plantCode='+PlantCode+'&year='+year+'&month='+month;
	
	$.ajax({
		dataType: 'Json',
		url: RecordURL,
		success: function (data) {
			if(data.error == 0){
				var s = JSON.stringify(data.result);
				//alert(s);
				document.getElementById("RecordList").innerHTML=makeRecordList(s);
			}
			else {
				if(data.errMSG == 'no check List'){
					document.getElementById("RecordList").innerHTML="<img style=\"width: 100%;\" src=\"img/EmptyList.png\" />";
				}
				else{
					document.getElementById("RecordList").innerHTML='&nbsp;&nbsp;해당 페이지를 열람할 수 없습니다.';
				}
			}
		},
		error: function (xhr, type) {
			//alert('server error occurred');
		}
	});
}

//페이지 이동_ 체크리스트 상세 기록 보여주기
function RecordView(id){
	var data = window.localStorage.getItem("CheckList");
	list = JSON.parse(data);
	var idx;
	var tFullDay;
	
	for(var i = 0; i < list.length; i++){
		idx=i;
		var tid = "check"+idx;
		if(id == tid){
			tFullDay = cutStr(10, list[i].indate);
			break;
		}
	}
	window.localStorage.setItem("CheckID", idx);
	
	var tDay = new Date();
	var tMonth = tDay.getMonth()+1;
	if(tMonth < 10) tMonth = "0"+tMonth;
	var tDate = tDay.getDate();
	if(tDate < 10) tDate = "0"+tDate;
	var preDate = tDay.getFullYear() + "-" + tMonth + "-" + tDate;
	
	//수정 가능인지 체크
	var isadmin = window.localStorage.getItem("isadmin");

	//어드민이 아닐때는 그냥 보여주기만 (수정불가능하게)
	if(preDate == tFullDay && isadmin == 1){
		//같은날이니까 수정가능
		window.localStorage.setItem("isImageUpdated", 0);
		
		var dirPath = dirname(location.href);
		fullPath = dirPath + "/RecordAddPage.html";
		window.location = fullPath;
	}else{
		var dirPath = dirname(location.href);
		fullPath = dirPath + "/RecordViewPage.html";
		window.location = fullPath;
	}
}