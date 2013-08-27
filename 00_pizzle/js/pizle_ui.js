 //userAgent
var switchMetaContent = function() {
    //var meta = document.getElementById("meta");
   // var content = "";
    if (/AppleWebKit/.test(navigator.userAgent)) {
        //content = "user-scalable=no, initial-scale = 1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width";
        document.write ("<meta name=\"viewport\" content=\"user-scalable=no, initial-scale = 1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width\" />");
    } else if (/Opera/.test(navigator.userAgent) && !/Opera Mini/.test(navigator.userAgent)) {
        //content = "user-scalable=no, initial-scale = 0.75, maximum-scale=0.75, minimum-scale=0.75";
        document.write ("<meta name=\"viewport\" content=\"user-scalable=no, initial-scale = 0.75, maximum-scale=0.75, minimum-scale=0.75\" />");
        //document.documentElement.className = "omnia";
    } else {
       // content = "user-scalable=no, initial-scale = 1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width";
        document.write ("<meta name=\"viewport\" content=\"user-scalable=no, initial-scale = 1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width\" />");
        //alert(navigator.userAgent);
    }
    //meta.content = content;
};
switchMetaContent();
