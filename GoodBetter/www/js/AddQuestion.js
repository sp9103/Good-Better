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

function submitClicked(content, imageUri) {
    if(content) {
        //alert(content);
        var formData = new FormData();
        formData.append('clientCode',2);
        formData.append('plantCode',1);
        formData.append('question',content);
        /*
        if(imageUri){
            var blob = dataURItoBlob(imageUri);
            formData.append('talkImage',blob);
        }*/
        var blob = dataURItoBlob('content://media/external/images/media/67072');
        alert(""+blob.type);
        formData.append('talkImage',blob);

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
