

/*document.addEventListener("deviceready", init, false);
function init() {
	$("#Setting").css('display','block');
}*/

var pictureSource;  
var destinationType;

document.querySelector("#Cancel").addEventListener("touchend", CancelClick, false);
document.querySelector("#ImageAdd").addEventListener("touchend", ImageAddClick, false);

function CancelClick() {
	var dirPath = dirname(location.href);
    fullPath = dirPath + "/INFO.html";
    window.location = fullPath;
}

function ImageAddClick() {
}

function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}

function onLoad() {
	document.addEventListener("deviceready", onDeviceReady(), false);
}
 
function onDeviceReady() {
	var tDay = new Date();
	var tMonth = tDay.getMonth()+1;
	var tDate = tDay.getDate();
	if ( tMonth < 10) tMonth = "0"+tMonth;
	if ( tDate < 10) tDate = "0"+tDate;

	document.getElementById("Today").innerHTML = tDay.getFullYear()+" / "+tMonth+" / "+tDate;
	
	document.addEventListener("backbutton", onBackKeyDown, false);
	
	/*pictureSource=navigator.camera.PictureSourceType;
	destinationType=navigator.camera.DestinationType;
	
	alert("test");*/
}

function onBackKeyDown() {
	var r = confirm("Do u want exit this app?");
	if (r == true)
		navigator.app.exitApp();
}

function onFail(message) {
	alert('Failed because: ' + message); 
}