

/*document.addEventListener("deviceready", init, false);
 function init() {
 $("#Setting").css('display','block');
 }*/

document.querySelector("#QR").addEventListener("touchend", QRClick, false);
document.querySelector("#addButton").addEventListener("touchend", AddClick, false);
document.querySelector("#questionButton").addEventListener("touchend", QuestionClick, false);

function QRClick() {
	var dirPath = dirname(location.href);
	fullPath = dirPath + "/QR_Scan.html";
	window.location = fullPath;
}

function INFOClick() {
	document.getElementById("INFOPage").style.display = "block";
	document.getElementById("RecordPage").style.display = "none";
	document.getElementById("TalkPage").style.display = "none";
	document.getElementById("SettingPage").style.display = "none";
}

function RecordClick() {
	document.getElementById("INFOPage").style.display = "none";
	document.getElementById("RecordPage").style.display = "block";
	document.getElementById("TalkPage").style.display = "none";
	document.getElementById("SettingPage").style.display = "none";
	var cur_plant = window.localStorage.getItem("cur_plant");
	var plant = JSON.parse(cur_plant);
	var tDay = new Date();
	var tMonth = tDay.getMonth()+1;
	
	var RecordURL = 'http://goodandbetter.cafe24.com/appGetChecklist?plantCode='+plant.PLA_Code+'&year='+tDay.getFullYear()+'&month='+tMonth;
	
	alert(RecordURL);
}

function TalkClick() {
	document.getElementById("INFOPage").style.display = "none";
	document.getElementById("RecordPage").style.display = "none";
	document.getElementById("TalkPage").style.display = "block";
	document.getElementById("SettingPage").style.display = "none";
	var talkUrl = 'http://goodandbetter.cafe24.com/appGetTalk?plantCode='+1;
	$.ajax({
		dataType: 'Json',
		url: talkUrl,
		success: function (data) {
			if(data.error == 0){
				document.getElementById("TalkPage").innerHTML=makeTalk(data.result);
			}
			else {
				document.getElementById("TalkPage").innerHTML='해당 페이지를 열람할 수 없습니다.';
			}
		},
		error: function (xhr, type) {
			//alert('server error occurred');
		}
	});
}

function SetClick() {
	document.getElementById("INFOPage").style.display = "none";
	document.getElementById("RecordPage").style.display = "none";
	document.getElementById("TalkPage").style.display = "none";
	document.getElementById("SettingPage").style.display = "block";
}

function SetClick() {
	document.getElementById("INFOPage").style.display = "none";
	document.getElementById("RecordPage").style.display = "none";
	document.getElementById("TalkPage").style.display = "none";
	document.getElementById("SettingPage").style.display = "block";
}

function AddClick() {
	var dirPath = dirname(location.href);
	fullPath = dirPath + "/RecordAddPage.html";
	window.location = fullPath;

	window.localStorage.setItem("SubmitKey", 1);
}

function QuestionClick() {
	var dirPath = dirname(location.href);
	fullPath = dirPath + "/AddQuestion.html";
	window.location = fullPath;
}


function dirname(path) {
	return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}