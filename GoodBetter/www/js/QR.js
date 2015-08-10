
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
						window.localStorage.setItem("TabHistory", "INFO");
                        nextPage();
                    }
                    else {
                        alert(data.errMSG);
                    }
                },
                error: function (xhr, ajaxoptions,thrownError) {

					if(result.text=='') {

                    }
                    else{
						alert('server error occurred! code:'+xhr.status);
						
						//QR코드 재촬영
						var dirPath = dirname(location.href);
						fullPath = dirPath + "/QR_Scan.html";
						window.location = fullPath;
					}
                }
            })

            if (result.cancelled == true) {
                window.localStorage.setItem("auto", false);

                prevPage();
            }

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
    fullPath = dirPath + "/Login.html";
    window.location = fullPath;
}

function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}