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

function submitClicked(content, imageUrir) {
    if(content) {

        imageUri = 'file:///storage/emulated/0/DCIM/Facebook/FB_IMG_1432276141336.jpg';

        var options = new FileUploadOptions();
        options.fileKey = "talkImage";
        options.fileName = imageUri.substr(imageUri.lastIndexOf('/') + 1);
        options.mimeType = "image/jpeg";

        var params = {};
        params.clientCode = 2;
        params.plantCode = 1;
        params.question = content;

        options.params = params;

        var ft = new FileTransfer();
        ft.upload(imageUri, encodeURI('http://goodandbetter.cafe24.com/appRegisterTalk'),
            function(data) {
                if(data.error == 0) alert('success');
                else alert(data.errMSG);
            }, function(error) {
                alert('fail');
            }, options);
        /*
        //alert(content);
        var formData = new FormData();
        formData.append('clientCode',2);
        formData.append('plantCode',1);
        formData.append('question',content);

        if(imageUri){
            var blob = dataURItoBlob(imageUri);
            formData.append('talkImage',blob);
        }
        //var blob = dataURItoBlob('file:///storage/emulated/0/DCIM/Facebook/FB_IMG_1432276141336.jpg');
        //alert(""+blob.type);
        formData.append('talkImage',new File("file:///storage/emulated/0/DCIM/Facebook/FB_IMG_1432276141336.jpg"));

        $.ajax({
            url:'http://goodandbetter.cafe24.com/appRegisterTalk',
            data:formData,
            cache:false,
            processData:false,
            contentType:false,
            type:'POST',
            success:function (data,status,req) {
                if(data.error == 0) alert('success');
                else alert(data.errMSG);
            },
            error:function (req,status,error) {
                alert('fail');
            }

        });
        */

    }else {
        alert("질문을 입력하세요!");
    }
}

function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}
