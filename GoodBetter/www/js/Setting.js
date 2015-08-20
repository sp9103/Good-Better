/**
 * Created by minseock on 2015-07-08.
 */
function disableAutoLogin() {
	var r = confirm("자동 로그인을 해제하시겠습니까?");
	if (r == true){
		window.localStorage.setItem("auto",false);
		alert("자동 로그인이 해제되었습니다.");
		
		var dirPath = dirname(location.href);
		fullPath = dirPath + "/Login.html";
		window.location = fullPath;
	}
}

function NoticeClick(){
	var dirPath = dirname(location.href);
    fullPath = dirPath + "/Notice.html";
    window.location = fullPath;
}