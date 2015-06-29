var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {
    //document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    //resultDiv = document.querySelector("#results");
	
	startScan();
	
	goINFO();
}

function startScan() {

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            var s = "Result: " + result.text + "<br/>" +
            "Format: " + result.format + "<br/>" +
            "Cancelled: " + result.cancelled;
            resultDiv.innerHTML = s;
        }, 
        function (error) {
            alert("Scanning failed: " + error);
        }
    );

}

function goINFO()
{
	var dirPath = dirname(location.href);
	fullPath = dirPath + "/INFO.html";
	window.location=fullPath;
}
		
function dirname(path)
{
	return path.replace(/\\/g,'/').replace(/\/[^\/]*$/, '');
}