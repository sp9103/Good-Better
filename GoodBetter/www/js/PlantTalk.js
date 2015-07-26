/**
 * Created by min on 2015. 7. 25..
 */
function makeTalkingBubble(arrow, content, image)
{
    var dir = ['right','left'];
    var html;
    html = "<div style=\"text-align: "+dir[arrow]+"\">";
    html +="<div class=\"popoverMin popover--"+dir[(arrow+1)%2]+"\" style=\"display:inline-block\">";
    html +="<div class=\"popover__"+dir[arrow]+"-arrowMin\"></div>";
    html +="<div class=\"popover__contentMin\">";
    if(image) html +="<img style=\"max-width: 100%; height: auto;\" src=\""+image+"\">";
    html +="<div style=\"text-align:center;opacity:0.4;\">";
    html +=content;
    html +="</div></div></div></div>";
    return html;
}
function makeQuestionButton()
{
    var html;
    html = "<div class=\"Submit-Class\" id=\"SubmitButton\" >";
    html += "<button class=\"Submit Submit--large\" id=\"questionButton\">질문하기</button></div>";
    return html;
}