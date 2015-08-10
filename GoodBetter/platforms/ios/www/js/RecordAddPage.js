

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

function SubmitClicked() {
	document.getElementById("SubmitButton").innerHTML = "등록 중입니다.";
	document.getElementById("SubmitButton").style.opacity = 0.3;
	document.getElementById("SubmitButton").style.pointerEvents = 'none';
	var imageUri = window.localStorage.getItem("imageuri");
	if(!imageUri){
		submitClicked_NoImage();
	}else {
		submitClicked_WithImage(imageUri);
	}
}

function submitClicked_WithImage(imageUri) {


	var cur_plant = window.localStorage.getItem("cur_plant");
	var plant = JSON.parse(cur_plant);
	var clientCode = window.localStorage.getItem("clientCode");

	var options = new FileUploadOptions();
	options.fileKey = "checklistImage";
	options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
	var mime=imageUri.substr(imageUri.lastIndexOf('.') + 1);
	var type;
	if(mime=='jpg' || mime=='jpeg') type='image/jpeg';
	else if(mime=='png') type = 'image/png';
	options.mimeType = type;

	var params = {};
	params.clientCode = clientCode;
	params.plantCode = plant.PLA_Code;
	params.water = document.getElementById("Water").checked ? 1 : 0;
	params.supplements = document.getElementById("Supplements").checked ? 1 : 0;
	params.damage = document.getElementById("Damage").checked ? 1 : 0;
	params.pruning = document.getElementById("Pruning").checked ? 1 : 0;
	params.cleanleaf = document.getElementById("Cleanleaf").checked ? 1 : 0;
	params.repotting = document.getElementById("Repotting").checked ? 1 : 0;
	params.change = document.getElementById("Change").checked ? 1 : 0;
	params.text = document.getElementById("CHETEXT").value;

	options.params = params;

	var ft = new FileTransfer();
	ft.upload(imageUri, encodeURI('http://goodandbetter.cafe24.com/appUpdateCheckList'),
		function(data) {
			alert("체크리스트가 등록되었습니다.");
			CancelClick();
		}, function(error) {
			document.getElementById("SubmitButton").innerHTML = "등록하기";
			document.getElementById("SubmitButton").style.opacity = 1.0;
			document.getElementById("SubmitButton").style.pointerEvents = '';
			alert('네트워크 상태를 확인해주세요.');
		}, options);
}

function submitClicked_NoImage() {
	var cur_plant = window.localStorage.getItem("cur_plant");
	var plant = JSON.parse(cur_plant);
	var clientCode = window.localStorage.getItem("clientCode");

	var formData = new FormData();

	formData.append('clientCode',clientCode);				//임시
	formData.append('plantCode', plant.PLA_Code);				//임시
	formData.append('water',document.getElementById("Water").checked ? 1 : 0);
	formData.append('supplements',document.getElementById("Supplements").checked ? 1 : 0);
	formData.append('damage',document.getElementById("Damage").checked ? 1 : 0);
	formData.append('pruning',document.getElementById("Pruning").checked ? 1 : 0);
	formData.append('cleanleaf',document.getElementById("Cleanleaf").checked ? 1 : 0);
	formData.append('repotting',document.getElementById("Repotting").checked ? 1 : 0);
	formData.append('change',document.getElementById("Change").checked ? 1 : 0);
	formData.append('text',document.getElementById("CHETEXT").value);

	$.ajax({
		url:'http://goodandbetter.cafe24.com/appUpdateChecklist',
		data:formData,
		cache:false,
		processData:false,
		contentType:false,
		type:'POST',
		success:function (data,status,req) {
			if(data.error == 0){
				//이번 페이지로 돌아가기 구현
				alert("체크리스트가 등록되었습니다.");
				CancelClick();
			}
			else alert(data.errMSG);
		},
		error:function (req,status,error) {
			document.getElementById("SubmitButton").innerHTML = "등록하기";
			document.getElementById("SubmitButton").style.opacity = 1.0;
			document.getElementById("SubmitButton").style.pointerEvents = '';
			alert('네트워크 상태를 확인해주세요.');
		}
	});
}
 


