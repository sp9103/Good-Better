

/*document.addEventListener("deviceready", init, false);
function init() {
	$("#Setting").css('display','block');
}*/


document.querySelector("#Cancel").addEventListener("touchend", CancelClick, false);
document.querySelector("#ImageAdd").addEventListener("touchend", ImageAddClick, false);

function CancelClick() {
var options = {
  "direction"        : "left", // 'left|right|up|down', default 'left' (which is like 'next')
  "duration"         :  500, // in milliseconds (ms), default 400
  "slowdownfactor"   :    3, // overlap views (higher number is more) or no overlap (1), default 4
  "iosdelay"         :  100, // ms to wait for the iOS webview to update before animation kicks in, default 60
  "androiddelay"     :  150, // same as above but for Android, default 70
  "winphonedelay"    :  250, // same as above but for Windows Phone, default 200,
  "fixedPixelsTop"   :    0, // the number of pixels of your fixed header, default 0 (iOS and Android)
  "fixedPixelsBottom":   60  // the number of pixels of your fixed footer (f.i. a tab bar), default 0 (iOS and Android)
};
window.plugins.nativepagetransitions.slide(
  options,
  function (msg) {console.log("success: " + msg)}, // called when the animation has finished
  function (msg) {alert("error: " + msg)} // called in case you pass in weird values
);
	
	var dirPath = dirname(location.href);
    fullPath = dirPath + "/INFO.html";
    window.location = fullPath;
}

function ImageAddClick() {
}

function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}
	
	document.addEventListener("deviceready", onDeviceReady(), false);
}
 
function onDeviceReady() {
	var tDay = new Date();
	var tMonth = tDay.getMonth()+1;
	var tDate = tDay.getDate();
	if ( tMonth < 10) tMonth = "0"+tMonth;
	if ( tDate < 10) tDate = "0"+tDate;
	
	var submitKey = window.localStorage.getItem("SubmitKey");
	
	if(submitKey > 0)	document.getElementById("SubmitButton").style.display = "block";
	else 	document.getElementById("SubmitButton").style.display = "block";
	
		
	document.getElementById("Today").innerHTML = tDay.getFullYear()+" / "+tMonth+" / "+tDate;
	
	document.addEventListener("backbutton", onBackKeyDown, false);

}

function onBackKeyDown() {
	var r = confirm("Do u want exit this app?");
	if (r == true)
		navigator.app.exitApp();
}