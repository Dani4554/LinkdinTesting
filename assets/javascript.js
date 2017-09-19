// Grab elements, create settings, etc.
var video = document.getElementById('video');
var image1;
var test1;
// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}

//Legacy code below: getUserMedia 
else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
        console.log("Stream1: " + stream);
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
        console.log("Stream2: " + stream);
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
        console.log("Stream3: " + stream);
    }, errBack);
}


var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');


document.getElementById("snap").addEventListener("click", function(snapShot) {
  context.drawImage(video, 0, 0, 640, 480);
  console.log(snapShot);
  convertCanvasToImage(canvas);

});



 function faceRecognition() {

      console.log("Image: " + image);
        var params = {
            
        };

        var queryURL = "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + 

        $.ajax({
            // NOTE: You must use the same location in your REST call as you used to obtain your subscription keys.
            //   For example, if you obtained your subscription keys from westcentralus, replace "westus" in the 
            //   URL below with "westcentralus".
            url: "https://westus.api.cognitive.microsoft.com/emotion/v1.0/recognize?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","application/json");

                // NOTE: Replace the "Ocp-Apim-Subscription-Key" value with a valid subscription key.
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","c1b9625c10a544cc9ff07f21be4238ca");
            },
            type: "POST",
            // Request body
            data: '{"url" : "http://dreamicus.com/data/face/face-04.jpg"}',
        })
        .done(function(data) {
            alert("success");
        })
        .fail(function() {
            alert("error");
        });
    };


function convertCanvasToImage(canvas) {
    var image = new Image();
    var imageSrc = canvas.toDataURL("image/jpg");
    console.log(imageSrc);
    // image.src = imageSrc;   
    //console.log(image.attr('src'))
    // return image;
    document.querySelector("body").appendChild(image);
    test1 = faceRecognition();
    console.log(test1);
}
