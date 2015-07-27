

/*document.addEventListener("deviceready", init, false);
function init() {
	$("#Setting").css('display','block');
}*/

document.querySelector("#Cancel").addEventListener("touchend", CancelClick, false);

function CancelClick() {
	
	var dirPath = dirname(location.href);
    fullPath = dirPath + "/INFO.html";
    window.location = fullPath;
}

function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}

 


