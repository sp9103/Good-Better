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

function submitClicked(content, image) {
    if(content) {
        //alert(content);
        var formData = new FormData();
        formData.append('clientCode',2);
        formData.append('plantCode',1);
        formData.append('question',content);
        if(image) formData.append('talkImage',image);

        $.ajax({
            url:'http://goodandbetter.cafe24.com/appRegisterTalk',
            data:formData,
            cache:false,
            processData:false,
            contentType:false,
            type:'POST',
            success:function (data,status,req) {
                if(data.error == 0) alert('success');
                else alert('error');
            },
            error:function (req,status,error) {
                alert('fail');
            }

        });

    }else {
        alert("질문을 입력하세요!");
    }
}
