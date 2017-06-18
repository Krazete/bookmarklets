javascript:
function stabilize(){
    var masthead = document.getElementById("masthead-positioner");
    var sidebar = document.getElementById("watch7-sidebar").getBoundingClientRect();
    var theater = document.getElementById("theater-background").getBoundingClientRect();
    var video = document.getElementById("player-api");
    masthead.removeAttribute("style");
    video.removeAttribute("style");
    if(document.body.scrollTop > theater.height){
        var video_box = video.getBoundingClientRect();
        var ratio = Math.max(sidebar.width - 55, innerWidth - (sidebar.left - 55)) / video_box.width;
        var right = (innerWidth - video_box.right) / ratio;
        masthead.style.zIndex = 999;
        video.style.position = "fixed";
        video.style.top = 0;
        video.style.transform = "scale(" + ratio + ") translate(" + right + "px)";
        video.style.transformOrigin = "100% 0";
        video.style.zIndex = 9999;
    }
}
document.body.onscroll = stabilize;
document.body.onresize = stabilize;
