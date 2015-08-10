/**
 * Created by min on 2015. 8. 1..
 */

document.querySelector("#QuestionCancel").addEventListener("touchend", QuestionCancelClick, false);

function QuestionCancelClick() {

    var dirPath = dirname(location.href);
    fullPath = dirPath + "/INFO.html";
    window.location = fullPath;
    //TalkClick();
}
function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}
function submitClicked(content) {
    document.getElementById("SubmitButton").style.opacity = 0.3;
    document.getElementById("SubmitButton").style.pointerEvents = 'none';
    var imageUri = window.localStorage.getItem("imageuri");
    if(!content){
        alert("질문을 입력하세요!");
    }else if(!imageUri){
        submitClicked_NoImage(content);
    }else {
        submitClicked_WithImage(content,imageUri);
    }
}

function submitClicked_WithImage(content, imageUri) {

        //imageUri = 'file:///storage/emulated/0/DCIM/Facebook/FB_IMG_1432276141336.jpg';

		var s = window.localStorage.getItem("cur_plant");
		var plant = JSON.parse(s);
		var clientCode = window.localStorage.getItem("clientCode");
		
        var options = new FileUploadOptions();
        options.fileKey = "talkImage";
        options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
		var mime=imageUri.substr(imageUri.lastIndexOf('.') + 1);
		var type;
		if(mime=='jpg' || mime=='jpeg') type='image/jpeg';
		else if(mime=='png') type = 'image/png';
        options.mimeType = type;

        var params = {};
        params.clientCode = clientCode;
        params.plantCode = plant.PLA_Code;
        params.question = content;

        options.params = params;

        var ft = new FileTransfer();
        ft.upload(imageUri, encodeURI('http://goodandbetter.cafe24.com/appRegisterTalk'),
            function(data) {
                alert("질문이 등록되었습니다.");
				QuestionCancelClick();
            }, function(error) {
                document.getElementById("SubmitButton").style.opacity = 1.0;
                document.getElementById("SubmitButton").style.pointerEvents = '';
                alert('네트워크 상태를 확인해주세요.');
            }, options);

}

function submitClicked_NoImage(content) {
        var formData = new FormData();
		var s = window.localStorage.getItem("cur_plant");
		var plant = JSON.parse(s);
		var clientCode = window.localStorage.getItem("clientCode");
		 
         formData.append('clientCode',clientCode);
         formData.append('plantCode',plant.PLA_Code);
         formData.append('question',content);

         $.ajax({
         url:'http://goodandbetter.cafe24.com/appRegisterTalk',
         data:formData,
         cache:false,
         processData:false,
         contentType:false,
         type:'POST',
         success:function (data,status,req) {
         if(data.error == 0){
			 //이번 페이지로 돌아가기 구현
			 alert("질문이 등록되었습니다.");
			 QuestionCancelClick();
		 } 
         else alert(data.errMSG);
         },
         error:function (req,status,error) {
             document.getElementById("SubmitButton").style.opacity = 1.0;
             document.getElementById("SubmitButton").style.pointerEvents = '';
             alert('네트워크 상태를 확인해주세요.');
         }

         });
}

