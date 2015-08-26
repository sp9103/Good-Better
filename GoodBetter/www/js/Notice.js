
function NoticeCancel() {

    var dirPath = dirname(location.href);
    fullPath = dirPath + "/INFO.html";
    window.location = fullPath;
}
function dirname(path) {
    return path.replace(/\\/g, '/').replace(/\/[^\/]*$/, '');
}

function LoadBoradTitle(){
	var cliCode = window.localStorage.getItem("clientCode");
	var BoardTitleURL = 'http://goodandbetter.cafe24.com/appGetBoardTitle?clientCode='+cliCode;
			
	$.ajax({
		dataType: 'Json',
		url: BoardTitleURL,
		success: function (data) {
			if(data.error == 0){
				var s = JSON.stringify(data.result);
				alert(s);
				list = JSON.parse(s);
				
				var titleListScript = "<ul class=\"list\">";
				for(var i = 0; i < list.length; i++){
					var time = list[i].indate;
					//스트링 자르기
					var date = cutStr(10, time);
					
					titleListScript+="<li class=\"list__item list__item--chevron\" onclick=\"TitleClicked(" + i + ")\">";
					titleListScript+=list[i].BOA_Title;
					titleListScript+="<span class=\"list-item-note lucent\">" + date + "</span>";
					titleListScript+="</li>";
				}
				titleListScript += "</ul>";
				
				document.getElementById("Board").innerHTML=titleListScript;
			}
			else {
				/*if(data.errMSG == 'no check List'){
					document.getElementById("RecordList").innerHTML="<img style=\"width: 100%;\" src=\"img/EmptyList.png\" />";
				}
				else{
					document.getElementById("RecordList").innerHTML='&nbsp;&nbsp;해당 페이지를 열람할 수 없습니다.';
				}*/
				
				if(data.errMSG == 'No Board Registered'){
					alert("공지사항이 없습니다.");
				}else
					alert(data.errMSG);
			}
		},
		error: function (xhr, type) {
			alert('server error occurred');
		}
	});
}

function cutStr(len, str){
	var l = 0;
	for (var i=0; i<str.length; i++) {
       l += (str.charCodeAt(i) > 128) ? 2 : 1;
       if (l > len) return str.substring(0,i);
	}
	return str;
}

function TitleClicked(id){
	alert(id);
	var BoardAllInfo = window.localStorage.getItem("BoardAll");
	
	if(BoardAllInfo == null){
		var cliCode = window.localStorage.getItem("clientCode");
		var BoardAllURL = 'http://goodandbetter.cafe24.com/appGetBoardAll?clientCode='+cliCode;
	
		$.ajax({
			dataType: 'Json',
			url: BoardAllURL,
			success: function (data) {
				if(data.error == 0){
					var s = JSON.stringify(data.result);
					window.localStorage.setItem("BoardAll", s);
				}
				else {
					alert(data.errMSG);
				}
			},
			error: function (xhr, type) {
				alert('server error occurred');
			}
		});
	}else{
	}
}