
function startScan() {
	var isCancelled = false;

    cordova.plugins.barcodeScanner.scan(
        function (result) {
            $.ajax({
                dataType: 'Json',
                url: result.text,
                success: function (data) {
                    if(data.error == 0){
                        var s = JSON.stringify(data.result);
                        window.localStorage.setItem("cur_plant",s);
						window.localStorage.setItem("TabHistory", "INFO");
						
						//마스터 계정일때 예외처리
						var isMaster = window.localStorage.getItem("isMaster");
						if(isMaster){
							var plant = JSON.parse(s);
							var MEM_Code = plant.MEM_Code;
							window.localStorage.setItem("clientCode", MEM_Code);
						}
						
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
                showConfirm();
                //return false;
            }

        },
        function (error) {
            alert("Scanning failed: " + error);
        }
    );

	if(isCancelled == true){
	}
}
// process the confirmation dialog result
function onConfirm(buttonIndex) {
    if(buttonIndex==1) {
        navigator.app.exitApp();
    }else if(buttonIndex ==2) {
        //QR코드 재촬영
        var dirPath = dirname(location.href);
        fullPath = dirPath + "/QR_Scan.html";
        window.location = fullPath;
    }
}

// Show a custom confirmation dialog
//
function showConfirm() {
    navigator.notification.confirm(
        '어플리케이션을 종료하시겠습니까?', // message
        onConfirm,            // callback to invok with index of button pressed
        '종료 확인',           // title
        ['예', '아니오']        // buttonLabels
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