
function startScan() {
    
    cordova.plugins.barcodeScanner.scan(
        function (result) {
            //alert(result.text);
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
                    else {
                        alert(data.errMSG);
                    }
                },
                error: function (xhr, ajaxoptions,thrownError) {
					
					if(xhr.status == 200){
						alert("어플리케이션을 종료하시겠습니까?")							//왠진 모르겠지만 이렇게 구현하면 정상동작
						var r = confirm("어플리케이션을 종료하시겠습니까?");
						if (r == true)
							navigator.app.exitApp();
						else if(r == false){
							//QR코드 재촬영
							var dirPath = dirname(location.href);
							fullPath = dirPath + "/QR_Scan.html";
							window.location = fullPath;
						}
					}else{
						alert('server error occurred! code:'+xhr.status);
						
						//QR코드 재촬영
						/*var dirPath = dirname(location.href);
						fullPath = dirPath + "/QR_Scan.html";
						window.location = fullPath;*/
					}
                }
            });
            /*
            if (result.cancelled == true)
                prevPage();
			else
				nextPage();
				*/
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