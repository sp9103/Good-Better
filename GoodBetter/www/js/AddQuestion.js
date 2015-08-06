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

        var options = new FileUploadOptions();
        options.fileKey = "talkImage";
        options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
    var mime=imageUri.substr(imageUri.lastIndexOf('.') + 1);
    var type;
    if(mime=='jpg' || mime=='jpeg') type='image/jpeg';
    else if(mime=='png') type = 'image/png';
        options.mimeType = type;

        var params = {};
        params.clientCode = 2;
        params.plantCode = 1;
        params.question = content;

        options.params = params;

		alert(imageUri);
        var ft = new FileTransfer();
        ft.upload(imageUri, encodeURI('http://goodandbetter.cafe24.com/appRegisterTalk'),
            function(data) {
                alert("질문이 등록되었습니다.");
				QuestionCancelClick();
            }, function(error) {
                alert('fail');
            }, options);

}

function submitClicked_NoImage(content) {
         var formData = new FormData();
         formData.append('clientCode',2);
         formData.append('plantCode',1);
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
         alert('fail');
         }

         });
}

