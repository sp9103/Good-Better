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


/*
<div style="text-align: right">
    <div class="popoverMin popover--left" style="display:inline-block">
    <div class="popover__right-arrowMin"></div>
    <div class="popover__contentMin">
    <img id="pla_image2" style="max-width: 100%; height: auto;" src="img/nan.jpg"> <!--http://tadream.tistory.com/9766-->
<div style="text-align:center;opacity:0.4;">
    <br>ContentContent</div>
    </div>
    </div>
    </div>



 <div style="text-align: left">
 <div class="popoverMin popover--right">
 <div class="popover__left-arrowMin"></div>
 <div class="popover__contentMin">
 <div style="text-align:center;opacity:0.4;">Content</div>
 </div>
 </div>
 </div>
    */