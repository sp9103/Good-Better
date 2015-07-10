var resultDiv;

document.addEventListener("deviceready", init, false);
function init() {

    //document.querySelector("#startScan").addEventListener("touchend", startScan, false);
    //resultDiv = document.querySelector("#results");

    startScan();
}

function startScan() {
    cordova.plugins.barcodeScanner.scan(
        function (result) {

            $.ajax({
                dataType: 'Json',
                url: result.text,
                success: function (data) {
                    if(data.error == 0){
                        var s = JSON.stringify(data.result);
                        //alert(s);
                        window.localStorage.setItem("cur_plant",s);
                        nextPage();
                    }
                },
                error: function (xhr, type) {
                    //alert('server error occurred');
                }
            });
            if (result.cancelled == true)
                prevPage();
        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );
}

function nextPage() {
    var dirPath = dirname(location.href);
    fullPath = dirPath + "/INFO.html";
    window.location = fullPath;
}

function prevPage() {
    var dirPath = dirname(location.href);
    fullPath = dirPath + "/index.html";
    window.location = fullPath;
}

function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}