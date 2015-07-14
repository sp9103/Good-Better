

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
}

function TalkClick() {
	document.getElementById("INFOPage").style.display = "none";
	document.getElementById("RecordPage").style.display = "none";
	document.getElementById("TalkPage").style.display = "block";
	document.getElementById("SettingPage").style.display = "none";
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