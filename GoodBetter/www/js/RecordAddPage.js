

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

function SubmitClicked(){
	var imageUri = window.localStorage.getItem("imageuri");
			
	//이미지 없을때
	if(!imageUri){
		var formData = new FormData();
		
		var cur_plant = window.localStorage.getItem("cur_plant");
		var plant = JSON.parse(cur_plant);
		
		formData.append('clientCode',2);				//임시
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
				alert('fail');
			}
		});
	}
}
 


